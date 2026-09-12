import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Written out as a file at build time, not served by a route. */
export const dynamic = "force-static";

/* Four pages, so this is short — but without it the legal pages are only
   discoverable through the footer, and those are exactly the pages Google
   and Meta look for when reviewing an ad account. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.4 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
