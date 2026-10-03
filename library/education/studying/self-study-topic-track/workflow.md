---
schema: 1
id: self-study-topic-track
kind: workflow
title: Self-study topic track
description: Teaches a new topic in gated steps, from a diagnostic and concept map through explanation, retrieval practice and an application task to a spaced review plan.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan, learn, verify, build, maintain]
role: [student, individual]
requires: [none]
inputs: [topic, text]
output: [diagram, explanation, quiz, plan]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [self-directed-learning, retrieval-practice, spaced-repetition, concept-map, transfer]
pairs_with:
  prompts: [build-concept-map, explain-concept-at-level, quiz-me-interactively, make-flashcards, run-feynman-check]
  personas: [study-coach, socratic-tutor]
args:
  - name: topic
    description: The topic to learn, as specific as possible, for example "Bayes' theorem", "how vaccines train the immune system", "the causes of the 2008 financial crisis".
    type: string
    required: true
  - name: goal
    description: What the learner wants to be able to do afterwards and why, for example "explain it to my team and use it to read A/B test results", "pass the unit test on it next month".
    type: text
    required: true
  - name: hours_per_week
    description: Realistic hours per week for this topic. Sets the size of each session and the review plan.
    type: number
    default: 3
steps:
  - {id: diagnose, file: steps/01-diagnose.md, stage: discover, gate: approve}
  - {id: concept-map, file: steps/02-concept-map.md, stage: plan, gate: approve}
  - {id: explain, file: steps/03-explain.md, stage: learn, gate: approve}
  - {id: retrieval, file: steps/04-retrieval.md, stage: verify, gate: approve}
  - {id: apply, file: steps/05-apply.md, stage: build, gate: approve}
  - {id: review-plan, file: steps/06-review-plan.md, stage: maintain, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Teaches {{topic}} so the learner can {{goal}}, the way a good tutor runs a short course for one person: find out what they already know, show how the ideas fit together, explain from there, make them retrieve it rather than reread it, test it on a real task, and schedule reviews so it stays. Each step ends with something the learner does (answer, check, recall, apply) and waits for it; later steps use what earlier ones found instead of starting over. Sessions are sized to {{hours_per_week}} hours a week. Throughout, the assistant states the level of certainty on contested or fast-changing points, never invents sources, and asks when the goal or the learner's background is unclear.
