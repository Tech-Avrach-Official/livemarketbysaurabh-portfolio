import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Terms of Use — LiveMarketBySaurabh",
  description:
    "The terms for using the LiveMarketBySaurabh website and Telegram community.",
  alternates: { canonical: "/terms" },
};

/* DRAFT — have this read by someone qualified before the site goes live. */
export default function Page() {
  return (
    <LegalPage title="Terms of Use" updated="12 September 2026">
      <p>
        By using this website or joining the LiveMarketBySaurabh Telegram
        community, you agree to what follows. If you do not, please do not use
        either.
      </p>

      <h2>What this is</h2>
      <p>
        A free community where traders discuss charts, levels and their own
        decisions. It is an educational and discussion space. It is{" "}
        <strong>not</strong> an advisory service, a portfolio management
        service, or a tips channel, and nothing in it is investment advice —
        see the <a href="/disclaimer">Disclaimer</a>, which forms part of
        these terms.
      </p>

      <h2>Joining and leaving</h2>
      <p>
        The community is free to join and free to leave. There is no fee, no
        subscription and nothing to cancel. We may remove any member at any
        time, without notice, for breaking the rules below.
      </p>

      <h2>House rules</h2>
      <ul>
        <li>No asking for tips, and no giving them.</li>
        <li>No spam, promotions, affiliate links or referral codes.</li>
        <li>
          No abuse. Disagree with the trade, not the person.
        </li>
        <li>
          Do not impersonate Saurabh, any moderator, or any other member.
        </li>
        <li>
          Do not share another member&rsquo;s messages, name or contact details
          outside the group without their permission.
        </li>
        <li>Nothing illegal, and nothing that would put the group at risk.</li>
      </ul>

      <h2>Your responsibility</h2>
      <p>
        Every trading decision you make is yours. You are responsible for your
        own research, your own risk management and your own outcomes,
        regardless of anything you read here or in the community.
      </p>

      <h2>Content you post</h2>
      <p>
        You keep ownership of what you write. By posting in the community you
        allow us to display it there. We will not publish your messages, name
        or photograph on this website without asking you first in writing.
      </p>

      <h2>Our content</h2>
      <p>
        The text, design, graphics and original artwork on this site belong to
        LiveMarketBySaurabh. Please do not reproduce them as your own. Market
        data and charts are supplied by TradingView under their terms. Quoting
        or linking to us is welcome.
      </p>

      <h2>Availability</h2>
      <p>
        This site and the community are provided as they are. We do not
        promise that either will be available without interruption, that the
        market data will be accurate or current, or that any part of it will
        be free of errors.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, we accept no liability for any
        loss or damage arising from your use of this website or the community,
        including trading losses.
      </p>

      <h2>Changes</h2>
      <p>
        These terms may change. The date at the top of this page shows when
        they last did. Continuing to use the site or the community after a
        change means you accept it.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of India. The courts at Dehradun,
        Uttarakhand shall have exclusive jurisdiction over any dispute arising
        from them.
      </p>

      <h2>Contact</h2>
      <p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>
    </LegalPage>
  );
}
