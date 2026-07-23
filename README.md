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
