---
schema: 1
id: design-internal-transfer-process
kind: prompt
title: Design an internal transfer process
description: Designs how employees move between internal roles - how vacancies are advertised inside, eligibility, the manager conversation, release timing, fair selection and pay on transfer - with templates.
category: hr-operations
version: 1.0.0
status: incubating
stage: [design]
role: [operations-manager, executive, founder]
requires: [none]
inputs: [text]
output: [plan, checklist, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [internal-mobility, internal-vacancies, talent-retention, role-change, release-period]
pairs_with:
  prompts: [apply-for-internal-role, write-workplace-policy, design-salary-bands, define-hr-metrics]
  personas: [hr-business-partner]
args:
  - name: organisation
    description: Headcount, locations, how internal moves happen today, problems seen (managers blocking moves, people leaving for roles that existed internally, unfair selection), and any union or works council.
    type: text
    required: true
  - name: goals
    description: What leadership wants from internal mobility (retention, faster hiring, development), and constraints such as minimum time in role or hiring freezes. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Diagnosis, Process, Rules, Templates, Measures, Open decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design internal mobility processes the way an experienced HR lead does. What experts know: people often leave to get a job their own company had open, because internal roles were not visible, applying felt disloyal, or their manager blocked or delayed the move. A working process makes vacancies visible inside before or alongside outside advertising, lets people explore a role without it counting against them, sets a fair release period so the losing team can plan without holding someone hostage, and assesses internal candidates as seriously as external ones, with feedback when they are not chosen. Pay on transfer needs a rule, or internal movers end up paid less than external hires into the same role. Confidentiality matters: when does the current manager find out?
</context>

<task>
<organisation>
{{organisation}}
</organisation>
{{#goals}}
<goals>
{{goals}}
</goals>
{{/goals}}

1. Diagnosis: the main barriers in this organisation from the inputs, and what the process must fix first.
2. Process: steps from vacancy to start date (internal posting window, exploratory conversations, application, informing the current manager, assessment, offer, release period, handover), with owner and typical duration for each.
3. Rules: eligibility (time in role, performance standing, with care that it does not exclude people on leave), confidentiality, release period and how to resolve disputes, pay on transfer tied to the destination role's range, internal candidate feedback, and how this interacts with any hiring freeze or union agreement.
4. Templates: an internal vacancy notice outline, a note for managers on supporting moves, and a decline-with-feedback message for internal candidates.
5. Measures: internal fill rate, time to release, retention of internal movers, and representation in moves, reported with a minimum group size.
6. Open decisions.
</task>

<constraints>
- Do not set eligibility rules that disadvantage people on parental, sick or other protected leave; flag this explicitly.
- Keep it proportionate to the headcount.
- Do not invent pay ranges; refer to the user's bands or mark the rule as needing them.
- Where a union or works council exists, flag that the process may need consultation.
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
## Process
Table: Step | Owner | Duration | Notes.
## Rules
## Templates
## Measures
## Open decisions
Numbered.
</output_format>
