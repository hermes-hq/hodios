---
schema: 1
id: structure-figma-component-library
kind: prompt
title: Structure a Figma component library
description: Plans how a Figma design-system library is organised, covering files and pages, properties versus variants, variables and modes, naming, publishing and consumer habits.
category: design-systems
version: 1.0.0
status: incubating
stage: [design, build]
role: [designer]
stack: [figma]
requires: [none]
inputs: [text, image]
output: [plan, docs, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [design-library, figma-variables, component-properties, library-publishing, design-handoff]
pairs_with:
  prompts: [audit-design-code-parity, define-design-tokens, measure-design-system-adoption]
  personas: [design-systems-lead, product-designer]
args:
  - name: system
    description: What the library holds or will hold (foundations, number of components, platforms, themes and brands), how many designers consume it, and your Figma plan tier if known.
    type: text
    required: true
  - name: problems
    description: Optional. What hurts today, e.g. "variant sets with 400 combinations", "people detach instances", "dark mode is a copy of every component".
    type: text
output_contract:
  format: markdown
  sections: [Summary, File structure, Page structure, Component construction, Variables and styles, Naming, Publishing and versioning, Consumer guidance, Migration steps, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Figma library's structure decides whether designers find the right component, whether updates reach them safely, and whether handoff names match code. The usual problems: one giant file that is slow and where every publish touches everything, or so many files that dependencies become a tangle; variant sets that multiply every option into hundreds of combinations when boolean, text and instance-swap component properties would keep them small; themes built as duplicated components instead of variable modes; base or helper components published by accident; names that differ from code so engineers guess; and detached instances because a needed option was missing. Feature availability (branching, library analytics, some variable limits) depends on the plan tier and changes over time, so a good plan says which features it relies on and asks the team to confirm them.
</context>

<task>
Plan the structure of this Figma library.

<system>
{{system}}
</system>
{{#problems}}

<problems>
{{problems}}
</problems>
{{/problems}}

1. **File structure.** How many library files and what goes in each (for example foundations with variables and styles, core components, platform-specific or pattern files, icons), why that split, and how files depend on each other. Weigh publish blast radius against dependency complexity.
2. **Page structure.** Pages inside a component file: a cover, a getting-started page, one page or section per component with its documentation, and a place for private building blocks.
3. **Component construction.** When to use variants and when to use boolean, text and instance-swap properties; nested instances and exposed properties; auto layout and min/max sizes so components resize like code; how states, sizes and themes are expressed. Show one component (for example a button) as a worked example with its properties.
4. **Variables and styles.** Collections for primitives and semantic tokens, modes for light, dark, brands or density, scoping so colour variables only appear where they belong, which primitives to hide from publishing, and what still needs styles (for example effects or type if variables do not cover it in their setup).
5. **Naming.** Component, property and variable names that match code component and prop names; how private components are hidden from publishing (a leading dot or underscore in the name).
6. **Publishing and versioning.** Who may publish, release notes on every publish, a cadence, use of branching for large changes if their plan includes it, and how breaking changes are announced.
7. **Consumer guidance.** Rules for product designers: accept updates promptly, do not detach (and how to request a missing option instead), use variables not raw values.
8. **Migration steps.** If problems were listed, a safe order for restructuring without breaking existing files, noting that moving or deleting published components affects instances in consumer files.
</task>

<constraints>
- Do not invent the team's components, variable names or plan tier. Mark features that depend on the plan tier or a recent Figma release as "confirm availability".
- Do not give click-by-click menu instructions; the interface changes often.
- Keep code naming alignment as a rule throughout.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. File structure as a table (File, Contents, Publishes, Depends on). The button worked example as a property table. Consumer guidance as a checklist. End with Open questions.
</output_format>
