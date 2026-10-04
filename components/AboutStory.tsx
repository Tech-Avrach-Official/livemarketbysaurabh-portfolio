import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
import MarketMarks from "./MarketMarks";
import StatCards from "./StatCards";
import SessionRail from "./SessionRail";
import { TelegramMark, InstagramMark, YouTubeMark } from "./ChannelIcons";
import { HOST, MEMBERS } from "@/lib/site";
import { telegram, INSTAGRAM, YOUTUBE } from "@/lib/links";
import saurabh from "@/public/about.jpg";

/* Same week the homepage describes. Kept here so the about page can stand
   on its own without pulling the community section in with it. */
const WEEK = [
  { day: "Mon–Fri · 8:30", text: "Pre-market thread opens. Levels go up for discussion — Saurabh's read included, not handed down as a tip." },
  { day: "9:15 – 15:30", text: "Live hours. Running commentary, questions, and trades put up to be sanity-checked before they're taken." },
  { day: "After close", text: "Review. Trades posted and picked apart — what worked, what didn't, and why. Losses included." },
  { day: "Saturday", text: "Weekly outlook, and the discussions worth re-reading from the week." },
  { day: "Sunday", text: "Doubt-clearing. Beginners get the floor and nobody gets mocked for asking." },
];

const PLACES = [
  {
    brand: "telegram", name: "Telegram", Mark: TelegramMark,
    handle: "@live_market_by_saurabh",
    desc: "The community itself. Pre-market levels, live hours and the post-market review — all of it discussion, none of it broadcast.",
    action: "Join the community", primary: true,
    href: telegram("web_about"),
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

export default function AboutStory() {
  return (
    <>
      <Reveal />
      <Header />
      <main id="top" className="about-page">
        <section className="about">
          <MarketMarks />
          <div className="wrap">
            <p className="eyebrow">About</p>
            <div className="about-grid">
              <figure className="about-photo">
                <Image
                  src={saurabh}
                  alt={`${HOST.name}, who runs the LiveMarketBySaurabh community`}
                  sizes="(max-width: 860px) 100vw, 380px"
                  placeholder="blur"
                  priority
                />
                <figcaption>
                  <strong>{HOST.name}</strong>
                  <span>{HOST.role}</span>
                </figcaption>
              </figure>

              <div className="about-copy">
                <h1>Who runs this</h1>
                <div className="about-bio">
                  <p className="lede">
                    I&rsquo;ve been trading for over eleven years now, mostly
                    commodities — gold, silver and crude. My approach is not
                    complicated: I trade levels, I decide where I&rsquo;m getting
                    out before I get in, and I&rsquo;m wrong often enough to have
                    stopped pretending otherwise.
                  </p>
                  <p>
                    I built this community because of how I learned. For the
                    first few years I traded alone, and every bad decision I
                    made was one nobody was there to question. What finally
                    changed my results wasn&rsquo;t a better indicator — it was
                    having people to argue with.
                  </p>
                  <p>
                    I could sell tips instead. It would be easier and it would
                    pay better. But a tip makes you dependent on me, and
                    dependent traders don&rsquo;t last. So I share my own read,
                    I explain the reasoning behind it, and I let the room pull
                    it apart. Some days the room is right and I&rsquo;m not.
                    That is rather the point.
                  </p>
                </div>
                <StatCards members={MEMBERS} />
              </div>
            </div>
          </div>
        </section>

        <section className="about-week">
          <div className="wrap">
            <p className="eyebrow">The week</p>
            <h2>The same rhythm, every week</h2>
            <p className="section-sub">
              Not a broadcast. A room people can plan around — levels before
              the open, the day itself, and a review after the close that
              includes the losses.
            </p>
            <SessionRail steps={WEEK} />
          </div>
        </section>

        <section className="about-find">
          <div className="wrap">
            <p className="eyebrow">Find him</p>
            <h2>Where the room actually is</h2>
            <p className="section-sub">
              The conversation lives on Telegram. Instagram and YouTube are
              where the shorter notes and the longer breakdowns go.
            </p>
            <div className="channel-grid">
              {PLACES.map((c) => (
                <a
                  key={c.name}
                  className={`channel ${c.primary ? "is-primary" : ""}`}
                  data-brand={c.brand}
                  href={c.href}
                  target="_blank"
                  rel="noopener"
                >
                  <span className="ch-beam" aria-hidden="true" />
                  <span className="ch-icon"><c.Mark /></span>
                  <span className="ch-name">{c.name}</span>
                  <span className="ch-handle">{c.handle}</span>
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
            <p className="legal-back"><a href="/">← Back to the site</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
