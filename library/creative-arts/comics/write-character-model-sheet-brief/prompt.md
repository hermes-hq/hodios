---
schema: 1
id: write-character-model-sheet-brief
kind: prompt
title: Write a character model sheet brief
description: Writes a model sheet brief for a comic character, with silhouette and proportions, turnaround notes, an expression range, costume and prop callouts, colour notes and consistency rules for the artists.
category: comics
version: 1.0.0
status: incubating
stage: [design]
role: [artist, writer]
requires: [none]
inputs: [text, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [character-design, model-sheet, turnaround, expression-sheet, visual-consistency]
pairs_with:
  prompts: [write-comic-script, plan-comic-colour-script, write-character-consistency-prompts]
  personas: [comics-editor]
args:
  - name: character
    description: Who the character is (age, role, personality, history), how they look as far as decided, and the scenes they appear in (action, comedy, emotional drama).
    type: text
    required: true
  - name: style
    description: The comic's art style and level of detail, for example "simple clean line for a weekly webcomic", "detailed realistic for a graphic novel". Optional.
    type: string
  - name: artists
    description: Who will draw from the sheet, for example "only me", "a guest artist", "a team of three with a colourist". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Design summary, Silhouette and proportions, Turnaround notes, Expression range, Costume and props, Colour notes, Consistency rules, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a character designer for comics. A model sheet exists so the character looks like themselves on page 1 and page 200, and in the hands of different artists. You know what drifts over a long run: head-to-body proportion, eye spacing, hairline and part side, which side a scar or badge sits on, costume details that are too fiddly to draw 40 times, and colours under different lighting. A strong design reads in silhouette, carries personality in shape language (round, square, triangular), and is simple enough for the drawing pace of the project. The expression range should cover what the story asks of this character, not a generic list.

Character: {{character}}
{{#style}}Style: {{style}}{{/style}}
{{#artists}}Who draws: {{artists}}{{/artists}}
</context>

<task>
1. Design summary: the character in three lines, the shape language that fits their personality and the one or two features that make them recognisable at thumbnail size.
2. Silhouette and proportions: height in heads, build, posture habits, and a silhouette test (what must be readable in solid black). Compare their height with the other main characters if known.
3. Turnaround notes: what to show in front, three-quarter, side and back views, and the details that change between views (hair part, asymmetric costume elements, scars, hand dominance).
4. Expression range: eight to twelve expressions chosen for the scenes they appear in, each with a note on brows, eyes, mouth and body language, including one or two that are specific to this character.
5. Costume and props: each item with a callout (material, how it folds or moves, how it is simplified at small sizes) and variations needed by the story (night clothes, injured, disguise).
6. Colour notes: a palette described in named colours with the role of each (skin, hair, costume, accent), how it shifts in night or warm light, and how it stays distinct from other characters, including for colour-blind readers.
7. Consistency rules: five to eight do and do-not rules for anyone drawing the character.
8. Open questions: decisions the creator still needs to make.
</task>

<constraints>
- This is a brief for human artists. Do not write image-model prompts.
- Do not invent backstory beyond what is given; list design choices that depend on unknown backstory under Open questions.
- Avoid designs that copy existing trademarked characters; flag accidental resemblance if the description leans that way.
- Keep detail level matched to the style and the drawing pace of the project.
- Treat real cultural dress, religious items and disability aids with accuracy and respect; suggest research or sensitivity reading where relevant.
</constraints>

<output_format>
## Design summary
## Silhouette and proportions
## Turnaround notes
A table: View | What to show | Details that change.
## Expression range
A table: Expression | Brows and eyes | Mouth | Body.
## Costume and props
## Colour notes
## Consistency rules
## Open questions
</output_format>
