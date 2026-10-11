---
schema: 1
id: triage-alert-storm
kind: prompt
title: Triage an alert storm
description: Turns dozens or hundreds of alerts firing at once into a few incidents, finding the upstream cause through dependencies and timing, and silencing consequences safely with expiry.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer]
stack: []
requires: [none]
inputs: [logs, text]
output: [summary, table, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [alert-storm, alert-grouping, dependency-map, silencing, alert-triage]
pairs_with:
  prompts: [triage-production-alert, prune-noisy-alerts, design-alerting-rules, write-incident-update]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: alerts
    description: The firing alerts as text - name, service or host, severity, start time and labels - from the pager or alert manager. A raw export is fine.
    type: text
    required: true
  - name: dependencies
    description: What depends on what - shared databases, caches, queues, networks, clusters, DNS, identity, third parties - and recent changes, if known.
    type: text
output_contract:
  format: markdown
  sections: [Groups, Likely upstream cause, First actions, Safe silencing, Still unexplained]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an on-call engineer facing a wall of alerts. In a storm, most alerts are symptoms of one or two failures upstream: a database, a network segment, DNS, a shared cache, a cluster node pool, or an identity provider takes down everything that depends on it. The cause is usually among the earliest alerts and at the bottom of the dependency graph, not the most severe or the loudest. Experts sort by start time, group by shared labels (cluster, zone, node, dependency), and look for the alert that explains the others. They also watch for the opposite trap: two unrelated incidents at once, or a storm caused by the monitoring system itself (an exporter or agent down makes every check fail with "no data", a time series database overloaded makes rules misfire). Silencing helps focus, but a silence without an expiry or scoped too broadly hides the next real failure.
</context>

<task>
<alerts>
{{alerts}}
</alerts>
{{#dependencies}}
<dependencies>
{{dependencies}}
</dependencies>
{{/dependencies}}

1. Sort the alerts by start time and group them by shared labels and by the dependencies given. Count alerts per group.
2. For each group, name the most likely upstream alert or component and how the rest follow from it, marking links that rely on the dependency information as inferred.
3. Check for a monitoring-side cause: many "no data" or "absent" alerts, alerts from one scraper or agent, or a gap in all metrics at the same time.
4. Name the likely upstream cause (or causes, if the groups do not connect) and the one check that would confirm each.
5. First actions: what the on-call should look at first, who to page if the cause is in another team's system, and whether to declare an incident.
6. Safe silencing: which alerts to silence or acknowledge as consequences, scoped by exact labels, with an expiry (for example 1 hour), and which must stay loud because they would reveal a second problem.
7. Still unexplained: alerts that do not fit any group and need their own look.
</task>

<constraints>
- Do not pick the cause by severity or by alert count alone; justify it by timing and dependency.
- Never recommend silencing without labels and an expiry, or silencing the alert believed to be the cause.
- Keep at least the user-facing symptom alerts (error rate, availability, SLO burn) unsilenced so recovery is visible.
- Do not invent dependencies; if none were given, infer only from labels and say so.
{{> output/uncertainty}}
</constraints>

<output_format>
## Groups
Table: Group | Alerts (count) | Earliest | Shared labels | Likely source.

## Likely upstream cause
Ranked, with timing and dependency reasoning and the confirming check.

## First actions
Numbered, at most five.

## Safe silencing
Table: Matcher (labels) | Reason | Expiry | Keep loud instead?

## Still unexplained
Alerts outside any group.
</output_format>
