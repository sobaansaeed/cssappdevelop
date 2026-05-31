# CSSKRO.COM — Page Design: Homepage (`/`)
> ⚠️ Always read `00_DESIGN_SYSTEM.md` first. All tokens, fonts, colors, and components are defined there.
 
---
 
## Page Purpose
The homepage is the cinematic entry point. It must immediately convey **prestige, ambition, and scholarly depth**. A student landing here should feel like they've found *the* definitive CSS exam prep destination. First impression = everything.
 
---
 
## Tech Stack
- **Framework:** Next.js (App Router) + Tailwind CSS + Framer Motion
- **Fonts:** Cormorant Garamond (display) + DM Sans (body) via Google Fonts
- **Icons:** lucide-react
- **Animation:** Framer Motion for scroll-triggered reveals + hero animations
---
 
## Page Sections (in order)
 
 
### 3. STATS BAR
**Full-width strip, dark navy `#0B1E3D`, ~100px tall**
 
Four stats, horizontally centered with dividers:
```
10,000+          2,500+           5 Years          98%
Students         Past Papers      of Excellence    Success Rate
```
- Numbers: Cormorant Garamond 600 36px white
- Labels: DM Sans 12px uppercase letter-spacing, rgba(240,234,214,0.6)
- Dividers: 1px vertical lines, rgba(200,150,46,0.3)
- **Animation:** Count-up animation triggered when section enters viewport (Framer Motion useInView)
---
 
### 4. FEATURES SECTION
**Background: warm parchment `#F5F0E8`**
 
#### Eyebrow
`EVERYTHING YOU NEED` — accent orange, centered
 
#### Heading
`Your Complete CSS Arsenal` — Cormorant Garamond 52px, dark, centered
 
#### Cards Grid — 2×2 on desktop, 1 col mobile
Each card is a **Light Page Card** (see design system):
 
| Card | Icon | Title | Description |
|---|---|---|---|
| 1 | `Newspaper` | Daily Newspapers | Curated editorials from Dawn, The News, Express Tribune — summarized for CSS relevance |
| 2 | `FileText` | Past Papers | 20+ years of CSS past papers, organized by year and subject |
| 3 | `BookOpen` | Study Resources | Topic-wise notes, recommended books, syllabus breakdowns |
| 4 | `PenTool` | Essay Checker | AI-powered feedback on your essays — score, structure, and improvement tips |
 
Card structure:
```
[Icon]  — 40px, warm orange, inside a soft orange circle bg (rgba(232,101,10,0.1))
[H3]    — Cormorant Garamond 26px, dark
[Body]  — DM Sans 15px, muted brown
[Link]  — "Explore →" in orange, DM Sans 14px 500, underline on hover
```
 
**Animation:** Cards stagger-fade in on scroll, 0.1s between each
 
---
 
### 5. DAILY NEWSPAPER PREVIEW
**Background: alternating `#EDE6D6`**
 
Split layout — 50/50 on desktop:
 
**Left side:**
- Eyebrow: `DAILY UPDATES`
- H2: `Stay Current, Stay Ahead` — Cormorant Garamond 44px
- Body: "Fresh newspaper summaries every morning — Dawn, Express Tribune, The News. Highlighted for CSS exam relevance so you never miss what matters."
- CTA: "Read Today's Papers →" — primary orange pill button
- Secondary: "View Archive" — ghost button
**Right side:**
- Stack of 3 newspaper preview cards (glassmorphism, dark navy bg for contrast)
- Each card shows: paper logo/name, date, headline, 2-line excerpt, "Read" link
- Cards slightly overlapping/staggered (rotate -1deg, 0deg, +1deg) for editorial feel
- Subtle entrance animation from right on scroll
---
 
### 6. PAST PAPERS SHOWCASE
**Background: dark navy `#0B1E3D`** (contrast section)
 
Full-width dark section with light text:
 
**Centered header:**
- Eyebrow (gold): `COMPREHENSIVE ARCHIVE`
- H2 (white): `Every Paper. Every Year.`
- Body (ivory 75%): "Access the complete CSS past papers library — from 2000 to present. Filter by subject, year, or topic."
**Subject Pills Row** (horizontally scrollable):
`English Essay` · `Current Affairs` · `Pakistan Affairs` · `Islamiat` · `General Science` · `Political Science` · `History`
- Pill style: dark glass bg, gold border, gold text, hover fills orange
**Year Grid Preview:**
- Show 6 year cards in 3×2 grid (glassmorphism dark cards)
- Each: Year (large Cormorant), paper count, subjects list, "Download" button
- Example years: 2024, 2023, 2022, 2021, 2020, 2019
**CTA:** "Browse Full Archive" — ghost button (white border/text), centered below grid
 
---
 
### 7. ESSAY CHECKER CTA SECTION
**Background: warm parchment with subtle orange gradient wash on right side**
 
Asymmetric layout — text left, visual right:
 
**Left (60%):**
- Eyebrow: `AI-POWERED`
- H2: `Get Your Essays Scored Instantly`
- Body: "Submit your CSS essay and receive detailed AI feedback — overall score, argument strength, structure analysis, CSS examiner perspective, and specific improvement suggestions."
- Feature list (DM Sans 14px, icon + text):
  - ✦ Overall score out of 100
  - ✦ Paragraph-by-paragraph feedback
  - ✦ Language & grammar check
  - ✦ CSS-specific examiner notes
- CTA: "Try Essay Checker" — primary orange button
**Right (40%):**
- Mockup card showing sample essay feedback UI
- Card: glassmorphism, shows score badge (e.g., "74/100"), 3 feedback lines, overall grade pill
- Floating decorative: small book/pen icons in warm orange, scattered lightly
---
 
### 8. TESTIMONIALS
**Background: `#F5F0E8`**
 
#### Header (centered)
- Eyebrow: `STUDENT STORIES`
- H2: `From Aspirants to Officers`
#### Testimonial Cards — horizontal scroll on mobile, 3-col grid desktop
Each card (Light Page Card style):
```
[Quote icon]  — Cormorant Garamond italic, large soft gold "
[Quote text]  — DM Sans 16px, dark brown, italic
[Student]     — Name (DM Sans 600), Batch/Result (DM Sans 13px muted)
[Result badge]— small pill: "CSS 2023 — Cleared" in orange
```
 
---
 
### 9. FINAL CTA SECTION
**Background: full-bleed dark navy `#0B1E3D`**
 
Center-aligned, generous padding (120px vertical):
 
- Small crescent/star decorative SVG above
- H2 (white, Cormorant 56px): `Your CSS Journey Starts Tonight`
- Body (ivory 70%): "Join thousands of aspirants preparing smarter, not harder."
- Two buttons side by side:
  - Primary: "Start Preparing" — orange
  - Secondary: "Explore Resources" — ghost white
Subtle: faint star pattern in background (static SVG, 15% opacity)
 
---
 
### 10. FOOTER
> Refer to Footer spec in `00_DESIGN_SYSTEM.md`
 
---
 
## Mobile Considerations
- Hero text: H1 reduces to 48px, subheading to 16px
- Stats bar: 2×2 grid instead of 4-in-row
- Features: single column cards
- Newspaper preview: stacked, single column
- Past papers subject pills: horizontal scroll with fade edges
- All section padding: 48px vertical (vs 96px desktop)
---
 
## File/Component Structure Suggestion
```
app/
  page.tsx                  ← Homepage
components/
  layout/
    Navbar.tsx
    Footer.tsx
  home/
    HeroSection.tsx
    StatsBar.tsx
    FeaturesSection.tsx
    NewspaperPreview.tsx
    PastPapersShowcase.tsx
    EssayCheckerCTA.tsx
    Testimonials.tsx
    FinalCTA.tsx
  ui/
    Button.tsx
    Card.tsx
    EyebrowLabel.tsx
    GlassCard.tsx
```
 
---
 
## IDE Prompt
 
> Copy the text below as your prompt to the IDE (Cursor / Windsurf / GitHub Copilot Chat):
 
---
 
**PROMPT:**
 
```
Build the full Homepage for csskro.com using Next.js (App Router) + Tailwind CSS + Framer Motion.
 
Read the design spec from 00_DESIGN_SYSTEM.md and 01_HOME.md in full before writing any code.
 
Requirements:
- Implement ALL 10 sections listed in 01_HOME.md in order
- Use Cormorant Garamond + DM Sans (Google Fonts via next/font or link tag)
- Use Framer Motion for: hero staggered entrance, scroll-triggered reveals, count-up stats
- Animated starfield on hero (CSS keyframes, ~120 star dots, twinkle effect)
- Navbar: transparent on load, frosted glass on scroll (use useScroll or scroll event)
- All color tokens from 00_DESIGN_SYSTEM.md as Tailwind CSS variables or inline styles
- Glassmorphism cards: backdrop-filter blur(16px), rgba white background, gold border
- Primary CTA button: orange-to-gold gradient, pill shape, glow shadow on hover
- All sections fully responsive — mobile breakpoints as specified
- No placeholder gray boxes — use realistic copy as given in the spec
- lucide-react for all icons
- Component structure as suggested in the spec
 
Do not simplify or cut sections. Build the complete homepage.
```