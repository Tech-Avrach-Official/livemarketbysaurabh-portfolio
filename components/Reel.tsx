"use client";

import { useEffect, useRef, useState } from "react";
import { INSTAGRAM } from "@/lib/links";

/* One reel, playing on the page, with the whole card as the way out.

   Self-hosted rather than an Instagram embed. Five embeds are several
   megabytes of third-party iframe and script, they arrive wearing
   Instagram's own design — rounded corners, their typeface — on a page that
   has neither, and they break silently the day a post is deleted or made
   private.

   Four rules, each of which would otherwise be a bug:

   1. Nothing loads until it is near the viewport. Five videos starting at
      once is the page's whole data budget on a phone.
   2. Off screen, it pauses. A video nobody is looking at is just battery.
   3. It is muted and stays muted. Every browser blocks autoplay with sound,
      and the click is spent on the link out rather than on a sound toggle.
   4. A poster frame is shown first, so the card is never an empty box while
      a megabyte arrives. */

export default function Reel({ src, poster, index }: {
  src: string; poster: string; index: number;
}) {
  /* Optimistic: assume the file is there and let the poster paint at once.

     This used to probe with a HEAD request first, which meant the server
     rendered a labelled empty frame and the real card only appeared after
     the probe resolved on the client — a visible flash of "[/reels/1.mp4]"
     on every load, for files that are committed to the repo. The empty
     frame is now the error state rather than the starting state. */
  const [missing, setMissing] = useState(false);
  const host = useRef<HTMLAnchorElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [near, setNear] = useState(false);

  /* The observer calls play() the moment the card appears — but `near` has
     only just been set, React has not re-rendered, and the element still has
     no src, so that call fails silently and the video never starts. Four of
     five stayed frozen on their poster. Starting it again once the source is
     actually attached is what makes them all run. */
  useEffect(() => {
    if (!near) return;
    video.current?.play().catch(() => {});
  }, [near, missing]);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setNear(true); return; }
    const io = new IntersectionObserver(
      ([e]) => {
        const v = video.current;
        if (e.isIntersecting) {
          setNear(true);
          v?.play().catch(() => {});
        } else {
          v?.pause();
        }
      },
      { rootMargin: "200px", threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [missing]);

  return (
    <a className="reel" ref={host} href={INSTAGRAM} target="_blank" rel="noopener"
       data-delay={index % 3} aria-label={`Watch this and more on Instagram`}>
      <span className="reel-frame">
        {!missing ? (
          <video
            ref={video}
            src={near ? src : undefined}
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            onCanPlay={(e) => { void e.currentTarget.play().catch(() => {}); }}
            onError={() => setMissing(true)}
          />
        ) : (
          <span className="reel-empty" data-placeholder>
            [{src}]
          </span>
        )}
        <span className="reel-badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"
               strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
          </svg>
        </span>
      </span>
    </a>
  );
}
