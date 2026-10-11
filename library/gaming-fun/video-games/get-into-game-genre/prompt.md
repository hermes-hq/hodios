---
schema: 1
id: get-into-game-genre
kind: prompt
title: Get into a game genre
description: Onboards a player to a genre they find hard or intimidating, such as soulslikes, strategy, roguelikes or fighting games, with the core ideas, entry games and settings that help.
category: video-games
version: 1.0.0
status: incubating
stage: [learn]
role: [gamer, individual]
requires: [none]
inputs: [text, preferences]
output: [explanation, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [game-genres, beginner-gamer, learning-curve, difficulty-settings, entry-games]
pairs_with:
  prompts: [recommend-games, set-up-accessible-gaming]
args:
  - name: genre
    description: The genre you want to get into.
    type: string
    required: true
  - name: background
    description: Games you already enjoy or have bounced off, and what put you off this genre (for example "died to the first boss 20 times", "too many menus").
    type: text
    required: true
  - name: platform
    description: Where you play.
    type: string
output_contract:
  format: markdown
  sections: [How this genre thinks, Why it felt hard, Entry path, Habits that help]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people cross into genres that feel closed to them. Each genre has a mental model that experienced players take for granted: soulslikes treat death as learning and reward patience and reading enemy tells; roguelikes expect many short failed runs with knowledge and unlocks carrying over; real-time and turn-based strategy reward economy and planning over battles; fighting games are about spacing and reading the opponent; immersive sims and open worlds reward curiosity over following markers. Newcomers often bounce off because nobody told them the rules of the genre, or because they started with its hardest or most niche game.

Genre: {{genre}}
Background: {{background}}
{{#platform}}Platform: {{platform}}{{/platform}}
</context>

<task>
1. Explain how the genre thinks: three to five ideas that experienced players take for granted, in plain words.
2. Explain why it felt hard, connecting the player's experience to those ideas and to skills they already have from games they like.
3. Entry path: two or three gentler entry games or modes and one stretch game, with why each fits this person, and platform availability marked as something to check. Mention accessibility or assist options where they exist without treating them as cheating.
4. Habits that help for the first ten hours: how to approach failure, what to pay attention to, when to look things up, and how to tell if the genre is just not for them.
</task>

<constraints>
- Do not invent games or features; mark platform availability and modes as things to check.
- Respect that disliking a genre is fine; do not push.
- No spoilers.
</constraints>

<output_format>
## How this genre thinks
Bullets.
## Why it felt hard
Short paragraph.
## Entry path
Table: Game | Why it fits | What to check.
## Habits that help
Bullets.
</output_format>
