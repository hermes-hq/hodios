---
schema: 1
id: build-interactive-web-map
kind: prompt
title: Build an interactive web map
description: "Writes an interactive Leaflet or MapLibre GL map with a choropleth or markers, legend, popups, clustering, attribution and mobile behaviour. Use to put data on a web page."
category: data-visualization
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, data-analyst, software-engineer, researcher]
stack: [javascript, html-css]
inputs: [dataset, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [leaflet, maplibre, choropleth-map, web-maps]
pairs_with:
  prompts: [design-map-visualization, make-interactive-map-accessible, build-d3-chart]
  rules: [chart-design-rules]
args:
  - name: map_data
    description: "The data: points (latitude and longitude or addresses), or values per region with a region code, plus the boundary file you have (GeoJSON, TopoJSON, shapefile) and how many features."
    type: text
    required: true
  - name: map_brief
    description: "What the map should show and do (choropleth of a rate, markers with popups, filters), where it is embedded (plain HTML page, React app, CMS), the library preference (Leaflet or MapLibre GL) and the tile or basemap provider you are allowed to use."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Data preparation, Map design, Code, Performance and mobile, Licensing and attribution, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build web maps that load fast and read correctly. Leaflet is simple and works with raster tiles and modest GeoJSON (up to a few thousand features); MapLibre GL renders vector tiles and large datasets with WebGL and styles by data expressions. You know the traps: choropleths of raw counts that just show population, so rates or per-capita values are needed; latitude and longitude swapped (GeoJSON is longitude first); region codes that do not match the boundary file, silently dropping regions; boundary files of tens of megabytes that should be simplified (for example with mapshaper) or served as vector tiles; thousands of markers that need clustering; tile providers whose terms forbid heavy or commercial use without a key, and attribution that must stay visible; popups that do not work on touch; scroll-zoom hijacking the page; and colour scales with no legend or with classes that hide the pattern.
</context>

<task>
Write an interactive web map.

<map_data>
{{map_data}}
</map_data>

<map_brief>
{{map_brief}}
</map_brief>

1. Prepare the data: geocode only if addresses were given and say which geocoder terms apply; join values to boundaries by code and report unmatched codes; normalise counts to rates where a choropleth is used; simplify heavy boundaries and state the target file size; convert to GeoJSON with longitude-first coordinates.
2. Design the map: basemap muted so data stands out; for a choropleth, a sequential or diverging scale with 5 to 7 classes and the classification method (quantiles, natural breaks or round thresholds) stated; for points, clustering above a few hundred markers and sizing by area if magnitude matters; a legend with units; popups or tooltips with name, value, unit and date; a default view framing the data.
3. Write the code in the chosen library: a self-contained HTML page or a component for the stated framework, loading data asynchronously, with layers, legend, popups that work on tap, keyboard focusable controls, and scroll-zoom disabled until the map is clicked or focused when embedded in a page.
4. Cover performance and mobile: feature count limits, vector tiles or server-side filtering for large data, touch interactions, responsive height.
5. Cover licensing: tile provider terms and keys, attribution for tiles and data, and boundary data licence.
6. Give checks: unmatched regions, legend matches colours, works on a phone, attribution visible.
</task>

<constraints>
- Do not use a tile provider in a way its terms forbid; tell the user to check the terms and supply their own key where needed.
- Do not hard-code API keys in the code; use a placeholder and say where to set it.
- Never drop unmatched regions silently; list them.
- Do not draw a choropleth of raw counts when the message is about rates.
</constraints>

<output_format>
## Data preparation
Steps and checks.

## Map design
Table: Element | Choice | Reason.

## Code
One code block.

## Performance and mobile
Bullets.

## Licensing and attribution
Bullets.

## Checks
Checklist.
</output_format>
