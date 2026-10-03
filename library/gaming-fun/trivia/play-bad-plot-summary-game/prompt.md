---
schema: 1
id: play-bad-plot-summary-game
kind: prompt
title: Play the bad plot summary game
description: Describes famous films, books or TV shows in misleading but technically true one-liners for the player to identify, then swaps roles so the player writes summaries to crack.
category: trivia
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, gamer]
requires: [none]
inputs: [preferences]
output: [conversation]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [bad-plot-summaries, films, books, tv-shows, pop-culture, guessing-game]
pairs_with:
  prompts: [play-emoji-guessing-game, play-two-truths-and-a-lie]
args:
  - name: medium
    description: What the summaries describe. mixed = any of films, books and TV, named with each summary.
    type: enum
    enum: [films, books, tv, mixed]
    default: films
  - name: rounds
    description: Number of summaries in the game, counting both players' turns in swap mode.
    type: number
    default: 10
  - name: mode
    description: you-guess = you write every summary; swap-roles = you alternate, and the player writes summaries for you to crack.
    type: enum
    enum: [you-guess, swap-roles]
    default: swap-roles
  - name: difficulty
    description: easy = blockbusters and classics, with a fairly direct angle; medium = famous titles with a sneakier angle; hard = well-known titles described from the strangest true angle.
    type: enum
    enum: [easy, medium, hard]
    default: medium
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run the bad plot summary game. A bad plot summary is one sentence that is accurate but describes a famous story from a deliberately unhelpful angle: a minor character's view, a literal reading of the premise, or an absurdly flat tone ("A farm boy's career ends badly for his estranged father's employer"). The joke only works if the summary is true, so accuracy comes first and the misdirection second.

Medium: {{medium}}
Rounds: {{rounds}}
Mode: {{mode}}
Difficulty: {{difficulty}}
</context>

<task>
1. Explain the game in three lines: one-line summaries that are true but misleading; 2 points for a guess without a hint, 1 after a hint; "hint" reveals the decade and genre; "pass" reveals the answer.
2. For each summary you write:
   - Choose a title widely known for the difficulty, varying decades and countries.
   - Write one sentence of at most 25 words that is literally accurate about the story and misleading about its tone, focus or genre.
   - Check it: every claim is true of the story; it fits this title better than any other well-known title; it reveals no twist ending.
3. Show one summary at a time with its number and, in mixed mode, its medium. Accept the common title, an alternative title or a clear description of the right work.
4. After each answer, name the title and explain the angle in one line (what the summary was technically describing).
5. In swap-roles mode, alternate turns. On the player's turn, ask them to write a summary of any title in {{medium}}. Guess honestly and show your reasoning in one line. Then rate their summary from 1 to 5 for misdirection, and say if any part is not technically true, kindly, with the correction.
6. Keep the score for both players. After {{rounds}} summaries, show the totals, the best summary of the game from either side, and offer another round.
</task>

<constraints>
- No twist endings or major reveals for any title, and nothing past the setup for recent releases (roughly the last two years you know of), unless the player says spoilers are fine.
- Summaries describe the story in your own words; no quoting dialogue or text.
- Keep titles suitable for a general audience unless the player asks otherwise; no summaries that mock real people or groups.
- Never show the answer in the same message as its summary.
</constraints>

<output_format>
Each summary: `Summary n of {{rounds}} (medium): "..."`.
Each verdict: right or not, `Answer: Title (year)`, a one-line angle explanation, then `[Score: You x | Me y]`.
Player's turn: your guess with one line of reasoning, then `Misdirection: k/5` and any accuracy note.
</output_format>
