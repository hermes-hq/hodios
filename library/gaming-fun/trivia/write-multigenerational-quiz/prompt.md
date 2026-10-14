---
schema: 1
id: write-multigenerational-quiz
kind: prompt
title: Write a quiz for all ages together
description: Writes a family or community quiz where grandparents, parents and children all score, with era-paired questions, rounds where each generation shines, mixed-age team rules and a gentle difficulty mix.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [parent, individual, teacher]
requires: [none]
inputs: [preferences]
output: [quiz, plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [family-quiz, all-ages, mixed-age-teams, holiday-gathering, family-reunion]
pairs_with:
  prompts: [host-trivia-night, design-quiz-scoring-rules]
args:
  - name: players
    description: Who is coming, with rough ages and where they grew up, for example "grandparents in their 70s from Poland, parents 40s in Germany, kids 6, 9 and 14".
    type: text
    required: true
  - name: occasion
    description: The gathering, for example "Christmas afternoon at home" or "family reunion, 40 people".
    type: string
    required: true
  - name: rounds
    description: Number of rounds.
    type: number
    default: 4
output_contract:
  format: markdown
  sections: [Teams and rules, Rounds, Answer key, Host notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write quizzes for mixed-age gatherings. A general-knowledge quiz at a family party tends to suit the middle generation and leave the youngest and oldest out. What works instead: teams that mix generations, questions where a child and a grandparent each hold half the answer, rounds that play to each age (cartoons and school topics, music and events from the grandparents' youth, everyday life "then and now"), and formats that do not depend on fast reading or writing.

Players: {{players}}
Occasion: {{occasion}}
Rounds: {{rounds}}
</context>

<task>
1. Propose teams that mix ages, a single scribe per team (not the youngest), and one rule that keeps everyone in: each team member must give at least one answer per round, or the youngest gets a free hint per round.
2. Plan {{rounds}} rounds, at least one where each generation has the edge. Good formats: "then and now" pairs (what something cost or was called in the grandparents' youth versus today), a picture or object round, a children's round (animals, cartoons, school topics) that adults find surprisingly hard, and a "who in the family" round only if the person supplies family facts.
3. Write 8 to 10 questions per round with answers. For each question, tag who is most likely to know it (child, adult, older adult) and keep a mix in every round.
4. Use the countries and eras in {{players}} for the "then" questions; where the generations grew up in different places, include both.
5. Write host notes: read every question aloud twice, allow drawing or pointing for younger children, keep rounds to 10 minutes, and short rest breaks.
6. Mark facts you are less sure of, especially prices and dates from decades ago, with [verify] and the word "about".
</task>

<constraints>
- Nothing frightening for young children; no questions on wars, illnesses or deaths as trivia.
- No jokes at the expense of older players' memory or children's mistakes.
- Do not invent family facts; use only those supplied.
- If the ages or places are too vague to aim questions, state the assumption you used.
</constraints>

<output_format>
## Teams and rules
Bullets.
## Rounds
For each round: title, then # | Question | Answer | Who will know it.
## Answer key
Compact list by round.
## Host notes
Bullets, including any [verify] items.
</output_format>
