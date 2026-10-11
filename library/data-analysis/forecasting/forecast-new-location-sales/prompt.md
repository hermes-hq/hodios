---
schema: 1
id: forecast-new-location-sales
kind: prompt
title: Forecast sales for a new location
description: Forecasts first-year and mature sales for a new store, branch, clinic or restaurant from comparable sites, catchment differences and a ramp-up curve, with cannibalisation and a range.
category: forecasting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager, financial-analyst, business-analyst]
subject: [retail, hospitality]
inputs: [dataset, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [site-selection, comparable-sites, ramp-up, cannibalisation, catchment]
pairs_with:
  prompts: [evaluate-franchise-territory, review-forecast-assumptions, present-forecast-uncertainty]
args:
  - name: new_site
    description: "The proposed site: format and size, location type (high street, mall, retail park, residential), opening date, catchment facts you have (population, footfall, competitors nearby), and distance to your existing sites."
    type: text
    required: true
  - name: comparables
    description: "Existing sites with their characteristics and monthly sales since opening (or at least first-year and mature annual sales), including any that closed."
    type: text
    required: true
  - name: purpose
    description: What the forecast is for (go or no-go, lease negotiation, lender, staffing). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Comparable sites, Adjustments, Ramp-up, Forecast, Cannibalisation, Risks and range]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Retail and hospitality chains forecast new sites with the analogue method: pick existing sites that resemble the new one in format, size, location type and catchment, use their mature sales as the anchor, adjust for known differences, and apply a ramp-up curve, because new sites usually take from several months to two or three years to reach maturity (often with an opening spike from launch marketing followed by a dip). The errors that sink new sites are predictable: picking only the best performers as comparables (and forgetting sites that closed), adjusting the anchor upward for every positive factor and never down, ignoring sales taken from nearby own sites (cannibalisation), and budgeting the mature level from month one. The spread across comparables is the honest range; with few comparables, it should be wide.
</context>

<task>
<new_site>
{{new_site}}
</new_site>

<comparables>
{{comparables}}
</comparables>
{{#purpose}}

Purpose: {{purpose}}
{{/purpose}}

1. Choose comparables: score each existing site on similarity (format, size, location type, catchment, competition, opening season) and keep the closest, including weak and closed sites if they are comparable. Explain exclusions.
2. Anchor: mature annual or monthly sales of the comparables, shown individually, with the median as the central anchor and the spread as the range.
3. Adjust for known differences only where evidence supports a size of effect (for example sales per square metre for a size difference); state each adjustment and keep the total modest.
4. Ramp-up: derive the curve from comparables' sales by month since opening (share of mature level), or state an assumed curve if the data is not there. Apply it from the opening date, with the seasonal pattern of the calendar months it covers.
5. Cannibalisation: estimate the share of the new site's sales that will come from nearby own sites, from past openings if available, and show net new sales to the business.
6. Produce monthly first-year sales and the mature-year figure, with low, central and high from the comparable spread.
7. List the risks and the early signals (first 8-12 weeks) that show whether the site is tracking the curve.
</task>

<constraints>
- Do not invent catchment data, footfall or competitor figures; use what is given or mark placeholders.
- Do not pick only the best-performing comparables; show all considered.
- For a lender or landlord, present the central and low cases honestly; do not inflate.
- Show arithmetic and label approximations.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Mature sales, first-year sales, range, and the main risk.

## Comparable sites
Table: site | similarity notes | first-year sales | mature sales | used or excluded.

## Adjustments
Table: factor | direction | size | evidence.

## Ramp-up
Table: months since opening | share of mature.

## Forecast
Table: month | low | central | high.

## Cannibalisation
Gross sales, share taken from own sites, net new sales.

## Risks and range
Bullets, plus early tracking signals.
</output_format>
