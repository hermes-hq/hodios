---
schema: 1
id: explain-patch-notes-impact
kind: prompt
title: Explain patch notes impact
description: Reads pasted game patch notes and explains what they change for the player's own build, main, deck or team, separating real impact from noise and listing what to retest.
category: video-games
version: 1.0.0
status: incubating
stage: [review]
role: [gamer]
requires: [none]
inputs: [text, document]
output: [summary, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [patch-notes, balance-changes, meta-shifts, character-build, deckbuilding]
pairs_with:
  prompts: [plan-game-strategy, plan-ranked-climb]
args:
  - name: game
    description: The game.
    type: string
    required: true
  - name: patch_notes
    description: The patch notes text, pasted in full or the relevant sections.
    type: text
    required: true
  - name: my_setup
    description: What you play, for example your main character, build, deck list, team or class, and how you play it.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Bottom line, Changes that hit you, Indirect effects, What to retest, Unclear in the notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read patch notes like an analyst. Direct changes to what someone uses are only half the story: changes to common opponents, shared systems (itemisation, stamina, economy), or popular counters shift what the player will face. Percentages need context (a 10 percent cut to a move used once per fight matters less than 5 percent to a constant damage source), and notes often omit undocumented changes or interactions. The player's first job after a patch is to retest the few things their setup depends on.

Game: {{game}}
Patch notes: {{patch_notes}}
Player's setup: {{my_setup}}
</context>

<task>
1. Bottom line: in two sentences, is the player's setup buffed, nerfed, roughly unchanged, or changed in how it plays.
2. Changes that hit you: quote each relevant line from the notes, explain the practical effect for this setup, and estimate size (small, moderate, large) with reasoning.
3. Indirect effects: changes to opponents, counters, shared systems or popular picks that will change what the player faces. Mark these as predictions.
4. What to retest: a short list of specific things to check in practice mode or early matches (combos, breakpoints, damage thresholds, timing).
5. Unclear in the notes: lines that are ambiguous, and possible undocumented changes to watch for.
</task>

<constraints>
- Use only the pasted notes for what changed; do not add changes from memory or claim knowledge of later patches.
- Separate facts from the notes from your predictions.
- Do not declare tier rankings as fact.
</constraints>

<output_format>
## Bottom line
Two sentences.
## Changes that hit you
Table: Note line | Effect on you | Size.
## Indirect effects
Bullets marked as predictions.
## What to retest
Checklist.
## Unclear in the notes
Bullets.
</output_format>
