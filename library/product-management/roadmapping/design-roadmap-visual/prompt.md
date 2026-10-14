---
schema: 1
id: design-roadmap-visual
kind: prompt
title: Design a roadmap visual
description: Chooses how to show a roadmap to a given audience - format, level of detail, dates or horizons, labels and what to leave out - and drafts the slide or board layout ready to build.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, executive, designer, project-manager]
requires: [none]
inputs: [text, document]
output: [plan, outline, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [roadmap-format, timeline-view, now-next-later, swimlanes, audience-tailoring, slide-layout]
pairs_with:
  prompts: [set-up-roadmap-cadence, write-public-roadmap, brief-board-on-roadmap, write-roadmap-update]
args:
  - name: roadmap
    description: The roadmap content - items, themes, owners, timing and confidence - in any form.
    type: text
    required: true
  - name: audience
    description: Who will see it and what they need to do with it, for example the exec team deciding funding, engineers planning work, sales talking to customers, or customers.
    type: text
    required: true
  - name: medium
    description: Optional. Where it will be shown, for example a single slide, a wall screen, a tool board view, a printed one-pager or a web page.
    type: string
output_contract:
  format: markdown
  sections: [What this audience needs, Recommended format, What to show and hide, Layout, Legend and labels, Pitfalls to avoid]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You decide how a roadmap should look for one audience and lay it out so it can be built in slides, a whiteboard or a roadmap tool. The same roadmap needs different views: executives need themes, outcomes and investment on one page; engineering needs sequence, dependencies and owners; sales needs certainty levels and approved wording; customers need problems being solved without dates that become promises. Common failures are a Gantt chart with exact dates shown to people who will treat them as commitments, forty boxes in eight colours that nobody can read, confidence hidden so everything looks equally certain, and one master view forced on everyone. Format choices carry meaning: a timeline implies dates, now-next-later implies order and certainty that falls with distance, swimlanes by theme or team show where effort goes.
{{#medium}}
Medium: {{medium}}
{{/medium}}
</context>

<task>
Roadmap content:

<roadmap>
{{roadmap}}
</roadmap>

Audience:

<audience>
{{audience}}
</audience>

1. State what this audience needs to decide, do or say after seeing the roadmap, and the questions they will ask.
2. Recommend a format (timeline, now-next-later, theme swimlanes, outcome grid, or a combination) with the reason, and the time granularity (months, quarters, horizons).
3. Decide what to show and what to hide for this audience: level of detail, dates, owners, confidence, internal code names, items not yet funded.
4. Draft the layout: rows, columns, groupings and the text for each box, using the user's content, in a form that can be copied into a slide or tool.
5. Define the legend: colours or shapes for themes and confidence (also readable in greyscale and by colour-blind viewers), status labels, and a "last updated" line.
6. List the pitfalls specific to this audience and medium.
</task>

<constraints>
- Use only the user's roadmap content; do not add items, dates or owners.
- Do not show exact dates to external or sales audiences unless the user says they are committed.
- Keep a single-slide view to about 15 items or fewer; group the rest into themes.
- Never rely on colour alone to carry meaning.
</constraints>

<output_format>
## What this audience needs
Bullets.

## Recommended format
Short paragraph with format and granularity.

## What to show and hide
Table: element | show or hide | reason.

## Layout
A text grid or table that mirrors the visual, with box text filled in.

## Legend and labels
Bullets.

## Pitfalls to avoid
Bullets.
</output_format>
