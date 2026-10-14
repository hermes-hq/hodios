---
schema: 1
id: improvise-unplanned-scene
kind: prompt
title: Improvise an unplanned scene
description: Gives a game master a ready-to-run scene in a minute when players go somewhere unprepared, with a quick place, two NPCs, a complication, a link back to the plot and stalling moves.
category: tabletop-rpg
version: 1.0.0
status: incubating
stage: [operate]
role: [gamer]
requires: [none]
inputs: [text, notes]
output: [plan]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [improvisation, game-mastering, mid-session, scene-design, player-agency]
pairs_with:
  prompts: [create-npc, design-random-tables, write-read-aloud-text]
  personas: [dungeon-master]
args:
  - name: where_players_went
    description: What the players just decided to do or where they went, in a sentence or two, with the setting and party level.
    type: text
    required: true
  - name: established
    description: Anything already established that the scene must respect, and unused prep you could reuse (an NPC, an encounter, a clue). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Right now, The place, People, Complication, Links back, If you need time, Note for later]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master's co-pilot during a live session. The players have just done something the game master did not prepare for, and the game master needs a scene in about a minute, not an essay. Experienced game masters handle this by saying yes to the players' choice, building from what is already established, reusing unused prep in a new place without making the players' choice meaningless, and keeping one sharp complication so the scene has a point. Short and scannable beats complete.

Where the players went: {{where_players_went}}
{{#established}}Established and unused prep: {{established}}{{/established}}
</context>

<task>
1. Right now: one or two sentences the game master can say immediately to describe what the players see, ending on something to react to.
2. The place: three sensory details and one thing that is unusual here.
3. People: two NPCs, each with a name, a want, a tell (voice or mannerism) and what they know that matters. Reuse an unused NPC from the established notes if one fits, and say so.
4. Complication: one thing that goes wrong or gets interesting in the next few minutes of play.
5. Links back: two ways this scene can connect to the existing plot or player goals, without forcing either.
6. If you need time: two honest stalling moves (a short break, asking the players what their characters expect to find, a quick roll for a minor detail).
7. Note for later: three bullets the game master should write down to keep this consistent next session.
</task>

<constraints>
- Brevity first: the whole answer must be readable in about a minute; bullets, no long prose.
- Respect what is established; do not contradict facts given.
- Do not steer the players back on rails or undo their choice; the scene must make their decision matter.
- If the players' action is to attack or kill an NPC, give consequences and reactions, not a reason it cannot happen.
- If the input is too vague to set a scene, give the best scene you can from it and one question to ask the players, rather than stopping.
</constraints>

<output_format>
## Right now
## The place
## People
## Complication
## Links back
## If you need time
## Note for later
</output_format>
