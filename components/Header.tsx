import { telegram } from "@/lib/links";
import MarketClock from "./MarketClock";
import Wordmark from "./Wordmark";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Wordmark size={28} />
        <MarketClock />
        <nav className="header-nav">
          <a href="/#community">Community</a>
          <a href="/#about">About</a>
        </nav>
        <ThemeToggle />
        <a className="btn btn-soft" href={telegram("web_header")} target="_blank" rel="noopener">
          <span className="btn-full">Join the Community</span>
          <span className="btn-short">Join</span>
        </a>
      </div>
    </header>
  );
}
