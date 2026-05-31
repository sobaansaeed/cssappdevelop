# Design System Quick Reference

## 🎨 Colors

### Backgrounds
```css
--bg-hero: #0B1E3D          /* Deep midnight navy */
--bg-page: #F5F0E8          /* Warm parchment */
--bg-section-alt: #EDE6D6   /* Deeper cream */
```

### Text
```css
--text-primary: #1A1207     /* Near-black warm brown */
--text-on-dark: #F0EAD6     /* Soft ivory */
--text-muted: #6B5E4E       /* Muted warm brown */
--text-heading-dark: #FFFFFF /* Pure white */
```

### Accents
```css
--accent-primary: #E8650A   /* Warm Orange */
--accent-hover: #C4520A     /* Deeper orange */
--accent-gold: #C8962E      /* Muted gold */
```

## 📝 Typography

### Fonts
```jsx
font-display  // Cormorant Garamond (headings)
font-body     // DM Sans (body text)
font-mono     // DM Mono (labels, code)
```

### Scale
- Hero: `text-6xl md:text-7xl lg:text-8xl` (72-96px)
- H1: `text-4xl lg:text-5xl` (52-64px)
- H2: `text-3xl lg:text-4xl` (36-44px)
- H3: `text-2xl` (24-28px)
- Body: `text-base lg:text-lg` (15-18px)
- Eyebrow: `text-xs` (11px) + `uppercase` + `tracking-widest`

## 🎭 Components

### Primary Button
```jsx
<button className="btn-primary">
  Start Preparing
</button>
```

### Ghost Button
```jsx
<button className="btn-ghost">
  Explore Resources
</button>
```

### Glassmorphism Card
```jsx
<div className="glass-card p-8">
  {/* Dark background content */}
</div>
```

### Light Page Card
```jsx
<div className="light-card p-8">
  {/* Light background content */}
</div>
```

### Eyebrow Label
```jsx
<p className="eyebrow text-accent-primary">
  SECTION LABEL
</p>
```

## 📐 Spacing

```jsx
py-20 lg:py-32  // Section vertical padding
px-6            // Horizontal padding
gap-8           // Grid/flex gaps
mb-6            // Standard margin bottom
```

## 🎬 Animations

### Scroll Reveal
```jsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-100px' }}
  transition={{ duration: 0.8 }}
>
  {/* Content */}
</motion.div>
```

### Stagger Animation
```jsx
transition={{ duration: 0.6, delay: i * 0.1 }}
```

### Count-up Stats
```jsx
<AnimatedCounter target={10000} suffix="+" />
```

## 🎯 Section Backgrounds

```jsx
// Hero
style={{ background: 'linear-gradient(180deg, #0B1E3D 0%, #0F2A52 60%, #1A3A2A 100%)' }}

// Dark sections
style={{ background: '#0B1E3D' }}

// Light sections
style={{ background: '#F5F0E8' }}

// Alternating sections
style={{ background: '#EDE6D6' }}
```

## 📱 Responsive Patterns

```jsx
// Grid
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4

// Text size
text-4xl lg:text-5xl

// Padding
py-20 lg:py-32

// Flex direction
flex flex-col sm:flex-row
```

## 🔗 Common Links

```jsx
<Link href="/resources" className="btn-primary">
<Link href="/newspapers" className="btn-ghost">
<Link href="/past-papers">
<Link href="/essay-checker">
```
