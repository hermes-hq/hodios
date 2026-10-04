---
schema: 1
id: reduce-owner-dependence
kind: prompt
title: Reduce owner dependence
description: Finds what in a small business only works because the owner does it - relationships, pricing, problem-solving, skills - and plans how to document, delegate and test it with the owner away.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, executive]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [owner-dependence, key-person-risk, delegation, handover, owner-away-test, business-value]
pairs_with:
  prompts: [write-operations-manual, delegate-task, plan-business-sale, plan-business-succession]
  personas: [small-business-advisor]
args:
  - name: business
    description: What the business does, size and team, who does what, and why you want to depend on yourself less (time, health, growth, selling, succession).
    type: text
    required: true
  - name: owner_tasks
    description: What you do in a typical week and month - every task, decision, relationship and problem that comes to you - with rough hours. A brain dump is fine.
    type: text
    required: true
  - name: horizon
    description: How long you have to make the business run without you for a set period.
    type: enum
    enum: [3-months, 6-months, 12-months]
    default: 6-months
output_contract:
  format: markdown
  sections: [Dependence map, Biggest risks, Handover plan, Owner-away tests, What stays with the owner, Measures]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an owner-operator make the business work without them for weeks at a time. Owner dependence is a risk (illness, burnout), a ceiling on growth and a big discount when selling. It hides in four places: relationships (key customers and suppliers who only deal with the owner), decisions (pricing, quotes, refunds, hiring), know-how (the technical skill or recipe in the owner's head) and problem-solving (staff bring every issue to the owner because the owner always fixes it). The usual mistakes are writing a manual nobody uses, delegating tasks without the authority to decide, and never testing it. The method is: map, rank by risk, hand over in steps with decision rules, and test with planned absences of increasing length. Horizon: {{horizon}}.
</context>

<task>
<business>
{{business}}
</business>

<owner_tasks>
{{owner_tasks}}
</owner_tasks>

1. Dependence map: list each owner task, decision or relationship from the input, with hours, and classify it as relationship, decision, know-how or problem-solving. Rate the risk if the owner were absent for a month (high, medium, low) and how hard it is to hand over.
2. Biggest risks: the five items that would hurt most if the owner disappeared tomorrow.
3. Handover plan: for each high-risk item, the method - document (a checklist, short video, pricing sheet), delegate with decision rules ("refunds up to [X] without asking"), introduce (joint visits to key customers and suppliers), train (shadow, do with, do alone, review), or stop doing it. Name who takes it (role, or "hire or develop" if no one fits), the order, and the weeks needed, fitting within the horizon.
4. Owner-away tests: a ladder of planned absences - a day off unreachable, a week reachable only for emergencies, then two weeks - with what counts as an emergency, a handover note, and a debrief after each test to fix what broke.
5. What stays with the owner: the few things the owner should keep by choice (strategy, a few key relationships, the work they love), and how they will spend the freed hours.
6. Measures: hours the owner works, number of decisions escalated per week, and whether tests pass.
</task>

<constraints>
- Use only the tasks given; if the list is thin, add a short checklist of commonly forgotten owner tasks (bank and payment approvals, passwords and admin rights, supplier orders, insurance renewals, key customer contacts) as questions, not facts.
- Delegation includes authority and limits; never hand over a task without a decision rule.
- Access to bank accounts, passwords and admin rights should be shared through proper controls (separate user accounts, limits, a password manager), not by sharing the owner's own logins.
- Respect that the owner may want to keep some work.
- If the owner tasks are missing, ask for a typical week and stop.
</constraints>

<output_format>
## Dependence map
Table: Item | Type | Hours | Risk if absent | Handover difficulty.
## Biggest risks
Numbered, one line each.
## Handover plan
Table: Item | Method | Taken by | Decision rule | Weeks.
## Owner-away tests
Table: Test | When | Emergency definition | Debrief questions.
## What stays with the owner
Bullets.
## Measures
Table: Measure | Now | Target by end of horizon.
</output_format>
