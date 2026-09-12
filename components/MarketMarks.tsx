"use client";

import { useArtFile } from "@/lib/useArtFile";

/* Bull and bear, bleeding in from the two edges of the About section.

   They moved here from the closing CTA, which now carries a photograph of a
   bull already. Here they frame the person who runs the room instead —
   half of each animal outside the screen, so they read as the edges of
   something larger rather than two pictures placed on a page. On a wide
   screen most of what shows sits in the margin beside the text column, not
   behind it.

   The bear is mirrored. Both engravings were generated facing the same way,
   which put two animals looking in the same direction at opposite ends of
   the section — flipping one turns them to face each other and makes the
   pair read as a pair.

   Each file is a CSS mask: the artwork gives the shape, the stylesheet gives
   the colour, so one black-and-white engraving works on both themes. */

export default function MarketMarks() {
  const hasBull = useArtFile("/art/bull.png");
  const hasBear = useArtFile("/art/bear.png");

  /* Nothing until the real engravings are there.

     These used to fall back to hand-drawn SVG animals, which meant a crude
     outline appeared for the moment before the PNG resolved and then swapped
     under the reader. A watermark that flickers into something else is worse
     than one that simply arrives. */
  return (
    <>
      {hasBull && <span className="edge-mark is-bull is-art" aria-hidden="true" />}
      {hasBear && <span className="edge-mark is-bear is-art" aria-hidden="true" />}
    </>
  );
}
