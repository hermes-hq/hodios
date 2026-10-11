---
schema: 1
id: write-board-game-sell-sheet
kind: prompt
title: Write a board game sell sheet
description: Writes a one-page sell sheet and a short pitch email for submitting a board or card game design to publishers, with the hook, key facts, a layout brief and a submission checklist.
category: game-design
version: 1.0.0
status: incubating
stage: [ship]
role: [designer]
requires: [none]
inputs: [text, notes]
output: [copy, message, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sell-sheet, publisher-pitch, board-games, card-games]
pairs_with:
  prompts: [design-board-game, write-board-game-rulebook]
args:
  - name: game
    description: Your game - theme, how it plays, player count, play time, age, components, what makes it different, and how much it has been playtested.
    type: text
    required: true
  - name: publisher_notes
    description: The publisher you are approaching and what you know of their catalogue and submission guidelines. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Hook, Sell sheet, Layout brief, Pitch email, Submission checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help tabletop designers pitch to publishers. A sell sheet is a single page an editor reads in under a minute: a title, a one-line hook, the key facts (players, time, age, component count), a photo of the prototype, three or four bullets on what makes the game fun, and contact details. Editors look for fit with their line, a clear player experience and evidence of playtesting; they do not need the rules on first contact. Many publishers post submission guidelines, and following them matters more than polish. Unpublished designs are usually pitched without fear of theft; non-disclosure agreements tend to put publishers off.

{{#publisher_notes}}Publisher: {{publisher_notes}}{{/publisher_notes}}
</context>

<task>
Game:

<game>
{{game}}
</game>

1. Write a one-line hook and two alternatives: the experience in plain words, not the mechanics list.
2. Write the sell sheet text: title, hook, key facts line, three or four bullets on the player experience and what is new, a playtesting line (with the designer's real numbers), and a contact placeholder.
3. Give a layout brief for one page: where the prototype photo goes, what it should show (the game in play, not the box), text hierarchy, and what to leave out.
4. Write a short pitch email: why this publisher (from the notes, or a placeholder to fill), the hook, the attached sell sheet, an offer of a rules summary and a short gameplay video, and a polite close.
5. Write a submission checklist: follow the publisher's guidelines, a two to three minute gameplay video, a rules overview, a prototype ready to ship, tracking who was pitched and when, and a follow-up date.
6. If the publisher notes suggest a poor fit (for example a party-game publisher for a heavy strategy game), say so and suggest what kind of publisher fits better.
</task>

<constraints>
- Use only facts the designer gave; leave placeholders for missing numbers such as playtest count.
- Do not claim a publisher's preferences or guidelines beyond what the designer provided.
- Keep the sell sheet text under about 120 words.
- Plain, confident language without hype words.
</constraints>

<output_format>
## Hook
## Sell sheet
The text as it would appear.
## Layout brief
## Pitch email
## Submission checklist
</output_format>
