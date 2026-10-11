---
schema: 1
id: plan-service-decommission
kind: prompt
title: Plan a service decommission
description: Plans shutting down an internal service or system with consumer discovery, traffic checks, a brownout, data archiving, dependency removal, DNS and cost cleanup.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [backend-engineer, sre, devops-engineer, tech-lead]
stack: []
requires: [none]
inputs: [repo, config, logs, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [decommissioning, service-retirement, brownout, data-retention, cloud-cleanup, deprecation]
pairs_with:
  prompts: [map-system-ownership, plan-cross-service-change]
args:
  - name: service
    description: The service or system to shut down, why, what replaces it (if anything), the data it holds, and what you know about its consumers.
    type: text
    required: true
  - name: deadline
    description: Target shutdown date and what drives it (licence end, cost, security).
    type: string
output_contract:
  format: markdown
  sections: [Consumer discovery, Data decision, Phased plan, Cleanup checklist, Rollback, Communications]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Shutting a service down is riskier than it looks because the list of consumers is never complete: a quarterly batch job, a partner integration, a spreadsheet pulling from an API, or another team's fallback path will surface only when the service disappears. The safe pattern is: find consumers from evidence (access logs over a full business cycle including month-end and quarter-end, API keys, network flows, DNS queries, code search), announce, make it read-only, then brown it out (planned short outages or errors) to flush out unknown callers, then switch off while keeping it restorable for a period, and only then delete. Data needs a deliberate decision under retention and legal rules, and the cleanup (DNS, certificates, secrets, alerts, dashboards, CI pipelines, IAM roles, cloud resources, runbooks) is what actually removes cost and attack surface.
</context>

<task>
Service: {{service}}
{{#deadline}}Deadline: {{deadline}}{{/deadline}}

1. Consumer discovery: if you can read repositories or configuration, search for references (hostnames, client libraries, environment variables, API keys) and list them without changing anything. List the evidence sources to check (access logs over at least a full month or business cycle, API key usage, network flow logs, DNS queries, message queue subscribers, scheduled jobs) and build a consumer table.
2. Data decision: what data the service holds, whether it must be migrated, archived for a retention period, or deleted, who decides (data owner, legal or compliance), and how the archive is accessed later. Do not assume a retention period.
3. Phased plan with dates: announce with migration guidance; stop new consumers; read-only mode where relevant; brownouts of increasing length with monitoring of who complains or errors; final switch-off with the service kept restorable for an agreed period; deletion.
4. Cleanup checklist: DNS records, load balancer rules, certificates, secrets and API keys revoked, IAM roles and service accounts, alerts, dashboards, on-call rotations and runbooks, CI and deploy pipelines, feature flags, repositories archived (not deleted), cloud resources and their cost tags, documentation and the service catalog.
5. Rollback: how to restore service quickly during the restorable period if a critical unknown consumer appears.
6. Communications: who to tell, when, and the message for consumers.
</task>

<constraints>
- No deletion of data, infrastructure or repositories until after the restorable period and with the owners' confirmation; list deletion steps for a human to run.
- Do not invent consumers or retention periods; mark unknowns.
- Brownouts are announced in advance.
{{> output/uncertainty}}
</constraints>

<output_format>
## Consumer discovery
Table: Consumer | Evidence | Owner | Migration path | Status.
## Data decision
## Phased plan
Table: Date | Phase | Actions | Exit check.
## Cleanup checklist
## Rollback
## Communications
</output_format>
