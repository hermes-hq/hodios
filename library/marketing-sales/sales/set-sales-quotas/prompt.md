---
schema: 1
id: set-sales-quotas
kind: prompt
title: Set sales quotas for a team
description: Sets fair rep quotas from the company target, territory potential, ramp and history, with an over-assignment buffer, a capacity check against pipeline and a way to explain each number.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [manager, executive, founder, financial-analyst]
requires: [none]
inputs: [dataset, notes, text]
output: [plan, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [quota-setting, sales-capacity, territory-potential, sales-planning, ramp]
pairs_with:
  prompts: [plan-sales-territory, design-sales-compensation-plan, analyze-sales-rep-performance, plan-new-rep-ramp]
args:
  - name: target
    description: The company's sales target for the period (bookings, revenue or new ARR), how much is expected from existing customers versus new business, and the period and its seasonality.
    type: text
    required: true
  - name: team
    description: Each rep (or role) with start date, territory or segment, last period's results and quota, open pipeline, and any planned hires with expected start dates. Anonymise names if you prefer.
    type: text
    required: true
  - name: potential
    description: What you know about each territory's potential (number of target accounts, market size, installed base, average deal size) and historical win rates and cycle lengths. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Capacity check, Method, Quotas, Explaining the numbers, Risks, Review points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help sales leaders set quotas. Quotas that are spread evenly or set by adding a flat percentage to last year's results feel unfair, because territories differ in potential and last year's result often reflects luck with a few large deals. Experienced leaders know the main checks: the sum of rep quotas should exceed the company target by a buffer (commonly 10 to 20 percent) because not every rep will hit; new reps need ramped quotas for their first months; the team's realistic capacity (productive reps times what a ramped rep can typically close) must cover the target, or no allocation will work; and pipeline coverage for the first quarter is a sanity check. A quota a rep believes is achievable with effort motivates; one that looks impossible makes good reps leave. Quotas also interact with pay, so changes need to be explained clearly and early.
</context>

<task>
<target>
{{target}}
</target>

<team>
{{team}}
</team>

{{#potential}}<potential>
{{potential}}
</potential>{{/potential}}

1. **Capacity check:** calculate productive capacity (fully ramped equivalents, accounting for start dates and ramp) times a realistic ramped productivity based on the history given. Compare with the target plus buffer. If capacity falls short, say so plainly and show the gap, with options (hires, adjusting the target, productivity changes) rather than hiding it in quotas.
2. **Method:** propose an allocation method suited to the data available, for example a blend of territory potential and recent performance, with the weights and why. Explain how one-off large deals in history are treated.
3. **Quotas:** a quota per rep (and per period if seasonality matters), with the ramp for new hires, the total and the buffer over target. Show the calculation for each.
4. **Explaining the numbers:** a short explanation a manager can give each rep about how their number was set, and how to handle the likely pushback.
5. **Risks:** reps with quotas well above or below their history, territories with thin pipeline, and dependence on a few large deals.
6. **Review points:** when and on what conditions quotas would be revisited (territory changes, long leave, major account loss), stated in advance to keep it fair.
</task>

<constraints>
- Show the arithmetic for capacity, the allocation and every quota.
- Use only the numbers given; label any assumed ramp period or productivity as an assumption to confirm.
- Do not set quotas that the capacity check shows cannot add up to the target without saying so.
- Do not make decisions about individual employment; this is quota setting, not performance management. Prorate quotas for leave and part-time work, and refuse to set a quota designed to cut someone's pay.
- Note that how quota changes interact with commission and employment contracts depends on local law and the plan documents; flag where HR or legal should check.
</constraints>

<output_format>
## Capacity check
Table and arithmetic, with a verdict: covered, tight or short.

## Method
Short explanation with weights.

## Quotas
Table: Rep | Territory | Ramp status | Basis | Quota | Change vs last period.

## Explaining the numbers
A short script and responses to two pushbacks.

## Risks
Bullets.

## Review points
Bullets.
</output_format>
