---
schema: 1
id: audit-design-code-parity
kind: prompt
title: Audit design-to-code component parity
description: Compares a design library's components with their coded counterparts, finding mismatched names, variants, props, states and tokens and missing components, and plans how to realign them.
category: design-systems
version: 1.0.0
status: incubating
stage: [review]
role: [designer, frontend-engineer]
requires: [repo-read]
inputs: [repo, text, image]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [design-code-parity, design-handoff, component-inventory, design-library, drift]
pairs_with:
  prompts: [structure-figma-component-library, audit-component-duplication, write-component-spec]
  personas: [design-systems-lead]
args:
  - name: design_inventory
    description: The design library's components with their variants and properties, e.g. an export or a pasted list such as "Button - variant primary|secondary|ghost, size sm|md|lg, icon true|false, state default|hover|disabled".
    type: text
    required: true
  - name: repo_path
    description: Path to the component code, e.g. "packages/ui".
    type: string
    required: true
  - name: component_dirs
    description: Optional. Folders or globs where components live, if not obvious.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Method, Component matching, Mismatches, Missing on one side, Source of truth decisions, Plan, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Design libraries and component code drift apart quietly. Designers add a "tertiary" button that code never got, engineers add a `loading` prop that design never drew, states like focus and disabled exist only on one side, names differ (`Primary` versus `solid`, `Modal` versus `Dialog`), and design uses raw values where code uses tokens. Each mismatch costs a handoff conversation or, worse, a one-off implementation. A parity audit matches components across both sides, compares names, variants and properties, states and token use, and then decides case by case which side is right: code is usually the truth for behaviour and API, design for visual intent, but neither is always right. Mapping tables that link design components to code (some design tools offer this directly) keep the two aligned afterwards.
</context>

<task>
Audit parity between this design inventory and the code in {{repo_path}}. Do not change any files.

<design_inventory>
{{design_inventory}}
</design_inventory>
{{#component_dirs}}

<component_dirs>
{{component_dirs}}
</component_dirs>
{{/component_dirs}}

1. **Method.** Find components in the code (exports, folders, stories), and read each one's props, variants and states from its types or definitions. State what you read and what you could not.
2. **Component matching.** Match design components to code components by name and purpose; record confidence for matches that are by purpose only.
3. **Mismatches.** For each matched pair, a row per difference: naming (component, property and value names), variants and sizes, properties without a counterpart, states (focus, disabled, loading, error, selected), token use where visible (raw values in code), and behaviour that design cannot show.
4. **Missing on one side.** Components only in design and components only in code, with a guess at why (deprecated, in progress, local to a product).
5. **Source of truth decisions.** For each mismatch, recommend which side should change and why, or mark it as a decision for the team.
6. **Plan.** Fixes grouped and ordered by impact (how often the component is used and how confusing the mismatch is), separated into design changes and code changes, plus a mapping table to maintain going forward.
7. If the design inventory is too thin to compare (names only, no variants), say what export is needed and compare only what is possible.
</task>

<constraints>
- Read only. Do not modify code or design files.
- Do not guess design properties that the inventory does not state; never infer design values from code.
- Distinguish confirmed mismatches from suspected ones.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Component matching and mismatches as tables (Component, Aspect, Design, Code, Recommendation, Confidence). End with Open questions.
</output_format>
