---
schema: 1
id: audit-component-duplication
kind: prompt
title: Audit duplicate UI components in code
description: Finds near-duplicate UI components and one-off variants in a codebase, groups them by role, and proposes a consolidation plan with migration effort, without changing any code.
category: design-systems
version: 1.0.0
status: incubating
stage: [review, plan]
role: [frontend-engineer, designer, tech-lead]
requires: [repo-read, shell]
inputs: [repo]
output: [report, table, plan]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [duplicate-components, consolidation, component-inventory, refactoring-plan, ui-debt]
pairs_with:
  prompts: [audit-design-consistency, measure-design-system-adoption, write-component-spec, audit-hardcoded-styles-against-tokens]
  personas: [design-systems-lead]
args:
  - name: repo_path
    description: Path to the repository or monorepo root to analyse.
    type: string
    required: true
  - name: framework
    description: UI framework and styling approach, for example "React with styled-components", "Vue 3 SFCs", "Angular", "SwiftUI", "Jetpack Compose".
    type: string
    required: true
  - name: component_dirs
    description: Folders or globs where components live, one per line, for example "packages/ui/src" and "apps/*/src/components". Leave empty to discover them.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Method, Duplicate groups, One-off variants, Consolidation plan, Risks, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Codebases that grew across teams end up with four buttons, three modals and a dozen card-like boxes, each with slightly different props, styles and accessibility behaviour. A visual audit of screens (audit-design-consistency) shows the symptom; this audit finds the cause in code: which components duplicate each other, where they are used, how they differ, and what it would take to merge them. Name matching alone misleads: `Button`, `Btn`, `PrimaryAction` and `CTA` may be one role, while two components named `Card` may be different things. Grouping must look at the rendered element, the props interface, the styling and the behaviour.
</context>

<task>
Audit {{repo_path}} ({{framework}}) for duplicate and near-duplicate UI components. This is a read-only analysis: do not modify, create or delete any source file.

{{#component_dirs}}Component locations:
{{component_dirs}}
{{/component_dirs}}
1. **Discover.** If no locations were given, find component folders and files by the framework's conventions. Exclude tests, stories, generated code, node_modules and vendored code. List what you scanned.
2. **Inventory.** For each component, record: name, path, the root element or primitive it renders, its props or inputs with types, styling source, the interactive behaviour (click, keyboard, focus trap, portal), accessibility attributes, and its number of import sites (count with search tools such as ripgrep, and include re-exports).
3. **Group by role.** Cluster components that serve the same UI role (button, link-as-button, text input, select, modal or dialog, drawer, tooltip, card, badge or tag, alert or toast, tabs, table, avatar, icon, layout primitives). Use evidence: the same root element, overlapping props (similar names such as `variant`, `kind`, `type`), similar styles, similar markup structure, and similar usage contexts. Record the evidence for each grouping and a confidence (high, medium, low).
4. **Compare within each group.** Show a difference matrix: props supported, visual variants, states handled, accessibility behaviour (for example, which modal traps focus and restores it, which button handles `disabled` and loading correctly), and test coverage. Identify the strongest candidate to keep, or note that none is good enough and the group needs a new system component.
5. **One-off variants.** Find components that wrap a shared component only to change one style or prop, and local copies of a design-system component (similar name and structure to a component in the shared package).
6. **Consolidation plan.** For each group: the target component, the props or variants it must gain to cover the others, a mapping from each duplicate's props to the target's API, the number of call sites to migrate, an effort estimate in t-shirt sizes with the reason, the risk (visual change, behaviour change, test gaps), and a suggested order that starts with high-use, low-risk groups. Suggest codemod candidates where the prop mapping is mechanical.
7. **Verify.** Re-run the import counts for the top five groups to confirm them, and spot-check two groups by opening the files to confirm they really share a role.
</task>

<constraints>
- Read-only. Shell use is limited to listing, searching and reading files and running existing analysis scripts; do not run builds that write output into the source tree, and do not install anything.
- Report actual counts from the search; do not estimate usage.
- Mark low-confidence groupings clearly so the reader can check them.
- Do not recommend deleting a component that has no evidence of duplication just because it is rarely used.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Summary
Components scanned, duplicate groups found, call sites affected, and the top three consolidations by value.
## Method
Folders scanned, exclusions and the grouping evidence used.
## Duplicate groups
Per group: a table (Component, Path, Root element, Key props, Import sites, A11y notes), the difference matrix, the recommended target and confidence.
## One-off variants
| Component | Wraps or copies | Difference | Suggested handling |
## Consolidation plan
| Order | Group | Target | API changes | Call sites | Effort | Risk | Codemod? |
## Risks
Behaviour or accessibility differences that a migration could break.
## Verification
Searches re-run and spot checks, with their results.
</output_format>
