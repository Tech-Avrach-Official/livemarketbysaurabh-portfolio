"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/useTheme";

/* A TradingView embed is an imperative script that appends its own iframe and
   offers no API to re-theme or tear down. Everything awkward about wrapping
   it lives here so no section component has to know about it.

   Three rules carried over from the vanilla build, each of which was a bug
   before it was a rule:

   1. Load late. These are heavy third-party iframes; the script is injected
      only when the host nears the viewport. Heights are reserved in CSS so
      nothing jumps.
   2. Fail visibly, but keep watching. Prices that are stale or absent damage
      credibility on a trading page more than an honest "unavailable" does.
      We cannot read inside a cross-origin iframe, so the failure we can
      detect is the widget never rendering — and "not yet" has to stay
      distinguishable from "never", so the message is reversible.
   3. Re-theme by rebuilding. There is no other way. */

const BASE = "https://s3.tradingview.com/external-embedding/embed-widget-";
/* How far ahead of the viewport a widget starts loading. 250px meant the
   market section began fetching only once it was nearly on screen, and then
   made the reader watch two to three seconds of skeleton. At 1400px — about
   a screen and a half — the market widgets start while the reader is still
   in the section above, and are usually drawn by the time they arrive.

   It stays an observer rather than a plain eager load so a visitor who never
   scrolls past the hero still pays for none of it — but the margin has to
   clear the whole market section, not just its heading: the cards sit about
   2450px down and the big chart about 2900px, so anything under ~2000px left
   them waiting exactly as before. */
const LOAD_MARGIN = "2400px";
/* Two thresholds, not one. At SLOW_MS we say so; at GIVE_UP_MS we mean it.
   A single timeout that also stopped polling meant a chart which took ten
   seconds — an ordinary thing on a phone — kept an "unavailable" message
   over a widget that had in fact arrived, with nothing left running to
   notice. */
const SLOW_MS = 9000;
const GIVE_UP_MS = 40000;

/* Loading order.

   Profiling says where the time actually goes, and it is not our side: with
   preconnect in place, DNS and TCP are 0ms and TradingView's own embed
   scripts take 350-1750ms — but each IFRAME DOCUMENT takes 3.8 to 5.2
   seconds. That is their charting app booting on their servers, and nothing
   on this page can make it faster.

   What we can control is the order, so the thing a reader needs first is not
   queued behind the thing they need last. Three tiers:

     1  the ticker strip      — first market thing under the hero
     2  the three cards       — the actual prices
     3  the full chart        — heaviest, and useless until the section is
                                reached and someone wants to explore

   Each tier waits for the one above it to finish. Loading all five at once
   only divides the connection five ways: everything arrives late together
   rather than the important things arriving early. Spacing requests a few
   hundred milliseconds apart rearranges that contention without removing it,
   which is why the strip had got twice as slow before this.

   A stuck or blocked tier must never hold the page hostage, so each gate
   also opens on its own after TIER_MAX_WAIT_MS. */
const TIER_MAX_WAIT_MS = 6000;

const doneTiers = new Set<number>();
const tierWaiters = new Map<number, (() => void)[]>();

function releaseTier(tier: number) {
  if (doneTiers.has(tier)) return;
  doneTiers.add(tier);
  const queued = tierWaiters.get(tier) ?? [];
  tierWaiters.set(tier, []);
  queued.forEach((w) => w());
}

/** Resolves once every tier above this one has finished (or given up). */
function afterTiersAbove(tier: number): Promise<void> {
  const above = [];
  for (let t = 1; t < tier; t++) {
    if (doneTiers.has(t)) continue;
    above.push(new Promise<void>((resolve) => {
      const list = tierWaiters.get(t) ?? [];
      list.push(resolve);
      tierWaiters.set(t, list);
      window.setTimeout(() => releaseTier(t), TIER_MAX_WAIT_MS);
    }));
  }
  return above.length ? Promise.all(above).then(() => undefined) : Promise.resolve();
}

/* Within a tier, still one at a time rather than in a burst — so the three
   cards draw one after another instead of racing each other. Computed
   against wall-clock time, so a widget mounting alone waits for nothing. */
const INJECT_GAP_MS = 200;
let lastSlot = 0;
function nextSlot() {
  const now = Date.now();
  lastSlot = Math.max(now, lastSlot + INJECT_GAP_MS);
  return lastSlot - now;
}

/* How many widgets a tier is still waiting on, so a tier of three opens the
   next one only when all three are done. */
const tierPending = new Map<number, number>();

type Props = {
  widget: string;
  config: Record<string, unknown>;
  /** Config keys whose value should be the live theme name. */
  themeKeys?: string[];
  className?: string;
  id?: string;
  fallback?: string;
  /** Called when this widget fails — used by the strip to detect a blocker. */
  onFail?: () => void;
  /** 1 loads first and gates 2, which gates 3. Default 2. */
  tier?: number;
};

export default function TradingViewWidget({
  widget,
  config,
  themeKeys = ["colorTheme"],
  className = "",
  id,
  fallback = "Unavailable",
  onFail,
  tier = 2,
}: Props) {
  const host = useRef<HTMLDivElement>(null);
  /* The node the embed script writes into. It is deliberately NOT the same
     node React renders the skeleton and the fallback into: the effect clears
     it with innerHTML, and doing that to a node React also manages destroys
     React's view of its own children — which is exactly what stopped every
     widget from loading once a conditional child was added here. */
  const mount = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "ready" | "failed">("idle");
  const [visible, setVisible] = useState(false);
  /* Touch guard. A chart iframe swallows vertical drags — on a phone the page
     stops scrolling the moment a thumb lands on it, and the reader is stuck
     panning a chart they never meant to touch. So on touch devices the widget
     starts behind a transparent cover that takes the gesture instead; one tap
     hands control over, and scrolling the widget off screen puts the cover
     back for next time. */
  const [guarded, setGuarded] = useState(true);
  const [armed, setArmed] = useState(false);   // first tap of a double tap
  const tapAt = useRef(0);
  const theme = useTheme();

  // Keep the latest onFail without making it a mount dependency.
  const failRef = useRef(onFail);
  failRef.current = onFail;

  useEffect(() => {
    const el = host.current;
    if (!el || visible) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          io.disconnect();
          setVisible(true);
        }
      },
      { rootMargin: LOAD_MARGIN }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  // Re-arm the cover once the widget has left the screen.
  useEffect(() => {
    const el = host.current;
    if (!el || guarded || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([e]) => { if (!e.isIntersecting) setGuarded(true); },
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [guarded]);

  useEffect(() => {
    const el = mount.current;
    if (!el || !visible) return;

    setState("idle");
    el.innerHTML = "";

    tierPending.set(tier, (tierPending.get(tier) ?? 0) + 1);
    let settled = false;
    const finishTier = () => {
      if (settled) return;
      settled = true;
      const left = (tierPending.get(tier) ?? 1) - 1;
      tierPending.set(tier, left);
      if (left <= 0) releaseTier(tier);
    };

    const themed = { ...config };
    for (const key of themeKeys) themed[key] = theme;
    if ("backgroundColor" in themed) {
      themed.backgroundColor =
        theme === "light" ? "rgba(255,255,255,1)" : "rgba(18, 21, 26, 1)";
    }
    if ("gridColor" in themed) {
      themed.gridColor =
        theme === "light" ? "rgba(228,226,220,1)" : "rgba(30, 35, 43, 1)";
    }
    // Read the reserved height off the container rather than using autosize:
    // the embed appends its iframe before our CSS applies and falls back to a
    // 150px default inside a correctly sized box.
    if (themed.height === "auto") themed.height = host.current?.clientHeight || 480;

    const script = document.createElement("script");
    script.src = `${BASE}${widget}.js`;
    script.async = true;
    script.text = JSON.stringify(themed);

    let cancelled = false;
    let injectTimer = 0;
    /* Only a genuine dead end calls onFail — that handler collapses both
       market sections, so a merely slow widget must never trigger it. */
    const giveUp = () => {
      if (cancelled) return;
      setState("failed");
      failRef.current?.();
      finishTier();                              // never block the tier below
    };
    script.onerror = giveUp;          // a blocked script is a real dead end

    void afterTiersAbove(tier).then(() => {
      if (cancelled) return;
      injectTimer = window.setTimeout(() => {
        if (!cancelled) el.appendChild(script);
      }, nextSlot());
    });

    // A loaded script is not a drawn widget, so wait for a real iframe.
    const started = Date.now();
    const poll = window.setInterval(() => {
      if (cancelled) return;
      if (el.querySelector("iframe")) {
        window.clearInterval(poll);
        setState("ready");            // clears the message if we already showed it
        finishTier();
        return;
      }
      const waited = Date.now() - started;
      if (waited > GIVE_UP_MS) {
        window.clearInterval(poll);
        giveUp();
      } else if (waited > SLOW_MS) {
        setState("failed");           // honest now, still reversible
      }
    }, 250);

    return () => {
      // Also covers StrictMode's double-invoke in development.
      cancelled = true;
      window.clearTimeout(injectTimer);
      window.clearInterval(poll);
      el.innerHTML = "";
    };
    // config is a literal from the caller; widget/theme drive remounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, theme, widget, tier]);

  return (
    <div
      id={id}
      ref={host}
      className={`tradingview-widget-container ${className} ${
        state === "ready" ? "is-ready" : state === "failed" ? "is-failed" : ""
      }`}
    >
      <div className="tv-mount" ref={mount} />
      {guarded && state === "ready" && (
        /* Two taps, not one. A scroll gesture begins with a touch, so a
           single tap released the chart every time the reader tried to
           swipe past it — which is the exact problem the cover exists to
           solve. onTouchStart was the worst of it: it fired before the
           finger had even moved. */
        <button
          type="button"
          className={`tv-guard ${armed ? "is-armed" : ""}`}
          onClick={() => {
            const now = Date.now();
            if (now - tapAt.current < 450) {
              setGuarded(false);
              return;
            }
            tapAt.current = now;
            setArmed(true);
            window.setTimeout(() => setArmed(false), 450);
          }}
        >
          <span>{armed ? "Tap again" : "Double-tap to use the chart"}</span>
        </button>
      )}
      {/* The reserved box used to sit empty at opacity 0 for two to three
          seconds, which reads as broken rather than loading. */}
      {state === "idle" && <span className="tv-skeleton" aria-hidden="true" />}
      {state === "failed" && <p className="tv-fallback">{fallback}</p>}
    </div>
  );
}
