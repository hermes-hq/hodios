---
schema: 1
id: set-up-prometheus-monitoring
kind: prompt
title: Set up Prometheus and Grafana monitoring
description: Sets up Prometheus, Alertmanager and Grafana for a service or cluster, with scrape targets, exporters, recording and alert rules, dashboards as code, retention and checks with promtool.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre, backend-engineer]
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
tags: [prometheus, grafana, alertmanager, exporters, promql]
pairs_with:
  prompts: [instrument-service-observability, design-alerting-rules, design-service-dashboard]
args:
  - name: targets
    description: What to monitor, for example "three Go services and Postgres on a Kubernetes cluster" or "two VMs running nginx and a Node app".
    type: text
    required: true
  - name: notes
    description: "Platform (Kubernetes with Helm, Docker Compose, VMs), existing metrics endpoints, how long data must be kept, where alerts should go, and whether a managed Prometheus or Grafana is an option."
    type: text
output_contract:
  format: markdown
  sections: [Architecture, Config, Rules, Dashboards, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Prometheus pulls metrics from targets it discovers, stores them locally, evaluates rules and sends alerts to Alertmanager, which groups, silences and routes them. On Kubernetes the common path is the Prometheus Operator, usually through the kube-prometheus-stack chart, where scrape targets are declared with `ServiceMonitor` and `PodMonitor` resources rather than hand-written scrape configs; elsewhere, static or file-based service discovery works. Things that need to be decided, not defaulted: things the app does not expose itself come from exporters (node_exporter for hosts, blackbox_exporter for probing endpoints, database exporters); label cardinality is the main cause of memory blow-ups, so user ids, request ids or raw URLs must never be labels; local storage is single-node and keeps 15 days by default, so long retention or high availability needs remote write to a long-term store; `rate()` windows should be at least four times the scrape interval; recording rules (named `level:metric:operations`) make heavy dashboard queries cheap; the `up` metric and a "watchdog" alert that always fires catch a dead pipeline. Grafana dashboards and data sources should be provisioned from files in git, not clicked together. `promtool check config`, `promtool check rules` and `promtool test rules` catch most mistakes before deploy.
</context>

<task>
Set up Prometheus monitoring for {{targets}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the repository: deployment tooling (Helm, Kustomize, Compose, Ansible), existing metrics endpoints and their ports and paths, existing dashboards or alerts, and how secrets are handled. Follow the deployment conventions already in use.
2. Propose the architecture: where Prometheus, Alertmanager and Grafana run, how targets are discovered, which exporters are needed, scrape interval, retention and whether remote write is needed for the retention asked for. Estimate active series per target.
3. Write the config: scrape config or `ServiceMonitor`/`PodMonitor` resources per target, exporters, relabelling that drops high-cardinality labels, Alertmanager routing to the receivers given (secrets from the secret store), Grafana data source provisioning.
4. Write recording rules for the queries dashboards and alerts use, and a starter set of alerts: target down, the service's error rate and latency, saturation (disk, memory), and a watchdog. Each alert gets a `for` duration, severity label and a runbook link placeholder.
5. Write dashboards as JSON or through the provisioning mechanism, one per service with request rate, errors, latency percentiles and saturation.
6. Validate with `promtool check config`, `promtool check rules` and unit tests for the main alerts if possible. After deploy, check the targets page, a query per target, and send a test alert through Alertmanager.
</task>

<constraints>
- Do not expose Prometheus, Alertmanager or Grafana publicly without authentication.
- Do not add labels with unbounded values; drop or aggregate them.
- Do not put receiver credentials or webhook URLs in plain config; use the platform's secret mechanism.
- Do not invent metric names; use the names the targets and exporters actually expose, and mark any you could not confirm.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Architecture
Components, where they run, discovery, retention, estimated series.
## Config
Files with paths and contents.
## Rules
Recording and alert rules with the reason for each threshold.
## Dashboards
Files and panels.
## Verification
promtool results, target status, test alert, or the commands to run.
## Follow-ups
Instrumentation gaps, long-term storage, alerts to tune after a week of data.
</output_format>
