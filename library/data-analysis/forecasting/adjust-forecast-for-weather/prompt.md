---
schema: 1
id: adjust-forecast-for-weather
kind: prompt
title: Adjust a forecast for weather
description: Measures how much temperature, rain or sunshine really moves demand for a weather-sensitive business, and adds that effect to a short-range forecast using weather forecasts honestly.
category: forecasting
version: 1.0.0
status: incubating
stage: [build]
role: [data-analyst, operations-manager, founder, data-scientist]
subject: [retail, hospitality]
inputs: [dataset, text]
output: [report, table, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [weather-sensitivity, degree-days, short-range-forecast, demand-drivers]
pairs_with:
  prompts: [forecast-time-series, add-event-adjustments-to-forecast, forecast-with-leading-indicators]
args:
  - name: sales_and_weather
    description: "Daily or weekly sales (or visits, energy use, calls) with matching historical weather for the same location: temperature, rainfall, sunshine or whatever is available, plus known events and closures."
    type: text
    required: true
  - name: use
    description: "What the adjusted forecast is for (ordering perishables, staffing, energy purchasing) and how far ahead decisions are made."
    type: text
    required: true
  - name: tool
    description: Tool for any code.
    type: enum
    enum: [python, r, spreadsheet, none]
    default: none
output_contract:
  format: markdown
  sections: [Summary, Is it weather-sensitive, Weather effect, Adjusted forecast method, Code, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Weather moves demand for ice cream, garden centres, beer gardens, heating, umbrellas and many services, but people overestimate it because they remember the extremes. Two traps are common. First, weather and season are confounded: summer is both warm and the holiday season, so a naive regression of sales on temperature attributes the seasonal pattern to temperature; the weather effect must be measured as a deviation from what is normal for the time of year (anomaly against seasonal norm). Second, the relationship is rarely linear: demand often responds only above or below a threshold (degree-days for heating and cooling), rain matters more on weekends, and a hot day after a cold spell lifts more than the same day in a heatwave. Using the effect also needs care: weather forecasts lose skill quickly beyond a few days, so a weather adjustment helps short-range ordering and staffing but should fade back to the seasonal norm for longer horizons.

Use: {{use}}
Tool: {{tool}}
</context>

<task>
<sales_and_weather>
{{sales_and_weather}}
</sales_and_weather>

1. Check the data: matching dates and location, enough history to cover a range of weather in each season, closures and events to exclude.
2. Remove the seasonal and weekly pattern first (for example compare each day with the same weekday's typical level for that time of year), then relate the remaining deviation to weather anomalies.
3. Test the shape: thresholds, degree-days, rain as a yes or no versus amount, weekday versus weekend differences. Report the effect in business terms ("each degree above 22°C adds about X units on weekends").
4. Check that the weather effect improves out-of-sample accuracy over the seasonal baseline; if it does not, say the business is less weather-sensitive than assumed.
5. Describe how to apply it: take the baseline forecast, add the effect from the weather forecast for the next few days, and fade to the seasonal norm beyond the reliable range of the weather forecast.
6. Provide code or spreadsheet steps if a tool is chosen.
</task>

<constraints>
- Compute only from data supplied; never quote typical weather sensitivities from memory as if measured.
- Never regress raw sales on raw temperature without removing seasonality first.
- Do not claim forecast weather is reliable beyond the short range; say the adjustment fades.
- State the uncertainty of the estimated effect, not just a point value.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Whether weather matters, how much, and how to use it.

## Is it weather-sensitive
The test and result, with out-of-sample comparison.

## Weather effect
Table: Weather condition | Effect on demand | Range | Applies when.

## Adjusted forecast method
Numbered steps, with the horizon where the adjustment fades.

## Code
Code or formulas, or "Not requested".

## Limits
Bullets.
</output_format>
