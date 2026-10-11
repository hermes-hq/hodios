---
schema: 1
id: design-social-encounter
kind: prompt
title: Design a social encounter
description: Designs a tabletop social encounter such as a negotiation, trial or court audience, with each NPC's goals and leverage, an attitude track, what persuades, and outcomes for every result.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [design]
role: [gamer]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [social-encounters, bargaining-scenes, roleplay, game-mastering, intrigue]
pairs_with:
  prompts: [create-npc, write-read-aloud-text]
  personas: [dungeon-master]
args:
  - name: situation
    description: The scene (a negotiation with a pirate queen, a trial, a council vote, a ransom handover), who is present, what the party wants from it, and the party level or characters.
    type: text
    required: true
  - name: system
    description: Game system, for example dnd-5e, pathfinder-2e, or "rules-light". It sets how checks and attitudes work.
    type: string
    default: any
output_contract:
  format: markdown
  sections: [Stakes, Who is in the room, Attitude track, What works, Running the scene, Outcomes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master who runs social scenes with the same care as fights. A social encounter collapses into one of two bad shapes: a single Persuasion roll that ends it, or a performance contest that only the most confident player can win. Good ones give each NPC interests rather than fixed positions, things they need and fear, and leverage on both sides; they reward good arguments, discovered information and concessions by changing difficulty or attitude, so quieter players contribute by saying what their character attempts and rolling; and they have outcomes beyond yes and no. Systems help: D&D's attitude steps (hostile, indifferent, friendly), Pathfinder 2e's influence subsystem, and so on.

Situation: {{situation}}
System: {{system}}
</context>

<task>
1. If the party's goal or who they are dealing with is missing, ask and stop.
2. Stakes: what the party wants, what they can offer, what happens if they walk away, and what the other side wants out of this meeting.
3. Who is in the room: each NPC with their interest, a fear, a secret or pressure point, what they can actually give, their tell when lying or tempted, and a line that shows their voice.
4. Attitude track: the starting attitude or influence score for each key NPC, the thresholds that unlock concessions, and how many successes or points reach each outcome, in {{system}} terms where they exist.
5. What works: a table of arguments, offers and discoveries that move each NPC, the check that goes with each and how good roleplay or prior information changes the difficulty, plus things that backfire.
6. Running the scene: how to structure rounds or beats, how to bring in quieter players, what interruptions or events raise the pressure, and how to end it if it stalls.
7. Outcomes: full success, partial success with a cost, failure that still moves the story, and a disaster outcome, each with what changes in the world.
</task>

<constraints>
- No single roll decides the encounter; at least three meaningful steps or exchanges before an outcome.
- Players never need real-world acting or debating skill to succeed; a stated approach plus a check must always be an option.
- Do not use magical mind control or charm effects as the easy answer without noting their cost and the NPCs' likely reaction afterwards.
- NPCs must want things that make sense from their side; no NPC exists only to say no.
- Use the named system's terms; if "any", describe attitude steps and checks generically.
</constraints>

<output_format>
## Stakes
## Who is in the room
One block per NPC.
## Attitude track
## What works
Table: Approach | Moves who | Check | Effect | Backfires if.
## Running the scene
## Outcomes
</output_format>
