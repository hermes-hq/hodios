---
schema: 1
id: upgrade-tailwind-to-v4
kind: prompt
title: Upgrade Tailwind CSS from v3 to v4
description: Upgrades a project from Tailwind CSS v3 to v4, moving configuration into CSS, handling renamed and removed utilities, changed defaults, plugins and the new browser support floor.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [tailwind]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [tailwind-v4, css-config, breaking-changes, visual-regression]
pairs_with:
  prompts: [upgrade-major-dependency, migrate-styles-to-utility-css, extract-tailwind-components]
args:
  - name: notes
    description: "Anything known: current Tailwind version, build setup (Vite, PostCSS, Next.js, CLI), tailwind.config contents, plugins, Sass use, browsers you must support."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Blockers, Changes made, Visual check, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tailwind v4 is a rewrite, and most of the upgrade pain is silent visual change rather than build errors. What experienced people check: configuration moves into CSS (`@import "tailwindcss"` replaces the three `@tailwind` directives, theme values live in `@theme` as CSS variables, and a JavaScript config still works only when loaded explicitly with `@config`); the PostCSS plugin and CLI are separate packages, and a dedicated Vite plugin exists; content paths are detected automatically, with `@source` for anything outside the project root; several utilities were renamed down one step (the old `shadow-sm` is now `shadow-xs`, plain `shadow` is now `shadow-sm`, the same for `rounded`, `blur` and `drop-shadow`), `outline-none` became `outline-hidden`, opacity utilities such as `bg-opacity-*` are gone in favour of `/50` modifiers, and `flex-shrink-*` style aliases are removed; defaults changed (border and divide colour is `currentColor` instead of a grey, `ring` is 1px instead of 3px, placeholder colour, button cursor); the important modifier moves to the end of the class; custom classes in `@layer components` or `utilities` become `@utility` declarations; and the `theme()` function gives way to CSS variables. v4 also needs modern browsers (it uses cascade layers, `@property` and `color-mix()`), and it is not designed to run behind Sass, Less or Stylus. The official upgrade tool handles much of this, but it cannot see class names built from strings at runtime.
</context>

<task>
Upgrade this project from Tailwind CSS v3 to v4.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the setup: Tailwind and PostCSS config, CSS entry files, build tool, any Sass or CSS-in-JS, plugins (official and third party), and places where class names are built dynamically (string concatenation, maps, CMS content, `clsx` helpers).
2. Check blockers first: the browsers the project must support against v4's floor, Sass or Less pipelines, and third-party plugins with no v4 version. If the browser floor is a problem, stop and report it; staying on v3 can be the right answer.
3. Capture a baseline: production build output size and screenshots (or a list of key pages and components to compare) before any change.
4. Create a branch and run the official upgrade tool if the environment allows (it needs a recent Node version). Review its diff by hand rather than trusting it.
5. Finish what the tool missed: move theme extensions into `@theme` or keep the JS config behind `@config` on purpose, convert custom layer classes to `@utility`, replace `theme()` calls, and fix renamed utilities in dynamically built class strings, templates in other languages and content stored outside the source tree.
6. Decide on changed defaults explicitly: either add the documented compatibility styles (for example a base border colour) or accept the new look, and record which.
7. Build, run the tests, and compare the key pages against the baseline. List every visual difference found and whether it was fixed or accepted.
</task>

<constraints>
- Never mass-replace class names with a regex without reading each match; renamed utilities shift meaning (old `shadow-sm` and new `shadow-sm` are different shadows).
- Do not drop browser support silently; the browser floor is the user's decision.
- Do not invent utility names or config keys; check the official upgrade guide for anything you are unsure of.
- Keep the upgrade separate from redesign or class clean-up.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Versions, build setup, plugins, dynamic class patterns found.
## Blockers
Browser support, preprocessors and plugins, each with a decision.
## Changes made
Packages, CSS entry, theme and config, renamed utilities (count and where), default-change decisions.
## Visual check
Pages or components compared, differences found and how each was resolved.
## Follow-ups
Remaining manual checks, plugins to replace later.
</output_format>
