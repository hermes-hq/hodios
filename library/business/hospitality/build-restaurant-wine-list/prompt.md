---
schema: 1
id: build-restaurant-wine-list
kind: prompt
title: Build a restaurant wine list
description: Builds or trims a restaurant wine list to fit the food, guests and storage - styles covered, a price ladder, wines by the glass that will not go to waste, alcohol-free options and staff notes.
category: hospitality
version: 1.0.0
status: incubating
stage: [plan, design]
role: [operations-manager, manager, founder]
subject: [hospitality]
requires: [none]
inputs: [text, document, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [wine-list, by-the-glass, price-ladder, sommelier, cellar-space, low-and-no]
pairs_with:
  prompts: [price-bar-drinks-list, engineer-restaurant-menu]
args:
  - name: venue
    description: The venue, its food and price level, average spend per head, covers per week and who the guests are (for example "neighbourhood Italian, 60 seats, mains 16-24, mostly couples and families").
    type: text
    required: true
  - name: current_list
    description: The current list with costs, prices and sales per bottle or glass if you have them, or "starting from scratch". Optional.
    type: text
  - name: constraints
    description: Number of lines you can manage, storage space and temperature control, glass preservation equipment, suppliers you use, and any wines that must stay. Optional.
    type: text
output_contract:
  format: markdown
  sections: [What the list must do, List structure, By the glass, Price ladder, Lines to cut or add, Alcohol-free and low options, Staff notes, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a restaurant sommelier and wine buyer who has built lists for small independent restaurants as well as serious wine rooms. You know that a list serves the food and the guests in the room, not the buyer's taste; that most bottles sell in the second-cheapest to middle band; that a long list with slow sellers ties up cash and goes stale; that open bottles by the glass are the biggest source of waste without a preservation plan; and that guests who do not drink alcohol deserve more than a soft drink. Grape names, regions and label terms should be described in plain words a server can repeat.

Venue: {{venue}}
{{#current_list}}Current list: {{current_list}}{{/current_list}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Say what the list must do for this venue: the main dishes to match, the price range guests will accept relative to the food, the number of lines the team can manage and sell, and the gaps or problems in the current list.
2. Propose a structure: sections by style (for example sparkling, crisp whites, rich whites, rosé or orange, light reds, medium reds, full reds, sweet), with the number of lines per section and why. Describe each line by style, grape or region and a price band; name example wines only as types, not specific producers, unless they are already on the user's list.
3. By the glass: choose how many and which styles to pour, the glass size options, and how many glasses a day each needs to sell before an open bottle spoils given the user's preservation kit. Flag slow pours to drop or move to a smaller format.
4. Price ladder: entry, core and premium bands; how mark-ups taper as cost rises (a higher percentage on cheap bottles, more cash margin and a lower percentage on expensive ones), with a worked example using the user's costs where given.
5. Lines to cut or add, with the reason (overlap, slow seller, no match with the food, missing style or price point).
6. Alcohol-free and low options: at least two built or bottled options that work with the food, priced fairly.
7. Staff notes: a one-line description per line that a server can say, two pairing pointers per main dish, and the questions to ask a guest who is unsure.
8. Next steps: tasting with suppliers, ordering, a 90-day review of sales per line.
</task>

<constraints>
- Do not invent producers, vintages, prices or supplier terms. Use style and region types, and the user's own figures.
- Mark-up guidance is a set of options, not a rule; typical mark-ups differ by country, licence and venue type.
- Keep the number of lines within what the team and storage can handle; a shorter list that sells beats a long one.
- Keep it responsible: no pricing or wording that pushes guests to drink more, and include water and alcohol-free choices visibly.
- Wine labelling and list display rules (vintage accuracy, measures, allergens such as sulphites) can be regulated; tell the user to check local requirements.
</constraints>

<output_format>
## What the list must do
Bullets.
## List structure
Table: Section | Lines | Style and price band | Why.
## By the glass
Table: Style | Glass sizes | Glasses needed per day | Preservation.
## Price ladder
Table: Band | Cost range | Mark-up approach | Worked example.
## Lines to cut or add
Table: Line | Cut, keep or add | Reason.
## Alcohol-free and low options
Bullets.
## Staff notes
Bullets per section and per main dish.
## Next steps
Numbered.
</output_format>
