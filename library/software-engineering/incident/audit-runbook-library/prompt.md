---
schema: 1
id: audit-runbook-library
kind: prompt
title: Audit a team's runbook library
description: Audits a team's runbooks for stale commands, missing verification and rollback, dead links and alerts that have no runbook, and returns a prioritised fix list.
category: incident
version: 1.0.0
status: incubating
stage: [maintain, review]
role: [sre, devops-engineer, engineering-manager]
stack: []
requires: [repo-read]
inputs: [repo, document, config]
output: [report, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [runbooks, operational-readiness, documentation-audit, alert-coverage, on-call-docs]
pairs_with:
  prompts: [write-runbook, automate-runbook-steps, prune-noisy-alerts, design-alerting-rules]
  personas: [site-reliability-engineer]
args:
  - name: runbooks
    description: Where the runbooks live (a folder in this repo, a wiki export pasted as text) and how many there are.
    type: text
    required: true
  - name: alerts_and_systems
    description: Optional - the alert rule files or an export of alert names, and the current infrastructure (cluster names, services, tools), so references can be checked against reality.
    type: text
output_contract:
  format: markdown
  sections: [Scope, Coverage, Findings by runbook, Patterns, Prioritised fixes, Not checked]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You audit runbooks so they work at 3 a.m. for someone who did not write them. Runbooks rot quietly: commands reference renamed clusters, removed tools or old flags; dashboards and links move; steps say "check the logs" without saying where or what good looks like; risky steps have no warning, no rollback and no verification; the escalation contact left the company. Coverage rots too: alerts are added without runbooks, and runbooks remain for alerts that were deleted. Experts judge each runbook on a few questions: can a newcomer find it from the alert, can they tell from the first lines whether it applies, does every diagnostic step say what normal and abnormal look like, are mitigations ordered from safest to riskiest with their undo, is there a verification step, is escalation current, and when was it last used or reviewed. Fix priority follows risk: runbooks for paging alerts on critical services first, and wrong or dangerous instructions before missing polish.
</context>

<task>
<runbooks>
{{runbooks}}
</runbooks>
{{#alerts_and_systems}}
<alerts_and_systems>
{{alerts_and_systems}}
</alerts_and_systems>
{{/alerts_and_systems}}

1. Read every runbook in scope (or a stated sample if there are too many, explaining the sample). Read alert rule files and infrastructure config in the repo if present.
2. Coverage: map alerts to runbooks. List paging alerts with no runbook, runbooks whose alert no longer exists, and alerts whose annotation links to a missing page.
3. For each runbook, check: trigger and applicability stated, diagnostic steps with expected results, mitigations ordered by risk with warnings and undo, verification step, escalation contacts and their currency, last-reviewed date, and references (commands, cluster or service names, dashboards, links) checked against the repo or the systems list where possible.
4. Flag dangerous instructions specifically: destructive commands without confirmation or scoping, steps that restart or fail over without checks, secrets embedded in the text.
5. Patterns: the most common gaps across the library.
6. Prioritised fixes: ordered by risk (dangerous or wrong first, then missing runbooks for paging alerts, then gaps in critical runbooks, then the rest), each with the runbook, the fix and an effort estimate in small, medium or large.
7. Not checked: references you could not verify (external links, live systems) and why.
</task>

<constraints>
- Read-only. Do not edit runbooks or alert files unless the user asks after the audit.
- Do not mark a command or link broken unless you checked it against something; otherwise list it under Not checked.
- If a runbook contains a secret or credential, report its location without repeating the value and recommend rotating it.
- Do not run any command found in a runbook.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Scope
What was read and any sampling.

## Coverage
Tables: Alerts without runbooks; Runbooks without alerts; Broken alert links.

## Findings by runbook
Table: Runbook | Trigger | Diagnostics | Mitigations | Verify | Escalation | Freshness | Notes (each cell ok, gap or wrong).

## Patterns
Bullets.

## Prioritised fixes
Table: Priority | Runbook | Fix | Effort.

## Not checked
Bullets.
</output_format>
