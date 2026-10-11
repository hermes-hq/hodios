---
schema: 1
id: plan-valentines-day
kind: prompt
title: Plan Valentine's Day
description: Plans Valentine's Day or a similar romantic day for where you are in the relationship, avoiding the crowded-restaurant trap, with ideas, a simple plan and a note to write.
category: relationships
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [ideas, plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [valentines-day, couples, romantic-gestures, date-ideas, celebration]
pairs_with:
  prompts: [plan-date-night, choose-meaningful-gift, plan-anniversary]
args:
  - name: stage
    description: How long you have been together and how serious it is, for example "dating for three weeks", "married twelve years, two kids".
    type: string
    required: true
  - name: about_you_both
    description: What you each like, how your partner feels about Valentine's Day, and any local version you celebrate (White Day, Qixi, Dia dos Namorados, Galentine's with friends). Optional.
    type: text
  - name: budget
    description: Budget with currency. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Pitch it right, Ideas, Your plan, A note to write, Book or buy by]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan Valentine's Day and similar romantic holidays. The main risk is a mismatch in expectations: a huge gesture three weeks in feels like pressure, while nothing at all after years together can hurt. Partners differ a lot on whether the day matters; asking or agreeing in advance avoids most disappointment. Restaurants are crowded, rushed and often on set menus that night, so a different day, a home dinner, or an activity often works better. The date and customs differ by country (for example, gifts may go one way on 14 February and the other on White Day, or the day falls in June), so you follow the local version given.

Stage: {{stage}}
{{#about_you_both}}About you both: {{about_you_both}}{{/about_you_both}}
{{#budget}}Budget: {{budget}}{{/budget}}
</context>

<task>
1. Pitch it right: say what level of gesture fits this stage and how to check expectations with the partner if unsure (a light question or a shared plan).
2. Ideas: five ideas matched to the stage and interests, including at least one at home, one outside the usual restaurant rush, and one free or very low-cost. For each: what, why it fits, rough cost as an estimate.
3. Your plan: for the best fit, a simple timeline for the day or evening, with anything needed for children or work.
4. A note to write: a short card message in the right tone for the stage, built from what is shared, with a line on making it their own.
5. Book or buy by: a short checklist of things to book or buy and how far ahead, since the day gets busy.
</task>

<constraints>
- Match the gesture to the stage; do not push big romantic declarations early.
- Use the local tradition if one is given; do not assume 14 February customs apply everywhere.
- Do not invent venues or prices; describe the kind of place and say to check locally.
- Neutral on gender and relationship type; works for people who would rather mark the day with friends.
- If the person says they and their partner do not celebrate, offer a small non-commercial alternative or confirm skipping it is fine.
</constraints>

<output_format>
## Pitch it right
## Ideas
Table: Idea | Why it fits | Cost (estimate).
## Your plan
## A note to write
In quotes.
## Book or buy by
Checklist.
</output_format>
