# CSSKRO.COM — Page Design: The CSS Blueprint (`/syllabus`)
> Page name suggestion: **"The CSS Blueprint"** — evokes a master plan, architectural precision, and scholarly authority. Fits the vibe far better than "Syllabus."
> Alternative names: "The Roadmap" · "Know the Battlefield" · "Your CSS Map"
> ⚠️ Always read `00_DESIGN_SYSTEM.md` first. All tokens, fonts, colors, and components are defined there.
 
---
 
## Page Purpose
This page is the **authoritative reference** — the first page a new CSS aspirant should visit. It must inspire confidence ("I know exactly what to study") while making an overwhelming exam feel navigable. Think *illuminated manuscript meets modern dashboard*. Every subject must feel conquerable.
 
---
 
## Tech Stack
- **Framework:** Next.js (App Router) + Tailwind CSS
- **Animation:** Framer Motion (page entry + scroll reveals), CSS transitions
- **Icons:** lucide-react
---
 
## Page Sections (in order)
 
---
 
### 1. NAVBAR
> Refer to Navbar spec in `00_DESIGN_SYSTEM.md`
- Inner page: parchment frosted glass
- No active link highlighted (this page may not be in main nav — add "Blueprint" or "Syllabus" link between Resources and Essay Checker)
---
 
### 2. PAGE HERO (Medium — slightly taller than other inner pages)
**Height:** ~340px
**Background:** Dark navy `#0B1E3D` with static star SVG overlay (opacity 0.12)
 
Content — centered:
```
[Eyebrow]    CSS 2025 SYLLABUS  —  gold, uppercase letter-spacing
 
[H1]         The CSS Blueprint
             Cormorant Garamond 600 68px, white
             "Blueprint" in warm orange — color split on one word
 
[Subtitle]   Every compulsory and optional subject — topics, scope,
             and what the examiners actually want.
             DM Sans 17px, ivory 70%, max-width 520px, centered
 
[Stat pills row]   [6 Compulsory Papers]  [Optional: Choose 4 of 12]  [1200 Total Marks]
                   Glass pills, gold border, ivory text, inline centered row
```
 
Decorative: a faint horizontal architectural/grid line pattern behind the text (SVG, very subtle, 5% opacity) — like a blueprint grid
 
**Animation:** Page-entry fade-up, 0.4s, staggered (eyebrow → h1 → subtitle → pills)
 
---
 
### 3. EXAM OVERVIEW STRIP
**Background:** warm orange gradient `linear-gradient(135deg, #E8650A 0%, #C8962E 100%)`
**Height:** ~100px
 
Four key facts, horizontally laid out:
```
Written Exam          Twice a Year           Age: 21–30             FPSC Conducted
Competitive           Feb + Oct/Nov          Relaxations apply      Federal Body
```
- Label (top): DM Sans 11px uppercase, white 70%
- Value (bottom): Cormorant Garamond 600 24px, white
- Dividers: 1px white 25% opacity
- Full-width, no card — just a bold strip
---
 
### 4. COMPULSORY PAPERS SECTION
**Background:** `#F5F0E8` parchment
 
#### Section Header
```
[Eyebrow]   COMPULSORY SUBJECTS
[H2]        Papers Every Candidate Must Sit
            Cormorant Garamond 44px, dark
 
[Subtext]   These 6 papers are mandatory for all CSS candidates.
            Total marks: 600  ·  DM Sans 15px muted
```
 
#### Papers — Vertical accordion list (NOT a grid)
Each paper is a large expandable row. Closed state shows key info; open state reveals full topic breakdown.
 
**Closed State:**
```
┌──────────────────────────────────────────────────────────────────────┐
│  [Number]  [Paper Name]                    [Marks]  [Status]  [▼]   │
│  01        English Essay                    100      Required        │
└──────────────────────────────────────────────────────────────────────┘
```
- Number: Cormorant Garamond 600 32px, orange 30% opacity, left
- Paper name: Cormorant Garamond 500 22px, dark
- Marks badge: small pill, orange bg, white text, DM Sans 12px
- Status: "Required" pill, dark navy bg, ivory text
- Chevron: rotates 180° on open, orange
**Open/Expanded State:**
Slides open smoothly (Framer Motion AnimatePresence height animation)
 
```
[Topic grid — 2 col]
  Each topic:  ·  Topic name  —  DM Sans 14px dark
               Scope note (italic muted) — DM Sans 13px
               Optional: CSS Importance tag  ★★★★☆  (star rating)
 
[Resource shortcut row at bottom of expanded card]
  [📄 Past Papers →]  [📚 Notes →]  [✍️ Practice Essay →]
  Small ghost orange buttons linking to relevant page sections
```
 
Background of open card: very light orange tint `rgba(232,101,10,0.04)`
Left border: 3px orange solid (only when open)
 
**All 6 Compulsory Papers:**
 
| # | Paper | Marks | Key Topics |
|---|---|---|---|
| 01 | English Essay | 100 | Essay writing, argumentation, structure, CSS-relevant topics |
| 02 | English Précis & Composition | 100 | Précis writing, grammar, comprehension, translation |
| 03 | General Science & Ability | 100 | Basic sciences, logical reasoning, mental ability, everyday science |
| 04 | Current Affairs | 100 | National/international events, foreign policy, economy, governance |
| 05 | Pakistan Affairs | 100 | History, ideology, constitution, foreign policy, socio-economic issues |
| 06 | Islamiat | 100 | Islamic principles, history, jurisprudence (non-Muslims: comparative religion) |
 
---
 
### 5. OPTIONAL SUBJECTS SECTION
**Background:** `#EDE6D6`
 
#### Section Header
```
[Eyebrow]   OPTIONAL SUBJECTS
[H2]        Choose Your Strengths
            Cormorant Garamond 44px, dark
 
[Subtext]   Select 4 optional subjects from the list below.
            Each paper carries 100 marks. Total: 400 marks.
            DM Sans 15px, muted
```
 
#### Subject Selection Explainer Card
A highlighted info card (orange left border, light orange bg):
```
[Icon]   Info circle, orange
[Text]   "Candidates must choose 4 optional subjects.
          No two subjects from the same group may be selected.
          Check the FPSC grouping rules before finalizing your combination."
DM Sans 14px, dark brown
```
 
#### Optional Subjects — 3-column card grid on desktop, 2-col tablet, 1-col mobile
 
Each subject card (Light Page Card):
```
[Top]    Subject group badge: "Group A / B / C / D" — small pill, navy bg, ivory
[Name]   Subject name — Cormorant Garamond 24px, dark
[Marks]  "100 Marks" — DM Sans 13px, muted
[Topics preview]  3 bullet points of major topics — DM Sans 13px, muted brown
[Footer] [View Full Topics ↓]  — expands inline OR links to anchor
         [Related Past Papers →] — orange text link
```
 
Hover: card lifts, left orange border slides in
 
**Optional subjects (12 total, organized by group):**
 
Group A: Political Science · International Relations · Public Administration
Group B: Economics · Business Administration · Agriculture & Forestry
Group C: History of Pakistan & India · Islamic History & Culture · British History
Group D: Sociology · Psychology · Geography
 
Group badge colors:
- Group A → teal
- Group B → rust
- Group C → olive green
- Group D → deep purple
---
 
### 6. MARKS BREAKDOWN VISUAL
**Background:** `#0B1E3D` dark navy (contrast section)
 
A rich visual overview of the full marks distribution.
 
#### Header (centered, white)
- Eyebrow (gold): `MARKS DISTRIBUTION`
- H2 (white): `The Full Picture` — Cormorant Garamond 48px
#### Visual: Horizontal stacked bar chart
Full-width bar, color-segmented:
```
[Compulsory: 600] ████████████████████  [Optional: 400] ██████████████
```
Below the bar: legend pills showing each compulsory paper and its 100-mark segment
 
Bar design:
- Compulsory segment: orange gradient `#E8650A → #C8962E`
- Optional segment: dark teal `#1A5C6B`
- Segments have subtle internal dividers (1px white 20%)
- Total "1000 marks" label centered above bar in Cormorant 600 32px white
**Note below bar:** DM Sans 13px ivory 60% — "Viva Voce (personality test) adds up to 300 marks after written exam. Grand total: 1300 marks."
 
#### Three summary cards below the bar (glassmorphism dark cards):
```
Card 1: Written Exam     Card 2: Viva Voce        Card 3: Grand Total
        1000 Marks               300 Marks                 1300 Marks
        Cormorant 600            Examiner interview        Cormorant 600
        48px white               30px white                56px orange
```
 
---
 
### 7. SUBJECT DEEP-DIVE NAVIGATOR
**Background:** `#F5F0E8`
 
#### Header
- Eyebrow: `TOPIC EXPLORER`
- H2: `Go Deep on Any Subject` — Cormorant Garamond 44px
A two-panel interactive component:
 
**Left panel — Subject List (30% width):**
Vertical list of all subjects (compulsory + optional):
```
● English Essay              [compulsory]
● English Précis             [compulsory]
● General Science            [compulsory]
  ...
○ Political Science          [optional]
○ Economics                  [optional]
  ...
```
- Active subject: orange left border, light orange bg, orange text
- Inactive: dark text, hover → orange text
- Compulsory: filled circle icon (●), optional: empty circle (○)
- All in DM Sans 14px
**Right panel — Topic Detail (70% width):**
When a subject is selected (default: English Essay):
 
```
[Subject name — H2]    Cormorant Garamond 38px, dark
[Type badge]           "Compulsory · 100 Marks" or "Optional · 100 Marks"
 
[Topics List]
  Numbered topic rows:
  01  Topic name — DM Sans 15px 600 dark
      Scope description — DM Sans 14px muted, 1-2 lines
      [CSS Weight: ★★★★☆]
  
  02  Topic name...
 
[Examiner's Note]
  A callout box (orange left border):
  "What examiners look for in [Subject]:"
  2-3 lines of guidance — DM Sans 14px italic, dark brown
 
[Quick Links row]
  [Past Papers →]  [Study Notes →]  [Practice Essay →]
  Ghost orange buttons
```
 
On mobile: tabs instead of side-by-side panels (subject names become horizontal scrollable tabs)
 
---
 
### 8. PREPARATION TIPS STRIP
**Background:** warm orange gradient (same as exam overview strip)
**Height:** ~180px
 
Three tips in a horizontal row, white text:
 
```
[Tip 1]                    [Tip 2]                    [Tip 3]
Start Compulsory First     Don't Neglect Islamiat     Balance Your Optionals
Master the 6 mandatory     High-scoring aspirants      Pick subjects where your
papers before choosing      treat it as an              interest + scoring
optionals.                  opportunity, not a          potential intersect.
                            formality.
```
- Tip title: Cormorant Garamond 20px 600, white
- Body: DM Sans 13px, white 80%
- Dividers: 1px white 20% vertical
---
 
### 9. RELATED RESOURCES CALLOUT
**Background:** parchment `#F5F0E8`
 
Three horizontal shortcut cards in a row:
 
```
[Card 1]              [Card 2]                [Card 3]
📄 Past Papers        📚 Study Resources      ✍️ Essay Checker
Browse papers by      Find books & notes      Test your writing
subject               per subject             with AI feedback
[Go to Papers →]      [Go to Resources →]     [Check Essay →]
```
 
Card style: Light Page Card, icon in orange circle, Cormorant 22px title, ghost orange CTA
 
---
 
### 10. FOOTER
> Refer to Footer spec in `00_DESIGN_SYSTEM.md`
 
---
 
## Mobile Considerations
- Hero: H1 reduced to 46px, pills stack 2-col
- Exam overview strip: 2×2 grid instead of 4-in-row
- Compulsory papers accordion: full width, same design
- Optional subject grid: single column
- Marks bar: still horizontal but labels below bar (not inline)
- Subject navigator: tab-based (horizontal subject tabs → content below)
- Preparation tips: vertical stack
---
 
## File/Component Structure Suggestion
```
app/
  syllabus/
    page.tsx
components/
  syllabus/
    PageHero.tsx
    ExamOverviewStrip.tsx
    CompulsoryPapers.tsx
    PaperAccordionRow.tsx
    OptionalSubjects.tsx
    SubjectCard.tsx
    MarksBreakdownVisual.tsx
    SubjectNavigator.tsx
    PreparationTips.tsx
    RelatedResourcesCallout.tsx
```
 
---