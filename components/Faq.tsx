import { MEMBERS } from "@/lib/site";
import { telegram } from "@/lib/links";

/* Native <details> — keyboard-operable, needs no JavaScript, and the answers
   sit in the markup where crawlers can read them. This section is the page's
   SEO body, so the questions are worded the way people actually type them,
   not the way a brand would phrase them.

   "Are you SEBI registered?" has been removed at the owner's request. The
   registration statement lives on the Disclaimer page.

   Two answers below are marked and need real numbers only Saurabh has. */
const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is the group free?",
    a: <>Yes. There is no fee, no trial that ends, and nothing to unlock. You
       join the Telegram group and that is the whole of it.</>,
  },
  {
    q: "Do you give buy or sell tips?",
    a: <>No — and this is the one that defines everything else. We discuss
       levels, reasoning and setups so that you can make your own call. Nobody
       here will tell you what to buy. A tip makes you dependent on whoever
       gave it, and dependent traders don&rsquo;t last.</>,
  },
  {
    q: "What do you trade?",
    a: <>Commodities, mostly — gold, silver and crude on MCX. The charts on
       this page are the international spot benchmarks those contracts track.</>,
  },
  {
    q: "I'm a complete beginner. Will I be out of my depth?",
    a: <>No. Beginners ask the basic questions in the group every day and get
       proper answers — nobody gets mocked for asking. Sunday is set aside for
       doubt-clearing specifically, where beginners get the floor.</>,
  },
  {
    q: "Can I just read without posting anything?",
    a: <>Yes, and most people start that way. Read for a week, see how the
       room talks, and say something when you feel like it. Nobody is going to
       chase you for an introduction.</>,
  },
  {
    q: "How active is it? Will my phone keep buzzing?",
    a: <>It is busiest before the open and right after the close, and quieter
       through the middle of the day. If it is too much, mute the group — you
       will still have everything when you open it.</>,
  },
  {
    q: "What time does the day start?",
    a: <>The pre-market thread opens around 8:30 AM IST, before the 9:15 open.
       Live discussion runs through market hours, and the review goes up after
       the close.</>,
  },
  {
    q: "Can I promote my own channel or services?",
    a: <>No. It is the fastest way to be removed. Same for affiliate links and
       referral codes.</>,
  },
];

export default function Faq() {
  return (
    <section className="faq">
      <div className="wrap">
        <p className="eyebrow">08 — Questions</p>
        <h2>Questions people ask</h2>

        <div className="faq-list">
          {FAQS.map((f, i) => (
            <details key={f.q} name="faq">
              <summary>
                <span className="faq-no num">{String(i + 1).padStart(2, "0")}</span>
                <span className="faq-q">{f.q}</span>
                <span className="faq-mark" aria-hidden="true" />
              </summary>
              <div className="faq-a"><p>{f.a}</p></div>
            </details>
          ))}
        </div>

        <p className="faq-foot">
          Something not answered here? Ask it in the group — {MEMBERS} traders
          and someone is usually awake.{" "}
          <a href={telegram("web_faq")} target="_blank" rel="noopener">
            Join on Telegram →
          </a>
        </p>
      </div>
    </section>
  );
}
