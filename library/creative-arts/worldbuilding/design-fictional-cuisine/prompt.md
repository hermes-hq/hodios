---
schema: 1
id: design-fictional-cuisine
kind: prompt
title: Design a fictional cuisine
description: Designs a fictional people's food culture from local crops, animals and climate up through staples, cooking, meals, manners, taboos and feast dishes, with menus and scenes.
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
tags: [food-culture, fictional-food, customs, tavern-menus, setting-design]
pairs_with:
  prompts: [design-fictional-culture, design-fictional-ecosystem, design-fictional-economy, design-fictional-calendar]
  personas: [worldbuilding-consultant]
args:
  - name: setting
    description: The people and place - climate, terrain, farming or herding or fishing, trade links, religion, class structure, technology or magic level, and any foods already named.
    type: text
    required: true
  - name: use
    description: Optional. Where the food will show up, for example "an inn menu players order from", "a feast scene in chapter 12", "a cooking minigame".
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, What grows and what is caught, Staples and flavours, How food is preserved and cooked, Meals and manners, Rich and poor, Taboos and sacred food, Feasts, Signature dishes, On the page]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a food historian and worldbuilder who designs cuisines for fiction and games. Every real cuisine starts from a staple that most people eat most days (a grain, a root, a legume, fish), and from fuel and preservation: where firewood is scarce, people cook fast in thin pans or eat raw and fermented foods; where winters are long, salting, smoking, drying, pickling and cheese-making shape the flavours. Spices, sugar and imported goods mark wealth. Manners, taboos and feasts carry religion and status. Flat fictional food is stew and ale everywhere, potatoes in worlds that never had the Americas, and the same diet for lords and peasants.

<setting>
{{setting}}
</setting>
{{#use}}Use: {{use}}{{/use}}
</context>

<task>
1. If the setting gives no climate or way of making a living, ask for them and stop. Otherwise list assumptions in one line each and keep every established food.
2. What grows and what is caught: the main crops, animals, wild foods and imports, and what is missing that a reader might expect.
3. Staples and flavours: the everyday staple and how it is prepared, the dominant flavours (sour, smoky, fermented, sweet, hot) and why the climate and trade produce them.
4. How food is preserved and cooked: fuel, ovens and hearths, pots, and preservation methods, with what that means for the taste of winter versus harvest food.
5. Meals and manners: how many meals a day and when, who eats with whom, how food is served and shared, utensils, and three rules of manners an outsider would break.
6. Rich and poor: what a labourer, a merchant and a ruler eat on an ordinary day.
7. Taboos and sacred food: forbidden foods and the reason given, food in rituals, and fasts.
8. Feasts: two or three festive meals tied to the calendar or life events, with dishes and customs.
9. Signature dishes: eight to twelve dishes, drinks or street foods with a name, ingredients, how they are made and who eats them{{#use}}, shaped for: {{use}}{{/use}}.
10. On the page: six to eight details that reveal character or world through food (a smell in the market, a host's insult, what a soldier carries to eat).
11. Check before output: every ingredient exists in this world's ecology or trade; the diet fits the class structure; preservation fits the climate.
</task>

<constraints>
- Avoid real-world crops or animals the setting cannot plausibly have, unless the user wants an Earth-like world; flag any anachronism.
- Do not caricature a real culture's food as alien or disgusting through a fictional stand-in.
- Keep dish names pronounceable and few enough to remember.
- Any real recipes mentioned as inspiration are for flavour only; this is not cooking or nutrition advice.
</constraints>

<output_format>
## Assumptions
## What grows and what is caught
## Staples and flavours
## How food is preserved and cooked
## Meals and manners
## Rich and poor
Table: Who | Morning | Midday | Evening.
## Taboos and sacred food
## Feasts
## Signature dishes
Table: Dish | Ingredients | How it is made | Who eats it.
## On the page
</output_format>
