import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { EMAIL } from "@/lib/links";

export const metadata: Metadata = {
  title: "Disclaimer — LiveMarketBySaurabh",
  description:
    "Everything shared by LiveMarketBySaurabh is educational and for discussion only. It is not investment advice.",
  alternates: { canonical: "/disclaimer" },
};

/* DRAFT — have this read by someone qualified before the site goes live.

   The registration statement is now filled in and says NOT registered, which
   is what was confirmed. Do not soften it: claiming or implying a SEBI
   registration that does not exist is the one thing on this site that
   carries a real penalty. */
export default function Page() {
  return (
    <LegalPage title="Disclaimer" updated="12 September 2026">
      <h2>No investment advice</h2>
      <p>
        Everything published on this website, and everything shared inside the
        LiveMarketBySaurabh Telegram community, is for{" "}
        <strong>educational and discussion purposes only</strong>. None of it
        is investment advice, a recommendation, a solicitation, or an offer to
        buy or sell any security, commodity, derivative or other instrument.
      </p>
      <p>
        We do not provide buy or sell calls. Levels, charts, setups and
        opinions are shared so that members can reason about them and reach
        their own conclusions. Any decision you take after reading them is
        your own, and so is the outcome.
      </p>

      <h2>Registration status</h2>
      <p>
        <strong>Saurabh Sharma is not registered with SEBI.</strong> He is not
        registered with the Securities and Exchange Board of India as an
        Investment Adviser under the SEBI (Investment Advisers) Regulations,
        2013, nor as a Research Analyst under the SEBI (Research Analysts)
        Regulations, 2014.
      </p>
      <p>
        He is a trader and educator. Nothing he or anyone else shares here is
        advice given in a regulated capacity, and it must not be treated as
        such.
      </p>

      <h2>Risk warning</h2>
      <p>
        Trading and investing in stocks, futures, options and commodities
        involves a <strong>substantial risk of loss</strong> and is not
        suitable for every person. Leveraged products in particular can move
        against you faster than you can react, and losses can exceed your
        initial capital.
      </p>
      <p>
        Past performance — whether of a market, a strategy, or any individual
        — is <strong>not indicative of future results</strong>. No outcome
        discussed anywhere on this site or in the community should be treated
        as typical, repeatable or promised.
      </p>
      <p>
        Please consult a SEBI-registered investment adviser, and consider your
        own financial position and risk tolerance, before investing.
      </p>

      <h2>Market data</h2>
      <p>
        Prices and charts shown on this site are supplied by TradingView and
        reflect international spot benchmarks — they are not MCX rates. They
        are indicative, may be delayed, and are provided for reference only,
        not for transaction purposes. We do not warrant their accuracy,
        completeness or timeliness.
      </p>

      <h2>Third-party content</h2>
      <p>
        Messages posted by members of the community are the views of those
        members, not of LiveMarketBySaurabh. We moderate for conduct, not for
        accuracy, and we cannot verify claims made by individual members.
      </p>
      <p>
        This site links to Telegram, Instagram and YouTube. We are not
        responsible for the content, policies or availability of those
        services.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, LiveMarketBySaurabh and those
        associated with it accept no liability for any loss or damage — direct,
        indirect, incidental or consequential — arising from the use of this
        website, the community, or any information obtained through either.
      </p>

      <h2>Questions</h2>
      <p>
        Write to <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
