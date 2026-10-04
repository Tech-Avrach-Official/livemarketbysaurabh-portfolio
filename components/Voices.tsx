"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

const DWELL = 4800;
const SLIDE = 620;

function Card({
  voice,
  role,
  run,
}: {
  voice: (typeof VOICES)[number];
  role: "current" | "peek";
  run?: number;
}) {
  return (
    <figure className={`voice-card is-${role}`} aria-hidden={role !== "current"}>
      <span className="voice-sheen" aria-hidden="true" />
      <blockquote className="voice-quote">
        <span className="voice-mark" aria-hidden="true">&ldquo;</span>
        {voice.text}
      </blockquote>
      <figcaption className="voice-meta">
        <img className="voice-avatar" src={voice.photo} alt="" />
        <span className="voice-name">{voice.name}</span>
        <span className="voice-city">{voice.city}</span>
        <span className="voice-time">{voice.time}</span>
      </figcaption>
      {role === "current" && (
        <div className="voice-progress" aria-hidden="true">
          <span key={run} />
        </div>
      )}
    </figure>
  );
}

export default function Voices() {
  const stage = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const busy = useRef(false);
  const paused = useRef(false);
  const reduced = useRef(false);
  const seen = useRef(false);
  const timer = useRef(0);
  const tracking = useRef(false);
  const axis = useRef<"x" | "y" | null>(null);
  const origin = useRef({ x: 0, y: 0, t: 0 });

  const [active, setActive] = useState(0);
  const [peek, setPeek] = useState<number | null>(null);
  const [dir, setDir] = useState<1 | -1>(1);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [instant, setInstant] = useState(false);
  const [held, setHeld] = useState(false);
  const [on, setOn] = useState(false);
  const [run, setRun] = useState(0);

  const len = VOICES.length;

  const arm = () => {
    window.clearTimeout(timer.current);
    if (reduced.current || !seen.current) return;
    timer.current = window.setTimeout(() => {
      if (paused.current || busy.current) {
        arm();
        return;
      }
      finish(1);
    }, DWELL);
  };

  const finish = (direction: 1 | -1, target?: number) => {
    if (busy.current) return;
    const next = target ?? (activeRef.current + direction + len) % len;
    if (next === activeRef.current) return;
    if (reduced.current) {
      activeRef.current = next;
      setActive(next);
      setPeek(null);
      setDragX(0);
      setRun((n) => n + 1);
      return;
    }
    const width = stage.current?.clientWidth || 1;
    busy.current = true;
    setDir(direction);
    setPeek(next);
    setDragging(false);
    requestAnimationFrame(() => setDragX(direction === 1 ? -width : width));
    window.setTimeout(() => {
      setInstant(true);
      setPeek(null);
      setDragX(0);
      activeRef.current = next;
      setActive(next);
      setRun((n) => n + 1);
      requestAnimationFrame(() => {
        setInstant(false);
        busy.current = false;
        paused.current = false;
        setHeld(false);
        arm();
      });
    }, SLIDE);
  };

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced.current) {
      seen.current = true;
      setOn(true);
      return;
    }
    let done = false;
    let raf = 0;
    const check = () => {
      if (done) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (!(r.bottom > vh * 0.15 && r.top < vh * 0.86)) return;
      done = true;
      cancelAnimationFrame(raf);
      seen.current = true;
      setOn(true);
      setRun((n) => n + 1);
      arm();
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
      window.clearTimeout(timer.current);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const hold = () => {
    paused.current = true;
    setHeld(true);
    window.clearTimeout(timer.current);
  };
  const resume = () => {
    paused.current = false;
    setHeld(false);
    arm();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (busy.current) return;
    tracking.current = true;
    axis.current = null;
    origin.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    hold();
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tracking.current || busy.current) return;
    const dx = e.clientX - origin.current.x;
    const dy = e.clientY - origin.current.y;
    if (!axis.current) {
      if (Math.hypot(dx, dy) < 8) return;
      axis.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (axis.current === "y") {
        tracking.current = false;
        resume();
        return;
      }
      stage.current?.setPointerCapture(e.pointerId);
      setDragging(true);
    }
    if (axis.current !== "x") return;
    const direction: 1 | -1 = dx < 0 ? 1 : -1;
    setDir(direction);
    setDragX(dx);
    setPeek((activeRef.current + direction + len) % len);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tracking.current && !dragging) return;
    const dx = e.clientX - origin.current.x;
    const dt = Math.max(16, performance.now() - origin.current.t);
    tracking.current = false;
    axis.current = null;
    setDragging(false);
    if (dx < -56 || dx / dt < -0.55) finish(1);
    else if (dx > 56 || dx / dt > 0.55) finish(-1);
    else {
      setDragX(0);
      setPeek(null);
      resume();
    }
  };

  const width = stage.current?.clientWidth || 1;
  const fade = Math.min(1, Math.abs(dragX) / width);

  return (
    <section className={`voices${on ? " is-on" : ""}`} ref={root}>
      <div className="wrap">
        <p className="eyebrow voice-reveal">04 — Members</p>
        <h2 className="voice-reveal">What members say</h2>
        <p className="section-sub voice-reveal">
          Not testimonials. Things people have actually said in the group.
        </p>

        <div
          className={`voice-stage voice-reveal${dragging ? " is-dragging" : ""}${instant ? " is-instant" : ""}${held ? " is-held" : ""}`}
          ref={stage}
          data-dir={dir}
          style={{
            ["--drag" as string]: `${dragX}px`,
            ["--peek" as string]: dir === 1 ? "100%" : "-100%",
            ["--fade" as string]: String(fade),
            ["--dwell" as string]: `${DWELL}ms`,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <Card voice={VOICES[active]} role="current" run={run} />
          {peek !== null && <Card voice={VOICES[peek]} role="peek" />}
        </div>

        <div className="voice-people" role="tablist" aria-label="Member quotes">
          {VOICES.map((v, i) => (
            <button
              key={v.name}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`${v.name}, ${v.city}`}
              className={i === active ? "is-on" : ""}
              onClick={() => {
                if (i === activeRef.current) return;
                hold();
                finish(i > activeRef.current ? 1 : -1, i);
              }}
            >
              {v.name.split(" ")[0]}
            </button>
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
