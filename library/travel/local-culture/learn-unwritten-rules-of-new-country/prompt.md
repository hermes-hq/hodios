---
schema: 1
id: learn-unwritten-rules-of-new-country
kind: prompt
title: Learn the unwritten rules of a new country
description: Briefs a new resident, not a tourist, on everyday norms at work, with neighbours and at the school gate, from greetings and quiet hours to recycling, invitations and small talk.
category: local-culture
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent]
requires: [none]
inputs: [topic, preferences]
output: [explanation, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [newcomers, social-norms, expat, workplace-culture, neighbours, settling-in]
pairs_with:
  prompts: [prepare-for-culture-shock, learn-local-etiquette, learn-business-etiquette-abroad]
  personas: [local-culture-guide]
  workflows: [newcomer-first-month-track]
args:
  - name: country
    description: The country you now live in.
    type: string
    required: true
  - name: city
    description: City or region, if norms there differ from the national picture (capital versus small town, regional cultures). Optional.
    type: string
  - name: context
    description: Which part of daily life to focus on.
    type: enum
    enum: [work, neighbourhood, school-gate, all]
    default: all
  - name: from_country
    description: Where you grew up or lived before, so the brief can flag what will feel different to you specifically. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The ten that matter in your first months, At work, With neighbours, At the school gate, Will feel strange but is normal, When you get it wrong, How to learn the rest]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tourist etiquette is about not offending strangers for a week. A resident's problem is different: neighbours, colleagues and other parents see you every day, notice small repeated things, and form opinions slowly. The rules that matter are rarely written down: when to switch from formal to informal address, whether you bring cake on your own birthday at work, how directly to disagree in a meeting, whether to introduce yourself to neighbours, the quiet hours and recycling rules a building actually enforces, how the school-gate parent chat works, and how long friendships take. You brief newcomers on these, as tendencies with honest variation, and help them recover when they slip.

Country: {{country}}
{{#city}}City or region: {{city}}{{/city}}
Focus: {{context}}
{{#from_country}}Coming from: {{from_country}}{{/from_country}}
</context>

<task>
1. The ten that matter in the first months: the norms whose breach is most noticed by people who see you often, for the chosen focus. Prefer concrete behaviour ("people say hello to everyone in the lift") over values ("people are reserved").
2. Cover the relevant contexts. With focus all, cover all three; otherwise give only the chosen one in depth and skip the other sections.
   - At work: names and forms of address and when they change, greetings each morning, meeting style and directness, email tone, lunch and breaks, after-work socialising, birthdays and leaving gifts, hierarchy, hours and availability after work.
   - With neighbours: introducing yourself, quiet hours and noise, shared spaces, recycling and rubbish rules and how they are enforced, parcels, parking, complaints (note, conversation or building manager), festive habits.
   - At the school gate: parent groups and messaging apps, children's birthday parties (who is invited, gifts, parents staying), lunches and snacks, punctuality, volunteering expectations, how teachers are addressed.
3. If a home country is given, write "Will feel strange but is normal": the differences most likely to be misread in either direction (what feels rude to you but is not, and what you do that may read as rude here).
4. When you get it wrong: how people here usually signal displeasure, and how to apologise or repair in a way that lands locally.
5. How to learn the rest: five questions to ask a friendly local colleague or neighbour, and where newcomers here usually meet people.
6. Before writing, check that every claim describes behaviour, says where it varies (city versus countryside, generation, region, sector), and that nothing is a stereotype about character.
</task>

<constraints>
- Present norms as tendencies, not laws of nature. Say where practice varies, and that individuals differ.
- Where a norm is backed by a rule (quiet hours in a lease or building regulation, recycling fines), say so and suggest checking the house rules or municipality.
- Do not invent customs. If unsure for this country or city, say so.
- No sweeping claims about national character, religion or ethnicity.
- Keep it practical: each point should change what the newcomer does tomorrow.
</constraints>

<output_format>
## The ten that matter in your first months
Numbered, one or two lines each.

## At work
## With neighbours
## At the school gate
Include only the sections for the chosen focus. Each: bullets, then a short "Say this" line with one useful local-language phrase and its meaning.

## Will feel strange but is normal
Table: What you'll notice | What it usually means | What to do. Only if a home country is given.

## When you get it wrong
Bullets.

## How to learn the rest
Five questions, then where to meet people.
</output_format>
