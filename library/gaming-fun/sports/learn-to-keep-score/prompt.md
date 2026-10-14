---
schema: 1
id: learn-to-keep-score
kind: prompt
title: Learn to keep score for a match
description: Teaches a volunteer to keep the official score for an amateur match - cricket, baseball, basketball or volleyball sheets - with symbols, a worked example, tricky cases and a practice drill.
category: sports
version: 1.0.0
status: incubating
stage: [learn]
role: [individual, parent]
requires: [none]
inputs: [topic, text]
output: [explanation, checklist, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [scorekeeping, scorebook, scoresheet, match-official, volunteer, table-official]
pairs_with:
  prompts: [explain-sport-to-newcomer, prepare-to-referee]
args:
  - name: sport
    description: The sport and the scoring job, for example "club cricket scorebook", "Little League baseball scorebook", "basketball table official with the scoresheet" or "volleyball scoresheet".
    type: string
    required: true
  - name: experience
    description: How well you know the sport and whether you have seen the scoresheet your league uses. Optional.
    type: text
  - name: first_match
    description: When you are scoring for the first time and whether anyone experienced will be next to you. Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the scorer is responsible for, The sheet and symbols, Worked example, Tricky cases, Practice, Match-day checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach new volunteer scorers. Amateur matches depend on a parent or club member keeping the book, and most learn under pressure on the day. In many sports the scoresheet is the official record: in cricket the scorers must agree with each other and with the umpires' signals, in basketball the table tracks fouls, timeouts and the possession arrow, in volleyball the scoresheet records line-ups and rotations, in baseball and softball the scorebook tracks every plate appearance. Scoring conventions vary by league, governing body and even scorebook brand, so the scorer must learn the sheet in front of them. The hard part is not the common events but the rare ones (runs taken off a wide, which count as wides rather than byes; a batter-runner interference, a technical foul, a wrong server) and staying calm and catching up after a missed play.

Sport and job: {{sport}}
{{#experience}}

Experience: {{experience}}
{{/experience}}
{{#first_match}}

First match: {{first_match}}
{{/first_match}}
</context>

<task>
1. Explain what the scorer is responsible for in this sport and what is the officials' job instead, including signals or confirmations to watch for.
2. Explain the sheet and symbols for the common events, laid out as a reference table, noting where the user's league or book may use different conventions.
3. Walk through a short worked example (an over, an inning, a few possessions or a set) event by event, showing exactly what is written where.
4. Cover the tricky cases most likely to trip a beginner, with what to write and when to ask the officials.
5. Practice: a drill using a televised or streamed match or a written sequence of events, then quiz the user with five events to record and check their answers when they reply.
6. Match-day checklist: what to bring, what to agree with the other scorer or officials before the start, how to recover from a missed event, and how to sign off.
</task>

<constraints>
- Conventions differ by governing body, league and scorebook; say which convention you are using and tell the user to check their league's sheet and instructions.
- Do not invent rules; if a scenario depends on a competition-specific rule, say so.
- Keep it practical: the user should be able to score a simple match after this.
- Wait for the user's quiz answers before giving solutions.
</constraints>

<output_format>
## What the scorer is responsible for
## The sheet and symbols
Table: Event | What to write | Where.
## Worked example
## Tricky cases
## Practice
Then wait for answers.
## Match-day checklist
</output_format>
