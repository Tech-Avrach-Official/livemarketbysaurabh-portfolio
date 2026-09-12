import Image from "next/image";
import logo from "@/public/logo.png";

/* The supplied file is a circular profile photo on a green field, not a
   logotype. Two consequences handled here:

   1. The green is cropped away rather than shown. It would clash with the
      gold accent, and green already means "price up" everywhere else on this
      page — a green disc in the masthead reads as a market signal.
   2. A face is not legible as a brand at 28px, so the mark always travels
      with the wordmark; the text carries the name, the photo carries the
      recognition from Instagram and YouTube. */

export default function Wordmark({
  /* "/" rather than "#top": on /privacy the old value scrolled that page to
     its own top instead of returning to the site. */
  href = "/",
  size = 28,
  className = "",
}: {
  href?: string;
  size?: number;
  className?: string;
}) {
  return (
    <a className={`wordmark ${className}`} href={href}>
      <span className="wordmark-mark" style={{ width: size, height: size }}>
        <Image
          src={logo}
          alt=""
          width={size * 2}
          height={size * 2}
          priority
          aria-hidden="true"
        />
      </span>
      <span className="wordmark-text">
        LiveMarket<span>BySaurabh</span>
      </span>
    </a>
  );
}
