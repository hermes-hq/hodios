---
schema: 1
id: design-service-dashboard
kind: prompt
title: Design a service dashboard
description: Designs an operational dashboard for one service, with golden signals on top, dependencies, saturation, deploy annotations and drill-down order, plus the query and on-call action for each panel.
category: incident
version: 1.0.0
status: incubating
stage: [design, operate]
role: [sre, backend-engineer, devops-engineer]
stack: []
requires: [none]
inputs: [text, config]
output: [plan, table, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [golden-signals, red-method, use-method, dashboards-as-code, grafana]
pairs_with:
  prompts: [instrument-service-observability, define-slos, write-observability-queries, write-runbook]
  personas: [site-reliability-engineer]
args:
  - name: service_description
    description: What the service does, its main endpoints or jobs, its dependencies (databases, queues, other services, third parties), how it is deployed, its SLOs if any, and the metric names and labels you already have.
    type: text
    required: true
  - name: metrics_backend
    description: Where metrics live and which query language to use, for example "Prometheus and Grafana", "Datadog" or "CloudWatch". Leave empty for generic queries.
    type: string
output_contract:
  format: markdown
  sections: [Purpose and audience, Layout, Panels, Annotations and variables, Drill-down path, What not to add, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design the first dashboard an on-call engineer opens when this service pages. It must answer, top to bottom and in under a minute: are users hurt, since when, is it us or a dependency, and did something change. Most service dashboards fail because they are a wall of 40 resource graphs with no order, average latency hides the tail, and deploys are invisible so the obvious cause is missed. Use the golden signals (traffic, errors, latency, saturation), RED for request paths and USE for resources, and give every panel a reason to exist.

{{#metrics_backend}}Metrics backend: {{metrics_backend}}{{/metrics_backend}}
</context>

<task>
<service_description>
{{service_description}}
</service_description>

1. State the audience (on-call first, then service owners) and the three questions the top row answers.
2. Lay out rows in this order:
   - Row 1, user impact: SLO status and error-budget remaining if SLOs exist; request rate; error ratio (5xx or failed jobs over total, not a raw count); latency p50, p95, p99 as threshold lines against the SLO target, never an average alone.
   - Row 2, by dimension: the same signals split by route or job type, and by version or region, so a bad deploy or one region stands out.
   - Row 3, dependencies: for each dependency, call rate, error ratio and latency from this service's side, plus timeouts and retries, and circuit-breaker state if any.
   - Row 4, saturation: the resource that runs out first for this workload (connection pools, thread or worker pools, queue depth and age of oldest message, memory against limit, CPU throttling, disk), each against its limit.
   - Row 5, background: batch jobs, consumers, caches (hit ratio), with last success time.
3. For each panel give: title as a question ("Are checkout requests failing?"), the query in the chosen backend's language or a generic form, visualisation type, unit, thresholds, and what on-call does when it is red (which runbook or which row to look at next).
4. Annotations: deploys, config and feature-flag changes, scaling events and incidents on every time-series panel. Variables: environment, region, version; default time range 6 hours with a comparison to one week earlier for traffic.
5. Write the drill-down path: from a red panel in row 1 to the row and panel that separates the likely causes, and then to traces or logs with the label to filter on.
6. List what not to put on this dashboard (per-pod resource graphs, business KPIs, anything nobody acts on) and where it belongs instead.
</task>

<constraints>
- Use only the metric names and labels given; write any you need but do not have as a clearly marked placeholder and list it under Gaps.
- Keep the first screen to about eight panels; everything else goes below the fold or on linked dashboards.
- Use rates and ratios over windows of at least four scrape intervals; never graph raw counters.
- Use colour only for state (ok, warning, breach) and make thresholds match alert thresholds where alerts exist.
- If the service description lacks dependencies or the deploy method, ask for them in Gaps rather than assuming.
</constraints>

<output_format>
## Purpose and audience
Two to four lines.
## Layout
A row-by-row sketch (text grid or list).
## Panels
Table: row | panel question | query | visualisation and unit | thresholds | when red, do this.
## Annotations and variables
Bullets.
## Drill-down path
Numbered path for the two or three most likely failure modes.
## What not to add
Bullets with where each belongs.
## Gaps
Missing metrics, labels or information, or "None".
</output_format>
