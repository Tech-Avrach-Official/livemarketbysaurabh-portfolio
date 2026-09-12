import { MEMBERS } from "@/lib/site";
import { telegram } from "@/lib/links";
import ChatWidget from "./ChatWidget";
const WEEK = [
  { day: "Mon–Fri · 8:30", text: "Pre-market thread opens. Levels go up for discussion — Saurabh's read included, not handed down as a tip." },
  { day: "9:15 – 15:30", text: "Live hours. Running commentary, questions, and trades put up to be sanity-checked before they're taken." },
  { day: "After close", text: "Review. Trades posted and picked apart — what worked, what didn't, and why. Losses included." },
  { day: "Saturday", text: "Weekly outlook, and the discussions worth re-reading from the week." },
  { day: "Sunday", text: "Doubt-clearing. Beginners get the floor and nobody gets mocked for asking." },
];

/* Illustrative candles. Direction is carried by the shape as well as the
   colour — red-green colour blindness affects roughly one man in twelve and
   this audience is mostly men. */
const Candle = () => (
  <svg className="candle" viewBox="0 0 22 14" fill="none" strokeWidth="1.6"
       strokeLinecap="round" aria-hidden="true">
    <g className="c-up"><path d="M3 2v10" /><rect x="1" y="4" width="4" height="6" rx="1" fill="currentColor" fillOpacity=".22" /></g>
    <g className="c-down"><path d="M11 1v12" /><rect x="9" y="3" width="4" height="7" rx="1" fill="currentColor" fillOpacity=".22" /></g>
    <g className="c-up"><path d="M19 3v9" /><rect x="17" y="5" width="4" height="5" rx="1" fill="currentColor" fillOpacity=".22" /></g>
  </svg>
);

export default function Community() {
  return (
    <section className="community" id="community">
      <div className="wrap">
        <p className="eyebrow">01 — Inside</p>
        <h2>What actually happens inside</h2>
        <p className="section-sub">
          Not a broadcast channel. A room where people talk back — and the
          rhythm is the same every week, so people plan around it.
        </p>

        <ol className="week-strip reveal">
          {WEEK.map((d, i) => (
            /* reveal on each card as well as the list: the stagger rules key
               off .reveal[data-delay], so data-delay alone did nothing. */
            <li key={d.day} className="reveal" data-delay={i}>
              <Candle />
              <span className="day">{d.day}</span>
              <p>{d.text}</p>
            </li>
          ))}
        </ol>

        <p className="community-culture">
          We talk about the losses too. <em>That&rsquo;s most of the value.</em>
        </p>

        {/* The two screenshot slots are gone. The widget below already
            carries what they were meant to prove — a beginner asking, a
            member admitting a loss, the room answering without mocking —
            and showing the same thing twice weakens both. The culture line
            moves in beside it, so the row fills without new content. */}
        <div className="evidence reveal">
          <ChatWidget />
          <aside className="evidence-note">
            {/* This sits beside a chat that is visibly moving, so the copy
                leans on that: the room is open now, you will not be alone in
                it, and nothing is asked of you on day one. Describing the
                group — which is what this said before — gave the reader
                nothing to do. */}
            <p className="community-aside">The room is open right now.</p>
            <p className="evidence-sub">
              People are in there talking about the same charts you have
              open. Ask anything and someone will answer — beginners
              included.
            </p>
            <p className="evidence-sub">
              It is free. You can just read for a week before you say a
              single word.
            </p>
            <a className="btn btn-soft evidence-cta" href={telegram("web_community")}
               target="_blank" rel="noopener">
              Join {MEMBERS} traders &mdash; free →
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
