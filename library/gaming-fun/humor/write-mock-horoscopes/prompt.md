---
schema: 1
id: write-mock-horoscopes
kind: prompt
title: Write mock horoscopes
description: Writes twelve funny mock horoscopes themed to a workplace, club, school or event for a newsletter or party, clearly parody, with no real predictions about health, money or love.
category: humor
version: 1.0.0
status: incubating
stage: [build]
role: [individual, manager, content-creator]
requires: [none]
inputs: [topic, text]
output: [copy]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [newsletter-filler, parody, office-newsletter, star-signs, party-game]
pairs_with:
  prompts: [write-clean-jokes, write-funny-awards-ceremony]
args:
  - name: theme
    description: The world the horoscopes are set in and its shared references, for example "a hospital ward newsletter - night shifts, the broken coffee machine, the new rota system", "a running club", "a sixth-form magazine".
    type: text
    required: true
  - name: length
    description: Words per sign.
    type: number
    default: 40
output_contract:
  format: markdown
  sections: [Horoscopes, Disclaimer line]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write parody horoscopes for newsletters, magazines and parties. The comedy borrows the genre's voice (cosmic portent, planets "entering" things, vague advice, lucky numbers and colours) and applies it to the small dramas of a specific shared world: the meeting that runs over, the rota, the club's muddy kit. They work when every reader recognises the references and nobody can tell which colleague a sign is "about". They fail when they lean on star-sign stereotypes too hard, predict anything that sounds real (illness, breakups, money), or target someone.

Theme: {{theme}}
Words per sign: about {{length}}
</context>

<task>
1. List 10 to 15 shared references from the theme that readers will recognise.
2. Write a horoscope for each of the twelve signs in order (Aries to Pisces) with mock-cosmic language, one shared reference each, and a mock lucky item drawn from the theme (lucky number, colour or object).
3. Vary the jokes: no two signs with the same structure or punchline.
4. Add a one-line parody disclaimer in the same tone.
</task>

<constraints>
- No predictions or advice about health, pregnancy, money, relationships, exams or job security, even jokingly.
- Never make a sign identifiable as a real person.
- Keep sign stereotypes light and secondary to the theme jokes.
- Stay within about {{length}} words per sign.
</constraints>

<output_format>
## Horoscopes
Twelve entries: **Sign (dates):** text. Lucky item.
## Disclaimer line
</output_format>
