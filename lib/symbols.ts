/* Instruments.

   VERIFIED against TradingView's free tier on 2026-09-08:

     WORKS   OANDA:XAUUSD  gold spot,   USD / troy ounce
             OANDA:XAGUSD  silver spot, USD / troy ounce
             TVC:USOIL     WTI crude,   USD / barrel
             FX_IDC:XAUINR gold spot,   INR / troy ounce
             BSE:SENSEX    delayed

     BLOCKED MCX:GOLD1! / MCX:SILVER1! / MCX:CRUDEOIL1!  (licensed)
             NSE:NIFTY / NSE:BANKNIFTY and every alias tried

   The INR symbols quote per TROY OUNCE, not per 10g (gold) or per kg
   (silver) as MCX and Indian retail do. Gold at ~$4,398/oz shows as
   ~₹4,17,800/oz where a trader expects ~₹1,34,300 per 10g — a rupee sign on
   the wrong unit reads as a wrong price. USD spot is used throughout because
   it is unambiguous. */

export const GOLD = "OANDA:XAUUSD";
export const SILVER = "OANDA:XAGUSD";
export const CRUDE = "TVC:USOIL";

/* Each card carries two different instruments, and that was the problem: the
   chart is international spot in dollars, the spec underneath is the MCX
   contract in rupees, and nothing said so. Read quickly it looked like one
   claim contradicting itself.

   They are not in conflict — MCX tracks these benchmarks with the rupee and
   import duty on top — but the card has to say which is which. So `sub`
   labels the chart as spot, and `spec` is introduced as what the room
   actually trades. Same two facts, no longer reading as a mistake. */
export const INSTRUMENTS = [
  { key: "gold", symbol: GOLD, name: "Gold", sub: "Spot XAU/USD · per troy ounce",
    spec: "MCX GOLD · 1 kg lot · tick ₹1",
    art: "/art/gold-bar.png", alt: "Cast gold bullion bar" },
  { key: "silver", symbol: SILVER, name: "Silver", sub: "Spot XAG/USD · per troy ounce",
    spec: "MCX SILVER · 30 kg lot · tick ₹1",
    art: "/art/silver-bar.png", alt: "Cast silver bullion bar" },
  { key: "crude", symbol: CRUDE, name: "Crude", sub: "Spot WTI · per barrel",
    spec: "MCX CRUDEOIL · 100 bbl lot · tick ₹1",
    art: "/art/crude.png", alt: "Weathered steel oil barrel" },
] as const;
