---
schema: 1
id: play-outbreak-response
kind: prompt
title: Play an outbreak response game
description: Puts the player in charge of a fictional town's response to a new infectious disease, with weekly choices on testing, isolation, vaccines and messaging, and a debrief on how epidemics spread.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
subject: [biology, healthcare]
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
depth: specific
tags: [epidemiology, public-health, sir-model, decision-game, classroom-game]
pairs_with:
  prompts: [play-city-mayor-game, play-ecosystem-keeper]
args:
  - name: pathogen
    description: The fictional disease's profile. mild-fast = spreads quickly, rarely severe; severe-slow = spreads slowly, often severe; stealth = much spread before symptoms.
    type: enum
    enum: [mild-fast, severe-slow, stealth]
    default: stealth
  - name: weeks
    description: Number of weekly turns.
    type: number
    default: 12
  - name: town_size
    description: Population of the fictional town.
    type: number
    default: 50000
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run an outbreak response simulation. The player is the head of public health for a fictional town facing a fictional new disease. The game teaches how epidemics really behave: growth is exponential while each case infects more than one other (the reproduction number R above 1), reported cases lag real infections by about a week, hospitals fill after cases, measures work with a delay and cost trust and money, and people's compliance falls the longer restrictions run. The model is a simple compartment model (susceptible, infected, recovered), run honestly in the background with numbers that stay consistent.

Pathogen: {{pathogen}}
Turns: {{weeks}} weeks
Town population: {{town_size}}
</context>

<task>
1. Before the first turn, set hidden parameters for the pathogen profile: base R (between about 1.5 and 3.5), incubation time, share of cases needing hospital, share of spread before symptoms, and the town's hospital beds, testing capacity, budget and public trust (0 to 100). Keep them fixed.
2. Open with a briefing: the first reported cases, what is known and unknown, the levers available (testing, contact tracing, isolation support, school or venue measures, masks, public messaging, requesting vaccine supply, field hospital), each with its cost and delay.
3. Each turn, the player chooses up to three actions. Apply them: adjust effective R based on the measures and current compliance, advance the model one week, then report what the player can see: reported cases (lagged and limited by testing), hospital occupancy, budget, trust, and one event (a local outbreak, a protest, a supply delay, a misinformation rumour).
4. Keep the true infection count hidden until the debrief; show only what a real health chief would see.
5. Introduce a vaccine or treatment option no earlier than week 6, with limited supply and a choice of who gets it first.
6. At the end, debrief: a table of true versus reported cases by week, the effect of each decision on R, the turns where acting a week earlier would have mattered most, and three lessons about exponential growth, lag and trust.
</task>

<constraints>
- The disease, town and events are fictional. Do not name real diseases' statistics as if they were this one's, and do not make claims about real past pandemic policies.
- This is a teaching game, not medical or public health advice; say so once at the start and if the player asks for real-world guidance, point them to their local health authority.
- Keep numbers internally consistent: population is conserved, and hospital occupancy follows cases.
- Do not punish a sensible choice with an arbitrary disaster; events are plausible and sometimes favourable.
- Keep it suitable for a school class: no graphic descriptions of illness or death; report deaths as numbers if at all.
</constraints>

<output_format>
Each turn: a short week report in prose, then:
[Week n of N | Reported cases this week: … | Hospital: used/beds | Budget: … | Trust: …/100]
then the options reminder in one line.
Debrief: heading, the table (Week | True new infections | Reported | Effective R | Key action), turning points and three lessons.
</output_format>
