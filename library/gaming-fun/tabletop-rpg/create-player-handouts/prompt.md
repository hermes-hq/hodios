---
schema: 1
id: create-player-handouts
kind: prompt
title: Create player handouts
description: Creates in-world player handouts such as letters, journal pages, wanted posters and described maps that deliver chosen clues without spoiling the plot, plus a GM key. Use to prep props.
category: tabletop-rpg
version: 1.0.1
status: incubating
stage: [build]
role: [gamer]
requires: [none]
inputs: [notes, text]
output: [message, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [handouts, props, clue-design, in-world-documents, game-mastering]
pairs_with:
  prompts: [design-dungeon, write-read-aloud-text, design-one-shot-adventure]
  personas: [dungeon-master]
args:
  - name: clues
    description: The clues each handout must deliver and what the players must NOT learn yet, for example "the smuggler's ship is the Grey Heron; the harbourmaster is in on it; do not reveal that the mayor ordered it".
    type: text
    required: true
  - name: setting
    description: Setting, era and tone, plus who might have written these documents, for example "1920s Arkham, cosmic horror" or "low-fantasy port city". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Handouts, GM key, Prop notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The output facet now describes in-world documents and a key table instead of a script."}
---
<context>
You write in-world documents that game masters print or hand across the table. A handout lets players discover a clue themselves, which they remember far longer than a GM's summary. It must sound like a real person in the setting wrote it for their own reasons, not like a note addressed to the players, and it must reveal exactly the clues intended and nothing that spoils what comes later.

Clues to deliver: {{clues}}
{{#setting}}Setting: {{setting}}{{/setting}}
</context>

<task>
1. List the clues and the forbidden reveals as you understand them. If it is unclear which facts must stay hidden, or the clues contradict each other, ask and stop.
2. Choose a document type for each clue or group of clues that fits who would plausibly write it: a letter, diary or journal page, wanted poster, newspaper clipping, ledger or receipt, telegram, notice, ship's manifest, map with annotations, torn page, or similar. Vary the types.
3. For each handout, decide the in-world author, their reason for writing, what they know, and what they would never write down. Write in their voice and the setting's register (spelling, idiom, titles, money, dates).
4. Embed each clue at the intended level of obviousness: one plain clue for the central fact, and subtler details (a name in a margin, an odd date, a seal, a smudged word) that reward close reading. Where a conclusion is essential, make sure at least one other handout or scene can also lead there.
5. For maps, describe the map so the GM can draw or assemble it: layout, labels, annotations in the author's hand, what is deliberately missing or wrong.
6. Check each handout against the forbidden reveals and remove anything that points to them, including accidental hints through names, timing or who the author is.
7. Write the GM key and short prop notes for making the handout feel physical.
</task>

<constraints>
- Keep each handout readable at the table: at most about 200 words, or one screen.
- No anachronisms for the setting; if the setting is not given, keep the language era-neutral and say so.
- No red herrings unless the user asked for them; if you add one, label it in the GM key.
- Nothing in the text addresses the players or winks at the audience.
- Do not imitate the exact layout or text of published handouts.
</constraints>

<output_format>
## Handouts
`### Handout 1: <title>` per handout, with a one-line label (type, author, when and where found) followed by the in-world text in a quote block. Use `[...]` for torn or illegible parts and `*smudged*` style notes in brackets for physical marks.
## GM key
Table: Handout | Clues delivered (plain / subtle) | What it does not reveal | Where players find it.
## Prop notes
Per handout: paper, ink, ageing, seal or stamp, folding, and a font style suggestion that stays legible.
</output_format>
