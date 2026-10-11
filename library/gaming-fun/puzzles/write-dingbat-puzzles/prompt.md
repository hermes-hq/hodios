---
schema: 1
id: write-dingbat-puzzles
kind: prompt
title: Write dingbat word-picture puzzles
description: Writes dingbat (word-picture rebus) puzzles where the layout of words spells a phrase, such as MIND over MATTER, laid out in plain text with answers, hints and a check for one fair reading.
category: puzzles
version: 1.0.0
status: incubating
stage: [build]
role: [individual, teacher, gamer]
requires: [none]
inputs: [topic]
output: [quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [dingbats, wordies, rebus, quiz-round, printable]
pairs_with:
  prompts: [write-riddles, make-word-puzzles, host-trivia-night]
args:
  - name: count
    description: How many puzzles to write.
    type: number
    default: 10
  - name: theme
    description: Optional theme for the answers, for example "idioms", "film titles", "food phrases" or "Christmas".
    type: string
  - name: audience
    description: Who will solve them, for example "pub quiz adults" or "8 to 10 year olds". Sets which phrases they will know.
    type: string
    default: general adult audience
output_contract:
  format: markdown
  sections: [Puzzles, Answers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write dingbats, also called wordies or word rebuses: puzzles where the arrangement of letters and words on the page spells out a common phrase. "MIND" written above "MATTER" is mind over matter; "STAND" above "I" is I understand; "R|E|A|D|I|N|G" is reading between the lines; "HEAD HEELS" with HEAD set above HEELS is head over heels. They work on a few devices: position (over, under, beside, inside, between), repetition (counts as numbers), size or case, direction (text written backwards read as "back" or "reverse", text written vertically read as "up" or "down"), missing letters, and letters standing for words (C for sea, U for you). A good dingbat has one obvious reading once seen, uses a phrase the audience actually knows, and can be drawn clearly. Text-only layouts limit size and colour, so you favour position, repetition, spacing and direction.

Number of puzzles: {{count}}
{{#theme}}Theme: {{theme}}{{/theme}}
Audience: {{audience}}
</context>

<task>
1. List candidate phrases the audience will know{{#theme}} on the theme{{/theme}}. Drop any that need a device text cannot show (colour, curved lines) unless you can describe the drawing in one line for a printed version.
2. For each chosen phrase, design the layout using one or two devices. Lay it out in a fixed-width text block that reads correctly in a monospace font.
3. Check each puzzle: read the layout cold and list every plausible reading. Keep it only if one reading is clearly best; otherwise change the layout or the phrase.
4. Vary the devices across the set so no two puzzles use the same trick back to back, and order them from easiest to hardest.
5. Write a one-line hint for each (the device or the phrase's category, never the words).
6. Write the answer key with the device each puzzle used, so a quizmaster can explain them.
</task>

<constraints>
- Use only common phrases, idioms or titles in the audience's language; avoid regional slang unless the audience shares it.
- Nothing crude, cruel or aimed at a group of people.
- Do not copy well-known published dingbat sets wholesale; classic examples may inspire but most puzzles should be original layouts.
- Every layout must survive copy-paste: no reliance on colour, font size or special characters that may not render.
</constraints>

<output_format>
## Puzzles
Numbered, each a fixed-width code block, with `Hint:` below.
## Answers
Numbered: phrase, then the device in a few words.
</output_format>
