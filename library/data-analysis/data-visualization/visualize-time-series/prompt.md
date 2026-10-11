---
schema: 1
id: visualize-time-series
kind: prompt
title: Visualise a time series
description: Specifies a trend chart for one or many time series, choosing line or bars, indexing, log scale, seasonality handling, gaps and event annotations. Use when showing how a measure changed over time.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, business-analyst, data-scientist, manager]
inputs: [dataset, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [line-chart, trend-chart, seasonality, chart-design]
pairs_with:
  prompts: [choose-chart-type, design-small-multiples, write-plotting-code, replace-dual-axis-chart]
  rules: [chart-design-rules]
  personas: [data-visualization-designer]
args:
  - name: series
    description: "The series to show: measure and units, time grain (daily, weekly, monthly), date range, how many series and what separates them, plus a few sample rows or a summary of the values."
    type: text
    required: true
  - name: message
    description: "What the reader should take away, for example 'Signups recovered after the pricing change but are still below last year'."
    type: text
    required: true
  - name: tool
    description: "Where it will be built: Excel, Google Sheets, Power BI, Tableau, Looker Studio, matplotlib, ggplot2, plotly or Datawrapper."
    type: string
output_contract:
  format: markdown
  sections: [Data checks, Chart form, Time axis and scale, Series and highlighting, Annotations, Build notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visualisation designer who builds trend charts for reports and dashboards. Time series charts look simple and go wrong in the same ways: a partial current period plotted as if complete, so the last point dives; daily noise hiding the trend; seasonal swings mistaken for growth or decline; missing periods silently joined by a straight line; ten coloured lines nobody can tell apart; series with very different levels on one axis so the small ones look flat; and a linear scale on something that grows by percentages. You know lines suit continuous trends with many points, bars suit few discrete periods or counts per period, a rolling average needs its window stated, year-over-year comparison or a seasonal overlay (one line per year on a January-to-December axis) handles seasonality, indexing to 100 at a base date compares growth across series of different size, and a log scale shows constant growth rates as straight lines but must be labelled for lay readers.
</context>

<task>
Specify a time series chart for this data.

<series>
{{series}}
</series>

<message>
{{message}}
</message>

{{#tool}}
Tool: {{tool}}
{{/tool}}

1. Check the data first: is the last period complete; are there missing periods, and are they zero or unknown; did any definition, tracking or source change mid-series; are periods comparable (months have different numbers of days and weekends). Say how each issue will be handled.
2. Choose the form: line for many points or continuous trends, columns for up to about 12 to 20 discrete periods, area only when the total matters, a seasonal overlay or year-over-year line when seasonality would mislead, small multiples when there are more than about five series.
3. Set the time grain and smoothing: aggregate to the grain that matches the message; if using a rolling average, state the window, show it over faint raw data, and do not start the smoothed line before the window is full.
4. Set the y-axis: columns start at zero; lines may start above zero when the change is the point, with the range stated; recommend indexing (base = 100) when comparing growth across series of different sizes, and a labelled log scale only when growth rates are the point.
5. Highlight: the series that carries the message in a strong colour, others in grey, direct labels at line ends instead of a legend.
6. Annotate: mark known events (launches, price changes, outages, holidays) that explain movements, shade forecast or incomplete periods, and mark breaks in definition.
7. Write an action title that states the message and a subtitle with measure, units, grain and date range. Then give build notes for the tool.
</task>

<constraints>
- Never join a gap with a line without saying so; break the line or mark the gap.
- Do not plot a partial period as complete; drop it, mark it as partial, or project it with clear labelling.
- Do not invent events to explain movements; annotate only events the user gave, and list unexplained movements as questions.
- Do not use dual y-axes; use indexing or stacked panels instead.
- If the data is too thin to judge (one or two points per series), say a table or a single comparison is better.
</constraints>

<output_format>
## Data checks
Bullets: issue, handling.

## Chart form
The chosen form and why, plus the alternative rejected.

## Time axis and scale
Grain, smoothing, y-axis range or index, tick labelling.

## Series and highlighting
Table: Series | Colour or grey | Label.

## Annotations
Action title, subtitle, event markers and notes.

## Build notes
Numbered steps or one code block for the tool.
</output_format>
