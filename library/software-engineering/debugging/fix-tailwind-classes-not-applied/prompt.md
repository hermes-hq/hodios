---
schema: 1
id: fix-tailwind-classes-not-applied
kind: prompt
title: Fix Tailwind classes not being applied
description: Fixes Tailwind classes that have no effect, tracing source detection, dynamically built class names, v3 versus v4 setup, layer order, conflicting classes and specificity in the generated CSS.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [tailwind]
requires: [repo-read, file-write, shell]
inputs: [file, config, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [class-generation, utility-classes, content-detection, build-config, specificity]
pairs_with:
  prompts: [fix-css-layout-bug, upgrade-tailwind-to-v4, fix-frontend-build-error]
  personas: [frontend-engineer]
args:
  - name: problem
    description: Which classes do not apply, where (element, component, page), whether it happens in dev, production or both, and what the browser's inspector shows for the element.
    type: text
    required: true
  - name: setup
    description: Tailwind version, framework and bundler, and the relevant config (tailwind.config, the main CSS file with its @import or @tailwind lines, PostCSS or Vite plugin), or their paths.
    type: text
output_contract:
  format: markdown
  sections: [Is the CSS generated, Cause, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who debugs Tailwind by first answering one question: is the utility in the generated CSS at all? Tailwind generates only classes it finds as complete strings in scanned source files, so the two families of bugs are "not generated" and "generated but overridden".

Not generated:
- Class names built at runtime (`` `text-${color}-500` ``, `"w-" + size`) are never found. Map values to complete class strings (`{ red: "text-red-500" }`) or safelist them (v3 `safelist`, v4 `@source inline(...)`).
- Files not scanned: in v3 the `content` globs miss the folder, file extension, a monorepo package or a component library in `node_modules`; in v4 automatic detection skips git-ignored paths and some locations, and `@source "../path"` adds them.
- Setup mismatch between versions: v4 uses `@import "tailwindcss";` in CSS with the `@tailwindcss/vite` or `@tailwindcss/postcss` plugin and configures theme with `@theme` in CSS (a legacy JS config is read only when loaded with `@config`); v3 uses `@tailwind base; @tailwind components; @tailwind utilities;` with `tailwind.config.js` and the `tailwindcss` PostCSS plugin. Mixing them (v4 installed with a v3 config that is no longer read, or the CSS file not imported by the app) produces no utilities or none of the custom theme values.
- Custom values not defined: a `bg-brand` class with no `brand` color in the theme, or arbitrary values with spaces (`w-[calc(100%-2rem)]` needs no spaces, or underscores).

Generated but overridden:
- Two conflicting utilities on one element (`p-2 p-4`): the order in CSS wins, not the order in the class attribute. `tailwind-merge` resolves this in component libraries that accept a `className` prop.
- Unlayered custom CSS or a third-party stylesheet beats utilities; in v4 utilities live in cascade layers, and unlayered styles always win over layered ones.
- Inline styles, `!important` in other CSS, or a more specific selector.
- Variants not applying: `dark:` needs the configured dark mode strategy (media versus class or a custom variant), and `hover:` does not apply on touch devices.
</context>

<task>
Fix this Tailwind problem.

{{problem}}
{{#setup}}

Setup:
{{setup}}
{{/setup}}

1. Read the CSS entry file, the Tailwind and PostCSS or Vite config, the package versions, and the component using the class.
2. Decide whether the utility is generated: check the built CSS or the inspector's styles panel for the rule. If you cannot see it, tell the user exactly where to look and what each outcome means.
3. If it is not generated, check in order: dynamic class construction, scanned paths, the version-specific setup and imports, theme definitions and arbitrary value syntax.
4. If it is generated but overridden, find the winning rule in the inspector: conflicting utilities, unlayered or third-party CSS, specificity, inline styles, or variant configuration.
5. Apply the smallest fix, restart the dev server if config changed, and check the class in dev and in a production build.
</task>

<constraints>
- Do not add `!important` modifiers or inline styles to win a conflict before identifying the conflicting rule.
- Do not safelist broad patterns when the class names can be written as complete strings.
- Do not mix v3 and v4 configuration styles; follow the installed version.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Is the CSS generated
Whether the utility appears in the output CSS, and how that was checked.
## Cause
The specific reason.
## Fix
The diff.
## Verification
Dev and production build checks.
</output_format>
