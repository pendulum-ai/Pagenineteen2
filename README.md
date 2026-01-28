# Page Nineteen - AI Agency Website

A high-performance, design-driven website built with **React**, **Vite**, and **Framer Motion**.  
Key focus on "sticky snap" scroll physics, internal parallax, and synchronized SVG animations.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

---

## 📜 Development Standards (The "Base")

**Objective**: Maintain a scalable, clean, and responsive codebase.  
**Critical Rule**: New code must adhere to these standards. No exceptions.

### 1. File Structure & Modularity

- **`src/styles/`**: The Single Source of Truth for design.
- **`src/components/sections/`**: Independent, self-contained sections (e.g., `ScrollSection`, `Hero`).
- **`src/data/`**: ALL static content (text, arrays) must be extracted here. **No hardcoded text** in components.
- **`src/config/`**: Configuration constants (themes, global settings).

### 2. Design System Tokens (Strict Usage)

**Do not use magic numbers.** Use the tokens defined in `src/styles/tokens.css`.

| Category          | Token Variable              | Value / Usage                               |
| :---------------- | :-------------------------- | :------------------------------------------ |
| **Grid / Layout** | `--layout-padding-x`        | `clamp(2rem, 8vw, 10rem)` (Fluid container) |
| **Spacing**       | `--space-xs`, `--space-sm`  | Small gaps (0.5rem, 1rem)                   |
|                   | `--space-md`, `--space-lg`  | Section gaps (2rem, 4rem)                   |
|                   | `--space-xl`, `--space-xxl` | Major vertical rhythm (6rem, 10rem)         |
| **Z-Index**       | `--z-negative`              | -1 (Backgrounds)                            |
|                   | `--z-default`               | 1                                           |
|                   | `--z-sticky`                | 10 (Sticky elements)                        |
|                   | `--z-mask`                  | 20 (Overlays/Masks)                         |
|                   | `--z-header`                | 100 (Navigation)                            |
|                   | `--z-modal`                 | 1000 (Popups)                               |

### 3. Responsive Rules

- **Fluidity First**: Build for fluid resizing, not just breakpoints.
- **Use `clamp()`**: For major padding and font sizes.
- **Mobile Fallbacks**: Always check complex interactions (like sticky scroll) on mobile. If complex physics fail, reduce to a simple vertical scroll layout (`display: block` instead of `sticky`).

### 4. CSS & Styling

- **No Private Styles**: Common patterns (columns, grids) go in `utilities.css`.
- **Decoupling**: Never name a class `hero-left` inside `ScrollSection.jsx`. Use component-agnostic names like `scroll-content`.
- **Z-Index**: Never write `z-index: 9999`. Add a token to `tokens.css` if a new layer is needed.

---

## 📂 Architecture Overview

### `src/styles/`

- **`tokens.css`**: The core DNA. Colors, Spacing, Z-Index.
- **`typography.css`**: Fluid fonts.
- **`utilities.css`**: Global helpers (`.split-layout`, `.col-left`, `.col-right`).

### `src/components/sections/ScrollSection`

The core "sticky" experience.

- **Logic**: `stiffness: 120`, `damping: 30` (Heavy physics).
- **Data**: Content matches `src/data/scrollData.js`.

### `src/components/layout/Footer`

- **Behavior**: Sit _behind_ the page content (`z-index: -1`). Revealed by a transparent "sentinel" div at the bottom of the page.
- **Theming**: Auto-switches Dark/Light based on the route.

### `src/components/ui/CrossHair`

- **Purpose**: Global orientation overlay.
- **Features**:
  - Vertical line moves/fades based on scroll section.
  - Horizontal line + Growing Rays animation on Hero.
  - Parallax effect on horizontal elements.
  - Responsive: Hidden on mobile (<768px).

---

## 📦 Build & Deploy

```bash
npm run build
# Outputs to /dist
```
