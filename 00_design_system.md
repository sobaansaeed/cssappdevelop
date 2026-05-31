> Reference this file in EVERY page prompt. All pages must inherit these tokens.
 
---
 
## Brand Identity
 
**Platform:** Pakistan's Premier CSS Exam Preparation Platform
**Tagline:** Master CSS with Confidence
**Tone:** Aspirational, scholarly, cinematic, warm — like studying under a night sky
**Feeling to evoke:** Quiet determination, intellectual wonder, hopeful ambition
 
---
 
## Color Palette
 
```css
/* === BACKGROUNDS === */
--bg-hero: #0B1E3D;              /* Deep midnight navy — hero & dark sections */
--bg-page: #F5F0E8;              /* Warm parchment — main page background (inner pages) */
--bg-section-alt: #EDE6D6;       /* Slightly deeper cream — alternating sections */
--bg-card: rgba(255,255,255,0.12); /* Glassmorphism card base */
 
/* === TEXT === */
--text-primary: #1A1207;         /* Near-black warm brown — body text on light bg */
--text-on-dark: #F0EAD6;         /* Soft ivory — text on dark/hero sections */
--text-muted: #6B5E4E;           /* Muted warm brown — captions, meta, subtitles */
--text-heading-dark: #FFFFFF;    /* Pure white — headings on dark bg */
 
/* === ACCENT === */
--accent-primary: #E8650A;       /* Warm Orange — primary CTAs, highlights, active */
--accent-hover: #C4520A;         /* Deeper orange — hover state */
--accent-gold: #C8962E;          /* Muted gold — secondary accents, decorative */
--accent-glow: rgba(232,101,10,0.25); /* Orange glow for shadows/halos */
 
/* === BORDERS & GLASS === */
--border-glass: rgba(255,255,255,0.18);
--border-light: rgba(26,18,7,0.12);
--border-card: rgba(200,150,46,0.20); /* Subtle gold border on cards */
 
/* === GRADIENTS === */
--gradient-hero: linear-gradient(180deg, #0B1E3D 0%, #0F2A52 60%, #1A3A2A 100%);
--gradient-cta: linear-gradient(135deg, #E8650A 0%, #C8962E 100%);
--gradient-page-top: linear-gradient(180deg, #0B1E3D 0%, #F5F0E8 100%);
```
 
---
 
## Typography
 
### Font Families
```css
/* Display / Headings — Serif, editorial, classical */
--font-display: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
 
/* Body / UI — Clean humanist sans-serif */
--font-body: 'DM Sans', 'Outfit', sans-serif;
 
/* Mono — code, labels, metadata */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```
 
### Google Fonts Import
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
```
 
### Type Scale
| Role | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| Hero Heading | Cormorant Garamond | 72–96px | 600 | 1.05 |
| Page Heading (H1) | Cormorant Garamond | 52–64px | 600 | 1.1 |
| Section Heading (H2) | Cormorant Garamond | 36–44px | 500 | 1.2 |
| Card Heading (H3) | Cormorant Garamond | 24–28px | 500 | 1.3 |
| Eyebrow Label | DM Sans | 11px | 500 | 1.4 | letter-spacing: 0.18em, uppercase |
| Body Large | DM Sans | 18px | 400 | 1.7 |
| Body Default | DM Sans | 15–16px | 400 | 1.65 |
| Caption / Meta | DM Sans | 12–13px | 400 | 1.5 |
 
---
 
## Spacing System
 
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 24px;
--space-6: 32px;
--space-7: 48px;
--space-8: 64px;
--space-9: 96px;
--space-10: 128px;
```
 
---
 
## Border Radius
 
```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-xl: 32px;
--radius-pill: 999px;
```
 
---
 
## Shadows & Glass
 
```css
/* Card glass shadow */
--shadow-card: 0 8px 32px rgba(11,30,61,0.18), 0 2px 8px rgba(0,0,0,0.08);
--shadow-card-hover: 0 16px 48px rgba(232,101,10,0.15), 0 4px 16px rgba(0,0,0,0.12);
 
/* Button shadow */
--shadow-btn: 0 4px 20px rgba(232,101,10,0.35);
 
/* Glassmorphism card */
backdrop-filter: blur(16px) saturate(180%);
background: rgba(255,255,255,0.10);
border: 1px solid rgba(255,255,255,0.18);
```
 
---
 
## Component Library
 
### Primary Button (CTA)
```
Background: var(--gradient-cta) → #E8650A to #C8962E
Text: white, DM Sans, 15px, weight 500
Padding: 14px 32px
Border radius: var(--radius-pill)
Shadow: var(--shadow-btn)
Hover: scale(1.02), deeper shadow, cursor pointer
Transition: all 0.25s ease
```
 
### Secondary / Ghost Button
```
Background: transparent
Border: 1.5px solid var(--accent-primary)
Text: var(--accent-primary), DM Sans, 15px, weight 500
Padding: 13px 30px
Border radius: var(--radius-pill)
Hover: background fills with accent at 10% opacity
```
 
### Glassmorphism Card
```
Background: rgba(255,255,255,0.10)
Backdrop-filter: blur(16px) saturate(180%)
Border: 1px solid rgba(255,255,255,0.18)
Border radius: var(--radius-lg)
Shadow: var(--shadow-card)
Hover: translateY(-4px), var(--shadow-card-hover)
Transition: all 0.3s ease
Inner content padding: 24–32px
```
 
### Light Page Card (inner pages on cream bg)
```
Background: rgba(255,255,255,0.75)
Backdrop-filter: blur(8px)
Border: 1px solid var(--border-card)
Border radius: var(--radius-lg)
Shadow: 0 4px 24px rgba(26,18,7,0.08)
Hover: translateY(-3px), orange border glow
```
 
### Eyebrow Label
```
Font: DM Sans, 11px, 500, uppercase, letter-spacing 0.18em
Color: var(--accent-primary) on light bg | var(--accent-gold) on dark bg
Margin bottom: 12px
```
 
### Section Divider
```
A thin horizontal line: 1px solid var(--border-light)
OR decorative crescent/star motif SVG (inline, 24px, gold color)
```
 
---
 
## Navbar (Global — All Pages)
 
```
Layout: Sticky top, full width
Height: 68px
Background (on hero): transparent → frosted on scroll (backdrop-filter blur 20px, bg rgba(11,30,61,0.75))
Background (inner pages): rgba(245,240,232,0.92) with backdrop-filter blur 12px
Border bottom: 1px solid var(--border-glass) — appears on scroll
Logo: Left — "CSS" in Cormorant Garamond 600 italic, "KRO" in DM Sans 500, warm orange dot after
Links: DM Sans 14px 500, spaced — Daily News | Past Papers | Resources | Essay Checker
Active link: warm orange underline, 2px, animated
CTA Button: "Start Preparing" → primary button style, smaller (12px 24px padding)
Mobile: hamburger → slide-down drawer with full links
```
 
---
 
## Background Rules by Page Section
 
| Section Type | Background |
|---|---|
| Hero (Homepage only) | Full starry night image + gradient overlay |
| Dark intro section | `var(--bg-hero)` with static subtle star SVG pattern |
| Main content (all inner pages) | `var(--bg-page)` warm parchment |
| Alternating section | `var(--bg-section-alt)` |
| Feature callout | Dark navy `var(--bg-hero)` strip with light text |
| Footer | Dark `#0B1E3D` |
 
---
 
## Animation Principles
 
**Homepage:** Full animation suite — staggered text reveals, floating particles, parallax on scroll
**Inner Pages:** Static backgrounds. Micro-interactions only:
- Cards: hover lift + glow (translateY + shadow)
- Buttons: scale + shadow on hover
- Page entry: single fade-up on mount (0.4s, once)
- No looping animations on inner pages
### Standard Easing
```css
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-out: cubic-bezier(0.0, 0.0, 0.2, 1);
```
 
---
 
## Footer (Global — All Pages)
 
```
Background: #0B1E3D (dark navy)
Text color: var(--text-on-dark) at 70% opacity
Layout: 4-column grid
  Col 1: Logo + tagline + social links (Twitter/X, Instagram)
  Col 2: Platform links (Daily News, Past Papers, Resources, Essay Checker)
  Col 3: Support (About, Contact, FAQ)
  Col 4: Newsletter signup — email input + Subscribe button
Bottom bar: © 2025 CSSKRO · All Rights Reserved | Privacy · Terms
Decorative: thin gold line at very top of footer
```
 
---
 
## Imagery & Iconography
 
- **Hero image:** The cinematic starry night study scene (as provided)
- **Icons:** Use `lucide-react` throughout — thin stroke, consistent 20px size
- **Decorative motifs:** Crescent moon (✦), stars (·), subtle arabesque-inspired dividers
- **No stock photo people** — use illustrated or abstract visuals for inner pages
- **Paper/book textures** welcome as subtle CSS backgrounds (`noise`, `grain`)
---
 
## Responsiveness Breakpoints
 
```css
--bp-mobile: 480px;
--bp-tablet: 768px;
--bp-desktop: 1024px;
--bp-wide: 1280px;
 
/* Max content width */
--max-width: 1200px;
/* Section horizontal padding */
--page-pad: clamp(20px, 5vw, 80px);
```