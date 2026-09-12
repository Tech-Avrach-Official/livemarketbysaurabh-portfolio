import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  /* Deployed on Vercel, so next/image runs its optimiser: every photograph
     is served as WebP or AVIF, resized to whatever the markup asked for, and
     cached at the edge. That matters more here than it looks — this page
     carries three real photographs and most visitors arrive on mobile data.

     It was briefly built with `output: "export"` for plain file hosting.
     Static export has no server, so the optimiser cannot run and every image
     goes out at full size; on Vercel that would be about 500KB of needless
     transfer per visit. If the site ever has to move back to cPanel-style
     hosting, re-add:

       output: "export",
       trailingSlash: true,
       images: { unoptimized: true },

     and upload the out/ folder — see docs/deploy.md, which covers both. */
};

export default nextConfig;
