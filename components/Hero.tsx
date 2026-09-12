import CandleI from "./CandleI";
import { MEMBERS, HOST } from "@/lib/site";
import { telegram } from "@/lib/links";
import Image from "next/image";
import saurabh from "@/public/hero-saurabh.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div className="hero-copy reveal">
          <p className="hero-kicker">
            Telegram community
            <span>Gold · Silver · Crude</span>
          </p>
          {/* One candle, in Trading. It ticks between up and down rather
              than sitting green — a headline that only ever shows green is
              making a claim this page spends ten sections not making. */}
          <h1>
            Trad<CandleI />ng is lonely.
            <br />
            <em>It doesn&rsquo;t have to be.</em>
          </h1>
          <p className="sub">
            Charts discussed before the open, trades reviewed after the close,
            and a room full of traders who take it seriously.
          </p>
          <a className="btn btn-primary" href={telegram("web_hero")} target="_blank" rel="noopener">
            Join the Community on Telegram
          </a>
          <dl className="hero-stats">
            <div>
              <dt className="num">{MEMBERS}</dt>
              <dd>members</dd>
            </div>
            <div>
              <dt className="num">Mon&ndash;Fri</dt>
              <dd>pre-market from 8:30</dd>
            </div>
            <div>
              <dt className="num">Free</dt>
              <dd>no tips, no spam</dd>
            </div>
          </dl>
        </div>

        {/* Cropped tight from the supplied frame. The original was a wide
            shot of a marble-and-gold office — gold horse, skyline, watch on
            show. All of that is outside this crop deliberately: the rest of
            the page argues that this is a room where people discuss losses
            honestly, and a wealth-flex portrait would contradict it. */}
        <figure className="hero-photo reveal" data-delay="2">
          <Image
            src={saurabh}
            alt="Saurabh, who runs the LiveMarketBySaurabh community"
            priority
            sizes="(max-width: 640px) 300px, (max-width: 960px) 380px, 460px"
          />
          {/* An unlabelled face is a wasted one on a personal-brand page —
              most visitors arrive from a reel and need the name confirmed. */}
          <figcaption>
            <span className="cap-meet">Meet</span>
            <strong>{HOST.name}</strong>
            <span className="cap-role">{HOST.role}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
