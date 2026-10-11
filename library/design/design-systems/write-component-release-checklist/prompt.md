---
schema: 1
id: write-component-release-checklist
kind: prompt
title: Write a component release checklist
description: Writes the definition of done a design-system component must meet before release, covering design, code, accessibility, content, docs, tests and design-code parity, with evidence and owners.
category: design-systems
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [designer, frontend-engineer, qa-engineer, tech-lead]
requires: [none]
inputs: [text, notes]
output: [checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [definition-of-done, quality-gates, release-readiness, component-quality, maturity-levels]
pairs_with:
  prompts: [write-component-spec, write-accessibility-acceptance-criteria, write-screen-reader-test-plan]
  personas: [design-systems-lead, accessibility-specialist]
args:
  - name: system
    description: Platforms, frameworks, design tool, test tooling, docs site, and who works on components (designers, engineers, accessibility specialists).
    type: text
    required: true
  - name: maturity_levels
    description: Optional. Your status labels, e.g. "experimental, beta, stable, deprecated", if you want a lighter checklist for early stages.
    type: string
  - name: current_problems
    description: Optional. What slips through today, e.g. "components ship without dark mode", "docs written after release", "Figma and code variants differ".
    type: text
output_contract:
  format: markdown
  sections: [Summary, Checklist, Accessibility checks, Evidence required, Owners, Maturity levels, How to use it, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Release checklists fail when items are vague ("accessible", "documented", "tested") because nobody can tell whether they are done, or when they are so long that people tick boxes without checking. A useful definition of done lists items a reviewer can verify from evidence: the keyboard map was tested and recorded, the component was checked with named screen reader and browser pairs, every state exists in both design and code, tokens are used instead of raw values, text expansion and right-to-left were checked, docs include when not to use the component. Automated accessibility scanners catch only a fraction of real issues, so manual checks stay on the list. Stage-appropriate checklists (lighter for experimental, full for stable) keep the bar high without blocking early feedback.
</context>

<task>
Write the release checklist for this design system.

<system>
{{system}}
</system>
{{#maturity_levels}}
Maturity levels: {{maturity_levels}}.
{{/maturity_levels}}
{{#current_problems}}

<current_problems>
{{current_problems}}
</current_problems>
{{/current_problems}}

1. **Checklist.** Grouped by area: design (all variants, sizes and states in the design library, using variables), code (API reviewed, tokens only, themes, responsive and container behaviour, right-to-left, text expansion of 30 to 40 percent), content (labels, length limits), documentation (usage, when not to use, examples, props generated or checked against code), tests (unit, interaction, visual regression per theme, automated accessibility), parity (design and code names, variants and props match), and release (changelog entry, version bump, announcement). Each item must be verifiable.
2. **Accessibility checks.** Manual checks with evidence: keyboard map, focus visible and not obscured, screen reader checks with pairs the context supports (for example VoiceOver with Safari, NVDA with Firefox or Chrome, TalkBack on Android), zoom and reflow, forced colors, reduced motion, contrast, target size. State that passing an automated scan is not enough.
3. **Evidence required.** For each item, the artefact a reviewer looks at (a recorded keyboard map, screenshots, a test report, a linked story).
4. **Owners.** Who completes and who signs off each group, by role.
5. **Maturity levels.** If levels were given, mark which items apply at each level.
6. **How to use it.** Where the checklist lives (a pull request template, a ticket template), when it is checked, and how exceptions are recorded and followed up.
7. Address each current problem with the item that would have caught it.
</task>

<constraints>
- Every item must be checkable with evidence; rewrite any vague item.
- Keep the stable-level checklist to what is needed; flag items that could be automated.
- Do not name tools the context does not mention as if the team uses them; suggest them as options.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. The checklist as Markdown task lists grouped by area. Evidence and owners as a table (Item, Evidence, Done by, Signed off by). End with Open questions.
</output_format>
