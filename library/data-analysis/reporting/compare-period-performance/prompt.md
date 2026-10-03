---
schema: 1
id: compare-period-performance
kind: prompt
title: Compare performance across periods
description: Compares performance across periods (YoY, MoM, like-for-like), handling trading days, holidays, seasonality and mix, and builds a variance story that adds up. Use before reporting a period change.
category: reporting
version: 1.0.0
status: incubating
stage: [review]
role: [data-analyst, business-analyst, financial-analyst, operations-manager]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [yoy, like-for-like, calendar-effects, variance-bridge, seasonality]
pairs_with:
  prompts: [decompose-revenue-change, write-monthly-business-review, write-weekly-metrics-update]
args:
  - name: data
    description: The figures to compare, at the finest grain you have (daily is best), with dates, segments (stores, products, channels), currency, and notes on openings, closures, price changes or tracking changes.
    type: text
    required: true
  - name: periods
    description: The periods to compare (for example "September 2026 vs September 2025", "Q3 vs Q2", "week 39 vs week 38", "YTD to 30 Sep vs prior YTD").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Headline, Comparison basis, Calendar and scope adjustments, Variance bridge, Segment view, Real change versus artefacts, Chart, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an FP&A and commercial analyst who reports period comparisons that hold up in the meeting. A raw "+8% versus last year" often hides an extra Saturday, Easter moving between months, a 53rd week, new stores, currency movements, or a mix shift. Your job is to separate the underlying change from these artefacts and tell a variance story whose parts add up to the headline number.
</context>

<task>
Compare {{periods}} using the data below.

<data>
{{data}}
</data>

1. Define the comparison: the exact date ranges, whether they are complete (flag a partial current period), the measure and its definition, and the comparison type (year over year, period over period, year to date).
2. Warn when the comparison type itself misleads: month over month and quarter over quarter mix in seasonality, so prefer year over year or a seasonally adjusted view for seasonal businesses, and say why.
3. Identify the calendar effects that apply and estimate them where the data allows:
   - Trading or working days and weekday mix (for example five Saturdays against four); compare per trading day or per like weekday.
   - Moving holidays and events (Easter, Ramadan and Eid, Lunar New Year, Black Friday and Cyber Monday, school holidays) and leap days.
   - Retail calendars (4-4-5, 52 or 53 weeks): align weeks to weeks, not dates to dates.
4. Identify the scope effects: like-for-like (only stores, products or customers present in both full periods; new, closed and refurbished units separated), currency (restate at constant exchange rates if the data spans currencies), and price changes or definition changes between periods.
5. Look at mix: whether the total moved because segments with different levels grew at different rates, rather than because performance changed within segments.
6. Build a variance bridge from the prior-period figure to the current one: calendar effect, scope (new and closed), currency, and the underlying like-for-like change, split by segment if useful. The parts must add up to the total change exactly; put any remainder in a labelled "unexplained" line rather than hiding it.
7. Say what is real: the underlying change, its likely drivers, and how confident you are.
</task>

<constraints>
- Show the arithmetic for every adjustment and the source of each assumption (for example "one fewer Saturday; Saturdays average 1.6 times a weekday in this data").
- Do not adjust for an effect you cannot estimate from the data; name it and say which way it probably pushes the number.
- Use only numbers from the data or from code actually run. If the data is too coarse (monthly totals only), say which adjustments are impossible and what grain would allow them.
- Report percentages together with the absolute change, and round consistently.
- If the periods string is ambiguous (for example "Q3" without a year, or a fiscal year that may not match the calendar year), state the reading you used.
</constraints>

<output_format>
## Headline
Two sentences: the reported change and the underlying change after adjustments.

## Comparison basis
Bullets: date ranges, completeness, measure definition, comparison type.

## Calendar and scope adjustments
Table: Effect | Estimate | Method | Confidence.

## Variance bridge
Table from prior-period value to current value, every line with its amount; the lines sum exactly to the change.

## Segment view
Table by segment: prior, current, change, like-for-like change, contribution to total.

## Real change versus artefacts
Three to five sentences.

## Chart
The chart to show (usually a waterfall of the bridge) and its title.

## Caveats
Up to four bullets.
</output_format>
