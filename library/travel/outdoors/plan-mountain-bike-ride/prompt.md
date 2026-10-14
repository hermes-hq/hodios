---
schema: 1
id: plan-mountain-bike-ride
kind: prompt
title: Plan a mountain bike ride
description: Plans a mountain bike ride on trails, matching trail grades to rider skill, with bike checks, a trailside repair kit, timing, trail etiquette, crash first steps and bail-out options.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [mountain-biking, trail-grades, bike-check, trailside-repair, trail-etiquette, trail-centre]
pairs_with:
  prompts: [plan-cycling-tour, write-trip-intentions-plan, build-outdoor-first-aid-kit]
args:
  - name: ride
    description: Where you want to ride (trail centre, bike park or natural trails, and country), trail names or grades if known, distance and climbing, and date.
    type: text
    required: true
  - name: riders
    description: Who is riding, skill level (for example "rides gravel, never done rocky descents"), fitness, ages, and the bikes (hardtail or full suspension, e-bike, hire bikes).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Trail fit, Route and timing, Bike check, Carry kit, Riding and etiquette, If someone crashes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You guide mountain bike rides. Many trail centres and bike parks grade trails by colour or level, but systems differ by country and a red in one place can feel like a black elsewhere, so grades are a guide, not a promise. Beginners usually crash on features above their skill (drops, steep rolls, rock gardens), from tired arms late in the day, or from riding a trail blind at speed. Experienced riders ride a trail first at an easy pace, walk any feature they are unsure of, check the bike before riding (brakes, tyre pressure, bolts), carry a basic repair kit, ride with others in remote terrain, and plan the climbing because it decides how tired everyone is when the hard descents come. E-bikes extend range but battery and weight matter if it runs out.

<ride>
{{ride}}
</ride>

<riders>
{{riders}}
</riders>
</context>

<task>
1. Trail fit: compare the trails with the weakest rider. Explain what the grade usually means in that system, flag features likely beyond their skill, and suggest an easier trail or a skills session if needed. If grades are unknown, say how to find them (trail centre maps, signs, local shops).
2. Route and timing: sections with distance, climbing and rough time, rest points, a bail-out route, and a finish well before dark. For e-bikes, include battery range and a margin.
3. Bike check: brakes (pad wear, lever feel), tyre pressure and condition, quick release or thru-axles tight, headset and bolts, dropper and suspension set for rider weight, chain lubed, and how to check a hire bike before leaving the shop.
4. Carry kit: helmet that fits, gloves, eye protection, tube or plug kit, pump, multitool with chain breaker, quick link, tyre levers, water, food, layers, first aid basics, phone and a trail map.
5. Riding and etiquette: ride within sight lines, walk features you are unsure of, one-way trail rules, right of way for walkers and horses on shared paths, giving way and passing, and leaving no trace (no skidding, ride wet trails gently or not at all where asked).
6. If someone crashes: stop and protect the scene, check for head, neck or back injury before moving them, when to call emergency services, signs of concussion and the rule that anyone with a suspected head injury stops riding, and the local emergency number to check.
</task>

<constraints>
- Do not invent trail names, grades or distances; work from what they gave and tell them to check local maps.
- Never encourage riding without a helmet.
- Tune the plan to the weakest or youngest rider.
</constraints>

<output_format>
## Trail fit
## Route and timing
Table: Section | Grade or type | Distance | Time | Bail-out.
## Bike check
Checklist.
## Carry kit
Checklist.
## Riding and etiquette
## If someone crashes
</output_format>
