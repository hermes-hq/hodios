---
schema: 1
id: run-production-readiness-review
kind: prompt
title: Run a production readiness review
description: Runs a production readiness review for a new or changed service against a checklist (observability, on-call, capacity, security, data, rollback, docs) and ends in a launch decision.
category: planning
version: 1.0.0
status: incubating
stage: [verify, ship]
role: [sre, tech-lead, devops-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [repo, config, document, text]
output: [checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [production-readiness, launch-review, operational-readiness, reliability, go-no-go, launch-checklist]
pairs_with:
  prompts: [plan-prototype-to-production, plan-cross-service-change]
args:
  - name: service
    description: The service, what it does, its dependencies and consumers, expected traffic, data it stores, the launch date, and any design doc, runbook or dashboard links you can paste.
    type: text
    required: true
  - name: tier
    description: How critical the service is, which sets how strict the review is.
    type: enum
    enum: [critical, standard, internal]
    default: standard
output_contract:
  format: markdown
  sections: [Summary and decision, Checklist results, Blocking gaps, Non-blocking follow-ups, Evidence to collect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A production readiness review checks that a service can be operated, not that it works in a demo. Services launched without one fail in familiar ways: alerts that page nobody or everybody, no runbook for the first incident, no load test above launch traffic, a dependency without a timeout, backups never restored, secrets in config, no way to roll back a schema change, and an on-call team that first sees the service at 3 a.m. The review should be proportional to the service's criticality, separate launch blockers from follow-ups with owners and dates, and rely on evidence (a dashboard, a test result, a restore log) rather than answers like "we think so".
</context>

<task>
Service: {{service}}
Tier: {{tier}}

1. If you can read the repository or configuration, look for evidence before asking: health checks, timeouts and retries, resource limits, alert definitions, dashboards as code, runbooks, migration files, secrets handling. Cite what you found; do not change anything.
2. Review each area and mark it ready, gap, or unknown, with the evidence: ownership and on-call (team, rotation, escalation, on-call trained); observability (key metrics, SLOs or targets, dashboards, alerts tied to user impact, logs and traces with correlation); capacity and performance (load tested at expected peak with headroom, autoscaling, limits, quotas on dependencies); resilience (timeouts, retries with backoff, circuit breaking or degradation, behaviour when each dependency fails); data (backups, a tested restore, retention, migrations reversible); security (authentication, secrets management, least privilege, dependency scanning, privacy review where personal data is stored); deployment and rollback (automated deploy, rollback tested, feature flags); documentation (runbook, architecture overview, known failure modes); launch plan (gradual rollout, communication, support briefed).
3. Scale strictness to the tier: a critical service needs all areas ready or an accepted exception; an internal tool can launch with lighter observability and a documented risk.
4. Separate blocking gaps from non-blocking follow-ups; each with an owner and a date.
5. Give a decision: go, go with conditions, or not ready, with the reasoning. Where answers are unknown, list the questions and ask them before deciding if the user can answer now.
</task>

<constraints>
- Mark items without evidence as unknown, not ready.
- Do not invent dashboards, alerts or test results; ask for them.
- The decision is a recommendation for the owning team and approvers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary and decision
Decision, then three sentences.
## Checklist results
Table: Area | Item | Status (ready, gap, unknown) | Evidence.
## Blocking gaps
Table: Gap | Why it blocks | Owner | Due.
## Non-blocking follow-ups
Table: Item | Owner | Due.
## Evidence to collect
</output_format>
