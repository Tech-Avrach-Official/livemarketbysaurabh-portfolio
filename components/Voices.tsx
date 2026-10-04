"use client";

import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────────
   ⚠  SAMPLE CONTENT — NOT FOR LAUNCH.

   The quotes, names and portraits below are stand-ins. Replace them with
   real, permitted quotes and the member's own photo before this page goes
   live. Publishing invented testimonials is deceptive advertising.
   ───────────────────────────────────────────────────────────────────── */
const SAMPLE = false;

const VOICES: { text: string; name: string; city: string; time: string; photo: string }[] = [
  { text: "Pehle main akela chart dekhta tha aur khud hi se argue karta tha. Ab kam se kam koi bol deta hai ki bhai ye level nahi hai.",
    name: "Rahul K", city: "Indore", time: "08:52", photo: "/voices/voice-rahul.jpg" },
  { text: "Gusse mein back-to-back teen trade le liye the. Kisi ne bola — aaj band karo. Maine kar diya. Wo ek message mehenga padne se bacha gaya.",
    name: "Priya S", city: "Pune", time: "09:41", photo: "/voices/voice-priya.jpg" },
  { text: "Maine pucha tha stop loss hota kya hai. Koi hasa nahi. Teen logon ne detail mein samjhaya.",
    name: "Neha B", city: "Jaipur", time: "11:07", photo: "/voices/voice-neha.jpg" },
  { text: "Ab entry se pehle likh leta hu ki nikalna kahan hai. Ye aadat yahin se aayi.",
    name: "Imran A", city: "Hyderabad", time: "15:36", photo: "/voices/voice-imran.jpg" },
  { text: "Apna sabse kharab trade yahan post kiya tha, dar lag raha tha. Jo replies aaye, utna kisi course se nahi seekha.",
    name: "Aman T", city: "Nagpur", time: "16:20", photo: "/voices/voice-aman.jpg" },
];

const DWELL = 4600;

export default function Voices() {
  const track = useRef<HTMLDivElement>(null);
  const index = useRef(0);
  const paused = useRef(false);
  const lock = useRef(false);
  const [active, setActive] = useState(0);

  const stride = () => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".voice-card");
    if (!el || !card) return 0;
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 0;
    return card.offsetWidth + gap;
  };

  const go = (next: number) => {
    const el = track.current;
    const width = stride();
    if (!el || !width) return;
    const n = ((next % VOICES.length) + VOICES.length) % VOICES.length;
    index.current = n;
    setActive(n);
    lock.current = true;
    el.scrollTo({ left: n * width, behavior: "smooth" });
    window.setTimeout(() => { lock.current = false; }, 700);
  };

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (paused.current) return;
      go(index.current + 1);
    }, DWELL);
    return () => window.clearInterval(id);
  }, []);

  const syncFromScroll = () => {
    if (lock.current) return;
    const el = track.current;
    const width = stride();
    if (!el || !width) return;
    const n = Math.max(0, Math.min(VOICES.length - 1, Math.round(el.scrollLeft / width)));
    if (n !== index.current) {
      index.current = n;
      setActive(n);
    }
  };

  const hold = () => { paused.current = true; };
  const release = () => {
    window.setTimeout(() => { paused.current = false; }, 5000);
  };

  return (
    <section className="voices">
      <div className="wrap">
        <p className="eyebrow">04 — Members</p>
        <h2>What members say</h2>
        <p className="section-sub">
          Not testimonials. Things people have actually said in the group.
        </p>

        <div
          className="voice-track"
          ref={track}
          onScroll={syncFromScroll}
          onPointerDown={hold}
          onPointerUp={release}
          onPointerCancel={release}
          onMouseEnter={hold}
          onMouseLeave={() => { paused.current = false; }}
        >
          {VOICES.map((v) => (
            <figure className="voice-card" key={v.name}>
              <img className="voice-photo" src={v.photo} alt="" />
              <blockquote className="voice-quote">{v.text}</blockquote>
              <figcaption className="voice-meta">
                <span className="voice-name">{v.name}</span>
                <span className="voice-city">{v.city}</span>
                <span className="voice-time">{v.time}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="voice-dots" role="tablist" aria-label="Member quotes">
          {VOICES.map((v, i) => (
            <button
              key={v.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`${v.name}, ${v.city}`}
              className={i === active ? "is-on" : ""}
              onClick={() => { hold(); go(i); release(); }}
            />
          ))}
        </div>

        {SAMPLE && (
          <p className="voices-warning" data-placeholder>
            ⚠ Sample quotes — invented names, invented words. Replace with real,
            permitted quotes before launch, then set <code>SAMPLE = false</code>{" "}
            in <code>Voices.tsx</code> to remove this line.
          </p>
        )}
      </div>
    </section>
  );
}
