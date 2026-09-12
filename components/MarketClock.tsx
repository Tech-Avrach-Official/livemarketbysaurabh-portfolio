"use client";

import { useEffect, useState } from "react";

/* MCX non-agri commodities: 09:00–23:30 IST, Monday to Friday.

   Read in Asia/Kolkata regardless of where the visitor is — a pill telling
   someone in Dubai "OPEN" at their own 10am would be worse than no pill. */

const OPEN_MIN = 9 * 60;
const CLOSE_MIN = 23 * 60 + 30;
const DAYS: Record<string, number> = {
  Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
};

type Now = { dow: number; mins: number; hh: string; mm: string };

function istNow(): Now | null {
  try {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false,
    });
    const parts: Record<string, string> = {};
    fmt.formatToParts(new Date()).forEach((p) => (parts[p.type] = p.value));
    const dow = DAYS[parts.weekday];
    const h = parseInt(parts.hour, 10) % 24;   // some engines report hour 24
    const m = parseInt(parts.minute, 10);
    if (dow === undefined || isNaN(h) || isNaN(m)) return null;
    return { dow, mins: h * 60 + m, hh: String(h).padStart(2, "0"), mm: String(m).padStart(2, "0") };
  } catch {
    return null;                                // no Intl tz data
  }
}

const isWeekday = (d: number) => d >= 1 && d <= 5;

function minsToOpen(now: Now) {
  if (isWeekday(now.dow) && now.mins < OPEN_MIN) return OPEN_MIN - now.mins;
  let days = 1;
  while (days < 8 && !isWeekday((now.dow + days) % 7)) days++;
  return 24 * 60 - now.mins + (days - 1) * 24 * 60 + OPEN_MIN;
}

function human(mins: number) {
  const h = Math.floor(mins / 60), m = mins % 60;
  // Over a day, "1 day" would round 43 hours down to something that reads as
  // tomorrow. Days plus hours stays honest and still short.
  if (h >= 24) return `${Math.floor(h / 24)}d ${h % 24}h`;
  return h ? `${h}h ${m}m` : `${m}m`;
}

export function useIstClock() {
  const [now, setNow] = useState<Now | null>(null);
  useEffect(() => {
    const tick = () => setNow(istNow());
    tick();
    const id = window.setInterval(tick, 30000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

export default function MarketClock() {
  const now = useIstClock();
  // Nothing honest to show until the clock resolves on the client.
  if (!now) return <span className="mkt-status" aria-live="polite" />;

  const open = isWeekday(now.dow) && now.mins >= OPEN_MIN && now.mins < CLOSE_MIN;
  return (
    <span className={`mkt-status is-ready ${open ? "is-open" : ""}`} aria-live="polite">
      <span className="mkt-dot" />
      <span className="mkt-text">
        <span className="mkt-label">{open ? "MCX OPEN" : "CLOSED"}</span>
        <span className="mkt-detail">
          {open ? ` · ${now.hh}:${now.mm} IST` : ` · opens in ${human(minsToOpen(now))}`}
        </span>
      </span>
    </span>
  );
}

/* The dot used to be green unconditionally. On a Saturday that put a live
   indicator next to a price that last moved at Friday's close — the exact
   thing a trading page cannot afford, since anyone reading it has the real
   price open in another tab. It now says which of the two it is. */
export function MarketStamp() {
  const now = useIstClock();
  if (!now) return <p className="snapshot-stamp" />;

  const open = isWeekday(now.dow) && now.mins >= OPEN_MIN && now.mins < CLOSE_MIN;
  return (
    <p className={`snapshot-stamp is-ready ${open ? "is-open" : ""}`}>
      {open
        ? `Live · ${now.hh}:${now.mm} IST`
        : "Market closed · showing the last session's close"}
    </p>
  );
}
