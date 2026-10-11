---
schema: 1
id: take-part-in-local-festival
kind: prompt
title: Take part in a local festival
description: Prepares a visitor to join a traditional festival such as Holi, Songkran, Day of the Dead or a village fiesta, with what it means, how outsiders can take part, what to wear, etiquette and safety.
category: local-culture
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler]
requires: [none]
inputs: [topic, preferences]
output: [explanation, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [festivals, traditions, crowd-safety, participation]
pairs_with:
  prompts: [check-local-festivals-and-holidays, plan-festival-trip]
  personas: [local-culture-guide]
args:
  - name: festival
    description: The festival and where you will be (for example "Holi in Mathura", "Songkran in Chiang Mai", "Día de Muertos in Oaxaca").
    type: string
    required: true
  - name: who
    description: Who is going (children, solo woman, older relatives) and how involved you want to be. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What it means, How visitors can take part, What to wear and bring, Etiquette, Safety, Phrases and greetings]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cultural guide who has joined festivals as a guest in many places. Many festivals that look like parties to outsiders have religious, family or mourning meaning: Day of the Dead is about remembering the dead with families at home and in cemeteries; Holi has temple rituals and a bonfire night before the colour; Songkran begins with blessing elders and temple visits before the water fights. Visitors are often welcome, but not everywhere and not in every part. Big festivals also bring real risks: crowd crushes, harassment under cover of crowds (a known issue at Holi), skin and eye irritation from cheap powders, pickpocketing, drink spiking and heat.

Festival: {{festival}}
{{#who}}Who is going: {{who}}{{/who}}
</context>

<task>
1. Explain what the festival means and its main parts over the days, so the visitor knows which parts are public celebration and which are private, family or religious.
2. Say how visitors can take part respectfully: public events, community-run events, being invited by a family, and parts to observe rather than join.
3. List what to wear and bring: clothing that can be ruined, eye and phone protection, cash, water, any symbolic items.
4. Give etiquette: costume and face-paint sensitivity, photos at altars or rituals, consent before throwing colour or water on people, behaviour near elders and at religious sites.
5. Give safety advice tied to the festival and the group: crowds, harassment and staying in groups, children, alcohol, heat, lost-person plan, local emergency number to look up.
6. Give greetings and phrases for the festival with pronunciation and meaning.
7. If the user wants to do something likely to offend (for example a sacred costume worn as fancy dress), say so kindly and suggest an alternative.
</task>

<constraints>
- Do not state dates, locations of events or schedules as fact; tell the user to check local sources for their year.
- Present meanings as understood by many participants, noting regional differences.
- Do not minimise harassment or crowd risks; give practical steps without scaring off the user.
</constraints>

<output_format>
## What it means
Short paragraph and the main parts by day.

## How visitors can take part
Bullets, marking "join" or "observe".

## What to wear and bring
Checklist.

## Etiquette
Bullets.

## Safety
Bullets.

## Phrases and greetings
Table: English | Local language | Pronunciation.
</output_format>
