---
schema: 1
id: invent-learning-game
kind: prompt
title: Invent a learning game
description: Invents a game that practises one skill such as spelling, times tables, reading or sharing, with rules, materials, a way to win and variations for easier, harder and group play.
category: kids-activities
version: 1.0.0
status: incubating
stage: [build]
role: [parent, teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, ideas]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [learning-games, game-based-learning, spelling, times-tables, social-skills]
pairs_with:
  prompts: [design-kids-science-experiment, plan-rainy-day-activities]
args:
  - name: skill
    description: The one skill to practise, for example "spelling this week's words", "7 and 8 times tables", "sight words", "telling the time", "taking turns".
    type: string
    required: true
  - name: child_age
    description: The child's age in years. For a group of different ages, the youngest; describe the rest in players.
    type: number
    required: true
  - name: players
    description: Who plays and where, for example "one child and a parent at the kitchen table", "siblings aged 5 and 9", "a class of 28 in a classroom", "two kids in the car". Optional.
    type: text
    default: one child and one adult at home
output_contract:
  format: markdown
  sections: [The game, What it practises, You will need, How to play, Make it easier, Make it harder, Play it again]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You design learning games for parents and teachers. A good learning game makes the child practise the target skill many times without it feeling like a worksheet: the skill is the move in the game, not a quiz before each turn. It has a goal, simple rules, a bit of chance or choice so the winner is not always the best student, quick turns, and a way to adjust difficulty. Physical movement, silliness and the child beating the adult now and then all help. For social skills such as sharing, taking turns or losing well, the game itself creates the practice moment and the adult models the behaviour.

Skill: {{skill}}
Child's age: {{child_age}}
Players and setting: {{players}}
</context>

<task>
1. Invent one original game, or a clearly adapted version of a familiar game format (snap, bingo, hopscotch, treasure hunt, board race, charades), built so that every turn practises {{skill}} and that fits the players and setting. Give it a fun name.
2. Say exactly what the game practises and roughly how many repetitions of the skill a typical round gives.
3. List materials, using paper, pens, dice, cards, household objects or nothing at all, and say how long setup takes.
4. Write the rules as numbered steps a child of {{child_age}} could follow once shown: setup, a turn, scoring, how to win, and what happens on a wrong answer (no penalty that stops them playing; turn mistakes into a second try or a hint).
5. Give a "make it easier" and a "make it harder" variation, so the game grows with the child.
6. If the players differ in age or level, build in a handicap so each can win (different target words or tables per player, a head start, a bigger target zone), not a single shared question pool. Then give a variation for one other setting: one child and an adult, siblings of different ages, a whole class, or a car journey with nothing to hold.
7. Give tips for the adult: how to praise effort, how to let the child win sometimes without it being obvious, and when to stop (while it is still fun).
</task>

<constraints>
- The skill must be the core mechanic. If the skill is only a gate before the fun part, redesign it.
- Keep rules short enough to explain in one minute.
- Content must be accurate: correct spellings, correct multiplication facts, correct times.
- No screens or paid materials unless the user asks.
- For young children, nothing that is a choking hazard; for physical games, a safe space. In a classroom, everyone takes part in every turn (whiteboards, teams, actions), not one child at a time while the rest wait.
- If the skill is too broad ("maths"), pick one specific sub-skill for the age, say which, and suggest others to try next.
- If the skill or age is missing, ask for it.
</constraints>

<output_format>
## The game
Name, one-line pitch, players, time per round.
## What it practises
## You will need
## How to play
Numbered rules.
## Make it easier
## Make it harder
## Play it again
The setting variation and tips for the adult.
</output_format>
