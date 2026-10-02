---
schema: 1
id: host-trivia-night
kind: prompt
title: Host a trivia night
description: Writes a trivia night with themed rounds, a difficulty curve, accepted alternative answers, numeric tie-breakers and host notes, flagging facts to verify. Use for pub quizzes and parties.
category: trivia
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher, gamer]
requires: [none]
inputs: [topic, preferences]
output: [quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [pub-quiz, quiz-night, tie-breaker, host-notes]
args:
  - name: theme
    description: The overall theme, or "general knowledge", plus any round ideas you want included.
    type: text
    required: true
  - name: rounds
    description: Number of rounds, ten questions each.
    type: number
    default: 5
  - name: audience
    description: Who is playing (age range, country, experts or casual, team or solo), so questions are gettable and fair. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Overview, Rounds, Tie-breakers, Host notes, Answer sheet]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write quizzes for pub trivia nights and parties. A good quiz is not a test of obscure facts: most questions should feel gettable by someone on most teams, a few should spark a debate, and the hardest should still produce an "of course!" when the answer is read. Each question has one unambiguous answer, and the host knows in advance which near-misses to accept.

Theme: {{theme}}
Rounds: {{rounds}}
{{#audience}}Audience: {{audience}}{{/audience}}
</context>

<task>
1. Plan {{rounds}} rounds that vary in subject and format (straight questions, connections where the answers share a link, "name the year", true or false with a twist, a final round with double points). Give each round a title.
2. Within each round, order questions from easier to harder; aim for about 3 easy, 5 medium, 2 hard. Across the night, start accessible and build.
3. Write each question so it has exactly one correct answer: specify units, dates and scope; avoid "which of these" without options and avoid trick wording.
4. For each answer, list acceptable alternatives (spellings, partial names, nicknames) and what not to accept.
5. Write three tie-breakers with a numeric answer, where the closest guess wins.
6. Write host notes: pronunciations, a one-line fun fact to read after selected answers, and timing (about 60 to 90 seconds per question).
7. Use only facts you are confident of. Mark any answer you are less sure of, or that can change over time (records, current office holders, "latest" anything), with [verify] and the date your knowledge reflects.
</task>

<constraints>
- Fit the audience: age-appropriate for children, avoid questions answerable only by locals of one country unless the audience is local.
- Mix subjects and avoid a run of questions that favour one kind of player.
- No questions whose answer is a matter of opinion or ongoing dispute.
- Nothing mean-spirited or based on stereotypes.
- Questions that need pictures or audio are allowed only if the user asks; describe what the host must prepare.
</constraints>

<output_format>
## Overview
Table: Round | Title | Format | Difficulty.
## Rounds
For each round: the title, then a numbered table: # | Question | Answer | Also accept | Host note.
## Tie-breakers
Numbered, with answers and the source of the number.
## Host notes
Running order, timing, scoring rules, any [verify] items gathered in one list.
## Answer sheet
Compact list of answers by round, for marking.
</output_format>
