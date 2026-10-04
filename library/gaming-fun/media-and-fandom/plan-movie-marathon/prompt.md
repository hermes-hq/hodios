---
schema: 1
id: plan-movie-marathon
kind: prompt
title: Plan a movie marathon
description: Plans a themed film or series marathon with a viewing order, totalled running times, breaks, food matched to the titles and talking points between them.
category: media-and-fandom
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences, topic]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [movie-marathon, viewing-order, themed-food, binge-watch]
pairs_with:
  prompts: [plan-watch-party, recommend-films-from-favorites]
args:
  - name: theme
    description: A franchise, director, actor, series or idea, for example "Studio Ghibli", "the Before trilogy", "80s heist films" or "Star Wars original trilogy".
    type: string
    required: true
  - name: hours
    description: Total hours available, breaks included.
    type: number
    default: 8
  - name: audience
    description: Who is watching, for example "friends", "two of us", "family with a 10-year-old".
    type: string
    default: friends
  - name: order
    description: release = in order of release; chronological = in-story order; best-flow = the order that keeps energy up across the day.
    type: enum
    enum: [release, chronological, best-flow]
    default: best-flow
output_contract:
  format: markdown
  sections: [Lineup, Total time, Breaks and food, Talking points, If you have more or less time, Prep checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan film marathons for a living room, not a festival. What sinks a marathon is arithmetic and energy: the lineup runs two hours longer than the day, the heaviest film lands when everyone is sleepy, and dinner arrives in the middle of the best scene. A good plan totals the real running time, puts breaks where people need them, and orders the titles for the room.

Theme: {{theme}}
Hours available: {{hours}}
Audience: {{audience}}
Order: {{order}}
</context>

<task>
1. If the theme is too vague to pick titles (for example "something fun"), ask for a franchise, director, actor or idea and stop.
2. List the candidate titles for the theme with approximate running times. Name the cut (theatrical, extended, director's) whenever more than one exists, because cuts can differ by an hour.
3. Order them. Release and chronological follow those orders. For best-flow: open with an easy crowd-pleaser, put the longest or most demanding title in the second or third slot while energy is high, place lighter titles after the meal, and end on the strongest finale.
4. Fit the day: 10 minutes between titles, one 30 to 45 minute meal break near the middle, and a 15-minute buffer at the end. If the total exceeds {{hours}} hours, cut titles (say which and why) or suggest a shorter cut, and move the rest to "If you have more time".
5. Schedule from T+0:00 and give the clock offset at which each title and break starts. Offer to convert to real times if they give a start time.
6. Match food to the titles: themed where it is easy, prepared ahead where possible, with finger food during films and a proper meal at the break.
7. Write two spoiler-safe talking points for each break, about the title just watched only.
8. Recompute the total before answering: runtimes plus breaks plus buffer must not exceed {{hours}} hours.
</task>

<constraints>
- Running times are approximate; say so once and give them to the nearest five minutes.
- For audiences with children, flag scenes that may be too intense and tell them to check the local rating; do not state ratings as fact.
- Never spoil a later title in a talking point.
- Do not claim where titles are streaming.
</constraints>

<output_format>
## Lineup
Table: Slot | Starts at (T+) | Title (year, cut) | Runtime | Why here.
## Total time
One line: titles X h Y min + breaks Z min + buffer = total, against {{hours}} hours.
## Breaks and food
Table: Break | Starts at | Length | Food and drink | Prep ahead?
## Talking points
Two per break.
## If you have more or less time
What to add or cut first.
## Prep checklist
Checklist with tick boxes: downloads or discs checked, food prep, seating, blankets, lighting, a spoiler rule for phones.
</output_format>
