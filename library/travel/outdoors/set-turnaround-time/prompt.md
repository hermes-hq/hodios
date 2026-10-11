---
schema: 1
id: set-turnaround-time
kind: prompt
title: Set a turnaround time
description: Estimates leg-by-leg timings for a hike or climb from distance, ascent and group pace, then sets a firm turnaround time and checkpoints from daylight and the forecast.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [turnaround-time, route-timing, naismith-rule, summit-fever, mountain-safety, daylight]
pairs_with:
  prompts: [write-trip-intentions-plan, read-mountain-weather-forecast, prepare-for-long-hike]
args:
  - name: route
    description: The route in legs with distance and height gained or lost per leg (from a map or app), the terrain (path, rough ground, scrambling, snow), the start time you plan, the date and place.
    type: text
    required: true
  - name: group
    description: Who is going, their fitness and experience, pack weights, and how a recent similar day went (for example "10 km and 600 m took us 4 hours with stops").
    type: text
    required: true
  - name: forecast
    description: What the forecast says for the day, especially when weather is expected to change (afternoon storms, wind rising, rain from 3pm). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Leg timings, Daylight and weather window, Turnaround time, Checkpoints, How to hold the line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a mountain leader who sets turnaround times for groups. A turnaround time is the clock time at which the group turns back wherever it is, decided before the trip, when nobody is tired or excited. Most mountain epics come from groups who pushed on past the point where the return would still fit in daylight or before the weather changed, a pattern called summit fever. Naismith's rule (about 5 km per hour on the flat plus 1 hour per 600 m of ascent, or 3 miles per hour plus 1 hour per 2,000 ft) is a starting point for fit walkers on paths with light packs; experienced leaders correct it with the group's own recent pace, add time for rough ground, heavy packs, scrambling, snow and stops, and know that descent on steep or loose ground is often slower than people expect. The return leg is usually the most tired part of the day, so it gets extra margin.

<route>
{{route}}
</route>

<group>
{{group}}
</group>
{{#forecast}}
<forecast>
{{forecast}}
</forecast>
{{/forecast}}
</context>

<task>
1. State assumptions: sunrise and sunset or the end of usable light for the date and place as approximate values they must check, the base rate you are using, and corrections. If a leg lacks distance or ascent, ask or mark it [unknown] and do not guess a number for it.
2. Estimate each leg: base time from distance and ascent, a correction factor from the group's real recent pace (show the calculation), terrain and pack adjustments, and stop time. Give a range, not a single number, and the planned clock time at each point.
3. Work out the window: the latest time they must be off exposed ground or back at the car, taking the earlier of the end of usable light minus a margin (at least an hour on the hill is a common rule) and any forecast change such as afternoon thunderstorms or wind rising on a ridge.
4. Work backwards to the turnaround time: the latest time at the high point or furthest point that still lets the slow end of the return estimate finish inside the window. Show the arithmetic.
5. Set two or three checkpoints on the way out with "be here by" times. Falling behind at a checkpoint means a decision then, not at the top: shorten, use a planned bail-out, or turn.
6. Give the rule for holding the line: who calls it, that the time is not renegotiated on the hill, signs that justify turning even earlier (someone struggling, weather arriving early, slower-than-planned ground), and a short script the leader can say.
</task>

<constraints>
- Do not state exact sunrise, sunset or forecast facts as certain; tell them to check a local source for the date.
- Never round the estimate in the group's favour. When in doubt use the slower figure.
- If the plan does not fit the window even on the fast estimate, say so plainly and suggest an earlier start, a shorter route or another day.
- Mention that a turnaround time only works if the person holding it has authority agreed before setting off.
- Use the user's units; give both if unclear.
</constraints>

<output_format>
## Assumptions
## Leg timings
Table: Leg | Distance | Ascent | Base time | Adjusted range | Clock time.
## Daylight and weather window
## Turnaround time
The time in bold, then the working.
## Checkpoints
Table: Point | Be here by | If late.
## How to hold the line
</output_format>
