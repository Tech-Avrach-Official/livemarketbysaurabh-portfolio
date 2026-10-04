"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import TradingViewWidget from "./TradingViewWidget";
import { MarketStamp } from "./MarketClock";
import { INSTRUMENTS } from "@/lib/symbols";
import { telegram } from "@/lib/links";
import { useArtFile } from "@/lib/useArtFile";

const MetalMark = ({ metal }: { metal: string }) =>
  metal === "crude" ? (
    <svg className="metal-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.6" aria-hidden="true">
      <path d="M8 4h8M7 8h10M6.5 8c-.5 4-.5 8 0 12h11c.5-4 .5-8 0-12" />
      <path d="M9 8v12M15 8v12" />
    </svg>
  ) : (
    <svg className="metal-mark" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="1.6" aria-hidden="true">
      <path d="M4 17h7l1.4-4H5.4L4 17Z" />
      <path d="M13 17h7l-1.4-4h-7L13 17Z" />
      <path d="M8.7 11h7l-1.4-4h-7l1.4 4Z" />
    </svg>
  );

/* The art is a watermark behind the whole card, not an object parked in its
   corner.

   It used to be the latter, and the cost was hidden in two lines of CSS:
   the heading and the spec each carried padding-right: 42%, reserving well
   over a third of every card for a file that is not there yet. That is why
   "XAU/USD · per troy ounce" wrapped, why the specs broke across two lines,
   and why the three charts started at three different heights. A missing
   image was deforming the cards that do have content.

   So: nothing renders until a file actually loads, there is no dashed
   placeholder, and when a file does land it sits behind the type at low
   opacity where it costs the layout nothing. */
function ArtSlot({ src, metal }: { src: string; metal: string }) {
  const hasArt = useArtFile(src);
  if (!hasArt) return null;
  return (
    <span
      className="card-art is-art"
      data-metal={metal}
      aria-hidden="true"
      style={{ "--art": `url(${src})` } as React.CSSProperties}
    />
  );
}

/* Our own timeframe control, because the chart's own toolbar is being turned
   off. TradingView cannot re-range an existing widget, so each choice keys a
   fresh mount — same mechanism the instrument tabs already use. */
const RANGES = [
  { key: "1D", interval: "5",  range: "1D" },
  { key: "1W", interval: "30", range: "5D" },
  { key: "1M", interval: "60", range: "1M" },
  { key: "1Y", interval: "D",  range: "12M" },
] as const;

export default function MarketSnapshot() {
  const [active, setActive] = useState(0);
  const [span, setSpan] = useState(0);
  const [on, setOn] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOn(true);
      return;
    }
    let done = false;
    let raf = 0;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const entered = r.bottom > vh * 0.12 && r.top < vh * 0.86;
      if (!entered) return;
      done = true;
      cancelAnimationFrame(raf);
      setOn(true);
    };
    const loop = () => {
      check();
      if (!done) raf = requestAnimationFrame(loop);
    };
    check();
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  /* The active underline is one element that slides, rather than a background
     toggling on each button — the movement is what makes it feel built. It is
     positioned from measured geometry, so it has to be set after layout and
     re-set whenever the bar can change width. */
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const move = () => {
      const el = bar.querySelector<HTMLElement>(".chart-tab.is-active");
      if (!el) return;
      bar.style.setProperty("--pill-w", `${el.offsetWidth}px`);
      bar.style.setProperty("--pill-x", `${el.offsetLeft - bar.clientLeft}px`);
    };
    move();
    window.addEventListener("resize", move);
    document.fonts?.ready.then(move);          // mono metrics shift the width
    return () => window.removeEventListener("resize", move);
  }, [active]);

  const onTabKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (active + step + INSTRUMENTS.length) % INSTRUMENTS.length;
    setActive(next);
    barRef.current
      ?.querySelectorAll<HTMLElement>(".chart-tab")[next]
      ?.focus();
  };

  return (
    <section className={`snapshot${on ? " is-on" : ""}`} id="market" ref={root}>
      <div className="wrap">
        <div className="snapshot-head snapshot-in">
          <div>
            <p className="eyebrow">03 — Markets</p>
            <h2>What the room is watching today</h2>
          </div>
          <MarketStamp />
        </div>

        <div className="cards">
          {INSTRUMENTS.map((ins) => (
            <article className="card snapshot-in" key={ins.key} data-metal={ins.key}>
              {/* The metal as a tinted watermark. It is doing identification
                  work, not decoration — you know which card you are looking
                  at before you read the heading. Empty until a file lands. */}
              <ArtSlot src={ins.art} metal={ins.key} />
              <h3>
                <MetalMark metal={ins.key} />
                {ins.name} <span>{ins.sub}</span>
              </h3>
              <p className="spec">
                <span className="spec-tag">Room trades</span>
                {ins.spec}
              </p>
              <TradingViewWidget
                className="tv-host"
                widget="mini-symbol-overview"
                /* Tier 2: the actual prices, ahead of the full chart. */
                tier={2}
                config={{
                  symbol: ins.symbol,
                  width: "100%",
                  height: 168,
                  locale: "in",
                  dateRange: "1D",
                  colorTheme: "dark",
                  /* Not transparent — exactly as the ticker strip found. This
                     widget ignores isTransparent and falls back to a white
                     ground, which is what put three bright rectangles across
                     a near-black page. Letting colorTheme paint it is the
                     only reliable way to get a dark card. */
                  isTransparent: false,
                  autosize: false,
                  chartOnly: false,
                  noTimeScale: false,
                }}
              />
            </article>
          ))}
        </div>

        <div className="chart-block snapshot-in">
          {/* A real tablist, not just the roles. The pattern promises arrow-key
              navigation and a single tab stop; declaring role="tab" without
              them tells a screen-reader user the keys work when they don't. */}
          <div className="chart-bar">
          <div className="chart-tabs" role="tablist" aria-label="Instrument" ref={barRef}
               onKeyDown={onTabKey}>
            {INSTRUMENTS.map((ins, i) => (
              <button
                key={ins.key}
                id={`chart-tab-${ins.key}`}
                className={`chart-tab ${i === active ? "is-active" : ""}`}
                role="tab"
                aria-selected={i === active}
                aria-controls="chart-panel"
                tabIndex={i === active ? 0 : -1}
                onClick={() => setActive(i)}
              >
                {ins.name}
              </button>
            ))}
          </div>

          {/* The chart's own toolbar is gone, so the timeframe has to live
              here. Plain buttons, not a tablist: these change the contents of
              the panel the instrument tabs already own, and a second tablist
              over the same panel would only confuse a screen reader. */}
          <div className="range-tabs" role="group" aria-label="Timeframe">
            {RANGES.map((r, i) => (
              <button
                key={r.key}
                type="button"
                className={`range-tab ${i === span ? "is-active" : ""}`}
                aria-pressed={i === span}
                onClick={() => setSpan(i)}
              >
                {r.key}
              </button>
            ))}
          </div>
          </div>

          <div
            id="chart-panel"
            role="tabpanel"
            aria-labelledby={`chart-tab-${INSTRUMENTS[active].key}`}
          >
          <TradingViewWidget
            id="main-chart"
            className="tv-host"
            widget="advanced-chart"
            /* Tier 3: the heaviest iframe on the page — 3.8s of TradingView
               boot — and the one nobody needs until they want to explore.
               It goes last so the three prices above it are not queued
               behind it. */
            tier={3}
            themeKeys={["theme"]}
            fallback="Chart unavailable right now."
            key={`${INSTRUMENTS[active].symbol}-${RANGES[span].key}`}
            config={{
              width: "100%",
              height: "auto",
              symbol: INSTRUMENTS[active].symbol,
              interval: RANGES[span].interval,
              range: RANGES[span].range,
              timezone: "Asia/Kolkata",
              theme: "dark",
              style: "1",
              locale: "in",
              backgroundColor: "",
              gridColor: "",
              /* Everything the page supplies itself is turned off here. The
                 instrument picker, the timeframe and the heading are ours, in
                 our own type; leaving TradingView's versions on as well is
                 what made this read as an embed dropped into a layout rather
                 than part of one. The legend stays — the OHLC readout is real
                 information, not chrome. */
              hide_top_toolbar: true,
              hide_side_toolbar: true,
              hide_legend: false,
              allow_symbol_change: false,
              save_image: false,
              withdateranges: false,
              details: false,
              calendar: false,
              support_host: "https://www.tradingview.com",
            }}
          />
          </div>
        </div>

        {/* The line that has to turn a price widget into a reason to join.
            A chart is not scarce — anyone can open one. What the page is
            actually offering is the people around it, so that is what this
            says. */}
        <p className="snapshot-link snapshot-in">
          Everyone has the same chart. Having people to argue with about it is
          the part you can&rsquo;t download —{" "}
          <a href={telegram("web_market")} target="_blank" rel="noopener">see what the room is saying today →</a>
        </p>
      </div>
    </section>
  );
}
