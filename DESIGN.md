---
name: Swiss Modernist
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1b1b1b'
  on-surface-variant: '#4c4546'
  inverse-surface: '#303030'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5d5f5f'
  on-secondary: '#ffffff'
  secondary-container: '#dfe0e0'
  on-secondary-container: '#616363'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1b1b1b'
  on-tertiary-container: '#848484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c6'
  on-tertiary-fixed: '#1b1b1b'
  on-tertiary-fixed-variant: '#474747'
  background: '#f9f9f9'
  on-background: '#1b1b1b'
  surface-variant: '#e2e2e2'
  international-orange: '#FF3000'
  silver-gray: '#E5E5E5'
typography:
  display-xl:
    fontFamily: Hanken Grotesk
    fontSize: 80px
    fontWeight: '800'
    lineHeight: '1.0'
    letterSpacing: -0.04em
  display-xl-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.02em
spacing:
  grid-margin: 4rem
  grid-gutter: 1.5rem
  section-gap: 8rem
  stack-sm: 0.5rem
  stack-md: 1rem
  stack-lg: 2rem
---

## Brand & Style

This design system is anchored in the International Typographic Style, emphasizing objectivity, legibility, and structural order. It is designed for high-end portfolios and editorial platforms where the content is the primary focus. 

The aesthetic is **Minimalist and High-Contrast**. It rejects decorative flourishes in favor of a rigid mathematical grid and purposeful asymmetric layouts. The emotional response should be one of precision, authority, and timeless sophistication. Every element serves a functional purpose, utilizing whitespace not as "empty space," but as a structural component that guides the eye and establishes hierarchy.

## Colors

The palette is strictly grayscale to ensure maximum contrast and clarity, allowing the work to speak for itself. 

- **Primary & Neutral:** A binary relationship between pure Black (#000000) and pure White (#FFFFFF).
- **Accent:** "International Orange" (#FF3000) is used sparingly for critical calls to action, status indicators, or to highlight active navigation states.
- **Surface Strategy:** Backgrounds should remain white to maintain an expansive, "gallery" feel. Black is reserved for typography and structural borders. Gray is used only for secondary metadata or subtle divider lines.

## Typography

Typography is the core of this design system. We utilize **Hanken Grotesk** for display and headlines to provide a sharp, neo-grotesque precision that mirrors Akzidenz-Grotesk. **Inter** is used for body text and labels to ensure maximum legibility at smaller scales.

Key rules:
- **Tight Kerning:** High-impact display text uses negative letter spacing for a dense, "poster-like" feel.
- **Leading:** Body text utilizes generous line heights (1.5-1.6) to balance the high-density headlines.
- **Alignment:** Flush-left, ragged-right is the standard. Avoid centered text to maintain the dynamic asymmetrical balance of the Swiss style.

## Layout & Spacing

The layout is built on a **Rigid 12-Column Fixed Grid**. This grid dictates the placement of all elements, ensuring a mathematical harmony across the product.

- **Desktop (1440px+):** 12 columns, 64px margins.
- **Tablet (1024px):** 8 columns, 40px margins.
- **Mobile (640px):** 4 columns, 24px margins.

**Vertical Rhythm:** Use the `section-gap` for major transitions between content blocks. Whitespace should feel intentional and slightly "uncomfortable" to the untrained eye—err on the side of too much space rather than too little. Elements should align strictly to column starts; avoid arbitrary widths.

## Elevation & Depth

This design system is strictly **Flat**. Depth is achieved through layering and contrast rather than shadows or blurs.

- **No Shadows:** Shadows are prohibited. Use 1px or 2px black borders to define boundaries when necessary.
- **Tonal Layering:** Use the interplay between white and black backgrounds to create "zones" of focus.
- **Overlays:** Full-screen overlays for menus should be solid white or solid black with no transparency.
- **Structural Lines:** Use 1px horizontal and vertical rules (Black or Silver Gray) to reinforce the grid and separate content sections, echoing the look of architectural blueprints.

## Shapes

The shape language is **Sharp (0px radius)**. 

Every interactive element—buttons, input fields, cards, and image containers—must have square corners. This reinforces the rigid, grid-based nature of the design. Circular elements are only permitted for specific functional icons or avatars, but even these should be contained within square hit areas to maintain the geometric consistency of the layout.

## Components

### Buttons
Primary buttons are solid Black with White typography. Hover states invert the colors (White background, Black text, Black 1px border) or switch to International Orange for high-priority actions. All buttons are rectangular with no border-radius.

### Input Fields
Inputs consist of a 1px bottom border only, or a full 1px black stroke. Labels are positioned above the field in `label-bold` (uppercase). Focus states are indicated by a thicker 2px border or a change to International Orange.

### Cards & Containers
Cards do not use shadows. They are defined by 1px borders or simply by their alignment within the grid. Image containers should always maintain a consistent aspect ratio (1:1 or 4:5) to fit the grid blocks perfectly.

### Navigation
The navigation bar is a minimal horizontal strip at the top of the grid. Links use `label-bold`. The active state is indicated by a small square marker or a color shift to International Orange.

### Lists
Lists are separated by thin horizontal rules. Bullet points are replaced with small squares or numerical indexes to maintain the geometric aesthetic.