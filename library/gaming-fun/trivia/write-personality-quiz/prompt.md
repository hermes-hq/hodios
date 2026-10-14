---
schema: 1
id: write-personality-quiz
kind: prompt
title: Write a "which one are you" personality quiz
description: Writes a fun "which one are you" personality quiz with balanced result types, questions whose answers map to results, a scoring key, tie rules and a result write-up for each type.
category: trivia
version: 1.0.0
status: incubating
stage: [build]
role: [individual, content-creator, teacher, parent]
requires: [none]
inputs: [topic, preferences]
output: [quiz, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [personality-quiz, which-are-you, scoring-key, result-profiles, party-fun]
pairs_with:
  prompts: [create-party-game-cards, host-trivia-night]
args:
  - name: theme
    description: What the results are, for example "which houseplant are you", "which of our team's mascots are you" or "which pizza topping matches your weekend".
    type: text
    required: true
  - name: results
    description: Number of result types.
    type: number
    default: 4
  - name: questions
    description: Number of questions.
    type: number
    default: 8
  - name: audience
    description: Who takes it and where it will appear (party handout, class, newsletter, social post), so tone and length fit. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Results, Questions, Scoring key, Result write-ups, Balance check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write light "which one are you" quizzes for fun. These are entertainment, not psychology. What separates a good one from a flat one is mechanics: every answer option maps to exactly one result, each result can be reached about equally often, the questions do not make the "right" answer obvious, and every result write-up is flattering enough that nobody feels insulted by their outcome.

Theme: {{theme}}
Result types: {{results}}
Questions: {{questions}}
{{#audience}}Audience and setting: {{audience}}{{/audience}}
</context>

<task>
1. Define {{results}} result types for {{theme}}. Give each a name and a one-line core trait, and make the traits clearly different from each other (for example calm planner, spontaneous adventurer, social organiser, quiet maker).
2. Write {{questions}} questions about everyday preferences and situations, not about the theme itself, so players cannot steer to a favourite result. Mix formats: situations ("Your free Saturday starts..."), picks ("Pick a snack"), and this-or-that.
3. Give each question exactly {{results}} options, one per result type, and shuffle which letter maps to which result from question to question.
4. Write a scoring key: a table of question by option showing the result each option scores. Use "most of one result wins".
5. Write a tie rule that always produces one result (for example "If tied, your answer to the last question decides"), and say it in one line players can apply themselves.
6. Write a result write-up for each type: 60 to 100 words, warm and specific, with one strength, one gentle quirk and one suggestion that fits the theme.
7. Run a balance check: count how often each result appears as an option (it must be equal) and flag any question where one option is clearly more attractive than the others, then rewrite it.
</task>

<constraints>
- Present it as a fun quiz; never claim it measures personality, intelligence, health or suitability for anything, and do not borrow the names of clinical or commercial personality tests.
- No result is negative, and none relies on stereotypes about gender, age, nationality, body or class.
- Keep questions answerable by anyone in the stated audience; no in-jokes unless the person supplies them.
- If the theme involves real people (colleagues, celebrities), write results as archetypes, not as judgements of named individuals.
</constraints>

<output_format>
## Results
Table: Result | Core trait.
## Questions
Numbered questions with lettered options, ready to print.
## Scoring key
Table: Question | A | B | C | D... with the result each option scores, then the tie rule.
## Result write-ups
One short section per result.
## Balance check
Option counts per result and any question rewritten for balance.
</output_format>
