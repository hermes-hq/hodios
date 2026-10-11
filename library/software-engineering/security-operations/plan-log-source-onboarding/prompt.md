---
schema: 1
id: plan-log-source-onboarding
kind: prompt
title: Plan security log source onboarding
description: Plans which security logs to collect first, the fields and settings each needs, retention, parsing checks and silent-source monitoring, so investigations and detections have the data they need.
category: security-operations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [security-engineer, devops-engineer]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [siem, log-collection, log-retention, telemetry, data-quality]
pairs_with:
  prompts: [map-detection-coverage, write-siem-query, investigate-cloud-audit-logs]
  personas: [detection-engineer]
args:
  - name: environment
    description: What you run - endpoints and operating systems, identity provider, mail, cloud accounts, network and edge devices, key applications - and what the SIEM or log platform ingests today.
    type: text
    required: true
  - name: goals
    description: What the logs must support - specific detections, investigations you could not do last time, audit or compliance needs you have been told about. Optional.
    type: text
  - name: limits
    description: Budget, licence or ingest volume limits and team capacity. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Priority sources, Per-source settings, Retention, Parsing checks, Health monitoring, Cost levers, Rollout order]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most investigations that stall do so for lack of the right log, not the right analyst. The common gaps are predictable: process creation without command lines, no DNS query logs, cloud audit logs that were never turned on for every account and region, identity provider sign-ins kept for the default short period, mail audit settings left off, and time zones that do not match. Logs that are collected can still fail silently: a parser change drops a field, an agent stops sending after an update, a source goes quiet and nobody notices until the day it is needed. Retention should be set by how long attackers typically stay unnoticed and by any obligation the organisation has, and cost pressure should be met by tiering storage or filtering truly low-value events, not by dropping the logs investigations depend on.
</context>

<task>
Plan log source onboarding for this environment.

<environment>
{{environment}}
</environment>
{{#goals}}

<goals>
{{goals}}
</goals>
{{/goals}}
{{#limits}}

<limits>
{{limits}}
</limits>
{{/limits}}

1. State assumptions and what you could not tell from the description.
2. Rank log sources by value for detection and investigation in this environment: identity provider sign-ins and admin changes, endpoint telemetry (process with command line, network, file, registry), cloud control-plane audit logs for every account and region, mail and collaboration audit, DNS, proxy or egress firewall, VPN and remote access, edge device and admin interface logs, critical application audit logs. Explain the ranking.
3. For each priority source give the settings that make it useful: required events and fields, audit policies to enable, time zone and clock source, the identity fields needed to join it to other sources.
4. Recommend retention tiers (searchable hot, cheaper warm or archive) with reasoning; for any legal or regulatory retention requirement, say it depends on country and sector and must be confirmed by the compliance owner rather than stating a number as required.
5. Parsing checks per source: a sample event to verify, fields that must be populated, and a test search that proves it works.
6. Health monitoring: alerts for a source going quiet or dropping sharply in volume, parsing error rates, agent coverage against the asset list, and a monthly review.
7. Cost levers that do not hurt investigations: filtering known-noisy event types, summarising high-volume flows, storage tiers, and what never to drop.
8. Rollout order in waves with owners and a done test per wave.
</task>

<constraints>
- Do not invent product-specific event ids, field names or settings unless they are well established for the named product; otherwise describe the event and mark it "confirm the exact setting in the product's documentation".
- Do not state legal retention periods as fact.
- Do not recommend collecting content of personal communications beyond what security needs; note privacy and works council or employee-notice checks where monitoring touches staff.
</constraints>

<output_format>
## Assumptions
Bullets.

## Priority sources
Table: Rank | Source | Why it matters | Collected today?

## Per-source settings
One short subsection per priority source.

## Retention
Table: Source | Hot | Archive | Reason.

## Parsing checks
Table: Source | Fields that must be present | Test search.

## Health monitoring
Bullets.

## Cost levers
Bullets, ending with "Never drop".

## Rollout order
Numbered waves with owner and done test.
</output_format>
