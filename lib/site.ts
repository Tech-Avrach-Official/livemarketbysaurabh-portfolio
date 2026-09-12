/* Facts that appear in more than one place. Changing a number here changes
   it everywhere, so the hero, the closing CTA and the channels row can
   never drift apart. */

export const MEMBERS = "3,500+";
export const HOST = {
  name: "Saurabh Sharma",
  role: "Community leader",
};

/* CONFIRM THE DOMAIN. Everything absolute — canonical, OG image, JSON-LD —
   is built from this, so a wrong value silently breaks every link preview
   rather than erroring. Override with NEXT_PUBLIC_SITE_URL at build time. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://livemarketbysaurabh.com";
