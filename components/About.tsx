import Image from "next/image";
import MarketMarks from "./MarketMarks";
import StatCards from "./StatCards";
import { MEMBERS, HOST } from "@/lib/site";
import saurabh from "@/public/about.jpg";

/* ─────────────────────────────────────────────────────────────────────
   DRAFT BIO — for Saurabh to approve, edit or replace.

   It is written in his voice, which means it is not mine to publish: the
   prose is a starting point, and the square brackets are facts only he
   can fill. Read it through and change anything that isn't true.

   It follows the structure the doc asks for — how long, what he trades,
   the approach in a line, and then the part that actually matters: WHY a
   community rather than a paid tips service. That last paragraph is the
   trust anchor for the whole page. Everything above it on this site
   claims the room is honest; this is where the person running it says
   why, in the first person, and either it rings true or the page doesn't
   work.
   ───────────────────────────────────────────────────────────────────── */

export default function About() {
  return (
    <section className="about" id="about">
      <MarketMarks />

      <div className="wrap">
        <p className="eyebrow">01 — The host</p>

        <div className="about-grid reveal">
          <figure className="about-photo">
            <Image
              src={saurabh}
              alt={`${HOST.name}, who runs the LiveMarketBySaurabh community`}
              sizes="(max-width: 860px) 100vw, 380px"
              placeholder="blur"
            />
            <figcaption>
              <strong>{HOST.name}</strong>
              <span>{HOST.role}</span>
            </figcaption>
          </figure>

          <div className="about-copy">
            <h2>Who runs this</h2>

            <div className="about-bio">
              <p className="lede">
                I&rsquo;ve been trading for over eleven years now, mostly
                commodities — gold, silver and crude. My approach is not complicated: I
                trade levels, I decide where I&rsquo;m getting out before I get
                in, and I&rsquo;m wrong often enough to have stopped pretending
                otherwise.
              </p>
              <p>
                I built this community because of how I learned. For the first
                few years I traded alone, and every bad decision I made was one
                nobody was there to question. What finally changed my results
                wasn&rsquo;t a better indicator — it was having people to argue
                with.
              </p>
              <p>
                I could sell tips instead. It would be easier and it would pay
                better. But a tip makes you dependent on me, and dependent
                traders don&rsquo;t last. So I share my own read, I explain the
                reasoning behind it, and I let the room pull it apart. Some days
                the room is right and I&rsquo;m not. That is rather the point.
              </p>
            </div>

            <StatCards members={MEMBERS} />

            <p className="about-handles">
              <a href="/about">The full story →</a>
              <a href="/#channels">Where to find him →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
