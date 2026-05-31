# Resource Type Badge Color Reference

## Color Coding System

Each resource type has a distinct color badge for quick visual identification:

### BOOK
```css
Background: bg-teal-700 (#0f766e)
Text: text-white
```
**Visual**: Deep teal badge with white text
**Use**: Physical or digital books, textbooks, reference materials

### NOTES
```css
Background: bg-orange-700 (#c2410c)
Text: text-white
```
**Visual**: Warm rust/orange badge with white text
**Use**: Study notes, summaries, compiled materials

### SYLLABUS
```css
Background: bg-blue-900 (#1e3a8a)
Text: text-white
```
**Visual**: Deep navy blue badge with white text
**Use**: Official syllabus documents, curriculum breakdowns

### GUIDE
```css
Background: bg-green-700 (#15803d)
Text: text-white
```
**Visual**: Olive green badge with white text
**Use**: Study guides, how-to documents, preparation strategies

### VIDEO
```css
Background: bg-purple-700 (#7e22ce)
Text: text-white
```
**Visual**: Purple badge with white text
**Use**: Video lectures, tutorials, recorded sessions

---

## Usage in Components

### ResourceTypeBadge Component
```tsx
<ResourceTypeBadge type="BOOK" />
<ResourceTypeBadge type="NOTES" />
<ResourceTypeBadge type="SYLLABUS" />
<ResourceTypeBadge type="GUIDE" />
<ResourceTypeBadge type="VIDEO" />
```

### Styling
- Font: DM Sans
- Size: text-xs (11px)
- Weight: font-semibold
- Transform: uppercase
- Tracking: tracking-wide
- Shape: rounded (not pill)
- Padding: px-3 py-1

---

## Visual Hierarchy

### Resource Cards
1. **Type Badge**: Top-left, immediately identifies resource type
2. **Title**: Large, prominent (Cormorant Garamond)
3. **Author**: Secondary info (DM Sans, muted)
4. **Description**: Body text
5. **Meta**: Format, size, relevance stars
6. **Action**: Download/access link

### Color Psychology
- **Teal (Books)**: Trust, knowledge, academic
- **Rust (Notes)**: Warm, approachable, study-friendly
- **Navy (Syllabus)**: Official, authoritative, formal
- **Green (Guides)**: Growth, guidance, progress
- **Purple (Videos)**: Creative, modern, engaging

---

## Accessibility

### Contrast Ratios
All badge combinations meet WCAG AA standards:
- Teal-700 on white: ✅ Pass
- Orange-700 on white: ✅ Pass
- Blue-900 on white: ✅ Pass
- Green-700 on white: ✅ Pass
- Purple-700 on white: ✅ Pass

### Not Color-Dependent
- Type name is always visible in text
- Icons can supplement badges
- Hover states provide additional feedback
- Screen readers announce type

---

## Implementation Notes

### Consistent Application
- Always use ResourceTypeBadge component
- Never hardcode colors
- Maintain uppercase text
- Keep padding consistent

### Hover Effects
- Badge itself doesn't change on hover
- Parent card shows hover effects
- Orange left border slides in
- Shadow deepens

### Responsive Behavior
- Badge size remains constant
- Text doesn't wrap
- Always visible on mobile
- Maintains readability

---

## Extension Guidelines

### Adding New Types
If adding new resource types:
1. Choose a distinct color (avoid similar hues)
2. Ensure WCAG AA contrast
3. Update TypeScript type definition
4. Add to colors object in component
5. Document in this file

### Suggested Future Types
- **QUIZ**: Yellow-700 (assessment materials)
- **ARTICLE**: Indigo-700 (articles, essays)
- **PODCAST**: Pink-700 (audio content)
- **TOOL**: Cyan-700 (calculators, utilities)

---

## Quick Reference Table

| Type | Color | Hex | Use Case |
|------|-------|-----|----------|
| BOOK | Teal-700 | #0f766e | Books, textbooks |
| NOTES | Orange-700 | #c2410c | Study notes |
| SYLLABUS | Blue-900 | #1e3a8a | Official syllabus |
| GUIDE | Green-700 | #15803d | Study guides |
| VIDEO | Purple-700 | #7e22ce | Video content |

This color system ensures:
- Quick resource identification
- Visual consistency
- Clear categorization
- Professional appearance
- Accessibility compliance
