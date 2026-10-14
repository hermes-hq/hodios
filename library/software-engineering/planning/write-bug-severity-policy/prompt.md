---
schema: 1
id: write-bug-severity-policy
kind: prompt
title: Write a bug severity policy
description: Writes bug severity and priority definitions with product-specific examples, fix-time targets, who sets them, and how bugs are escalated or downgraded, so triage is consistent.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [engineering-manager, qa-engineer, tech-lead, product-manager]
stack: []
requires: [none]
inputs: [notes, text]
output: [docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [bug-triage, severity-levels, priority, fix-time-targets, quality-policy]
pairs_with:
  prompts: [prioritize-bug-backlog, design-issue-tracker-structure, write-definition-of-done]
args:
  - name: product
    description: What the product is, who uses it, its critical flows (for example checkout, login, data sync), and any contractual SLAs or regulated features.
    type: text
    required: true
  - name: current_problems
    description: What goes wrong in triage today, for example everything is marked critical, bugs sit unassigned, support and engineering disagree.
    type: text
  - name: release_model
    description: How fixes ship, for example continuous deploy, weekly release, app store releases, on-premise customers.
    type: string
output_contract:
  format: markdown
  sections: [Severity levels, Priority, Fix-time targets, Who decides, Escalation and changes, Examples for this product]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Severity describes how bad the effect is; priority describes how soon the team will fix it. Mixing them is why everything ends up "critical". Definitions only work when they are tied to concrete effects (data loss, money, security, blocked core flow with or without a workaround, cosmetic) and illustrated with examples from the team's own product, so two people classify the same bug the same way. Fix-time targets must match how fixes can actually ship (an app store release cannot meet a four-hour target), and the top level must hand over to the incident process rather than sit in the backlog. Someone must own the final call, and the reporter's label is a suggestion.
</context>

<task>
Product: {{product}}
{{#current_problems}}Current problems: {{current_problems}}{{/current_problems}}
{{#release_model}}Release model: {{release_model}}{{/release_model}}

1. Define four severity levels by effect, each with a one-line test ("Can a user complete the core flow? Is there a workaround? Is data, money or security affected?"). The top level covers data loss, security or privacy exposure, incorrect money movements and a core flow down for many users, and states that it triggers the incident process.
2. Define priority separately (for example P1 to P4) and how it is derived from severity, reach, customer commitments and release timing; list the cases where priority differs from severity (cosmetic bug on the pricing page during a launch; severe bug in a feature nobody uses).
3. Fix-time targets per level that fit the release model: time to triage, time to fix or mitigate, and whether a hotfix outside the normal release is allowed. Mark targets as proposals to agree with the team.
4. Who decides: who sets the initial label, who confirms it at triage and how often triage happens, and the tie-breaker when support and engineering disagree.
5. Escalation and changes: when a bug's level moves up (more reports, a key customer, regulatory exposure) or down (workaround found), how to record why, and what happens when a target is missed.
6. Give at least two examples for each severity level drawn from this product's critical flows.
</task>

<constraints>
- Keep severity and priority separate throughout.
- Do not invent contractual SLAs or regulatory requirements; reference the ones given and mark others as to be checked.
- Keep the policy to one or two pages; teams do not read longer ones.
{{> output/uncertainty}}
</constraints>

<output_format>
## Severity levels
Table: Level | Definition | Test question.
## Priority
Table and the cases where priority differs from severity.
## Fix-time targets
Table: Severity | Triage within | Fix or mitigate within | Hotfix allowed?
## Who decides
## Escalation and changes
## Examples for this product
Table: Level | Example.
</output_format>
