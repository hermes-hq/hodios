---
schema: 1
id: on-call-readiness-track
kind: workflow
title: On-call readiness track
description: Gets a new service ready for on-call in gated steps, from SLOs on user journeys to symptom alerts, a dashboard, runbooks per alert and an escalation and go-live check.
category: incident
version: 1.0.0
status: incubating
stage: [design, build, ship, operate]
role: [sre, backend-engineer, tech-lead, engineering-manager]
stack: []
requires: [none]
inputs: [spec, text, config]
output: [plan, config, docs, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [production-readiness, slo-alerts, runbooks, escalation, go-live]
pairs_with:
  prompts: [define-slos, design-alerting-rules, design-service-dashboard, write-runbook, design-on-call-rotation, write-on-call-handoff]
  personas: [site-reliability-engineer]
args:
  - name: service_description
    description: What the service does and for whom, its main user journeys, architecture and dependencies, how it is deployed, the metrics and logs it already emits, and the launch date.
    type: text
    required: true
  - name: team_size
    description: How many people will share on-call for this service.
    type: number
steps:
  - {id: slos, file: steps/01-slos.md, stage: design, gate: approve, artifact: "on-call/01-slos.md"}
  - {id: alerts, file: steps/02-alerts.md, stage: design, gate: approve, artifact: "on-call/02-alerts.md"}
  - {id: dashboard, file: steps/03-dashboard.md, stage: build, gate: approve, artifact: "on-call/03-dashboard.md"}
  - {id: runbooks, file: steps/04-runbooks.md, stage: build, gate: approve, artifact: "on-call/04-runbooks.md"}
  - {id: go-live, file: steps/05-go-live-check.md, stage: ship, gate: none, artifact: "on-call/05-go-live-check.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Gets one service ready to be paged on, the way an experienced SRE would run a production-readiness review: decide what "working" means for users, page only when that breaks, give responders one place to look and a written next step for every page, and check that a human is actually reachable before launch. Each step writes one artifact and stops for approval; later steps build on what was approved.

<service_description>
{{service_description}}
</service_description>

{{#team_size}}People on the rotation: {{team_size}}{{/team_size}}

Rules for every step:
- Use only the metrics, names and facts given or confirmed. Write anything needed but missing as a placeholder and list it under open questions; never present an invented metric or owner as real.
- Page only on user-facing symptoms or imminent harm; everything else is a ticket or a dashboard.
- Keep it proportionate: a small internal service gets fewer alerts and shorter runbooks than a payments API.
- You prepare and write; the team applies configs and makes the go-live call. Never claim something is deployed or tested unless the user says so.
- End each artifact with open questions.
