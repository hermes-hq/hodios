---
schema: 1
id: combine-expert-forecasts
kind: prompt
title: Combine several people's forecasts
description: Combines estimates or probabilities from several people into one forecast, using the right average, weighting only on real track records, and turning disagreement into cruxes and a next round.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan, review]
role: [manager, executive, project-manager, researcher]
inputs: [text]
output: [report, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [wisdom-of-crowds, judgmental-forecasting, aggregation, team-estimates, disagreement]
pairs_with:
  prompts: [make-calibrated-forecast, score-probability-forecasts, plan-delphi-study]
args:
  - name: question
    description: The question being forecast, with a clear resolution (what counts as yes, or the exact quantity and date).
    type: text
    required: true
  - name: estimates
    description: Each person's estimate (a probability, a number or a low-high range), their reasoning if given, whether they estimated independently or after discussion, and any past forecasting record. Use roles or initials, not full names.
    type: text
    required: true
  - name: use
    description: What decision the combined forecast feeds and when it is needed.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Estimates received, Combined forecast, Disagreement and cruxes, Next round, Method notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An average of several independent judgments is usually more accurate than most of the individuals in it, because their errors partly cancel. That benefit depends on independence: if people discuss before estimating, or one senior voice anchors the room, the group effectively becomes one forecaster. For quantities, the median resists outliers; a geometric mean suits estimates that differ by multiples. For probabilities, averaging in log-odds is often better than averaging percentages, and when forecasters hold different information, research on forecasting tournaments supports moving the combined probability modestly away from 50%; when they share the same information, it should not be pushed. Weighting by skill helps only when there is a real track record on similar resolved questions; otherwise equal weights are hard to beat. Disagreement is information: the useful output is not just a number but the specific questions (cruxes) on which people differ, and a second independent round after sharing reasoning (a light Delphi) usually narrows the spread for good reasons.

Question: {{question}}
{{#use}}Use: {{use}}{{/use}}
</context>

<task>
<estimates>
{{estimates}}
</estimates>

1. Check the question: is the resolution clear enough that everyone forecast the same thing? If not, say how the interpretations may differ.
2. Tabulate the estimates, noting whether each was independent, whether any are ranges, and any outliers.
3. Combine: choose the aggregation (median, mean, geometric mean, mean of log-odds), show the calculation, and say whether to extremise and by how much, with the reason. Weight by track record only if one exists on similar resolved questions; otherwise use equal weights and say so. For ranges, combine the low and high ends too and give a combined interval.
4. Disagreement and cruxes: summarise the spread, group the reasoning into the few factual or judgment questions where people differ, and say which crux, if resolved, would move the forecast most.
5. Next round: propose how to run a second independent round (share anonymised reasoning, ask each to re-estimate privately), or which evidence to gather first.
6. Method notes: limits of this combination, and how to record the outcome to build a track record.
</task>

<constraints>
- Do not invent estimates, reasoning or track records that were not given.
- Do not weight people by seniority or confidence of tone.
- If estimates were made after group discussion, say the combination is weaker and why.
- Use roles or initials only; do not ask for or repeat full names.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
The combined forecast, its range or spread, and the main crux.

## Estimates received
Table: person | estimate | independent? | key reasoning.

## Combined forecast
Calculation and result, with method choice explained.

## Disagreement and cruxes
Numbered cruxes with who sits where.

## Next round
Bullets.

## Method notes
Bullets.
</output_format>
