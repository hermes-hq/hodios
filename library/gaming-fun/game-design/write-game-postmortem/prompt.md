---
schema: 1
id: write-game-postmortem
kind: prompt
title: Write a game project postmortem
description: Writes a postmortem for a finished game, jam entry or prototype from the team's notes and numbers - what went right, what went wrong, root causes and the changes to carry into the next project.
category: game-design
version: 1.0.0
status: incubating
stage: [review]
role: [designer, game-developer, project-manager]
requires: [none]
inputs: [notes, text, dataset]
output: [report, article]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [postmortem, retrospective, lessons-learned, indie-games, game-jam, devlog]
pairs_with:
  prompts: [scope-indie-game, analyze-playtest-notes]
args:
  - name: project
    description: The game, team size, planned versus actual timeline and budget, and where it shipped or was shown.
    type: text
    required: true
  - name: notes
    description: The team's notes - what went well, what went badly, decisions made, cut features, crunch, reviews or player feedback, and any numbers (sales, wishlists, downloads, playtime, ratings).
    type: text
    required: true
  - name: audience
    description: Who will read it - "just the team", "a public devlog", "funders". Optional; defaults to the team.
    type: string
output_contract:
  format: markdown
  sections: [Summary, Planned versus actual, What went right, What went wrong, Root causes, Changes for next time, Numbers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help game teams write postmortems. The classic format (five things that went right, five that went wrong) is easy to write and easy to forget, because it lists symptoms ("the art pipeline was slow", "we crunched") without causes or decisions. Useful postmortems compare plan with reality in numbers, trace each problem to a decision or missing practice that can be changed, credit what worked so it is repeated deliberately, and end with a short list of concrete changes for the next project. Team postmortems are blameless: they examine decisions and systems, not people. Public postmortems are honest but leave out private details about individuals, contracts and money the team has not agreed to share.

Project:
{{project}}

Notes:
{{notes}}
{{#audience}}

Audience: {{audience}}
{{/audience}}
</context>

<task>
1. Write a short summary: what the game is, what shipped, and the headline lesson.
2. Planned versus actual: scope, timeline, budget and team, with the gaps in numbers where the notes give them.
3. What went right: three to five items, each with the evidence and the practice or decision behind it so it can be repeated.
4. What went wrong: three to five items with evidence and impact.
5. Root causes: for each problem, ask why until reaching a decision, assumption or missing practice that the team could change; group problems that share a cause.
6. Changes for next time: three to five concrete, checkable changes, each linked to a root cause.
7. Numbers: a table of the metrics given, with what they suggest and what they cannot tell you.
8. Adjust tone and detail for the audience.
</task>

<constraints>
- Blameless: describe decisions and systems, not individuals' failings.
- Use only facts and numbers in the notes; mark interpretations as such and never invent sales or player figures.
- For public versions, leave out personal details, salaries, contract terms and anything the team has not agreed to share, and say what was removed.
- Changes must be specific actions, not resolutions like "communicate better".
</constraints>

<output_format>
## Summary
## Planned versus actual
Table: Area | Planned | Actual | Gap.
## What went right
## What went wrong
## Root causes
## Changes for next time
## Numbers
</output_format>
