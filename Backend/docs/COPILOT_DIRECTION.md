# UI/UX direction for GitHub Copilot

Use these guidelines to propose code changes; do not execute them automatically without review.

## Feature evolution
- Prioritize adaptive study modes (spaced repetition, streak tracking, configurable timed exams) to deepen learning and mirror real test pacing.
- Expand analytics: per-topic mastery charts, accuracy by difficulty, streak summaries, and goal reminders tied to the RPG XP system.
- Add full exam coverage by implementing remaining AFOQT sections (e.g., Instrument Comprehension, Aviation Information) alongside existing math/verbal/science content.
- Improve persistence: optional cloud sync or export/import for profiles so progress survives device changes while keeping offline support.

## UI/UX and presentation
- Implement a theme switcher that leverages existing CSS variables; support day/night palettes and user-custom colors while preserving the retro aesthetic.
- Add micro-animations (hover pulses, parallax on panels, success streak glow) and polish boot sequence with optional skip, ambient music, and spatialized cues.
- Extend particle/reward effects for milestones (level-ups, perfect streaks) with variant colors and shapes.
- Introduce settings for motion/FX reduction (disable CRT scanlines/particles), higher contrast, and alternate reading-friendly fonts.
- Add navigation aids: command palette or quick-switch overlay for subjects and modes; inline tutorial overlay explaining practice vs. test, RPG leveling, and PWA install.
- Expand audio: layered UI sound sets (navigation, hover, error), toggleable; short menu loops and longer study/test tracks with mute options.

## Collaboration notes
- Keep changes modular; prefer feature flags or settings toggles for new effects.
- Maintain accessibility and performance; animations should respect reduced-motion preferences.
