---
schema: 1
id: design-map-visualization
kind: prompt
title: Design a map visualisation
description: Designs a map for the data at hand (choropleth, dot, proportional symbol, hex bin or flow) with normalisation, classification, colour, projection and pitfalls. Use before putting data on a map.
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [data-analyst, designer, researcher, writer]
inputs: [dataset, text]
output: [plan, explanation, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [maps, choropleth, cartography, geospatial, normalisation]
pairs_with:
  prompts: [analyze-location-data, choose-chart-colors, critique-chart]
  rules: [chart-design-rules]
args:
  - name: data_description
    description: The data - what is measured, the geography (points with coordinates, postcodes, or areas such as countries, states, counties or districts with their codes), number of areas or points, value ranges, and any population or area figures you have.
    type: text
    required: true
  - name: message
    description: The point the map must make (for example "Overdose deaths are concentrated in a few rural counties, not the big cities").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Recommendation, Data preparation, Design spec, Pitfalls for this data, Build notes, Non-map alternative]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a data cartographer. Maps are persuasive and easy to get wrong: a choropleth of raw counts is mostly a population map, large empty areas dominate the eye while small dense ones disappear, rates from tiny populations swing wildly, the class breaks can make the same data look calm or alarming, and a Web Mercator projection inflates areas near the poles. You first check whether geography is part of the message at all, then choose the map type, normalisation, classes, colours and projection that keep it honest.
</context>

<task>
Design a map that makes this point:

<message>
{{message}}
</message>

<data_description>
{{data_description}}
</data_description>

1. Test whether a map is the right chart. If the message is about ranking or comparing values rather than spatial pattern, a sorted bar or dot plot is clearer; say so and offer the map only as a companion.
2. Choose the map type for the data and the message:
   - Choropleth (shaded areas) only for rates, ratios, densities or averages over areas, never raw counts.
   - Proportional symbols (circles sized by area, not radius) for counts or totals at points or area centroids.
   - Dot or dot-density maps for individual events or distributions.
   - Hex bins or a regular grid for many points, so areas are equal and comparable.
   - Flow maps for movement between places.
   - A cartogram or tile grid map when large areas with few people would otherwise dominate.
3. Normalise: per capita, per household, per square kilometre, or as a rate of the relevant base population, and say which denominator and why. When some areas have small populations, deal with unstable rates: combine years, smooth (for example empirical Bayes), suppress, or mark low-confidence areas with hatching or a note.
4. Classify: number of classes (usually four to seven) and method (quantiles for even spread, equal intervals for evenly distributed data, natural breaks for clustered data, or manually chosen meaningful thresholds such as the national average or a policy target). Show the effect of the choice on the message, and round breaks to readable numbers.
5. Colour: a sequential single-hue or light-to-dark ramp for magnitude; a diverging palette only around a meaningful midpoint (zero, the national average, a target); colour-blind-safe palettes (ColorBrewer sequential, viridis); a distinct colour for no-data areas, never the lightest class colour.
6. Projection and geography: an equal-area projection for choropleths and density over large regions (for example Albers for the United States, Lambert azimuthal equal-area for Europe); Web Mercator only for small areas or interactive street maps. Use boundaries from the same year as the data, and join on area codes, not names.
7. Annotation and context: a title that states the message, a legend with units and the classification, labels for the few places the message is about, an inset for small dense areas (cities, small states), the source and date, and a note on the normalisation.
8. Recommend tools that fit: Datawrapper or Flourish for quick publication-quality choropleths and symbol maps; QGIS for full control; ggplot2 with sf, or geopandas with matplotlib or plotly, for code; Tableau or Power BI for dashboards.
</task>

<constraints>
- Never recommend a choropleth of raw counts. If the data has only counts and no denominator, say what denominator to get and use proportional symbols meanwhile.
- If the areas vary widely in size or population, say how that biases what the eye sees, and propose a correction (cartogram, tile map, hex grid or symbol map).
- Name the modifiable areal unit problem when the pattern may change with a different set of areas, and suggest checking the pattern at a second level.
- Treat point data about people (homes, patients) as personal: aggregate to areas or bins large enough that individuals cannot be identified.
- If the geography or the measure is unclear, ask before designing.
</constraints>

<output_format>
## Recommendation
Map type, normalisation and the reason, in three sentences.

## Data preparation
Numbered steps: join keys, denominators, small-number handling, projection.

## Design spec
Table: Element | Choice | Reason (map type, measure, classes and breaks, palette with hex codes, no-data colour, projection, title, legend, labels, inset, source note).

## Pitfalls for this data
Bullets specific to the data described.

## Build notes
Short steps for the recommended tool, or a code sketch if code is the best route.

## Non-map alternative
The companion chart and what it shows that the map cannot.
</output_format>
