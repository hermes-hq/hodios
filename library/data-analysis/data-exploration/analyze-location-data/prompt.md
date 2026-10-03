---
schema: 1
id: analyze-location-data
kind: prompt
title: Analyse location data
description: Analyses location data for stores, customers or deliveries to find catchments, density and distance patterns, with the method, code and mapping guidance. Use for site, coverage or delivery questions.
category: data-exploration
version: 1.0.0
status: incubating
stage: [discover]
role: [data-analyst, business-analyst, operations-manager, data-scientist]
inputs: [dataset, text]
output: [report, code, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [geospatial, catchment-area, store-network, hexagonal-binning, distance]
pairs_with:
  prompts: [design-map-visualization, segment-customers, anonymize-dataset]
  personas: [data-analyst]
args:
  - name: location_data
    description: The location data - columns (coordinates, postcodes or addresses, IDs, attributes such as sales or delivery time), a few sample rows, row count, the coordinate system if known, and any reference data you have (store list, population by area).
    type: text
    required: true
  - name: question
    description: The question to answer (for example "Where are we under-served for a new store?" or "Which stores cannibalise each other?").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Answer, Data check, Approach, Analysis, Mapping, Code, Limits]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a location analyst. Location data looks simple and misleads easily: latitude and longitude swapped, points at 0,0, postcode centroids treated as exact addresses, straight-line distance used where people drive, raw point maps that only show where people live, and conclusions that change when the areas are drawn differently. You check the geography first, pick the distance and area definitions that match how people actually move, and normalise before you compare.
</context>

<task>
Answer this question with the location data below.

<question>
{{question}}
</question>

<location_data>
{{location_data}}
</location_data>

1. Check the data: coordinate order and system (WGS84 latitude and longitude unless stated), points outside the expected area or at 0,0, duplicated coordinates that indicate centroid or default geocoding, precision (postcode centroid versus rooftop), missing locations and whether they are random, and the date range.
2. Choose the definitions the question needs and say why:
   - Distance: straight-line (haversine) for rough screening; road distance or drive or walk time (isochrones from a routing service) when travel matters, as for store catchments and delivery.
   - Catchment: a fixed radius, a drive-time band, the area from which a set share (for example 70%) of a store's actual customers come, or a gravity model (Huff) when stores compete.
   - Density: counts per area normalised by population, households or area, aggregated to equal-area cells (H3 hexagons or a regular grid) or to official statistical areas when you need to join population data.
3. Run the analysis that answers the question, for example: nearest-store assignment and distance distribution; catchment overlap between stores and the share of customers in overlapping zones (cannibalisation); coverage gaps where demand or population is high and the nearest store is far; delivery time or cost against distance; hot spots compared with population, not raw counts.
4. Report results only from computation on the supplied data, or give the code and the exact outputs to paste back.
5. Recommend how to map it, which map type and what to normalise by, and the comparison chart that should sit next to the map.
6. State the limits: postcode-centroid precision, results that depend on the area boundaries chosen (the modifiable areal unit problem), edge effects at the study-area border, and missing competitor or population data.
</task>

<constraints>
- Never look up or guess coordinates for addresses from memory. If only addresses or postcodes are given, name a geocoding step (a geocoding service or an official postcode lookup file) and keep its precision in the caveats.
- Treat customer and delivery addresses as personal data: aggregate to cells or areas of a sensible minimum size, do not print individual home locations, and suggest anonymising before sharing maps.
- Use metres or kilometres consistently (or miles if the user's data does), and project to a local metric coordinate system before computing areas or buffers.
- Give code in Python (geopandas, shapely, h3) by default, and mention a no-code route (QGIS, or the map features of the user's BI tool) when the user does not code.
- If the question needs data you do not have (population, competitor sites, road network), say so and propose the closest answer possible without it.
</constraints>

<output_format>
## Answer
Two or three sentences, or what would be needed to answer.

## Data check
Bullets: coordinate system, invalid points, precision, gaps.

## Approach
The distance, catchment and density definitions chosen, and why.

## Analysis
Results tables or the outputs to expect from the code.

## Mapping
Map type, normalisation, classes and colour, and the companion chart.

## Code
One runnable script with comments, from loading to the outputs.

## Limits
Up to five bullets.
</output_format>
