# CSSKRO.COM — Page Design: Past Papers (`/past-papers`)
> ⚠️ Always read `00_DESIGN_SYSTEM.md` first. All tokens, fonts, colors, and components are defined there.
 
---
 
## Page Purpose
The Past Papers page is the **library**. It must feel organized, powerful, and exhaustive — a scholar's archive. Students need to find papers fast, filter by subject and year, and download instantly. Think *prestigious university archive* meets *clean digital library*.
 
---
 
## Tech Stack
- **Framework:** Next.js (App Router) + Tailwind CSS
- **Animation:** Framer Motion (page entry only), CSS transitions for interactions
- **Icons:** lucide-react
---
 
## Page Sections (in order)
 
---
 
### 1. NAVBAR
> Refer to Navbar spec in `00_DESIGN_SYSTEM.md`
- Inner page style: parchment frosted glass
- "Past Papers" link: active orange underline
---
 
### 2. PAGE HERO (Compact)
**Height:** ~260px
**Background:** Dark navy `#0B1E3D`, static faint star SVG overlay (opacity 0.10)
 
Content — centered:
```
[Eyebrow]    CSS EXAM ARCHIVE  —  gold, uppercase, letter-spacing
[H1]         Every Paper. Every Year.   —  Cormorant Garamond 600 62px, white
[Subtitle]   25+ years of CSS past papers — organized, searchable, free to download.
             DM Sans 17px, ivory 70%, centered, max-width 480px
[Stat pills] [25+ Years] [120+ Papers] [15 Subjects]
             Three small glass pills, gold border, ivory text, inline row
```
 
**Animation:** Page-entry fade-up, 0.4s, once
 
---
 
### 3. SEARCH & FILTER PANEL
**Background:** `#F5F0E8` parchment
**Sticky below navbar on scroll**
 
A powerful filter bar in a rounded card:
 
```
Row 1 (main filters):
  [Search input]          "Search papers, subjects, topics..."
                          Full-width or 50% — icon left (Search), clear X right
                          Border: var(--border-card), focus → orange border glow
 
  [Year range dropdowns]  "From: [2000 ▼]"  "To: [2024 ▼]"
                          Select components, DM Sans 14px
 
  [Subject dropdown]      "All Subjects ▼"
                          Multi-select dropdown
 
  [Sort]                  "Sort: Newest First ▼"
 
Row 2 (quick subject pills — horizontally scrollable):
  [All] [English Essay] [English Précis] [Current Affairs] [Pakistan Affairs]
  [Islamiat] [General Science] [Political Science] [History of Pakistan]
  [Geography] [Economics] [Sociology] [Psychology] [International Relations]
  
  Active: orange fill
  Inactive: ghost
```
 
Filter panel card: white 90% bg, border `var(--border-card)`, radius `var(--radius-lg)`, padding 20px, shadow subtle
 
---
 
### 4. RESULTS SUMMARY BAR
**Below filter panel, parchment bg**
 
Simple inline bar:
```
"Showing 48 papers"  ·  "Filtered by: All Subjects · 2000–2024"  ·  [Clear Filters ×]
DM Sans 13px, muted brown
Clear Filters: orange text, hover underline
```
 
---
 
### 5. PAPERS GRID — YEAR VIEW (Default)
**Background: `#F5F0E8` parchment**
 
Default view groups papers by **year**, descending (2024 first).
 
#### Year Group Header
```
[Year]  2024  —  Cormorant Garamond 600 40px, dark
[Subtext]  "14 papers available"  —  DM Sans 13px muted
[Divider line]  1px gold-tinted
```
 
#### Papers Grid within each year group
- **Desktop:** 4-column grid
- **Tablet:** 3-column
- **Mobile:** 2-column
#### Paper Card (Light Page Card style)
```
[Top]    Subject name badge pill
         Color-coded by category:
           Language papers → warm olive green
           Affairs papers → warm rust
           Science/Tech → steel blue
           Social sciences → warm purple
 
[Main]   Subject name — Cormorant Garamond 20px, dark, 2-line clamp
         "CSS 2024 · Paper II"  —  DM Sans 12px muted
 
[Meta]   [📄 PDF]  ·  [2.3 MB]  ·  [Marks: 100]
         DM Sans 11px, muted, icon + text pairs
 
[Footer] [Download ↓]  — primary small orange pill button, full-width
         [Preview 👁]  — ghost small button
```
 
Hover: lift + orange border glow on card
 
---
 
### 6. VIEW TOGGLE — Year vs Subject
**Above the grid, right-aligned**
 
```
[By Year] [By Subject]  —  toggle buttons
Active: orange bg, white text, pill
Inactive: ghost
```
 
#### Subject View (alternate layout):
Groups papers by **subject** instead of year.
 
Subject group header:
```
[Icon]  [Subject Name]  —  Cormorant Garamond 28px
[Count] "22 papers · 2003–2024"  —  DM Sans 13px muted
[Divider]
```
 
Cards within: same Paper Card design, 4-col grid
 
---
 
### 7. SUBJECT SPOTLIGHT SECTION
**Background: `#EDE6D6`**
 
Highlight a few popular subject paths as navigable tiles:
 
#### Section Header
- Eyebrow: `POPULAR SUBJECTS`
- H2: `Dive Deep Into Any Subject` — Cormorant Garamond 44px
#### Subject Tiles Grid — 3×2 on desktop
Each tile (larger card, ~200px tall):
```
[Icon]    lucide icon, 32px, orange
[Name]    Subject name — Cormorant Garamond 24px
[Count]   "22 papers"  —  DM Sans 13px muted
[Years]   "2003–2024"  —  DM Sans 12px muted
[Arrow]   Bottom right: "→" orange
```
 
Card: Light Page Card, hover → orange left border appears (3px), lift
 
Subjects: English Essay · English Précis · Current Affairs · Pakistan Affairs · Islamiat · General Science
 
---
 
### 8. DOWNLOAD INSTRUCTIONS CALLOUT
**Inline between sections — full width, parchment bg**
 
A horizontal info banner:
```
[Icon]   Download icon, orange circle bg, 40px
[Text]   H4: "How to Download"  —  Cormorant Garamond 22px
         Body: "Click the Download button on any paper. PDFs open in a new tab.
         No login required. All papers are free."
         DM Sans 14px
```
 
Card: soft orange tint bg `rgba(232,101,10,0.05)`, orange left border 3px, radius `var(--radius-md)`
 
---
 
### 9. PAPER PREVIEW MODAL
**Triggered by "Preview 👁" button on any paper card**
 
Full-screen modal overlay:
```
[Backdrop]    rgba(11,30,61,0.85), blur(8px) behind modal
 
[Modal card]  White bg, radius var(--radius-xl), max-width 800px, max-height 90vh
              Shadow: heavy dark shadow
 
[Header]      [Subject name] · [Year] · [Paper number]
              [Close ×] button top-right
 
[Preview]     PDF iframe or image preview of first page
              Height: 60vh, width: 100%, border radius
 
[Footer]      [Download Full Paper ↓] — primary orange button, full-width
              "Free to download. No account needed."
```
 
Open/close: Framer Motion scale + opacity animation
 
---
 
### 10. CTA STRIP — Essay Checker
**Background: dark navy `#0B1E3D`**
 
Cross-sell to Essay Checker:
```
[Left]   Eyebrow (gold): NEXT STEP
         H3 (white): "Practiced Enough? Test Your Writing."
         Body (ivory 70%): "Submit an essay on any past paper topic and get
         instant AI-powered feedback."
 
[Right]  "Try Essay Checker →" — primary orange button
         Ghost: "Browse Resources" — white ghost button
```
 
---
 
### 11. FOOTER
> Refer to Footer spec in `00_DESIGN_SYSTEM.md`
 
---
 
## Empty States
- **No papers found for filters:** Book-stack SVG illustration, "No papers match your filters." + "Reset Filters" orange button
- **Subject with no papers yet:** "Coming soon — papers for this subject are being uploaded."
---
 
## Mobile Considerations
- Search/filter: stacked vertically, full-width inputs
- Subject pills: horizontal scroll
- Papers grid: 2-column on mobile
- Paper cards: slightly more compact (reduce padding)
- Year group header: reduced font size (28px)
- Subject spotlight: 2-col grid on mobile, 1-col on very small
---
 
## File/Component Structure Suggestion
```
app/
  past-papers/
    page.tsx
components/
  past-papers/
    PageHero.tsx
    FilterPanel.tsx
    ResultsSummaryBar.tsx
    PapersGrid.tsx
    YearGroupHeader.tsx
    PaperCard.tsx
    ViewToggle.tsx
    SubjectSpotlight.tsx
    DownloadCallout.tsx
    PreviewModal.tsx
    EssayCTAStrip.tsx
```
 
---