---
schema: 1
id: plan-family-hike
kind: prompt
title: Plan a hike with children
description: Plans a day hike with babies or children, sizing the route to the youngest, with carrier and pace rules, energy and morale tactics, kid-specific kit and a lost-child plan.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan]
role: [parent, traveler]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [hiking-with-kids, baby-carrier, family-walks, lost-child-plan, trail-snacks, toddlers]
pairs_with:
  prompts: [plan-nature-walk-activities, plan-trail-water, build-outdoor-first-aid-kit]
args:
  - name: family
    description: Ages of the children, how far they walk now without complaint, whether anyone rides in a carrier, adults' fitness, and anything that makes days go wrong (naps, motion sickness, fears).
    type: text
    required: true
  - name: options
    description: The area, season and any routes you are considering, with distance, ascent, terrain and drops or water nearby. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Route choice, Timing and pace, Keeping them going, Kit for kids, Safety, Plan B]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan family hikes that children want to repeat. Parents usually overestimate how far children will walk and underestimate how much the turnaround matters: a child who is tired halfway is still halfway from the car. A rough rule some families use is about one kilometre per year of age for an easy path, then adjust from their child's real record. Children walk at a much slower pace with frequent stops, and they lose heat and get sunburnt faster than adults. A destination (a stream, a viewpoint, a hut) beats a loop with no payoff. Carriers add weight and change the parent's balance on steep or slippery ground, and a carried child does not generate heat, so they need more layers than the walking adult. Kids near water, cliffs and roads need explicit rules before setting off.

<family>
{{family}}
</family>
{{#options}}
<options>
{{options}}
</options>
{{/options}}
</context>

<task>
1. Route choice: recommend a distance and ascent range for this family based on the youngest walker's record, with a clear payoff and a short-cut or early exit. Assess the options they gave against it, or describe what to look for if none were given.
2. Timing and pace: a time estimate at child pace with stops, start time around naps and meals, and a turnaround point decided in advance (for example the half-energy rule: turn when the youngest seems half-tired, not exhausted).
3. Keeping them going: snacks every 30 to 45 minutes, games and jobs (navigator, snack keeper, spotting things), letting them lead on safe sections, and how to handle the "I'm tired" moment without a fight.
4. Kit for kids: layers for walkers and carried children (carried children need more), spare socks and clothes, sun hat and sun cream, water bottles they can carry, carrier fit and its safety checks, nappy kit and pack-out bags, and a small first aid kit with child doses only as labelled by their pharmacist or doctor.
5. Safety: rules before setting off for water, edges, roads and animals; dressing children in bright colours; the lost-child plan (each child knows to stop and stay put, hug a tree, blow a whistle, and has a parent's number on them); and checking for ticks after walks in tick areas.
6. Plan B: what to do if the weather turns, a child melts down, or someone gets hurt.
</task>

<constraints>
- Do not give medicine doses for children; refer to the packaging and a pharmacist.
- Do not assume one parent; write for whoever is going.
- Keep it practical and short; parents will skim it in the car park.
</constraints>

<output_format>
## Route choice
## Timing and pace
## Keeping them going
## Kit for kids
Checklist.
## Safety
## Plan B
</output_format>
