"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { MEMBERS } from "@/lib/site";
import { telegram } from "@/lib/links";

/* A preview of the group that keeps running, with a working door at the
   bottom of it.

   The input is deliberately NOT a fake chat. Typing a real question and
   getting "come to Telegram" back would be a bait-and-switch, on a page
   that spends ten sections promising there is no catch. So whatever is
   typed here carries the visitor to the place that can answer it, and the
   acknowledgement is a system line — never words put in Saurabh's mouth. */

type Msg = { from: "host" | "member" | "system" | "you"; name?: string; text: string };

/* Plain, conversational English — the way the room actually talks, not the
   way a brochure does. */
const OPENING: Msg[] = [
  { from: "member", name: "Rahul", text: "Good morning everyone 👋" },
  { from: "host", name: "Saurabh", text: "Morning. Gold is sitting at the same level as Monday — still no breakout." },
  { from: "member", name: "Priya", text: "Yes, it has been stuck there for three days now." },
  { from: "member", name: "Imran", text: "Should I buy now or wait for it to break?" },
  { from: "host", name: "Saurabh", text: "Wait. Let it close above first. No need to rush." },
];

const STREAM: Msg[] = [
  { from: "member", name: "Priya", text: "I tried yesterday and got stopped out 😅" },
  { from: "host", name: "Saurabh", text: "Happens to all of us. Post your chart, we will look at it together." },
  { from: "member", name: "Priya", text: "Posting now, one minute" },
  { from: "member", name: "Aman", text: "Silver is looking better today" },
  { from: "member", name: "Rahul", text: "Anyone watching crude? It dropped fast in the last hour." },
  { from: "host", name: "Saurabh", text: "Yes. Do not chase it — wait for it to settle." },
  { from: "member", name: "Neha", text: "Beginner question — what exactly is a stop loss?" },
  { from: "member", name: "Imran", text: "It is the price where you accept you were wrong and get out." },
  { from: "host", name: "Saurabh", text: "Well said. Decide it before you enter, never after." },
  { from: "member", name: "Neha", text: "That makes sense, thank you 🙏" },
  { from: "member", name: "Aman", text: "Market opens in twenty minutes, getting ready" },
  { from: "host", name: "Saurabh", text: "Levels are in the pinned message. See you at the open." },
];

const PROMPTS = [
  "Ask your question…",
  "Join the live chat…",
  "Say hello to the room…",
];

const REPLIES = [
  "That is a question for the room, not a web page. A few thousand traders are on Telegram right now.",
  "Good one — the kind that gets three different answers in the group. Bring it there.",
  "Worth talking through properly. Come and put it to the room.",
  "This page cannot answer that. The people on Telegram can.",
  "Ask that inside — someone is usually awake and watching the same chart.",
];

const OPEN_MS = 620;      // pace of the first few lines
const FIRST_MS = 260;     // the first line lands almost at once
const TYPING_MS = 380;
const STREAM_MIN = 3800;  // then it slows to a background murmur
const STREAM_MAX = 6200;
const MAX_MSGS = 26;      // the DOM never grows without limit

export default function ChatWidget() {
  const root = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const stick = useRef(true);          // is the reader pinned to the bottom?
  const streamIdx = useRef(0);

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [openingDone, setOpeningDone] = useState(false);
  const [sent, setSent] = useState(false);
  const [draft, setDraft] = useState("");
  const [placeholder, setPlaceholder] = useState(PROMPTS[0]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const push = useCallback((m: Msg) => {
    setMsgs((prev) => {
      const next = [...prev, m];
      return next.length > MAX_MSGS ? next.slice(next.length - MAX_MSGS) : next;
    });
  }, []);

  /* Start when the widget is on screen, and stop the murmur when it is not —
     an animation nobody is looking at is just battery. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setStarted(true); return; }
    const io = new IntersectionObserver(
      ([e]) => { setVisible(e.isIntersecting); if (e.isIntersecting) setStarted(true); },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Opening run
  useEffect(() => {
    if (!started || openingDone) return;
    if (reduced.current) { setMsgs(OPENING); setOpeningDone(true); return; }
    const i = msgs.length;
    if (i >= OPENING.length) { setOpeningDone(true); setTyping(false); return; }
    const step = i === 0 ? FIRST_MS : OPEN_MS;
    const t1 = window.setTimeout(() => setTyping(true), Math.max(0, step - TYPING_MS));
    const t2 = window.setTimeout(() => { setTyping(false); push(OPENING[i]); }, step);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [started, openingDone, msgs.length, push]);

  // The murmur: keeps going, slowly, cycling the pool
  useEffect(() => {
    if (!openingDone || !visible || reduced.current) return;
    if (sent) return;   // once the visitor has spoken, the room stops talking over them
    const wait = STREAM_MIN + Math.random() * (STREAM_MAX - STREAM_MIN);
    const t1 = window.setTimeout(() => setTyping(true), wait - TYPING_MS);
    const t2 = window.setTimeout(() => {
      setTyping(false);
      push(STREAM[streamIdx.current % STREAM.length]);
      streamIdx.current += 1;
    }, wait);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [openingDone, visible, sent, msgs.length, push]);

  /* Follow the conversation only while the reader is already at the bottom.
     Yanking them back down while they are reading earlier lines would be
     worse than letting a message arrive unseen. */
  useEffect(() => {
    const b = bodyRef.current;
    if (!b || !stick.current) return;
    b.scrollTop = b.scrollHeight;
  }, [msgs, typing]);

  const onScroll = useCallback(() => {
    const b = bodyRef.current;
    if (!b) return;
    stick.current = b.scrollHeight - b.scrollTop - b.clientHeight < 40;
  }, []);

  // Typewriter placeholder, once the opening has played
  useEffect(() => {
    if (!openingDone || sent || reduced.current) return;
    let i = 0, pos = 0, dir = 1;
    let timer = 0;
    const tick = () => {
      const word = PROMPTS[i];
      pos += dir;
      setPlaceholder(word.slice(0, pos));
      if (pos === word.length) { dir = -1; timer = window.setTimeout(tick, 1700); return; }
      if (pos === 0) { dir = 1; i = (i + 1) % PROMPTS.length; }
      timer = window.setTimeout(tick, dir > 0 ? 55 : 26);
    };
    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
  }, [openingDone, sent]);

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sent) return;
    stick.current = true;
    setSent(true);
    setDraft("");
    push({ from: "you", name: "You", text });
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      push({ from: "system", text: REPLIES[Math.floor(Math.random() * REPLIES.length)] });
    }, 1100);
  }, [draft, sent, push]);

  return (
    <figure className="chat-mock" ref={root}>
      <div className="chat-head">
        <span className="chat-avatar">
          <Image src={logo} alt="" width={72} height={72} aria-hidden="true" />
        </span>
        <span className="chat-name">LiveMarketBySaurabh</span>
        <span className="chat-count num">{MEMBERS} members</span>
      </div>

      {/* Deliberately not a live region. The murmur never stops, so aria-live
          would have a screen reader announcing simulated chatter for as long
          as the section is on screen. The figcaption below says what this is;
          the real conversation is behind the Telegram link. */}
      <div className="chat-stage">
        <div className="chat-chart" aria-hidden="true" />
      <div className="chat-body" ref={bodyRef} onScroll={onScroll}>
        {msgs.map((m, i) => (
          <div key={i} className={`bubble is-${m.from}`}>
            {m.name && <b>{m.name}</b>}
            {m.text}
            {m.from === "system" && (
              <a className="bubble-cta" href={telegram("web_chatwidget")}
                 target="_blank" rel="noopener">
                Open Telegram →
              </a>
            )}
          </div>
        ))}
        {typing && (
          <div className="bubble typing" aria-hidden="true"><span /><span /><span /></div>
        )}
      </div>
      </div>

      <form className={`chat-input ${openingDone && !sent ? "is-live" : ""}`} onSubmit={onSubmit}>
        <label className="sr-only" htmlFor="chat-draft">
          Type a message. Sending opens the Telegram group, where questions are answered.
        </label>
        <input
          id="chat-draft"
          type="text"
          autoComplete="off"
          value={draft}
          placeholder={sent ? "Carry on in the group →" : placeholder}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" aria-label="Send">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 2 9.5 10.5M18 2l-5.5 16-3-7.5-7.5-3L18 2Z" />
          </svg>
        </button>
      </form>

      <figcaption>
        A preview of the group. Anything you send here opens Telegram, where
        it will actually be read.
      </figcaption>
    </figure>
  );
}
