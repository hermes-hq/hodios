---
schema: 1
id: draw-org-chart
kind: prompt
title: Draw an org chart
description: "Turns a staff list into a valid Mermaid org chart and outline, handling dotted-line reports, vacancies and large teams, and lists the data problems found. Use for team structure."
category: data-visualization
version: 1.0.0
status: incubating
stage: [design]
role: [manager, recruiter, operations-manager, founder]
inputs: [text, dataset, document]
output: [diagram, table, questions]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [org-chart, mermaid, reporting-lines, team-structure]
pairs_with:
  prompts: [draw-process-diagram, plan-team-restructure]
args:
  - name: people
    description: "The staff list or description: name or role title, manager, team, and any dotted-line reporting, vacancies, contractors or shared roles. A pasted HR export works."
    type: text
    required: true
  - name: view
    description: "Which view is needed: full company, one department, management levels only, or a proposed future structure; and where it will be used (wiki, slide, onboarding pack)."
    type: text
output_contract:
  format: markdown
  sections: [Structure check, Diagram, Outline, Issues and questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draw org charts from messy lists. The data almost always has problems: people whose manager is not on the list, circular reporting, two people with the same name, titles that do not match levels, and dotted-line or matrix relationships that a strict tree cannot show. A full-company tree with more than about 30 to 40 boxes is unreadable on a slide, so large organisations need one chart per level or department, with a top-level chart linking them. Mermaid flowcharts (graph TD) render org charts in most wikis and documentation tools; dotted-line relationships use a dashed link; vacancies and contractors need a distinct style. Org charts are personal data about employees, so a chart for wide sharing should show what the audience needs (often roles rather than names for external use).
</context>

<task>
Draw the org chart.

<people>
{{people}}
</people>

{{#view}}
<view>
{{view}}
</view>
{{/view}}

1. Check the structure: build the reporting tree; list people whose manager is missing, circular reports, duplicate names, more than one top person, and people with an unusually large number of direct reports. Do not resolve these by guessing.
2. Decide the scope and split: if the view has more than about 30 to 40 boxes, draw a top-level chart and one chart per department or level, and say how they connect.
3. Write valid Mermaid (flowchart TD) with node IDs that are safe (no spaces or special characters), labels with name and role on two lines, solid links for line management, dashed links for dotted-line reporting, a class style for vacancies and another for contractors, and subgraphs for teams where useful.
4. Give an indented text outline of the same structure for places that cannot render Mermaid.
5. List issues found and the questions to resolve them.
</task>

<constraints>
- Use only the people and relationships given; never add people, managers or titles.
- Show unresolved problems as issues, not as guessed links.
- Keep personal data minimal: include only fields needed for the stated use, and suggest roles instead of names for external audiences.
- Make sure the Mermaid code is syntactically valid: quote labels containing punctuation and use <br/> for line breaks.
</constraints>

<output_format>
## Structure check
Bullets: counts (people, levels, managers) and problems found.

## Diagram
One or more mermaid code blocks.

## Outline
Indented list.

## Issues and questions
Numbered list, or "None found".
</output_format>
