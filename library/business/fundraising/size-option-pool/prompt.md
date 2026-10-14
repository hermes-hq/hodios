---
schema: 1
id: size-option-pool
kind: prompt
title: Size the option pool from a hiring plan
description: Sizes the employee option pool a startup needs before its next round from the actual hiring plan and grant ranges, so the pool negotiated with investors is not larger than needed.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, financial-analyst]
advice_risk: [financial]
inputs: [dataset, notes]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [option-pool, hiring-plan, equity-grants, dilution, cap-table]
pairs_with:
  prompts: [model-round-dilution, plan-term-sheet-negotiation, explain-equity-compensation]
args:
  - name: hiring_plan
    description: Roles you plan to hire until the next round, with level and timing, plus any existing employees due refresh grants.
    type: text
    required: true
  - name: grant_ranges
    description: Your grant guidelines per level as a percentage of fully diluted shares or a share count. Leave empty to have placeholder ranges you must fill in.
    type: text
  - name: cap_table
    description: Current fully diluted share count, granted options and unallocated pool, and the pool size the investor has proposed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Hires to cover, Grant budget, Pool needed, Versus the proposed pool, Effect on founders, Points to discuss]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders size the option pool before a priced round. Investors usually ask for a pool created or topped up before their money comes in, so the cost falls on existing shareholders. A pool sized to a round number ("15%") rather than to a hiring plan often leaves unused options that diluted the founders for nothing. A defensible pool comes from the hires expected until the next round, the grant each level typically receives under the company's own guidelines, refresh grants for key people, and a modest buffer. Grant sizes vary widely by country, stage and role, so the company's own guidelines matter more than any generic table.
</context>

<task>
Size the pool.

<hiring_plan>
{{hiring_plan}}
</hiring_plan>

<grant_ranges>
{{grant_ranges}}
</grant_ranges>

<cap_table>
{{cap_table}}
</cap_table>

1. Hires to cover: each planned hire and refresh until the next round, with level and month. Flag hires beyond the expected next round, which the next round's pool can cover.
2. Grant budget: for each, the low and high grant from the guidelines. If no guidelines were given, use `[low %]` and `[high %]` placeholders and explain how to set them; do not supply generic market percentages.
3. Pool needed: the total low and high as a percentage of post-money fully diluted shares, plus a buffer you state, minus the unallocated pool that already exists. Show formulas.
4. Versus the proposed pool: the gap between the plan-based number and the investor's proposal, in percentage points and shares.
5. Effect on founders: founder ownership after the round under the proposed pool and under the plan-based pool, if the round terms are given.
6. Points to discuss: how to present the hiring-plan basis to the investor, and what happens to unused pool.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not supply market grant percentages as fact; use the user's guidelines or placeholders.
- Show every calculation; state whether percentages are pre- or post-money.
- Present the comparison; the founder decides what to propose.
- Equity grant tax and legal treatment varies by country; refer to a lawyer or accountant for plan design.
</constraints>

<output_format>
## Hires to cover
Table: Role | Level | Month | Before next round (yes/no).
## Grant budget
Table: Role | Low | High.
## Pool needed
## Versus the proposed pool
## Effect on founders
## Points to discuss
</output_format>
