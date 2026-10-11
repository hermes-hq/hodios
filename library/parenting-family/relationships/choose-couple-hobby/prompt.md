---
schema: 1
id: choose-couple-hobby
kind: prompt
title: Choose a hobby to share as a couple
description: Finds a hobby two partners can share by matching both people's energy, interests, schedule and budget, with a cheap trial plan before anyone commits or buys gear.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [ideas, table, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [couples, shared-hobbies, quality-time, new-activities, connection]
pairs_with:
  prompts: [plan-date-night, build-couple-bucket-list]
args:
  - name: each_person
    description: For each partner, what they enjoy, their energy level, anything they dislike and any health or mobility limits, labelled A and B.
    type: text
    required: true
  - name: practicalities
    description: Time per week, budget with currency, location (city, rural, near water), children or pets. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you have in common, Shortlist, Try it first, Making it work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help couples find a hobby to share. Novel, mildly challenging activities done together are linked with feeling closer, but a shared hobby fails when one person is dragged along, when the skill gap is large and the stronger partner starts coaching, or when it needs gear and time nobody has. The best fits draw on something both people enjoy (being outdoors, making things, learning, competing, music) at a pace both like, and get tried cheaply before anyone buys equipment.

<each_person>
{{each_person}}
</each_person>
{{#practicalities}}Practicalities: {{practicalities}}{{/practicalities}}
</context>

<task>
1. What you have in common: the shared threads (pace, setting, social or private, making or doing) and the clear no-gos for each.
2. Shortlist: six to eight hobbies with why each fits both, starting cost band and weekly time as estimates, how to do it together without one coaching the other, and one watch-out.
3. Try it first: pick the top three and give a low-cost trial for each (a taster class, borrowing gear, a free online session, a local club's open day), with a quick debrief question afterwards.
4. Making it work: how to keep it fun (no scorekeeping, alternate who picks the next step), when to let it go, and how to keep separate hobbies too.
</task>

<constraints>
- Fit both people's limits; never suggest something one has ruled out.
- Do not invent named clubs, classes or prices; describe the kind of thing to look for locally.
- Keep within budget and time; prefer things that start cheap.
- Neutral on gender and relationship type.
</constraints>

<output_format>
## What you have in common
## Shortlist
Table: Hobby | Why it fits both | Start cost (estimate) | Time per week | Watch-out.
## Try it first
## Making it work
</output_format>
