---
schema: 1
id: plan-au-pair-arrival
kind: prompt
title: Plan an au pair's arrival
description: Prepares a host family for an au pair, with a weekly schedule inside the agreed hours, their room, house rules, a first-fortnight settling plan, and regular check-ins.
category: family-logistics
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [au-pair, host-family, cultural-exchange, settling-in, house-rules, live-in-help]
pairs_with:
  prompts: [write-babysitter-handbook, choose-childcare, coordinate-family-calendar]
args:
  - name: family
    description: Children's ages and routines, parents' work hours, and what help the family wants.
    type: text
    required: true
  - name: au_pair
    description: What is known about the au pair, the programme or agency, and the agreed hours and pocket money, for example "19, from Brazil, programme says up to 30 hours a week". Optional.
    type: text
  - name: country
    description: The host country, so programme rules on hours, duties and pay can be flagged to check. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Rules to confirm, The weekly schedule, Their room and essentials, House rules, The first two weeks, Their life outside the family, Check-ins and problems]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a host family prepare for an au pair: a young person who lives with the family as a cultural exchange and helps with childcare and light housework within limits set by the programme or host country. Placements that break down often do so early, for predictable reasons: hours creep beyond the agreement, the au pair is treated as a nanny or cleaner, house rules about guests, curfews or the car were never stated, and a homesick 19-year-old in a new country has no friends and no language class. Good host families write the schedule down inside the agreed hours, settle the au pair gently over a fortnight, help them build a life outside the house, and hold a short weekly check-in so small issues stay small.

<family>
{{family}}
</family>
{{#au_pair}}
<au_pair>
{{au_pair}}
</au_pair>
{{/au_pair}}
{{#country}}Host country: {{country}}{{/country}}
</context>

<task>
1. Rules to confirm: list what to check with the programme, agency or official guidance for {{country}} or the user's location: maximum weekly and daily hours, days off, paid holiday, pocket money, insurance, language course support, visa conditions, and which duties are allowed (childcare and light housework related to the children, typically not heavy cleaning or caring for adults). Do not state the limits; mark each "check".
2. The weekly schedule: a table that fits the family's needs inside the agreed hours, with set days off, no split shifts that eat the whole day, and evenings or babysitting counted as hours. Show the weekly total.
3. Their room and essentials: a checklist: private room with a lock or at least a door that closes, wifi, a key, a phone plan or SIM, transport card or bike, and a welcome folder.
4. House rules: a short, kind list on guests, curfew if any, the car and insurance, food, phone use while caring for the children, privacy both ways, and smoking or alcohol.
5. The first two weeks: a settling plan: overlap days working alongside a parent, the children's routines taught one at a time, a tour of school, park, shops and emergency services, emergency contacts and procedures, and a light first week.
6. Their life outside the family: help finding a language class, other au pairs or local groups, and time off that is truly off.
7. Check-ins and problems: a weekly 15-minute check-in with three questions, how to raise a problem on either side, and the programme's process if it does not work out.
</task>

<constraints>
- Never schedule beyond the agreed hours or treat the au pair as a full-time nanny or cleaner; if the family's needs exceed the hours, say so and suggest other cover.
- Do not state visa, pay or hour limits as fact; mark them "check with the programme or official guidance".
- Respect the au pair's privacy and autonomy; no rules that control their personal life beyond reasonable household rules.
- Use [placeholders] for names and contacts not given.
</constraints>

<output_format>
## Rules to confirm
Checklist marked "check".
## The weekly schedule
Table: Day | Hours | Tasks, then the weekly total.
## Their room and essentials
Checklist.
## House rules
## The first two weeks
Day-by-day outline.
## Their life outside the family
## Check-ins and problems
</output_format>
