---
schema: 1
id: return-to-study-track
kind: workflow
title: Return to study track
description: Guides an adult thinking about going back to study through gated steps - whether it is worth it, choosing course and mode, funding and time, applying, and preparing for the first term.
category: decision-making
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, student]
requires: [none]
inputs: [text]
output: [plan, table, checklist, outline]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [adult-learners, mature-students, career-change, part-time-study, course-choice, study-funding]
pairs_with:
  prompts: [make-life-decision, create-study-plan, run-cost-benefit-analysis, compare-options-matrix]
  personas: [career-coach, study-coach]
args:
  - name: course_or_field
    description: What you are thinking of studying, as specific or vague as you are right now, for example "nursing degree", "something in data", "finish the accounting qualification I dropped in 2015".
    type: string
    required: true
  - name: situation
    description: Your life now - age range if you like, work and hours, caring responsibilities, previous qualifications, money situation in broad terms, what is pushing you to study, and what worries you.
    type: text
    required: true
  - name: country
    description: The country (and region if relevant) where you would study and live, which shapes courses, funding and entry routes.
    type: string
    required: true
steps:
  - {id: worth-it, file: steps/01-worth-it.md, stage: discover, gate: approve}
  - {id: course-and-mode, file: steps/02-course-and-mode.md, stage: discover, gate: approve}
  - {id: funding-and-time, file: steps/03-funding-and-time.md, stage: plan, gate: approve}
  - {id: apply, file: steps/04-apply.md, stage: plan, gate: approve}
  - {id: first-term, file: steps/05-first-term.md, stage: plan, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides an adult through the decision to return to study and, if they go ahead, through choosing, funding, applying and starting well. It pauses after each step so the person can think, check facts and talk to the people affected. The first step may end with "not now" or "a shorter route instead", and that is a good outcome too.

Thinking of: {{course_or_field}}
Situation: {{situation}}
Country: {{country}}

Throughout: use the person's facts and never invent their grades, finances or deadlines. Course details, entry requirements, fees, loans, grants, tax relief and deadlines change every year and differ by country and institution: describe the routes that usually exist and tell the person to confirm each one with the official funding body or the institution for the current year. Do not give personal financial advice; for big money decisions, suggest the institution's student funding office or an independent adviser. Treat their worries (age, confidence, being out of practice) as normal and practical to solve.
