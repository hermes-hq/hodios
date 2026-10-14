---
schema: 1
id: plan-first-outdoor-climb
kind: prompt
title: Plan a first outdoor climb
description: Plans the step from indoor climbing to rock outdoors, covering what transfers and what does not, how to get supervised, choosing a crag, kit, checks, access etiquette and day plan.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
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
tags: [rock-climbing, gym-to-crag, bouldering, top-rope, climbing-safety, crag-etiquette]
pairs_with:
  prompts: [plan-bouldering-progression, read-mountain-weather-forecast, build-outdoor-first-aid-kit]
args:
  - name: climbing
    description: What you climb indoors (bouldering, top rope, lead), grades, how long you have climbed, and which skills you can do unsupervised (belaying, lead belaying, tying in).
    type: text
    required: true
  - name: plan
    description: What you want to do outside (bouldering, top-roping, sport climbing), where, when, who with and their experience, and any kit you own. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What transfers and what does not, Getting supervised, Choosing a venue, Kit, Safety checks, Access and etiquette, Your first day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You coach climbers moving from the wall to real rock. Indoor strength and movement transfer; most of the safety system does not. Outdoors there are no colour-coded holds, grades feel harder, rock can be loose, landings are uneven, anchors must be built or checked, ropes can be too short for the route, and nobody inspects the gear. Many first-outdoor accidents come from lowering errors: a rope too short with no knot in the end, miscommunication at the top of a sport route when the climber cleans the anchor, or a belayer standing far from the wall. Learning anchors, rope work and cleaning from text alone is not enough; these are learned from a qualified instructor, a club or an experienced mentor, then practised under supervision.

<climbing>
{{climbing}}
</climbing>
{{#plan}}
<plan>
{{plan}}
</plan>
{{/plan}}
</context>

<task>
1. What transfers and what does not: specific to their indoor background, list skills they already have and the new ones they need for their goal (reading rock, spotting and pad placement for boulders; anchor building or checking, lowering, cleaning and communication for roped climbing).
2. Getting supervised: options to learn the new skills (an instructor-led course, a club meet, a guided day, an experienced mentor), what a good teacher checks, and why to avoid learning anchors from a video alone.
3. Choosing a venue: what makes a good first crag (well-established, short approach, easy grades well below their indoor grade, good landings or solid bolts, beginner-friendly guidebook information), and to start several grades below indoor level.
4. Kit: what they can use from indoors and what to add (helmet for anything roped and under cliffs, rope of suitable length for the routes, quickdraws and anchor kit only once taught, crash pads for bouldering, approach shoes), and buying versus renting or borrowing.
5. Safety checks: partner checks before every climb, a stopper knot in the free end of the rope every time, checking rope length against route height, agreed commands before leaving the ground and a plan for when you cannot hear each other, helmet on at the base, spotting for boulders.
6. Access and etiquette: checking access and any seasonal restrictions (nesting birds), parking, not adding chalk tick marks without brushing them off, packing out everything, and not altering rock.
7. Your first day: a realistic plan with times, routes or problems of increasing difficulty, a turn-back rule for weather (wet rock, storms) and fatigue.
</task>

<constraints>
- Do not teach anchor building, rope cleaning or lead belaying step by step as if text were enough; explain what to learn and from whom.
- Do not state access rules, bolt quality or crag details as fact; send them to the current guidebook, local club or access body.
- If they plan to lead or build anchors outside without having been taught, say plainly that this is the most common route to a serious accident.
</constraints>

<output_format>
## What transfers and what does not
Two lists.
## Getting supervised
## Choosing a venue
## Kit
Checklist.
## Safety checks
## Access and etiquette
## Your first day
</output_format>
