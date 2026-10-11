---
schema: 1
id: design-fictional-heraldry
kind: prompt
title: Design fictional heraldry
description: Designs coats of arms, banners, sigils and mottos for fictional houses, orders or nations, with the setting's heraldic rules, descriptions an artist can draw, and each symbol's history.
category: worldbuilding
version: 1.0.0
status: incubating
stage: [design]
role: [writer, gamer, game-developer, artist]
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
tags: [coats-of-arms, sigils, banners, noble-houses, setting-design]
pairs_with:
  prompts: [design-fictional-dynasty, design-fictional-factions, design-fictional-writing-system, design-fictional-government]
  personas: [worldbuilding-consultant]
args:
  - name: bearers
    description: Who needs arms or symbols - the houses, orders, cities or nations, with a line on each (history, values, wealth, rivals) and the setting's culture and era.
    type: text
    required: true
  - name: style
    description: Optional. The visual tradition to follow or avoid, for example "European-style blazon rules", "not European at all - more like seals and banners", "corporate logos in a cyberpunk city".
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, The heraldic tradition, Arms and symbols, How symbols change, Conflicts and claims, For the artist, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a heraldry designer and worldbuilder. Real heraldic systems exist because symbols had to be recognised at a distance (on a battlefield, a seal, a ship) and claimed by the right person, so they follow rules: a small palette of contrasting colours, bold simple charges, and ways to show inheritance, marriage, rank and bastardy (differencing marks, quartering, borders). Symbols also carry history and puns (canting arms that play on the family name), and disputes over who may bear a device can be political. Many cultures used other systems: seals, mon, totems, tamgas, standards. Flat fictional heraldry gives every house a different animal, ignores contrast and inheritance, and has no politics.

<bearers>
{{bearers}}
</bearers>
{{#style}}Visual tradition: {{style}}{{/style}}
</context>

<task>
1. If no bearers are described, ask who needs symbols and in what setting, and stop. Otherwise list assumptions in one line each.
2. The heraldic tradition: decide the system that fits the culture{{#style}} and the requested tradition ({{style}}){{/style}}: what objects carry symbols, the colour palette and contrast rule, how symbols are granted or claimed, and who regulates them.
3. Arms and symbols: for each bearer, a plain-language description of the design (field, colours, main charge, layout), a formal blazon if the tradition uses one, a motto or war cry if it fits, and the story behind each element (an ancestor's deed, a pun on the name, a conquered emblem).
4. How symbols change: the rules for heirs, younger children, marriages, illegitimate lines, disgrace and extinct houses, with one worked example from the bearers given.
5. Conflicts and claims: two or three disputes over symbols (a usurped device, a forbidden colour, two houses with near-identical arms, a defaced banner) that can drive plot.
6. For the artist: a short style sheet with colour names and suggested hex values, proportions, and what to keep consistent across shields, flags, seals and uniforms.
7. On the page: six to eight ways the symbols show up in scenes (a seal on a letter, a tavern sign, a soldier's tabard, a scratched-out crest).
8. Check before output: designs are distinguishable at a distance and from each other; colours respect the contrast rule; each element has a reason.
</task>

<constraints>
- Do not reproduce real families', nations' or organisations' arms or trademarks, or arms from existing fiction.
- Avoid real hate symbols and symbols with strong modern political meaning, even as decoration.
- If you use real blazon terms, define each the first time.
- Describe designs in words; do not claim to have produced images.
</constraints>

<output_format>
## Assumptions
## The heraldic tradition
## Arms and symbols
`### Bearer name` for each, with Description, Blazon (if used), Motto, Story.
## How symbols change
## Conflicts and claims
## For the artist
## On the page
</output_format>
