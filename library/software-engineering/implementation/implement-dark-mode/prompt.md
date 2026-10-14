---
schema: 1
id: implement-dark-mode
kind: prompt
title: Implement dark mode without a flash
description: Implements light, dark and system themes with CSS custom properties, a persisted toggle, an inline script that prevents the wrong-theme flash on load, and correct form controls.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [html-css]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [dark-mode, theming, css-variables, prefers-color-scheme, design-tokens]
args:
  - name: app
    description: The app and how it is built, for example "Next.js with Tailwind", "Vite React with CSS modules", "server-rendered Django templates".
    type: text
    required: true
  - name: palette
    description: Dark colours from a designer, if any. Leave empty to derive a first pass from the light theme for review.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Changes, Tests, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dark mode done quickly shows the light theme for a split second on every load, because the saved choice is read by JavaScript after the page paints. Other common misses: only two states, so users cannot go back to "follow the system"; hard-coded colours scattered in components that the theme never reaches; native inputs, scrollbars and date pickers staying light because `color-scheme` was not set; server-rendered HTML that disagrees with the client and causes a hydration warning; pure black backgrounds with pure white text that strain the eyes; and shadows, borders and images that disappear on dark surfaces.
</context>

<task>
Add dark mode to this app:

{{app}}

{{#palette}}
Dark palette: {{palette}}
{{/palette}}

1. Read the styling setup: CSS variables or design tokens, Tailwind config and version, CSS-in-JS, component library theming, and how many hard-coded colours exist (search for hex, `rgb(` and Tailwind colour classes).
2. Define semantic tokens (background, surface, text, muted text, border, primary, danger, focus ring) as CSS custom properties on `:root`, with dark values under `[data-theme="dark"]` and under `@media (prefers-color-scheme: dark)` scoped to `:root:not([data-theme="light"])`, so an explicit light choice still wins on a dark system. With Tailwind, use the class or selector dark variant tied to the same attribute (v4 uses `@custom-variant`; v3 uses `darkMode: 'class'` or `'selector'`).
3. Support three choices: light, dark, system. Store the explicit choice in `localStorage` (and a cookie if the server renders theme-dependent markup); "system" removes the override.
4. Prevent the flash: add a tiny inline script in `<head>`, before stylesheets render, that reads the stored choice and sets `data-theme` and `style.colorScheme` on `<html>`. Wrap it in try/catch for blocked storage. In React SSR frameworks, add `suppressHydrationWarning` on `<html>` only.
5. Set `color-scheme: light dark` (or per theme) so native controls and scrollbars match, and update `<meta name="theme-color">` if the app uses it.
6. Replace hard-coded colours in shared components with tokens. For many one-off colours in pages, fix the shared ones and list the rest as follow-ups.
7. Adjust for dark surfaces: off-black backgrounds, elevation shown by lighter surfaces rather than shadows, borders that remain visible, images or logos with dark variants, charts with dark-safe colours. Check text contrast meets WCAG AA (4.5:1 body, 3:1 large text and UI parts).
8. Build an accessible toggle (button or radio group with a label, current state announced) and listen for system changes while on "system".
9. Write tests for the toggle logic and stored choice, and visually check key pages in both themes if the project has screenshot tests. Run tests and the build.
</task>

<constraints>
- Do not invent brand colours as final; if no palette was given, mark derived dark values as a first pass for design review.
- Do not rely on `filter: invert()` for the whole page.
- Do not block rendering with anything heavier than the tiny inline script.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
Token strategy, storage, flash prevention, framework-specific notes.

## Changes
One line per file: `path`, what changed.

## Tests
One line per test or check.

## Verification
Commands run and their real results, plus contrast checks done.

## Follow-ups
Remaining hard-coded colours or assets needing dark variants, or "None".
</output_format>
