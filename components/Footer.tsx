import Wordmark from "./Wordmark";
import { telegram, INSTAGRAM, YOUTUBE, EMAIL } from "@/lib/links";
import { TelegramMark, InstagramMark, YouTubeMark } from "./ChannelIcons";

/* The three social marks again, at footer size. Same files as §7, so there
   is one set of logos on the page rather than two that drift apart. */
const SOCIALS = [
  { name: "Telegram", Mark: TelegramMark, href: telegram("web_footer"), brand: "telegram" },
  { name: "Instagram", Mark: InstagramMark, href: INSTAGRAM, brand: "instagram" },
  { name: "YouTube", Mark: YouTubeMark, href: YOUTUBE, brand: "youtube" },
];

/* Root-relative, not bare fragments. The footer renders on /privacy, /terms
   and /disclaimer too, where "#community" points at a section that isn't on
   the page and simply does nothing. */
const SITEMAP = [
  { label: "Inside the community", href: "/#community" },
  { label: "What we're watching", href: "/#market" },
  { label: "About Saurabh", href: "/about" },
  { label: "Where we are", href: "/#channels" },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-brand">
            <Wordmark size={34} />
            <p>
              A community of traders who actually talk to each other. Charts
              discussed before the open, trades reviewed after the close.
            </p>
            <div className="footer-social">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.href} data-brand={s.brand}
                   aria-label={s.name}
                   {...(s.href === "#" ? {} : { target: "_blank", rel: "noopener" })}>
                  <s.Mark />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-links">
            <nav className="footer-col" aria-label="Sections">
              <h3>The page</h3>
              {SITEMAP.map((l) => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </nav>

            <nav className="footer-col" aria-label="Legal">
              <h3>Legal</h3>
              {LEGAL.map((l) => (
                <a key={l.label} href={l.href}>{l.label}</a>
              ))}
            </nav>
          </div>

          <div className="footer-col">
            <h3>Get in touch</h3>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>

        <div className="footer-foot">
          <p>© {new Date().getFullYear()} LiveMarketBySaurabh. All rights reserved.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
