---
schema: 1
id: design-location-based-search
kind: prompt
title: Design location-based search
description: Designs nearby and within-area search, choosing PostGIS, geohash keys or a search engine's geo queries, with ranking, filters, sharding by region and caching.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text]
output: [plan, table, code]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [geospatial, nearby-search, geohash, spatial-index, maps, caching]
pairs_with:
  personas: [software-architect, backend-engineer]
  prompts: [design-search-index, choose-database-for-workload]
args:
  - name: use_case
    description: What users search for near them or inside an area (stores, drivers, listings, events), filters, ranking needs, and whether the items move.
    type: text
    required: true
  - name: scale
    description: Number of items, update rate for moving items, queries per second, and geographic spread.
    type: text
  - name: stack
    description: Databases and search engines already in use.
    type: string
output_contract:
  format: markdown
  sections: [Recommendation, Query types, Data model and index, Ranking and filters, Moving items, Scaling and caching, Pitfalls]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Location search fails on details novices miss. Latitude and longitude are not a flat grid: distance needs great-circle math or a geography type, and a degree of longitude shrinks toward the poles. Coordinates order differs between libraries (latitude, longitude versus longitude, latitude), a classic source of results in the ocean. A spatial index (R-tree or GiST in PostGIS, BKD trees in search engines) is the default for static items with filters; geohash or similar cell ids are useful for keying caches, sharding and fast proximity for moving objects held in memory, but cells have edge effects, so a query must check neighbouring cells. Radius search returns "within 5 km", while users usually want "nearest 20 that are open", which is a k-nearest or ranked query with filters applied before the limit. Ranking by distance alone is rarely right; travel time, relevance and availability often matter more. Moving items such as drivers update every few seconds and belong in a fast store with expiry, not in the primary database with a write per ping. Most products need far less than they plan: tens of thousands of points fit comfortably in PostGIS or a search engine on one node.
</context>

<task>
<use_case>
{{use_case}}
</use_case>
{{#scale}}
Scale: {{scale}}
{{/scale}}
{{#stack}}
Existing stack: {{stack}}
{{/stack}}

1. List the query types the product needs and the filters that apply to each.
2. Choose the store: the existing relational database with a spatial extension, the existing search engine's geo features, or an in-memory cell index for fast-moving objects. Prefer what the team already runs when it meets the scale.
3. Give the schema or mapping with a geography or geo-point type and the spatial index, and a sample query for the main use case with the coordinate order stated explicitly.
4. Define ranking: distance plus other signals, filters applied before the limit, cursor pagination that stays stable, and how to handle empty results (expand the radius in steps).
5. For moving items, define the update path, the time to live of a position, and how queries combine fresh positions with item data.
6. Define scaling: partitioning by region or cell when one node is not enough, cache keys by rounded location or cell plus filters, and what to measure before scaling.
7. List pitfalls specific to this case: coordinate order, the antimeridian or poles if relevant, privacy of user locations, and bounding box versus radius differences.
</task>

<constraints>
- Do not compute distances with flat Euclidean math on raw degrees.
- State the coordinate order in every example.
- User location is personal data; do not log or keep precise positions longer than needed, and say so.
- Do not quote engine limits or performance numbers as facts; say what to benchmark.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
The store and indexing approach in at most five lines.
## Query types
Table: query (radius, bounding box, polygon, k nearest, route corridor), where it is used, how it is served.
## Data model and index
Schema or mapping in a code block, with the spatial index.
## Ranking and filters
How distance combines with relevance, availability and filters, and pagination.
## Moving items
How location updates are ingested and expired, or "Not applicable".
## Scaling and caching
Partitioning by region, cache keys, and the limits to measure.
## Pitfalls
Bullets.
</output_format>
