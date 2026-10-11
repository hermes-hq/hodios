---
schema: 1
id: plan-prototype-to-production
kind: prompt
title: Plan a prototype to production
description: Audits a working prototype or hackathon build for what production needs (tests, security, data, observability, scale, ownership) and plans keep, harden or rebuild per part.
category: planning
version: 1.0.0
status: incubating
stage: [plan]
role: [tech-lead, software-engineer, engineering-manager]
stack: []
requires: [none]
inputs: [text, repo, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [prototype, production-readiness, hardening, proof-of-concept]
pairs_with:
  prompts: [plan-spike, write-implementation-plan, assess-technical-debt]
args:
  - name: prototype
    description: What the prototype does, how it was built (stack, shortcuts taken, hard-coded parts), and how it is run today.
    type: text
    required: true
  - name: production_target
    description: Who will use it, expected load and data sensitivity, availability needs, and the launch date if there is one.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Gap audit, Keep harden or rebuild, Plan, Launch gate, Not yet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A prototype that impressed people in a demo is usually a small part of the work of a production service. Most of the rest is invisible in a demo: authentication and authorisation, input validation, error handling, data migrations and backups, secrets out of code, logging and alerts, tests, a deploy pipeline, limits and costs at real load, and someone on call. The danger is that the demo creates a date before anyone has counted that work. Engineers who have done this before go part by part: some code is worth keeping and hardening, some was a shortcut that must be rebuilt, and some production features can wait for a limited first release.
</context>

<task>
<prototype>
{{prototype}}
</prototype>
<production_target>
{{production_target}}
</production_target>

1. Audit the gaps against production needs: security (authentication, authorisation, secrets, input handling), data (schema, migrations, backups, retention, personal data), reliability (errors, retries, timeouts), observability (logs, metrics, alerts), testing, delivery (CI, environments, rollback), performance and cost at the target load, and ownership (on-call, runbook). Rate each gap as blocking, needed soon, or later.
2. For each main part of the prototype, recommend keep as is, harden, or rebuild, with the reason.
3. Write an ordered plan in small milestones, blocking gaps first, with a rough size per milestone as a range.
4. Define the launch gate: the checks that must pass before real users or real data touch it, and a limited first release (internal users, a beta group, a feature flag) if that lowers the risk.
5. List what deliberately waits until after launch, and the trigger that would bring each item forward.
</task>

<constraints>
- Do not treat the demo's success as evidence of production readiness.
- If personal, payment or health data is involved, treat security and data gaps as blocking.
- Do not invent facts about the prototype's code; if the input is thin, list the questions to answer by reading it.
- Give sizes as ranges and say the plan must be re-estimated after the audit is confirmed against the code.
</constraints>

<output_format>
## Gap audit
Table: area | gap | rating (blocking, soon, later).
## Keep harden or rebuild
Table: part | decision | reason.
## Plan
Numbered milestones with size ranges.
## Launch gate
Checklist, plus the limited first release.
## Not yet
Table: item | trigger to bring it forward.
</output_format>
