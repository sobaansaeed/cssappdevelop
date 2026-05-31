# CSSKRO.COM — Page Design: Crack the Code (`/exam-pattern`)
> Page name suggestion: **"Crack the Code"** — confident, strategic, aspirational. Tells students this page reveals the secrets of how the exam actually works.
> Alternative names: "The Exam Decoded" · "Know the Game" · "Inside the CSS Exam"
> ⚠️ Always read `00_DESIGN_SYSTEM.md` first. All tokens, fonts, colors, and components are defined there.
 
---
 
## Page Purpose
This page answers the single most important question every new aspirant has: *"How exactly does the CSS exam work?"* It must feel like a strategic briefing — precise, authoritative, and empowering. Not a dry government PDF. A page that makes students feel they have insider knowledge.
 
---
 
## Tech Stack
- **Framework:** Next.js (App Router) + Tailwind CSS
- **Animation:** Framer Motion (page entry + scroll reveals + number count-ups)
- **Icons:** lucide-react
---
 
## Page Sections (in order)
 
---
 
### 1. NAVBAR
> Refer to Navbar spec in `00_DESIGN_SYSTEM.md`
- Inner page: parchment frosted glass
---
 
### 2. PAGE HERO (Medium)
**Height:** ~320px
**Background:** Dark navy `#0B1E3D`, static star overlay (opacity 0.12)
 
Content — centered:
```
[Eyebrow]   CSS EXAM STRUCTURE  —  gold, uppercase letter-spacing
 
[H1]        Crack the Code
            Cormorant Garamond 600 70px, white
            "Code" in warm orange
 
[Subtitle]  Every stage, every paper, every mark — the complete
            CSS exam structure decoded for serious aspirants.
            DM Sans 17px, ivory 70%, max-width 500px, centered
 
[Quick stat pills row]
  [3 Stages]  [1000 Written Marks]  [300 Viva Marks]  [~200 Seats]
  Glass pills, gold border, ivory text
```
 
**Animation:** Staggered fade-up on mount — eyebrow → H1 → subtitle → pills
 
---
 
### 3. EXAM STAGES OVERVIEW
**Background:** `#F5F0E8` parchment
 
#### Header
```
[Eyebrow]   THE THREE STAGES
[H2]        A Three-Stage Elimination
            Cormorant Garamond 46px, dark
[Subtext]   Clear all three to earn your CSS badge.
            DM Sans 15px, muted
```
 
#### Stages — Horizontal flow diagram on desktop, vertical on mobile
 
Three large stage cards connected by arrows:
 
```
[Stage 1]        ——→      [Stage 2]        ——→      [Stage 3]
Written Exam              Psychological              Viva Voce
                          Assessment
1000 Marks                Pass / Fail                300 Marks
~6,000–10,000             Medical fitness            Personality test
candidates                check included             by CSS Board panel
 
[Status pill]             [Status pill]              [Status pill]
"Competitive"             "Qualifying"               "Final"
```
 
Card design (Light Page Card with stronger presence):
```
[Stage number]   "01" — Cormorant Garamond 600 56px, orange 20% opacity, top-right
[Icon]           lucide icon, 32px, orange circle bg
[Title]          Cormorant Garamond 28px, dark
[Marks/Type]     large number — Cormorant 600 48px, orange (or "Pass/Fail" for stage 2)
[Description]    DM Sans 14px, muted, 2-3 lines
[Status pill]    small pill bottom-left
```
 
Arrow between cards:
- Desktop: horizontal arrow SVG with small text "then"
- Color: orange, 2px stroke
Scroll-triggered entrance: cards slide in left-to-right with stagger
 
---
 
### 4. WRITTEN EXAM DEEP DIVE
**Background:** `#EDE6D6`
 
#### Header
```
[Eyebrow]   WRITTEN EXAMINATION
[H2]        Stage 1 — The Written Battle
            Cormorant Garamond 46px, dark
[Subtext]   10 papers over approximately 2 weeks. Every mark counts.
```
 
#### Paper-by-Paper Breakdown Table
Not a plain HTML table — a styled card-based table.
 
**Table header row:**
```
Paper  |  Subject  |  Marks  |  Duration  |  Question Type  |  Pass Mark
```
Header: DM Sans 12px uppercase letter-spacing, muted, parchment bg, border-bottom gold
 
**Each paper row (alternating light bg):**
```
Row style:
- Odd rows: white 70% bg
- Even rows: rgba(245,240,232,0.5)
- Hover: light orange tint bg, smooth transition
- Left border on hover: 3px orange
 
Paper column:    "01" — Cormorant Garamond 500 20px, orange
Subject column:  Subject name — Cormorant Garamond 500 18px, dark
                 "(Compulsory)" or "(Optional)" — DM Sans 11px muted italic below
Marks column:    "100" — DM Sans 600 18px dark  ·  badge: orange pill
Duration column: Clock icon + "3 Hours" — DM Sans 14px
Question Type:   Tag pills:
                   "Essay-type" — teal pill
                   "MCQs" — rust pill
                   "Both" — purple pill
Pass Mark:       "33%" or "40%" — DM Sans 14px, shown as fraction bar visual
                 Small thin bar: [████░░░░░░] colored fill to pass mark
```
 
**All papers listed:**
 
| # | Subject | Marks | Duration | Type | Pass Mark |
|---|---|---|---|---|---|
| 01 | English Essay | 100 | 3 hrs | Essay-type | 33% |
| 02 | English Précis & Composition | 100 | 3 hrs | Essay-type + MCQ | 33% |
| 03 | General Science & Ability | 100 | 2 hrs | MCQs | 33% |
| 04 | Current Affairs | 100 | 3 hrs | Essay-type | 33% |
| 05 | Pakistan Affairs | 100 | 3 hrs | Essay-type | 33% |
| 06 | Islamiat | 100 | 2 hrs | Essay-type + MCQ | 33% |
| 07 | Optional I | 100 | 3 hrs | Essay-type | 40% |
| 08 | Optional II | 100 | 3 hrs | Essay-type | 40% |
| 09 | Optional III | 100 | 3 hrs | Essay-type | 40% |
| 10 | Optional IV | 100 | 3 hrs | Essay-type | 40% |
 
**Note card below table** (orange left border):
```
[Icon]  AlertCircle, orange
[Text]  "Aggregate rule: Candidates must score 40% overall AND 33% in each
         compulsory paper. Failing any single compulsory paper = disqualification,
         regardless of total aggregate."
DM Sans 14px, dark brown
```
 
---
 
### 5. MARKS ANATOMY SECTION
**Background:** `#0B1E3D` dark navy — contrast section
 
Full-width dark section with visual mark breakdowns.
 
#### Header (centered, white)
- Eyebrow (gold): `WHERE MARKS COME FROM`
- H2 (white): `Anatomy of 1300 Marks` — Cormorant Garamond 52px
#### Three Visual Cards (glassmorphism dark cards, 3-col grid)
 
**Card 1 — Written Papers**
```
[Number]  1000  — Cormorant Garamond 600 64px, orange
[Label]   Written Marks
[Bar]     Segmented bar: 6 compulsory (60%) + 4 optional (40%)
[Detail]  10 papers × 100 marks each
          DM Sans 14px, ivory 70%
```
 
**Card 2 — Psychological + Medical**
```
[Badge]   PASS / FAIL  — large text, no marks
[Label]   Psychological Assessment
[Detail]  Qualifying in nature. Does not add to marks.
          Failure = elimination before Viva.
          DM Sans 14px, ivory 70%
```
 
**Card 3 — Viva Voce**
```
[Number]  300  — Cormorant Garamond 600 64px, gold
[Label]   Viva Voce (Personality Test)
[Detail]  Conducted by CSS Board panel.
          Covers personality, current affairs, subject knowledge.
          DM Sans 14px, ivory 70%
```
 
**Grand total bar below all cards:**
```
GRAND TOTAL: 1300 MARKS
Full-width horizontal bar:
[Written: 1000 — orange]  [Viva: 300 — gold]
Cormorant Garamond 600 36px white label above
```
 
Count-up animation (Framer Motion) on scroll: 0 → 1000, 0 → 300, 0 → 1300
 
---
 
### 6. QUESTION TYPES EXPLAINED
**Background:** `#F5F0E8`
 
#### Header
- Eyebrow: `QUESTION FORMAT`
- H2: `What You'll Actually Face` — Cormorant Garamond 44px
#### Three question type cards — 3-col grid
 
**Card 1: Essay-Type Questions**
```
[Icon]   PenLine, orange circle bg
[Title]  Essay-Type Questions  — Cormorant Garamond 26px
[Badge]  "Majority of papers"
[Body]   Long-form written answers. CSS examiners assess depth of
         knowledge, argument quality, and writing clarity.
[Specs]
  · Typically 5–6 questions, attempt 3–4
  · 20–25 marks per question
  · No word limit specified — but quality over quantity
  · Marks deducted for irrelevance
[Tip box]  Light orange tint:
  "Tip: Open with a definition or thesis. Structure each answer
   in 3 parts: context, analysis, recommendation."
```
 
**Card 2: MCQs**
```
[Icon]   CheckSquare, orange circle bg
[Title]  Multiple Choice Questions  — Cormorant Garamond 26px
[Badge]  "General Science & Ability, Islamiat"
[Body]   Objective questions with 4 options. No negative marking
         in most papers — but confirm per year's instructions.
[Specs]
  · 100 MCQs in some papers
  · 1 mark each
  · Time-pressured — ~1 minute per question
  · Mix of factual recall and application
[Tip box]
  "Tip: Eliminate obviously wrong options first. Don't leave
   blanks — there is typically no penalty for guessing."
```
 
**Card 3: Précis & Comprehension**
```
[Icon]   BookText, orange circle bg
[Title]  Précis & Composition  — Cormorant Garamond 26px
[Badge]  "English Précis paper"
[Body]   Condensing a passage to 1/3 of its length while retaining
         all key points. Tests language command and comprehension.
[Specs]
  · Précis: usually 30–40 marks
  · Comprehension passage: 20 marks
  · Grammar/translation: 20–30 marks
  · Strict word count enforcement
[Tip box]
  "Tip: Use indirect speech and your own words. Preserve
   all key arguments. Title the précis."
```
 
Card style: Light Page Card, generous padding, tip box has orange left border
 
---
 
### 7. EXAM TIMELINE & SCHEDULE
**Background:** `#EDE6D6`
 
#### Header
- Eyebrow: `ANNUAL CYCLE`
- H2: `When Does It All Happen?` — Cormorant Garamond 44px
#### Visual Timeline — Vertical on mobile, horizontal scroll on desktop
 
Horizontal timeline with milestone nodes:
 
```
[OCT–NOV]          [DEC–JAN]         [FEB]              [APR–MAY]          [JUN–AUG]          [SEP–OCT]
FPSC                Applications      Written             Results             Psychological       Viva Voce
Notification        Open              Exam                Announced           Assessment          & Final Merit
·                   ──────────────────────────────────────────────────────────────────────────────────·
```
 
Each node:
- Circle: 48px, orange bg, white icon (lucide), centered on line
- Date label: above, DM Sans 12px muted
- Title: below, Cormorant Garamond 20px dark
- Description: DM Sans 13px muted, 1-2 lines
Timeline line: 2px `var(--accent-gold)` dashed horizontal line connecting nodes
 
Important note card below:
```
[Icon]  Calendar, orange
[Text]  "Dates shift year to year. Always verify the official
         schedule at fpsc.gov.pk before planning your prep timeline."
DM Sans 14px, orange left border card
```
 
---
 
### 8. PASSING CRITERIA EXPLAINER
**Background:** `#F5F0E8`
 
#### Header
- Eyebrow: `PASSING RULES`
- H2: `The Rules That Matter Most` — Cormorant Garamond 44px
Three rule cards in a row:
 
**Card 1: Minimum Per Paper**
```
[Large number]  33%
[Title]         Per Compulsory Paper
[Body]          You must score at least 33 marks out of 100 in each
                compulsory paper. Scoring below this in any single
                paper = disqualification, even if your aggregate is high.
[Visual]        Mini bar: [███░░░░░░░] 33% mark labeled
```
 
**Card 2: Optional Paper Minimum**
```
[Large number]  40%
[Title]         Per Optional Paper
[Body]          Optional papers have a higher minimum — 40 marks per
                paper. A weak optional subject can disqualify you.
[Visual]        Mini bar: [████░░░░░░] 40% mark labeled
```
 
**Card 3: Overall Aggregate**
```
[Large number]  40%
[Title]         Overall Aggregate
[Body]          Even after clearing individual papers, your total
                score must meet the aggregate cut-off, which varies
                by year. Typically ranges from 42–47%.
[Visual]        Mini bar with "Cut-off zone" labeled
```
 
Card style: Light Page Card. Large number in Cormorant 600 64px orange. Orange accent top strip.
 
**Bottom callout (full-width, dark navy bg):**
```
"In summary: Clear every paper minimum + clear overall aggregate + pass Psychological + impress in Viva."
Cormorant Garamond italic 24px, ivory, centered, padding 40px
```
 
---
 
### 9. COMPARISON: CSS vs COMMON MISCONCEPTIONS
**Background:** `#EDE6D6`
 
A myth-busting section — makes the page memorable and shareable.
 
#### Header
- Eyebrow: `SET THE RECORD STRAIGHT`
- H2: `What People Get Wrong About CSS` — Cormorant Garamond 44px
#### Myth Cards — 2-col grid on desktop
 
Each card has two halves:
```
[Top half — dark red tint bg]
  ✗  MYTH
  "You can pass CSS by memorising past papers."
  DM Sans 15px, dark
 
[Bottom half — light green tint bg]
  ✓  REALITY
  "CSS tests understanding and analytical ability. Memorisation
   rarely survives the essay and viva stages."
  DM Sans 14px, dark
```
 
Card: white bg, radius `var(--radius-lg)`, border `var(--border-card)`
Top section: `rgba(200,50,50,0.06)`, red-tinted
Bottom section: `rgba(50,150,100,0.06)`, green-tinted
Divider between halves: 1px dashed border
 
**4 myth cards:**
1. Myth: "MCQ-only prep is enough" / Reality: Most papers are essay-type
2. Myth: "You need to study 12+ hours daily" / Reality: Consistency over volume
3. Myth: "Only doctors/engineers pass optionals" / Reality: Social sciences score consistently high
4. Myth: "Viva is just a formality" / Reality: 300 marks — it has changed final merit lists
---
 
### 10. STRATEGY CALLOUT
**Background:** dark navy `#0B1E3D`
 
Full-width dark strip:
 
```
[Left 60%]
  Eyebrow (gold):  THE SMART APPROACH
  H3 (white):  "Now That You Know the Pattern — Prepare For It"
  Body (ivory 70%):  "Browse past papers by subject, test your essays
                      with AI feedback, and follow a structured study plan."
 
[Right 40%]  Three ghost buttons stacked or in row:
  [📄 Browse Past Papers]  — ghost white
  [✍️ Check an Essay]       — primary orange
  [📚 View Resources]       — ghost white
```
 
---
 
### 11. FOOTER
> Refer to Footer spec in `00_DESIGN_SYSTEM.md`
 
---
 
## Mobile Considerations
- Hero: H1 → 48px, pills wrap to 2×2
- Exam stages: vertical stack, arrows become down arrows
- Written exam table: horizontally scrollable with sticky first column (subject name)
- Marks anatomy: single column stack
- Question type cards: single column
- Timeline: vertical (nodes stacked, line on left side)
- Passing criteria cards: single column
- Myth cards: single column
---
 
## File/Component Structure Suggestion
```
app/
  exam-pattern/
    page.tsx
components/
  exam-pattern/
    PageHero.tsx
    ExamStagesFlow.tsx
    WrittenExamTable.tsx
    MarksAnatomy.tsx
    QuestionTypesCards.tsx
    ExamTimeline.tsx
    PassingCriteria.tsx
    MythBusting.tsx
    StrategyCallout.tsx
```
 
---