# Build Prompt: Birdie Boulevard Website

**For:** Alfred (Web Developer)
**Reference site:** https://birdiemobilegolf.com — use it for section flow, layout patterns, and conversion structure. Create **original** Birdie Boulevard copy and branding; do not reuse its logos, media, code, or verbatim marketing text.
**Assets:** I will place all assets (logo, photos, videos, favicon) in an `/assets` folder. Until then, use a simple text wordmark and clearly-named neutral placeholders (e.g. `assets/hero-poster.webp`, `assets/logo.svg`, `assets/bay-photo-1.webp`) so swapping is a one-step file replacement. Hide video controls rather than showing broken media, and include a short asset manifest at the top of the project listing every expected asset filename.

---

## 1. What We Are Building

A single-page marketing site (with smooth-scroll anchor navigation) for **Birdie Boulevard**, a mobile golf simulator rental business. We deliver, set up, operate, and tear down a pro-grade golf simulator at private and public events.

**Key business facts (use these, not the reference site's):**

- **Company name:** Birdie Boulevard
- **One simulator enclosure, two depth configurations:**
  - **Standard:** 12 ft W × 9 ft H × 7 ft D
  - **Extended (with the extension option):** 12 ft W × 9 ft H × 20 ft D
- **Launch monitor:** SkyTrak ST+ launch monitor
- **Projector:** 4K projector
- **Three packages:**
  - 2 hours — $550
  - 4 hours — $950 (visually emphasize the middle card with a "Featured" badge — optional, my suggestion)
  - 6 hours — $1,200
- Event types we serve: private parties, corporate events, birthdays and bachelor(ette) parties, breweries and restaurants, community events, fundraisers, weddings, golf-themed watch parties.

> **Important — confirmed vs. draft:** Only the company name, enclosure configurations, equipment, and the three package durations/prices are confirmed. Everything else (operator, delivery/setup/teardown, clubs, courses, leaderboards, games, additional hours, availability, deposit, travel policy) is **draft copy I still need to review/approve** — build it in, but keep it easy to edit and flag it in the handoff notes.

---

## 2. Overall Design System (match the reference site's feel)

**Palette (dark, premium golf look):**

| Token | Hex | Use |
|---|---|---|
| Deep forest | `#0B2417` | Page/body background, dark sections |
| Forest | `#123A24` | Green section backgrounds, gradients |
| Dark forest ink | `#071A10` | Deepest gradients |
| Gold | `#E7B62C` | Primary accent: buttons, highlights, icons, prices |
| Bright gold | `#F4CE4B` | Gradient/glow ends |
| Button gold dark | `#D9A522` | Darker end of gold button gradients |
| Cream | `#F6EFDD` | Light text on dark sections |
| Flag red | `#CC3A2E` | Sparse accent (badges, small details) |
| White | `#FFFFFF` | Light section backgrounds |
| Light heading green | `#103021` | Headings in light sections |
| Light body green-gray | `#46554C` | Body text in light sections |
| Light gold | `#A87A08` | Gold accent inside light sections |
| Light card | `#FBF9F2` | Cards in light sections |
| Light border | `#DAD4C2` | Input borders in light sections |

**Typography:**

- Headings: **Playfair Display** (600–900 weights, incl. italics) via Google Fonts.
- Body: **Inter** (400–800) via Google Fonts.

**Look and feel details:**

- Alternate dark-green sections with white/cream light sections as the page scrolls.
- Rounded cards (18px radius) with subtle glass style: translucent white gradient surface, faint cream border, soft shadows.
- Pill-shaped buttons: gold gradient buttons (dark-green text, gold shadow, shimmer sweep on hover, lift on hover) and ghost buttons (cream border, gold on hover).
- Subtle grain texture overlay, radial "aurora" gold/green glows, floating golf-ball accents in the hero.
- Scroll-reveal animations (fade/slide/zoom via IntersectionObserver) that gracefully show all content even with JS disabled.
- Scroll progress bar (thin gold line at the very top of the page).
- Astroturf-style trim along the bottom edge of several sections.
- Mobile sticky "Book Your Event" gold button that appears after scrolling.
- Accessible: proper contrast, semantic HTML, alt text on all images.

**Tech:** Static single-page site (the reference is a compiled Tailwind single HTML file — a similar approach is fine). Fast load: preconnect fonts, preload hero poster, lazy-load below-fold images, WebP where possible.

---

## 3. Page Structure (top to bottom, mirroring the reference)

### Header (fixed)

- Left: Birdie Boulevard logo badge + wordmark (use `assets/logo.svg` placeholder).
- Desktop nav anchor links: Experience · Setups · Packages · How It Works · FAQ (add "Pro Shop" only if the optional shop section is built)
- Header button: "Book Your Event" → quote section.
- Mobile: hamburger menu with same links + full-width gold "Book Your Event" button; header gains dark background/blur/shadow on scroll.

### 1. Hero

- Full-width, near-viewport-height background video (`assets/hero-bg.mp4`, poster `assets/hero-poster.webp`) with dark gradient overlays.
- Service-area eyebrow, big Playfair headline, one-sentence description.
- Two CTAs: gold "See It In Action" (scrolls to video section) + ghost "Get a Quote".
- Three feature callouts: SkyTrak ST+ launch monitor · 4K projector · On-site operator.
- Headline: write original copy in this voice — premium, fun, effortless. Suggested direction (reword, don't copy the reference): "The golf course comes to you." Eyebrow: "Premium mobile golf simulator rentals".

### 2. "See It In Action" — marketing video section (light theme)

- Two-column: left = copy + bullet list (what's included with every rental); right = portrait (9:16) video with poster + pulsing gold play button (`assets/promo-video.mp4`).

### 3. Event-type marquee

- Full-width, slow-scrolling text band listing event types (private parties, corporate events, birthdays, bachelor(ette) parties, breweries and restaurants, community events, fundraisers, weddings). Pause on hover.

### 4. "The Birdie Boulevard Experience" — feature cards (dark green)

- Heading + short intro, then a 3-column desktop grid (2-col tablet, 1-col mobile) of six feature cards:
  1. Pro-grade simulator bay (12' W × 9' H, with the 20' deep extension option)
  2. SkyTrak ST+ launch monitor — ball speed, carry, spin, shot shape
  3. 4K projector — crisp, bright big-screen image
  4. Thousands of world-famous courses + practice range
  5. On-site operator runs everything start to finish
  6. Live leaderboard + games (Closest to the Pin, Longest Drive, scrambles)
- Each card: gold icon tile, title, 1–2 sentence description. Hover lift + gold border glow.

### 5. Showcase (light theme)

- Two-column: text + bullets on one side, wide lifestyle image of the simulator in use on the other (`assets/showcase-wide.webp`), plus a CTA button.

### 6. "One Enclosure, Two Configurations" — setup options (dark green)

We have ONE enclosure with two depth configurations (do NOT present these as two different simulators):

- Two side-by-side cards:
  - **Standard Configuration** — enclosure dimensions 12 ft W × 9 ft H × 7 ft D.
  - **Extended Configuration** (tag: "With optional extension") — enclosure dimensions 12 ft W × 9 ft H × 20 ft D.
- Label both measurements as **"Enclosure dimensions"** — these are the enclosure footprint, not verified minimum venue clearances. Add a small note on each card: "Required swing space, ceiling clearance, and room layout vary by venue — we'll confirm fit before your event." Do not claim a specific configuration suits particular venue types until we confirm.
- Each card: image, description, bullet list, and the labeled dimensions spec row.
- Below the cards: a "Will it fit?" panel — venue chips (backyards, banquet halls, breweries, corporate offices, garages, clubhouses, hotel event spaces, convention spaces, covered areas) + CTA: "Send us your room dimensions (width × length × ceiling height) and we'll confirm the best configuration."

### 7. Event Packages (dark background)

- Eyebrow + heading + intro: "All-inclusive packages. Delivery, setup, operation, and teardown — we handle everything."
- **Three package cards in a 3-column desktop grid** (stack on mobile):

| | The Tee Time | The Front Nine ("Featured" badge) | The Full Round |
|---|---|---|---|
| Duration | 2 hours | 4 hours | 6 hours |
| Price | **$550** | **$950** | **$1,200** |
| Best for | Smaller parties, birthdays, backyard gatherings | Birthdays, bachelor(ette) parties, family gatherings, private events | Longer parties, festivals, fundraisers, all-day events |

- Each card: duration label, package name, big gold price, 1-line description, checklist of inclusions, and a gold "Request This" button. The middle card gets the "Featured" treatment: brighter green/gold emphasis and a gold badge. (Package names are my suggestions — feel free to pitch alternatives.)
- Inclusions checklist (same on all three — **draft, for my review**): simulator delivery, setup & teardown · on-site operator · SkyTrak ST+ launch monitor · 4K projector · virtual courses & games · Closest-to-Pin and Longest Drive competitions · live leaderboard · golf clubs provided.
- A gold "included with every package" badge band: Delivery & setup · On-site operator · Clubs · All games.
- Below the cards: a "Not sure which package? Tell us your event type, guest count, and location and we'll recommend one" CTA panel.
- (Leave a clearly-commented optional slot for an add-ons / additional-hours / large-event panel we may add later — extension pricing is a TODO for me.)

### 8. How It Works (light theme)

- Three-column, numbered steps:
  1. **Request a quote** — send your date, location, and headcount; we confirm availability and the right package.
  2. **We deliver & set up** — the Birdie Boulevard crew arrives, builds the bay, and calibrates everything.
  3. **You play** — your guests play famous courses and compete while our operator runs games and the leaderboard; we pack it all up afterward.

### 9. Stats band (dark)

- Four-stat grid: **SkyTrak ST+** launch monitor · **4K** projector · **12' × 9'** simulator bay · **100%** hassle-free.

### 10. Pro Shop (light theme) — OPTIONAL

- I have NOT confirmed merch yet. Either skip this section entirely or build it fully commented-out behind a flag: 4-column (2-col mobile) product-card grid with placeholder products (`assets/product-1.webp` … `product-4.webp`). If included, keep it wired so enabling real products + a store link later is trivial. If skipped, also remove the "Pro Shop" nav link.

### 11. Book Your Event / Quote section (light theme)

- Two-column: left = booking copy (service area, availability, response time, deposit — all placeholders for me to confirm); right = **quote form** (build it as a simple, styled form with fields: name, email, phone, event date, event type, venue city, guest count, **package selection (2/4/6 hours or "not sure")**, **configuration (Standard / Extended / Not sure)**, **venue dimensions (W × L × ceiling height)**, message — plus a submit action we can wire to our email/form tool; also leave a clearly-marked comment where an embedded iframe form like LeadConnector can be dropped in instead). Until a submission destination is configured, show the form as a preview and do not fake a success message.
- Include the space-requirements reminder: "Don't forget your venue dimensions (width × length × ceiling height) so we can confirm the right configuration."

### 12. FAQ (dark background)

- Centered heading + single-column accordion (native `<details>`), 8–10 questions:
  - What exactly do I get with a rental? (bay, SkyTrak ST+, 4K projector, operator, clubs, games)
  - How much space do you need? (standard 12'×9'×7'; extended 12'×9'×20'; send dimensions and we'll confirm)
  - How many players can play? (groups rotate; competitions and leaderboards keep everyone involved)
  - What's included in every package? (delivery, setup, teardown, operator, clubs, all games)
  - Do you bring clubs? (yes — right- and left-handed)
  - What events is this great for? (parties, corporate, breweries/restaurants, fundraisers, weddings, community events)
  - Indoor and outdoor? (both — the bay works in backyards, halls, offices, breweries, and covered spaces)
  - How do I reserve a date? (deposit details — placeholder, we'll confirm the amount)
  - How far will you travel? (placeholder for service radius/mileage policy)
  - How do I know it will fit in my space? (send width × length × ceiling height)

### 13. Final CTA (light theme)

- Centered headline with a strong closing hook (write original copy in the reference's spirit, e.g. "Your crew. Your place. One unforgettable round.") + copy + gold "Get Your Event Quote" button.

### Footer (dark)

- Three-column: (1) logo + one-line description + social icons (Instagram, Facebook, TikTok — placeholder links), (2) "Explore" nav links, (3) "Ready to play?" — service area line + gold "Get Your Event Quote" button.
- Bottom row: "© 2026 Birdie Boulevard. All rights reserved." + tagline (suggest: "Your event, one swing at a time.").

---

## 4. SEO & Technical

- Title tag pattern: "Birdie Boulevard | Mobile Golf Simulator Rentals" (we'll add the city/region once confirmed).
- Meta description, canonical, Open Graph, and Twitter card tags (use placeholder OG image `assets/og-image.webp`).
- `robots: index, follow`, `theme-color: #0B2417`.
- Semantic single-page HTML with anchor IDs matching nav links; smooth scrolling.
- Mobile-first responsive; test at 360px, 768px, 1024px, 1440px widths.
- Fast: preload hero poster, lazy-load below-the-fold images, minimal JS (nav, reveal animations, FAQ accordions, video controls, form).

---

## 5. Open Items for Robert (me)

- Service area / cities (hero eyebrow, quote section, footer, SEO)
- Deposit amount and additional-hours pricing
- Pro Shop: real products + store link
- Booking form destination (email, LeadConnector, or other)
- Final logo, photos, and video assets → `/assets`

Build with well-named placeholders everywhere so each of these is a quick swap later.
