---
schema: 1
id: extract-tailwind-components
kind: prompt
title: Extract repeated Tailwind class strings
description: Turns long Tailwind class strings repeated across templates into components or variant helpers, keeping the rendered classes and visuals identical and avoiding @apply sprawl.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [tailwind]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [utility-css, class-variants, duplicate-markup, component-extraction]
pairs_with:
  prompts: [consolidate-duplicate-ui-components, reduce-duplication]
  rules: [tailwind-rules]
args:
  - name: target
    description: The templates or components with repeated class strings, as paths or pasted code, and the framework (React, Vue, Svelte, Blade, ERB, plain HTML).
    type: text
    required: true
  - name: test_command
    description: The command that runs tests or visual snapshots, if any.
    type: string
output_contract:
  format: markdown
  sections: [Repeated patterns, Extraction choice, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a frontend engineer who uses Tailwind as intended. Tailwind's own guidance is that repetition is handled by the template system, not by CSS: extract a component or partial when the same element with the same classes appears in several places, and use a loop when it repeats in one place. `@apply` in a stylesheet is a last resort for things you cannot componentise (third-party markup, prose content); used widely it recreates the naming and specificity problems utility CSS was meant to avoid.

For elements with variants, a small variant helper (a plain object lookup, or the project's existing `cva`, `tailwind-variants` or `clsx` plus `tailwind-merge` setup) keeps base classes in one place and variant classes keyed by name. Traps that change output: the content scanner only finds class names written in full in source files, so building names by concatenation (`'bg-' + color + '-500'`) makes them disappear from the generated CSS; conflicting utilities (`p-2` and `p-4`) resolve by stylesheet order, not by order in the class string, unless `tailwind-merge` is used, so merging a caller's `className` can silently change padding; and responsive, dark and state prefixes (`md:`, `dark:`, `hover:`) must be carried over exactly.
</context>

<task>
Extract the repeated class strings in {{target}}.

1. Find repeated or near-repeated class strings and group them by the element they style (button, card, badge, form field). For near-repeats, list the differing classes and whether each difference is a real variant or drift.
2. For each group choose the extraction: a component or partial (preferred), a variant helper for elements with several looks, or `@apply` only where markup cannot be componentised. Use the class-merging tools the project already has; do not add a new one without saying so.
3. Extract, keeping every class name written in full so the content scanner sees it, and keeping prefixes and ordering-sensitive conflicts resolved the same way. Where callers pass extra classes, decide and state how conflicts merge.
4. Replace the call sites, then verify the rendered class lists are identical for each call site (compare rendered HTML or snapshots){{#test_command}} and run `{{test_command}}`{{/test_command}}. Run the production build to confirm no utility disappeared from the generated CSS.
</task>

<constraints>
- The rendered visuals must be identical; drift between near-repeats is reported, not silently unified.
- Never build class names by string concatenation or interpolation.
- Do not convert utilities into a large custom stylesheet with @apply.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Repeated patterns
Table: element, class string, occurrences, drift.
## Extraction choice
Per group: component, variant helper or @apply, and why.
## Diff
The change.
## Check
Rendered-class comparison, build and tests.
</output_format>
