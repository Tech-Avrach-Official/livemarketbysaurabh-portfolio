import CandleI from "./CandleI";
import { MEMBERS } from "@/lib/site";
import { telegram } from "@/lib/links";

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
      </div>
    </section>
  );
}
