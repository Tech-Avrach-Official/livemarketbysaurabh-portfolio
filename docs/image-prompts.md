# Image prompts — LiveMarketBySaurabh

Copy-paste ready. **Read §1 first, then work through the images in order.**
§1 is not optional — it is what makes the set look like one family instead
of seven unrelated pictures.

---

## 0. Where each image lands

Every slot below is already built. Drop the file at the path given and it
appears — the layout is already sized for it, so nothing shifts when it
arrives. Until then each slot shows a labelled frame of the exact final
size.

| # | File to save as | Where it appears | Prompt |
|---|---|---|---|
| 01 | `public/art/bull.png` | Left of the closing CTA, tinted mask | §2 |
| 02 | `public/art/bear.png` | Right of the closing CTA, tinted mask | §3 |
| 03 | `public/art/gold-bar.png` | Watermark across the Gold market card | §4 |
| 04 | `public/art/silver-bar.png` | Watermark across the Silver market card | §5 |
| 05 | `public/art/crude.png` | Watermark across the Crude market card | §6 |
| 06 | `app/opengraph-image.jpg` | Social preview — WhatsApp, Instagram, Telegram | §7 |

**Read this before generating anything — the specs changed.**

**All five page images are engravings now, not photographs.** This document
used to ask for photographic realism in §1 and copperplate engraving in §2,
which cannot produce one family. Engraving won, for a reason that is
technical rather than aesthetic: **every one of these files is used as a CSS
mask.** The artwork supplies the shape and the stylesheet supplies the
colour, so a single black-and-white file prints correctly on both the dark
and the light theme. A photograph cannot — its lighting is baked in, and a
gold bar lit for a near-black page looks pasted onto an off-white one.

So every one of 01–05 is **pure white artwork on solid black**. No colour,
no transparency, no grey background gradient — black becomes transparent and
the white becomes the shape.

**The three market images get tinted per metal, automatically.** The cards
already carry `--gold` `#d9a441`, `--silver` `#aab4c0` and `--crude`
`#b8763f`, and the mask picks each up. Do not try to make the gold bar look
gold or the silver bar look silver — the page does that. Draw the shape.

**They render at 12% opacity across the whole card, not as a corner object.**
This is the constraint that matters most: **fine detail disappears entirely
at that strength.** The intricate cross-hatching the bull asks for is right
at full size behind the CTA and wrong here. These three need bold, simple,
confidently readable silhouettes with thick lines. If you can still tell
what it is when you squint at it from across the room, it will work.

**Still needed but not generated — real assets:**

| Where | What | Source |
|---|---|---|
| About section | Saurabh at his desk | A real photo — see `hero-brief.md` |
| Feed section | 5 reel posters | Exported from Instagram |

**Skip:** the background texture (§8). The page is flat and sharp now — no
shadows, no rounded corners — and a photographic texture fights that. It is
also the one image here that cannot be theme-neutral, so it would need two
versions where everything else needs one.

**The bear does have a slot** — it always did. `MarketMarks` renders the
bull and the bear as a matched pair either side of the closing CTA, on the
grounds that a page saying "we talk about the losses too" and then
decorating itself with a bull alone is only telling half of it. Hand-drawn
SVGs stand in for both until the files land.

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

PALETTE — none. Black and white only. The site applies its own colour.

BACKGROUND — this is the important one. Every one of these becomes a CSS
mask, so the file carries shape and nothing else. PURE WHITE line work on a
SOLID PURE BLACK background, every time. Extremely high contrast, no grey
midtones, no gradient, no vignette, no texture in the background. Black
becomes transparent and white becomes the shape, which the site then paints
in whichever colour that theme needs. Anything grey turns into a half-
transparent smear, so push the contrast further than looks right.

NO COLOUR — not in any of them. Colour in the file is discarded, and if
you spend the generation on getting a gold tone right you have spent it on
something that gets thrown away.

FINISH — vintage copperplate engraving. Etched line work, the register of
a 19th-century banknote vignette or a Wall Street Journal hedcut. Not a
photograph, not a 3D render, not flat vector clip art.

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
photograph, photorealistic, 3d render, cgi, plastic, glossy, colour,
coloured, gradient, grey background, soft shadow, drop shadow, reflection,
cartoon, neon, glow, lens flare, oversaturated, rainbow, clip art,
watermark, signature, text, letters, numbers, busy background, clutter,
money, cash, banknotes, coins, dollar sign, lamborghini, luxury car,
confetti, fireworks, cheap, gaudy, stock photo
```

---

## 2. Image 01 — Bull (engraving)

**Used as:** watermark to the LEFT of the closing CTA, 5.5% opacity, tinted
**green** by the stylesheet.

**Must be monochrome — pure white on solid black.** This is not a style
preference. The file becomes a CSS mask: only its shape survives, and the
colour is applied afterwards in CSS. Generate a green bull and that green is
discarded, so it is effort spent on nothing. Monochrome also means one file
serves the dark and the light theme, with no second version and no
re-generation if the colour is changed later.

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

**Used as:** watermark to the RIGHT of the closing CTA, tinted **red** by the
stylesheet. Not optional — the bull and bear are a matched pair either side
of the same section, and the page's argument depends on both being there.

**Generate in the same session as the bull**, immediately after it, or the
line weights will not match and the pair will look wrong together.

Monochrome, exactly as the bull — white on solid black. The red comes from
CSS.

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

## 4. Image 03 — Gold bar *(engraving)*

**Used as:** tinted watermark across the Gold card, 12% opacity.
**Generate 03, 04 and 05 in one run, straight after the bull and bear**, so
all five share a line weight.

```
Vintage copperplate engraving of a single cast gold bullion bar, seen in
three-quarter view from slightly above, floating with nothing beneath it.
Bold, heavy, confident line work — thick contour lines defining the bar's
three visible faces, with only minimal hatching inside them to suggest the
cast surface. Simple and immediately readable as a bullion bar in
silhouette. Completely plain and unstamped: no engraving on the bar, no
numbers, no hallmark, no text of any kind. Pure white lines on a solid pure
black background. Extremely high contrast with no grey midtones. Centred,
with a generous black margin on all sides.
```

- **Aspect** 4:3 · **Size** 2000×1500 · **Format** PNG
- Midjourney: `--ar 4:3 --style raw --stylize 150`
- **The "unstamped" instruction is load-bearing.** Generated lettering is
  almost always malformed, and the site sets real text in HTML over it.
- **Accept it if:** you can still read it as a gold bar when you shrink it
  to thumbnail size. **Reject it if:** the detail is fine and delicate —
  that is a beautiful image that will vanish completely at 12%.

---

## 5. Image 04 — Silver bar *(engraving)*

**Generate straight after the gold bar**, in the same run.

```
Vintage copperplate engraving of a single cast silver bullion bar,
floating with nothing beneath it. Identical camera angle, identical line
weight and identical framing to the gold bar you just made — these are a
matched pair and will sit side by side. Slightly narrower and flatter in
proportion than the gold bar, so the two read as different metals by shape
alone. Bold heavy contour lines, minimal internal hatching. Completely
plain and unstamped, no numbers or markings. Pure white lines on a solid
pure black background, extremely high contrast, generous black margin.
```

- Same size and format as the gold bar.
- **The shape has to do the work.** Both bars will be tinted by the site —
  gold `#d9a441`, silver `#aab4c0` — but at 12% opacity those two tints are
  nearly indistinguishable. If the silhouettes are identical, the cards will
  look identical. Make the proportions visibly different.

---

## 6. Image 05 — Crude *(engraving)*

The barrel, not the droplet. A droplet was the more distinctive idea when
these were photographs, but as a bold silhouette at 12% opacity it reads as
an unidentifiable blob, while a barrel is unmistakable.

```
Vintage copperplate engraving of a weathered steel oil barrel standing
upright, three-quarter view, floating with nothing beneath it. Bold heavy
contour lines with the barrel's horizontal ribs clearly drawn — those ribs
are what make it instantly recognisable, so give them weight. Minimal
internal hatching. Completely unlabelled: no text, no markings, no logos.
Same engraving style and line weight as the gold and silver bars you just
made. Pure white lines on a solid pure black background, extremely high
contrast, generous black margin.
```

- **Aspect** 4:3 · **Size** 2000×1500 · **Format** PNG
- **Accept it if:** the ribs are legible at thumbnail size. They are the
  whole identification.

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

## 8. Image 07 — Background texture *(optional — consider skipping)*

Two reasons to think twice. The page now has zero shadows and sharp
corners; a photographic texture pulls against that. And a texture cannot be
theme-neutral — it needs two versions.

If you want it, generate **both**:

**Dark version**

```
Abstract macro photograph of brushed dark charcoal metal with a faint warm
gold sheen sweeping diagonally across it. Extremely subtle. Near-black
overall. Fine grain. No distinct objects, no focal point, evenly lit corner
to corner so it can tile as a background texture.
```

**Light version**

```
Abstract macro photograph of brushed warm off-white paper or pale plaster
with a faint warm gold sheen sweeping diagonally across it. Extremely
subtle. Near-white overall. Fine grain. No distinct objects, no focal
point, evenly lit corner to corner so it can tile as a background texture.
```

- **Aspect** 16:9 · **Size** 2560×1440 · **Format** JPG
- Used at 8–12% opacity, so err on the side of *too subtle*.

---

## 8b. On red, green and gold

**Decided: the bull is green and the bear is red.**

This overrides what this section used to say. The earlier argument was that
on a trading page green and red mean one thing — price direction — and using
them as decoration weakens them where they are actually a signal. That
argument still holds; the call was made anyway, and if it looks wrong on the
page it gets reverted.

**Reverting is one line.** In `globals.css`:

```css
:root {
  --mark-bull: var(--up);     /* --gold pe wapas karna ho to yahan */
  --mark-bear: var(--down);   /* aur yahan */
}
```

Both to `var(--gold)` and the page is back to the original. Nothing else to
touch — which is exactly why the colour lives in two tokens instead of being
spread through the file.

**Nothing changes for the artwork.** Keep generating 01 and 02 as pure white
on solid black, same as everything else. The colour is applied by the
stylesheet, not baked into the file — so the same two PNGs work whether they
end up green/red or gold, on both themes, with no second version. If you had
generated a green bull, that green would have been discarded.

The bear also carries slightly lower opacity than the bull (.075 against
.09). Red reads heavier than green at the same value, and this section's
whole point is that the two are equal — a bear that visually outweighs the
bull would contradict the copy above it.

---

## 9. Which tool for which image

| Image | Best tool | Why |
|---|---|---|
| 01, 02 engravings | **Midjourney** `--style raw` | Strongest at etched line work |
| 03, 04, 05 market | **Midjourney** `--style raw` | Same etched line work as 01/02 — generate all five in one session |
| 06 social | **Midjourney** | Best at cinematic negative space |
| 07 texture | Any | Low bar |
| Any, needing transparency | **Recraft** | Native alpha export, saves a step |
| Fixing one you nearly like | **Nano Banana / Gemini** | Good at targeted edits |

---

## 10. After generating

| Image | Size | Format | Background | Used at |
|---|---|---|---|---|
| 01 Bull | 2000² | PNG | solid black → mask | 4–6%, tinted per theme |
| 02 Bear | 2000² | PNG | solid black → mask | 4–6%, tinted per theme |
| 03 Gold bar | 2000×1500 | PNG | solid black → mask | 12%, tinted `--gold` |
| 04 Silver bar | 2000×1500 | PNG | solid black → mask | 12%, tinted `--silver` |
| 05 Crude | 2000×1500 | PNG | solid black → mask | 12%, tinted `--crude` |
| 06 Social | 1200×630 | JPG | baked dark (no theme) | 100% |

**Note:** the original §7 render now lives at `public/close-cta.jpg`, where it
is the ground of the closing CTA. The social preview was replaced by a
purpose-made image and sits at `app/opengraph-image.jpg` — Next reads that
filename by convention, with its alt text in `opengraph-image.alt.txt`.

**Every page image keeps its solid black background** — that is the whole
mechanism. Black becomes transparent, the white line work becomes the
shape, and the stylesheet paints it: gold or charcoal for the bull and
bear, and each metal's own tint for the three cards. One file per image,
both themes, no second version of anything.

**Do not remove the background**, do not export transparent, and do not
convert these to WebP — the mask reads the file's luminance and the PNG is
what the slots are wired to. (`public/art/bull.png` and so on, exactly those
names.)

1. **Nothing to remove.** Keep the black background — it is the mask.
2. **Push the contrast** if there is any grey in it. Levels or Curves until
   the blacks are 0 and the whites are 255, with nothing in between. Grey
   becomes half-transparent smear.
3. Keep each **under 150KB**. A two-tone image compresses hard, so this is
   easy — if yours does not, there is grey in it. See step 2.
4. Save as PNG at the exact paths in §0 and reload the page. **Nothing else
   is needed** — the slots are already built, they probe for the file, and
   they paint it themselves. No code, no tickets, no asking me.

**They are already wired.** Each slot renders nothing at all while its file
is missing, so you can drop them in one at a time and see each one land on
its own.

---

## 11. One caveat

**I can see generated images.** Put the file in the repo and I will open it
and say whether it works — including the things that are hard to judge by
eye: whether the contrast is clean enough to mask, whether the detail
survives at 4% or 12%, and whether two of them actually match.

What I still cannot do is take a screenshot of the running page, so how the
finished section *feels* is your call, not mine.
