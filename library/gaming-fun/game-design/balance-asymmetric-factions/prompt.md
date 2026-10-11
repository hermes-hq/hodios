---
schema: 1
id: balance-asymmetric-factions
kind: prompt
title: Balance asymmetric factions
description: Balances asymmetric factions, characters or roles in a board or video game by mapping each one's strengths, counters and power curve over time, then proposing tuning changes and a win-rate test plan.
category: game-design
version: 1.0.0
status: incubating
stage: [design, review]
role: [designer, game-developer]
requires: [none]
inputs: [text, notes, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [asymmetry, game-balance, factions, win-rate]
pairs_with:
  prompts: [design-game-mechanic, analyze-playtest-notes]
args:
  - name: factions
    description: Each faction, character or role with its abilities, starting resources and intended play style, plus the shared rules they all use.
    type: text
    required: true
  - name: results
    description: Any playtest or match results so far - win counts per faction, game lengths, player comments. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Faction identities, Power over time, Counter map, Problems found, Tuning changes, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You balance asymmetric games. Asymmetry is fair when every side has a real path to victory and a real weakness, not when every side has equal numbers. Experienced designers compare factions on power over time (early, mid, late game), on what each one counters and is countered by, and on how hard each is to play well, because a faction that is strong only in expert hands will look weak in early tests. Win rates need enough games to mean anything: a few games per faction cannot separate a 55% faction from a 45% one, so qualitative signals carry early testing.

{{#results}}Results so far: {{results}}{{/results}}
</context>

<task>
Factions:

<factions>
{{factions}}
</factions>

1. Write each faction's identity in one line: its fantasy, its main way to win, and its main weakness. Flag any faction without a clear weakness or without a clear way to win.
2. Map power over time: for each faction, relative strength in the early, mid and late game, and the turn or moment its plan comes online.
3. Build a counter map: which faction pressures which, and whether every faction has at least one bad matchup and one good one.
4. Rate the skill floor and ceiling of each faction, and note which ones will mislead early tests.
5. If results were given, read them honestly: number of games, whether differences are within noise, and what the qualitative comments suggest. Say plainly when the sample is too small.
6. List the balance problems found, in order of impact.
7. Propose tuning changes, smallest first: numbers before rules, and one change per faction per test round. Give the expected effect of each.
8. Write a test plan: matchups to prioritise, how many games before trusting a win rate (explain the rough margin of error), seat and turn-order rotation, and data to log.
</task>

<constraints>
- Preserve each faction's identity; do not balance by making factions the same.
- Do not invent results or claim a faction is overpowered from a handful of games.
- Show the margin-of-error reasoning in plain language when discussing win rates.
- Check first-player or seat advantage before blaming a faction.
</constraints>

<output_format>
## Faction identities
Table: Faction | Fantasy | Way to win | Weakness | Flags.
## Power over time
Table: Faction | Early | Mid | Late | Comes online.
## Counter map
A matchup grid or list.
## Problems found
Numbered by impact.
## Tuning changes
Table: Faction | Change | Expected effect | Size of change.
## Test plan
</output_format>
