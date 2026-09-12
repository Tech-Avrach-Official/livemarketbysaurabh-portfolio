import { telegram, INSTAGRAM, YOUTUBE } from "@/lib/links";
import { TelegramMark, InstagramMark, YouTubeMark } from "./ChannelIcons";

/* Three cards, not four rows.

   X is gone: the doc's rule for this section is that only genuinely active
   accounts belong here, because a dead account costs more trust than an
   absent one.

   No follower counts either. A number that goes up every day and gets
   updated once a year is worse than no number — the first visitor who
   checks and finds the site behind reads everything else on it differently.
   The count still appears where it is maintained: the hero, the chat header
   and the closing CTA all read it from one constant.

   Each card ends in an action rather than a description, so the row asks
   for something instead of just pointing at it. */
const CHANNELS = [
  {
    brand: "telegram", name: "Telegram", Mark: TelegramMark,
    handle: "@live_market_by_saurabh",
    desc: "The community itself. Pre-market levels, live hours and the post-market review — all of it discussion, none of it broadcast.",
    action: "Join the community", primary: true,
    href: telegram("web_channels"),
  },
  {
    brand: "instagram", name: "Instagram", Mark: InstagramMark,
    handle: "@livemarketbysaurabh",
    desc: "Daily market snapshots, short reels and quick lessons through the week.",
    action: "Follow on Instagram",
    href: INSTAGRAM,
  },
  {
    brand: "youtube", name: "YouTube", Mark: YouTubeMark,
    handle: "@LivemarketbySaurabh",
    desc: "Detailed breakdowns and the weekly outlook, in full and without the hurry.",
    action: "Subscribe on YouTube",
    href: YOUTUBE,
  },
];

export default function Channels() {
  return (
    <section className="channels" id="channels">
      <div className="wrap">
        <p className="eyebrow">07 — Channels</p>
        <h2>Where we are</h2>
        <p className="section-sub">
          The conversation lives on Telegram. The rest is where we share what
          we&rsquo;re seeing.
        </p>

        <div className="channel-grid reveal">
          {CHANNELS.map((c, i) => (
            <a
              key={c.name}
              className={`channel ${c.primary ? "is-primary" : ""}`}
              data-brand={c.brand}
              href={c.href}
              data-delay={i}
              {...(c.href === "#" ? {} : { target: "_blank", rel: "noopener" })}
            >
              {/* The beam. Its own element so it can be blurred and clipped
                  to the card without touching the type above it. */}
              <span className="ch-beam" aria-hidden="true" />

              <span className="ch-icon"><c.Mark /></span>

              <span className="ch-name">{c.name}</span>
              <span
                className="ch-handle"
                {...(c.handle.startsWith("[") ? { "data-placeholder": true } : {})}
              >
                {c.handle}
              </span>

              <span className="ch-desc">{c.desc}</span>

              <span className="ch-action">
                {c.action}
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"
                     strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M2 8h11M9 4l4 4-4 4" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
