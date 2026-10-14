---
schema: 1
id: plan-achievement-hunt
kind: prompt
title: Plan an achievement hunt
description: Plans a full-completion or achievement hunt for a game, putting missables first, grouping grindy tasks, choosing playthrough order and estimating hours from the player's list.
category: video-games
version: 1.0.0
status: incubating
stage: [plan]
role: [gamer]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [achievements, trophy-hunting, completionist, missables, playthrough-order]
pairs_with:
  prompts: [plan-game-strategy, triage-entertainment-backlog]
args:
  - name: game
    description: The game, platform and version or edition (DLC included or not).
    type: string
    required: true
  - name: list
    description: The achievement or trophy list, or the ones still missing, pasted from the platform, with descriptions.
    type: text
    required: true
  - name: progress
    description: Where you are now (new game, mid-story, post-game) and any save files you have.
    type: text
    required: true
  - name: hours
    description: Hours per week you can play, and whether you would skip online or extreme ones.
    type: string
output_contract:
  format: markdown
  sections: [Triage, Missable now, Playthrough order, Grind plan, Hard and online ones]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan completion runs the way seasoned trophy hunters do. The cost of a bad plan is a second full playthrough because something was missable: tied to a story choice, a point of no return, a chapter, or a difficulty. Hunters triage first (missable, cumulative, skill-based, online, grind), stack cumulative counters onto normal play, decide early whether a difficulty achievement can be combined with the story run, and back up saves before points of no return where the platform allows. Online achievements can become impossible when servers shut down.

Game: {{game}}
List: {{list}}
Progress: {{progress}}
{{#hours}}Time and limits: {{hours}}{{/hours}}
</context>

<task>
1. Triage every item on the pasted list into: missable or point-of-no-return, story (automatic), cumulative or counter, collectible, skill or difficulty, online or multiplayer, and grind. Use the descriptions given; when you cannot tell whether something is missable, mark it "check" instead of guessing.
2. Missable now: given the current progress, what to do before moving forward, in story order where the description makes it clear.
3. Playthrough order: how many runs are needed, which achievements combine (difficulty with story, collectibles with chapter select), and where to keep backup saves.
4. Grind plan: group counters and collectibles into efficient sessions, with a rough hour estimate per group labelled as an estimate, fitted to the weekly time.
5. Hard and online ones: approach for skill achievements, whether to boost online achievements with friends where the game's rules allow, and a note on server shutdown risk.
6. Suggest the player cross-check missables against a trusted community guide, since lists do not always say what is missable.
</task>

<constraints>
- Do not invent achievement names, unlock conditions or chapter numbers; work from the pasted list and mark guesses.
- Do not suggest save editing, cheats or unlock tools that break the platform's rules.
- Hour estimates are estimates; say so.
</constraints>

<output_format>
## Triage
Table: Achievement | Type | Missable? | Notes.
## Missable now
Ordered checklist.
## Playthrough order
Numbered runs.
## Grind plan
Table: Session group | Achievements | Estimated hours.
## Hard and online ones
Bullets.
</output_format>
