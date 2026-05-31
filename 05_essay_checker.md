# CSSKRO.COM — Page Design: Essay Checker (`/essay-checker`)
> ⚠️ Always read `00_DESIGN_SYSTEM.md` first. All tokens, fonts, colors, and components are defined there.
 
---
 
## Page Purpose
The Essay Checker is the **most interactive and technically impressive page** on the site. It should feel like having a knowledgeable CSS examiner sitting across from you — intelligent, precise, and encouraging. The UI must be clean and focused: distraction-free writing environment on the left, rich feedback panel on the right.
 
---
 
## Tech Stack
- **Framework:** Next.js (App Router) + Tailwind CSS
- **Animation:** Framer Motion — feedback panel reveal, score animation
- **Icons:** lucide-react
- **AI:** Anthropic Claude API (via `/api/check-essay` route) or client-side fetch
---
 
## Page Sections (in order)
 
---
 
### 1. NAVBAR
> Refer to Navbar spec in `00_DESIGN_SYSTEM.md`
- Inner page: parchment frosted glass
- "Essay Checker" link: active orange underline
---
 
### 2. PAGE HERO (Compact)
**Height:** ~240px
**Background:** Dark navy `#0B1E3D`, static faint star SVG (opacity 0.10)
 
Content — centered:
```
[Eyebrow]   AI-POWERED FEEDBACK  —  gold, uppercase, letter-spacing
[H1]        Know Exactly Where You Stand  —  Cormorant Garamond 600 58px, white
[Subtitle]  Paste your CSS essay. Get a score, structure analysis, and
            examiner-style feedback in seconds.
            DM Sans 16px, ivory 70%, max-width 480px, centered
```
 
**Animation:** Page-entry fade-up, 0.4s, once
 
---
 
### 3. HOW IT WORKS — STEPS ROW
**Background: `#F5F0E8` parchment**
**Height:** ~160px
 
Three steps, horizontally laid out with connectors:
 
```
[Step 1]              [Arrow →]   [Step 2]           [Arrow →]   [Step 3]
✍️ Write or Paste                  🤖 AI Analyzes                  📊 Get Feedback
Your essay                          Your text                       Scored & detailed
 
Icon: orange circle bg             Icon: orange circle bg          Icon: orange circle bg
DM Sans 13px centered label
```
 
- Step circles: 48px, orange bg at 10%, orange icon 24px
- Arrows: thin, muted, 30px
- Label: DM Sans 13px, dark brown, centered under each step
- On mobile: vertical stack with down arrows
---
 
### 4. MAIN ESSAY CHECKER TOOL
**Background: `#F5F0E8` — full width section, generous padding**
 
This is the **core of the page**. Two-panel layout on desktop, stacked on mobile.
 
---
 
#### PANEL A — Essay Input (Left, 50%)
 
**Panel card:** White 90% bg, border `var(--border-card)`, radius `var(--radius-lg)`, shadow subtle, full-height
 
```
[Card Header]
  [Left] "Your Essay"  —  Cormorant Garamond 22px, dark
  [Right] Word count: "0 words"  —  DM Sans 13px, muted, updates live
 
[Topic/Prompt input — optional]
  Small input field above textarea:
  Placeholder: "Essay topic or question (optional)"
  DM Sans 14px, border bottom only style, muted placeholder
  Full width
 
[Textarea]
  Large writing area — min-height: 400px, grows with content
  Font: DM Sans 16px, dark brown, line-height 1.75
  No resize handle — auto-grows
  Placeholder text (DM Sans 15px, muted italic):
    "Begin writing your essay here...
    
    Tip: A strong CSS essay opens with a clear thesis, 
    develops arguments with evidence, and closes with
    a policy recommendation."
  Border: none inside card — full canvas feel
  Focus: no ring — just the card border glows subtly orange
 
[Word / Sentence Stats Bar]
  Below textarea: small inline stats
  "245 words  ·  18 sentences  ·  ~2 min read"
  DM Sans 12px, muted, icons left of each stat
 
[Submit Button — full width]
  "Check My Essay"  —  primary orange gradient pill, full-width
  Height: 52px, DM Sans 16px 500
  Icon left: Sparkles (lucide)
  Loading state: spinner + "Analyzing your essay..." text
  Disabled state (empty): muted, 60% opacity, not clickable
 
[Below button]
  Small text: "Free to use · No account needed · Powered by AI"
  DM Sans 12px, muted, centered
```
 
---
 
#### PANEL B — Feedback Results (Right, 50%)
 
**Default state (before submission):**
 
Centered placeholder in panel:
```
[Large icon]  BookOpen, 64px, muted orange, opacity 40%
[Text]        "Your feedback will appear here"
              DM Sans 16px, muted brown
[Subtext]     "Submit your essay to receive a detailed score
               and examiner-style analysis."
              DM Sans 14px, muted, centered
```
 
---
 
**Results state (after AI responds):**
 
Panel card: same white 90% card
 
Animate in with Framer Motion: `opacity 0 → 1`, `translateX(20px → 0)`, spring easing
 
```
[A] SCORE BANNER — top of results
    Full-width banner, orange-to-gold gradient, rounded top
    
    Left:   Big score — Cormorant Garamond 600 72px, white
            "/ 100" — Cormorant Garamond 300 32px, white 70%
    
    Center: Grade pill — e.g., "B+" — large, white bg, orange text, DM Sans 700
    
    Right:  3 mini scores stacked:
            Content: 28/35
            Structure: 22/30
            Language: 18/25
            Format: small label (DM Sans 10px muted ivory) + value (DM Sans 14px white)
 
[B] QUICK SUMMARY
    2–3 line summary paragraph — DM Sans 15px, dark brown
    e.g., "A well-structured essay with a clear central argument.
    Language is generally strong but some paragraphs lack evidential support..."
 
[C] STRENGTHS & WEAKNESSES PILLS ROW
    Two labeled groups:
    
    "Strengths" label — DM Sans 11px, green-toned text
    Pills: [Clear thesis] [Good flow] [Relevant examples]  — green-tinted glass pills
    
    "Areas to Improve" label — DM Sans 11px, warm amber text
    Pills: [Weak conclusion] [Needs more evidence] [Repetitive phrasing]  — amber glass pills
 
[D] DETAILED BREAKDOWN — Accordion or stacked sections
 
    Each section = expandable card:
    
    ┌─────────────────────────────────────────┐
    │  [Icon]  Section Title        [Score]   │
    │  e.g. "Content & Arguments"   28/35     │
    │  ▼ Expand                               │
    └─────────────────────────────────────────┘
    
    Sections:
    1. Content & Arguments  (icon: BrainCircuit)
    2. Structure & Flow  (icon: AlignLeft)
    3. Language & Style  (icon: Pen)
    4. CSS Examiner Notes  (icon: GraduationCap)
    
    When expanded:
    - 2–4 bullet points of specific feedback — DM Sans 14px, dark
    - Highlighted phrases from essay (if possible): excerpt in orange tint box
    
    Header row per section:
    Background: rgba(232,101,10,0.06) — orange tint
    Title: DM Sans 15px 500
    Score: orange badge, DM Sans 13px
    Chevron: rotates on expand
 
[E] PARAGRAPH-BY-PARAGRAPH SECTION
    Title: "Paragraph Breakdown"
    Each paragraph shown as mini card:
    
    [Para 1]  First 60 chars...  [Rating bar: ████████░░]  Feedback line
    [Para 2]  First 60 chars...  [Rating bar: ██████░░░░]  Feedback line
    
    Rating bar: thin horizontal bar, filled orange, gray empty, 120px wide
    Feedback line: DM Sans 13px, muted, 1 line
 
[F] ACTION BUTTONS
    [Try Again — rewrite] — ghost orange button, full-width
    [Copy Feedback] — ghost dark button, copy icon
    [Share Results] — ghost dark button, share icon
```
 
---
 
### 5. TIPS FOR BETTER ESSAYS
**Background: `#EDE6D6`**
 
#### Header
- Eyebrow: `CSS WRITING TIPS`
- H2: `Write Like an Examiner Expects` — Cormorant Garamond 40px
#### Tips Grid — 3-col desktop, 1-col mobile
Each tip card (Light Page Card):
```
[Number]  "01" — Cormorant Garamond 600 48px, orange 20% opacity, top-left
[Title]   DM Sans 16px 600, dark
[Body]    DM Sans 14px, muted brown
```
 
Tips content:
1. **Start With a Thesis** — Your opening paragraph must state your position clearly.
2. **Structure in Threes** — Introduction, 3–5 body paragraphs, conclusion. CSS examiners value logical flow.
3. **Evidence Every Claim** — Back arguments with statistics, examples, or expert opinion.
4. **Address Counter-Arguments** — Show intellectual depth by acknowledging opposing views.
5. **Conclude With Policy** — CSS essays should end with actionable recommendations.
6. **Edit for Concision** — Remove filler sentences. Clarity over complexity.
---
 
### 6. SAMPLE ESSAY PREVIEW
**Background: parchment `#F5F0E8`**
 
#### Header
- Eyebrow: `SEE IT IN ACTION`
- H2: `Sample Essay & Feedback` — Cormorant Garamond 40px
- Body: "See how the Essay Checker works on a real example."
#### Two-panel layout (same as tool, but static/read-only)
 
Left: Sample essay excerpt (first 200 words, truncated with fade)
"Load Sample Essay" button — ghost orange, loads sample into the tool above
 
Right: Sample feedback results (all panels filled with example data, static)
 
CTA below: "Try With Your Own Essay ↑" — orange button, scrolls back to tool
 
---
 
### 7. FAQ SECTION
**Background: `#EDE6D6`**
 
#### Header
- H2: `Common Questions` — Cormorant Garamond 40px
#### FAQ Accordion (5–6 questions)
Each item:
```
[Question]  DM Sans 15px 500, dark  —  full-width clickable row
[Chevron]   rotates on expand
[Answer]    DM Sans 14px, muted brown, padding below
[Divider]   1px light line
```
 
Questions:
1. How does the AI score my essay?
2. Is my essay stored or saved anywhere?
3. What subjects and topics does it support?
4. How accurate is the AI feedback compared to a real examiner?
5. Can I check the same essay multiple times?
6. Is this free to use?
---
 
### 8. FOOTER
> Refer to Footer spec in `00_DESIGN_SYSTEM.md`
 
---
 
## States & Interactions Summary
 
| State | Behavior |
|---|---|
| Empty textarea | Submit button disabled (muted), word count = 0 |
| Typing | Word/sentence count updates live |
| Submitted | Button shows spinner + "Analyzing..." text, right panel shows loading skeleton |
| Loading skeleton | 3 gray pulsing blocks in right panel (shimmer animation) |
| Results ready | Framer Motion panel slide-in, score counter animates from 0 to score |
| Error | Error state card: "Analysis failed. Please try again." + retry button |
 
---
 
## Loading Skeleton (Right Panel)
While waiting for AI response:
```
[Score banner area]     — gray shimmer block, 80px height
[Summary area]          — 3 lines of gray shimmer, varying width
[Breakdown sections]    — 4 accordion shimmer rows
```
Use CSS keyframe `@keyframes shimmer` — moves gradient left-to-right
 
---
 
## Mobile Considerations
- How-it-works: vertical stack with down arrows
- Main tool: full-width stacked — input panel top, results panel below
- Textarea: min-height 280px
- Score banner: smaller score (48px), mini scores below
- Paragraph breakdown: scrollable horizontal or simplified
- Tips grid: single column
- Sample preview: single column, essay top / feedback bottom
---
 
## File/Component Structure Suggestion
```
app/
  essay-checker/
    page.tsx
  api/
    check-essay/
      route.ts       ← Claude API call
components/
  essay-checker/
    PageHero.tsx
    HowItWorks.tsx
    EssayInput.tsx
    FeedbackPanel.tsx
    ScoreBanner.tsx
    DetailedBreakdown.tsx
    ParagraphBreakdown.tsx
    WritingTips.tsx
    SampleEssayPreview.tsx
    FAQSection.tsx
```
 
---
 
## API Route Spec (`/api/check-essay`)
 
```typescript
// POST /api/check-essay
// Body: { essay: string, topic?: string }
// Returns: JSON feedback object
 
const systemPrompt = `
You are an expert CSS (Central Superior Services Pakistan) exam evaluator.
Analyze the submitted essay and return ONLY valid JSON with this structure:
{
  "score": number (0-100),
  "grade": string (A/B+/B/C+/C/D),
  "summary": string (2-3 sentences),
  "contentScore": number (0-35),
  "structureScore": number (0-30),
  "languageScore": number (0-25),
  "strengths": string[] (3 items),
  "improvements": string[] (3 items),
  "contentFeedback": string[] (3 bullet points),
  "structureFeedback": string[] (3 bullet points),
  "languageFeedback": string[] (3 bullet points),
  "examinerNotes": string[] (2-3 bullet points, CSS-specific),
  "paragraphFeedback": [
    { "preview": string, "rating": number (1-10), "note": string }
  ]
}
`
```
 
---