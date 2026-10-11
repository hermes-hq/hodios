---
schema: 1
id: write-grant-value-for-money
kind: prompt
title: Write a value-for-money section for a grant
description: Writes a grant's value-for-money section covering economy, efficiency, effectiveness and equity, with unit costs worked from the budget, fair comparisons and the choices made to keep costs down.
category: grant-writing
version: 1.0.0
status: incubating
stage: [build]
role: [writer, manager, financial-analyst, consultant]
subject: [nonprofit, public-sector]
requires: [none]
inputs: [text, dataset, document]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [value-for-money, unit-costs, cost-effectiveness, public-funding, economy-efficiency-effectiveness]
pairs_with:
  prompts: [build-grant-budget, write-grant-budget-narrative, calculate-programme-full-cost]
  personas: [grant-writer]
args:
  - name: project
    description: The project's activities, outputs and outcomes with numbers, target groups, and the budget by main heading with the total.
    type: text
    required: true
  - name: comparisons
    description: Any benchmarks you have - your past unit costs, published costs of similar services, the cost of not acting (for example a crisis service or a place in care) - with sources. Optional.
    type: text
  - name: funder
    description: What the funder asks for under value for money and its limit, and any framework or terms it uses. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Unit costs, Section text, Comparison check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a grant writer with a public-sector finance background. Many government, lottery and development funders ask applicants to show value for money, often with a framework of economy (buying inputs at the right price), efficiency (converting inputs into outputs well), effectiveness (outputs leading to the intended outcomes) and equity (reaching the people who most need it, even when that costs more). Reviewers want unit costs worked from the budget (cost per participant, per completed course, per outcome achieved), a fair comparison or benchmark with its source, and the decisions that kept costs reasonable (procurement, shared overheads, volunteers, partners' in-kind). Weak sections assert "excellent value for money", compare unit costs of services that are not alike, or claim savings to the public purse from figures without a source. Cheapest is not always best value: reaching a harder-to-reach group can justify a higher unit cost if argued openly.
</context>

<task>
Write the value-for-money section.

<project>
{{project}}
</project>
{{#comparisons}}
<comparisons>
{{comparisons}}
</comparisons>
{{/comparisons}}
{{#funder}}
<funder>
{{funder}}
</funder>
{{/funder}}

1. Unit costs: calculate cost per output and, where outcome targets exist, cost per outcome, showing the arithmetic. State what is included (full cost or the grant only).
2. Section text, in the funder's structure if given, otherwise under economy, efficiency, effectiveness and equity: concrete choices that keep costs down, unit costs with fair benchmarks, the evidence that outputs lead to outcomes, and how the project reaches those most in need and why any higher cost is justified.
3. Comparison check: for each benchmark, whether it is like-for-like (same intensity, group, outcome definition), and its source. Flag weak comparisons.
4. Gaps: missing benchmarks or sources, and claims that need evidence, as [NEEDED: ...].
</task>

<constraints>
- Keep arithmetic exact and consistent with the budget total.
- Never invent benchmarks, costs of alternative services or savings figures; use only the comparisons given or placeholders, and say where to look for sources in general terms.
- Do not claim savings to other services as fact unless the input gives evidence; present them as potential with their assumptions.
- Avoid unsupported adjectives such as "excellent value".
</constraints>

<output_format>
## Unit costs
Table: Measure | Number | Cost | Unit cost | Includes.
## Section text
## Comparison check
## Gaps
</output_format>
