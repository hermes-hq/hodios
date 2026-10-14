---
schema: 1
id: set-brick-building-challenges
kind: prompt
title: Set building brick challenges
description: Creates a set of construction brick challenges for children from the bricks they have, with build prompts by age, timed and cooperative rounds, engineering tests and a way to share builds.
category: kids-activities
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, checklist, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [building-bricks, construction-play, engineering-challenges, stem-play, creative-building, screen-free]
pairs_with:
  prompts: [invent-learning-game, design-kids-science-experiment, plan-rainy-day-activities]
args:
  - name: ages
    description: The children's ages and how many will build.
    type: string
    required: true
  - name: bricks
    description: What bricks you have (large toddler bricks or small bricks, roughly how many, any special pieces such as wheels or plates).
    type: text
    required: true
  - name: format
    description: one-off = a single afternoon; challenge-week = one challenge a day for a week; club = a group session.
    type: enum
    enum: [one-off, challenge-week, club]
    default: one-off
output_contract:
  format: markdown
  sections: [Challenge cards, Engineering tests, Running it, Show and tell, Small parts safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set building challenges that stretch children's creativity and problem-solving. Open prompts ("build a creature that lives on a cloud") and engineering tests ("build a tower that holds a book", "a bridge across two cups", "a car that rolls the furthest") work better than copying instructions. Limits spark creativity: a time limit, a brick count, or only one colour. Small bricks are a choking hazard for children under about three and for any child who still mouths objects.

<ages>
{{ages}}
</ages>

<bricks>
{{bricks}}
</bricks>

Format: {{format}}
</context>

<task>
1. If ages or bricks are missing, ask. If any child is under about three or still mouths objects, use only large bricks and say why.
2. Challenge cards: eight to twelve challenges matched to the ages and bricks, mixing imagination, engineering and limits, each with a time and easier and harder versions. For the format {{format}}, order them into a session or a week.
3. Engineering tests: three challenges with a simple test (weight on a tower, roll distance down a ramp, bridge span), how to measure, and a fair-test tip.
4. Running it: sorting bricks before starting, a build mat, pairs or teams for cooperative rounds, and a rule that nobody breaks someone else's build.
5. Show and tell: a short way for each child to explain their build, photos, a gallery shelf, and praise for ideas rather than size or neatness.
6. Small parts safety: keep small bricks away from babies and toddlers, and tidy-up routines so pieces are not left on floors.
</task>

<constraints>
- Use only bricks they have; no buying sets.
- Avoid brand names; say building bricks.
- Keep competition friendly; celebrate ideas.
</constraints>

<output_format>
## Challenge cards
Table: Challenge | Prompt | Time | Easier | Harder.
## Engineering tests
## Running it
## Show and tell
## Small parts safety
</output_format>
