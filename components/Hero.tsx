import CandleI from "./CandleI";
import { MEMBERS } from "@/lib/site";
import { telegram } from "@/lib/links";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-media" aria-hidden="true">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/Trading-hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="wrap hero-inner">
        <p className="hero-kicker hero-in">
          Telegram community
          <span>Gold · Silver · Crude</span>
        </p>
        {/* One candle, in Trading. It ticks between up and down rather
            than sitting green — a headline that only ever shows green is
            making a claim this page spends ten sections not making. */}
        <h1>
          <span className="hero-line hero-in">
            Trad<CandleI />ng is lonely.
          </span>
          <span className="hero-line hero-in">
            <em>It doesn&rsquo;t have to be.</em>
          </span>
        </h1>
        <p className="sub hero-in">
          Charts discussed before the open, trades reviewed after the close,
          and a room full of traders who take it seriously.
        </p>
        <a className="btn btn-primary hero-in" href={telegram("web_hero")} target="_blank" rel="noopener">
          Join the Community on Telegram
        </a>
        <dl className="hero-stats">
          <div className="hero-in">
            <dt className="num">{MEMBERS}</dt>
            <dd>members</dd>
          </div>
          <div className="hero-in">
            <dt className="num">Mon&ndash;Fri</dt>
            <dd>pre-market from 8:30</dd>
          </div>
          <div className="hero-in">
            <dt className="num">Free</dt>
            <dd>no tips, no spam</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
