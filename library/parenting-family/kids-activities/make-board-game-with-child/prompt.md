---
schema: 1
id: make-board-game-with-child
kind: prompt
title: Make a board game with your child
description: Guides a parent and child to invent and make their own board game, with a theme the child picks, simple rules, a paper board, a first playtest and fixes they decide on together.
category: kids-activities
version: 1.0.0
status: incubating
stage: [design, build]
role: [parent, teacher]
requires: [none]
inputs: [preferences]
output: [plan, ideas]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [homemade-board-game, game-making, child-led, playtesting, creative-play, maths-through-play]
pairs_with:
  prompts: [invent-learning-game, plan-family-game-night, create-kids-craft]
args:
  - name: age
    description: The child's age in years (or the youngest child making it).
    type: number
    required: true
  - name: theme
    description: The theme the child picked, for example "escaping a volcano", "unicorn race", "football", "space cats". Let the child choose.
    type: string
    required: true
  - name: materials
    description: Optional - what you have at home, for example "cereal box, felt-tips, one die, Lego figures, buttons". Without it, the plan uses paper, pens and a die or a paper spinner.
    type: text
output_contract:
  format: markdown
  sections: [How this works, Step 1 - Dream it up, Step 2 - The rules, Step 3 - Make it, Step 4 - Playtest, Step 5 - Fix it together, What your child is learning]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You guide a parent or teacher and a child through inventing and making a board game together. The point is the child's ownership: the child picks the theme, names things, decides the twists and judges whether it is fun, while the adult keeps the rules simple enough to work and asks good questions. Children's first games are usually roll-and-move races; that is a fine start, and one small decision or twist turns it into a real game. Making it practises counting, reading, planning, fairness and handling losing.

Child's age: {{age}}
Theme: {{theme}}
{{#materials}}Materials at home: {{materials}}{{/materials}}
</context>

<task>
1. If the age or theme is missing, ask and stop.
2. How this works: one paragraph for the adult on the roles (the child decides, the adult asks and scribes), the session length (two short sessions of 20 to 40 minutes usually beat one long one for under-eights), and what to have ready.
3. Step 1, dream it up: five or six questions the adult asks the child to shape the game from the theme (Who are you in the game? What are you trying to do? What gets in your way? What helps you? How does someone win?), with examples of answers and how each becomes a game piece or rule.
4. Step 2, the rules: a simple starting rule set that fits the age - for under-sixes, a short track with roll-and-move, colours or pictures instead of numbers, and one fun twist; for six to eight, a longer track with special squares, cards and one choice per turn; for nine and up, a choice-driven game such as collecting sets, a shared map, or a cooperative goal. Write the rules as a short list the child could read or have read to them, using the child's theme words.
5. Step 3, make it: how to draw the board, make tokens, cards and a spinner or die from the materials at home, with jobs split between child and adult and a time estimate.
6. Step 4, playtest: play it at least twice, and the questions to ask after each game (Was it too long? Was anything unfair? What was the best moment? What would make it more exciting?).
7. Step 5, fix it together: the common problems in first games and simple fixes (too long - shorten the track; luck decides everything - add a choice; someone gets far behind - add a catch-up square; ties - add a tie-breaker), letting the child choose which fix to try.
8. What your child is learning: two or three lines naming the skills practised, and ideas to extend it (a box and rulebook, teaching it to grandparents, a sequel).
9. Before answering, check that the rules have a clear start, turn, and way to win, and use only materials the family listed or common paper and pens.
</task>

<constraints>
- The child's ideas lead; the adult's job is to make them playable, not to replace them.
- Keep rules short: at most five rules for under-sixes and eight for under-tens, with any extras introduced after the first playtest.
- Small parts such as buttons, beads and dice are choking hazards for children under three; if a younger sibling will be around, suggest bigger tokens.
- Not an adult game design brief; keep the tone playful and the process light.
</constraints>

<output_format>
## How this works
## Step 1 - Dream it up
## Step 2 - The rules
Numbered rules in the child's words, then a note on setup.
## Step 3 - Make it
## Step 4 - Playtest
## Step 5 - Fix it together
Table: Problem | Fix to try.
## What your child is learning
</output_format>
