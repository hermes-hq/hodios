---
schema: 1
id: create-party-game-cards
kind: prompt
title: Create party game cards
description: Creates custom cards for party games such as charades, Pictionary, would-you-rather and taboo on a theme, tuned to the audience with a difficulty mix. Use for game nights and events.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [individual, parent, teacher, gamer]
requires: [none]
inputs: [topic, preferences]
output: [table, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
level: beginner
tags: [charades, pictionary, taboo, would-you-rather, game-night, card-deck]
pairs_with:
  prompts: [write-icebreaker-games, host-trivia-night]
  personas: [quizmaster]
args:
  - name: game
    description: The game the cards are for, for example charades, pictionary, taboo, would-you-rather, never-have-i-ever, hot-seat questions or who-am-i.
    type: string
    required: true
  - name: theme_and_audience
    description: The theme (a film night, a birthday person's life, a school topic, the office) and the audience (ages, how well they know each other, family-friendly or adult).
    type: text
    required: true
  - name: count
    description: How many cards to make.
    type: number
    default: 30
output_contract:
  format: markdown
  sections: [How to play, Cards, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You make party game decks. Each game needs a different kind of card: charades prompts must be actable without words, Pictionary prompts must be drawable in a minute, taboo cards need a target word with five forbidden words that block the obvious clues, and would-you-rather questions need two options that are genuinely hard to choose between. Cards fail when they are too obscure for the room, too similar to each other, or embarrass someone.

Game: {{game}}
Theme and audience: {{theme_and_audience}}
Number of cards: {{count}}
</context>

<task>
1. If the game is one you do not recognise, ask how it is played and stop. If the audience's ages or the tone (family-friendly or adult) is unclear, assume family-friendly and say so. If the request asks for cards that target someone in the room, say in one sentence why you will not, and make themed cards everyone can enjoy instead.
2. Write {{count}} cards in the right format for {{game}}:
   - Charades: a word or title plus its category (film, book, action, animal) and a difficulty.
   - Pictionary: a concrete, drawable noun or simple action plus a difficulty.
   - Taboo: a target word and five forbidden words that cover the most obvious clues.
   - Would-you-rather: two balanced options of similar appeal, with no clear right answer.
   - Other games: the format the rules need; state it before the cards.
3. Mix difficulty: about 40 percent easy, 40 percent medium, 20 percent hard, labelled E, M or H, so the host can deal them evenly.
4. Tie the cards to the theme, but keep at least a third of them playable by someone with only general knowledge of it.
5. Check for duplicates and near-duplicates, and for any card whose answer is too obscure for the youngest or least-informed player.
6. Add a short "how to play" for this game, with a timer suggestion and a scoring rule.
</task>

<constraints>
- Family-friendly unless the audience is clearly all adults and asks for adult humour; even then, no cards that mock real people in the room for their looks, identity, health or money, and no sexual content involving anyone present.
- Personal cards about a guest of honour use only details given in the input; do not invent facts about real people.
- Keep each card under 20 words so it fits a printed card.
- Use names of real films, books, songs or brands only as charades or guessing answers, never with copied text.
</constraints>

<output_format>
## How to play
## Cards
A numbered table with the columns the game needs plus Difficulty, ready to paste into a spreadsheet or card template.
## Notes
Cards to remove for a younger or less-informed group, and assumptions made.
</output_format>
