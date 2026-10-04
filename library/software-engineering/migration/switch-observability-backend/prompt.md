---
schema: 1
id: switch-observability-backend
kind: prompt
title: Switch observability backend
description: Plans moving logs, metrics and traces to OpenTelemetry and a new backend with a dual-shipping period, name mapping, dashboard and alert parity checks, cost estimates and old agent removal.
category: migration
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [sre, devops-engineer]
stack: []
requires: [none]
inputs: [config, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [opentelemetry, vendor-migration, dual-shipping, alert-parity, telemetry-cost, collector]
pairs_with:
  prompts: [instrument-service-observability]
  personas: [migration-engineer]
args:
  - name: current_stack
    description: What you run now - vendor or self-hosted tools, agents and SDKs per language, data volumes (log GB per day, active metric series, spans per second), number of dashboards and alerts, retention, and what hurts (cost, lock-in, gaps).
    type: text
    required: true
  - name: target_stack
    description: Where you are going (for example "OpenTelemetry Collector to a self-hosted Grafana stack", "OTel to a new vendor").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Current inventory, Target architecture, Name and attribute mapping, Dual-shipping plan, Parity checks, Cost estimate, Decommissioning, Risks and open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An SRE or platform team is moving telemetry from its current setup to {{target_stack}}. These moves fail quietly: an alert that never fires in the new system because a metric changed name, unit or temporality; dashboards rebuilt from screenshots that miss a filter; traces that break because services propagate different context headers during the overlap; log costs that double during dual-shipping; and an old agent left running for a year. The robust path puts a vendor-neutral layer (OpenTelemetry SDKs and a Collector) in front first, ships to both backends for a bounded period, proves parity for what pages people, then removes the old path.
</context>

<task>
<current_stack>
{{current_stack}}
</current_stack>

1. Inventory: per signal (logs, metrics, traces, plus profiles or real-user monitoring if present), the agents and SDKs per language and platform, volumes, retention and who uses what. List alerts that page someone separately from the rest; they define success.
2. Target architecture: OpenTelemetry SDKs or auto-instrumentation per language where mature, the Collector as agent or gateway (or both), processors for batching, memory limits, sampling (head or tail, and where), attribute filtering and redaction of personal data, and exporters to the target. Name the context propagation format during and after the move.
3. Name and attribute mapping: map current metric names, units, label names and temporality (cumulative versus delta) to OpenTelemetry semantic conventions and the target's naming; map log fields and trace attributes the same way. Flag high-cardinality labels that the new backend will charge for or reject.
4. Dual-shipping: ship from the Collector to both backends, service by service, with a fixed end date. State how long (usually long enough to cover one full alerting and reporting cycle) and how to limit cost (sample or filter the old path first).
5. Parity checks: for each paging alert, a query in the target that fires on the same historical incident or a synthetic test; compare key dashboard panels numerically for a set window (expect small differences from sampling and aggregation, and set a tolerance); check trace completeness across service boundaries.
6. Cost estimate method: the target's pricing dimensions (ingested GB, series, spans, retention, queries, users) applied to the measured volumes, with the overlap cost included. Do not state prices; give the formula and what to look up.
7. Decommissioning: move alert routing, switch dashboards and runbooks links, remove old agents and SDKs per service, delete API keys, cancel or reduce the old contract, and archive what must be kept for audit.
</task>

<constraints>
- Never state vendor prices, limits or feature support as fact; say what to check.
- Paging alerts must not have a gap: the old alert stays live until the new one is proven.
- Recommend redacting secrets and personal data in the Collector, and do not copy any you see in the input.
- If volumes or the alert list are missing, ask for them, and mark estimates as [X].
{{> output/uncertainty}}
</constraints>

<output_format>
## Current inventory
Table: signal | source (agent or SDK) | volume | consumers.

## Target architecture
Bullets and a short text diagram of the pipeline.

## Name and attribute mapping
Table: current name | target name | unit and temporality | notes.

## Dual-shipping plan
Phases by service group, with dates as relative weeks and the end condition.

## Parity checks
Table: alert or panel | check | tolerance | owner.

## Cost estimate
The formula with measured or [X] values.

## Decommissioning
Checklist.

## Risks and open questions
Bullets.
</output_format>
