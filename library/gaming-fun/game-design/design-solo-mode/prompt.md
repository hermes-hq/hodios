---
schema: 1
id: design-solo-mode
kind: prompt
title: Design a solo mode for a board game
description: Designs a solo mode for a multiplayer board or card game - an automated opponent or a beat-your-score target, its decision deck or flowchart, difficulty levels and upkeep under a minute per turn.
category: game-design
version: 1.0.0
status: incubating
stage: [design]
role: [designer]
requires: [none]
inputs: [text, document]
output: [plan, docs]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [solo-mode, automa, board-games, bot-opponent]
pairs_with:
  prompts: [design-board-game, write-board-game-rulebook]
args:
  - name: game
    description: The multiplayer game's rules or a clear summary, especially how players interact (blocking, drafting, trading, combat) and how scoring works.
    type: text
    required: true
  - name: preference
    description: What solo players should experience, such as "a rival that blocks me" or "a puzzle to beat my best score". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Interaction to replace, Approach, Opponent rules, Difficulty levels, Upkeep check, Test plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design solo modes for multiplayer tabletop games. A solo mode must recreate the pressure other players create - taking the space you wanted, racing you to a goal, raising the score bar - without making the player run a full second player. The usual tools are an automated opponent driven by a small card deck or flowchart (often called an automa or bot), a score-attack target, or a timer that ends the game. Solo players value low upkeep: if running the bot takes longer than the player's own turn, the mode fails. The bot does not need to follow the human rules; it only needs to feel like a rival.

{{#preference}}Solo experience wanted: {{preference}}{{/preference}}
</context>

<task>
Game:

<game>
{{game}}
</game>

1. Identify the player interactions that create tension in the multiplayer game and rank which matter most to replicate.
2. Choose an approach (bot opponent, score target, timer or a mix) with the reason, and what is lost compared with multiplayer.
3. Write the opponent or target rules: components needed, setup, how the bot decides each turn (a small deck of action cards or a priority flowchart with tie-breakers), how it scores, and how the game ends. Keep decisions deterministic enough that the player never has to judge what the bot "would want".
4. Define three or more difficulty levels by changing one or two numbers, and a way to track progress across plays.
5. Check upkeep: count the steps the bot needs per turn and estimate the time; cut until it fits under about a minute.
6. Write a test plan: target win rates per difficulty for an average player, number of plays to check them, and the exploits to look for (stalling the bot, starving its deck).
</task>

<constraints>
- Keep the core multiplayer rules unchanged for the human player; changes for solo are listed explicitly.
- Every bot decision must resolve with no player judgement; add tie-breakers wherever two options are equal.
- Mark win-rate targets as design goals to verify.
- Do not copy solo rules or card text from published games.
</constraints>

<output_format>
## Interaction to replace
Ranked list.
## Approach
## Opponent rules
Setup, turn procedure, scoring, end, with a numbered flowchart or card list.
## Difficulty levels
Table: Level | What changes.
## Upkeep check
## Test plan
</output_format>
