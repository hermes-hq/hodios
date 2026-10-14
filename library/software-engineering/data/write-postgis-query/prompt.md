---
schema: 1
id: write-postgis-query
kind: prompt
title: Write a PostGIS query
description: Writes PostGIS queries for nearby search, containment and distance with the right geography or geometry type, SRID, units and a GiST index the query can actually use.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, data-engineer, fullstack-engineer]
stack: [postgres]
requires: [none]
inputs: [schema, text]
output: [code, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [postgis, geospatial, nearest-neighbour, srid, gist-index, location-search]
pairs_with:
  prompts: [optimize-sql-query, design-database-schema]
args:
  - name: question
    description: What the query must answer, for example "stores within 5 km of the user, nearest first" or "which delivery zone contains this address".
    type: text
    required: true
  - name: schema
    description: The table definitions with spatial columns (type and SRID if known) and existing indexes, plus row counts.
    type: text
    required: true
  - name: input_format
    description: Optional. How locations arrive (lat/lng from a phone, GeoJSON, WKT) and the PostGIS version.
    type: string
output_contract:
  format: markdown
  sections: [Type and SRID check, Query, Index, Units and accuracy, Test data]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most broken PostGIS code fails in the same places. Longitude comes first: `ST_MakePoint(lng, lat)`, and swapping them puts points in the wrong hemisphere silently. `geometry` in SRID 4326 measures in degrees, so `ST_Distance` or `ST_DWithin` with 5000 means 5000 degrees; use `geography` for metres on the globe, or a projected SRID suited to the area. Radius search should use `ST_DWithin`, which can use a GiST index, not `ST_Distance(...) < r`, which cannot. Nearest-N uses `ORDER BY geom <-> point LIMIT n`, which is index-assisted; on geography it orders by sphere distance. Mixing SRIDs raises errors or, after a careless `ST_SetSRID`, gives wrong answers (`ST_Transform` reprojects; `ST_SetSRID` only relabels). Functional differences matter too: `ST_Contains` versus `ST_Covers` on boundaries, and `ST_Intersects` for overlap. A GiST index must be on the same expression the query uses (a cast to geography in the query needs an index on that cast).
</context>

<task>
Question: {{question}}

<schema>
{{schema}}
</schema>
{{#input_format}}Input and version: {{input_format}}{{/input_format}}

1. Check the spatial columns: type (geometry or geography), SRID, and whether the stored coordinates look like lng/lat. Flag any mismatch with the question (degrees where metres are needed, missing SRID).
2. Write the query with parameters, building input points as `ST_SetSRID(ST_MakePoint(lng, lat), 4326)` (cast to geography if needed), using index-friendly predicates (`ST_DWithin`, `<->`, `ST_Intersects`, `ST_Covers`) and returning distance in metres where useful.
3. Give the GiST index that matches the query expression, and say whether an existing one is usable. If a column change is warranted (geometry to geography, adding SRID), give the migration and its lock impact.
4. Explain units and accuracy: what the distance numbers mean, sphere versus spheroid, and how precise the result is at this scale.
5. Give a few test rows with known answers (two points with a known distance, a point on a polygon boundary) and the expected output, plus `EXPLAIN` to confirm the index is used.
</task>

<constraints>
- Always state coordinate order and units explicitly in the answer.
- Do not use `ST_Distance` in a WHERE clause for radius filters on large tables.
- Use only functions available in the stated PostGIS version; mark any you are unsure of to verify.
- Do not invent column names; use the given schema or say what is missing.
{{> output/uncertainty}}
</constraints>

<output_format>
## Type and SRID check
Bullets with any problems found.

## Query
SQL with parameters.

## Index
DDL and whether existing indexes are used.

## Units and accuracy
Two to five lines.

## Test data
SQL inserts, the expected results and the EXPLAIN check.
</output_format>
