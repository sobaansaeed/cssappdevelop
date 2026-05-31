# CSSKRO.COM — Page Design: Resources (`/resources`)
> ⚠️ Always read `00_DESIGN_SYSTEM.md` first. All tokens, fonts, colors, and components are defined there.
 
---
 
## Page Purpose
The Resources page is the **study companion** — a curated library of books, notes, syllabus breakdowns, and topic guides. It should feel like walking into a warm, well-stocked study room: organized by subject, easy to navigate, every item clearly labeled. Think *curated academic bookshelf*.
 
---
 
## Tech Stack
- **Framework:** Next.js (App Router) + Tailwind CSS
- **Animation:** Framer Motion (page entry only), CSS transitions
- **Icons:** lucide-react
---
 
## Page Sections (in order)
 
---
 
### 1. NAVBAR
> Refer to Navbar spec in `00_DESIGN_SYSTEM.md`
- Inner page style: parchment frosted glass
- "Resources" link: active orange underline
---
 
### 2. PAGE HERO (Compact)
**Height:** ~270px
**Background:** Dark navy `#0B1E3D`, subtle static star SVG overlay (opacity 0.10)
 
Content — centered:
```
[Eyebrow]   STUDY MATERIAL  —  gold, uppercase letter-spacing
[H1]        Everything You Need to Prepare  —  Cormorant Garamond 600 58px, white
[Subtitle]  Recommended books, topic notes, syllabus guides, and curated study paths
            — all in one place.
            DM Sans 16px, ivory 70%, max-width 500px, centered
```
 
**Animation:** Page-entry fade-up, 0.4s, once
 
---
 
### 3. RESOURCE CATEGORY TABS
**Background: `#F5F0E8` parchment, sticky on scroll**
**Height:** 56px
 
Horizontal tabs (not pills — underline style):
```
[All Resources]  [Books]  [Topic Notes]  [Syllabus]  [Study Plans]  [Videos]
```
 
Tab style:
- Inactive: DM Sans 14px 500, dark brown, no underline
- Active: DM Sans 14px 600, dark, 2px orange underline animated (slides in)
- Hover: orange text
- Transition: 0.2s
Below tabs: thin 1px `var(--border-light)` line
 
---
 
### 4. HERO RESOURCE — "START HERE" GUIDE
**Background: parchment**
 
A prominent top card — the recommended starting resource:
 
```
[Tag pill]    "RECOMMENDED START" — orange bg, white, DM Sans 11px uppercase
 
[Layout — horizontal, 50/50]
 
Left:
  H2: "The Complete CSS Preparation Roadmap"
      Cormorant Garamond 38px, dark
  Body: "Not sure where to begin? This structured guide walks you through
  the full CSS syllabus, recommended reading order, and monthly study plan
  from zero to exam-ready."
  [Features list]:
    ✦ Full syllabus breakdown
    ✦ Month-by-month study plan
    ✦ Book recommendations per subject
    ✦ Revision strategy
  [CTA Button]  "Download Free Guide" — primary orange pill
  [Meta]  📄 PDF · 24 pages · Updated 2025
 
Right:
  Decorative: stylized book cover mockup card
  Warm orange-to-gold gradient background with "CSS Prep Roadmap 2025"
  in Cormorant Garamond italic, elegant layout
  Bottom: "Free Download" badge — small orange pill
```
 
Card: Light Page Card, extra padding (40px), stronger shadow
 
---
 
### 5. SUBJECT RESOURCE SECTIONS
**Background: alternates between `#F5F0E8` and `#EDE6D6` per subject**
 
Each subject gets its own sub-section. Repeat for all major subjects.
 
**Subjects covered:**
1. English Essay & Précis
2. Current Affairs
3. Pakistan Affairs
4. Islamiat
5. General Science & Ability
6. Optional Subjects (Political Science, History, Economics, etc.)
#### Subject Section Layout:
 
**Section Header (full-width):**
```
[Left]  [Subject icon — lucide, 28px, orange circle bg]
        [Subject name — Cormorant Garamond 32px, dark]
        [Subtitle — DM Sans 14px muted — "X resources available"]
 
[Right] "View All →" — orange text link
```
 
**Resource Cards Grid — 3-col desktop, 2-col tablet, 1-col mobile**
 
#### Resource Card (Light Page Card):
```
[Top badge]   Resource type pill:
              "BOOK" → deep teal
              "NOTES" → warm rust
              "SYLLABUS" → deep navy
              "GUIDE" → olive green
              "VIDEO" → purple
              All: DM Sans 10px uppercase, white text
 
[Title]       Cormorant Garamond 22px, dark, 2-line clamp
[Author/Source] DM Sans 13px, muted brown
[Description] DM Sans 13px, muted, 2-line clamp
 
[Meta row]    [Format icon] PDF/Video/Link · [Size] · [CSS Relevance: ★★★★☆]
 
[Footer]      [Access Resource →] — orange text link with arrow
              OR [Download ↓] — small orange button
              OR [Watch →] — small button if video
```
 
Hover: card lifts, orange left border (3px) slides in, shadow deepens
 
---
 
### 6. BOOKS SPOTLIGHT
**Background: dark navy `#0B1E3D`** (contrast section)
 
Recommended books in a horizontal scroll shelf:
 
#### Header (centered, white text):
- Eyebrow (gold): `ESSENTIAL READING`
- H2 (white): `The CSS Scholar's Bookshelf`
- Body (ivory 70%): "Personally vetted books for each CSS subject — ranked by exam relevance."
#### Book Shelf Row (horizontal scroll)
Each book card (glassmorphism dark card):
```
[Book spine visual]  Tall narrow rectangle, warm gradient (unique per book)
                     Book title vertical text OR small cover mockup (60px wide × 180px tall)
 
[Below spine:]
  Book title — Cormorant Garamond 16px, ivory
  Author — DM Sans 12px, muted ivory
  Subject tag — small pill, gold border
  Rating — ★★★★☆ in orange
  "View Details →" — orange text, 12px
```
 
Scroll behavior: smooth horizontal scroll, show 4.5 cards (hint of 5th to indicate scroll)
 
---
 
### 7. SYLLABUS SECTION
**Background: `#F5F0E8`**
 
#### Header
- Eyebrow: `OFFICIAL SYLLABUS`
- H2: `Know What's Being Tested` — Cormorant Garamond 44px
#### Syllabus Cards — 2-col grid on desktop
Each card:
```
[Icon]       FileText lucide icon, orange, in circle bg
[Subject]    Cormorant Garamond 24px
[Points]     3 bullet points: key topics covered — DM Sans 13px muted
[Footer]     [View Full Syllabus] — ghost orange button  ·  [Download PDF] — link
```
 
Card: Light Page Card
 
---
 
### 8. STUDY PLAN SECTION
**Background: `#EDE6D6`**
 
#### Header
- Eyebrow: `STRUCTURED PREP`
- H2: `Study Plans Built for CSS` — Cormorant Garamond 44px
Three plan cards in a 3-col row:
 
| Plan | Duration | For |
|---|---|---|
| Quick Revision | 30 Days | Students retaking the exam |
| Standard Prep | 6 Months | First-time aspirants |
| Intensive | 1 Year | Starting from scratch |
 
Each plan card:
```
[Top bar]    Colored accent top strip (teal / orange / gold)
[Icon]       Calendar or Clock icon, colored, 32px
[Title]      Plan name — Cormorant Garamond 28px
[Duration]   Large number — Cormorant Garamond 600 48px, accent color
             "Days / Months" — DM Sans 14px muted
[Includes]   3-4 bullet points: DM Sans 13px
[CTA]        "Download Plan PDF" — small ghost button
```
 
Card: Light Page Card, top accent strip, hover → lift + accent shadow
 
---
 
### 9. VIDEO RESOURCES ROW
**Background: parchment**
 
#### Header
- Eyebrow: `VIDEO GUIDES`
- H2: `Watch & Learn` — Cormorant Garamond 40px
Horizontal scroll row of video cards (3 visible on desktop):
 
Each video card:
```
[Thumbnail]   Gradient placeholder, 16:9 ratio, play button overlay (circle, orange fill)
[Title]       Cormorant Garamond 20px, dark, 2-line clamp
[Channel]     DM Sans 12px muted
[Duration]    DM Sans 12px · orange text
[Tag]         Subject pill
```
 
---
 
### 10. CONTRIBUTE CALLOUT
**Background: dark navy `#0B1E3D`**
 
Full-width strip, horizontal layout:
```
[Left]   Eyebrow (gold): COMMUNITY
         H3 (white): "Have a Resource to Share?"
         Body (ivory 70%): "Help fellow CSS aspirants by contributing notes,
         summaries, or guides. All contributors are credited."
 
[Right]  "Submit a Resource" — ghost white button
         "Learn More →" — orange text link
```
 
---
 
### 11. FOOTER
> Refer to Footer spec in `00_DESIGN_SYSTEM.md`
 
---
 
## Empty States
- **Tab with no resources yet:** Stack of books SVG, "Resources for this category coming soon." — muted text
- **Search no results:** "No resources match your search." + "Browse All" link
---
 
## Mobile Considerations
- Category tabs: horizontal scroll, no wrapping
- Hero resource: stacked (text top, visual bottom)
- Subject resource grids: single column
- Book shelf: horizontal scroll, 1.5 books visible
- Syllabus cards: single column
- Study plan cards: vertical stack
- Video row: horizontal scroll
---
 
## File/Component Structure Suggestion
```
app/
  resources/
    page.tsx
components/
  resources/
    PageHero.tsx
    CategoryTabs.tsx
    HeroResource.tsx
    SubjectSection.tsx
    ResourceCard.tsx
    BooksSpotlight.tsx
    SyllabusSection.tsx
    StudyPlanCards.tsx
    VideoRow.tsx
    ContributeCallout.tsx
```
