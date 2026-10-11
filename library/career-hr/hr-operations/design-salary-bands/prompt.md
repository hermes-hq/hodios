---
schema: 1
id: design-salary-bands
kind: prompt
title: Design salary bands
description: Designs salary bands for a set of levels from market data the user supplies, with midpoints, range spreads, overlap between levels and a plan for people who fall outside their new band.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, operations-manager, manager, executive]
requires: [none]
inputs: [dataset, text]
output: [table, report, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [salary-bands, pay-ranges, compensation-structure, compa-ratio, market-pricing, pay-transparency]
pairs_with:
  prompts: [evaluate-job-for-grading, analyze-pay-equity, allocate-merit-increases, build-career-ladder]
args:
  - name: levels
    description: The job levels or grades the bands are for, with a one-line description of each (for example "IC1 entry, IC2 independent, IC3 senior") and which job families share them.
    type: text
    required: true
  - name: market_data
    description: The market data you have per level, such as survey percentiles (P25, P50, P75), the source and its date, the location and currency. Do not invent it; if you have none, say so.
    type: text
    required: true
  - name: current_salaries
    description: Current salaries by level, as anonymous rows (ID, level, salary, part-time status), so the plan can show who falls below or above the new bands. Optional.
    type: text
  - name: pay_philosophy
    description: Where you want to sit against the market (for example "P50 for most roles, P75 for engineering"), locations covered, and any pay-transparency rules you must meet. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Design choices, Band table, Overlap and progression, People outside the bands, Rollout and maintenance, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design salary band structures the way a compensation analyst would. A band has a midpoint anchored to a chosen market percentile, a spread (maximum divided by minimum, often around 1.3 to 1.5 for junior levels and 1.5 to 1.8 for senior ones) and a minimum and maximum derived from both. Adjacent bands usually overlap so that an experienced person at one level can earn more than a new person at the next, and midpoints usually step up by a consistent progression (often 10 to 20 percent per level). The usual mistakes are anchoring bands to what the company pays today instead of the market, using survey data that is old, from the wrong location or matched to the wrong job, making bands so wide they mean nothing or so narrow that nobody can progress, and launching without a plan for people who land below the minimum (a cost to budget) or above the maximum (red-circled, not cut). Many places now require pay ranges in job ads or on request, so bands may become visible.

<levels>
{{levels}}
</levels>

<market_data>
{{market_data}}
</market_data>
{{#current_salaries}}
<current_salaries>
{{current_salaries}}
</current_salaries>
{{/current_salaries}}
{{#pay_philosophy}}
<pay_philosophy>
{{pay_philosophy}}
</pay_philosophy>
{{/pay_philosophy}}
</context>

<task>
1. Data check: for each level, say what market data you have, its age, location and currency, and how well it matches the level. Flag gaps, stale data (age it forward only with a stated assumption the user confirms), mixed currencies and locations. If there is no market data at all, stop and list what to obtain and from where (salary surveys, published ranges in job ads, peer data), without inventing numbers.
2. Design choices: state the market anchor per level (from the pay philosophy, or propose P50 and say so), the spread per level, the midpoint progression, and whether different locations or job families need separate structures. Give the reason for each choice and the trade-off.
3. Band table: for each level, the market reference, midpoint, minimum and maximum, spread and the step from the previous midpoint. Show the arithmetic once (minimum = midpoint × 2 / (1 + spread), maximum = minimum × spread) and round consistently.
4. Overlap and progression: compute the overlap between adjacent bands, flag overlaps that are too large (over about 50 percent, which blurs levels) or none at all, and check the progression is smooth. Adjust and show the change.
5. People outside the bands: if current salaries are given, compute each person's compa-ratio against the new midpoint, list who is below minimum and the cost to bring them to minimum, and who is above maximum. Propose a policy for each group: phased adjustment for those below, red-circling (no base increase, lump sums instead) for those above. Annualise or use full-time equivalents for part-time rows.
6. Rollout and maintenance: who approves the structure, how to communicate it to managers and employees, what to publish if pay-transparency rules apply (to confirm locally), and how often to refresh against the market (usually yearly).
7. Questions that need a decision.
</task>

<constraints>
- Use only the market data given. Never invent survey figures, percentiles or salaries; mark gaps as [X] and say what to obtain.
- Show every calculation so it can be checked.
- Do not set or suggest pay by gender, age, ethnicity or any protected characteristic. Note that unexplained gaps should go to a pay equity review.
- Pay-transparency and equal-pay rules differ by country and region; state your assumption and flag them for HR or an employment lawyer to confirm.
- Use IDs, not names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Data check
Bullets per level.
## Design choices
Short list with reasons and trade-offs.
## Band table
Table: Level | Market reference | Minimum | Midpoint | Maximum | Spread | Step from previous.
## Overlap and progression
Table: Levels | Overlap % | Comment.
## People outside the bands
Table: ID | Level | Salary | Compa-ratio | Below or above | Cost or action. Then the proposed policy. If no salaries were given, say what this section would need.
## Rollout and maintenance
Numbered steps.
## Questions
Numbered.
</output_format>
