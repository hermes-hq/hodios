---
schema: 1
id: fix-color-only-information
kind: prompt
title: Fix information shown by colour alone
description: Finds places where status, errors, links, required fields or chart series are shown only by colour, and adds text, icons, patterns or underlines without breaking the design.
category: accessibility
version: 1.0.0
status: incubating
stage: [build, review]
role: [frontend-engineer, designer]
stack: [html-css]
requires: [repo-read, file-write]
inputs: [file, repo, image]
output: [code, report]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [use-of-color, colour-blindness, wcag-1-4-1, status-indicators, links]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [review-color-contrast, make-data-visualization-accessible, support-forced-colors-mode]
args:
  - name: target
    description: The pages, components or file paths to check, or screenshots with a description of what each colour means.
    type: text
    required: true
  - name: framework
    description: The UI framework or styling approach (CSS modules, Tailwind, styled components).
    type: string
output_contract:
  format: markdown
  sections: [Findings, Fixes, Things to check by eye]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WCAG 1.4.1 fails when colour is the only way to tell something apart. This is separate from contrast: a perfectly contrasting red and green still fail for about one in twelve men with red-green colour vision deficiency, for monochrome displays, for forced-colors modes and for screen readers, which do not speak colour at all. The common offenders: a status dot (green, amber, red) with no label; form errors shown only by a red border; required fields marked by a red label; links inside body text distinguished only by colour (they need an underline, or 3:1 contrast against surrounding text plus a non-colour cue on hover and focus); selected tabs or rows shown by background colour alone; diff views in red and green; charts whose legend relies on colour. Fixes, in order of preference: visible text, then an icon with a text alternative, then shape, pattern or position, and only as a supplement, colour. The text alternative must also reach screen readers, not only sighted users.
</context>

<task>
Find and fix information conveyed by colour alone in:

<target>
{{target}}
</target>
{{#framework}}
Framework or styling: {{framework}}
{{/framework}}

1. Search the code for colour-driven state: class names and tokens such as `error`, `danger`, `success`, `warning`, `active`, `selected`, `status-*`, conditional colour styles, link styles with `text-decoration: none`, and chart colour scales. List every place colour carries meaning; mark findings from screenshots as visual.
2. For each, say what the colour means and whether anything else (text, icon, shape, position, underline) already conveys it to sighted users and to screen-reader users.
3. Fix each failing case with the lightest change that fits the design: add a word ("Overdue"), an icon with an accessible name or visually hidden text, an underline for inline links, a border or check mark for selection, `aria-invalid` plus an error message for fields, "(required)" text or an asterisk explained at the top of the form, patterns or direct labels for chart series.
4. Prefer fixing shared components and tokens (a `StatusBadge`, a link style) over individual pages.
5. Check that fixes also work in forced-colors mode and in greyscale; describe how you checked or what to check.
6. Run existing tests and update snapshots only where the change is intended; report results.
</task>

<constraints>
- Do not report contrast ratios as colour-only failures; keep the two issues separate and point contrast to a contrast review.
- Do not remove colour; add a second cue.
- Do not invent screens or components that are not in the target.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: location | what colour means | other cue today | fails 1.4.1 (yes or no) | fix.

## Fixes
Diffs with file paths, shared components first.

## Things to check by eye
Bullets: greyscale view, forced colors, and any screenshots that need a human to confirm.
</output_format>
