---
schema: 1
id: plan-codebase-takeover
kind: prompt
title: Plan a codebase takeover
description: Plans the first weeks of owning a system you inherited, from access and knowledge capture while the old owners are reachable to a risk register, safe first changes and an ownership plan.
category: planning
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [tech-lead, engineering-manager, software-engineer]
stack: []
requires: [none]
inputs: [text, notes, repo]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [legacy-system, ownership-transfer, knowledge-capture, risk-register]
pairs_with:
  prompts: [write-ownership-handover-doc, assess-technical-debt, reduce-bus-factor]
  personas: [legacy-code-steward]
  workflows: [legacy-codebase-takeover-track]
args:
  - name: system
    description: What the system does, who uses it, its stack and size as far as you know, and its state (docs, tests, incidents).
    type: text
    required: true
  - name: handover_situation
    description: Who owned it before, whether they are still reachable and for how long, and why it is changing hands.
    type: text
    required: true
  - name: weeks
    description: How many weeks the takeover plan should cover.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Before the old owners leave, Access and safety checklist, Weekly plan, Risk register, First safe changes, Ownership model]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Inheriting a system is risky in a predictable order. First, knowledge walks out the door with the previous owners, so the scarce resource in week one is their time, not yours. Second, the new team often lacks access to something critical (a deploy credential, a cloud account, a vendor portal, a certificate renewal) and finds out during an incident. Third, the first change by the new team breaks something because nobody knew an implicit behaviour. Experienced engineers learn to deploy an unchanged build before changing anything, prove they can roll back, find what the system does on a schedule, and keep a list of what scares them before trying to fix it.
</context>

<task>
<system>
{{system}}
</system>
<handover_situation>
{{handover_situation}}
</handover_situation>
Plan length: {{weeks}} weeks.

1. List what to get from the previous owners while they are reachable, as focused sessions: a walkthrough of a deploy and a rollback, the incidents they remember, scheduled jobs and manual chores, the parts they would never touch and why, and vendor and customer contacts. Put these first.
2. Give an access and safety checklist: repositories, CI, deploy rights, cloud and vendor accounts, secrets location, certificates and domains with expiry dates, alerts routed to the new team, backups and a tested restore.
3. Write a week-by-week plan for {{weeks}} weeks: shadow, then deploy an unchanged build, then a trivial change, then a real fix; run the system locally; map data flows and dependencies; read recent incidents and the bug backlog. Keep code-level mapping at the level of goals; this plan is about the transfer of ownership, not a code audit.
4. Build a risk register of what could hurt soonest, with likelihood, impact and the cheapest mitigation.
5. Choose two or three safe first changes that build confidence, such as adding monitoring, a characterisation test or a runbook, and say what to avoid changing early.
6. Define the ownership model going forward: on-call, who reviews changes, where docs live, and how to tell users and dependent teams that ownership moved.
</task>

<constraints>
- Put time-limited knowledge capture before anything that can wait.
- Do not recommend a rewrite or a large refactor inside the takeover period.
- Do not assume tools, clouds or vendors that were not mentioned; use placeholders.
- If the old owners are already gone, switch knowledge capture to archaeology (commit history, tickets, chat logs, configs) and say so.
</constraints>

<output_format>
## Before the old owners leave
Numbered sessions with what to capture.
## Access and safety checklist
Checklist.
## Weekly plan
Table: week | goals | done when.
## Risk register
Table: risk | likelihood | impact | mitigation | owner.
## First safe changes
Bullets, plus what to avoid early.
## Ownership model
Bullets.
</output_format>
