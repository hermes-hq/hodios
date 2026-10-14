---
schema: 1
id: run-lotus-blossom
kind: prompt
title: Run a lotus blossom
description: Expands one central challenge into eight themes and each theme into eight ideas with the lotus blossom grid, then picks the strongest ideas and the themes worth a second bloom.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, manager, teacher, product-manager]
requires: [none]
inputs: [topic, text]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [lotus-blossom, idea-grid, divergent-thinking, ideation-technique]
pairs_with:
  prompts: [cluster-ideas, brainstorm-ideas, run-scamper-session]
args:
  - name: challenge
    description: The central theme or challenge, with context and constraints. For example "make our small library a place teenagers want to spend time, no extra staff".
    type: text
    required: true
  - name: themes
    description: Optional - themes you already want in the grid. Up to eight; the rest are generated.
    type: text
output_contract:
  format: markdown
  sections: [Centre, Eight themes, Petals, Strongest ideas, Next bloom]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The lotus blossom technique (developed by Yasuo Matsumura) is a 3x3 grid of grids. The challenge sits in the centre square, eight themes surround it, and each theme becomes the centre of its own outer grid with eight ideas around it: up to 64 ideas, deliberately spread across different directions. Its strength is coverage. A plain brainstorm drifts into two or three favourite directions; the lotus forces breadth at the theme level and depth within each theme. Its weakness is filler: people pad petals with near-duplicates to fill eight boxes. The themes therefore matter most. They should be distinct angles on the challenge (people, places, timing, money, format, partners, rules to break, the experience), not synonyms of each other.

<challenge>
{{challenge}}
</challenge>
{{#themes}}
Themes the user wants included:
<themes>
{{themes}}
</themes>
{{/themes}}
</context>

<task>
1. Write the centre as a short, specific challenge statement. If the challenge is too vague to produce distinct themes, ask up to two questions and stop.
2. Choose eight themes{{#themes}}, starting with the user's and adding the rest{{/themes}}. Check them for overlap: if two themes would yield the same ideas, replace one. Give each theme a one-line description.
3. For each theme, write eight ideas. Each idea is concrete enough to picture (who does what, where), one line, and different from the other seven in that petal. If a theme truly cannot yield eight non-duplicate ideas, write fewer and say so rather than padding.
4. Remove duplicates across petals; keep the idea in the petal where it fits best and note the merge.
5. Pick the eight strongest ideas across the whole lotus against the constraints in the challenge, with a short reason each, and flag any that combine well.
6. Name the one or two themes that look richest for a second bloom (making a theme or idea the new centre) and give the centre statement for that next round.
</task>

<constraints>
- Respect every stated constraint (budget, staff, rules); do not pad petals with ideas that break them unless clearly marked as a stretch.
- No invented facts about the user's organisation, local services, prices or regulations; label assumptions.
- Keep ideas one line; no essays inside the grid.
- Prefer specific over generic ("Friday evening game-design club run by a local studio" over "more events").
</constraints>

<output_format>
## Centre
One sentence.

## Eight themes
Numbered list, theme and one-line description.

## Petals
One sub-heading per theme with a numbered list of up to eight ideas. Note merges at the end.

## Strongest ideas
Table: Idea | Theme | Why it is strong | Combines with.

## Next bloom
One or two new centre statements and why.
</output_format>
