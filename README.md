# Page Nineteen - AI Agency Website

A high-performance, design-driven website built with **React**, **Vite**, and **Framer Motion**.  
Key focus on "sticky snap" scroll physics, internal parallax, and synchronized SVG animations.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

## 📂 Architecture

Code is organized by **domain** in `src/`:

- **`styles/`**: The Design System source of truth.
  - `tokens.css`: Colors (`--color-accent`) & Spacing (`--space-md`).
  - `typography.css`: Fluid typography using `clamp()`.
- **`components/layout/ScrollSection`**: The core "sticky" experience.
  - **Logic**: Uses `framer-motion` for spring physics (`stiffness: 120`, `damping: 30`) and custom "sticky snap" interpolation.
  - **Behavior**: Items hold in the center with a "breathing" parallax effect before accelerating away.
- **`components/illustrations/GeometricIllustration`**:
  - Stateless SVG component purely driven by `scrollYProgress` props.

## 🛠 Design System & Rules

- **Never hardcode values**. Use tokens (`var(--space-md)`, `var(--text-h2)`).
- **Mobile First**. The layout adapts via fluid typography and flex/grid utilities.
- **Physics**. The scroll feel is "heavy friction" (controlled, expensive feel), not "floaty".

## 📦 Deployment

```bash
npm run build
# Outputs to /dist
```
