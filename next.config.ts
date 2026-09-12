import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Static export: the whole site is written out as plain HTML, CSS, JS and
     images that any web host can serve — no Node process, no build step on
     the server. This page has nothing that needs a server: every route is
     pre-rendered, there are no API routes, no server actions and no
     revalidation. */
  output: "export",

  /* Folder-per-route (out/privacy/index.html) rather than out/privacy.html.
     Apache and Nginx serve the first shape natively at /privacy/; the second
     needs a rewrite rule that shared hosting usually does not have. */
  trailingSlash: true,

  images: {
    /* Next's image optimiser needs a running server, which a static export
       does not have. The source files are sized for their slots instead —
       logo 200px, hero 920px, about 963px — so serving them unoptimised
       costs about 650KB across the whole page rather than the 3.4MB the
       originals would have. */
    unoptimized: true,
  },
};

export default nextConfig;
