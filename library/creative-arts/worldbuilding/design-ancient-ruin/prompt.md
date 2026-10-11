---
schema: 1
id: design-ancient-ruin
kind: prompt
title: Design an ancient ruin
description: Designs the history of a ruined site, covering who built it and why, how it fell, who reused it since, what survives, what locals misremember and what explorers can discover layer by layer.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ruins, lost-civilisations, environmental-storytelling, archaeology, setting-design]
pairs_with:
  prompts: [build-world-timeline, write-in-world-document, design-fictional-writing-system, design-fictional-religion]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The world and the site - where it is, the present-day people near it, what the story already says about the builders, and the technology or magic level then and now.
    type: text
    required: true
  - name: use
    description: Optional. How the ruin will be used, for example "a level designed for environmental storytelling", "the climax location of a novel", "a tabletop site the players explore". Room-by-room dungeon keys are out of scope; this is the site's history and meaning.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, The builders, What it was for, How it fell, Layers of reuse, What survives, What people believe, What explorers find, Story uses]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a worldbuilder with an archaeologist's eye who designs ruins as layered history. Real ruins are rarely untouched: they are quarried for stone, reused as forts, shrines, homes or rubbish heaps, buried by floods and dunes, and reinterpreted by every later people, who usually get the builders wrong. What survives depends on materials (stone and fired clay last; wood, cloth and paper rarely do), and what is found depends on where people threw things away, hid things or died. Flat fictional ruins are perfectly preserved temples full of traps, with an obvious single story and no one living nearby who has an opinion about them.

<setting>
{{setting}}
</setting>
{{#use}}Use: {{use}}{{/use}}
</context>

<task>
1. If the setting gives no location or present-day context for the site, ask for it and stop. Otherwise list assumptions in one line each and keep every established fact about the builders.
2. The builders: who they were, what they valued, their technology or magic, and how much later people actually know about them.
3. What it was for: the site's original purpose and the clues to it in layout, orientation and materials. Allow for a purpose later people misunderstand.
4. How it fell: the real causes (war, drought, shifting river, collapse of trade, a magical event, slow abandonment), with signs of each still visible.
5. Layers of reuse: two to four later occupations or uses, each leaving changes (walls rebuilt, symbols defaced, graves dug in, stone taken away).
6. What survives: which materials and objects lasted and why, what was looted, and what is buried or flooded.
7. What people believe: local legends, scholarly theories and religious claims about the site, and how each is wrong or partly right.
8. What explorers find: eight to twelve discoveries in order from surface to deepest layer, each revealing something about one period, so the truth emerges piece by piece{{#use}}, shaped for: {{use}}{{/use}}.
9. Story uses: five to seven conflicts or hooks (ownership disputes, sacred claims, collectors, a dangerous truth about the builders).
10. Check before output: preservation fits materials and climate; every layer leaves physical evidence; the truth differs from at least one popular belief.
</task>

<constraints>
- Do not copy real archaeological sites with names changed, or present real sites' contested histories as settled.
- Avoid the "lost white civilisation" and similar tropes that erase the real builders of ruins; if builders are mysterious, keep their mystery respectful.
- Keep the focus on history and meaning; leave room-by-room traps and monsters to a dungeon-design prompt.
</constraints>

<output_format>
## Assumptions
## The builders
## What it was for
## How it fell
## Layers of reuse
Table: Period | Who | What they changed.
## What survives
## What people believe
## What explorers find
Numbered, surface to deepest.
## Story uses
</output_format>
