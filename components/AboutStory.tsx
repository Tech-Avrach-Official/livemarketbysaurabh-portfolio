import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";
import Reveal from "./Reveal";
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
    desc: "The community itself. Pre-market levels, live hours and the post-market review.",
    action: "Join",
    href: telegram("web_about"),
  },
  {
    brand: "instagram", name: "Instagram", Mark: InstagramMark,
    handle: "@livemarketbysaurabh",
    desc: "Daily market snapshots, short reels and quick lessons through the week.",
    action: "Follow",
    href: INSTAGRAM,
  },
  {
    brand: "youtube", name: "YouTube", Mark: YouTubeMark,
    handle: "@LivemarketbySaurabh",
    desc: "Detailed breakdowns and the weekly outlook, in full and without the hurry.",
    action: "Subscribe",
    href: YOUTUBE,
  },
];

export default function AboutStory() {
  return (
    <>
      <Reveal />
      <Header />
      <main id="top" className="about-page">
        <section className="profile-hero">
          <div className="wrap profile-hero-grid">
            <div className="profile-lead">
              <p className="eyebrow">About</p>
              <h1>{HOST.name}</h1>
              <p className="profile-role">{HOST.role}</p>
              <p>
                I&rsquo;ve been trading for over eleven years now, mostly
                commodities — gold, silver and crude. My approach is not
                complicated: I trade levels, I decide where I&rsquo;m getting
                out before I get in, and I&rsquo;m wrong often enough to have
                stopped pretending otherwise.
              </p>
            </div>

            <figure className="profile-portrait">
              <span className="profile-plate" aria-hidden="true" />
              <Image
                src={saurabh}
                alt={`${HOST.name}, who runs the LiveMarketBySaurabh community`}
                sizes="(max-width: 800px) 78vw, 420px"
                placeholder="blur"
                priority
              />
            </figure>
          </div>
        </section>

        <section className="profile-essay">
          <div className="wrap">
            <p className="eyebrow">The reason</p>
            <h2>Why a room, not a tip</h2>
            <p>
              I built this community because of how I learned. For the first
              few years I traded alone, and every bad decision I made was one
              nobody was there to question. What finally changed my results
              wasn&rsquo;t a better indicator — it was having people to argue
              with.
            </p>
            <p className="profile-point">
              I could sell tips instead. It would be easier and it would pay
              better. But a tip makes you dependent on me, and dependent
              traders don&rsquo;t last. So I share my own read, I explain the
              reasoning behind it, and I let the room pull it apart. Some days
              the room is right and I&rsquo;m not. That is rather the point.
            </p>
          </div>
        </section>

        <section className="profile-facts" aria-label="A few facts">
          <dl className="wrap">
            <div>
              <dt>11+</dt>
              <dd>years trading</dd>
            </div>
            <div>
              <dt>{MEMBERS}</dt>
              <dd>traders in the room</dd>
            </div>
            <div>
              <dt>Gold · Silver · Crude</dt>
              <dd>what the room trades</dd>
            </div>
          </dl>
        </section>

        <section className="profile-week">
          <div className="wrap">
            <p className="eyebrow">The week</p>
            <h2>How a week actually runs</h2>
            <ol className="profile-days">
              {WEEK.map((step) => (
                <li key={step.day}>
                  <strong>{step.day}</strong>
                  <span>{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="profile-places">
          <div className="wrap">
            <p className="eyebrow">Find the room</p>
            <h2>Three places, one conversation</h2>
            <ul className="profile-links">
              {PLACES.map((c) => (
                <li key={c.name}>
                  <a href={c.href} target="_blank" rel="noopener" data-brand={c.brand}>
                    <span className="profile-link-icon"><c.Mark /></span>
                    <span className="profile-link-copy">
                      <strong>{c.name}</strong>
                      <em>{c.handle}</em>
                      <span>{c.desc}</span>
                    </span>
                    <span className="profile-link-go">{c.action} →</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="legal-back"><a href="/">← Back to the site</a></p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
