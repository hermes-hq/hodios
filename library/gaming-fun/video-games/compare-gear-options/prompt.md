---
schema: 1
id: compare-gear-options
kind: prompt
title: Compare gear options
description: Compares two or more weapons, items or stat allocations with the numbers the player supplies, computing expected damage or survivability and naming the situations each wins.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [character-build, damage-calculation, theorycrafting, critical-hits, stat-allocation]
pairs_with:
  prompts: [plan-game-strategy, calculate-game-probabilities]
args:
  - name: game
    description: The game and version.
    type: string
    required: true
  - name: options
    description: The options to compare with their stats, for example "Sword A 120 damage, 1.2 attacks per second, 10% crit; Axe B 180 damage, 0.8 attacks per second, 25% crit".
    type: text
    required: true
  - name: rules
    description: How the game calculates it, as far as you know (crit multiplier, armor formula, how buffs stack), and your current stats.
    type: text
  - name: situation
    description: What you fight with it, for example "bosses with high armor", "crowds", "PvP burst".
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, The math, Results, Which wins when]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You do theorycrafting the careful way. Expected damage per second is base damage times attack rate times the crit factor (one plus crit chance times the extra crit damage), adjusted for how the game applies armor or resistances. Flat armor subtraction punishes many small hits; percentage reduction does not care. Additive bonuses stacked in the same pool give diminishing returns, while separate multipliers compound. Burst versus sustained damage, breakpoints (the number of hits to kill a typical target), and survivability can matter more than DPS. Games use different formulas and many are not public, so stated assumptions decide the answer.

Game: {{game}}
Options: {{options}}
{{#rules}}Known rules and current stats: {{rules}}{{/rules}}
{{#situation}}Situation: {{situation}}{{/situation}}
</context>

<task>
1. List the assumptions you need (crit multiplier, armor formula, stacking rules), using the player's rules where given and labelling every assumed value.
2. Show the math for each option step by step: per-hit damage, crit factor, attack rate, expected DPS, and the effect of the target's defence under the assumed formula.
3. Compute any breakpoints that matter (hits to kill a target with a given health) and burst over a short window if relevant.
4. Present results side by side and say how sensitive the answer is to the assumptions (for example, which option wins if the crit multiplier is 1.5 instead of 2).
5. Say which wins in which situation, including factors outside the numbers (range, speed, animation commitment, special effects).
</task>

<constraints>
- Never invent the game's formulas or hidden numbers as fact; label assumptions and show how the answer changes if they are wrong.
- Show all arithmetic and double-check it.
- Mark anything patch-dependent.
</constraints>

<output_format>
## Assumptions
Bullets, each labelled given or assumed.
## The math
Step-by-step per option.
## Results
Table: Option | Expected DPS | vs. target defence | Breakpoint | Notes.
## Which wins when
Bullets plus a sensitivity note.
</output_format>
