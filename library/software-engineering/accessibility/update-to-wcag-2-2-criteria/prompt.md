---
schema: 1
id: update-to-wcag-2-2-criteria
kind: prompt
title: Close the gap from WCAG 2.1 to WCAG 2.2
description: Checks a product that targeted WCAG 2.1 AA against the success criteria added in WCAG 2.2, including focus not obscured, target size, dragging and accessible authentication, and plans fixes.
category: accessibility
version: 1.0.0
status: incubating
stage: [verify, plan]
role: [frontend-engineer, qa-engineer, tech-lead]
requires: [repo-read]
inputs: [repo, file, text, url]
output: [report, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [wcag-2-2, gap-analysis, target-size, focus-not-obscured, accessible-authentication]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [audit-web-accessibility, audit-motor-accessibility, review-cognitive-accessibility, write-accessibility-conformance-report]
args:
  - name: product
    description: The product, its key flows (login, checkout, forms, dashboards), the codebase or file paths if available, and the latest WCAG 2.1 audit results if any.
    type: text
    required: true
  - name: target_level
    description: The conformance level aimed for.
    type: string
    default: AA
output_contract:
  format: markdown
  sections: [What changed in 2.2, Gap findings, Fix plan, Checks to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
WCAG 2.2 (a W3C Recommendation since October 2023) adds nine success criteria to 2.1 and removes one, 4.1.1 Parsing, which is now treated as always satisfied. At level A: 3.2.6 Consistent Help (help mechanisms in the same relative order across pages) and 3.3.7 Redundant Entry (do not make people re-enter information already given in the same process). At AA: 2.4.11 Focus Not Obscured (Minimum) (a focused element is not entirely hidden by sticky headers, cookie bars or chat widgets), 2.5.7 Dragging Movements (a single-pointer alternative to every drag), 2.5.8 Target Size (Minimum) (24 by 24 CSS px or enough spacing, with exceptions for inline links and equivalents), and 3.3.8 Accessible Authentication (Minimum) (no cognitive function test such as remembering a password or solving a puzzle without an alternative; allowing paste and password managers satisfies it for passwords). At AAA: 2.4.12 Focus Not Obscured (Enhanced), 2.4.13 Focus Appearance and 3.3.9 Accessible Authentication (Enhanced). A product that met 2.1 AA usually fails 2.2 AA on sticky elements covering focus, small icon buttons, drag-only interactions, login forms that block paste, and the same details asked for twice in one process (whether a "confirm your email" field fails 3.3.7 is debated, so flag it for a decision rather than as a clear failure). Most procurement and many regulations still reference 2.1 or EN 301 549, but 2.2 is becoming the expected target.
</context>

<task>
Check this product against the WCAG 2.2 additions at level {{target_level}}.

<product>
{{product}}
</product>

1. Summarise the new criteria that apply at {{target_level}} (and below) in a short table, and note the removal of 4.1.1.
2. For each applicable new criterion, inspect the code or the described flows: sticky and fixed elements that can cover focus (headers, footers, cookie banners, chat launchers); interactive targets under 24 by 24 px and their spacing (icon buttons, pagination, close buttons, inline controls); every drag interaction (sliders, sortable lists, maps, file drop, kanban); authentication steps (paste blocked, `autocomplete` missing on username and password, captchas, memorised codes); repeated information requests within a process; and the placement of help, contact and chat links across pages.
3. Record each finding with location, criterion, evidence (code reference or description) and whether it is confirmed or needs testing.
4. Propose a concrete fix for each, preferring shared components (one IconButton size fix rather than fifty).
5. Build a fix plan ordered by user impact and effort, with owners left blank for the team.
6. List automated checks and lint rules that can guard these criteria (target size checks, `scroll-padding` for sticky headers, a test that paste works on login) and what still needs manual testing.
</task>

<constraints>
- Do not re-audit all of WCAG; stay on the 2.2 changes unless something critical is obvious, and then list it separately.
- Mark findings as confirmed only with code or test evidence.
- Do not state legal requirements for a particular country; say which standard a regulator references only if the user asks, and recommend checking it.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What changed in 2.2
Table: criterion | level | one-line meaning.

## Gap findings
Table: criterion | location | evidence | confirmed or needs testing | fix.

## Fix plan
Numbered, ordered by impact and effort.

## Checks to add
Bullets: automated guard or manual check per criterion.
</output_format>
