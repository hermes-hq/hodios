---
schema: 1
id: write-local-guide-post
kind: prompt
title: Write a local guide post
description: Writes a practical local guide for visitors, newcomers or families from the writer's own knowledge, covering transport, food and shops by budget, services, access, customs and seasons.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [local-guide, newcomers, neighbourhood, community-website, step-free-access]
pairs_with:
  prompts: [write-local-history-article, write-travel-story]
args:
  - name: local_knowledge
    description: The place and everything you know about it - how to get around, places you recommend with why and rough prices, services, quirks, local customs, what changes by season, and access details. Notes are fine.
    type: text
    required: true
  - name: reader
    description: Who the guide is for - a visitor for a few days, a newcomer moving in, or a family with children.
    type: enum
    enum: [visitor, newcomer, family]
    default: newcomer
  - name: word_count
    description: Target length in words.
    type: number
    default: 1200
output_contract:
  format: markdown
  sections: [Guide, Recheck list, Gaps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help local writers, newsrooms and community groups turn their knowledge of a place into a guide that is genuinely useful and stays accurate. Generic guides list famous sights and invented "hidden gems"; useful ones answer the questions a real visitor or newcomer has in their first week: how do I get around and pay, where do I buy everyday things at different budgets, what services do I need, what is considered rude here, and what changes in winter. Guides go stale fast, so every price, timetable and opening day needs a "last checked" date.

Reader: {{reader}}. Length: about {{word_count}} words.
</context>

<task>
<local_knowledge>
{{local_knowledge}}
</local_knowledge>

1. Choose sections that fit the reader:
   - visitor: arriving and getting around, where to eat by budget, what to see and do in a day or two, customs, practical tips.
   - newcomer: getting around (passes, cycling, parking), everyday shopping, services to register with (doctor, bins, library, schools as relevant), community and clubs, customs and noise or rubbish rules, seasons.
   - family: getting around with a pushchair, parks and indoor options for bad weather, family-friendly food, toilets and baby changing, healthcare and urgent care, seasonal events.
2. Under each section, use only places and facts from the notes. Give each recommendation a reason ("cheap and quick at lunch", "staff speak Spanish"), a budget band (£, ££, £££ or the local currency's equivalent) and access notes where known (step-free entrance, accessible toilet, quiet hours).
3. Add a short "how things work here" section on customs from the notes: tipping, queuing, greetings, shop opening days, quiet hours.
4. Add a "by season" box with what changes (closures, events, weather, daylight) if the notes say.
5. Mark every price, timetable, opening time and event date with [CHECK: date] so the writer can verify and stamp it.
6. Open with a two-sentence picture of the place in the writer's voice and close with where to find up-to-date local information (only sources the notes mention).
</task>

<constraints>
- Never invent places, prices, opening hours, routes, events or services. If a section the reader needs is empty in the notes, include a one-line placeholder and list it under Gaps.
- No stereotypes about residents or areas; describe areas by what is there, not by who lives there. Do not call areas "dangerous" or "rough" unless the notes give specific, current, sourced reasons; give practical safety tips instead.
- Use only first names or business names the writer supplied; no private individuals' details.
- If the notes do not name the place or contain fewer than three useful facts, ask for more and stop.
</constraints>

<output_format>
## Guide
Title, intro, sections with subheadings and short bulleted or paragraph entries, and the "last checked" line. Word count at the end.

## Recheck list
Table: item | detail in the guide | what to verify.

## Gaps
Sections or facts the reader will want that the notes do not cover.
</output_format>
