---
schema: 1
id: set-up-agent-audit-logging
kind: prompt
title: Set up audit logging for coding agents
description: Sets up a team record of what coding agents did, including commands, file changes, network calls, tool use and approvals, with sources, redaction, retention, access and review.
category: meta
version: 1.0.0
status: incubating
stage: [design, operate]
role: [security-engineer, devops-engineer, engineering-manager, tech-lead]
requires: [none]
inputs: [text, config]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [coding-agents, audit-trail, agent-telemetry, security-monitoring]
pairs_with:
  prompts: [audit-agent-permissions, design-coding-agent-hooks, design-ci-agent-job, assess-coding-agent-impact]
args:
  - name: setup
    description: Which agents the team uses and where they run (laptops, CI, cloud containers), what admin or telemetry features you have, and why you need the record (security review, compliance, incident investigation, cost).
    type: text
    required: true
  - name: constraints
    description: Privacy, works-council or legal limits on monitoring employees, existing logging platform, and retention rules.
    type: text
output_contract:
  format: markdown
  sections: [What to record, Sources, Pipeline, Redaction and access, Review and alerts, Team communication]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
After an incident involving an agent, the first questions are what it ran, what it changed, what it sent where, and who approved it. Git shows file changes that were committed, nothing else. A useful record captures the session (who, when, which repository, the task), every tool call with arguments and results summarised, shell commands with exit codes, files written, network requests, MCP calls, permission prompts with the decision, and cost. Sources vary: agents write local transcripts, some export telemetry through standard protocols such as OpenTelemetry, hooks can emit an event per tool call, sandboxes and proxies log network egress, CI keeps job logs, and commit trailers can link a commit to a session. Transcripts contain code, prompts and sometimes secrets, so the record itself needs redaction, access control and a retention limit. Recording people's work raises employment and privacy questions in some places; the team should know what is recorded and why.
</context>

<task>
Design audit logging for this setup.
<setup>
{{setup}}
</setup>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. What to record: the events and fields needed for the stated purpose, and what to leave out because it is not needed (data minimisation).
2. Sources: for each environment, where each event can come from (agent telemetry export, hooks, transcript files, proxy or sandbox logs, CI logs, git). If you are not sure a given agent supports a feature, say "check against the tool's documentation".
3. Pipeline: how events reach a central store (the existing logging platform if any), with a session id that ties them together, and a commit trailer or pull request label linking code to sessions.
4. Redaction and access: secret patterns stripped before storage, prompt and code content kept or summarised depending on the purpose, who can read the logs, retention period.
5. Review and alerts: a few high-signal alerts (deny-rule hits, approval bypass flags, pushes to protected branches, unusual egress, publishing commands) and a light periodic review.
6. Team communication: a short notice explaining what is recorded, why, who sees it and how long it is kept.
</task>

<constraints>
- Do not design covert monitoring. The team is told what is recorded.
- Do not state legal conclusions about monitoring rules; flag where legal or the works council must agree.
- Keep alerts few; a noisy alert set is ignored.
{{> output/uncertainty}}
</constraints>

<output_format>
## What to record
Table: event, fields, purpose.
## Sources
Table: environment, event, source, confidence.
## Pipeline
Numbered steps, with config snippets where useful.
## Redaction and access
Bullets.
## Review and alerts
Table: alert, condition, who responds.
## Team communication
The notice text in a fenced block.
</output_format>
