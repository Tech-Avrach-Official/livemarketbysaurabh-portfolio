import type { Metadata } from "next";
import { Newsreader, Archivo, JetBrains_Mono } from "next/font/google";
import { HOST, MEMBERS, SITE_URL } from "@/lib/site";
import { TELEGRAM_BASE } from "@/lib/links";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const TITLE =
  "LiveMarketBySaurabh — A community of traders who actually talk to each other";
const DESCRIPTION =
  "A community of traders who discuss charts before the open and review them after the close. No tips, no spam.";

export const metadata: Metadata = {
  /* Without this, every relative OG and canonical URL resolves against
     localhost in development and silently against nothing in production. */
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: "LiveMarketBySaurabh — A community of traders",
    description: "Charts discussed before the open, trades reviewed after the close.",
    type: "website",
    url: "/",
    siteName: "LiveMarketBySaurabh",
    locale: "en_IN",
    /* No images listed here on purpose. app/opengraph-image.jpg is the social
       preview — Next picks it up by convention and fills in the url, type,
       dimensions and alt (from opengraph-image.alt.txt) for both Open Graph
       and Twitter. Listing a file here as well previously left twitter:image
       and og:image pointing at two different pictures. */
  },
  twitter: {
    card: "summary_large_image",
    title: "LiveMarketBySaurabh — A community of traders",
    description: "Charts discussed before the open, trades reviewed after the close.",
  },
};

/* Person + Organization, per the structure doc's SEO checklist. Written from
   the same constants the page renders, so the markup and the schema can
   never disagree about the member count or the host's name. */
const SCHEMA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "LiveMarketBySaurabh",
      url: SITE_URL,
      description: DESCRIPTION,
      sameAs: [TELEGRAM_BASE],
      founder: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: HOST.name,
      jobTitle: HOST.role,
      url: SITE_URL,
      // TODO: add Instagram / YouTube / X profile URLs to sameAs once confirmed.
      description: `Trader and educator running a community of ${MEMBERS} traders.`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "LiveMarketBySaurabh",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-IN",
    },
  ],
};

/* Runs before first paint. A theme applied from a React effect would flash
   the wrong colours on every load, which is worse than having no toggle —
   so this stays an inline blocking script rather than a component. */
const themeScript = `
(function () {
  var r = document.documentElement;
  try {
    var stored = localStorage.getItem('lmbs-theme');
    var sysLight = window.matchMedia &&
                   window.matchMedia('(prefers-color-scheme: light)').matches;
    if (stored === 'light' || stored === 'dark') r.setAttribute('data-theme', stored);
    r.setAttribute('data-resolved-theme', stored || (sysLight ? 'light' : 'dark'));
  } catch (e) {
    r.setAttribute('data-resolved-theme', 'dark');
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${archivo.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* The chart widgets are the slowest thing on this page — five
            iframes, each 1.7–2.7s on a good connection. Warming the DNS
            lookup and TLS handshake for both TradingView origins before any
            of them is requested takes a few hundred ms off every one of
            them, and costs nothing if a visitor never scrolls that far. */}
        <link rel="preconnect" href="https://s3.tradingview.com" />
        <link rel="preconnect" href="https://www.tradingview.com" />
        <link rel="dns-prefetch" href="https://s3.tradingview.com" />
        <link rel="dns-prefetch" href="https://www.tradingview.com" />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
