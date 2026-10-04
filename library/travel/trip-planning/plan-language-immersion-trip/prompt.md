---
schema: 1
id: plan-language-immersion-trip
kind: prompt
title: Plan a language immersion trip
description: Plans a short immersion trip to boost a language, with where to go, course or homestay options, a daily speaking plan, places that force practice and a way to measure progress.
category: trip-planning
version: 1.0.0
status: incubating
stage: [plan]
role: [language-learner, traveler, student]
requires: [none]
inputs: [preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [language-immersion, homestay, language-school, cefr, study-trip]
pairs_with:
  prompts: [assess-language-level, plan-language-learning, prepare-for-homestay]
  personas: [language-learning-strategist, language-exchange-partner]
args:
  - name: language
    description: The language you are learning, and a preferred country or city if you have one (for example "Spanish, prefer Latin America").
    type: string
    required: true
  - name: level
    description: Your current level on the CEFR scale; if unsure, pick the closest.
    type: enum
    enum: [a1, a2, b1, b2, c1]
    default: a2
  - name: weeks
    description: Length of the trip in weeks.
    type: number
    default: 2
  - name: budget
    description: Total budget with currency, and whether it includes flights.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Where to go, Format, Before you leave, Daily plan, Missions, Staying out of the English bubble, Measuring progress, Budget split]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most short immersion trips produce less progress than expected because the learner ends up speaking English: in hostels, with other students, in tourist areas, or because locals switch when they hear an accent. Progress comes from hours of real speaking and listening, structured so that each day forces interaction the learner cannot avoid, at a level just above what is comfortable. Smaller cities with fewer English speakers, homestays with shared meals, one-to-one lessons, task-based "missions" and a recorded before-and-after sample usually beat a big capital and a group class alone.

Language: {{language}}
Level: {{level}}
Weeks: {{weeks}}
Budget: {{budget}}
</context>

<task>
1. Where to go: two or three places suited to a {{level}} learner of {{language}} for {{weeks}} weeks on {{budget}}, weighing English use, accent or variety (and whether it matches the learner's goal), cost of living, safety and availability of schools or homestays. Say where you are unsure.
2. Format: compare intensive group classes, one-to-one lessons, homestay, language exchange or tandem, volunteering or work-stay, and self-directed immersion, with hours of speaking per day each typically gives, and recommend a mix for {{level}}.
3. Before you leave (two to four weeks): what to prepare for this level, such as survival phrases and numbers at A1–A2, or opinion and storytelling phrases at B1 and above, plus pronunciation work, and a baseline: record a two-minute talk on a set topic and take a placement-style self-assessment.
4. Daily plan: a typical day mixing lesson, missions, a meal or activity with locals and a short review, with total speaking time.
5. Missions: 10 to 15 real tasks graded for {{level}} (order at a market and ask about a product, ask for a local recommendation, make a phone call to book something, join a class or sports session, take a tour in the language, get a haircut, tell a story about your day to your host). Number them by week.
6. Staying out of the English bubble: polite phrases to keep locals in the language, choosing accommodation and activities, limits on English media.
7. Measuring progress: repeat the recorded talk on the last day and compare (fluency, vocabulary range, accuracy), track missions completed, words logged, and CEFR can-do statements.
8. Budget split by course, accommodation, food, activities and travel, marked as estimates to verify.
9. Before writing, check that the missions and preparation match {{level}} and that every recommendation fits {{weeks}} weeks.
</task>

<constraints>
- Prices and school offerings are estimates; mark them verify.
- Do not name or promote specific schools or companies; describe what to look for and the questions to ask.
- For language varieties, be accurate (for example European versus Brazilian Portuguese); if the learner's goal suggests one, say why.
</constraints>

<output_format>
## Where to go
Table: Place | Why it suits you | English use | Cost | Variety or accent.

## Format
Recommended mix, then a short comparison.

## Before you leave
Checklist, including the baseline recording.

## Daily plan
A sample day with times and speaking minutes.

## Missions
Numbered by week.

## Staying out of the English bubble
## Measuring progress
## Budget split
Table: Item | Estimate | Notes.
</output_format>
