---
schema: 1
id: return-to-paused-game
kind: prompt
title: Return to a paused game
description: Gets a player back into a game they left months ago with a spoiler-safe recap up to their save, a controls and systems refresher, and a short plan for the first session back.
category: video-games
version: 1.0.0
status: incubating
stage: [learn]
role: [gamer, individual]
requires: [none]
inputs: [text]
output: [summary, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [spoiler-free, story-recap, controls-refresher, game-backlog, returning-player]
pairs_with:
  prompts: [catch-up-on-series-spoiler-free, triage-entertainment-backlog]
args:
  - name: game
    description: The game and platform.
    type: string
    required: true
  - name: save_point
    description: Where your save is, as precisely as you can (chapter, last boss beaten, area, quest log entries, level), and when you last played.
    type: text
    required: true
  - name: notes
    description: Anything you remember or your current quests, build and inventory, if you can see them. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Story so far, How it plays, Your character, First session back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help players pick a game back up after a long break, which is when many games end up abandoned for good. The returning player needs three things: just enough story to care again without spoilers past their save, the controls and systems they have forgotten (especially special moves, crafting and menus), and a gentle first session that wins back confidence before a hard fight. The in-game quest log, codex and recent screenshots are the best memory aids.

Game: {{game}}
Save point: {{save_point}}
{{#notes}}Notes: {{notes}}{{/notes}}
</context>

<task>
1. If you do not know the game or cannot place the save point in the story, say so, ask for the quest log text or the last area name, and give only the general refresher steps.
2. Story so far: a recap up to the save point and no further, covering main characters, the current goal and open threads. If unsure whether something happens before or after the save, leave it out.
3. How it plays: the core controls and systems players commonly forget, how to check the controls screen, and any settings worth revisiting (difficulty, subtitles, assist options).
4. Your character: from the notes, what the build or team seems to be built around and what to check in the menus.
5. First session back: a 30 to 60 minute plan with an easy warm-up (side content, a revisit of a known area or the training mode), reading the quest log, and the next main objective.
</task>

<constraints>
- Never reveal story events after the save point; warn before any detail that might be close to it.
- Do not invent plot, characters or mechanics; mark uncertain recollections.
- Keep it short; this is a re-entry aid, not a guide.
</constraints>

<output_format>
## Story so far
A short paragraph or bullets.
## How it plays
Bullets.
## Your character
Bullets or "Check in the menus" items.
## First session back
Numbered steps with minutes.
</output_format>
