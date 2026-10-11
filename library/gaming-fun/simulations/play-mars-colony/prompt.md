---
schema: 1
id: play-mars-colony
kind: prompt
title: Play a Mars colony survival game
description: Runs a turn-based game building and keeping alive a small Mars base, balancing power, oxygen, water, food, crew health and resupply windows with real physics and biology explained.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, gamer, individual]
subject: [physics, engineering, biology]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mars, space-colony, resource-management, life-support, science-game]
pairs_with:
  prompts: [play-space-mission-control, play-survival-scenario]
args:
  - name: crew_size
    description: Number of crew at landing.
    type: number
    default: 6
  - name: turns
    description: Number of turns, each about one Martian month.
    type: number
    default: 18
  - name: realism
    description: arcade = simpler maths, forgiving; realistic = tighter margins and real constraints like dust storms and the 26-month launch window.
    type: enum
    enum: [arcade, realistic]
    default: realistic
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a Mars base simulation grounded in real constraints. Mars gets less than half of Earth's sunlight, and dust storms can cut solar power for weeks; the atmosphere is thin carbon dioxide, so oxygen must be made (electrolysis of water or splitting CO2) and leaks are lethal; water comes from ice that must be mined and melted; growing food takes power for lights and heat and months to harvest; radiation and isolation wear on crew health; and resupply from Earth comes only in launch windows about every 26 months. Every resource connects to power. The fun is in the trade-offs; the learning is in the debrief.

Crew: {{crew_size}}
Turns: {{turns}}
Realism: {{realism}}
</context>

<task>
1. Before play, set the base's starting stock and fixed rules: power generation (solar and any backup), daily per-person needs for oxygen, water and food, storage capacities, equipment list, crew members (fictional names, a skill each, health 100), and the turn when the next resupply window opens. Keep the rules fixed.
2. Open with the landing, the base layout, a resource table and the decisions available: build (greenhouse, ice mine, extra solar, radiation shelter, repair bay), assign crew, research, explore, ration.
3. Each turn, take the player's choices, then compute production and consumption with the stated rules, apply one event (dust storm, equipment fault, micrometeorite leak, crop failure, discovery of ice, crew conflict) and show the updated table.
4. Explain each consequence briefly with the real science behind it (why the storm cut power, why the leak matters).
5. Trigger the end at the final turn, at the resupply window or if the crew cannot survive; then debrief with what kept them alive, the decisions that cost the most, and five real facts about Mars living the game used.
</task>

<constraints>
- Keep arithmetic consistent and show it in the table; resources never appear without a source.
- State clearly when a number is simplified for the game.
- Do not present speculative technology as existing; label it "experimental" if the player researches it.
- Crew loss, if it happens, is handled without graphic detail.
- On arcade, keep margins generous; on realistic, be honest about how hard it is.
</constraints>

<output_format>
Each turn: what happened, the science in one or two lines, then a table:
| Resource | Stock | Change | Days left |
and a status line [Turn n of N | Crew: n, avg health … | Next resupply: turn …].
Debrief: heading, what worked, costly decisions, five real facts.
</output_format>
