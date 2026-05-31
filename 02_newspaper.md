# CSSKRO.COM — Page Design: Daily Newspapers (`/newspapers`)
> ⚠️ Always read `00_DESIGN_SYSTEM.md` first. All tokens, fonts, colors, and components are defined there.
 
---
 
## Page Purpose
The Daily Newspapers page is the **most-visited page** after the homepage — students come here every morning. It must feel like a curated editorial digest, not a list dump. Think *The Economist* meets a warm study desk. Fast to scan, beautiful to read.
 
---
 
## Tech Stack
- **Framework:** Next.js (App Router) + Tailwind CSS
- **Animation:** Framer Motion (page entry fade only, card hover via CSS)
- **Icons:** lucide-react
- **Data:** Assume newspaper entries come from an API or static JSON
---
 
## Page Sections (in order)
 
---
 
### 1. NAVBAR
> Refer to Navbar spec in `00_DESIGN_SYSTEM.md`
- Background: `rgba(245,240,232,0.92)` frosted — parchment tone (not dark, this is an inner page)
- "Daily News" link in navbar is **active state** — warm orange underline
---
 
### 2. PAGE HERO (Compact — NOT full viewport)
**Height:** ~280px
**Background:** Dark navy `#0B1E3D` with a faint static star SVG pattern (opacity 0.12)
 
Content — centered:
```
[Eyebrow]   TODAY'S DIGEST  —  [current date, dynamically rendered]
            gold, DM Sans 11px uppercase letter-spacing
 
[H1]        The Morning Brief
            Cormorant Garamond 600 64px, white
 
[Subtitle]  Curated from Dawn, The News & Express Tribune — filtered for CSS relevance.
            DM Sans 17px, ivory 70%, centered, max-width 520px
```
 
Decorative: thin horizontal gold line (1px, 80px wide) below eyebrow, centered
 
**Animation:** Single fade-up on mount, all elements together, 0.4s ease-out
 
---
 
### 3. FILTER / DATE NAVIGATION BAR
**Background:** `#F5F0E8` (parchment), sticky below navbar on scroll
**Height:** 56px
**Border bottom:** 1px solid `var(--border-light)`
 
Layout — horizontal, space-between:
```
Left:   [←] [→]  date navigation arrows (lucide ChevronLeft / ChevronRight)
        "Mon, 2 June 2025"  — DM Sans 14px 500, dark
 
Center: Paper filter pills:
        [All] [Dawn] [The News] [Express Tribune]
        Active pill: orange bg, white text
        Inactive: ghost, dark border, hover → orange
 
Right:  [Search icon button] — opens inline search input on click
        [Filter icon] — opens dropdown: by subject tag
```
 
---
 
### 4. SUBJECT TAG FILTER ROW
**Below the nav bar, on parchment bg**
**Horizontally scrollable row with fade edges on mobile**
 
Tags (multi-select, toggle active):
`All Topics` · `Economy` · `Foreign Policy` · `Governance` · `Science & Tech` · `Environment` · `Society` · `Security` · `Pakistan Affairs` · `International`
 
Tag style:
- Inactive: `background: rgba(26,18,7,0.06)`, border `var(--border-light)`, DM Sans 13px
- Active: orange bg, white text, slight shadow
- Transition: 0.2s background
---
 
### 5. FEATURED ARTICLE (Top Pick of the Day)
**Background: parchment, full width**
 
A larger featured card — horizontal layout on desktop:
 
```
[Left — 45%]
  Tag pill: "FEATURED · DAWN"  — orange bg, white, DM Sans 11px
  H2: Article headline — Cormorant Garamond 36px, dark, 2-line max
  Body excerpt: 3 lines, DM Sans 16px, muted brown
  Meta row: 📅 Date · 🏷 Topic tags · ⏱ 4 min read
  Button: "Read Full Article →" — primary orange pill
 
[Right — 55%]
  Newspaper name badge (top-left corner of image area)
  Abstract editorial illustration or gradient placeholder
  (Use a warm orange → gold gradient rectangle with newspaper name in large serif italic as placeholder)
```
 
Card style: Light Page Card — white 75% bg, gold border, strong hover lift
 
---
 
### 6. ARTICLES GRID
**Background: parchment `#F5F0E8`**
 
#### Layout
- **Desktop:** 3-column grid
- **Tablet:** 2-column grid
- **Mobile:** 1-column
#### Article Card
Each card is a **Light Page Card**:
 
```
[Top bar]     Newspaper badge (pill): "DAWN" / "THE NEWS" / "EXPRESS TRIBUNE"
              Color-coded:
                Dawn → deep teal pill
                The News → deep burgundy pill
                Express Tribune → deep blue pill
 
[Headline]    Cormorant Garamond 22px 500, dark, 2-line clamp
 
[Excerpt]     DM Sans 14px, muted brown, 3-line clamp
 
[Tags]        2–3 topic tag pills (small, ghost style)
 
[Footer row]  Left: 📅 date, DM Sans 12px muted
              Right: "Read →" orange text link, arrow icon
```
 
Hover: card lifts `translateY(-4px)`, gold border subtly glows, shadow deepens
 
**Load more:** "Load More Articles" — ghost orange button, centered below grid
Show 9 cards initially, load 6 more on click.
 
---
 
### 7. ARCHIVE CALENDAR STRIP
**Background: `#EDE6D6`**
 
A horizontal scrollable row of date pills for the past 30 days:
 
```
[Mon 2]  [Sun 1]  [Sat 31]  [Fri 30]  ...
```
 
- Each pill: DM Sans 12px, date number large (18px), day name small above
- Today: orange bg, white text
- Days with articles: white bg, dark text, subtle border
- Days with no articles: muted, 40% opacity
- Clicking navigates to that day's articles
Label above: `BROWSE BY DATE` — eyebrow style
 
---
 
### 8. CSS RELEVANCE SIDEBAR CALLOUT
**Inline — spans full width, parchment bg**
 
A horizontal banner card (not a section — embedded between article rows):
 
```
[Left icon]  Lightbulb icon, orange, 36px
 
[Text]       "CSS Relevance Filter"
             H3: Cormorant Garamond 24px
             Body: "Each article is tagged with its CSS relevance score.
             Look for the orange star ★ on cards — those are high-priority reads."
 
[Right]      Toggle: "Show CSS-priority articles only"
             Toggle switch component, orange when active
```
 
Card style: soft orange tint bg `rgba(232,101,10,0.06)`, orange left border 3px
 
---
 
### 9. NEWSLETTER SIGNUP STRIP
**Background: dark navy `#0B1E3D`**
 
Full-width dark strip, ~160px tall:
 
```
[Left]   "Get The Morning Brief in Your Inbox"
         H3: Cormorant Garamond 32px, white
         Body: DM Sans 14px, ivory 70% — "Daily at 7am Pakistan time."
 
[Right]  Email input + Subscribe button
         Input: dark glass bg, white text, gold border on focus
         Button: orange primary pill — "Subscribe"
```
 
---
 
### 10. FOOTER
> Refer to Footer spec in `00_DESIGN_SYSTEM.md`
 
---
 
## Empty States
- **No articles for selected date:** Centered illustration (simple SVG — closed book), "No articles for this date yet. Check back soon." — DM Sans 16px muted, with "← Browse Yesterday" link
- **Search no results:** "No articles found for '[query]'" with tag suggestions
---
 
## Mobile Considerations
- Filter bar: horizontally scrollable, no wrapping
- Subject tags: horizontal scroll with gradient fade on right
- Featured article: stacked (image top, text bottom)
- Articles grid: single column
- Archive calendar: horizontal scroll
---
 
## File/Component Structure Suggestion
```
app/
  newspapers/
    page.tsx
components/
  newspapers/
    PageHero.tsx
    FilterNavBar.tsx
    SubjectTagFilter.tsx
    FeaturedArticle.tsx
    ArticleCard.tsx
    ArticlesGrid.tsx
    ArchiveCalendar.tsx
    RelevanceCallout.tsx
    NewsletterStrip.tsx
```
 
---
