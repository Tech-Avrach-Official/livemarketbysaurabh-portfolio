import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Privacy Policy — LiveMarketBySaurabh",
  description:
    "What LiveMarketBySaurabh collects, what it doesn't, and who else sees anything.",
  alternates: { canonical: "/privacy" },
};

/* DRAFT — written against what this site actually does today, which is very
   little: no accounts, no forms that submit anywhere, no database.

   Re-read this the day any of that changes. Adding an email signup, an
   analytics script or a payment page each make parts of it untrue. */
export default function Page() {
  return (
    <LegalPage title="Privacy Policy" updated="12 September 2026">
      <p>
        This page explains what happens to your information when you visit
        this website. The short version: this site has no accounts, no
        newsletter, no database, and asks you for nothing.
      </p>

      <h2>What we collect directly</h2>
      <p>
        <strong>Nothing.</strong> There is no signup, no contact form and no
        login. The message box in the community preview on the home page does
        not send anything anywhere — whatever you type stays in your browser
        and is discarded when you close the page. Its only function is to open
        Telegram.
      </p>
      <p>
        If you email us, we will have your email address and whatever you put
        in the message, for as long as we keep the correspondence.
      </p>

      <h2>What your browser stores</h2>
      <p>
        One item: your light or dark theme choice, saved locally under{" "}
        <code>lmbs-theme</code>. It never leaves your device and we cannot
        read it. Clearing your browser data removes it.
      </p>

      <h2>Third parties that can see you</h2>
      <p>
        Parts of this page are loaded from other companies, and those
        companies can see that a visit happened — typically your IP address,
        browser and the page you were on.
      </p>
      <ul>
        <li>
          <strong>TradingView</strong> — the price ticker and charts.{" "}
          <a href="https://www.tradingview.com/privacy-policy/" target="_blank" rel="noopener">
            Their privacy policy
          </a>.
        </li>
        <li>
          <strong>Google Fonts</strong> — typefaces, self-hosted at build time
          so no request reaches Google when you visit.
        </li>
      </ul>
      <p>
        We do not run advertising trackers, and there is no analytics on this
        site at present. If that changes, this page changes with it.
      </p>

      <h2>Leaving this site</h2>
      <p>
        The Telegram, Instagram and YouTube links take you to those services,
        each with its own privacy policy and its own collection. Once you join
        the Telegram group, what Telegram holds about you is governed by{" "}
        <a href="https://telegram.org/privacy" target="_blank" rel="noopener">
          Telegram&rsquo;s privacy policy
        </a>, not this one.
      </p>

      <h2>Community screenshots</h2>
      <p>
        We do not publish members&rsquo; messages, names or photographs on this
        site without written permission, and handles and phone numbers are
        redacted by default. If something of yours has been published and you
        want it removed, email us and it comes down.
      </p>

      <h2>Children</h2>
      <p>
        This site and the community are intended for adults. We do not
        knowingly collect information from anyone under 18.
      </p>

      <h2>Your rights</h2>
      <p>
        Under India&rsquo;s Digital Personal Data Protection Act, 2023 you may
        ask what personal data we hold about you, ask for it to be corrected,
        or ask for it to be erased. Since we hold almost nothing, this will
        usually be a short conversation.
      </p>

      <h2>Who operates this site</h2>
      <p>
        This website and the LiveMarketBySaurabh community are operated by{" "}
        <strong>Saurabh Sharma</strong>, based in Dehradun, Uttarakhand, India.
      </p>
      <p data-placeholder>
        [A postal address should go here before any paid advertising runs —
        Google and Meta both look for a contactable operator, and a policy
        with only an email address is the weakest version of this page.]
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </LegalPage>
  );
}
