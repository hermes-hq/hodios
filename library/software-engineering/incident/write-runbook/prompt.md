---
schema: 1
id: write-runbook
kind: prompt
title: Write a runbook for an alert
description: Writes an on-call runbook for one alert or operational task, with diagnosis steps, safe mitigations, verification and escalation. Use when adding an alert or after an incident showed a gap.
category: incident
version: 1.0.0
status: experimental
stage: [operate, maintain]
role: [sre, devops-engineer, software-engineer]
stack: []
requires: [repo-read]
inputs: [config, notes, repo]
output: [docs, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [runbook, alerting, playbook]
pairs_with:
  prompts: [triage-production-alert, write-postmortem]
args:
  - name: alert
    description: The alert or task the runbook covers, with its rule or condition if you have it.
    type: text
    required: true
  - name: system
    description: The service and its dependencies, where it runs, and the tools on-call has (dashboards, log search, kubectl, cloud console).
    type: text
  - name: known_fixes
    description: What has fixed this before, from past incidents or team knowledge.
    type: text
output_contract:
  format: markdown
  sections: [What this alert means, First five minutes, Diagnose, Mitigate, Verify, Escalate, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A runbook is read by someone who was asleep two minutes ago and may never have touched this service. It must tell them what is broken, how bad it is, and what to do next, in order, with commands they can copy. A runbook with invented commands is worse than none, because it fails at the worst moment.
</context>

<task>
Write a runbook for: {{alert}}
{{#system}}
System: {{system}}
{{/system}}
{{#known_fixes}}
What has worked before: {{known_fixes}}
{{/known_fixes}}

1. If the repository is available, read the alert rule, the service's config, deploy manifests and existing docs, so commands, names and thresholds match reality. Say what you read.
2. Explain what the alert means in user terms and what happens if nobody acts.
3. Write the first five minutes: how to confirm the alert is real, measure the impact, and check for a recent change.
4. Write diagnosis as a decision tree: "If X, go to step N". Each check gives the command or query and what a healthy and an unhealthy result look like.
5. Write mitigations from least to most risky. Each has the exact steps, how long it takes to have an effect, how to verify it worked, and how to undo it.
6. Say when and how to escalate, and to whom by team or role.
</task>

<constraints>
- Use only commands, resource names, dashboards and thresholds you found in the repo or the input. Anywhere else, write a placeholder such as `<namespace>` or `<dashboard link>` and list it under Gaps. Never invent flags.
- Put read-only checks before any change. Mark every step that changes state with **Changes production**, and every step that can lose data with **Destructive: confirm with the service owner first**.
- One action per numbered step. Imperative mood. No background essays.
- Refer to teams and roles, not named people.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## What this alert means
Two or three sentences: the condition, the user impact, and the cost of waiting.

## First five minutes
Numbered steps.

## Diagnose
Numbered decision tree with commands in code blocks and expected results.

## Mitigate
Numbered options, least risky first, each with verify and undo.

## Verify
How to confirm recovery and when it is safe to close the alert.

## Escalate
When, to whom (team or role), and what to include.

## Gaps
Placeholders to fill and facts the runbook still needs. "None" if empty.
</output_format>
