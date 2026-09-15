# Brookline Tennis Academy — Website

A cleaner, booking-first redesign for [Brookline Tennis Academy](https://www.brooklinetennis.com/)
("Tennis in the Woods," at The Roxbury Latin School, West Roxbury, MA).

Static site — no build step. Open `index.html`, or serve locally:

```bash
python3 -m http.server 8747   # → http://localhost:8747
```

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
  name knocked out to cream, since `logo.png` sets it in black and vanishes
  against the photography. Both are 400px-wide rasters; a vector source from
  the client would sharpen this considerably.

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
