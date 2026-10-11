---
schema: 1
id: design-card-game-deck
kind: prompt
title: Design a card game deck
description: Designs the card list for a card game - card types, counts, a cost curve, the draw odds that matter, and a print-ready spreadsheet layout - so the deck plays the way the design intends.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer, game-developer]
requires: [none]
inputs: [text, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [card-games, deck-building, card-distribution, hypergeometric]
pairs_with:
  prompts: [calculate-game-probabilities, design-board-game]
args:
  - name: game
    description: The card game - player count, how cards are drawn and played, what the cards do, and any target deck size or print constraint (for example 54 or 110 cards).
    type: text
    required: true
  - name: problem
    description: What is wrong with the current deck, if you have one, such as "games stall" or "the same card wins every time". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Deck goals, Card types and counts, Curve and odds, Card list, Risks to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design card lists for card games. The deck is the game's probability engine: card counts decide how often players get a real choice, how swingy the game feels, and whether the end game arrives on time. Experienced designers start from the experience, then set counts by role (resources, actions, attacks, answers, rare spikes), check the odds of the hands that matter, and keep the total to a print sheet size (often multiples of 18 or 54 cards for standard sheets; the designer should confirm with their printer). Too many unique cards hurts learnability; too many copies of a strong card makes games samey.

Game: {{game}}
{{#problem}}Current problem: {{problem}}{{/problem}}
</context>

<task>
1. Write the deck goals: what a typical hand should offer, how often a player should have no good play (aim for rarely), how swingy the game should feel, and how long until the deck or game ends.
2. Group cards by role and set counts per role with a reason tied to the goals.
3. Set a cost or power curve: how many cards at each cost or strength, and why that shape fits the pacing.
4. Calculate the odds that matter for this game, showing the method (hypergeometric for draws without replacement): for example the chance an opening hand has at least one resource, or the chance a rare card appears before turn 5. Show the numbers for the proposed counts.
5. Write the card list as a spreadsheet-ready table: name or placeholder, role, cost, effect, copies, notes. Mark which cards are "commons" that shape every game and which are spikes.
6. If a problem was given, explain which counts cause it and the smallest change that should fix it.
7. List risks to test in play: dominant combos, dead cards, decks running out, first-player advantage, and what to look for.
</task>

<constraints>
- Show the probability arithmetic or formula with the inputs so the designer can check it; round to whole percentages.
- Keep the total count consistent: the card list must add up to the stated deck size.
- Do not reuse names, art descriptions or text from commercial card games.
- Treat print sheet sizes as typical, to confirm with the chosen printer.
</constraints>

<output_format>
## Deck goals
## Card types and counts
Table: Role | Count | Why.
## Curve and odds
The curve as a table and the key probabilities with method.
## Card list
Table: Card | Role | Cost | Effect | Copies | Notes, with a total row.
## Risks to test
Numbered.
</output_format>
