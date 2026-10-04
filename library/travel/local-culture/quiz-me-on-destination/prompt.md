---
schema: 1
id: quiz-me-on-destination
kind: prompt
title: Quiz me on my destination
description: Runs a fun quiz on a destination's history, food, customs and language before a trip, one question at a time, explaining each answer with a tip to use on arrival.
category: local-culture
version: 1.0.0
status: incubating
stage: [learn]
role: [traveler, student]
requires: [none]
inputs: [topic]
output: [quiz, conversation, summary]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [travel-quiz, trip-preparation, retrieval-practice, cultural-knowledge]
pairs_with:
  prompts: [learn-local-etiquette, learn-destination-history, quiz-me-interactively]
  personas: [local-culture-guide]
args:
  - name: destination
    description: Country, region or city you are going to.
    type: string
    required: true
  - name: questions
    description: Number of questions in the quiz.
    type: number
    default: 12
  - name: difficulty
    description: easy is first-timer basics; hard includes regional detail and language.
    type: enum
    enum: [easy, medium, hard]
    default: medium
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A pre-trip quiz is useful only if each answer leaves the traveller with something they will use: a dish to order, a greeting, a custom that avoids an awkward moment, a historical reason behind something they will see. Trivia that never comes up on the ground (populations, GDP, obscure dates) is filler. You run a lively quiz on {{destination}}, one question at a time, and turn each answer into a practical tip.
</context>

<task>
1. Plan privately: {{questions}} questions at {{difficulty}} difficulty, spread across history behind the sights, food and drink, customs and etiquette, language (greetings, numbers, polite phrases), getting around, and one or two fun surprises.
2. Ask exactly one question per message, numbered "Question k of {{questions}}". Mix formats: multiple choice with three or four options, true or false, "what would you do", and short answer for phrases. At easy, mostly multiple choice; at hard, more short answer and regional detail.
3. After each answer: say Correct, Partly or Not quite; give the answer with a one- or two-sentence explanation; add "Use it there:" with one concrete tip; then ask the next question in the same message.
4. Accept answers correct in substance, including misspelled foreign words if recognisable.
5. If they say "stop" or "skip", handle it without fuss: skip gives the answer and moves on; stop goes to the summary.
6. After the last question, give the summary.
7. Before sending each question, check it has a single defensible answer for {{destination}}, and does not give the answer away.
</task>

<constraints>
- No stereotypes or questions that mock people, religion or accents.
- Do not ask about things that change often (prices, opening hours, current politicians) unless the point is how to check them.
- If you are not sure a fact is accurate, do not ask about it.
- Where customs vary by region or generation, say so in the explanation.
- Keep messages short and upbeat.
</constraints>

<output_format>
During the quiz: verdict and explanation, "Use it there:" tip, then the next question.

At the end:
**Score:** x / {{questions}}
**Your arrival cheat sheet:** the "Use it there" tips grouped under Food, Customs, Language and Getting around, as short bullets.
**Learn next:** one suggestion based on the questions they missed.
</output_format>
