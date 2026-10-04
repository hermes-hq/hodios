---
schema: 1
id: design-time-series-schema
kind: prompt
title: Design a time-series schema
description: Designs storage for sensor, IoT or metrics data, covering wide versus narrow tables, time partitions, retention, downsampling, late points, cardinality and the queries it must serve.
category: data
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, embedded-engineer, data-engineer]
stack: []
requires: [none]
inputs: [text, schema]
output: [code, report, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [time-series, iot, downsampling, retention, cardinality, late-data]
pairs_with:
  prompts: [plan-table-partitioning, design-database-schema, choose-database-for-workload]
  personas: [database-administrator]
args:
  - name: data_description
    description: What is measured, by what (devices, services), the identifying attributes (device id, site, type), sample frequency, and the queries and dashboards it must serve, with how fresh and how far back.
    type: text
    required: true
  - name: volume
    description: Number of series or devices, points per second or per day, expected growth, and how long data must be kept.
    type: string
    required: true
  - name: database
    description: The database in use or preferred (for example Postgres with a time-series extension, a dedicated time-series database, ClickHouse), or "recommend".
    type: string
    default: recommend
output_contract:
  format: markdown
  sections: [Sizing, Data model, Partitioning and retention, Downsampling, Ingest rules, Query check, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An engineer needs to store sensor, IoT or metrics data. Time-series designs fail on volume arithmetic nobody did, on cardinality (every unique combination of tags is a series, and unbounded tags such as a request id or user id explode it), on keeping raw data forever because retention was never decided, on dashboards that scan months of raw points instead of rollups, and on devices that send data late, twice or with a wrong clock. Choices like wide (one column per metric) versus narrow (one row per metric value) and the partition interval follow from the queries, not taste.

Volume: {{volume}}
Database: {{database}}
</context>

<task>
<data_description>
{{data_description}}
</data_description>

1. Sizing: compute points per day and per year, raw bytes per point for the chosen layout (estimate and show the arithmetic), total raw size over the retention period before and after compression (state the compression assumption as a range, not a fact), and the number of distinct series.
2. Data model: choose wide or narrow and say why (wide when metrics from one source arrive together and are queried together; narrow when metrics are sparse or vary by device). Separate series metadata (device, site, model, location) into its own table referenced by a series or device id, so it is not repeated on every point. Types: timestamp with time zone in UTC, numeric types sized to the sensor's precision, and a quality or status flag if devices report one.
3. Cardinality: list the tags or columns that identify a series, flag any unbounded ones and move them out of the series key.
4. Partitioning and retention: partition or chunk interval by time sized so the active partition and its indexes fit comfortably in memory (state the target size), with a secondary key (device or site) only if queries filter on it. Retention per tier: raw, rollups and aggregates, each with a period and a drop mechanism (drop whole partitions, never mass deletes).
5. Downsampling: rollups (for example 1-minute, 1-hour, 1-day) with min, max, avg, count and last as fits the signal (averages alone hide spikes), built continuously or on a schedule, and how late data updates them.
6. Ingest rules: batching, deduplication key (series id plus timestamp), how late and out-of-order points are accepted (and up to how late), device clock skew handling, and backfill of historical data.
7. Query check: for each listed query, the table or rollup it hits and the index that serves it; if the database is "recommend", give a recommendation and the reasons from this workload.
</task>

<constraints>
- Show the sizing arithmetic; mark assumed values (bytes per point, compression ratio) as assumptions.
- Do not state product limits, features or prices as fact; say what to verify.
- If query patterns or retention are missing, ask; they decide the design. Mark placeholders as [X].
{{> output/uncertainty}}
</constraints>

<output_format>
## Sizing
Table: quantity | value | arithmetic.

## Data model
DDL or equivalent for the points and metadata tables, with a note on wide versus narrow.

## Partitioning and retention
Table: tier | granularity | partition interval | retention | drop mechanism.

## Downsampling
Rollup definitions and refresh approach.

## Ingest rules
Bullets.

## Query check
Table: query | served by | index or ordering | expected scan.

## Risks and open questions
Bullets.
</output_format>
