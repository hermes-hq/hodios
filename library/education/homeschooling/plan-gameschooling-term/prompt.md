---
schema: 1
id: plan-gameschooling-term
kind: prompt
title: Plan a gameschooling term
description: Plans a term of gameschooling, learning maths, reading, logic and more through board, card and active games, with games matched to skills and ages, a weekly rhythm and how to notice progress.
category: homeschooling
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [gameschooling, board-games, card-games, number-sense, playful-learning]
pairs_with:
  prompts: [plan-homeschool-morning-time, plan-multi-age-homeschool-week]
args:
  - name: children
    description: "Children's ages and what each finds easy and hard."
    type: text
    required: true
  - name: skills
    description: "The skills you want games to practise."
    type: text
    required: true
  - name: have
    description: "Optional: games, cards, dice and materials you already own."
    type: text
output_contract:
  format: markdown
  sections: [Skills to games, The games, Rules to play today, Weekly rhythm, Talking during play, Noticing progress]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling families use games as a regular part of learning, often called gameschooling. Games give repeated, motivated practice: dice and card games for number sense and mental arithmetic, word games for spelling and vocabulary, strategy games for logic and planning, cooperative games for turn-taking and reasoning aloud, and geography or history games for knowledge. Experienced gameschoolers pick games for the skill they practise, play them often enough to get fluent, adapt rules (open hands, simpler scoring, a younger child as banker), and talk about thinking during play without turning the game into a lesson. Classic public-domain games and homemade versions with a deck of cards or dice cost little. Games supplement rather than replace direct teaching of new concepts.

Children: {{children}}
Skills to practise: {{skills}}
{{#have}}Games and materials you already have: {{have}}{{/have}}
</context>

<task>
1. Map each skill to game types that practise it, and say which skill each child needs most.
2. Choose games for the term: first from what the family already has, then classic card, dice and pencil games that need no purchase, then a short list of kinds of games to look for if buying. For each, give the skill, ages, and any rule changes to fit the younger players.
3. Give rules for two or three homemade or classic games in full, so the family can play them today.
4. Plan a weekly rhythm (for example a short daily game and a longer weekly game session) and which game goes where in the term.
5. Explain how the parent can nudge thinking during play (ask how they decided, count aloud, estimate) without spoiling it.
6. Give a light way to notice progress: what fluency looks like for each skill and a simple note per week.
</task>

<constraints>
- Do not invent commercial game names or claim facts about specific products; describe game types, or name only very widely known classics and flag that the family should check suitability.
- Match game complexity to each child's age and attention; adapt rather than exclude younger children.
- Games support, not replace, teaching of new concepts; say where direct teaching is still needed.
- Keep it fun: no forced play or punishments for losing.
</constraints>

<output_format>
## Skills to games
Table: Skill | Game types | Which child.
## The games
Table: Game | Skill | Ages | Rule changes.
## Rules to play today
## Weekly rhythm
## Talking during play
## Noticing progress
</output_format>
