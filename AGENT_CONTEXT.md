# 🧠 Agent Context & Handover

**Last Updated:** 2026-02-04 (Animation Fix Phase)

## 📍 Current State

We are currently **debugging visual regressions** in the `ScrollSection` of the landing page.

- **The specific issue:** The geometric animation ("What we build" section) needed to be persistent and sticky.
- **Current Fixes:** We manually applied `align-self: start` (CSS) and simplified the opacity logic (JS) on top of a clean git state (`a3fc6e9`).

## 🛠️ Workflow: Local-First

**DO NOT PUSH TO MAIN FOR TESTING.**
We have switched to a local development workflow to speed up iteration.

1.  **Dev Server:** Ensure `npm run dev` is running (usually `http://localhost:5173`).
2.  **Make Changes:** Edit files locally.
3.  **Verify:** Ask the user to check `localhost` (or verify via screenshot/description if possible).
4.  **Deploy:** ONLY run `git push` when the user explicitly confirms the feature is perfect.

## 📂 Key Files

- `src/components/sections/ScrollSection.css` (Sticky logic)
- `src/components/illustrations/GeometricIllustration.jsx` (Animation logic)
- `AGENT_CONTEXT.md` (This file - update it if you change the workflow)

## 📝 Recent History

1. Reverted unwanted infrastructure changes that broke layout.
2. Re-applied _only_ the animation fixes.
