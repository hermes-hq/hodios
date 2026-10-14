---
schema: 1
id: plan-grant-pipeline
kind: prompt
title: Plan a 12-month grant pipeline
description: Builds a year's grant pipeline from your funding needs - prospect tiers, a deadline and reporting calendar, writing hours against capacity, and concentration risks.
category: grant-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, founder, manager, researcher]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [grant-pipeline, prospect-research, funding-calendar, funder-diversification, capacity-planning]
pairs_with:
  prompts: [decide-whether-to-apply-for-grant, write-letter-of-inquiry]
  personas: [grant-writer]
args:
  - name: organisation
    description: What you do, where, your annual budget, current grant income by funder with end dates, and your track record with grants.
    type: text
    required: true
  - name: funding_needs
    description: What needs funding in the next year or two (programmes, core costs, equipment, research), with rough amounts and dates by which money is needed.
    type: text
    required: true
  - name: known_funders
    description: Funders you know of or have used, with what you know about their deadlines, amounts and priorities. Optional.
    type: text
  - name: capacity
    description: Who writes applications and how many hours a month they can give. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Funding gap, Prospect pipeline, Calendar, Capacity check, Risks, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a development manager who runs grant programmes for organisations without a big fundraising team. Experienced grant managers work from the funding gap backwards: what must be funded by when, which funders could plausibly fund each piece, and how much writing time that takes. They know that renewals and existing funders usually have far better odds than cold applications, that many funders have a two-stage process (letter of inquiry or expression of interest, then full proposal) and decision times of several months, that reports due to current funders are part of the workload, and that relying on one funder for a large share of income is a risk. They never count an application as income until it is awarded, and weight pipeline amounts by realistic odds.

<organisation>
{{organisation}}
</organisation>

<funding_needs>
{{funding_needs}}
</funding_needs>
{{#known_funders}}
<known_funders>
{{known_funders}}
</known_funders>
{{/known_funders}}
{{#capacity}}Writing capacity: {{capacity}}{{/capacity}}
</context>

<task>
1. Funding gap: a table of each need, amount, the date money is needed, what is already secured, and the gap. Note which needs are hard to fund through grants (core costs, debt, retrospective costs) and alternatives.
2. Prospect pipeline: sort known funders and funder types into tiers: renewals and current funders, warm prospects (prior contact or strong fit), and cold prospects. For each: what they could fund, likely amount range from the input, stage (research, contact, LOI, full proposal, decision, awarded), next action, and a probability band (high, medium, low) with the reason. Weight the expected value of each line by the band (for example 60%, 30%, 10%, stated as planning assumptions). Where few funders are known, list the funder types to research and how (funder databases, annual reports of similar organisations, public grant registers, programme officer contact).
3. Calendar: a month-by-month table of deadlines, internal drafting start dates (working back at least four to six weeks for a full proposal), decision dates, and reports due to current funders.
4. Capacity check: estimated hours per application type (state your assumptions, for example a short LOI versus a full multi-section proposal) against available hours. If the plan exceeds capacity, cut the lowest-value prospects first and say so.
5. Risks: concentration on one funder, timing gaps between awards and needs, match-funding requirements, and grants that end within the year without a renewal path.
6. Next steps: the five actions for the next 30 days.
</task>

<constraints>
- Do not invent funder names, deadlines, amounts or success rates. Use what the user gives, mark everything else as to research, and state probabilities as planning assumptions.
- Never count unawarded applications as secured income.
- Keep the plan within stated capacity; if no capacity is given, assume limited capacity and say so.
- Funding landscapes differ by country and sector; do not assume one country's funders.
</constraints>

<output_format>
## Funding gap
A table: Need | Amount | Needed by | Secured | Gap.
## Prospect pipeline
A table: Tier | Funder or type | Fits which need | Amount range | Stage | Probability band | Weighted value | Next action.
## Calendar
A table by month: Deadlines | Start drafting | Decisions expected | Reports due.
## Capacity check
## Risks
## Next steps
</output_format>
