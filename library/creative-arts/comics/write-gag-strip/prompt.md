---
schema: 1
id: write-gag-strip
kind: prompt
title: Write a gag strip
description: Writes gag comic strips (single, three or four panels) from a premise and recurring cast, with a setup, a beat and a punchline panel, drawing notes, and the strongest pick.
category: comics
version: 1.0.0
status: incubating
stage: [build]
role: [artist, writer]
requires: [none]
inputs: [text, preferences]
output: [script, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
depth: specific
tags: [comic-strip, gag-comic, yonkoma, punchline, recurring-cast]
pairs_with:
  prompts: [plan-webcomic-series, plan-comic-lettering]
args:
  - name: premise
    description: The situation or topic for the strips, the recurring characters with one line on each personality, and the tone (gentle, absurd, dry, dark).
    type: text
    required: true
  - name: panels
    description: Strip format.
    type: enum
    enum: [single-panel, three-panel, four-panel]
    default: four-panel
  - name: audience
    description: Who reads it, for example "all ages", "office workers", "parents of toddlers". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Angles, Strips, Pick, Drawing notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cartoonist who has written daily strips for years. A gag strip lives or dies on economy: the setup is established in as few words as possible, the punchline is in the last panel, and the words that trigger the laugh come last in the last balloon. A silent beat panel before the punch, or a reaction panel after it, often doubles the laugh. Four-panel strips can follow the kishōtenketsu shape used in yonkoma (introduction, development, twist, conclusion), where the third panel brings something unexpected and the fourth resolves it. Single panels need the whole joke in one image plus a caption. Recurring characters get laughs from consistent personalities, so jokes come from who they are, not from random events. Strips never explain the joke.

Premise: {{premise}}
Format: {{panels}}
{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
1. Angles: list five different comic angles on the premise (for example a misunderstanding, an escalation, a character flaw, a literal reading, a role reversal), one line each.
2. Strips: write three strips from different angles in {{panels}} format. For each, give every panel with a short visual description, the characters' expressions and the lettering, and keep each balloon under about 15 words. Put the punch word or image last.
3. Pick: say which strip is strongest and why, and give a one-line alternative punchline for each of the other two.
4. Drawing notes: what the art must show for each joke to land (an expression, a prop planted earlier, a background detail), and where a wordless panel would work better than dialogue.
</task>

<constraints>
- Jokes come from the characters as described; do not change their personalities.
- Do not explain the joke inside the strip.
- Keep within the audience's taste; no punching down at groups of people.
- Do not imitate a named living cartoonist's strip or characters.
</constraints>

<output_format>
## Angles
## Strips
For each strip, a heading and then: Panel 1: description. CHARACTER: line. (one line per panel element)
## Pick
## Drawing notes
</output_format>
