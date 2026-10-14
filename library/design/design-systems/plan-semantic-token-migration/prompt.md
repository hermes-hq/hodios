---
schema: 1
id: plan-semantic-token-migration
kind: prompt
title: Plan a migration to semantic tokens
description: Plans moving a codebase from primitive colour tokens to a semantic token layer by reading actual usages, mapping each to a role, isolating ambiguous cases and phasing codemods.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [frontend-engineer, designer, tech-lead]
requires: [repo-read]
inputs: [repo, config]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [semantic-tokens, design-tokens, codemods, theming, token-migration]
pairs_with:
  prompts: [define-design-tokens, audit-hardcoded-styles-against-tokens, design-dark-mode]
  personas: [design-systems-lead]
args:
  - name: repo_path
    description: Path to the repository or package to analyse.
    type: string
    required: true
  - name: token_source
    description: Path to the token definitions, e.g. "packages/tokens/src". Include the semantic layer if one exists, even if partial.
    type: string
    required: true
  - name: scope
    description: Optional. Folders to include or exclude, token categories in scope (colour only, or colour plus spacing), and the goal (for example "enable dark mode").
    type: text
output_contract:
  format: markdown
  sections: [Summary, Current usage, Mapping rules, Ambiguous cases, Missing semantic tokens, Migration phases, Automation, Verification, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Code that references primitives (`blue-600`, `gray-500`) cannot be re-themed: dark mode, a new brand or a contrast fix means editing every usage. Moving to semantic tokens (`color.text.secondary`, `color.border.default`) cannot be done by value alone, because the same primitive plays different roles: `gray-500` is secondary text in one place, a border in another and a disabled icon in a third, and each needs a different semantic token that will diverge in dark mode. Good migrations map by context (the CSS property or platform attribute, the component, the state), automate only the unambiguous pairs, send the ambiguous ones to a person with the evidence, add the semantic tokens that are genuinely missing instead of forcing a near fit, and verify that the default theme looks identical after each phase, so the visual diff is zero before any new theme is turned on.
</context>

<task>
Plan the migration of {{repo_path}} to semantic tokens defined in {{token_source}}. Do not change any files; this is analysis and planning only.
{{#scope}}

<scope>
{{scope}}
</scope>
{{/scope}}

1. **Read the tokens.** List the primitive and semantic tokens in {{token_source}}, how semantic tokens alias primitives, and which themes exist. If there is no semantic layer, say so and propose a minimal one marked proposed.
2. **Inventory usages.** Search the code for every reference to primitive tokens (CSS custom properties, preprocessor variables, theme object keys, utility classes, native resources). Record file, token, the property or attribute it sets, and the component. Give totals per token and per property.
3. **Mapping rules.** Rules of the form "primitive X used for property Y in context Z maps to semantic token S", for example `gray-500` on `color` maps to `color.text.secondary` and on `border-color` maps to `color.border.default`. Count how many usages each rule covers.
4. **Ambiguous cases.** Usages no rule covers confidently (the same token for a decorative and a meaningful role, state colours used as brand colours, one-off tints). List them with file references and the question a designer must answer.
5. **Missing semantic tokens.** Roles found in code with no semantic token, with a proposed name following the existing naming grammar.
6. **Migration phases.** Order by package or feature area, smallest risk first, each phase shippable alone with zero visual change in the default theme.
7. **Automation.** Which rules a codemod can apply safely, what the codemod must not touch, and a lint rule that blocks new primitive references in component code after each area is migrated.
8. **Verification.** Visual regression in the default theme per phase, a check that every semantic token resolves in every theme, and contrast checks for any theme turned on afterwards.
</task>

<constraints>
- Read only. Do not modify files, install packages or run codemods.
- Never map by colour value alone; every mapping rule names the property or context.
- Report counts you actually found; mark estimates as estimates.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Usage inventory and mapping rules as tables with counts. Ambiguous cases with file paths and line numbers. End with Risks.
</output_format>
