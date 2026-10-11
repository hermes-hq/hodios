---
schema: 1
id: write-service-readme
kind: prompt
title: Write an internal service README
description: Writes the README for an internal service with owners, purpose, upstream and downstream dependencies, dashboards, runbooks, SLOs, deploy steps and how to run it locally.
category: docs
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, sre, tech-lead]
stack: []
requires: [repo-read, file-write]
inputs: [repo, config, text]
output: [docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [service-catalog, service-ownership, runbook-links, dependencies, internal-docs]
pairs_with:
  prompts: [write-onboarding-guide, write-ownership-handover-doc]
args:
  - name: service_notes
    description: Anything the code does not show - owning team and channel, on-call rotation, dashboard and runbook locations, SLOs, known consumers.
    type: text
    default: none given
output_contract:
  format: markdown
  sections: [README written, Facts from code, Gaps, Questions for the owners]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An internal service README is read most often by someone who did not write the service: an on-call engineer at night, a team integrating with it, or a new owner. They need operating facts first, not a feature tour: who owns it and how to reach them, what it does in one sentence, what breaks if it is down, what it depends on (databases, queues, other services, third parties), where the dashboards, logs, alerts and runbooks are, how it is deployed and rolled back, its SLOs, and how to run it locally. Most of these facts can be derived from code and config (dependencies from clients and env vars, endpoints from routes, deploy from CI files); the rest must come from the team, and a README that guesses a dashboard URL or owner is worse than one with a clear blank.
</context>

<task>
Write the README for the service in this repository.

Notes from the team:
<service_notes>
{{service_notes}}
</service_notes>

1. Read the code and config: entry points, exposed APIs and events, outbound clients, environment variables, CI and deploy configuration, health checks, and existing docs or catalog files (for example a `catalog-info.yaml`).
2. Write a header block: one-sentence purpose, owning team, contact channel, on-call, tier or criticality.
3. Write "What it does" and "What breaks if it is down", naming the known consumers.
4. Write "Dependencies": upstream services, datastores, queues and third parties, each with what happens when it fails if the code shows it (retries, fallback, hard failure).
5. Write "Interfaces": APIs, events produced and consumed, with links to their specs.
6. Write "Operating it": dashboards, logs, alerts, runbooks, SLOs, deploy and rollback, feature flags, and config that is safe or unsafe to change.
7. Write "Local development": prerequisites, run, test, and how to stub dependencies, using the repo's real commands.
8. Keep it short; link to deeper docs instead of copying them.
</task>

<constraints>
- Never invent owners, channels, URLs, SLO numbers or consumers. Leave a visible `TODO(owner):` placeholder for each fact you could not find.
- Do not copy secrets or internal hostnames from config into the README beyond what is already in committed docs.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Write the README. Then reply with:
## README written
Path and sections.
## Facts from code
Dependencies, interfaces and commands you derived, with the file each came from.
## Gaps
Each `TODO(owner):` placeholder left.
## Questions for the owners
Questions to fill the gaps, grouped by who can answer.
</output_format>
