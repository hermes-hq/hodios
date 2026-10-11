---
schema: 1
id: map-service-dependencies
kind: prompt
title: Map service dependencies
description: Builds a dependency map of services, data stores and third parties from code, config and traces, flagging cycles, hidden coupling, critical paths and missing owners.
category: architecture
version: 1.0.0
status: incubating
stage: [discover]
role: [architect, sre, tech-lead, backend-engineer]
requires: [repo-read]
inputs: [repo, config, logs, document]
output: [diagram, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dependency-map, service-catalog, critical-path, coupling, system-inventory]
pairs_with:
  personas: [software-architect]
  prompts: [write-c4-diagram, remove-single-points-of-failure, design-graceful-degradation, untangle-circular-dependencies]
args:
  - name: scope
    description: Which system or set of repositories to map, and why (incident review, onboarding, a migration, a reliability audit).
    type: text
    required: true
  - name: sources
    description: What is available to read, such as repositories, infrastructure code, service mesh or tracing data, API gateway config, or an existing service catalogue.
    type: text
    required: true
  - name: focus
    description: A user journey or service to centre the map on, if the whole system is too large.
    type: text
output_contract:
  format: markdown
  sections: [Sources used, Dependency map, Dependency table, Findings, Gaps, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most teams' architecture diagrams are wrong in the ways that matter during incidents: they show the intended calls and miss the shared database a "separate" service also reads, the configuration service everything needs at startup, the third-party API called from a batch job, or the cycle where two services call each other. A trustworthy map is built from evidence: HTTP and gRPC client configuration and base URLs, message topics produced and consumed, database connection strings, environment variables, infrastructure code, and, best of all, distributed traces or mesh telemetry that show real traffic. Each edge needs a direction, a type (sync call, async message, shared data store, startup dependency), and whether it is on a user-facing critical path. The valuable output is not the picture but the findings: cycles, hidden shared stores, fan-in hotspots, critical paths through unowned or fragile components.
</context>

<task>
<scope>
{{scope}}
</scope>

<sources>
{{sources}}
</sources>

{{#focus}}
<focus>
{{focus}}
</focus>
{{/focus}}

1. Read the sources listed. In repositories, look for HTTP and gRPC clients and base URLs, message producers and consumers with topic or queue names, database and cache connection settings, environment variables and secrets references, scheduled jobs, and infrastructure code. Use traces or mesh data where provided. Do not call any service or change any file.
2. Build the node list: services, data stores, queues and topics, scheduled jobs, external third parties, and platform dependencies (DNS, identity, config, secrets).
3. Build the edge list with direction, type (sync, async, shared store, startup), evidence (file and line, or trace), and whether it sits on a user-facing critical path.
4. Mark confidence for each edge: confirmed by traffic, found in code or config, or inferred from naming.
5. Analyse: dependency cycles, shared data stores used by more than one service, fan-in hotspots, long synchronous chains on critical paths, startup dependencies that can block recovery, third parties without fallbacks, and components with no clear owner.
6. List gaps: repositories or environments not read, dynamic URLs that could not be resolved, and how to close them.
</task>

<constraints>
- Every edge must cite its evidence; do not draw edges from naming guesses without marking them as inferred.
- Read-only: do not run commands that call services, change configuration or write files.
- Do not include secrets or credentials found while reading; mention only that a reference exists.
{{> output/uncertainty}}
</constraints>

<output_format>
## Sources used
Bullets: what was read and what was not available.
## Dependency map
A Mermaid flowchart with edge labels for type; critical-path edges marked.
## Dependency table
Table: from, to, type, critical path (yes or no), evidence, confidence.
## Findings
Numbered, most severe first, each with the affected components.
## Gaps
## Next steps
</output_format>
