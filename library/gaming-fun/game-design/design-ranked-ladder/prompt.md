---
schema: 1
id: design-ranked-ladder
kind: prompt
title: Design a ranked mode ladder
description: Designs a competitive ranked mode - hidden rating versus visible tiers, placements, gains and losses, seasons and resets, decay and anti-smurfing - so ranks feel fair and players keep climbing.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [ranked-mode, matchmaking-rating, competitive-design, seasons, elo, skill-tiers]
pairs_with:
  prompts: [design-progression-system, balance-asymmetric-factions]
args:
  - name: game
    description: The competitive game - format (1v1, team, battle royale), match length, team or solo queue, and platform.
    type: text
    required: true
  - name: population
    description: Expected active players and how they spread by region and time of day, or "unknown". Queue time matters most for small games.
    type: text
    required: true
  - name: problems
    description: Current problems if a ranked mode already exists, such as rank inflation, smurfs or long queues. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Goals, Rating and tiers, Placements and new players, Gains and losses, Seasons and resets, Abuse and edge cases, What to measure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design ranked modes for competitive games. Most ranked systems separate a hidden skill rating used for matchmaking (Elo-family systems or Bayesian ones such as Glicko or TrueSkill that track uncertainty) from a visible rank that players see and chase. The visible layer is a motivation system and can be more generous than the rating, but if the two drift far apart players feel cheated. Design decisions that matter: how new players are placed without wrecking matches, how many points a win or loss moves, how team games credit individuals, whether seasons reset ranks, how inactivity decays, and how to handle smurfs, boosting, win-trading and leaving. Small player populations force trade-offs between match quality and queue time.

Game:
{{game}}

Population:
{{population}}
{{#problems}}

Current problems:
{{problems}}
{{/problems}}
</context>

<task>
1. Goals: what ranked should give players (a fair match, a sense of progress, a status symbol) and the trade-offs for this game and population.
2. Rating and tiers: the hidden rating approach with a plain-language explanation, the visible tiers and divisions, and how visible rank maps to the rating.
3. Placements and new players: starting rating and uncertainty, number of placement matches, and protection for new players from experienced ones.
4. Gains and losses: how points move per match, adjustments for uncertainty and win streaks, team versus individual credit, and tier protection rules, with example numbers.
5. Seasons and resets: season length, soft reset formula, rewards, and decay for inactive players.
6. Abuse and edge cases: smurfs, boosting, win-trading, deliberate losing, leavers and disconnects, duo or party queue gaps, and what to do when the queue is empty.
7. What to measure: match quality, queue time, rank distribution, and churn after losses, with targets to set and how to adjust.
</task>

<constraints>
- Mark numbers as starting values to tune with live data.
- Explain rating systems accurately at a high level and do not claim a specific published game uses a specific formula unless widely documented.
- Do not reward deliberate losing or exploit-prone behaviour; check every rule for abuse.
- For small populations, say explicitly what is traded away (match quality, tier count, region split).
</constraints>

<output_format>
## Goals
## Rating and tiers
Table: Tier | Share of players target | Rating band.
## Placements and new players
## Gains and losses
## Seasons and resets
## Abuse and edge cases
Table: Problem | Rule or detection | Trade-off.
## What to measure
</output_format>
