# Newspaper Badge Color Reference

## Color Coding System

Each newspaper has a distinct color badge for quick visual identification:

### Dawn
```css
Background: bg-teal-700 (#0f766e)
Text: text-white
```
**Visual**: Deep teal pill with white text

### The News
```css
Background: bg-red-900 (#7f1d1d)
Text: text-white
```
**Visual**: Deep burgundy/maroon pill with white text

### Express Tribune
```css
Background: bg-blue-800 (#1e40af)
Text: text-white
```
**Visual**: Deep blue pill with white text

---

## Usage in Components

### NewspaperBadge Component
```tsx
<NewspaperBadge newspaper="Dawn" />
<NewspaperBadge newspaper="The News" />
<NewspaperBadge newspaper="Express Tribune" />
```

### Styling
- Font: DM Sans
- Size: text-xs (11px)
- Weight: font-semibold
- Transform: uppercase
- Tracking: tracking-wide
- Shape: rounded-full (pill shape)
- Padding: px-3 py-1

---

## CSS Relevance Indicators

### High Priority Articles
- Display: Orange star (★) icon
- Color: `text-accent-primary` (#E8650A)
- Fill: `fill-accent-primary`
- Position: Top-right of article card

### Featured Articles
- Badge: "FEATURED" pill
- Background: `bg-accent-primary`
- Text: white
- Appears alongside newspaper badge

---

## Visual Hierarchy

1. **Featured Article**: FEATURED badge + Newspaper badge
2. **High CSS Relevance**: Orange star + Newspaper badge
3. **Regular Article**: Newspaper badge only

This color system ensures:
- Quick newspaper identification
- Clear visual hierarchy
- Consistent branding
- Accessibility (sufficient contrast)
