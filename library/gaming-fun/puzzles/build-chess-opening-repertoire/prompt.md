---
schema: 1
id: build-chess-opening-repertoire
kind: prompt
title: Build a chess opening repertoire
description: Builds a small chess opening repertoire for White and Black matched to your rating, style and study time, with the main ideas, key lines to a sensible depth and a plan for learning them.
category: puzzles
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [gamer, individual, student]
requires: [none]
inputs: [preferences, text]
output: [plan, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [chess, chess-openings, repertoire, study-plan, chess-improvement]
pairs_with:
  prompts: [analyze-chess-game]
  personas: [chess-coach]
args:
  - name: rating
    description: Your rating and where (for example "1300 on an online site, blitz") or "new to tournaments".
    type: string
    required: true
  - name: style
    description: How you like to play, for example "attacking, happy to sacrifice", "solid, positional", or "I don't know yet".
    type: text
  - name: current_openings
    description: What you play now with each colour and what keeps going wrong in your games.
    type: text
  - name: study_time
    description: Time you can spend on openings each week, for example "2 hours".
    type: string
    default: 2 hours a week
output_contract:
  format: markdown
  sections: [Where you are, Repertoire, Opening notes, Four-week plan, Check yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help club players build an opening repertoire. Strong coaches agree that below roughly 1800, openings matter less than tactics and endgames, so a good repertoire for most players is small, principled and reusable: one first move as White, one defence against 1.e4 and one against 1.d4 (and a plan against 1.c4, 1.Nf3 and offbeat moves), chosen so the same pawn structures and plans recur. Memorising long lines without understanding fails the moment an opponent deviates; knowing the typical plans, pawn breaks and piece placements survives it. Depth should grow with rating: a 1000 player needs the first few moves and the traps in their lines, a 1900 player needs main lines and the critical tries against them. Openings also differ in how much theory they demand (the Najdorf needs far more than the Caro-Kann or a London setup), and that should match the player's study time.

Rating: {{rating}}
{{#style}}Style: {{style}}{{/style}}
{{#current_openings}}Current openings and problems: {{current_openings}}{{/current_openings}}
Study time: {{study_time}}
</context>

<task>
1. Summarise the player's situation in two or three sentences, including whether openings are the right focus at this rating and what share of {{study_time}} they deserve.
2. Recommend a repertoire: White's first move and system, Black's answer to 1.e4, Black's answer to 1.d4, and a general plan against other first moves. For each, give the reason it fits this player (style, theory load, overlap of structures) and one alternative.
3. {{#current_openings}}Say which current openings to keep and which to replace, and why, rather than replacing everything.{{/current_openings}}
4. For each opening, give: the main idea in plain words, the typical pawn structure, two or three standard plans or pawn breaks, the key lines in standard algebraic notation to a depth suited to the rating, and one or two traps to know or avoid.
5. Give a study plan for the first four weeks that fits {{study_time}}: what to learn first, how to practise (play training games with the opening, review games after playing them, study annotated master games in the line), and when to look up the line that just went wrong.
6. Say what to check in an opening database or engine, so the player confirms move orders and current theory themselves.
</task>

<constraints>
- Name only openings and lines you are sure exist, with standard names and correct move orders. If unsure of a deep line, stop the line earlier and say to check it in a database.
- Never invent engine evaluations, win percentages or master game references.
- Do not help with a game in progress; repertoire work is for preparation only.
- Keep lines short enough to be useful: explain ideas rather than listing fifteen-move sequences.
</constraints>

<output_format>
## Where you are
## Repertoire
A table: Colour/situation | Opening | Why it fits | Alternative.
## Opening notes
One subsection per opening with idea, structure, plans, key lines and traps.
## Four-week plan
## Check yourself
</output_format>
