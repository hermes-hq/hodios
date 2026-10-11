---
schema: 1
id: audit-component-library-accessibility
kind: prompt
title: Audit a component library for accessibility
description: Audits a design system or component library component by component for semantics, keyboard, focus, states and docs, with a status per component and fixes ranked by reuse.
category: accessibility
version: 1.0.0
status: incubating
stage: [review, verify]
role: [frontend-engineer, designer, tech-lead]
requires: [repo-read]
inputs: [repo, file, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [ui-component-kit, component-audit, aria-apg, keyboard, storybook]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [build-aria-widget, write-accessibility-acceptance-criteria, prioritize-accessibility-findings]
args:
  - name: library
    description: The library's repository or source paths, the list of components, and where usage examples or docs live (for example Storybook).
    type: text
    required: true
  - name: framework
    description: The framework the components are written in.
    type: string
    default: react
  - name: usage_counts
    description: How widely each component is used across products, if known, to rank fixes.
    type: text
output_contract:
  format: markdown
  sections: [Inventory and status, Findings by component, Cross-cutting problems, Fix order, Documentation gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A defect in a shared component is copied into every screen that uses it, and a fix there is the cheapest accessibility win a company can make. Auditing a library is different from auditing a page: each component must be checked across all its variants, sizes and states, against the ARIA Authoring Practices pattern it claims to follow, and through its API. A component can render perfectly and still be inaccessible by design if its props let consumers omit a label, pass a `div` as a button, or turn off the focus ring. Documentation matters as much as code: consumers repeat whatever the examples show. Common library-level failures: icon buttons without a required name prop, custom selects and comboboxes that break the pattern, focus styles removed in a reset, colour tokens that fail contrast in one theme, tooltips as the only label, and modals that do not restore focus.
</context>

<task>
Audit this {{framework}} component library:

<library>
{{library}}
</library>
{{#usage_counts}}
Usage: {{usage_counts}}
{{/usage_counts}}

1. Build an inventory: each component, the native element or ARIA pattern it should follow, and its variants and states.
2. For each component, read the source and examples and check:
   - Semantics: correct element or role, name source, states and properties exposed.
   - Keyboard: every action reachable, expected keys for the pattern, no traps, focus order.
   - Focus: visible indicator in every theme, focus moved and restored where the pattern requires.
   - API: can a consumer omit the accessible name, override the element type unsafely, disable focus styles, or pass colour combinations that fail contrast? Prefer required props or development warnings.
   - Visual: contrast of text, borders and states from the tokens, target size, behaviour at 200% text and in forced colours.
   - Docs: does the documentation state the accessibility contract and show accessible usage?
3. Give each component a status: ready, usable with caveats, or blocked, with the reasons.
4. Pull out cross-cutting problems (focus reset, token contrast, a shared popover primitive) that fix many components at once.
5. Rank fixes by reach (usage) and severity. For the top items, give the code change or API change, and note breaking changes for consumers.
6. List documentation additions: per-component accessibility notes, do and do not examples, and what consumers must still provide.
</task>

<constraints>
- Base findings on the code and docs provided; mark anything you could not see as not checked, never as passing.
- Prefer API changes that make the accessible path the default over documentation that asks consumers to remember.
- Flag every proposed breaking change and suggest a deprecation path.
{{> output/uncertainty}}
</constraints>

<output_format>
## Inventory and status
Table: component | pattern | status | main issue.

## Findings by component
Per component: issues with WCAG criterion and evidence (file and line or example).

## Cross-cutting problems
Bullets with the shared fix.

## Fix order
Numbered list with reach, severity, the change and whether it breaks consumers.

## Documentation gaps
Bullets per component.
</output_format>
