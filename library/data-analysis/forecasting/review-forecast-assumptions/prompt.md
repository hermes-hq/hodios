---
schema: 1
id: review-forecast-assumptions
kind: prompt
title: Review a forecast's assumptions
description: Reviews someone else's forecast or projection by surfacing its hidden assumptions, testing them against base rates and capacity limits, and finding the few that drive the result.
category: forecasting
version: 1.0.0
status: incubating
stage: [review]
role: [executive, financial-analyst, manager, founder]
inputs: [document, dataset, text]
output: [report, questions, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [assumption-review, sensitivity-analysis, base-rates, hockey-stick, sanity-check]
pairs_with:
  prompts: [check-analysis-for-pitfalls, run-scenario-planning, write-forecast-commentary]
args:
  - name: forecast
    description: The forecast or projection to review - the numbers, the model or spreadsheet logic if available, and any written explanation.
    type: text
    required: true
  - name: context
    description: Who made it, what decision it supports (budget, investment, hiring, a loan application), and what you already doubt.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Assumptions found, Reality checks, What drives the result, Questions for the author, Suggested changes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review forecasts the way an experienced finance partner or investor does: not by re-forecasting, but by finding what has to be true for the numbers to happen and asking whether it is plausible. Most bad forecasts fail on a few assumptions that are hidden in the arithmetic: a conversion rate held constant while marketing spend triples, growth that stays flat-out for five years when few companies sustain it, prices rising with no effect on volume, a sales team that sells from day one, costs that do not grow with volume, seasonality missing, or a single number with no range. Forecasts made to support a decision are pulled toward the answer the author wants. A good review states the implied assumptions in plain numbers, compares them with base rates and physical limits, and finds the two or three assumptions that move the result most, so the conversation focuses there.

{{#context}}Context: {{context}}{{/context}}
</context>

<task>
<forecast>
{{forecast}}
</forecast>

1. Extract the assumptions, stated and implied, and express each as a plain number (for example "revenue grows 15% a month for 24 months", "each salesperson closes 8 deals a month from month one"). Flag assumptions that are implied by the arithmetic but never stated.
2. Reality checks for each: compare with the history in the forecast itself, with base rates for similar businesses or projects where you can name the kind of evidence (not invented statistics), and with capacity limits (staff, stock, market size, cash). Check internal consistency: units, timing, whether costs scale with volume, whether the drivers multiply to the totals.
3. Find what drives the result: vary the most uncertain assumptions within a plausible range and show the effect on the headline number; rank them.
4. Note what is missing: ranges, downside case, seasonality, ramp-up, churn, working capital, one-off events.
5. Write questions for the author, specific and answerable, most important first.
6. Suggest changes: revised assumptions to test, a range instead of a point, or a scenario to add. Do not rebuild the whole forecast unless asked.
</task>

<constraints>
- Do not invent benchmark figures; describe the kind of base rate to check and where it would come from, or use only figures the user gives.
- Criticise the assumptions, not the person. Acknowledge what is solid.
- Keep the arithmetic visible; any recalculated number must show its inputs.
- If the forecast is too vague to review (no numbers or logic), say what is needed and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Verdict
Two or three sentences: how credible the headline is and the single biggest concern.

## Assumptions found
Table: assumption | stated or implied | value | concern level.

## Reality checks
Bullets per assumption that fails a check.

## What drives the result
Table: assumption | plausible range | effect on headline | rank.

## Questions for the author
Numbered.

## Suggested changes
Bullets.
</output_format>
