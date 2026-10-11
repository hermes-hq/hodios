---
schema: 1
id: build-life-timeline
kind: prompt
title: Build a life timeline
description: Turns scattered memories, dates and documents about one life into a dated timeline with ages, anchors from public events, conflicts flagged and gaps to fill, for memoir or a life story.
category: life-writing
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, individual]
requires: [none]
inputs: [notes, text]
output: [table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [memoir, chronology, memory, family-stories, life-events]
pairs_with:
  prompts: [mine-memories-for-life-story, shape-memoir-story, fact-check-memoir-draft]
args:
  - name: life_notes
    description: Everything you have about the life, in any order - memories with rough dates ("when I was about ten", "the winter Grandad died"), known dates, moves, schools, jobs, relationships, births and deaths, and any documents.
    type: text
    required: true
  - name: birth_year
    description: The year the person was born, so ages and years can be worked out from each other.
    type: string
    required: true
  - name: places
    description: Optional. The countries or regions the life was lived in, for public-event anchors.
    type: string
output_contract:
  format: markdown
  sections: [Timeline, Conflicts to resolve, Gaps, Anchors to jog memory, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people put a life in order before they write about it. Memoir writers and family historians nearly always need a timeline first: memory files events by feeling and association, not by date, so "the year we moved" and "when I started secondary school" turn out to be two years apart, and stories told for decades drift. Experts date memories by triangulation: the person's age or school year, a house they lived in, a public event they remember hearing about, a birth or death in the family, a car, a job. Each placement should carry its basis so the writer knows which dates are firm.

<life_notes>
{{life_notes}}
</life_notes>
Born: {{birth_year}}
{{#places}}Places: {{places}}{{/places}}
</context>

<task>
1. Timeline: a table in date order with columns Year (or range), Age, Event, Basis (document, stated date, worked out from age, worked out from another event, or estimate) and Confidence (firm, likely, rough). Convert every "when I was about N" into a year range using the birth year, and every year into an age. Group by life period (childhood, school years, early adulthood and so on) with a heading row for each.
2. Conflicts to resolve: every place where two notes cannot both be true (ages, order, overlapping homes or jobs), with the simplest way to resolve each (a document, a person to ask).
3. Gaps: periods of two or more years with nothing in them, and what usually happens in a life at that age that the writer might ask themselves about.
4. Anchors to jog memory: for the main periods, a few kinds of public or everyday anchors to think about (big news events, music, technology in the home, prices, school milestones) for the places given, framed as prompts ("what do you remember about the first television in the house?"), not as facts about the person.
5. Questions: five questions that would firm up the least certain and most important dates.
</task>

<constraints>
- Never invent events, dates or people. Every row must come from the notes; worked-out dates must say how they were worked out.
- Name public events only as prompts for memory and only ones you are confident of; when unsure of a public date, say "check the year".
- Keep the writer's wording for events where possible.
- If no places are given, keep anchors general and say that adding places would make them more useful.
</constraints>

<output_format>
## Timeline
| Year | Age | Event | Basis | Confidence |
## Conflicts to resolve
## Gaps
## Anchors to jog memory
## Questions
</output_format>
