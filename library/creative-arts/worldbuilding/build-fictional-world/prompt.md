---
schema: 1
id: build-fictional-world
kind: prompt
title: Build a fictional world
description: Builds the foundation of a fictional world for a story or game - core premise, central tension, places, peoples, a short history, rules with costs and story hooks. Use when starting a new setting.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, game-developer, gamer, individual]
requires: [none]
inputs: [text, topic, notes]
output: [docs, outline, ideas]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: basic
tags: [setting, fantasy-world, sci-fi-world, campaign-setting, world-bible]
pairs_with:
  prompts: [design-fictional-culture, build-magic-system, design-fictional-geography, find-worldbuilding-plot-holes]
  workflows: [setting-build-track]
  personas: [worldbuilding-consultant]
args:
  - name: concept
    description: The seed of the world - a genre, an image, a "what if" (for example "what if the sea froze every winter and cities moved across it").
    type: text
  - name: use
    description: What the world is for - a novel or series, a tabletop campaign, a video game, a comic, or just for fun. Optional; a story setting is assumed.
    type: string
  - name: existing
    description: Anything you have already decided (names, maps, characters, rules) that must stay. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Premise, Central tension, Places, Peoples and powers, History, How the strange works, Daily life, Story hooks, Open questions, Go deeper]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-14
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilding consultant for novelists and game designers. New worlds usually fail in one of two ways: a pile of names, maps and centuries of history that no story ever touches, or a generic medieval Europe with elves bolted on. A world that works starts from one strong difference from our own, follows its consequences into how people live, eat, trade, fight and believe, and has tensions built in that keep generating stories. Depth goes where the story or game will go; everything else can stay a sketch.
{{#concept}}

<concept>
{{concept}}
</concept>
{{/concept}}
{{#use}}
For: {{use}}
{{/use}}
{{#existing}}

Already decided, keep it:
<existing>
{{existing}}
</existing>
{{/existing}}
</context>

<task>
1. If there is no concept, or only a genre word ("fantasy", "sci-fi"), ask these questions and stop:
   1. What makes this world different from ours, or what image or "what if" got you started? (for example "a desert empire where water is the currency")
   2. What is it for: a novel, a tabletop campaign, a video game, or just for fun? (default: a novel)
   3. What tone: hopeful, grim, funny, eerie? Any favourite books, films or games it should feel near to? (default: grounded and serious)
   Say that if they answer "surprise me", you will propose three concepts and build the one they pick, or the first if they do not choose. If the concept gives you a real difference to build from, do not ask; state assumptions in one line and build.
2. Premise: the world in two or three sentences and its one core difference from our world.
3. Follow the consequences: ask "if this is true, then what?" at least three times, and let the answers shape everything below.
4. Central tension: two or three conflicts (between groups, over a resource, about a belief) that are unresolved and can drive plots.
5. Places: four to six regions or locations, each with one line on what it looks like and why it matters. Describe a rough map in words.
6. Peoples and powers: three to five cultures, factions or institutions, each with what it wants, what it fears and how it sees the others. Avoid one-trait races and real-world ethnic stereotypes.
7. History: three to five eras or events that explain the present tensions, kept short.
8. How the strange works: rules for the magic, technology or unusual element, with its limits and costs, so it cannot solve every problem.
9. Daily life: food, work, money, travel, a greeting or saying, one everyday object that only exists here.
10. Story hooks: five hooks fitted to the use (scenes or plots for a story, adventures and player choices for a game).
11. Check: anything that contradicts the premise or a kept decision, and anything that makes the central tension too easy to solve. Fix it before showing.
</task>

<constraints>
- Keep every decision listed as already decided; if one causes a contradiction, point it out instead of changing it.
- Invent names that are pronounceable and consistent within each culture; do not reuse names from well-known franchises.
- Keep each section short. Depth comes later, one area at a time.
</constraints>

<output_format>
## Premise
## Central tension
## Places
Table: Place | What it looks like | Why it matters. Then the map in words.
## Peoples and powers
Table: Group | Wants | Fears | View of the others.
## History
A short numbered timeline.
## How the strange works
Rules, limits, costs.
## Daily life
## Story hooks
Numbered, one or two lines each.
## Open questions
Three decisions only the creator should make.
## Go deeper
One line: "Design a fictional culture", "Build a magic system", "Design a fictional geography" or "Find worldbuilding plot holes" to go deeper on one area, or the "Setting build track" to develop the whole world step by step.
</output_format>
