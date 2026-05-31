---
name: Velorah®
colors:
  surface: '#12131a'
  surface-dim: '#12131a'
  surface-bright: '#383940'
  surface-container-lowest: '#0c0e14'
  surface-container-low: '#1a1b22'
  surface-container: '#1e1f26'
  surface-container-high: '#282a31'
  surface-container-highest: '#33343c'
  on-surface: '#e2e1eb'
  on-surface-variant: '#c4c7c8'
  inverse-surface: '#e2e1eb'
  inverse-on-surface: '#2f3037'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c6c6c7'
  primary: '#ffffff'
  on-primary: '#2f3131'
  primary-container: '#e2e2e2'
  on-primary-container: '#636565'
  inverse-primary: '#5d5f5f'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#2f3131'
  tertiary-container: '#e2e2e2'
  on-tertiary-container: '#636565'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c7'
  on-primary-fixed: '#1a1c1c'
  on-primary-fixed-variant: '#454747'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#12131a'
  on-background: '#e2e1eb'
  surface-variant: '#33343c'
typography:
  display-lg:
    fontFamily: Instrument Serif
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Instrument Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-xl:
    fontFamily: Instrument Serif
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Instrument Serif
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 80px
---

## Brand & Style

The design system is anchored in **Cinematic Minimalism**, a style that prioritizes atmosphere, negative space, and high-fidelity motion over decorative elements. It is designed for an audience that values exclusivity and quiet sophistication. 

The aesthetic is "Liquid Glass"—a refined interpretation of Glassmorphism that uses subtle backdrop blurs and precision borders to create depth without clutter. The interface acts as a transparent lens over rich, cinematic video backgrounds, ensuring that the content remains the focal point while the UI provides a structured, high-end framework.

## Colors

The palette is strictly functional and monochromatic, set against a deep navy foundation to maintain a "midnight" cinematic quality.

- **Primary:** High-contrast White (#FFFFFF) used for key interactions and core text.
- **Background:** A deep, immersive Navy (#002B42) that provides more chromatic depth than pure black, designed to pair with low-light video content.
- **Muted Foreground:** A neutral gray (#A1A1AA) used to establish hierarchy and reduce visual noise for secondary information.
- **Surface/Secondary:** Dark, near-black tones (#1A1A1A) are used for subtle UI layering.

## Typography

This design system utilizes a high-contrast typographic pairing to achieve an editorial, cinematic feel. 

- **Instrument Serif (Display):** Used for headlines and impactful statements. It must be styled with **extreme negative tracking** (letter-spacing) to create a tight, sophisticated lockup.
- **Inter (Body/Labels):** A functional, utilitarian sans-serif used for readability. 
- **Hierarchy:** Display sizes are intentionally oversized to create "hero" moments, while body text remains grounded and legible. Use uppercase for labels to provide a structural, architectural feel to the interface.

## Layout & Spacing

The layout philosophy is "Cinematic Breathability," utilizing generous margins and vertical rhythm to evoke a sense of premium space.

- **Grid:** A 12-column fluid grid system with a fixed maximum width of 1440px for desktop. 
- **Margins:** Large 64px outer margins on desktop create a "letterboxed" feel, focusing the eye on the center-stage content.
- **Rhythm:** Vertical spacing is exaggerated (stack-xl) between major sections to allow the background video and "Liquid Glass" elements to occupy the visual field without feeling crowded.

## Elevation & Depth

Depth is achieved through the **Liquid Glass** effect rather than traditional shadows. 

- **Surface Tiers:** UI surfaces use a 1% opacity white background (`rgba(255, 255, 255, 0.01)`) with a 4px backdrop blur. This ensures the background video color bleeds through while maintaining text legibility.
- **Border Mask:** All elevated elements feature a 1.4px precision border. This border should utilize a subtle linear gradient (from top-left to bottom-right) of low-opacity white to create a "prismatic" edge.
- **Motion:** Depth is reinforced through motion. Use the `fade-rise` entrance animation (0.8s, ease-out) for all appearing containers, applying a staggered delay (0.1s increments) to emphasize the vertical stack.

## Shapes

The shape language is "Soft-Technical." Elements use a subtle 0.25rem (4px) base radius to soften the digital edges of the minimalist layout while maintaining a clean, structured appearance. Larger containers like cards may scale up to 0.5rem (8px), but should never approach "pill" or "heavy rounded" territory.

## Components

- **Buttons:** Primary buttons are solid white with near-black text. Secondary buttons utilize the "Liquid Glass" effect with the 1.4px gradient border and no solid fill. Hover states should slightly increase the backdrop blur rather than changing color.
- **Inputs:** Minimalist bottom-border only or a fully outlined "Liquid Glass" container. Text should be high-contrast white.
- **Cards:** Defined by the Liquid Glass specification. No drop shadows. Content within cards should have generous internal padding (min 32px).
- **Chips/Labels:** Small, uppercase Inter text with 0.05em letter spacing. Use a thin 1px border.
- **Lists:** Clean separators using the border color (#2E2E2E) at 0.5px thickness. 
- **Navigation:** A floating Liquid Glass bar at the top or bottom of the viewport, maintaining a fixed position to allow content to scroll underneath.