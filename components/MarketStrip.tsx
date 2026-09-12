"use client";

import { useCallback } from "react";
import TradingViewWidget from "./TradingViewWidget";
import { GOLD, SILVER, CRUDE } from "@/lib/symbols";

export default function MarketStrip() {
  /* The strip is the first widget to load and sits near the top, so its
     failure is the earliest reliable signal that TradingView is unreachable
     altogether — an ad blocker, most often. The stylesheet then collapses
     both market sections rather than leaving ~900px of "Unavailable" boxes
     and a disclaimer with no prices under it. */
  const onFail = useCallback(() => {
    document.body.classList.add("tv-blocked");
  }, []);

  return (
    <section className="market-strip" aria-label="Live market prices">
      <TradingViewWidget
        id="ticker-strip"
        widget="ticker-tape"
        /* Tier 1: first market thing under the hero, and the gate for
           everything below the fold. */
        tier={1}
        fallback="Prices unavailable right now."
        onFail={onFail}
        config={{
          symbols: [
            { proName: GOLD, title: "Gold (spot)" },
            { proName: SILVER, title: "Silver (spot)" },
            { proName: CRUDE, title: "Crude (WTI)" },
          ],
          showSymbolLogo: false,
          /* Not transparent. The widget ignores isTransparent in this build
             and falls back to a white ground, which on the dark theme showed
             as a bright band across the page. Letting colorTheme paint it is
             the only reliable way to get a dark strip. */
          isTransparent: false,
          displayMode: "compact",
          colorTheme: "dark",
          locale: "in",
        }}
      />
    </section>
  );
}
