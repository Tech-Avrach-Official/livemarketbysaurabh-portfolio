import { telegram } from "@/lib/links";
import HeaderNav from "./HeaderNav";
import MarketClock from "./MarketClock";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Wordmark size={28} />
        <MarketClock />
        <HeaderNav />
        <ThemeToggle />
        <a className="btn btn-soft" href={telegram("web_header")} target="_blank" rel="noopener">
          <span className="btn-full">Join the Community</span>
          <span className="btn-short">Join</span>
        </a>
      </div>
    </header>
  );
}
