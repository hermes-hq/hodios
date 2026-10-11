---
schema: 1
id: play-energy-grid-operator
kind: prompt
title: Play an electricity grid operator
description: Puts the player in a fictional grid control room balancing supply and demand hour by hour with solar, wind, gas, storage and imports through weather and outages, then debriefs the trade-offs.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual, teacher]
subject: [engineering, economics]
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
tags: [energy-transition, power-grid, renewables, battery-storage, systems-thinking]
pairs_with:
  prompts: [play-supply-chain-game, play-city-mayor-game]
args:
  - name: scenario
    description: winter-evening = high demand after sunset; summer-heatwave = air conditioning peak and hot, still air; windy-night = more wind than demand.
    type: enum
    enum: [winter-evening, summer-heatwave, windy-night]
    default: winter-evening
  - name: renewable_share
    description: Share of installed capacity that is wind and solar.
    type: enum
    enum: [low, medium, high]
    default: medium
  - name: hours
    description: Number of hourly turns.
    type: number
    default: 8
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a simplified electricity grid simulation. The core rule every grid operator lives by: supply must match demand every moment, or frequency drifts and, beyond limits, protection systems disconnect load (blackouts). Wind and solar are cheap to run but vary with weather; gas plants can ramp but need time to start and cost money and emissions; batteries respond in seconds but empty in hours; hydro or pumped storage is limited by water; imports depend on neighbours; demand response (paying big users to cut) is a quick lever. Forecasts are good but never perfect. The game shows why grids need flexibility, not just capacity.

Scenario: {{scenario}}
Renewable share: {{renewable_share}}
Turns: {{hours}} hours
</context>

<task>
1. Before play, set a fictional grid: demand curve for the scenario, installed capacity by source (in MW), ramp rates, start-up times, marginal costs and emissions per source, battery size and charge, import limit, and a forecast for wind, solar and demand per hour with hidden actual values that differ modestly.
2. Open with the control-room briefing: the next hours' forecast, available plants, battery state, and the rules (balance within a reserve margin; under-supply forces load shedding; over-supply forces curtailment).
3. Each hour, the player sets dispatch: which plants to start or ramp, battery charge or discharge, imports or exports, demand response. Reveal the actual demand and weather, compute the balance, and report frequency status, cost, emissions and battery level.
4. Throw in one or two events: a plant trips offline, a forecast miss, a cold snap, a cloud bank.
5. Debrief: a table of each hour's balance, cost and emissions, the moments when reserves were thinnest, what a different start-up decision earlier would have changed, and three lessons about flexibility, forecasting and storage.
</task>

<constraints>
- Use a fictional grid and fictional companies; numbers are simplified and labelled as such.
- Respect start-up times: a plant ordered now cannot generate before its start-up time has passed.
- Keep energy accounting consistent: battery state changes by what was charged or discharged.
- Present trade-offs between cost, emissions and reliability neutrally; do not lecture about energy politics.
</constraints>

<output_format>
Each turn: short narrative, then a table:
| Source | MW now | Ramp/available |
and [Hour n of N | Demand: … MW | Supply: … MW | Balance: … | Battery: …% | Cost: … | CO2: …].
Debrief: heading, hourly table, thin moments, three lessons.
</output_format>
