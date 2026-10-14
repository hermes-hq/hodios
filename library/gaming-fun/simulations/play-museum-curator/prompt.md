---
schema: 1
id: play-museum-curator
kind: prompt
title: Play a museum curator
description: Has the player curate a fictional museum exhibition, choosing a theme, negotiating loans, handling conservation, labels, budget and visitors, then scores the show on story, care and attendance.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual, gamer]
subject: [art-history, history]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [museum-work, exhibition-design, heritage, conservation, career-taster]
pairs_with:
  prompts: [play-archaeology-dig, try-career-for-a-day]
args:
  - name: museum_type
    description: The kind of museum, for example "small-town history museum", "regional art gallery", "natural history museum", "science centre".
    type: string
    default: regional art gallery
  - name: turns
    description: Number of planning turns before opening, plus the run of the show.
    type: number
    default: 10
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a curating simulation. Exhibitions are argued, not just assembled: a strong show has a clear idea, a route that tells it, and objects that each earn their place. Real curators also negotiate loans (lenders want condition reports, insurance, couriers and safe conditions, and say no to fragile pieces), protect objects (light limits for works on paper and textiles, stable humidity, handling rules), write labels that most visitors read for only seconds, think about access and who is represented, and work within a budget and a fixed opening date. Popular blockbusters and thoughtful small shows both have a place; the trade-off between them is part of the game.

Museum: {{museum_type}}
Turns: {{turns}}
</context>

<task>
1. Before play, create the fictional museum (galleries, budget, opening date in turns, the director's goal) and a pool of 15 to 20 fictional objects or works across the collection and potential lenders, each with a short description, fragility, loan cost and condition notes. Keep the pool fixed.
2. Open with the brief and ask the player to choose a theme and working title.
3. Each planning turn, offer two or three decisions: request loans (some lenders refuse or attach conditions), commission a conservation check, choose the route and room order, write or approve labels, plan access (seating, large print, audio, step-free route), plan programming and marketing within budget. Report consequences and one event (a lender withdraws, a damaged frame, a funding offer with strings, a community group asking to be consulted).
4. Ask the player to write at least two object labels; give feedback on length (about 50 to 80 words), clarity and the "look at this" hook.
5. Run the show over the final turns with visitor numbers, comments and press, then score it on four measures out of 10: story, object care, access and attendance, with reasons.
</task>

<constraints>
- All objects, lenders and people are fictional; you may model them on real types of objects and real museum practice.
- Keep the budget arithmetic exact.
- Object care consequences follow real practice (light-sensitive works need low light and limited display time); explain each.
- Score fairly: a small, careful, well-argued show can score well even with modest attendance.
</constraints>

<output_format>
Each turn: what happened, choices, then
[Turn n of N | Budget: … | Objects confirmed: n | Opening in: n turns].
Final: score table (Measure | Score | Reason), visitor comments, what a real curator would do next.
</output_format>
