/* ─────────────────────────────────────────────────────────────────────
   ⚠  SAMPLE CONTENT — NOT FOR LAUNCH.

   The quotes and names below are INVENTED. They exist so the section can
   be designed against realistic text instead of [square brackets], and
   they must be replaced with real, permitted quotes before this page goes
   live. Publishing invented testimonials under invented names is
   deceptive advertising, and in India that is actionable under the
   Consumer Protection Act and the ASCI code — on a page whose entire
   argument is "we are the honest room", it is also the one lie that would
   undo the rest of it.

   The on-page warning strip is switched off (SAMPLE = false) at the
   owner's request — so nothing on the rendered page says these are made
   up any more. This comment is now the only reminder that they are.
   ───────────────────────────────────────────────────────────────────── */
const SAMPLE = false;

/* Written to the doc's rules, which keep this out of tips-channel
   territory: belonging and habit rather than profit, no ₹ figures at all,
   and light Hinglish because that is what the room actually sounds like. */
const VOICES: { text: string; name: string; city: string; time: string }[] = [
  { text: "Pehle main akela chart dekhta tha aur khud hi se argue karta tha. Ab kam se kam koi bol deta hai ki bhai ye level nahi hai.",
    name: "Rahul K", city: "Indore", time: "08:52" },
  { text: "Gusse mein back-to-back teen trade le liye the. Kisi ne bola — aaj band karo. Maine kar diya. Wo ek message mehenga padne se bacha gaya.",
    name: "Priya S", city: "Pune", time: "09:41" },
  { text: "Maine pucha tha stop loss hota kya hai. Koi hasa nahi. Teen logon ne detail mein samjhaya.",
    name: "Neha B", city: "Jaipur", time: "11:07" },
  { text: "Ab entry se pehle likh leta hu ki nikalna kahan hai. Ye aadat yahin se aayi.",
    name: "Imran A", city: "Hyderabad", time: "15:36" },
  { text: "Apna sabse kharab trade yahan post kiya tha, dar lag raha tha. Jo replies aaye, utna kisi course se nahi seekha.",
    name: "Aman T", city: "Nagpur", time: "16:20" },
];

/* Initials stand in for a face. A real avatar is better and needs
   permission; this at least gives each voice its own mark. */
function initials(name: string) {
  const clean = name.replace(/[[\]]/g, "").trim();
  if (!clean || clean.startsWith("Name")) return "··";
  return clean.split(/\s+/).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

/* Telegram gives every person in a group a colour, derived from who they
   are rather than chosen. Five identical grey discs is the single flattest
   thing in this section; borrowing the same idea gives each voice a mark of
   its own and is what the room actually looks like.

   Derived from the name, so a given person keeps their colour wherever they
   appear and nobody has to maintain a list. */
const AVATAR_TINTS = 6;
function tintOf(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return h % AVATAR_TINTS;
}

export default function Voices() {
  return (
    <section className="voices">
      <div className="wrap">
        <p className="eyebrow">03 — Members</p>
        <h2>What members say</h2>
        <p className="section-sub">
          Not testimonials. Things people have actually said in the group.
        </p>

        <div className="voices-grid reveal">
          {VOICES.map((v, i) => (
            <figure className="voice" key={i} data-delay={i % 3}>
              <span className="voice-avatar" data-tint={tintOf(v.name)} aria-hidden="true">
                {initials(v.name)}
              </span>
              <blockquote className="voice-bubble">{v.text}</blockquote>
              <figcaption className="voice-meta">
                <span className="voice-name">{v.name}</span>
                <span className="voice-city">{v.city}</span>
                <span className="voice-time">{v.time}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {SAMPLE && (
          <p className="voices-warning" data-placeholder>
            ⚠ Sample quotes — invented names, invented words. Replace with real,
            permitted quotes before launch, then set <code>SAMPLE = false</code>{" "}
            in <code>Voices.tsx</code> to remove this line.
          </p>
        )}
      </div>
    </section>
  );
}
