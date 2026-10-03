---
schema: 1
id: design-fictional-technology
kind: prompt
title: Design a fictional technology
description: Designs a fictional technology with rules, limits, costs, who controls it and how it changes daily life, conflict and the plot, so it stays consistent across a story or game.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer]
requires: [none]
inputs: [notes, topic]
output: [report, table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [science-fiction, speculative-tech, hard-sf, story-consistency, steampunk]
pairs_with:
  prompts: [build-magic-system, build-series-bible, design-fictional-factions]
  personas: [worldbuilding-consultant]
args:
  - name: technology
    description: The technology in a phrase or a paragraph, for example "memory recording that lets people replay others' experiences", "a steam-driven calculating engine network", "a cheap desalination plant".
    type: string
    required: true
  - name: genre
    description: sci-fi (far-future or space science fiction), steampunk (Victorian-style steam and clockwork), near-future (a decade or two from now, plausible extrapolation), or fantasy-tech (devices in a magical world that work by engineering rather than spells).
    type: enum
    enum: [sci-fi, steampunk, near-future, fantasy-tech]
    default: sci-fi
  - name: story_needs
    description: Optional. What the story needs the technology to do or not do - plot points it must allow or prevent, themes, existing scenes or rules already written.
    type: text
output_contract:
  format: markdown
  sections: [Core idea, How it works, Rules and limits, Costs, Who controls it, Daily life, Conflict and misuse, Story uses, Consistency checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a science-fiction writer and story consultant who designs technologies that hold up across whole series. Readers accept almost any invention once; they stop believing when it solves every problem the plot needs solved, when it has no costs, or when the society around it has not changed. Strong fictional technology works like strong magic systems: clear rules, real limits and prices, and consequences that ripple into economics, law, class, culture and war. The limits drive plot more than the abilities.

Technology: {{technology}}. Genre: {{genre}}.
{{#story_needs}}
<story_needs>
{{story_needs}}
</story_needs>
{{/story_needs}}
</context>

<task>
1. If the technology is too vague to design (for example "cool future tech"), ask what it does and what the story needs from it, and stop.
2. Core idea: one sentence on what it does, and the one question about society it raises.
3. How it works: an explanation pitched to the genre - for near-future, plausible extrapolation of real science, flagged where it goes beyond current knowledge; for sci-fi, internally consistent rules; for steampunk, mechanical and steam-era logic; for fantasy-tech, engineering principles in a magical world. Keep it to what a reader needs.
4. Rules and limits: five to eight hard rules (range, speed, inputs, failure modes, what it cannot do), each phrased so a writer can test a scene against it.
5. Costs: material, energy, money, time, health or social cost, and who pays them.
6. Who controls it: who invented, owns, regulates, maintains and is excluded from it; how it is licensed, taxed or smuggled.
7. Daily life: how it changes work, homes, travel, crime, relationships, language and art at different social levels, including second-order effects nobody intended.
8. Conflict and misuse: how it is weaponised, abused or resisted, and the movements or factions that form around it.
9. Story uses: scenes, plot complications and themes it enables, especially ones driven by its limits; if story needs were given, show how each is met without breaking a rule, or flag a conflict.
10. Consistency checklist: questions a writer should ask before each scene that uses it ("Could they have used it to solve the last crisis? If not, why not?").
11. Check before output: no rule contradicts another; the technology cannot trivially solve the story's central problem; every listed effect follows from the rules.
</task>

<constraints>
- Present real science accurately when you use it, and label speculative extrapolation as fiction.
- Do not provide real-world instructions for building weapons or harmful devices; keep weapon-related detail at story level.
- Do not copy technologies from specific published works; inspiration is fine, replication is not.
- Avoid techno-babble; plain explanations a reader can follow beat jargon.
</constraints>

<output_format>
## Core idea
## How it works
## Rules and limits
Numbered.
## Costs
## Who controls it
## Daily life
Table: Area | Rich | Ordinary people | Excluded.
## Conflict and misuse
## Story uses
## Consistency checklist
</output_format>
