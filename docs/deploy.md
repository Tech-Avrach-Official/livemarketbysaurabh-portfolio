# Deploying

Hosted on **Vercel**. Push to the branch and it builds and ships itself —
there is nothing to upload by hand.

## First time

1. Go to vercel.com, sign in with the GitHub account that owns
   `Tech-Avrach-Official/livemarketbysaurabh-portfolio`, and import the repo.
2. Take every default. Vercel detects Next.js on its own — framework, build
   command, output directory, all of it.
3. Deploy. You get a `*.vercel.app` URL immediately.
4. **Project → Settings → Domains** → add `livemarketbysaurabh.com` and
   `www.livemarketbysaurabh.com`. Vercel shows the exact DNS records; add them
   at whoever the domain is registered with. Certificates are issued
   automatically once the records resolve, usually within the hour.

After that, every push to `main` deploys. Pushes to any other branch get
their own preview URL, which is the safe way to look at a change before it is
live.

## The domain is compiled in, not configured

`lib/site.ts` holds `SITE_URL`. It ends up inside the canonical tags, the
Open Graph image URL, the sitemap and the JSON-LD, so **changing the domain
means rebuilding** — moving DNS alone is not enough.

The default is `https://livemarketbysaurabh.com`. To build against a
different host, set an environment variable in Vercel:

```
NEXT_PUBLIC_SITE_URL = https://staging.example.com
```

## Why images are not "exported"

`next.config.ts` deliberately does **not** use `output: "export"`. A static
export has no server, so Next's image optimiser cannot run and every
photograph goes out at full size. On Vercel the optimiser converts them to
WebP or AVIF and resizes them to whatever the markup asked for:

| | source | served |
|---|---|---|
| `about.jpg` | 316 KB JPEG | **44 KB WebP** |
| `hero-saurabh.jpg` | 284 KB JPEG | ~50 KB WebP |

That is roughly half a megabyte per visit, on a page whose audience is mostly
on mobile data.

## If it ever has to move to cPanel-style hosting

It can, with no code changes — only config. Add to `next.config.ts`:

```ts
output: "export",
trailingSlash: true,
images: { unoptimized: true },
```

Then `npm run build` writes an `out/` folder. Upload **the contents of
`out/`** into `public_html` — the contents, not the folder, so `index.html`
sits directly in the web root. Copy `docs/apache/htaccess` in as
`public_html/.htaccess` for the 404 page, gzip and cache headers; dotfiles
are hidden in cPanel's file manager until you switch on "Show Hidden Files".

On that setup the legal links in `components/Footer.tsx` should carry
trailing slashes (`/privacy/`) to match `trailingSlash: true`, or every visit
costs a redirect.

## Checks after the first deploy

1. `https://livemarketbysaurabh.com/sitemap.xml` loads and lists four URLs
2. Paste the home URL into a WhatsApp chat — the preview image should appear
3. `/privacy`, `/terms` and `/disclaimer` all load
4. On a phone, scrolling past the chart section must not hijack the scroll

## Not included yet

- **No analytics.** Nothing measures visits or joins. Vercel Analytics is one
  switch in the dashboard if that is wanted.
- **No form handling.** Nothing on the site posts anywhere.
