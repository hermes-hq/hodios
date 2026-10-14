---
schema: 1
id: estimate-system-capacity
kind: prompt
title: Estimate capacity for a new system
description: Turns usage assumptions for a proposed system into back-of-envelope peak requests per second, storage, bandwidth and instance counts, with the arithmetic shown.
category: architecture
version: 1.0.0
status: incubating
stage: [plan, design]
role: [architect, backend-engineer, tech-lead, sre]
requires: [none]
inputs: [spec, text, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [capacity-estimation, back-of-envelope, sizing, throughput, storage-growth]
pairs_with:
  personas: [software-architect]
  prompts: [estimate-cloud-costs, plan-service-scaling, plan-load-test, review-system-design]
args:
  - name: system
    description: What the system does and the main operations, for example "users upload photos, view feeds, like and comment".
    type: text
    required: true
  - name: assumptions
    description: Whatever you know about users, activity and data, for example daily active users, actions per user per day, object sizes, retention, peak hour behaviour, growth rate.
    type: text
    required: true
  - name: horizon
    description: How far ahead to size, for example "launch", "12 months", "3 years".
    type: string
    default: "12 months"
output_contract:
  format: markdown
  sections: [Assumptions, Traffic, Storage, Bandwidth, Compute and connections, Sensitivity, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A capacity estimate is useful when it is wrong in a known way: every number traceable to an assumption, the arithmetic visible, and the assumption that would change the design most called out. Common mistakes: sizing for the daily average instead of the peak (peak hour is often several times the average, and launches or marketing pushes spike far higher), forgetting the read-to-write ratio, ignoring replication factor, indexes and backups in storage, counting payload bytes but not request overhead, and assuming throughput per instance without measuring. The estimate decides design questions (does this fit on one database, do we need sharding, is a CDN essential), not the purchase order.
</context>

<task>
<system>
{{system}}
</system>

<assumptions>
{{assumptions}}
</assumptions>

Horizon: {{horizon}}.

1. List every assumption you will use in a numbered table, marking each as given or assumed. Where a needed number is missing, pick a stated, defensible value and label it assumed; ask instead only if the system's basic usage is unknown.
2. Traffic: per operation, daily volume, average requests per second (divide by 86,400), and peak requests per second using a stated peak factor. Separate reads and writes.
3. Storage: per data type, size per item times items per day times retention, then multiply by replication, indexes and backups with stated factors. Give the total at launch and at the horizon with the growth rate.
4. Bandwidth: ingress and egress at peak, and how much a CDN or cache would offload with a stated hit ratio.
5. Compute and connections: instances needed at peak from a stated per-instance throughput (labelled as an assumption to benchmark), database connections, and queue throughput. Add headroom for failure of one instance or zone.
6. Sensitivity: vary the two or three most uncertain assumptions by 3x up and down and show which design conclusions change (for example "above 5,000 writes per second a single primary is unlikely to cope").
7. Name what to measure first to replace the riskiest assumptions with data.
</task>

<constraints>
- Show the arithmetic for every derived number, with units, rounded sensibly.
- Never present an assumed number as a fact; label it.
- Do not quote vendor instance limits or prices as facts; when one matters, say what to benchmark or look up.
- Keep orders of magnitude honest; do not imply precision the inputs do not support.
</constraints>

<output_format>
## Assumptions
Table: number, assumption, value, given or assumed.
## Traffic
Table: operation, per day, average RPS, peak RPS, read or write.
## Storage
Table: data, per item, per day, retention, raw total, with overheads, at horizon.
## Bandwidth
## Compute and connections
## Sensitivity
Table: assumption, low, base, high, design conclusion that changes.
## What to measure
Numbered.
</output_format>
