import Reel from "./Reel";
import { INSTAGRAM } from "@/lib/links";

/* Five reels, playing on the page. No captions: the first moments of each
   reel are its own title card, so a line of text underneath would be the
   same thing said twice — and five captions under five moving videos is
   noise competing with the thing it labels.

   Every card leads to the same place, the profile, rather than to five
   individual posts: one destination the visitor can follow, instead of five
   dead ends they have to come back from. */
const REELS = [1, 2, 3, 4, 5];

export default function Feed() {
  return (
    <section className="feed">
      <div className="wrap">
        <p className="eyebrow">06 — Feed</p>
        <div className="feed-head">
          <div>
            <h2>From the feed</h2>
            <p className="section-sub">
              Short breakdowns, posted through the week.
            </p>
          </div>
          <a className="feed-all" href={INSTAGRAM} target="_blank" rel="noopener">
            View all on Instagram →
          </a>
        </div>
      </div>

      <div className="reels wrap reveal">
        {REELS.map((n, i) => (
          <Reel key={n} index={i} src={`/reels/${n}.mp4`} poster={`/reels/${n}.jpg`} />
        ))}
      </div>
    </section>
  );
}
