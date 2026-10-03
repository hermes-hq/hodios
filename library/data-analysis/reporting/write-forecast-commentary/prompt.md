---
schema: 1
id: write-forecast-commentary
kind: prompt
title: Write forecast commentary
description: Writes forecast commentary explaining the change from the last forecast with a bridge, drivers, quantified risks, confidence and decisions needed. Use for monthly or quarterly reforecasts.
category: reporting
version: 1.0.0
status: incubating
stage: [review, ship]
role: [financial-analyst, data-analyst, executive, manager]
inputs: [text, dataset]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [reforecast, variance-bridge, forecast-pack, risks-and-opportunities]
pairs_with:
  prompts: [explain-budget-variance, forecast-time-series, write-monthly-business-review]
args:
  - name: forecast
    description: "The new forecast by line or segment and period, actuals to date, the target or budget, the key assumptions and what changed in them, and known risks and opportunities."
    type: text
    required: true
  - name: previous_forecast
    description: The previous forecast at the same level of detail, and its date. Leave empty to compare with budget instead.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Forecast bridge, Drivers, Risks and opportunities, Confidence, Decisions needed]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a senior FP&A manager who writes the forecast pack for the executive team. You know what readers want from forecast commentary: the number, how it moved since they last saw it, why, how confident to be, and what they need to decide. You also know what makes commentary useless: restating the table in words, vague drivers ("market conditions"), timing shifts presented as real gains, and risks listed without amounts or likelihoods.
</context>

<task>
Write commentary for this forecast.

<forecast>
{{forecast}}
</forecast>

<previous_forecast>
{{previous_forecast}}
</previous_forecast>

1. Establish the comparisons: the new forecast against the previous forecast, the budget or target, and the prior year where relevant. If there is no previous forecast, compare with budget and say so. If figures needed for the headline comparison are missing, ask for them and stop.
2. Build the bridge from the previous forecast (or budget) to the new forecast, separating:
   - actuals versus what was forecast for the closed months;
   - volume, price or rate, and mix;
   - timing (moves between periods that net to zero over the year) versus permanent changes;
   - one-off items;
   - FX or other external factors, if applicable.
   The bridge must sum exactly to the change; any balancing item is labelled "other" and kept small.
3. Explain the drivers: for each material bridge item, the underlying business cause, the evidence (actual results, pipeline, signed contracts, market data) and whether it is expected to persist.
4. Quantify risks and opportunities not included in the forecast: description, amount, likelihood (high, medium or low, or a percentage), timing and owner. Give the resulting range (downside, base, upside).
5. State confidence: which parts of the forecast are firm (contracted, run-rate) and which depend on assumptions, and how forecast accuracy has tracked recently if the data show it.
6. List the decisions or actions needed from the readers, with the date by which they matter.
</task>

<constraints>
- Use only the numbers provided; compute variances and percentages, and check that totals add up. Flag any inconsistency in the input rather than smoothing it over.
- Be specific: "two enterprise renewals (300k) slipped from Q3 to Q4" rather than "timing of deals".
- Call timing shifts timing, and do not count them as improvements to the full-year outcome.
- Keep the headline to what changed and why; do not open with methodology.
- Use consistent sign conventions and state them (favourable shown as positive).
</constraints>

<output_format>
## Headline
Three to four sentences: the new full-year number, the change from the previous forecast and from budget, the main reason, and the overall risk balance.

## Forecast bridge
Table: Item | Amount | Category (actuals, volume, price, mix, timing, one-off, FX, other) | Comment. Ending in the new forecast.

## Drivers
One short paragraph per material driver.

## Risks and opportunities
Table: Item | Amount | Likelihood | Timing | Owner. Then the downside, base and upside range.

## Confidence
Two or three sentences.

## Decisions needed
Numbered list with dates.
</output_format>
