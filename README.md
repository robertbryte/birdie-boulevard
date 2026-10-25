# Birdie Boulevard

## Asset manifest

Optimized derivatives in `assets/` are used by the site; the supplied source PNGs remain untouched at the project root.

| File | Status | Use / one-step replacement |
|---|---|---|
| `assets/logo-emblem.webp` | Ready | Full-color supplied emblem; replace with the same filename. |
| `assets/logo-banner.webp` | Ready | Wide monochrome supplied logo for footer. |
| `assets/logo-banner-small.webp` | Ready | Optimized header version. |
| `assets/favicon.png` | Ready | Derived from supplied emblem. |
| `assets/og-image.webp` | Ready | Temporary branded social card; replace with a 1200×630 image. |
| `assets/hero-bg.mp4` | Future | Add an event background video; uncomment/wire a `<video>` in the hero. |
| `assets/hero-poster.webp` | Future | Add a 1920×1080 event still and update the hero background/art. |
| `assets/promo-video.mp4` | Future | Add a portrait 9:16 promo video and replace the action-section placeholder. |
| `assets/promo-poster.webp` | Future | Add a 1080×1920 portrait poster for the promo video. |
| `assets/showcase-wide.webp` | Future | Add a wide 3:2 or 16:9 lifestyle photo and replace the showcase placeholder. |
| `assets/setup-standard.webp` | Future | Add a Standard configuration photo and replace its CSS bay diagram. |
| `assets/setup-extended.webp` | Future | Add an Extended configuration photo and replace its CSS bay diagram. |

**Replacement:** export WebP/MP4 at the filename above, copy it into `assets/`, then replace the clearly labeled CSS placeholder block in `index.html` with an `<img>`/`<video>` using that path. No build step is required.

## Run locally

```bash
npm start
```

Railway can use the included `railway.json` and `npm start`; `PORT` is honored automatically.

## Validate

```bash
npm test
```

The static validator checks HTML structure, local links/assets, fragment targets, required content, form preview safeguards, ignored Windows metadata, and setup/package facts.

## Launch handoff — editable draft assumptions

The following copy is deliberately labeled as draft or pending on-page and must be approved before launch:

- Service area/cities, travel radius, mileage or travel fees
- Deposit, reservation, availability, and response-time terms
- Delivery, setup, teardown, and on-site operator scope
- Club provision, including right/left-handed availability
- Course library/software, game formats, competitions, and live leaderboard
- Form destination (the current form is preview-only and never transmits data)
- Venue suitability; enclosure dimensions are **not** minimum venue clearances
- Canonical domain `birdieboulevard.com` (placeholder until domain is confirmed)
- Social links (not published because destinations are unknown)

Confirmed content used: company name, one enclosure with Standard 12′ × 9′ × 7′ and Extended 12′ × 9′ × 20′ configurations, SkyTrak ST+, 4K projector, and packages at 2 hours/$550, 4 hours/$950, and 6 hours/$1,200. The optional Pro Shop is disabled.

## Structure

- `index.html` — semantic single-page content
- `styles.css` — responsive design, placeholders, reveal/no-JS states
- `script.js` — mobile navigation, scroll progress/reveals, preview form behavior
- `tests/validate.py` — dependency-free static validation
