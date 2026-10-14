---
schema: 1
id: plan-design-system-merger
kind: prompt
title: Plan merging two design systems
description: Plans consolidating two or more design systems after a merger, reorg or acquisition, comparing them area by area, choosing a target for each and phasing the migration.
category: design-systems
version: 1.0.0
status: incubating
stage: [plan]
role: [designer, frontend-engineer, tech-lead, engineering-manager]
requires: [none]
inputs: [text, document, notes]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [consolidation, mergers-and-acquisitions, migration-planning, token-bridging, governance]
pairs_with:
  prompts: [plan-design-system-governance, plan-semantic-token-migration, plan-visual-refresh-rollout]
  personas: [design-systems-lead]
args:
  - name: systems
    description: Each system to merge, with its tokens, components, platforms, frameworks, accessibility quality, adoption (which products use it) and the team behind it.
    type: text
    required: true
  - name: context
    description: Why they are merging, the brand outcome (one brand, several brands, undecided), products affected, deadlines and who decides.
    type: text
    required: true
  - name: constraints
    description: Optional. Capacity, release freezes, contractual or regulatory constraints, and anything already decided.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Comparison, Target per area, Brand and visual decisions, Migration phases, Teams and governance, Risks, Measures, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When two companies or departments merge, so do their design systems, and the first instinct is to declare a winner. That often picks on politics rather than evidence, and it ignores that one system may have the better token architecture while the other has the better components or wider platform coverage. Experienced leads compare area by area (tokens, components, patterns, docs, tooling, governance) on neutral criteria agreed before anyone scores: adoption breadth, accessibility quality, platform and framework fit, theming ability, maintenance health. They avoid a patchwork that stitches incompatible pieces together, use a token bridge (mapping the sunset system's tokens to the target's semantic tokens) so products can take the new look before their components are replaced, freeze new feature work in the system being retired, and treat the people side seriously, because teams identify with the system they built.
</context>

<task>
Plan the consolidation.

<systems>
{{systems}}
</systems>

<context_from_user>
{{context}}
</context_from_user>
{{#constraints}}

<constraints_from_user>
{{constraints}}
</constraints_from_user>
{{/constraints}}

1. **Criteria first.** Propose neutral criteria and weights for the comparison, to be agreed before scoring, and who agrees them.
2. **Comparison.** Compare the systems per area (tokens and theming, core components, complex components, patterns, accessibility, platforms and frameworks, documentation, tooling and pipeline, governance and team). Mark where the information given is insufficient.
3. **Target per area.** For each area choose a target (system A, system B, or a new approach) with the reason. Check that the chosen pieces fit together; if they do not, say which choice to revisit.
4. **Brand and visual decisions.** Which decisions sit with brand or leadership rather than the system team (one brand or several), and how the plan changes for each answer.
5. **Migration phases.** Freeze new features in the retiring system, build a token bridge from retiring tokens to target semantic tokens, re-theme products, replace components by usage and risk, retire the old packages and design libraries. Give each phase entry and exit criteria and a duration range sized to the products and capacity.
6. **Teams and governance.** One team or a joint team, roles, how contributors from both sides are kept, and how decisions are made and communicated.
7. **Risks** with mitigations: loss of key people, accessibility regressions, products stuck in between, deadlines set before the work is understood.
8. **Measures.** How progress is tracked (products on the target, retiring-system usage over time, defects).
9. If the deadline in the context is not realistic for the scope, say so and show what can be done by then.
</task>

<constraints>
- Do not pick a winner before the comparison; tie every choice to the criteria.
- Do not invent adoption numbers, team names or quality findings; mark gaps.
- Keep people and politics in the plan, but do not speculate about individuals.
{{> output/uncertainty}}
</constraints>

<output_format>
Markdown with the sections from the contract, in order. Criteria, comparison and target per area as tables. Migration phases as a table with entry and exit criteria. End with Open questions.
</output_format>
