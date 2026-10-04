"use client";

import { useEffect, useRef, useState } from "react";

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
    setValue(0);
    const start = performance.now();
    const duration = 1100;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
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

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setOn(true);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <dl className="stats" ref={root}>
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
