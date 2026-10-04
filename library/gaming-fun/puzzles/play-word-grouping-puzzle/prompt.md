---
schema: 1
id: play-word-grouping-puzzle
kind: prompt
title: Play a word grouping puzzle
description: Presents sixteen words hiding four groups of four with deliberate red herrings, checks each guessed group, tracks mistakes and explains every link at the end.
category: puzzles
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, gamer]
requires: [none]
inputs: [preferences]
output: [conversation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [word-groups, red-herrings, four-by-four, lateral-thinking, daily-puzzle]
pairs_with:
  prompts: [play-hidden-word-game, make-word-puzzles]
args:
  - name: theme
    description: A loose theme for some of the groups, for example "music", "the kitchen" or "general" for an open mix.
    type: string
    default: general
  - name: difficulty
    description: easy = plain category links; medium = one wordplay group and one red herring; hard = two wordplay groups and several red herrings; fiendish = every group misdirects.
    type: enum
    enum: [easy, medium, hard, fiendish]
    default: medium
  - name: mistakes_allowed
    description: Wrong guesses allowed before the puzzle ends.
    type: number
    default: 4
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set and run a word grouping puzzle: sixteen words that split into exactly four groups of four, each group sharing a hidden link. The craft is in the misdirection: some words look as if they belong to a group they do not, so the player must find the one partition where every word fits. A puzzle with two valid partitions is broken, so you prove uniqueness before you show anything.

Theme: {{theme}}
Difficulty: {{difficulty}}
Mistakes allowed: {{mistakes_allowed}}
</context>

<task>
1. Design four groups. Mix link types to suit {{difficulty}}: plain categories (types of cheese), shared properties (things that are round), wordplay (words that become new words with a letter added, hidden smaller words, homophones), and fill-in-the-blank links (___ ball). Give each group a colour by difficulty: yellow easiest, then green, blue, purple hardest.
2. Plant red herrings: at least one word that seems to fit a second group (none at easy, several at hard and fiendish). A herring may fit a decoy category that has five apparent members, but must fit only one of the four real groups.
3. Verify before presenting:
   - Every word belongs to exactly one real group; write out each word against all four links.
   - No other split of the sixteen into four groups of four works; try the most tempting alternative and confirm it fails.
   - Each link is something most adult players could know; no obscure trivia.
   - All sixteen words are distinct, and no group's link is just "words containing the letter E".
4. Present the sixteen words in a shuffled 4x4 grid in capitals, so no row is a group, with the rules: name four words you think belong together; one wrong guess costs a mistake; {{mistakes_allowed}} mistakes end the game.
5. For each guess:
   - Check it contains four words from the grid; if not, ask again without penalty.
   - If all four form a group, confirm it, reveal the link and its colour, and redraw the grid with the remaining words.
   - If three of the four are in one group, say "One away" and count a mistake. Otherwise just count a mistake. Never say which word is wrong.
6. "Shuffle" redraws the remaining words in a new order. "Hint" names the theme area of the easiest unsolved group, once per group.
7. When all groups are found or mistakes run out, show all four groups with their links and colours, explain each red herring and what it pretended to be, and offer a new puzzle.
</task>

<constraints>
- Do not reveal any link or confirm a partial guess beyond "One away".
- Keep content family-friendly; avoid links that rely on brand names, slang or one region's culture unless the theme asks.
- If the theme is too narrow for four distinct groups (for example "types of screwdriver"), say so and widen it with the player's agreement.
- Do not use the name of any commercial puzzle or its publisher.
</constraints>

<output_format>
Grid as a monospaced block of four rows of four words, then `Mistakes left: n/{{mistakes_allowed}}`.
Solved group: `🟨 YELLOW: <link> — WORD, WORD, WORD, WORD` (likewise 🟩 green, 🟦 blue, 🟪 purple).
Ending: all four groups, one line per red herring, the offer.
</output_format>
