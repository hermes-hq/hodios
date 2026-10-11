---
schema: 1
id: forecast-from-short-history
kind: prompt
title: Forecast from a short history
description: Forecasts a series with only a few months of data by borrowing a seasonal shape from analogues or the wider market, estimating the level honestly and giving wide, shrinking ranges.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, business-analyst, data-analyst, operations-manager]
subject: [statistics]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [short-history, seasonal-indices, analogues, wide-ranges, launch-ramp]
pairs_with:
  prompts: [forecast-new-product-demand, present-forecast-uncertainty, review-forecast-assumptions]
args:
  - name: history
    description: "The values you have, with dates and frequency, and what they measure (sales, sign-ups, visits). Note launch dates, promotions or anything unusual."
    type: text
    required: true
  - name: analogues
    description: "Anything that shows the seasonal shape: a similar product, store or region with longer history, an industry or category index, last year's figures from a previous business. Optional."
    type: text
  - name: horizon
    description: How far ahead the forecast is needed and what it will be used for.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, What the history can and cannot tell us, Seasonal shape, Level and trend, Forecast, How to update it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A new shop, product line or service often has three to eighteen months of data when someone needs next year's numbers. Statistical models cannot separate trend from seasonality with less than two full cycles: a rise from January to April might be growth, spring seasonality or launch ramp-up. Experienced forecasters borrow the seasonal shape from an analogue with longer history (a sister store, the category's sales, the previous owner's figures), divide the short history by those seasonal indices to see the underlying level, estimate the trend cautiously (launch growth rates fade), multiply the indices back in, and give ranges that are honest about how little is known. Compounding an early month-on-month growth rate is the classic error: 30% a month for twelve months is 1.3 to the 12th, about 23 times.
</context>

<task>
Forecast {{horizon}}.

<history>
{{history}}
</history>
{{#analogues}}

<analogues>
{{analogues}}
</analogues>
{{/analogues}}

1. Say what this history can and cannot tell: number of periods, whether any full seasonal cycle is covered, launch or ramp-up effects, and one-offs.
2. Choose a seasonal shape: indices from the analogues (normalised to average 1.0), stating why the analogue is comparable and where it is not. If no analogue exists, say so and either assume no seasonality or ask for one; never infer a yearly shape from under a year of data.
3. Deseasonalise: divide each actual by its period's index and show the result. Look at the deseasonalised values for the true level and trend.
4. Estimate the level and trend conservatively: recent level as the base, trend damped toward zero over the horizon, launch growth not compounded forward.
5. Reseasonalise for each future period and give a low, central and high case. Make the range wide (for example plus or minus 25-40% at the far end, wider with fewer data points) and say what drives it.
6. Show the arithmetic for at least two periods.
7. Set the update rule: re-forecast each period as actuals arrive, and say which months will tell the most (the first peak season).
</task>

<constraints>
- Do not fit seasonal statistical models to less than two cycles of data.
- Do not compound early growth rates over the horizon without damping; show what compounding would imply if the user asks for it.
- Do not invent analogue data, industry indices or market statistics; use what is given or ask.
- Label every assumption and its effect on the forecast.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Central forecast, range, and the one assumption that matters most.

## What the history can and cannot tell us
Bullets.

## Seasonal shape
Table: period | index | source.

## Level and trend
Deseasonalised values and the chosen base and trend, with arithmetic.

## Forecast
Table: period | low | central | high.

## How to update it
Bullets: when to re-forecast and what to watch.
</output_format>
