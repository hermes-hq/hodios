---
schema: 1
id: design-video-game-puzzle
kind: prompt
title: Design a video game puzzle
description: Designs a video game puzzle from its mechanics - the insight it teaches, layout, intended solution, unintended breaks, a hint ladder and where it sits in a sequence.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text]
output: [plan, diagram, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [puzzle-design, aha-moment, environmental-puzzle, hint-system, sequence-design, mechanics]
pairs_with:
  prompts: [design-game-level, design-game-onboarding, plan-playtest-session]
args:
  - name: mechanics
    description: The verbs and objects the player has (push blocks, portals, rewind time, light beams, switches) and the exact rules of how they interact.
    type: text
    required: true
  - name: placement
    description: Where the puzzle sits - early tutorial, mid-game twist, optional challenge - and what the player has already learned.
    type: text
    required: true
  - name: game
    description: Genre and tone, for example "first-person puzzle game" or "puzzle rooms inside an action-adventure". Optional.
    type: string
output_contract:
  format: markdown
  sections: [The insight, Layout, Intended solution, Breaks and alternate solutions, Hints, Sequence fit, Playtest checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design puzzles for video games. A good puzzle is built around one insight about the rules: a thing the player did not realise the mechanics allow, which they discover and then feel clever about. Experienced designers start from that insight and then remove everything that does not serve it, so the room is as small as possible and the solution is not reachable by trial and error. They check the puzzle against the mechanics exhaustively, because players will find unintended solutions; some are fine, others skip the insight. Puzzles sit in sequences: introduce a mechanic safely, develop it, then twist it by combining it with another mechanic. Hints help stuck players without spoiling the moment.

Mechanics:
{{mechanics}}

Placement:
{{placement}}
{{#game}}

Game: {{game}}
{{/game}}
</context>

<task>
1. State the insight the puzzle teaches or tests in one sentence, and what the player must already know.
2. Describe the layout as a text grid or labelled diagram, listing every object and its starting state; keep only what the insight needs plus at most one purposeful red herring.
3. Write the intended solution step by step and explain the moment of insight.
4. Search for breaks: try to solve it without the insight using the stated rules (sequence breaks, brute force, unintended physics or rule interactions, softlocks). Say which alternate solutions are acceptable and how to block the rest.
5. Write a three-level hint system: a nudge toward the right area, a hint about the rule, then the step, with when each becomes available.
6. Show where it fits in a sequence: the simpler puzzle before it that teaches the parts, and a harder twist after it.
7. Give a playtest checklist: what to watch for, time-to-solve targets, and signs the insight is unclear or the solution is found by accident.
</task>

<constraints>
- Use only the mechanics stated; if the rules are ambiguous, list the assumption made and how the design changes if it is wrong.
- Avoid puzzles that require reading the designer's mind, pixel hunting, or precise timing unless timing is the stated mechanic.
- Do not copy puzzles from published games; inspiration from a genre convention is fine.
- Mark solve-time targets as goals to verify in playtests.
</constraints>

<output_format>
## The insight
## Layout
Text grid or diagram, then the object list.
## Intended solution
## Breaks and alternate solutions
## Hints
## Sequence fit
## Playtest checklist
</output_format>
