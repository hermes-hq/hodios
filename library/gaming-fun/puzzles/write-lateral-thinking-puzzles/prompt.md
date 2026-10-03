---
schema: 1
id: write-lateral-thinking-puzzles
kind: prompt
title: Write lateral thinking puzzles
description: Writes original lateral thinking (situation) puzzles with a misleading but honest setup, graded difficulty, hint ladders, key yes/no facts for the host and a fairness check on each solution.
category: puzzles
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, parent, gamer]
requires: [none]
inputs: [topic, preferences]
output: [quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [lateral-thinking, situation-puzzles, yes-no-questions, brain-teasers, icebreakers]
pairs_with:
  prompts: [write-riddles, make-logic-puzzle, write-icebreaker-games]
args:
  - name: count
    description: How many puzzles to write.
    type: number
    default: 5
  - name: theme
    description: A theme, setting or audience, for example "office life", "for a class of 11-year-olds", "space travel", or "dark and spooky for adults". Optional; defaults to family-friendly and varied.
    type: string
output_contract:
  format: markdown
  sections: [How to play, Puzzles, Host tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write lateral thinking puzzles, also called situation puzzles: a host reads a strange scenario, and players ask yes-or-no questions until they reconstruct what happened. A good one has a setup that is true in every word yet leads listeners toward the wrong assumption, a solution that makes everything click at once, and a path of questions that a group can actually find. A bad one depends on a pun the host never signalled, obscure knowledge, a supernatural twist, or an answer with several equally good alternatives.

Count: {{count}}
{{#theme}}Theme or audience: {{theme}}{{/theme}}
</context>

<task>
1. Write {{count}} original puzzles. Avoid the well-known classics (the man in the elevator, the albatross soup, the man in the field with a pack, and similar); if a puzzle turns out close to a classic, replace it.
2. For each puzzle, identify the false assumption it exploits (who someone is, what an object is, when or where it happens, a double meaning of an ordinary word) and vary these across the set.
3. Write a setup of one to three sentences that is literally true and contains every fact needed to solve it, with nothing misleading stated as fact.
4. Write the solution in two or three sentences, then a fairness check: could a reasonable group get there by yes/no questions, does it rely on specialist knowledge, are there alternative solutions that fit equally well (if so, add a detail to rule them out).
5. Write three hints that move from gentle to nearly giving it away, and list the three to five key facts players must establish, so the host knows which questions deserve a "yes, and that matters".
6. Grade each puzzle easy, medium or hard and order the set from easiest to hardest.
</task>

<constraints>
- Default to family-friendly content; use death, crime or dark themes only if the theme asks for them, and never graphic detail.
- No puzzles that hinge on stereotypes (for example "the surgeon is a woman" style twists that rely on the audience assuming gender roles).
- For children, keep the vocabulary simple and the solutions grounded in everyday experience.
- Keep each setup short enough to read aloud in one breath or two.
</constraints>

<output_format>
## How to play
Three or four sentences for the host.
## Puzzles
`### N. Title (difficulty)` with: Setup (as a quote to read aloud), Key facts, Hints 1-3, Solution, Fairness check (one or two lines).
## Host tips
How to answer ambiguous questions ("irrelevant", "yes and no"), when to give hints, and how to keep quiet players involved.
</output_format>
