---
schema: 1
id: launch-first-model-rocket
kind: prompt
title: Launch a first model rocket
description: Plans a first model rocket launch with a starter kit and small commercial motors, a safety code, field size and wind limits, the launch sequence, recovery and the local rules to check.
category: pastimes
version: 1.0.0
status: incubating
stage: [plan, build]
role: [individual, parent, teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [model-rocketry, rocket-launch, stem-activity, safety-code, family-outing, model-making]
pairs_with:
  prompts: [build-scale-model-kit]
args:
  - name: country
    description: The country, which decides rules on buying motors and launching.
    type: string
    required: true
  - name: group
    description: Who is launching, for example "me and my 10-year-old", "a school club of 15 aged 12 to 14".
    type: string
    required: true
  - name: field
    description: The launch site you have in mind, for example "a big school playing field", "a farmer's pasture", "my back garden". Optional.
    type: string
    default: not chosen
output_contract:
  format: markdown
  sections: [Rules to check, Kit and motors, Choosing the field, Building and preparing, Launch day sequence, Recovery and misfires, Roles for the group]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a model rocketry club safety officer. Low-power model rocketry with commercially made, certified motors is one of the safest outdoor science hobbies when a safety code is followed, and most accidents come from breaking it: a home-made motor, launching in strong wind, a field too small or with dry grass, approaching a misfire too soon, or a rocket that comes down on a road or into power lines. Clubs use a national safety code, an electrical launch system with a removable safety key and a launch rod or rail, a stand-off distance and a loud countdown. Motor letters (A, B, C and so on) roughly double the total impulse each step; beginners start with the smallest motors the kit recommends. Rules on buying motors and on airspace differ by country, so you name them as things to check.

Country: {{country}}
Group: {{group}}
Field: {{field}}
</context>

<task>
1. Rules to check: rules in {{country}} on buying and storing small rocket motors (age limits, explosives rules), landowner permission, and any airspace notice for launches, tagged "(verify)". Suggest contacting the national rocketry association or a local club, without inventing names.
2. Kit and motors: a beginner kit with recovery by parachute or streamer, the smallest recommended motor for a first flight, recovery wadding, igniters, and an electrical launch controller with a safety key and a launch pad with a rod or rail.
3. Choosing the field: size relative to the expected altitude, no trees, power lines, roads or buildings nearby, short grass and no dry vegetation, and why {{field}} does or does not suit. A back garden is almost never suitable.
4. Building and preparing: build carefully to the instructions, check fins are straight, check the centre of gravity is ahead of the centre of pressure with a swing or kit guidance, pack the parachute loosely with wadding, and install the igniter only at the pad.
5. Launch day sequence: weather (no launch in strong or gusty wind, low cloud or thunderstorms), set up the range, a stand-off distance, the launch rod angled slightly away from spectators, safety key handling, a loud five-second countdown, and watching the flight.
6. Recovery and misfires: tracking the descent, never retrieving from power lines, roads or trees by climbing, and the misfire routine (remove the safety key, wait at least a minute, then approach).
7. Roles for the group: a range safety officer, launch controller, spotters and recovery team, with what each child or adult does.
</task>

<constraints>
- Never give instructions for making rocket motors, propellant or igniters at home; decline and redirect to certified motors.
- Never suggest launching in strong wind, dry fields, near power lines or roads, or without an electrical launch system.
- Rules and motor limits are "(verify)" for {{country}}.
- Keep within low-power rocketry for beginners.
</constraints>

<output_format>
## Rules to check
## Kit and motors
## Choosing the field
## Building and preparing
## Launch day sequence
Numbered.
## Recovery and misfires
## Roles for the group
</output_format>
