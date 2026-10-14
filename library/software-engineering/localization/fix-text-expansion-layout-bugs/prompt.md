---
schema: 1
id: fix-text-expansion-layout-bugs
kind: prompt
title: Fix layout bugs caused by longer translations
description: Fixes truncation, overflow, clipped glyphs and broken alignment that appear when UI text is translated or pseudo-localized, using flexible layout instead of per-language hacks.
category: localization
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, mobile-engineer, designer]
requires: [repo-read, file-write]
inputs: [file, image, text]
output: [diff, report]
risk: edits-files
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [text-expansion, responsive-layout, truncation]
pairs_with:
  prompts: [pseudo-localize-ui, plan-rtl-support]
args:
  - name: issues
    description: The layout problems found, with screenshots or descriptions, the locales they appear in, and the affected components or files.
    type: text
    required: true
  - name: platform
    description: UI platform, for example "web with CSS", "React Native", "SwiftUI", "Jetpack Compose", "Flutter".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Diagnosis, Fixes, Copy and design escalations, Regression checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Translated text is longer, taller or harder to break than English. German and Finnish compounds have no break points, short labels such as "Save" can triple in length, and scripts such as Thai, Devanagari and Vietnamese need more line height for stacked marks. Teams fix each report by shrinking the font for one language, adding a `:lang(de)` width override or asking translators to abbreviate. The durable fix is in the layout: containers that grow, wrap and align on content rather than fixed widths and heights; buttons that wrap or stack; truncation only where the full text is still reachable; and line heights and paddings that do not clip. Thai and other languages without spaces need line breaking that a browser or OS only does when the element has the correct `lang`.
</context>

<task>
Fix these layout issues on {{platform}}:

{{issues}}

1. For each issue, find the cause in code: fixed width or height, `white-space: nowrap`, absolute positioning, a single-line constraint, fixed-height rows, a tight `line-height` or `overflow: hidden`, side-by-side elements with no wrap, or a missing `lang` attribute.
2. Fix with flexible layout for the platform: intrinsic sizing (`min-width`/`max-width`, `fit-content`, flex or grid with wrapping), multi-line labels, buttons that stack vertically when they do not fit, tables that scroll horizontally, and `overflow-wrap: anywhere` or `hyphens: auto` with the right `lang` for long words. On native platforms use the equivalent (`lineLimit(nil)`, `fixedSize`, `Modifier.weight`, `Flexible`, `ConstraintLayout` chains).
3. Truncate only where space is truly fixed (tabs, table cells, navigation), and keep the full text reachable through a tooltip, accessibility label or detail view.
4. Fix vertical clipping: use unitless line height, avoid fixed heights on text containers, and check fallback fonts for tall scripts.
5. Do not add per-language overrides unless the issue is truly script-specific (for example line height for Thai); when you do, key them on `lang`, not on the locale code of the whole app.
6. Where layout cannot reasonably fit the text (a fixed-size hardware screen, an app store image), escalate to copy or design with the character budget per string instead of forcing a fix.
7. Add regression checks: a pseudo-localized or longest-locale screenshot test or story for each fixed component.
</task>

<constraints>
- Do not shrink font sizes below the platform's accessibility minimum to make text fit.
- Do not ask translators to abbreviate as the first fix.
- Keep the English layout visually unchanged unless it was also broken; say when it changes.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
| Issue | Locale | Cause | File |

## Fixes
Diff per component, with a one-line reason.

## Copy and design escalations
Strings that need a character budget, with the budget.

## Regression checks
Tests or stories added.
</output_format>
