"use client";

import { useEffect } from "react";

/* Reveal-on-scroll, with the safety net the vanilla build needed.

   A fast flick on mobile, a Cmd+End, or an anchor jump can move the viewport
   past an element between observer callbacks; the browser then reports it as
   simply "not intersecting" and it stays invisible for good. So every scroll
   also sweeps anything the viewport has already reached.

   Hiding content behind an animation is only acceptable if it is impossible
   for the content to stay hidden. */

export function useReveal() {
  useEffect(() => {
    const root = document.documentElement;
    // Gates the "starts hidden" rules, so content is only ever hidden while
    // this effect is alive to reveal it.
    root.classList.add("js");

    const reduced = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));

    if (reduced || !("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return () => root.classList.remove("js");
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    targets.forEach((el) => io.observe(el));

    let queued = false;
    const sweep = () => {
      queued = false;
      const vh = window.innerHeight;
      targets = targets.filter((el) => {
        if (el.classList.contains("is-in")) return false;
        if (el.getBoundingClientRect().top < vh) {
          el.classList.add("is-in");
          io.unobserve(el);
          return false;
        }
        return true;
      });
      if (!targets.length) window.removeEventListener("scroll", onScroll);
    };
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sweep);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    sweep();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      root.classList.remove("js");
    };
  }, []);
}
