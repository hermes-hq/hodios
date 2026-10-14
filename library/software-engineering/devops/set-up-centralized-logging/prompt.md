---
schema: 1
id: set-up-centralized-logging
kind: prompt
title: Set up centralized logging
description: Ships logs from servers, containers or Kubernetes to Loki, Elasticsearch or a cloud log service, with parsing at the agent, low-cardinality labels, redaction, buffering, retention and cost limits.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [logging, log-shipping, fluent-bit, loki, retention]
pairs_with:
  prompts: [instrument-service-observability, reduce-observability-costs, write-observability-queries]
args:
  - name: sources
    description: Where logs come from, for example "a Kubernetes cluster with 30 services" or "five VMs running nginx, a Java app and cron jobs".
    type: text
    required: true
  - name: notes
    description: "Chosen or preferred backend (Loki, Elasticsearch or OpenSearch, CloudWatch Logs, Cloud Logging, Azure Monitor, a vendor), daily log volume if known, retention and compliance needs, budget, existing agents."
    type: text
output_contract:
  format: markdown
  sections: [Pipeline, Agent config, Backend config, Retention and cost, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A log pipeline has three parts that fail differently: the agent on each node (Fluent Bit, Vector, Grafana Alloy, the OpenTelemetry Collector, or a cloud agent), the transport, and the backend. Backends differ in what they index, which drives both cost and design. Loki indexes only labels, so labels must stay few and low-cardinality (cluster, namespace, app, environment, level) and everything else is searched as text or parsed at query time; a request id as a label destroys it. Elasticsearch and OpenSearch index fields, so uncontrolled JSON keys cause mapping explosions, and index lifecycle policies decide retention. Cloud services charge mostly per GB ingested, so dropping noise at the agent is the cheapest saving. On Kubernetes the agent runs as a DaemonSet reading `/var/log/containers` and adds pod metadata; on Docker hosts the default `json-file` driver has no rotation unless `max-size` is set, which fills disks. Multiline stack traces must be joined at the agent or they arrive as separate lines. Agents need a disk buffer so a backend outage does not lose logs or stall the node, and their own drop and retry metrics should be watched. Personal data and secrets in logs are a compliance problem; redact at the agent, before the data leaves the host.
</context>

<task>
Set up centralized logging for {{sources}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the repository and deployment config: how hosts or clusters are provisioned, existing log agents, log formats per service (JSON or plain text, multiline), and where configuration and secrets live.
2. Propose the pipeline: agent, where it runs, transport, backend, and why. Estimate daily volume from what is known or say how to measure it, and give a rough cost driver for the chosen backend without inventing prices.
3. Write the agent config: inputs per source, multiline handling, JSON parsing, metadata enrichment, a short fixed label or index set, filters that drop health checks and debug noise in production, redaction rules for tokens, passwords and personal data patterns the user names, and a disk buffer with limits.
4. Write the backend config: label or index strategy, retention per environment (and longer only where a requirement says so), access control, and the log rotation settings on hosts or the container runtime.
5. Add monitoring of the pipeline itself: agent drops, retries, buffer usage, and an alert when a source stops sending.
6. Verify: send a known test line from each source type, find it in the backend with the expected fields and labels, confirm a redacted value is masked, and run a sample of the queries the team uses.
</task>

<constraints>
- Do not use high-cardinality values (request ids, user ids, IPs) as Loki labels or index names.
- Do not ship logs to a third-party service before the user confirms data residency and personal data handling.
- Do not quote prices; explain the cost drivers and how to estimate them.
- Do not change application log formats as part of this change; list suggested changes as follow-ups.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Pipeline
Diagram or list: sources, agent, transport, backend, with reasons.
## Agent config
Files with paths and contents.
## Backend config
Labels or indices, retention, access, rotation settings.
## Retention and cost
Volume estimate, retention per environment, drops and their expected effect.
## Verification
Test lines found, redaction checked, pipeline alerts, or the steps to run them.
</output_format>
