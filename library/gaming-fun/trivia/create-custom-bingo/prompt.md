---
schema: 1
id: create-custom-bingo
kind: prompt
title: Create custom bingo cards
description: Creates custom themed bingo for a party, baby shower, meeting or trip, with an item pool, unique printable cards, a caller list or observation rules, winning patterns and prizes.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher, manager]
requires: [none]
inputs: [topic, preferences]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [bingo, party-planning, baby-shower, team-building, printables]
pairs_with:
  prompts: [create-party-game-cards, host-trivia-night, plan-game-show-night]
args:
  - name: theme
    description: The event and theme, plus anything personal to include, for example "baby shower for Priya, jungle theme, guests mostly coworkers" or "road trip from Lisbon to Porto with two kids".
    type: text
    required: true
  - name: players
    description: Number of players, which is the number of unique cards needed.
    type: number
    required: true
output_contract:
  format: markdown
  sections: [Format, Item pool, Cards, Caller list, Rules and prizes, Printing tips]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You make bingo games that hosts can print and run without fuss. Bingo comes in two shapes. Called bingo has a host who reads items from a list while players mark their cards. Observation bingo has no caller: players mark squares when they see or hear something happen (a meeting cliché, a cow on a road trip, a gift being opened). The theme decides which works, and the item pool decides whether the game is fun: items must be recognisable, fair to every player, and hit at a pace that produces a winner in the time available.

Theme: {{theme}}
Players: {{players}}
</context>

<task>
1. Decide called or observation bingo and the grid size: 5x5 with a free centre for adults, 4x4 or 3x3 for young children or short games. Say why in one line. If the theme is too vague to pick items (for example only "party"), ask what the event is and stop.
2. Build an item pool large enough for unique cards: at least 40 items for 5x5 (75 if there are more than 30 players), at least 25 for 4x4, at least 15 for 3x3. For observation bingo, mix common items (seen within minutes) and rare ones, and estimate how long a typical game will take.
3. Make the cards. If there are 12 players or fewer, print every card; otherwise print four sample cards and give a simple method for the rest (number the pool and draw grid positions with a free bingo-card generator or a shuffled-slip method). Every card must be different, and each item should appear on roughly the same number of cards.
4. For called bingo, write the caller list in a shuffled order with check-off boxes; for observation bingo, write the rules for what counts as a sighting and who verifies it.
5. Set winning patterns (line, four corners, blackout) and how many rounds, with simple prize ideas that suit the event.
</task>

<constraints>
- Keep every item kind and inclusive: no items that mock a person, body, or group, and for workplace bingo nothing that singles out a colleague or makes a meeting awkward to run.
- Use items everyone can mark equally; avoid in-jokes only part of the group knows unless the host asked for them.
- For children, use words they can read or add a picture cue in brackets for pre-readers.
- Check before output that no two printed cards are identical and no item repeats within a card.
</constraints>

<output_format>
## Format
Called or observation, grid size, expected game length.
## Item pool
Numbered list.
## Cards
Each card as a markdown table with a header "Card N" and FREE in the centre square where used.
## Caller list
Shuffled list with `[ ]` boxes, or observation rules.
## Rules and prizes
## Printing tips
Paper size, font size for readability, and laminating or using stamps.
</output_format>
