---
schema: 1
id: design-map-and-location-ui
kind: prompt
title: Design a map and location screen
description: Designs a map-based screen such as a store finder, property search or live delivery tracker, balancing list and map, pins and clusters, filters, location permission and fallbacks.
category: ui-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, product-manager, frontend-engineer, mobile-engineer]
requires: [none]
inputs: [text, spec]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [maps, store-locator, location, pins-and-clusters, list-and-map]
pairs_with:
  prompts: [design-permission-requests, make-interactive-map-accessible, design-location-based-search, design-search-experience]
  personas: [product-designer]
args:
  - name: map_context
    description: What the map shows (stores, properties, vehicles, couriers, events), how many points, what users are trying to do (find nearest, compare options, watch something move), filters needed, whether location access is needed, and the platforms.
    type: text
    required: true
  - name: platform
    description: Main platform.
    type: enum
    enum: [web, mobile-app, both]
    default: both
output_contract:
  format: markdown
  sections: [Task and layout choice, Map and list relationship, Pins and clusters, Search and filters, Location permission and fallbacks, Detail view, States, Accessibility]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most map screens are really list screens with a map attached: people choosing a store, flat or restaurant compare names, distances, prices and opening hours, which a list does better, and use the map to judge area and route. Common failures: map-only interfaces that hide information in pins, pins that overlap into unreadable clusters, a map that resets when the user scrolls the list, "search this area" that triggers on every pan, and a dead end when the user denies location access. Live tracking is different: it needs an honest position update time and an ETA more than a beautiful map.
</context>

<task>
<map_context>
{{map_context}}
</map_context>

Design for {{platform}}. If the user task is unclear, ask and stop. Other gaps become assumptions marked [confirm].

1. **Task and layout choice.** Name the main task (find nearest, compare in an area, track movement) and choose a layout: list first with map toggle, split view, map first with bottom sheet, or map only. Justify it for each platform size.
2. **Map and list relationship.** Selection sync between pin and list item, what happens on pan and zoom (auto-update versus "search this area" button), list sort order (distance, relevance) and how distance is calculated and labelled.
3. **Pins and clusters.** Pin styles by type and state (default, selected, visited, unavailable), price or label pins when they aid comparison, clustering thresholds and cluster tap behaviour, and the user's own location marker.
4. **Search and filters.** Location search (address, postcode, place name) with autocomplete, filters and their placement, and how results count is shown.
5. **Location permission and fallbacks.** When to ask (on user action such as "near me", not on launch), the pre-permission explanation, and the full experience when denied: manual location entry, last used location, and approximate location.
6. **Detail view.** Card or sheet content (name, distance, open now, key facts, primary action such as directions, book or call), and how it coexists with the map.
7. **States.** Loading tiles, no results in the area with "zoom out" or nearest alternative, offline, map failed to load (list still works), live tracking delayed with last-updated time.
8. **Accessibility.** A list equivalent for everything on the map, keyboard access to pins, announced result counts, not relying on pin colour alone.
</task>

<constraints>
- Every piece of information on the map must also be reachable in a list or text form.
- Do not request location on first launch without user action; the screen must work without location access.
- Do not name a specific map provider's features as available; describe the behaviour needed and mark provider-dependent items [confirm].
{{> output/uncertainty}}
</constraints>

<output_format>
## Task and layout choice
## Map and list relationship
## Pins and clusters
| Pin type or state | Appearance | Behaviour |
## Search and filters
## Location permission and fallbacks
## Detail view
## States
| State | What the user sees | Action |
## Accessibility
</output_format>
