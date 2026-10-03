---
schema: 1
id: create-review-game
kind: prompt
title: Create a classroom review game
description: Creates a low-prep classroom review game (quiz show, relay, escape challenge or card game) from unit content, with tiered questions, an answer key, rules, timing and materials.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [notes, document, topic]
output: [quiz, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [review-game, retrieval-practice, gamification, active-learning, answer-key]
pairs_with:
  prompts: [create-practice-worksheet, write-multiple-choice-questions, design-classroom-activity]
args:
  - name: unit_content
    description: What the unit covered, e.g. key terms, facts, procedures, the unit's objectives, or pasted notes or a study guide.
    type: text
    required: true
  - name: grade_level
    description: Grade, age or course, e.g. "Grade 5", "Year 10 biology", "adult ESL".
    type: string
    required: true
  - name: format
    description: Game format. Use any to let the prompt choose the best fit for the content.
    type: enum
    enum: [quiz-show, relay, escape, cards, any]
    default: any
output_contract:
  format: markdown
  sections: [Game overview, Rules, Setup and materials, Questions, Answer key, Running it well]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A review game is retrieval practice in disguise. It works when every student has to retrieve every answer, not just the fastest hand in each team, when the questions cover the unit's important content at rising difficulty, and when wrong answers get corrected on the spot. It fails when it rewards speed and luck over knowledge, when three students do all the thinking, or when setup eats the lesson. The best formats need nothing more than paper, a board and a timer.
</context>

<task>
Create a review game for **{{grade_level}}** in the **{{format}}** format.

<unit_content>
{{unit_content}}
</unit_content>

1. Choose the format. If it is "any", pick the one that best fits the content and say why in one sentence: quiz-show (Jeopardy-style board, good for broad factual coverage), relay (teams pass work along, good for multi-step procedures), escape (locked-room puzzle chain where each answer unlocks the next, good for connected ideas), cards (matching, sorting or "I have, who has", good for vocabulary and definitions).
2. Extract the 6 to 10 most important ideas, terms or procedures from the unit content and make sure the questions cover all of them.
3. Write questions in three difficulty tiers: recall (about 40%), apply or explain (about 40%), and challenge (about 20%). Mix formats (short answer, true or false with correction, solve, explain why, odd one out). Write enough for about 30 minutes of play.
4. Build in whole-class accountability: every student answers every question (mini whiteboards, team huddle then a random spokesperson, or all teams answer at once) rather than buzz-in speed.
5. Write the rules in numbered steps a class can follow, with scoring that rewards accuracy and lets teams that fall behind catch up (for example double points in the final round or wagers).
6. Give timing for each phase and a total, and the materials and setup in under 10 minutes of preparation.
7. Write the answer key, and for the apply and challenge questions, a one-line explanation the teacher can read out after the answer.
</task>

<constraints>
- Use only content from the unit given; do not add topics that were not taught. If the content is too thin for a game, say what is missing and ask for it.
- Check every answer. Avoid questions with more than one defensible answer unless the game accepts either.
- Teams are mixed and random or teacher-set; no picking captains or public elimination of individual students.
- No prizes that cost money or food rewards; points and small privileges are enough.
- Keep reading load suitable for {{grade_level}}, and give an option for students who need questions read aloud.
- No technology unless the teacher mentions it; describe a paper version of any board or puzzle.
</constraints>

<output_format>
## Game overview
Format, why it fits, duration, team setup.
## Rules
Numbered steps, including scoring.
## Setup and materials
Checklist, plus timing per phase.
## Questions
Grouped by tier (or by round, board column or puzzle stage), numbered.
## Answer key
Matching numbers, with explanations for apply and challenge questions.
## Running it well
3 to 5 tips: keeping everyone answering, correcting misconceptions on the spot, and a 2-minute wrap-up asking students what they still need to revise.
</output_format>
