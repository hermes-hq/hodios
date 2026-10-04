---
schema: 1
id: analyze-farm-yield-data
kind: prompt
title: Analyse farm or orchard yield records
description: Analyses farm or orchard yield records by field, variety, input and season, separating weather and field effects from management, and designs fair on-farm trials for next season.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, founder]
requires: [none]
inputs: [dataset, notes]
output: [report, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [farm-records, crop-yield, on-farm-trials, agriculture, orchard, variety-comparison]
pairs_with:
  prompts: [explore-dataset, run-regression-analysis, decompose-seasonality]
  personas: [data-analyst, statistician]
args:
  - name: data
    description: Yield records - field or block, area, crop and variety, season or year, yield and its unit, inputs (fertiliser rates, irrigation, sowing or planting date, spray programme), and anything unusual.
    type: text
    required: true
  - name: crops
    description: The crops or fruit and how they are sold, for example "winter wheat and oilseed rape, sold by tonne" or "apples, 4 varieties, sold by grade".
    type: text
    required: true
  - name: weather_notes
    description: Season-by-season weather notes (rainfall, drought, frost, hail, a late spring), soil differences between fields, and prices or input costs if you want the economics.
    type: text
output_contract:
  format: markdown
  sections: [Data check, Yield by field variety and season, Weather and field versus management, What the inputs show, Trials for next season, Caveats]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Yield records answer real questions (which variety, how much nitrogen, which fields underperform) but they are easy to misread. One good year flatters whatever was done that year; a variety grown only on the best field looks like the best variety; yield per field hides differences in area; and a few seasons of data cannot separate many factors at once. Sound on-farm analysis puts yields on a per-area basis, compares within the same season (to remove weather) and within the same field (to remove soil), treats non-random choices as confounding, and turns open questions into simple replicated trials. The farmer's agronomist should check any change to inputs before it is made.
</context>

<task>
Analyse these yield records for {{crops}}.

<data>
{{data}}
</data>
{{#weather_notes}}
<weather_and_context>
{{weather_notes}}
</weather_and_context>
{{/weather_notes}}

1. Data check: seasons, fields, varieties and units covered; convert every yield to one per-area unit and state it; flag missing areas, mixed units, obvious entry errors and seasons with events (hail, flooding, a failed crop) that should be shown separately rather than averaged in.
2. Yield by field, variety and season: a table of per-area yields, then field averages and variety averages, each with the number of field-seasons behind it.
3. Weather and field versus management: estimate the season effect (how all fields moved together in each year) and the field effect (how each field compares with the farm average across years). Compare varieties or practices only within the same season, and within the same field across years where possible. Say clearly where a comparison is confounded (for example a variety only grown on the best field, or a practice only used in a wet year). With enough data, a simple model with field and season effects can be described; with little data, say that and keep to paired comparisons.
4. What the inputs show: plot or tabulate yield against each input that varies (for example nitrogen rate), note diminishing returns where visible, and if prices and input costs are given, compute the margin over input cost for each level with the arithmetic shown.
5. Trials for next season: for the two or three most valuable open questions, design an on-farm trial: replicated strips or plots (at least three replicates), treatments placed at random or alternated within the same field, a check strip, the measurements to take, how to harvest and weigh each strip separately, and what difference would be worth acting on.
6. Caveats: the number of seasons and fields, what cannot be concluded, and a reminder to check input changes with an agronomist.
7. Before you answer, check unit conversions, recompute the averages from the table, and confirm each conclusion names the comparison it rests on.
</task>

<constraints>
- Use only the records given; never invent yields, regional averages or prices. If a benchmark would help, say where to find local official or advisory figures.
- Do not recommend pesticide or fertiliser products or rates as instructions; describe what the data suggest and refer decisions to an agronomist and the product label.
- Do not claim a cause from one season or one field; use "associated with" and say what trial would confirm it.
- If areas or units are missing so per-area yields cannot be computed, ask for them and stop.
</constraints>

<output_format>
Markdown with the sections in the output contract. Yields as tables (Field | Area | Variety | Season | Yield per area). Season and field effects as two small tables. Each trial as a short block: Question | Design | Layout sketch | Measurements | Decision threshold.
</output_format>
