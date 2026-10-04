---
schema: 1
id: tailwind-rules
kind: rule
title: Tailwind CSS rules
description: Standing rules for Tailwind CSS covering design tokens in the theme, class ordering, extracting components instead of repeated class strings, responsive and dark variants and visible focus states.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, designer]
stack: [tailwind]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: small
level: beginner
tags: [utility-css, design-tokens, dark-mode, responsive-design, focus-states]
applies_to: ["**/*.html", "**/*.jsx", "**/*.tsx", "**/*.vue", "**/*.svelte", "**/*.astro", "**/*.css", "tailwind.config.*"]
pairs_with:
  prompts: [migrate-styles-to-utility-css]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change styling in this Tailwind project:

**Know the setup first**
- Check the installed Tailwind major version and where the theme is defined: a CSS-first `@theme` block in the main stylesheet, or a `tailwind.config.*` file in older setups. Use the syntax of that version only.
- Read the theme before styling. Use the project's colours, spacing, font sizes, radii and shadows by their token names.

**Design tokens**
- Use theme tokens (`bg-brand-600`, `text-muted`, `rounded-card`) instead of arbitrary values (`bg-[#1f6feb]`, `p-[13px]`). If a value repeats and no token fits, add a token to the theme in the same change rather than repeating the arbitrary value.
- Arbitrary values are acceptable for one-off layout needs with no design meaning (a specific grid template, an exact aspect ratio), not for brand colours or spacing scale.
- Never use inline `style` attributes for things Tailwind can express.

**Class names**
- Write complete class names in source. Never build them by string concatenation or interpolation (`bg-${color}-500`): the build only generates classes it can find literally. Map variants to full class strings in an object instead.
- Keep class order consistent. If the project uses the official Prettier plugin for Tailwind, let it sort; otherwise order layout, box model, typography, visual, then state and responsive variants.
- Combine conditional classes with the project's helper (for example `clsx` with `tailwind-merge`, or a variants library) so conflicting utilities resolve predictably.

**Reuse**
- When the same long class list appears in three or more places, extract a component (or a partial in template languages) rather than copying it again. Prefer components to `@apply`; use `@apply` only for styling you cannot reach with markup, such as third-party HTML or prose content.
- Keep variant logic (size, intent, state) in one place per component.

**Responsive and dark mode**
- Design mobile first: unprefixed utilities for small screens, then `sm:`, `md:`, `lg:` overrides. Do not use `max-*` variants to undo desktop styles unless that is the project's pattern.
- If the project supports dark mode, every new colour on a surface, text or border gets its `dark:` counterpart (or uses semantic tokens that switch automatically). Check both themes.
- Use container queries when a component's layout depends on its container rather than the viewport, if the project's version supports them.

**Accessibility**
- Never remove focus outlines without a replacement. Every interactive element gets a visible focus style such as `focus-visible:ring-2 focus-visible:ring-offset-2` with a token colour of sufficient contrast.
- Keep text and background contrast at WCAG AA in both themes. Use `sr-only` for visually hidden labels, not `hidden`, which removes content from assistive technology.
- Respect `motion-reduce:` for non-essential animation and transitions.

**Before you finish**
- Run the build and check the generated CSS contains the classes you used. Look at the change at mobile and desktop widths, in light and dark mode, and tab through it with the keyboard.
