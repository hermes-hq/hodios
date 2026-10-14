---
schema: 1
id: diagnose-forecast-miss
kind: prompt
title: Diagnose a forecast miss
description: Explains why one important forecast missed badly by separating data problems, wrong input assumptions, model error, unforeseen events and plain noise, with a bridge and fixes.
category: forecasting
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, financial-analyst, operations-manager, business-analyst]
subject: [statistics]
inputs: [dataset, text, notes]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [post-mortem, variance-bridge, root-cause, assumptions, bias]
pairs_with:
  prompts: [measure-forecast-accuracy, write-forecast-commentary, monitor-forecast-drift]
args:
  - name: miss
    description: "The forecast and the actual for the period that missed, the level (total, product, region), when the forecast was made, and the interval or range it came with if any."
    type: text
    required: true
  - name: assumptions
    description: "What the forecast assumed (prices, promotions, launches, big orders, staffing, market growth) and any manual overrides made."
    type: text
    required: true
  - name: what_happened
    description: "What actually happened: events, changes, data issues noticed, breakdowns by product, region or customer if available."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Was it really a miss, Error bridge, Root causes, Fixes, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After a big forecast miss, organisations usually do one of two wrong things: blame the model and rebuild it, or blame the market and change nothing. A useful post-mortem separates the error into parts that need different fixes. Data error: the actual was restated, cut off at a different date, or measured on a different definition than the forecast. Assumption error: the inputs were wrong (a promotion slipped, a price rose, a large customer did not order); re-running the model with the actual inputs shows how much this explains. Model error: what remains when the inputs were right. Unforeseen events: things nobody could reasonably have known. Noise: if the actual fell inside the forecast's 80% interval, the miss may be ordinary variation and the right response is no change. Overrides deserve their own line: judgemental adjustments often add bias. Timing errors (demand moved to the next period) are different from lost demand.
</context>

<task>
<miss>
{{miss}}
</miss>

<assumptions>
{{assumptions}}
</assumptions>

<what_happened>
{{what_happened}}
</what_happened>

1. Size the miss: absolute and percent, and against the forecast's range if one existed. Check the history of misses for bias (is this one of a run in the same direction?).
2. Check the data first: definitions, cut-off dates, restatements, returns or cancellations treated differently, missing feeds.
3. Build the error bridge from forecast to actual: one bar per cause (each assumption that differed, overrides, one-off events, data adjustments), quantified from the information given, with an unexplained remainder. Show the arithmetic.
4. Classify each part as data, assumption, model, event or noise, and say whether it was knowable at the time the forecast was made.
5. Separate timing from lost volume: will the slipped demand appear in the next period?
6. Recommend fixes proportional to the cause: process fixes for assumptions (who confirms promotion dates), data fixes, model changes only for persistent model error, and no change for noise. Say whether the next period's forecast needs adjusting now.
</task>

<constraints>
- Quantify only from figures given; label estimates (for example an assumed elasticity) and their source.
- Do not assign blame to people; describe process and information gaps.
- If the actual was within the stated interval, say so plainly and do not recommend rebuilding the model on one period.
- Leave an unexplained remainder rather than forcing the bridge to close.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The size of the miss and the two or three causes that explain most of it.

## Was it really a miss
Comparison with the range and with past bias.

## Error bridge
Table: step | amount | cause type | knowable at the time? Running from forecast to actual.

## Root causes
Bullets, one per material cause.

## Fixes
Table: fix | owner role | addresses | effort.

## Open questions
What data would settle the unexplained part.
</output_format>
