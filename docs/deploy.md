# Deploying

The site is a **static export**. There is no Node process on the server, no
database and no build step to run there — just files.

## Every time you deploy

```bash
npm install          # first time only
npm run build        # writes the site into out/
```

Then upload **everything inside `out/`** into your hosting's web root —
usually `public_html`. Upload the *contents*, not the folder: `index.html`
must sit directly in `public_html`, not in `public_html/out/`.

```
public_html/
├── index.html          ← home
├── privacy/index.html
├── terms/index.html
├── disclaimer/index.html
├── 404.html
├── .htaccess           ← 404 page, gzip, cache headers
├── _next/              ← CSS, JS, fonts, imported images
├── art/  reels/        ← engravings and videos
├── sitemap.xml  robots.txt
└── opengraph-image.jpg  close-cta.jpg  about.jpg  logo.png  hero-saurabh.jpg
```

About 15MB, most of it the five reel videos.

**Delete the old files first** on a redeploy. Filenames inside `_next/` are
content-hashed, so stale ones are harmless but they accumulate.

`.htaccess` lives in `public/.htaccess` and is copied into `out/` by every
build. Edit it there, never in `out/` — `out/` is rebuilt from scratch and is
not in version control.

## If the host runs Nginx instead of Apache

`.htaccess` is ignored. The only rule that actually matters is the 404 page:

```nginx
error_page 404 /404.html;
```

Folder-per-route URLs (`/privacy/`) are served natively, so nothing else is
needed.

## The domain is baked in at build time

`lib/site.ts` holds `SITE_URL`, currently `https://livemarketbysaurabh.com`.
It is compiled into the canonical tags, the Open Graph image URL, the sitemap
and the JSON-LD — **changing the domain means rebuilding**, not just moving
files. To build for a different host:

```bash
NEXT_PUBLIC_SITE_URL=https://staging.example.com npm run build
```

## Checks worth doing after the first upload

1. `https://yourdomain.com/sitemap.xml` loads and lists four URLs
2. Paste the home URL into a WhatsApp chat — the preview image should appear
3. `/privacy/`, `/terms/` and `/disclaimer/` all load
4. Open on a phone: the chart section should not hijack scrolling

## What is *not* in this deployment

- No analytics. Nothing is measuring visits or joins yet.
- No form handling. Nothing on the site posts anywhere.
- `https://` must be enabled on the host; TradingView's widgets refuse to
  load inside an insecure page.
