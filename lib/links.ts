/* A private-group invite link, not a public @username.

   That matters for one reason: the per-position source tags this file used
   to add — ?start=web_hero, ?start=web_close — only work on a bot or public
   username link. On a t.me/+hash invite the parameter is meaningless at
   best and can break the invite at worst, so telegram() now returns the
   link unchanged and keeps its argument only so the call sites still read
   as documentation of where each button lives.

   To get per-button numbers back you need either a public @username for the
   group, or click events fired into GA4 / the Meta pixel from the page
   itself. Neither is set up yet. */
const TELEGRAM = "https://t.me/+dZbILIE0f-tmNDM1";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const telegram = (_source: string) => TELEGRAM;
export const TELEGRAM_BASE = TELEGRAM;

export const INSTAGRAM =
  "https://www.instagram.com/livemarketbysaurabh?stkn=MTltdXJ6M2NzYnhyOA==";

/* www rather than the m. subdomain that was supplied: m.youtube.com is the
   mobile site and redirects desktop visitors, which costs a round trip. */
export const YOUTUBE = "https://www.youtube.com/@LivemarketbySaurabh";

export const EMAIL = "livemarketbysaurabh@gmail.com";
