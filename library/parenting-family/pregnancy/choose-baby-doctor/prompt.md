---
schema: 1
id: choose-baby-doctor
kind: prompt
title: Choose a doctor for your baby
description: Helps expecting parents choose a paediatrician, family doctor or baby clinic before the birth, with criteria that fit how care works locally, meet-and-greet questions and a comparison table.
category: pregnancy
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [healthcare]
requires: [none]
inputs: [preferences, text]
output: [table, questions, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [paediatrician, family-doctor, baby-health, meet-and-greet, health-insurance]
pairs_with:
  prompts: [prepare-pediatric-visit, compare-health-insurance-plans, register-newborn-birth]
args:
  - name: situation
    description: Due date, the country and how baby healthcare works for you (public, insurance and which plan, choice of doctor or assigned), the practices you are considering, what matters to you, any health concerns for the baby, languages, and transport.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [How it works where you live, What matters to you, Questions to ask, Comparison, Before the birth]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help expecting parents choose who will look after their baby's health, the way an experienced practice nurse would explain it to a friend. How this works depends heavily on the country: in some places parents pick a paediatrician before the birth and the hospital needs the name, in others the family doctor and a public health nurse or health visitor cover babies and there is little to choose, and with insurance the network and costs decide much of it. What matters day to day is less about credentials than access: how quickly you can get a same-day appointment for a sick baby, what happens out of hours, whether vaccines are given there, the distance with a newborn, waiting room separation for sick and well children, how they handle calls and messages, and how they talk with parents about feeding, vaccination and everyday worries.

<situation>
{{situation}}
</situation>
</context>

<task>
1. How it works where you live: a short description of the general model they described, and what to confirm (whether a name is needed before discharge, whether the baby must be added to insurance within a deadline, how registration works), marked "check locally".
2. What matters to you: rank their priorities and add common ones they did not mention, such as same-day sick visits, out-of-hours advice, and distance.
3. Questions to ask: for a meet-and-greet, call or website check: sick visits and response times, out-of-hours cover, which hospital they work with, vaccine schedule and where it is given, newborn visit timing after discharge, feeding support, languages, messaging, costs and network, and how they approach parents' questions.
4. Comparison: a table of the practices they named using only what they gave, with unknowns as "ask".
5. Before the birth: a short checklist (register or book, give the name to the maternity unit if required, add the baby to insurance on time, save the numbers).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never invent practices, ratings, doctors' names, costs or insurance rules; use what they gave and say what to check.
- Do not tell them which doctor to choose; compare against their priorities.
- If they ask about a specific medical worry for the baby, suggest raising it with their midwife or the chosen doctor.
- If the baby is already born and unwell, put first: call the doctor, an urgent care line or emergency services now.
</constraints>

<output_format>
## How it works where you live
## What matters to you
Ranked list.
## Questions to ask
Numbered list.
## Comparison
Table: Practice | Distance | Sick visits | Out of hours | Cost or network | Notes
## Before the birth
Checklist.
</output_format>
