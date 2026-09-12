/* ═══════════════════════════════════════════════════════════════
   Market widgets — docs/landing-page-structure.md §2, §5, §6

   All TradingView embeds on the page go through loadWidget() below.
   It exists to enforce two rules from the doc:

   1. Load late. These are heavy third-party iframes and must never
      compete with the hero for bandwidth, so a widget's script is
      injected only when it nears the viewport. Heights are reserved
      in CSS, so nothing jumps.

   2. Fail visibly. §5: "A stale or broken price on a trading page
      damages credibility badly." We cannot read prices inside a
      cross-origin iframe, so the failure we *can* detect is the
      widget never rendering — then we say so plainly rather than
      leaving an empty box.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var BASE        = 'https://s3.tradingview.com/external-embedding/embed-widget-';

  /* A TradingView embed is configured at mount time and cannot be
     re-themed in place, so every widget registers how to rebuild itself
     and the whole set is re-mounted when the visitor flips the theme. */
  var registry = [];

  function tvTheme() {
    return document.documentElement.getAttribute('data-resolved-theme') === 'light'
      ? 'light' : 'dark';
  }
  function tvBg() {
    return tvTheme() === 'light' ? 'rgba(255,255,255,1)' : 'rgba(18, 21, 26, 1)';
  }
  function tvGrid() {
    return tvTheme() === 'light' ? 'rgba(228,226,220,1)' : 'rgba(30, 35, 43, 1)';
  }
  var LOAD_MARGIN = '250px';
  var TIMEOUT_MS  = 9000;

  /* Instruments.

     VERIFIED against TradingView's free tier on 2026-09-08:

       WORKS   OANDA:XAUUSD  gold spot,   USD / troy ounce
               OANDA:XAGUSD  silver spot, USD / troy ounce
               TVC:USOIL     WTI crude,   USD / barrel
               FX_IDC:XAUINR gold spot,   INR / troy ounce
               BSE:SENSEX    delayed

       BLOCKED MCX:GOLD1! / MCX:SILVER1! / MCX:CRUDEOIL1!  (licensed)
               NSE:NIFTY / NSE:BANKNIFTY and every alias tried
               (INDEX:, CAPITALCOM:, OANDA:, BLACKBULL:, NSE:NIFTY50)

     The INR symbols quote per TROY OUNCE, not per 10g (gold) or per kg
     (silver) as MCX and Indian retail do. Gold at ~$4,398/oz shows as
     ~₹4,17,800/oz where a trader expects ~₹1,34,300 per 10g — a rupee
     sign on the wrong unit reads as a wrong price. USD spot is used
     throughout because it is unambiguous. */
  var GOLD   = 'OANDA:XAUUSD';
  var SILVER = 'OANDA:XAGUSD';
  var CRUDE  = 'TVC:USOIL';

  /* ── Generic lazy loader ───────────────────────────────────── */

  function loadWidget(host, widget, config) {
    var script = document.createElement('script');
    script.src   = BASE + widget + '.js';
    script.async = true;
    script.text  = JSON.stringify(config);   // TradingView reads this
    script.onerror = function () { fail(host); };
    host.appendChild(script);

    // Script load != widget drawn, so wait for a real iframe.
    var started = Date.now();
    var poll = setInterval(function () {
      if (host.querySelector('iframe')) {
        clearInterval(poll);
        host.classList.add('is-ready');
      } else if (Date.now() - started > TIMEOUT_MS) {
        clearInterval(poll);
        fail(host);
      }
    }, 250);
  }

  function fail(host) {
    var note = host.querySelector('.tv-fallback');
    if (note) note.hidden = false;
    host.classList.add('is-failed');

    /* The ticker strip is the first widget to load and sits near the top,
       so its failure is the earliest reliable signal that TradingView is
       unreachable altogether — an adblocker, most often. When that
       happens, collapse both market sections rather than leaving ~900px
       of "Unavailable" boxes and a disclaimer with no prices under it. */
    if (host.id === 'ticker-strip') {
      document.body.classList.add('tv-blocked');
      /* Collapsing two sections moves everything below them up the page.
         Nudge the reveal sweep so anything that just came into view is
         not left waiting for the visitor's first scroll. */
      window.dispatchEvent(new Event('scroll'));
    }
  }

  function whenVisible(el, fn) {
    if (!('IntersectionObserver' in window)) return fn();
    var io = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) { io.disconnect(); fn(); }
    }, { rootMargin: LOAD_MARGIN });
    io.observe(el);
  }

  /* ── §2 Ticker strip ───────────────────────────────────────── */

  var strip = document.getElementById('ticker-strip');
  if (strip) {
    whenVisible(strip, function () {
      function mount() {
        strip.innerHTML = '<div class="tradingview-widget-container__widget"></div>' +
          '<p class="tv-fallback strip-fallback" hidden>Prices unavailable right now.</p>';
        strip.classList.remove('is-ready', 'is-failed');
        loadWidget(strip, 'ticker-tape', {
          symbols: [
            { proName: GOLD,   title: 'Gold' },
            { proName: SILVER, title: 'Silver' },
            { proName: CRUDE,  title: 'Crude' }
          ],
          showSymbolLogo: false,
          isTransparent: true,
          displayMode: 'adaptive',
          colorTheme: tvTheme(),
          locale: 'in'
        });
      }
      registry.push(mount);
      mount();
    });
  }

  /* ── §5 Snapshot cards ─────────────────────────────────────── */

  [].forEach.call(document.querySelectorAll('[data-mini-symbol]'), function (host) {
    whenVisible(host, function () {
      function mount() {
        host.innerHTML = '<div class="tradingview-widget-container__widget"></div>' +
          '<p class="tv-fallback" hidden>Unavailable</p>';
        host.classList.remove('is-ready', 'is-failed');
        loadWidget(host, 'mini-symbol-overview', {
          symbol: host.getAttribute('data-mini-symbol'),
          width: '100%',
          height: 168,
          locale: 'in',
          dateRange: '1D',
          colorTheme: tvTheme(),
          isTransparent: true,
          autosize: false,
          chartOnly: false,
          noTimeScale: false
        });
      }
      registry.push(mount);
      mount();
    });
  });

  /* ── §5 Full interactive chart ─────────────────────────────── */

  var chart = document.getElementById('main-chart');
  if (!chart) return;

  var current = null;

  function mountChart(symbol) {
    if (symbol === current) return;
    current = symbol;

    // Tear down the previous iframe before mounting the next.
    chart.classList.remove('is-ready', 'is-failed');
    chart.innerHTML = '<div class="tradingview-widget-container__widget"></div>' +
                      '<p class="tv-fallback" hidden>Chart unavailable right now.</p>';

    /* Not autosize. TradingView's autosize measures the parent, but the
       embed appends its iframe before our CSS height applies and falls
       back to a 150px default inside a correctly-sized 480px box. An
       explicit pixel height read off the container is deterministic. */
    loadWidget(chart, 'advanced-chart', {
      width: '100%',
      height: chart.clientHeight || 480,
      symbol: symbol,
      interval: '15',
      timezone: 'Asia/Kolkata',
      theme: tvTheme(),
      style: '1',                 // candles
      locale: 'in',
      backgroundColor: tvBg(),
      gridColor: tvGrid(),
      hide_top_toolbar: false,
      hide_legend: false,
      allow_symbol_change: false,
      save_image: false,
      withdateranges: true,
      details: false,
      support_host: 'https://www.tradingview.com'
    });
  }

  var tabs = document.querySelectorAll('.chart-tab');
  [].forEach.call(tabs, function (tab) {
    tab.addEventListener('click', function () {
      [].forEach.call(tabs, function (t) {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
      });
      mountChart(tab.getAttribute('data-symbol'));
    });
  });

  whenVisible(chart, function () {
    registry.push(function () { var sym = current; current = null; mountChart(sym); });
    mountChart(GOLD);
  });

  /* Called by the theme toggle. Only widgets that have actually mounted
     are in the registry, so nothing below the fold is loaded early. */
  window.__tvRemount = function () {
    registry.forEach(function (fn) { try { fn(); } catch (e) {} });
  };
})();

/* ── Footer year ───────────────────────────────────────────────── */

(function () {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ═══════════════════════════════════════════════════════════════
   Presentation layer — reveal on scroll, and the segmented control.
   Both are progressive: the page is complete and readable with this
   file blocked, so nothing here may hide content permanently.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* The .js flag gates every "starts hidden" rule in the stylesheet, so
     content is only ever hidden when this script is running to reveal it. */
  document.documentElement.classList.add('js');

  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Reveal on scroll ──────────────────────────────────────── */

  // Grids stagger their children instead of arriving as one slab.
  var STAGGER = '.week-strip, .proof-grid, .voices-grid, .fit-grid, ' +
                '.channel-grid, .cards, .reels, .inside-grid';

  [].forEach.call(document.querySelectorAll(STAGGER), function (grid) {
    if (!grid.classList.contains('reveal')) return;
    grid.classList.remove('reveal');
    [].forEach.call(grid.children, function (child, i) {
      child.classList.add('reveal');
      child.setAttribute('data-delay', String(Math.min(i, 5)));
    });
  });

  var targets = [].slice.call(document.querySelectorAll('.reveal'));

  function revealAll() {
    targets.forEach(function (el) { el.classList.add('is-in'); });
    targets = [];
  }

  if (reduced || !('IntersectionObserver' in window)) {
    revealAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);          // reveal once, never re-hide
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });

    targets.forEach(function (el) { io.observe(el); });

    /* Safety net. A fast flick on mobile, a Cmd+End, or an anchor jump can
       move the viewport past an element between observer callbacks — the
       browser then reports it as simply "not intersecting" and it would
       stay invisible for good. So on every scroll, sweep anything the
       viewport has already reached and reveal it directly.

       Hiding content behind an animation is only acceptable if it is
       impossible for the content to stay hidden. */
    var queued = false;
    function sweep() {
      queued = false;
      var vh = window.innerHeight;
      for (var i = targets.length - 1; i >= 0; i--) {
        var el = targets[i];
        if (el.classList.contains('is-in')) { targets.splice(i, 1); continue; }
        if (el.getBoundingClientRect().top < vh) {
          el.classList.add('is-in');
          io.unobserve(el);
          targets.splice(i, 1);
        }
      }
      if (!targets.length) window.removeEventListener('scroll', onScroll);
    }
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    sweep();   // covers whatever is already on screen at load
  }

  /* ── Segmented control indicator ───────────────────────────── */

  var tabsBar = document.querySelector('.chart-tabs');
  if (!tabsBar) return;

  function moveIndicator() {
    var active = tabsBar.querySelector('.chart-tab.is-active');
    if (!active) return;
    tabsBar.style.setProperty('--pill-w', active.offsetWidth + 'px');
    tabsBar.style.setProperty('--pill-x', (active.offsetLeft - tabsBar.clientLeft) + 'px');
  }

  // The pill is positioned from measured geometry, so it has to be set
  // after layout — and re-set whenever the bar can change width.
  moveIndicator();
  tabsBar.addEventListener('click', function (e) {
    if (e.target.closest('.chart-tab')) setTimeout(moveIndicator, 0);
  });
  window.addEventListener('resize', moveIndicator);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(moveIndicator);   // mono metrics shift the width
  }
})();

/* ═══════════════════════════════════════════════════════════════
   Market clock, price stamp, and stat counters.

   The clock is read in Asia/Kolkata regardless of where the visitor
   is, because the session it reports is an Indian one. A pill that
   said "OPEN" to someone in Dubai at their own 10am would be worse
   than no pill at all.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* MCX non-agri commodities: 09:00–23:30 IST, Monday to Friday. */
  var OPEN_MIN  = 9 * 60;
  var CLOSE_MIN = 23 * 60 + 30;
  var DAYS = { Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6 };

  var fmt;
  try {
    fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Kolkata',
      weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
    });
  } catch (e) { fmt = null; }        // no Intl/tz data: leave the pill hidden

  function istNow() {
    if (!fmt) return null;
    var parts = {};
    fmt.formatToParts(new Date()).forEach(function (p) { parts[p.type] = p.value; });
    var dow = DAYS[parts.weekday];
    var h = parseInt(parts.hour, 10) % 24;   // some engines report hour 24
    var m = parseInt(parts.minute, 10);
    if (dow === undefined || isNaN(h) || isNaN(m)) return null;
    return { dow: dow, mins: h * 60 + m, hh: (h < 10 ? '0' : '') + h,
             mm: (m < 10 ? '0' : '') + m };
  }

  function isWeekday(d) { return d >= 1 && d <= 5; }

  // Minutes from now until the next session opens.
  function minsToOpen(now) {
    if (isWeekday(now.dow) && now.mins < OPEN_MIN) return OPEN_MIN - now.mins;
    var days = 1;
    var d = now.dow;
    while (days < 8) {                       // walk forward to the next weekday
      var next = (d + days) % 7;
      if (isWeekday(next)) break;
      days++;
    }
    return (24 * 60 - now.mins) + (days - 1) * 24 * 60 + OPEN_MIN;
  }

  function human(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    /* Over a day, "1 day" would round 43 hours down to something that
       reads as tomorrow. Days plus hours stays honest and still short. */
    if (h >= 24) return Math.floor(h / 24) + 'd ' + (h % 24) + 'h';
    return h ? h + 'h ' + m + 'm' : m + 'm';
  }

  var pill  = document.getElementById('mkt-status');
  var stamp = document.getElementById('mkt-stamp');

  function tick() {
    var now = istNow();
    if (!now) return;

    var open = isWeekday(now.dow) && now.mins >= OPEN_MIN && now.mins < CLOSE_MIN;

    if (pill) {
      var text = pill.querySelector('.mkt-text');
      text.innerHTML = open
        ? '<span class="mkt-label">MCX OPEN</span>' +
          '<span class="mkt-detail"> · ' + now.hh + ':' + now.mm + ' IST</span>'
        : '<span class="mkt-label">CLOSED</span>' +
          '<span class="mkt-detail"> · opens in ' + human(minsToOpen(now)) + '</span>';
      pill.classList.toggle('is-open', open);
      pill.classList.add('is-ready');
    }

    if (stamp) {
      stamp.textContent = 'Prices as of ' + now.hh + ':' + now.mm + ' IST';
      stamp.classList.add('is-ready');
    }
  }

  tick();
  setInterval(tick, 30000);

  /* ── Stat counters ─────────────────────────────────────────── */

  /* Counts up only where a real number has been supplied via
     data-count. The bracketed placeholders carry none, so they simply
     stay as they are — a counter animating a fake figure would be
     worse than no animation. */
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var reduced = window.matchMedia &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function group(n) { return n.toLocaleString('en-IN'); }

  function run(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    if (isNaN(target)) return;
    if (reduced) { el.textContent = group(target); return; }

    var t0 = null, DUR = 1100;
    function step(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min((ts - t0) / DUR, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = group(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    [].forEach.call(counters, run);
  } else {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        run(e.target);
        cio.unobserve(e.target);
      });
    }, { threshold: 0.4 });
    [].forEach.call(counters, function (el) { cio.observe(el); });
  }
})();

/* ═══════════════════════════════════════════════════════════════
   Theme toggle.

   Two attributes are kept on <html>: data-theme records an explicit
   choice (absent when the visitor has made none), and
   data-resolved-theme always names what is actually on screen. The
   stylesheet keys its overrides off the first and the icons off the
   second, so an unset preference keeps tracking the system.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var KEY  = 'lmbs-theme';
  var root = document.documentElement;
  var btn  = document.getElementById('theme-toggle');
  if (!btn) return;

  function current() {
    return root.getAttribute('data-resolved-theme') === 'light' ? 'light' : 'dark';
  }

  function apply(theme, remember) {
    root.setAttribute('data-theme', theme);
    root.setAttribute('data-resolved-theme', theme);
    label(theme);
    if (remember) { try { localStorage.setItem(KEY, theme); } catch (e) {} }

    /* TradingView embeds cannot be re-themed in place, so they are
       rebuilt. Only ones already mounted are touched. */
    if (window.__tvRemount) window.__tvRemount();
  }

  function label(theme) {
    btn.setAttribute('aria-label',
      theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  btn.addEventListener('click', function () {
    apply(current() === 'dark' ? 'light' : 'dark', true);
  });

  /* Label only. Writing data-theme here would turn "no preference" into an
     explicit one and stop the page following the system. */
  label(current());

  /* Keep following the system until the visitor has actually chosen. */
  var stored = null;
  try { stored = localStorage.getItem(KEY); } catch (e) {}
  if (!stored && window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: light)');
    var onSys = function (e) {
      root.removeAttribute('data-theme');
      root.setAttribute('data-resolved-theme', e.matches ? 'light' : 'dark');
      label(current());
      if (window.__tvRemount) window.__tvRemount();
    };
    if (mq.addEventListener) mq.addEventListener('change', onSys);
    else if (mq.addListener) mq.addListener(onSys);
  }
})();
