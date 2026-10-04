"use client";

import { useLayoutEffect, useRef, useState } from "react";

type Step = { day: string; text: string };

/* Draws the week as a line that starts at the first mark and stops at the
   last one. The draw waits until the row is actually on screen. */
export default function SessionRail({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLOListElement>(null);
  const [on, setOn] = useState(false);

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
      const entered = r.bottom > vh * 0.12 && r.top < vh * 0.88;
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
    <ol className={`session-rail${on ? " is-on" : ""}`} ref={root}>
      {steps.map((d) => (
        <li key={d.day}>
          <span className="session-node" aria-hidden="true" />
          <span className="day">{d.day}</span>
          <p>{d.text}</p>
        </li>
      ))}
    </ol>
  );
}
