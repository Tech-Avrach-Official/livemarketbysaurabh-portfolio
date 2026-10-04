"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* Counts up once, the first time the cards enter the screen. The third
   card is a list of markets, not a figure, so it stays still. */
function useCount(target: number, on: boolean) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!on) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const duration = 1400;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setValue(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [on, target]);

  return value;
}

export default function StatCards({ members }: { members: string }) {
  const root = useRef<HTMLDListElement>(null);
  const [on, setOn] = useState(false);
  const memberTarget = Number(members.replace(/[^\d]/g, "")) || 0;
  const years = useCount(11, on);
  const traders = useCount(memberTarget, on);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setOn(true);
      return;
    }
    /* The cards sit under a tall portrait. Start the count when they
       actually cross into the screen, not when the section above does. */
    let done = false;
    let raf = 0;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const entered = r.bottom > vh * 0.12 && r.top < vh * 0.9;
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

  return (
    <dl className={`stats${on ? " is-on" : ""}`} ref={root}>
      <div>
        <dt className="stat-value num">{years}+</dt>
        <dd>years trading</dd>
      </div>
      <div>
        <dt className="stat-value num">{traders.toLocaleString("en-IN")}+</dt>
        <dd>traders in the community</dd>
      </div>
      <div>
        <dt className="stat-value is-small">Gold · Silver · Crude</dt>
        <dd>what he trades</dd>
      </div>
    </dl>
  );
}
