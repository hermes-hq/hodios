---
schema: 1
id: plan-staff-compliance-training
kind: prompt
title: Plan staff compliance training
description: Plans a year of role-based compliance training for a small organisation - who needs which topic, how often, in what format - with completion records an inspector or client would accept.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [operations-manager, founder, manager]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [compliance-training, training-matrix, staff-induction, training-records, refresher-training]
pairs_with:
  prompts: [build-compliance-calendar, write-security-awareness-module, build-compliance-checklist]
  personas: [compliance-officer]
args:
  - name: organisation
    description: The organisation, country, sector, staff roles and numbers, whether staff handle personal data, money, food, children or vulnerable adults, machinery or chemicals, and any training already done or required by clients, insurers or certifications.
    type: text
    required: true
  - name: constraints
    description: Budget, time available per person, shift patterns, languages, and the tools you have (learning platform, team meetings). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Training needs, Training matrix, Year plan, Formats, Records, To confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation plan compliance training that staff actually complete and that stands up as evidence. Inspectors, auditors and enterprise clients ask two questions: did the right people get the right training, and can you prove it? A role-based matrix answers the first; dated records with content, attendance and a short check of understanding answer the second. Some topics are commonly legal requirements for some roles or sectors (health and safety induction, food hygiene, safeguarding, anti-money laundering for regulated staff), others are expected good practice (data protection, information security, anti-bribery, harassment prevention, whistleblowing awareness). Short, frequent, role-specific sessions beat one long annual slideshow, and new starters need the essentials before they touch the risky task, not at the next annual cycle.
</context>

<task>
Organisation:

<organisation>
{{organisation}}
</organisation>
{{#constraints}}

Constraints:
<constraints_info>
{{constraints}}
</constraints_info>
{{/constraints}}

1. Training needs: list topics relevant to this organisation, each marked "likely required" (to verify) or "good practice", with the roles affected and why.
2. Training matrix: roles by topics, showing induction, refresher frequency, and level (awareness or practitioner).
3. Year plan: month by month, which sessions run, for whom, length and owner, fitting the constraints.
4. Formats: for each topic, a format that fits (toolbox talk, short online module, scenario workshop, external certified course where required), with a short check of understanding.
5. Records: a training record template (name, role, topic, date, version of content, trainer, result, next due) and how to handle missed sessions.
6. To confirm: items to verify with a regulator, insurer, client contract or adviser.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a training topic is legally required unless the user supplied that; mark it "likely required, verify".
- Do not invent certificate names, accreditation bodies or legal refresher intervals.
- Keep the plan realistic for the stated time and budget.
{{> output/uncertainty}}
</constraints>

<output_format>
## Training needs
Table: topic | status | roles | reason.

## Training matrix
Table: role x topic with induction and refresher.

## Year plan
Table: month | session | audience | length | owner.

## Formats
Bullets per topic.

## Records
Template and rules for missed sessions.

## To confirm
Numbered list.
</output_format>
