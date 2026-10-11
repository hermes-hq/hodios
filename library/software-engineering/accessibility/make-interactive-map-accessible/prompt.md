---
schema: 1
id: make-interactive-map-accessible
kind: prompt
title: Make an interactive map accessible
description: Makes a web map such as a store locator, property search or delivery zone picker usable without sight or a mouse, with a synced list alternative, keyboard panning, named markers and text directions.
category: accessibility
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [javascript]
requires: [none]
inputs: [file, text, spec]
output: [code, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [maps, store-locator, markers, list-alternative, keyboard, screen-reader]
pairs_with:
  personas: [accessibility-specialist]
  prompts: [make-data-visualization-accessible, fix-keyboard-navigation, audit-web-accessibility]
args:
  - name: map_feature
    description: What the map is for and what users do with it (find nearest branch, pick a delivery area, browse listings), plus the current code or description of markers, popups, clusters and filters.
    type: text
    required: true
  - name: map_library
    description: Optional. The map library or service in use, for example Leaflet, MapLibre, OpenLayers or a hosted maps SDK.
    type: string
output_contract:
  format: markdown
  sections: [User tasks, Text alternative, Map fixes, Test checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most interactive maps are a canvas or a tile layer with mouse-only markers, so a blind user or keyboard user cannot complete the task the map exists for. The key insight is that the map is rarely the task; the task is "find the nearest open branch" or "check whether my address is in the delivery zone". That task can almost always be done with a search box and a list or table sorted by distance, with the map as an enhancement kept in sync. WCAG 1.1.1 needs a text alternative for the information the map conveys, 2.1.1 needs keyboard operation of what remains interactive, 2.5.7 needs a non-drag way to pan, 1.4.11 needs contrast for markers and zone boundaries, and 1.4.1 needs more than colour to distinguish categories. Map libraries differ: some offer keyboard panning and focusable markers, others need markers rendered as buttons in an overlay. Clusters and popups opened on hover are frequent traps. An embedded map iframe also needs a title, and the map should not capture scroll or keyboard focus unexpectedly.
</context>

<task>
Map feature: {{map_feature}}
{{#map_library}}
Library: {{map_library}}
{{/map_library}}

1. Name the user tasks the map supports and the information it conveys (locations, distances, boundaries, availability, categories).
2. Design the text alternative that completes those tasks without the map: search by address or postcode with geolocation as an option, results as a list or table with name, address, distance, opening status and actions, and a plain-language answer for zone checks ("Your address is inside the delivery area"). Keep list and map selections in sync.
3. Fix the map itself: a heading and a short description before it, an accessible name for the map region, keyboard panning and zoom with visible buttons, markers as focusable buttons named after the place, popups opened by click or Enter and closed by Escape with focus returned, clusters that announce how many places they contain and expand by keyboard, and a skip link past the map.
4. Fix visual issues: marker and boundary contrast against the tiles, shape or icon differences in addition to colour, and text in popups that reflows.
5. Write the code for the chosen library where you are confident of its API, otherwise as a library-neutral overlay of HTML buttons, and mark library specifics to verify.
6. Give a test checklist: keyboard only, a screen reader with a browser, 400% zoom and a mobile screen reader.
</task>

<constraints>
- Do not describe the map's whole visual appearance in alt text; give the information that serves the task.
- Do not require geolocation; always offer typed search.
- Do not invent library options; say when something must be checked in the library's documentation.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## User tasks
Bullets: task and the information it needs.

## Text alternative
Markup and behaviour of the search and results list.

## Map fixes
Code per fix.

## Test checklist
Checklist per method.
</output_format>
