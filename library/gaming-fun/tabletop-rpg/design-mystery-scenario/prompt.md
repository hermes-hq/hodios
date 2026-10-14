---
schema: 1
id: design-mystery-scenario
kind: prompt
title: Design a mystery scenario
description: Designs an investigation scenario for a tabletop group with the hidden truth, clue nodes that each have at least three clues, suspects, a proactive antagonist and a fair finale.
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
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [investigation, clue-design, node-based-design, game-mastering, adventure-design]
pairs_with:
  prompts: [create-npc, create-player-handouts, design-one-shot-adventure]
  personas: [dungeon-master]
args:
  - name: premise
    description: The crime or mystery, the setting and tone, the party level or character types, and anything already fixed (a culprit, a location, a hook).
    type: text
    required: true
  - name: system
    description: Game system, for example dnd-5e, call-of-cthulhu-7e, gumshoe, or "rules-light". It changes how clue-finding rolls work.
    type: string
    default: rules-light
  - name: length
    description: How long the investigation should run, for example "one 4-hour session" or "three sessions".
    type: string
    default: one session
output_contract:
  format: markdown
  sections: [The truth, Revelations, Nodes, Clue map, Suspects, Proactive events, Finale, Running notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a game master who writes investigation scenarios that do not dead-end. A mystery written like a novel, with one clue leading to the next, fails at the table because players miss clues, misread them or go somewhere unexpected. Investigation designers solve this with a few habits: list the conclusions the players must reach, give every necessary conclusion at least three clues; organise the scenario as nodes (places, people, events) the players can visit in any order, with each node pointing to several others; never hide a core clue behind a failed roll (a roll decides extra detail or cost, not whether the story continues); and give the opposition its own moves, so stuck players get a new lead because something happens to them.

Premise: {{premise}}
System: {{system}}
Length: {{length}}
</context>

<task>
1. If the premise has no crime or question to answer, ask and stop. Otherwise list your assumptions briefly.
2. The truth: what really happened, in order, with who, why and how, written for the game master only.
3. Revelations: the three to six conclusions the players must reach to solve it, each one a sentence.
4. Nodes: five to nine nodes sized to the length given (locations, people, organisations, events), each with a short description, what is there, and which other nodes it points to.
5. Clue map: for every revelation, at least three clues in different nodes, marking which are core (found by anyone who looks) and which are bonus (found with a check, for extra advantage or detail).
6. Suspects: two to four suspects including the culprit, each with motive, alibi, what they hide even if innocent, and how they behave when questioned.
7. Proactive events: three or four things the antagonist or the situation does if the investigation stalls or gets close, each delivering a new lead.
8. Finale: how the players can confront or prove the truth, several ways it can go, and what happens if they accuse the wrong person.
9. Running notes: a one-line reminder of each revelation, how to handle clue rolls in {{system}}, and how to summarise the clues found so far if the players get lost.
</task>

<constraints>
- Every revelation must have at least three clues; check this in the clue map before finishing.
- No core clue may depend on a single successful roll or on players asking one exact question.
- The solution must be fair: all clues needed to solve it must be findable in play, and red herrings must be explainable once the truth is known.
- Keep nodes terse and usable at the table; no prose chapters.
- Original names and content; avoid stereotypes based on real-world groups for culprits or suspects.
</constraints>

<output_format>
## The truth
## Revelations
Numbered list.
## Nodes
For each node: name, what is there, leads to.
## Clue map
Table: Revelation | Clue | Node | Core or bonus.
## Suspects
## Proactive events
## Finale
## Running notes
</output_format>
