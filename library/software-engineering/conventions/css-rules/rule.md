---
schema: 1
id: css-rules
kind: rule
title: CSS and SCSS rules
description: Standing rules for hand-written CSS and SCSS covering design tokens as custom properties, low specificity, no !important, flex and grid layout, logical properties and shallow nesting.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer]
stack: [html-css]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: beginner
tags: [custom-properties, specificity, sass-nesting, responsive-layout, design-tokens]
applies_to: ["**/*.css", "**/*.scss", "**/*.module.css"]
pairs_with:
  rules: [frontend-accessibility-rules]
  prompts: [fix-css-layout-bug]
  personas: [frontend-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change CSS or SCSS in this project:

**Know the system first**
- Find the project's styling approach before writing a rule: global stylesheets, CSS Modules, BEM, a component library, or per-component files. Put new styles where the existing ones for that component live and follow the naming scheme already used.
- Find the design tokens (custom properties, SCSS variables or a theme file). Use them for colour, spacing, font size, radius, shadow and z-index. Do not introduce raw hex values or one-off pixel sizes that duplicate a token; if a token is missing, add it in the token file and say so.
- Check the browser support targets (browserslist) before using newer features such as `:has()`, container queries or native nesting.

**Specificity and the cascade**
- Style with single classes. Avoid ID selectors, element selectors qualified by classes (`div.card`), and chains longer than two or three simple selectors.
- Never add `!important` to win a specificity fight. Fix the selector or the source order. The exceptions are utility classes meant to always win and overriding third-party inline styles; comment those.
- Use `@layer` if the project already does, to order resets, base, components and utilities.
- Do not style by DOM position (`.list > div:nth-child(3) span`) when a class on the element would be clearer and survive markup changes.

**SCSS**
- Nest at most three levels, and mostly only for `&:hover`, `&--modifier`, `&__element` and media queries. Deep nesting produces over-specific selectors.
- Use `@use` and `@forward`, not the deprecated `@import`. Keep mixins and functions in partials and use them for real repetition, not single properties.
- Prefer CSS custom properties over SCSS variables for values that change at runtime (themes, dark mode).

**Layout and sizing**
- Use flexbox for one-dimensional layout and grid for two-dimensional layout. Use `gap` instead of margins on children for spacing between items. No floats or absolute positioning for page layout.
- Use `rem` for font sizes and most spacing, so user font settings work. Use `min()`, `max()` and `clamp()` for fluid sizing instead of many breakpoints.
- Avoid fixed heights on elements that contain text; let content set the height, with `min-height` if needed.
- Use logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) in new code so right-to-left layouts work.
- Write mobile-first media queries with the project's breakpoint variables, not new magic numbers.

**Accessibility and states**
- Never remove focus outlines without a visible replacement; style `:focus-visible`.
- Meet contrast with the token colours; do not lighten text for style.
- Respect `prefers-reduced-motion` for non-essential animation, and animate `transform` and `opacity` rather than layout properties.
- Style hover, focus, active, disabled and error states for interactive components together.

**Hygiene**
- Remove styles you made unused in the same change. Do not leave commented-out blocks.
- Use a `z-index` scale from tokens, not arbitrary large numbers.

**Before you finish**
- Run stylelint if the project has it, and check the change at a narrow and a wide viewport, with keyboard focus, and in dark mode if the app has one. Say what you checked.
