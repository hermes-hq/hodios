---
schema: 1
id: plan-component-deprecation
kind: prompt
title: Plan a component deprecation
description: Plans the deprecation of one design-system component with a usage inventory, replacement mapping, warnings in code and design files, migration support and a removal date.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [designer, frontend-engineer, tech-lead]
requires: [none]
inputs: [text, spec, notes]
output: [plan, table, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [deprecation, component-lifecycle, codemods, breaking-changes, consumer-communication]
pairs_with:
  prompts: [plan-design-system-governance, measure-design-system-adoption, write-migration-guide]
  personas: [design-systems-lead]
args:
  - name: component
    description: The component to deprecate and why, e.g. "LegacyModal, replaced by Dialog because it traps focus badly and cannot be themed".
    type: text
    required: true
  - name: replacement
    description: Optional. The component or pattern that replaces it, with its API if it differs.
    type: text
  - name: context
    description: Optional. Usage counts per team or product, the release and versioning model, design tool, how teams are reached, and any deadline.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Why deprecate, Usage inventory, Replacement mapping, Timeline, Communication, Migration support, Risks, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Deprecations fail in predictable ways: the component is removed before teams have moved, the replacement does not cover every case the old one did, the warning only exists in a changelog nobody reads, or the design library keeps offering the old component so new screens keep using it. A deprecation that works has a replacement (or a documented "build it locally" path) for every real use, warnings where people actually work (the editor, the console in development, the design tool's assets panel), a mapping from old props to new ones with the cases that do not map, mechanical changes automated with a codemod, removal only in a major release, and a decision about the long tail that will not migrate in time.
</context>

<task>
Plan the deprecation of this component.

<component>
{{component}}
</component>
{{#replacement}}

<replacement>
{{replacement}}
</replacement>
{{/replacement}}
{{#context}}

<context_from_user>
{{context}}
</context_from_user>
{{/context}}

1. **Why deprecate.** State the reasons in one paragraph a product team would accept. If the reasons are weak (for example only a naming preference), say whether a rename via alias would do instead.
2. **Usage inventory.** From the context, list where the component is used and how. If no usage data is given, describe how to collect it (code search for imports, design-library usage analytics where the tool offers them, a short survey) and mark the inventory as to be done.
3. **Replacement mapping.** A table of old props, variants and behaviours to their new equivalents. Mark each row automatic (a codemod can do it), manual (needs a decision) or no equivalent. For every "no equivalent", propose an answer: extend the replacement, a documented pattern, or a local component.
4. **Timeline.** Phases with dates relative to a start date: announce, mark deprecated, migration window, final warning, removal in the next major. Size the window to the usage and the teams' release cycles; native apps and rarely updated products need longer.
5. **Communication.** Where each message goes and a draft of the announcement (what, why, what to do, by when, where to get help). In code: a deprecation annotation that editors show, a development-only console warning, and a lint rule. In the design library: rename or mark the component deprecated, hide it from search so new work stops using it, and keep existing instances working.
6. **Migration support.** Codemod scope, office hours or pairing, a migration guide outline, and how progress is tracked per team.
7. **Risks.** What breaks if removal happens with usage left, and the plan for teams that cannot migrate in time (pin the old version, copy the component locally with no support, or extend the window).
8. If there is no replacement and no reason the use cases have gone away, say that the deprecation is premature.
</task>

<constraints>
- Never plan removal in a minor or patch release.
- Do not invent usage numbers, team names or dates; use placeholders and mark them.
- Do not combine the deprecation with a redesign of the replacement unless the context asks for it; flag the extra risk if it does.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Replacement mapping and timeline as tables. The announcement draft as a quoted block. End with Open questions.
</output_format>
