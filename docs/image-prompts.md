# Image prompts — LiveMarketBySaurabh

Copy-paste ready. **Read §1 first, then work through the images in order.**
§1 is not optional — it is what makes the set look like one family instead
of seven unrelated pictures.

---

## 1. Pre-instruction — paste this before your first image

Most image tools hold context across a session. Paste this once at the
start, then send the individual prompts one at a time.

```
I am generating a small set of images for a single premium website. They
must look like one family — same light, same palette, same finish.

Fixed rules for every image in this set:

LIGHT — one hard key light from the upper left, roughly 40 degrees.
Shadows fall down and to the right. No fill light, no rim light from
behind, no studio softbox look.

PALETTE — near-black (#0b0d10) grounds, warm gold (#d9a441) as the only
saturated colour, everything else desaturated grey. No blue tint. No teal.
No purple.

FINISH — photographic realism with fine grain. Matte, not glossy. Real
material, not rendered. Shot on an 85mm lens, shallow depth of field.

MOOD — restrained, serious, editorial. This is a financial publication,
not an advertisement.

NEVER include — text, letters, numbers, logos, watermarks, currency notes,
coins spilling, cash, luxury cars, charts with green arrows going up,
fireworks, confetti, glowing neon, lens flare, or anything that suggests
getting rich quickly.

Composition: single subject, centred, generous empty margin on all sides.
Confirm you understand, then wait for my first image.
```

**Negative prompt** — for tools with a separate negative field:

```
cartoon, 3d render, cgi, plastic, glossy, neon, glow, lens flare,
oversaturated, rainbow, clip art, watermark, signature, text, letters,
numbers, busy background, clutter, money, cash, banknotes, coins, dollar
sign, lamborghini, luxury car, confetti, fireworks, cheap, gaudy, stock
photo
```

---

## 2. Image 01 — Bull (engraving)

**Used as:** watermark behind the hero, 4–6% opacity.
**Must be monochrome.** Not a style preference — the file is used as a CSS
mask so the same asset can be tinted gold in dark theme and charcoal in
light theme. A colour image would lock to one theme, and at 4% opacity the
colour is invisible anyway.

```
Vintage copperplate engraving of a powerful bull, head lowered and turned
three-quarters toward the viewer, horns curving wide, heavy muscular
shoulders. Intricate cross-hatched line work in the style of a
19th-century banknote vignette or a Wall Street Journal hedcut. Pure white
lines on a solid pure black background. Extremely high contrast with no
grey midtones. Centred, symmetrical, calm and still rather than charging.
Generous black margin on all sides.
```

- **Aspect** 1:1 · **Size** 2000×2000 · **Format** PNG
- Midjourney: `--ar 1:1 --style raw --stylize 150`
- **Accept it if:** the lines are crisp white on true black with almost no
  grey. **Reject it if:** it is soft, grey, or has a background gradient —
  those will not mask cleanly.

---

## 3. Image 02 — Bear (engraving)

**Used as:** optional companion to the bull, same treatment.
**Generate in the same session as the bull**, immediately after it, or the
line weights will not match and the pair will look wrong together.

```
Vintage copperplate engraving of a bear standing on all fours, head low
and turned three-quarters toward the viewer, heavy fur rendered in
intricate cross-hatched line work. Exactly the same engraving style, line
weight and scale as the bull you just made, so the two can sit side by
side as a matched pair. Pure white lines on a solid pure black
background. Extremely high contrast with no grey midtones. Centred, calm,
generous black margin.
```

- Same params as the bull.
- **Accept it if:** placed next to the bull, the stroke thickness looks
  identical. That is the only test that matters here.

---

## 4. Image 03 — Gold bar

**Used as:** feature object, full colour, full opacity.

```
A single one-kilogram cast gold bullion bar resting on a matte black
surface. Three-quarter view from slightly above. Brushed, slightly uneven
cast surface with visible tool marks and micro-pitting. Warm deep gold
with one soft specular highlight running along the top edge. Faint
reflection beneath the bar. Macro detail on the metal grain. Completely
plain unstamped surface with no engraving, no numbers, no hallmark.
```

- **Aspect** 4:3 · **Size** 2400×1800 · **Format** PNG, transparent
  background if the tool supports it, otherwise pure black
- **The "unstamped" instruction is load-bearing.** Generated lettering is
  almost always malformed, and the site sets real text in HTML over it.
- **Accept it if:** the metal looks cast and slightly rough. **Reject it if:**
  it looks like polished chrome painted yellow — that is the usual failure.

---

## 5. Image 04 — Silver bar

**Generate straight after the gold bar**, and if your tool supports image
references, feed the gold bar in as a style reference.

```
A single cast silver bullion bar resting on a matte black surface.
Identical camera angle, identical lighting and identical framing to the
gold bar you just made — this is its matching pair. Brushed surface with
fine parallel grain. Cool neutral silver, no blue tint, with one crisp
specular highlight along the top edge. Faint reflection beneath. Macro
detail. Completely plain unstamped surface, no engraving or numbers.
```

- Same size and format as the gold bar.
- **Accept it if:** laid beside the gold bar, the two look photographed in
  the same session.

---

## 6. Image 05 — Crude oil

Try the droplet first; it is the more distinctive of the two.

```
A single dark viscous oil droplet suspended in mid-fall above a black
reflective surface, catching one warm amber rim light from the upper left.
Deep brown-black liquid with a glossy meniscus and a faint amber
transmission through its thinnest edge. Extreme macro. Isolated on
near-black. Minimal and abstract.
```

If that reads too abstract next to two metal bars:

```
A weathered steel oil barrel standing upright, three-quarter view. Matte
dark amber paint over rusted steel, worn at the ribs and the rim. One hard
key light from the upper left. Isolated on a near-black background.
Industrial product photography. Completely unlabelled — no text, no
markings, no logos.
```

- **Aspect** 1:1 · **Size** 2000×2000 · **Format** PNG, transparent or black

---

## 7. Image 06 — Social preview (highest value)

This is what appears when the link is shared on WhatsApp, Instagram and
Telegram. More people see it than see the hero. **Do this one even if you
skip the rest.**

```
Wide cinematic composition on a near-black ground. A faint engraved bull
silhouette is just visible in the right third, emerging from shadow. Warm
gold rim lighting along its edge. A soft haze of gold dust in the lower
left. Deep vignette. The left two thirds are almost empty, holding only
shadow and a little haze — this space is reserved for a headline that will
be added afterwards. Moody financial editorial photography. No text.
```

- **Aspect** 1.91:1 · **Size** 1200×630 · **Format** JPG
- Generate **without text**, then set the headline over it in HTML or
  Figma. Generated typography cannot be trusted or brand-matched.
- Stays dark in both site themes — a social preview has no theme.

---

## 8. Image 07 — Background texture

```
Abstract macro photograph of brushed dark metal with a faint warm gold
sheen sweeping diagonally across it. Extremely subtle. Near-black overall.
Fine grain. No distinct objects, no focal point, evenly lit corner to
corner so it can tile as a background texture.
```

- **Aspect** 16:9 · **Size** 2560×1440 · **Format** JPG
- Used at 8–12% opacity, so err on the side of *too subtle*.

---

## 9. Which tool for which image

| Image | Best tool | Why |
|---|---|---|
| 01, 02 engravings | **Midjourney** `--style raw` | Strongest at etched line work |
| 03, 04 bars | **Flux 1.1 Pro** | Best material and surface realism |
| 05 crude | Flux or Midjourney | Either handles it |
| 06 social | **Midjourney** | Best at cinematic negative space |
| 07 texture | Any | Low bar |
| Any, needing transparency | **Recraft** | Native alpha export, saves a step |
| Fixing one you nearly like | **Nano Banana / Gemini** | Good at targeted edits |

---

## 10. After generating

| Image | Size | Format | Background | Used at |
|---|---|---|---|---|
| 01 Bull | 2000² | PNG | black → mask | 4–6%, tinted per theme |
| 02 Bear | 2000² | PNG | black → mask | 4–6%, tinted per theme |
| 03 Gold bar | 2400×1800 | WebP | transparent | 100% |
| 04 Silver bar | 2400×1800 | WebP | transparent | 100% |
| 05 Crude | 2000² | WebP | transparent | 100% |
| 06 Social | 1200×630 | JPG | baked dark | 100% |
| 07 Texture | 2560×1440 | WebP | baked dark | 8–12% |

1. Remove backgrounds where the table says transparent (`remove.bg`,
   Photoshop, or Recraft's own export).
2. Convert to **WebP** — about 30% of PNG size at the same quality. Keep
   the originals; you will want to re-crop later.
3. Keep each **under 150KB**. The page already spends its budget on five
   TradingView embeds.
4. Export **1x and 2x** of each so the markup can serve the right one.

Put the files in `assets/` and tell me. I will wire them in with `srcset`,
lazy loading, reserved dimensions so nothing shifts, theme-aware tinting
for the engravings, and the existing SVG kept as a fallback.

---

## 11. One caveat

I cannot see generated images, and screenshots do not work in this
environment either. Judging whether a result looks good is yours. What I
can tell you is when one is technically wrong for the page — wrong aspect,
too heavy, background not clean enough to mask, or detail that will
disappear entirely at 4% opacity.
