"use client";

import { useEffect, useState } from "react";

/* Has this artwork file landed yet?

   These files are used as CSS masks, and a mask fires no load event of its
   own, so each one has to be probed first.

   It cannot be probed with <img onLoad>. A file that is cached — or simply
   decoded quickly, which on localhost is every time — finishes loading
   before React attaches the handler, so the event is missed and the slot
   stays empty forever with the file sitting right there in public/art.
   Probing imperatively avoids the race: assigning src after onload means
   the callback runs even when the browser answers from cache. */
export function useArtFile(src: string) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let live = true;
    const img = new Image();
    img.onload = () => { if (live) setOk(true); };
    img.onerror = () => { if (live) setOk(false); };
    img.src = src;
    return () => { live = false; };
  }, [src]);

  return ok;
}
