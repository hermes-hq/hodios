---
schema: 1
id: quiz-codebase-knowledge
kind: prompt
title: Quiz yourself on a codebase
description: Quizzes a new team member on a real repository's structure, request flows, data model and conventions one question at a time, with every answer checked against the code and cited.
category: learning
version: 1.0.0
status: incubating
stage: [learn]
role: [software-engineer]
stack: []
requires: [repo-read]
inputs: [repo]
output: [quiz, explanation]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [active-recall, new-joiner, code-reading, self-assessment]
pairs_with:
  prompts: [explain-codebase, map-repo-and-verify-setup, explain-design-patterns-in-code]
args:
  - name: area
    description: The part of the repo to focus on, or empty for the whole project.
    type: text
  - name: questions
    description: How many questions to ask.
    type: number
    default: 10
  - name: mode
    description: recall asks where things are and what they do; reasoning asks what would happen if something changed.
    type: enum
    enum: [recall, reasoning, mixed]
    default: mixed
output_contract:
  format: markdown
  sections: [Question, Feedback, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reading a codebase tour feels like understanding, but retrieval is what makes it stick: being asked "where would you add a new API endpoint?" or "what happens to an order if payment times out?" and having to find or reason out the answer. Good onboarding questions are about this repo, not general knowledge, and have answers the code proves. They range from where things live, to how a request flows, to the data model, to conventions (naming, error handling, tests), to consequences of change. Questions about trivia (exact line counts, variable names nobody uses) waste the learner's time.
</context>

<task>
Run a quiz on the codebase in the working directory{{#area}}, focused on {{area}}{{/area}}: {{questions}} questions, {{mode}} mode.

1. Before asking anything, read enough of the repo to answer every question you will ask: README, entry points, routing, core modules, data model, tests and config. Plan the questions to cover structure, main flows, the data model, conventions and change consequences, from easy to hard. Do not show the plan.
2. Ask one question at a time. Say the topic and difficulty. Allow answers in the learner's own words, file paths or "I don't know".
3. After each answer, give feedback: correct, partly correct or not yet; the answer with file paths and line references that prove it; and one sentence on why it matters for day-to-day work. If the learner was partly right, say which part.
4. Adapt: after two misses in a topic, ask an easier question in it next; after two clean hits, ask a reasoning question.
5. If the learner asks for a hint, give one pointing to where to look, not the answer.
6. After the last question, summarise: score, topics strong and weak, and the three files to read next for the weak topics.
</task>

<constraints>
- Ask only questions whose answers you verified in the code; cite them in feedback. If the code is ambiguous, say so instead of marking the learner wrong.
- No trivia. Every question must matter for working in this repo.
- One question per message. Do not reveal answers before the learner tries, unless they ask to skip.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
Each turn:
## Question
Number, topic, difficulty, the question.
## Feedback
After the learner answers: verdict, answer with citations, why it matters.
At the end:
## Summary
Score, strong and weak topics, three files to read next.
</output_format>
