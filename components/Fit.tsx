"use client";

import { useLayoutEffect, useRef, useState } from "react";

/* Marks drawn as candles rather than a tick and a cross.

   ✓ and ✕ are the two most generic symbols in interface design; on a page
   whose whole character comes from small specific choices — the candle in
   the headline, the candles across the weekly rhythm — they are the one
   place that could belong to any website.

   Both bodies are solid; what separates them is where the body sits on the
   wick — high on the first column, low on the second. That is the actual
   difference between an up candle and a down one, and it survives for a
   red-green colour-blind reader, which matters more than usual here:
   the two lists stay distinguishable for a red-green colour-blind reader,
   which is roughly one man in twelve and this audience is mostly men. */
const CandleMark = ({ up }: { up: boolean }) => (
  <svg className="fit-candle" viewBox="0 0 12 22" fill="none" stroke="currentColor"
       strokeWidth="1.5" strokeLinecap="round" aria-hidden="true" focusable="false">
    {up ? (
      <>
        <path d="M6 1.5v19" />
        <rect x="1.6" y="4.5" width="8.8" height="9.5" fill="currentColor" />
      </>
    ) : (
      <>
        <path d="M6 1.5v19" />
        <rect x="1.6" y="8" width="8.8" height="9.5" fill="currentColor" />
      </>
    )}
  </svg>
);

const JOIN = [
  "You trade, or you're learning seriously.",
  "You want to discuss and improve, not just receive.",
  "You can give as well as take.",
  "You're fine being disagreed with.",
];

const DONT = [
  "You want guaranteed tips.",
  "You want buy/sell calls to follow blindly.",
  "You're here to promote your own service.",
  "You expect profit without doing the work.",
];

export default function Fit() {
  const root = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    let done = false;
    let raf = 0;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!(r.bottom > vh * 0.12 && r.top < vh * 0.82)) return;
      done = true;
      cancelAnimationFrame(raf);
      setOn(true);
    };
    const loop = () => {
      check();
      if (!done) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("scroll", check, { passive: true });
    return () => {
      done = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", check);
    };
  }, []);

  return (
    <section className={`fit${on ? " is-on" : ""}`} ref={root}>
      <div className="wrap">
        <p className="eyebrow fit-reveal">05 — Fit</p>
        <h2 className="fit-reveal">Who this is for &mdash; and who it isn&rsquo;t</h2>
        <p className="section-sub fit-reveal">
          Most pages like this try to be for everyone. This one would rather
          you knew before you joined.
        </p>

        <div className="fit-grid">
          <div className="fit-col fit-yes fit-reveal">
            <h3>Join if</h3>
            <ul>
              {JOIN.map((t) => (
                <li key={t}><CandleMark up />{t}</li>
              ))}
            </ul>
          </div>
          <div className="fit-col fit-no fit-reveal">
            <h3>Don&rsquo;t join if</h3>
            <ul>
              {DONT.map((t) => (
                <li key={t}><CandleMark up={false} />{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* The section's actual argument, said out loud. Turning people away
            is the strongest signal available that the room has a standard —
            but only if the page says that is what it is doing. */}
        <p className="fit-line fit-reveal">
          The second list is the more important one. A room that will take
          anyone isn&rsquo;t worth being in.
        </p>
      </div>
    </section>
  );
}
