/* The "i" of Trading, drawn as a candlestick that ticks between up and down.

   The real letter stays in the DOM, clipped — the headline still copies,
   searches and reads aloud as "Trading is lonely". */

export default function CandleI() {
  return (
    <span className="candle-i">
      <span className="sr-only">i</span>
      <svg viewBox="0 0 10 38" aria-hidden="true" focusable="false">
        <line x1="5" y1="0" x2="5" y2="38" strokeWidth="1.2" />
        <rect x="0.4" y="8" width="9.2" height="22" />
      </svg>
    </span>
  );
}
