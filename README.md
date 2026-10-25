# Birdie Boulevard — Mobile Golf Simulator Rentals

Static single-page marketing site. No build step: `index.html`, `styles.css`, `script.js`, and `assets/`.

Live: https://birdie-boulevard.pages.dev/ (Cloudflare Pages)

## Asset manifest

Swap any asset by saving the new file **with the same filename** in `assets/`. That's it.

| File | Size / format | Status | Used in |
|---|---|---|---|
| `logo-mark.webp` | 160×160 | ✅ From supplied `BBG Logo.png` (ball + flag) | Header badge |
| `logo-banner.webp` | 1200×193, transparent | ✅ From supplied `BBG Banner Logo2_BW.png` (recolored cream) | Footer |
| `logo-emblem.webp` / `logo-emblem-600.webp` | full emblem | ✅ From supplied `BBG Logo.png` | Final CTA |
| `favicon-48.png`, `favicon-192.png`, `apple-touch-icon.png` | PNG | ✅ From supplied logo | Browser tab / home screen |
| `og-image.jpg` | 1200×630 | ✅ Emblem on brand green | Social link previews |
| `hero-bg.mp4` | 1920×1080, muted, ~10–20 s loop, < 8 MB | ⏳ **Needed** | Hero background (auto-plays once the file exists) |
| `hero-poster.webp` | 1920×1080 | 🟡 Illustrated placeholder | Hero background / video poster |
| `promo-video.mp4` | 1080×1920 (9:16) | ⏳ **Needed** | "See it in action" (play button appears once the file exists) |
| `promo-poster.webp` | 1080×1920 (9:16) | 🟡 Illustrated placeholder | Promo video poster |
| `showcase-wide.webp` | 1600×1000 (16:10) | 🟡 Illustrated placeholder | "Made for a crowd" section |
| `setup-standard.webp` | 1200×750 (16:10) | 🟡 Dimension diagram (12′×9′×7′) | Standard configuration card |
| `setup-extended.webp` | 1200×750 (16:10) | 🟡 Dimension diagram (12′×9′×20′) | Extended configuration card |
| `product-1.webp` … `product-4.webp` | square | ⏳ Only if the Pro Shop is enabled | Pro Shop (disabled) |

Videos are only loaded when the file actually exists, so missing videos never show broken players.

## Confirmed vs. draft content

**Confirmed (from the build spec):** company name; one enclosure with Standard 12′ W × 9′ H × 7′ D and Extended 12′ W × 9′ H × 20′ D configurations; SkyTrak ST+ launch monitor; 4K projector; packages 2 hr $550 / 4 hr $950 / 6 hr $1,200.

**Draft — needs Robert's review** (marked `DRAFT` / `data-draft` / `data-placeholder` in `index.html`):

- Operator, delivery/setup/teardown, clubs (incl. right/left-handed), courses, games, leaderboard — feature cards, package checklists, "Included with every package" band, FAQ
- Package names (The Tee Time / The Front Nine / The Full Round) and one-line descriptions
- Quote section info list: service area, availability ("7 days a week"), response time ("within 24 hours"), deposit
- FAQ answers on players, reservations/deposit, and travel
- Footer "Ready to play?" service-area line
- Social links (currently `#`)

## Open items

1. **Service area / cities** — search `data-placeholder="service-area"`; also add the city to `<title>` and the meta description.
2. **Deposit amount, additional-hour and extension pricing** — add-ons slot is commented in the Packages section.
3. **Form destination** — set `data-endpoint="https://…"` on `#quote-form`, or replace the form with an embedded LeadConnector iframe (instructions in the HTML comment above the form). Until then the form validates but clearly says nothing was sent.
4. **Pro Shop** — fully built but commented out; uncomment the section and its nav links, add product images and the store URL.
5. **Photos and videos** — see the manifest above.
6. **Custom domain** — update `canonical`, `og:url`, `og:image`, `twitter:image`, `robots.txt`, and `sitemap.xml`.

## Local preview

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

```bash
npx wrangler pages deploy <folder with index.html, styles.css, script.js, 404.html, robots.txt, sitemap.xml, _headers, assets/> \
  --project-name birdie-boulevard --branch main
```

The source logos and build spec at the repo root are not deployed.
