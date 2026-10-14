---
schema: 1
id: play-air-traffic-control
kind: prompt
title: Play an air traffic controller
description: Runs a simplified approach-control game where the player sequences fictional arrivals and departures with headings, altitudes and speeds, keeping separation through weather and an emergency.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [gamer, student, individual]
subject: [engineering]
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
tags: [aviation, air-traffic-control, separation, sequencing, career-taster]
pairs_with:
  prompts: [play-space-mission-control, try-career-for-a-day]
args:
  - name: traffic
    description: light = up to 4 aircraft at once; busy = up to 7 with departures; storm = busy plus weather cells closing routes.
    type: enum
    enum: [light, busy, storm]
    default: busy
  - name: turns
    description: Number of turns, each about two minutes of airspace time.
    type: number
    default: 12
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a simplified air traffic control game. The player is the approach controller for a fictional airport. The core job is separation: keeping aircraft at least a minimum distance apart laterally or vertically (the game uses 3 nautical miles or 1,000 feet), while sequencing arrivals onto the final approach with enough spacing and fitting departures between them. Controllers work with headings, altitudes and speeds; aircraft respond with a lag (a turn or climb takes time), heavier aircraft need more spacing behind them because of wake turbulence, and weather or an emergency reshuffles everything. Clear, standard phrasing matters because a misheard instruction is a hazard.

Traffic: {{traffic}}
Turns: {{turns}} (about two minutes each)
</context>

<task>
1. Before play, define a fictional airport with one runway, a final approach course, two or three entry points and a text radar grid (about 20 by 20 miles, 2 miles per cell). Generate fictional callsigns with type (light, medium, heavy), position, altitude, speed and intent. Keep aircraft performance rules fixed (turn rate, climb and descent rates, speed changes per turn).
2. Open with the radar picture as a text grid and a table of aircraft, the rules (separation minimum, wake spacing behind heavies, handoff to tower at 5 miles on final), and ask for instructions.
3. Each turn, the player issues instructions in plain or standard style ("ABC123, turn left heading 270, descend 4,000"). Read back each instruction in standard form as the pilot, apply it with realistic lag, move all aircraft, then report the new picture, any loss of separation (with distance and height), aircraft handed to tower and new arrivals.
4. Add events: a go-around, a slow aircraft, a weather cell closing a sector on storm, and one emergency (medical or a technical issue) needing priority.
5. Debrief: aircraft landed and departed, average delay, separation losses with what caused each, and lessons about planning several moves ahead.
</task>

<constraints>
- Fictional airport and callsigns only; rules are simplified for the game and you say so once.
- If an instruction is ambiguous or unsafe, the pilot asks "say again" or reports unable, as real pilots would.
- Keep positions consistent with speeds and lags; aircraft never jump.
- This is not training or real aviation guidance; if the player asks for real procedures, point them to official sources and training.
</constraints>

<output_format>
Each turn: readbacks, events, radar grid, then table:
| Callsign | Type | Position | Alt | Speed | Heading | Intent |
and [Turn n of N | Landed: n | Departed: n | Separation losses: n].
Debrief: heading, stats, each separation loss explained, three lessons.
</output_format>
