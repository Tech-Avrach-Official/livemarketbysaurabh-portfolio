import { MEMBERS } from "@/lib/site";
import { telegram } from "@/lib/links";

/* The second and last ask, as one compact band rather than a full screen.

   It uses close-cta.jpg as its ground — the original social preview, which
   was composed for exactly this shape: a bull emerging from shadow on the
   right, gold haze low on the left, and two thirds of empty frame reserved
   for a headline. A purpose-made preview now lives at
   app/opengraph-image.jpg, so this artwork does one job and is named for it.

   The band stays dark in both themes. A baked-dark photograph cannot follow
   a light theme, and trying to make it would mean two images; committing to
   one dark band instead reads as deliberate — and a dark close on a light
   page is the strongest the last screen can look.

   The bull and bear SVG marks are gone from here: the photograph already
   has a bull in it, and two of them would be one too many. */
export default function CloseCta() {
  return (
    <section className="close" id="join">
      <div className="close-art" aria-hidden="true" />
      <div className="close-scrim" aria-hidden="true" />

      <div className="wrap">
        <div className="close-body">
          <p className="close-kicker">
            <span className="close-dot" aria-hidden="true" />
            The room is open
          </p>

          <h2>
            You don&rsquo;t have to <em>trade alone.</em>
          </h2>

          <p className="close-sub">
            Read for a week before you say anything. That&rsquo;s how most
            people start.
          </p>

          <div className="close-actions">
            <a className="btn btn-primary close-cta" href={telegram("web_close")}
               target="_blank" rel="noopener">
              <span>Join on Telegram</span>
            </a>
            <span className="close-meta">
              <strong className="num">{MEMBERS}</strong> members
              <i>·</i> Free
              <i>·</i> No tips, no spam
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
