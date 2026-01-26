# Pagenineteen2 - Applied Multimodal AI Lab

This codebase has been architected for scalability, modularity, and professional maintenance. Please follow the guidelines below when adding new features or modifying existing ones.

## 📂 Project Structure

Code is organized by **domain** rather than technical type:

```
src/
├── components/
│   ├── layout/         # Structural wrappers (Header, Footer, ScrollSection)
│   ├── sections/       # Page content blocks (Hero, MissionSection)
│   ├── illustrations/  # Complex visual components (GeometricIllustration)
│   └── ui/             # Reusable primitives (Buttons, Cards - empty for now)
├── styles/
│   ├── tokens.css      # THE SOURCE OF TRUTH (Colors, Spacing)
│   ├── typography.css  # Font sizes and weights
│   ├── animations.css  # Transition timings
│   └── utilities.css   # Helper classes (.container, .split-layout)
└── App.jsx             # Main composition
```

---

## 🎨 Design System Guide

**DO NOT** Use hardcoded pixel values (e.g., `padding: 24px` or `font-size: 18px`).
**DO** Use the semantic tokens defined in `src/styles`.

### Spacing Tokens

Use these for margins, paddings, and gaps.

| Token              | Size (approx) | Usage                               |
| :----------------- | :------------ | :---------------------------------- |
| `var(--space-xs)`  | 8px           | Tiny gaps                           |
| `var(--space-sm)`  | 16px          | Standard button padding / small gap |
| `var(--space-md)`  | 32px          | Component separation / card padding |
| `var(--space-lg)`  | 64px          | Section padding (mobile)            |
| `var(--space-xl)`  | 96px          | Section padding (desktop)           |
| `var(--space-xxl)` | 160px         | Major layout breathing room         |

### Typography Tokens

Font sizes use `clamp()` for automatic responsiveness.

| Token                 | Usage                             |
| :-------------------- | :-------------------------------- |
| `var(--text-display)` | Hero/Main Titles only             |
| `var(--text-h1)`      | Section Headers                   |
| `var(--text-h2)`      | Sub-sections / Mission Statements |
| `var(--text-body)`    | Standard reading text             |
| `var(--text-small)`   | Navigation, Captions              |

### Colors

| Token                 | Description               |
| :-------------------- | :------------------------ |
| `var(--color-bg)`     | Main background           |
| `var(--color-text)`   | Primary text              |
| `var(--color-accent)` | Orange accent (`#ff5500`) |

---

## 🛠 Workflow Rules (How to not break things)

1.  **Adding a New Section:**
    - Create a folder/file in `src/components/sections/MyNewSection.jsx`.
    - Import tokens in its CSS file.
    - Use `.container` or `.split-layout` utilities for alignment.

2.  **Adding a New Page:**
    - (Future) Use React Router. Ensure layout wrappers (Header) are outside the route switch if they persist.

3.  **Responsiveness:**
    - The site is "Mobile-first" compliant but handles desktop gracefully via `clamp()`.
    - Use `@media (max-width: 768px)` for mobile overrides if fluid typography isn't enough.

4.  **Git/Version Control:**
    - Keep commits atomic (one feature per commit).
    - Run `npm run build` before pushing to ensure no import errors.

---

## 🚀 Getting Started

1.  `npm install`
2.  `npm run dev`
3.  Open `http://localhost:5173`
