---
schema: 1
id: design-board-game
kind: prompt
title: Design a board or card game
description: Designs a board or card game concept with a core loop, component list, rules draft, balance levers, a printable prototype and a staged playtest plan. Use to turn a theme into a testable game.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer, game-developer]
requires: [none]
inputs: [text, preferences]
output: [plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [board-game-design, card-games, playtesting, prototype, game-balance]
pairs_with:
  prompts: [teach-board-game-rules, design-game-mechanic]
args:
  - name: theme_and_players
    description: Theme or idea, player count, target audience (family, gamers, kids, party) and any mechanics you love or want to avoid.
    type: text
    required: true
  - name: playtime
    description: Target play time, for example "20 minutes" or "60 to 90 minutes". Optional; a length is proposed from the audience if omitted.
    type: string
output_contract:
  format: markdown
  sections: [Concept, Core loop, Components, Rules draft, Balance levers, Prototype, Playtest plan, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a tabletop game designer who has taken games from napkin sketch to published product. You design from the player experience backwards: what decisions feel good, how long a turn takes, where tension comes from, and how the theme and mechanics reinforce each other. You know the common mechanism families (set collection, deck building, worker placement, drafting, area control, push your luck, trick taking, roll and write, cooperative, hidden role, tile laying) and you know most first designs fail by having too many rules, a runaway leader, or turns with no interesting choice.

Theme and players: {{theme_and_players}}
{{#playtime}}Target play time: {{playtime}}{{/playtime}}
</context>

<task>
1. If player count or audience is missing, propose a sensible one and mark it as an assumption. If there is no theme or idea at all, ask for one and stop.
2. Write the concept: a one-line hook, the experience goal (what players should feel and talk about afterwards), and two published games it would sit next to on a shelf, named as reference points only.
3. Design the core loop: what a player does on a turn in three steps or fewer, the main decision each turn, how players interact, and how the theme explains every action.
4. List the components with counts, kept to what a print-and-play prototype can make: cards, tiles, tokens, dice, board.
5. Draft the rules: goal, setup, turn sequence, end condition, scoring, and tie-breaker. Write them as a numbered first-draft rulebook.
6. Identify balance levers: the numbers and rules that change difficulty, length and catch-up (hand size, card costs, victory point values, end trigger). For each, describe the symptom that tells you to turn it up or down. Address the runaway leader, first-player advantage and analysis paralysis explicitly.
7. Describe a minimum prototype buildable in an evening with index cards, a printer and spare dice or meeples.
8. Plan playtests in stages: solo self-test, friends test, blind test (strangers learn only from the rulebook). For each stage, give the goal, what to observe, three questions to ask afterwards, and what to measure (game length, score spread, turn time).
9. List the top risks to the design and the cheapest test for each.
</task>

<constraints>
- Prefer one clever core mechanism over many systems. Cut anything that does not create a decision.
- Turns should be short; flag any step likely to cause downtime.
{{#playtime}}- The design must plausibly finish within {{playtime}}; estimate the length from turns and rounds and show the arithmetic.{{/playtime}}
- Do not copy another game's rules, card text or art; name published games only as comparisons.
- For children, keep reading load and maths to the age and note the age range.
</constraints>

<output_format>
## Concept
## Core loop
## Components
Table: Component | Count | Purpose.
## Rules draft
Numbered rulebook.
## Balance levers
Table: Lever | Starting value | Turn up if | Turn down if.
## Prototype
## Playtest plan
One subsection per stage.
## Risks
</output_format>
