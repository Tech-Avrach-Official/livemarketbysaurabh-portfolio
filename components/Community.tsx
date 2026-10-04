import { MEMBERS } from "@/lib/site";
import { telegram } from "@/lib/links";
import ChatWidget from "./ChatWidget";
import SessionRail from "./SessionRail";
const WEEK = [
  { day: "Mon–Fri · 8:30", text: "Pre-market thread opens. Levels go up for discussion — Saurabh's read included, not handed down as a tip." },
  { day: "9:15 – 15:30", text: "Live hours. Running commentary, questions, and trades put up to be sanity-checked before they're taken." },
  { day: "After close", text: "Review. Trades posted and picked apart — what worked, what didn't, and why. Losses included." },
  { day: "Saturday", text: "Weekly outlook, and the discussions worth re-reading from the week." },
  { day: "Sunday", text: "Doubt-clearing. Beginners get the floor and nobody gets mocked for asking." },
];

export default function Community() {
  return (
    <section className="community" id="community">
      <div className="wrap">
        <p className="eyebrow">02 — Inside</p>
        <h2>What actually happens inside</h2>
        <p className="section-sub">
          Not a broadcast channel. A room where people talk back — and the
          rhythm is the same every week, so people plan around it.
        </p>

        <SessionRail steps={WEEK} />

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
