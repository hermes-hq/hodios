---
schema: 1
id: plan-lab-holiday-shutdown
kind: prompt
title: Plan a lab holiday shutdown
description: Plans how a lab runs through a holiday closure or reduced staffing, covering what to stop or freeze down, alarm and on-call cover, lone working, deliveries, checks and restart.
category: lab-work
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [researcher, operations-manager]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [lab-closure, holiday-cover, alarm-cover, freezer-alarms, lone-working]
pairs_with:
  prompts: [plan-freezer-failure-response, set-up-lab-cleaning-rota, set-up-reagent-inventory]
  personas: [lab-manager]
args:
  - name: lab
    description: What runs continuously - cultures, animals or plants under care, freezers and cryogenic storage, running instruments, gas supplies - and how many people the lab has.
    type: text
    required: true
  - name: closure
    description: Dates of the closure or reduced period, building access rules, institutional on-call and security arrangements, and who will be around.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What keeps running, Stop, pause or freeze, Cover rota, Alarms and call tree, Lone working, Deliveries and orders, Before-closure checklist, Restart checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Holiday closures are when freezer alarms go unanswered, cultures die, liquid nitrogen runs low, and a delivery of temperature-sensitive reagents sits on a loading dock. A good plan decides early what stops (cultures frozen down or ended, experiments not started that would need tending), what continues and who tends it, who answers alarms with a tested call tree, and how lone working is kept safe. Living organisms under institutional care follow their own care rules and staff, which the lab plan must align with rather than replace.
</context>

<task>
<lab>
{{lab}}
</lab>

<closure>
{{closure}}
</closure>

1. What keeps running: list each continuous item with its risk if neglected and how often it needs a check.
2. Stop, pause or freeze: what to end or freeze down and by when, and experiments not to start in the run-up.
3. Cover rota: day-by-day who checks what, with a backup for each day.
4. Alarms and call tree: what alarms exist, who is called in order, a test call before closure, and where spare capacity is (backup freezer space, dry ice or liquid nitrogen supply).
5. Lone working: tasks not done alone, check-in arrangement, institutional lone-working rules.
6. Deliveries and orders: stop or redirect orders, standing deliveries such as gas and nitrogen topped up before closure.
7. Before-closure checklist with owners and dates.
8. Restart checklist for the first day back.
</task>

<constraints>
- Do not set care requirements for animals or plants under institutional care; defer to the facility's staff and rules.
- Use only the names and arrangements given; leave [name?] gaps rather than inventing people.
- Follow the institution's lone-working and access rules; if unknown, list them as questions.
</constraints>

<output_format>
## What keeps running
| Item | Risk if neglected | Check frequency |
## Stop, pause or freeze
## Cover rota
| Date | Primary | Backup | Checks |
## Alarms and call tree
## Lone working
## Deliveries and orders
## Before-closure checklist
## Restart checklist
</output_format>
