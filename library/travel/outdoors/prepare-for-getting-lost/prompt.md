---
schema: 1
id: prepare-for-getting-lost
kind: prompt
title: Prepare for getting lost
description: Prepares a hiker or a family for getting lost or caught out after dark, with a pre-trip routine, the stop-and-think drill, when to stay put, how to call for help and a night-out plan.
category: outdoors
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [traveler, individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [lost-on-trail, benighted, navigation, search-and-rescue, emergency-shelter, mountain-safety]
pairs_with:
  prompts: [write-trip-intentions-plan, practise-map-skills, set-turnaround-time]
args:
  - name: situation
    description: The kind of terrain and trips you do (forest, moorland, mountains, desert), whether you go solo or with children, the navigation tools and emergency kit you carry, and the season.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before every trip, If you think you are lost, Stay or move, Calling for help, A night out, For children, Practise it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You teach people what to do when the trail runs out. Search and rescue teams see the same pattern: a small navigation mistake, then pressing on in the hope it will sort itself out, then a bigger mistake made in a hurry as light fades. The most useful habits are boring: knowing where you are before you are lost (checking position at every junction), noticing early when the ground does not match the map, stopping to think, and going back to the last known point rather than forward into the unknown. Whether to stay put or move depends on whether anyone knows your route and whether you can reliably reach a known point; children and anyone without a plan left at home are usually best taught to stay put, because searchers find stationary people faster. A phone can share coordinates even when calls fail, and emergency texting or satellite devices exist in some places.

<situation>
{{situation}}
</situation>
</context>

<task>
1. Before every trip: leave a trip plan, carry and know how to use a map and compass as well as a phone app, download offline maps, carry a power bank, head torch, extra layer, emergency shelter, whistle and food, and check your position at every junction.
2. If you think you are lost: the stop drill (Stop, Think, Observe, Plan): stop moving, have a drink and a snack, look at the map and your last known point, look for features, and decide calmly. Do not split up.
3. Stay or move: the factors (someone knows your route, daylight left, weather, injuries, a reliable handrail feature or retracing route) and a clear default for their situation, with the rule that moving in the dark on unknown ground is usually worse than waiting.
4. Calling for help: call the local emergency number and ask for the right service (in some countries mountain or search and rescue is reached through police), give your location as grid reference or coordinates from the phone, save battery (airplane mode between checks, lower brightness), try a text if calls fail, use a satellite messenger or personal locator beacon if carried, and the international distress signal of six whistle blasts or torch flashes repeated each minute.
5. A night out: shelter from wind and ground cold, put on every layer, sit on your pack, share warmth, eat, keep a torch ready, and help searchers see and hear you.
6. For children: the hug-a-tree approach (stay put, stay where you can be seen, answer to your name, blow your whistle), what to put in their pocket, and practising it as a game.
7. Practise it: a short drill to do on an easy walk.
</task>

<constraints>
- Do not invent emergency numbers or say which agency answers in a country unless you are confident; tell them to check before they go.
- Do not suggest following streams downhill as a general rule; it can lead into gorges and cliffs.
- Keep it calm and memorable; this should be readable the night before a trip.
</constraints>

<output_format>
## Before every trip
## If you think you are lost
## Stay or move
## Calling for help
## A night out
## For children
Include only if relevant; otherwise one line.
## Practise it
</output_format>
