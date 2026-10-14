---
schema: 1
id: build-year-in-review-deck
kind: prompt
title: Build a year-in-review deck
description: Turns a team's year of notes, metrics and launches into a short year-in-review deck with a few themes, honest misses, credit to people and what it means for next year.
category: presentations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [manager, engineering-manager, executive, project-manager]
requires: [none]
inputs: [notes, dataset, document]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [annual-review, team-update, retrospective, recognition, storytelling]
pairs_with:
  prompts: [outline-presentation, write-speaker-notes, shorten-presentation-for-time]
  personas: [presentation-designer]
args:
  - name: material
    description: What the team did this year - launches, projects, metrics with their baselines, incidents, people changes, goals set at the start of the year and how they turned out.
    type: text
    required: true
  - name: audience
    description: Who will see it and why, for example the team at a celebration, leadership deciding next year's budget, or the whole company.
    type: text
    required: true
  - name: length
    description: Time slot or slide limit.
    type: string
    default: "15 minutes"
output_contract:
  format: markdown
  sections: [The one-line story, Themes, Slides, Missing numbers, Draft opening and closing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A year-in-review deck usually becomes a month-by-month list of everything that shipped, which bores the team and tells leadership nothing. A good one picks three or four themes that explain the year, shows each with one or two numbers against a baseline and a concrete example, admits what did not go to plan and what was learned, credits people by the work they did, and ends with what the year means for next year. The audience decides the weight: a team celebration leans on people and stories; a leadership review leans on outcomes against goals, cost and the case for next year's priorities. Numbers without a baseline ("10,000 tickets closed") mean little; the same number against last year, or against the goal, means something.

<material>
{{material}}
</material>
Audience: {{audience}}
Length: {{length}}
</context>

<task>
1. Write the one-line story of the year that the audience should leave with.
2. Group the material into three or four themes. For each, choose the strongest evidence: a number with its baseline or goal, and one concrete example or story. Put items that fit no theme in an appendix list rather than forcing them in.
3. Include goals that were missed or dropped, with what was learned and what changed as a result.
4. Plan the slides for the time slot: a headline that states the point on each, the visual (chart type, photo, quote, timeline), and a talking point. Include a slide or moment that credits people and teams by what they did.
5. Close with what this year means for next year: priorities, asks or open questions, matched to the audience.
6. List numbers you need but were not given, and claims to check before presenting.
7. Draft the first and last thirty seconds of the talk.
</task>

<constraints>
- Use only the facts and numbers supplied. Do not compute percentages from figures that lack a baseline; list the missing baseline instead.
- Do not leave out misses that the audience already knows about; a review that hides them loses trust.
- Credit people only for work the material attributes to them; do not rank individuals.
- Fit the slide count to the time slot, at roughly one to two minutes per content slide.
</constraints>

<output_format>
## The one-line story
## Themes
For each: name, evidence, example.
## Slides
Table: # | Headline | Visual | Talking point.
## Missing numbers
Bullets.
## Draft opening and closing
</output_format>
