---
schema: 1
id: plan-blog-post-series
kind: prompt
title: Plan a blog post series
description: Plans a multi-part blog series readers follow to the end, with a series promise, parts that stand alone, order and links, a hub page, a publishing rhythm and the hook for each instalment.
category: blogging
version: 1.0.0
status: incubating
stage: [plan]
role: [writer, content-creator, marketer]
requires: [none]
inputs: [topic, notes]
output: [plan, outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [content-series, editorial-planning, hub-page, internal-linking, reader-retention]
pairs_with:
  prompts: [generate-blog-post-ideas, write-pillar-page, write-blog-post-draft]
args:
  - name: topic
    description: What the series covers, why you are the one to write it, what you already know or have drafted, and any deadline or launch it supports.
    type: text
    required: true
  - name: reader
    description: Who the series is for and where they start (for example "first-time allotment holders in their first season").
    type: string
    required: true
  - name: parts
    description: Number of parts you have in mind.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [Series promise, Parts, Reading paths, Hub page, Publishing rhythm, Risks and questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A blogger or organisation wants to publish a topic as a series instead of one long post. Series earn return visits and subscriptions, but most stall: part one promises too much, later parts depend on earlier ones so search visitors landing on part four are lost, the parts are split by the writer's convenience rather than the reader's progress, and the rhythm slips after part two. A good series has one promise for the whole run, parts that each deliver a complete win and stand alone, explicit links forward and back, a hub page that holds it together, and a rhythm the writer can sustain.

Reader: {{reader}}
Planned parts: {{parts}}
</context>

<task>
<topic>
{{topic}}
</topic>

1. Write the series promise: what the reader can do or understand after the last part, in one sentence, plus the series title and a two-line description.
2. Test the number of parts: if {{parts}} is too many for the material (thin parts) or too few (parts over about 2,500 words), recommend a different number and say why.
3. Order the parts by the reader's progress (what they need first, what builds on it), not by the writer's outline. Each part gets: working title; the single question it answers; the complete win the reader gets from this part alone; key points (three to five bullets); what it assumes and where to send a reader who lacks that; a hook for the opening; a cliffhanger or "next time" line that is honest about what part N+1 delivers; and a rough word count.
4. Make every part stand alone: a two-sentence recap at the top for readers arriving from search, and context links rather than "as we saw last time".
5. Plan reading paths: the default order, a "skip to" path for readers who know the basics, and which parts to link to each other.
6. Design the hub page: the promise, who it is for, all parts with one-line summaries and status (published or coming on [date]), and a sign-up or follow prompt.
7. Set a publishing rhythm the writer can keep (weekly or fortnightly), with a buffer: have at least two parts drafted before part one goes out.
8. Name the risks (a part that depends on research not done, a gap in the writer's experience) and questions to resolve.
</task>

<constraints>
- Build on what the writer knows and has drafted; mark any part that needs research or expertise they did not mention with [needs research].
- Do not invent statistics, sources, case studies or guest contributors.
- Avoid clickbait hooks and cliffhangers that withhold the point of the current part.
- If the topic or reader is missing, ask for it and stop.
</constraints>

<output_format>
## Series promise
Title, description, the one-sentence promise, and any recommendation on the number of parts.

## Parts
One block per part with the fields in step 3.

## Reading paths
Bullets.

## Hub page
An outline of the hub page with draft intro text.

## Publishing rhythm
Table: part | draft by | publish on (relative, e.g. week 1) | promotion note.

## Risks and questions
Bullets.
</output_format>
