# Brookline Tennis Academy — Website

A cleaner, booking-first redesign for [Brookline Tennis Academy](https://www.brooklinetennis.com/)
("Tennis in the Woods," at The Roxbury Latin School, West Roxbury, MA).

Static site — no build step. Open `index.html`, or serve locally:

```bash
python3 -m http.server 8747   # → http://localhost:8747
```

## Pages

Six standalone pages, all sharing `styles.css`, `script.js` and `config.js`:

| File | Purpose |
|------|---------|
| `index.html` | Hero, private-lesson feature, programs teaser |
| `programs.html` | Junior / adult clinics, camp, CIT |
| `private-lessons.html` | The priority booking path |
| `about.html` | The academy, staff credentials, gallery |
| `gallery.html` | Photographs |
| `visit.html` | Address, phone, email, map |

The header, footer and booking modal are **duplicated into each page** rather
than injected by JavaScript, so every page is crawlable and works without JS.
The cost is that a change to the header means editing six files — worth
knowing before a nav edit. `images/logo-nav.png` sits in the bar on every inner
page; on the home page that slot is an empty placeholder that the hero logo
flies into.

## Scroll reveals

`[data-reveal]` fades a block in once, on entry, and never re-hides it —
opacity only, no movement, matching both reference sites. `--reveal-delay`
staggers grid children by 45ms. `[data-parallax="1|-1"]` drifts an image by
±9% of its height as it crosses the viewport; neighbouring images run in
opposite directions, which is where the sense of depth comes from.

The hidden state is scoped to a `.reveals-armed` class that JS adds only when
it is about to start observing, so a script failure leaves the content visible
instead of producing a blank page. A timer and a `visibilitychange` sweep
reveal anything at or above the fold, because observer callbacks are not
delivered to a backgrounded tab.

## Structure

| File | Purpose |
|------|---------|
| `index.html` | Page markup |
| `styles.css` | All styling (editorial forest-green + optic-yellow theme) |
| `config.js` | **Everything editable** — booking links, contact info, addresses |
| `script.js` | Booking-button wiring, mobile nav, and the in-page booking modal |
| `images/` | Photography (pulled from the current live site) |

## Navigation

One bar at every width, after [The Oaks Club](https://www.theoaksclub.com/):
menu on the left, wordmark optically centred on the page, a single action on
the right. **It does not change on scroll** — no fade-in, no shrink, no
hide-on-scroll-down. All of the navigation lives in a drawer that expands
beneath the bar, so the bar itself never has to grow.

- Collapse uses `grid-template-rows: 0fr -> 1fr` plus `visibility`, so the
  links leave the tab order and the accessibility tree while closed.
- Closes on Escape (returning focus to the button), on an outside click, on a
  link, and on a breakpoint change.
- A `<noscript>` block expands the drawer and hides the toggle, so the menu
  still works without JavaScript.

## The logo's flight into the nav

The hero logo is `position: fixed` over an in-flow `.hero-logo-slot`, and
`script.js` flies it into the nav bar as you scroll. While scrollY is inside the
travel distance the translation is exactly `-scrollY`, so it rides up *with* the
page instead of sliding independently, shrinking as it goes and parking in the
bar (~370px of scroll on desktop). `#navLogoTarget` — an invisible placeholder
in the header — defines where it lands, so the size and position are set in CSS,
not hard-coded in JS.

Two images cross-fade en route: `logo-reverse.png` (cream) reads over the
photography, `logo-nav.png` (dark, credit line dropped so the name stays legible
at ~112px) reads over the white bar.

**Gotcha worth knowing:** nothing between `.hero-logo` and `<body>` may create a
stacking context or a containing block — no `transform`, `filter`, `isolation`,
`contain`, or positive `z-index` — or the fixed logo gets trapped beneath the
sticky header. That is why the hero stacks purely by DOM order and `.hero-seal`
is nudged with a margin rather than a transform.

## Hero

A slow cross-fading slideshow behind a single centred seal — modelled on
[The Oaks Club](https://www.theoaksclub.com/): four photographs, no arrows, no
dots, no captions. Slides, focal points, hold time and fade time all live in the
`hero` block of **`config.js`**; `script.js` builds slides 2..n and cycles them.

- Slide 1 is inlined in `index.html` so it paints without waiting on JS.
- Optimised WebP (with JPG fallback) lives in `images/hero/`.
- The cycle pauses when the tab is hidden or the hero scrolls out of view.
- With `prefers-reduced-motion: reduce`, it holds on the first photograph.
- The centrepiece is `images/logo-reverse.svg`.

## The logo

The logo is **vector** (`images/logo.svg` and variants), traced from the
client's 400px PNG with `tools/trace-logo.py` — there is no vector original.
The artwork itself is unmodified.

| File | Use |
|------|-----|
| `logo.svg` | Dark name, teal credit line — light backgrounds, footer |
| `logo-reverse.svg` | Name and credit line in cream — over photography |
| `logo-nav.svg` | Credit line dropped, mark centred in the same 400x216 box so it can cross-fade with the reverse during the flight |
| `logo.png` | The client's raster artwork, and the trace source |

Re-run the trace after any change to the source:

```bash
python3 tools/trace-logo.py            # needs potrace + pillow
```

Two things the script gets right that are easy to get wrong: masks are
alpha-weighted with a soft colour falloff, so the source's anti-aliasing
survives (threshold the 400px source directly and potrace reproduces the pixel
staircase — the ball comes out polygonal at hero size); and the colour layers
are separated *before* tracing, so every variant is plain paths with no `use`
or `clipPath`, which some renderers mishandle.

## The logo's flight into the nav

The hero logo is `position: fixed` over an in-flow `.hero-logo-slot`, and
`script.js` flies it into the nav bar as you scroll. While scrollY is inside the
travel distance the translation is exactly `-scrollY`, so it rides up *with* the
page instead of sliding independently, shrinking as it goes and parking in the
bar (~370px of scroll on desktop). `#navLogoTarget` — an invisible placeholder
in the header — defines where it lands, so the size and position are set in CSS,
not hard-coded in JS.

Two images cross-fade en route: `logo-reverse.png` (cream) reads over the
photography, `logo-nav.png` (dark, credit line dropped so the name stays legible
at ~112px) reads over the white bar.

**Gotcha worth knowing:** nothing between `.hero-logo` and `<body>` may create a
stacking context or a containing block — no `transform`, `filter`, `isolation`,
`contain`, or positive `z-index` — or the fixed logo gets trapped beneath the
sticky header. That is why the hero stacks purely by DOM order and `.hero-seal`
is nudged with a margin rather than a transform.

## Hero

A slow cross-fading slideshow behind a single centred seal — modelled on
[The Oaks Club](https://www.theoaksclub.com/): four photographs, no arrows, no
dots, no captions. Slides, focal points, hold time and fade time all live in the
`hero` block of **`config.js`**; `script.js` builds slides 2..n and cycles them.

- Slide 1 is inlined in `index.html` so it paints without waiting on JS.
- Optimised WebP (with JPG fallback) lives in `images/hero/`.
- The cycle pauses when the tab is hidden or the hero scrolls out of view.
- With `prefers-reduced-motion: reduce`, it holds on the first photograph.
- The centrepiece is `images/logo-reverse.svg`.

## The logo

The logo is **vector** (`images/logo.svg` and variants), traced with potrace
from the client's 400px PNG — there is no vector original. Tracing was the only
way to get clean letterforms at hero size; the raster was too small and
retouching it left anti-aliasing artefacts.

| File | Use |
|------|-----|
| `logo.svg` | Dark name, teal credit line — light backgrounds, footer |
| `logo-reverse.svg` | Name and credit line in cream — over photography |
| `logo-nav.svg` | Credit line dropped, mark centred in the same 400x216 box so it can cross-fade with the reverse during the flight |
| `logo.png` | The retouched raster the trace came from |
| `logo-original.png` | The client's untouched file |

Colour layers (yellow ring, teal, ink, credit line) were separated **before**
tracing rather than clipped afterwards, so each variant is plain paths with no
`use` or `clipPath` — some renderers mishandle those.

**The wordmark has been edited**: the monospace `l` in "brookline" carried a
top-left flag that made it read as a `1`, and it has been removed. Restore
`logo-original.png` and re-trace if the client prefers the stock mark.

## The logo's flight into the nav

The hero logo is `position: fixed` over an in-flow `.hero-logo-slot`, and
`script.js` flies it into the nav bar as you scroll. While scrollY is inside the
travel distance the translation is exactly `-scrollY`, so it rides up *with* the
page instead of sliding independently, shrinking as it goes and parking in the
bar (~370px of scroll on desktop). `#navLogoTarget` — an invisible placeholder
in the header — defines where it lands, so the size and position are set in CSS,
not hard-coded in JS.

Two images cross-fade en route: `logo-reverse.png` (cream) reads over the
photography, `logo-nav.png` (dark, credit line dropped so the name stays legible
at ~112px) reads over the white bar.

**Gotcha worth knowing:** nothing between `.hero-logo` and `<body>` may create a
stacking context or a containing block — no `transform`, `filter`, `isolation`,
`contain`, or positive `z-index` — or the fixed logo gets trapped beneath the
sticky header. That is why the hero stacks purely by DOM order and `.hero-seal`
is nudged with a margin rather than a transform.

## Hero

A slow cross-fading slideshow behind a single centred seal — modelled on
[The Oaks Club](https://www.theoaksclub.com/): four photographs, no arrows, no
dots, no captions. Slides, focal points, hold time and fade time all live in the
`hero` block of **`config.js`**; `script.js` builds slides 2..n and cycles them.

- Slide 1 is inlined in `index.html` so it paints without waiting on JS.
- Optimised WebP (with JPG fallback) lives in `images/hero/`.
- The cycle pauses when the tab is hidden or the hero scrolls out of view.
- With `prefers-reduced-motion: reduce`, it holds on the first photograph.
- The centrepiece is `images/logo-reverse.png` — the real logo with the black
  name knocked out to cream, since the stock logo sets it in black and vanishes
  against the photography.
- **The logo artwork has been edited.** The wordmark is set in a monospace
  typewriter face whose lowercase `l` carries a top-left flag, so "brookline"
  read as "brook1ine". That flag is painted out in both `logo.png` and
  `logo-reverse.png`. The untouched original is kept at
  `images/logo-original.png` — restore it if the client prefers the stock mark.
- All three are 400px-wide rasters. A vector source from the client would let
  these be regenerated cleanly at any size.

## Booking

All booking actions are driven from the `booking` block in **`config.js`** so the
booking system can be swapped without touching markup:

- **Program / clinic / camp buttons** link out to the existing **Timmy** (`gotimmy.com`)
  registration pages, split by season.
- **Private / semi-private lessons** (the priority CTA) open an **in-page modal**.
  It currently shows a labeled *preview* scheduler; set `booking.privateSemiPrivate.embedUrl`
  to a real [Acuity](https://acuityscheduling.com/) link to make it live. With JavaScript
  off, the same button falls back to a pre-filled email to the office.

Each booking entry supports `type: "embed" | "link" | "email"`, so services can be
migrated to a new booking system one at a time.
