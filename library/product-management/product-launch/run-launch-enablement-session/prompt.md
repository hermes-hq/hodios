---
schema: 1
id: run-launch-enablement-session
kind: prompt
title: Run a launch enablement session
description: Plans a live pre-launch training session for sales, success and support teams, with a timed agenda, demo walkthrough, objection drills, role-plays, a short certification quiz and follow-up.
category: product-launch
version: 1.0.0
status: incubating
stage: [ship]
role: [product-manager, marketer, sales-rep, support-agent]
requires: [none]
inputs: [text, document]
output: [plan, script, quiz]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [enablement, sales-training, objection-handling, certification]
pairs_with:
  prompts: [write-sales-enablement-brief, prepare-product-demo, handle-sales-objections, plan-launch-support-readiness]
args:
  - name: launch
    description: What is launching, who it is for, pricing and plan availability, key differentiators, known limitations, and the enablement brief or FAQ if one exists.
    type: text
    required: true
  - name: audience
    description: Who attends (account executives, SDRs, customer success, support, partners), how many, and their experience with the product. Optional.
    type: string
  - name: format
    description: Session length and format, for example 60 minutes on video call or 90 minutes in person. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Session goals, Agenda, Demo walkthrough, Objection drills, Role-plays, Certification quiz, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an enablement lead who trains customer-facing teams before launches. A slide-heavy session where the product manager talks for an hour leaves people unable to explain the product to a customer. What works is short context, a live demo of the customer's story (not a feature tour), then practice: drilling the three hardest objections, role-plays with feedback, and a quick check that each person can say who it is for, what it costs and what it does not do. Support and success need different practice from sales: handling "it does not work" and "how do I", and knowing the escalation path.

Launch: {{launch}}
{{#audience}}Audience: {{audience}}{{/audience}}
{{#format}}Format: {{format}}{{/format}}
</context>

<task>
1. Set three session goals as things attendees can do afterwards (for example "pitch it in 30 seconds to an operations buyer").
2. Build a timed agenda with at least half the time on practice: context, demo, objection drills, role-plays, quiz, questions. Split into breakouts by role if both sales and support attend.
3. Write the demo walkthrough as a customer story: the persona, their problem, five to seven steps in the product, the moment of value, and the line to say at each step. Include what to do if the demo environment fails.
4. Prepare objection drills: the five most likely objections (price, timing, competitor, "we already do this", risk or security, missing feature), each with a good answer and a weak answer to contrast.
5. Write two or three role-play scenarios per role: setup for the "customer", the goal for the rep, two curveballs, and a scoring checklist for the observer.
6. Write a certification quiz of 8-10 questions (multiple choice and one short spoken pitch) covering who it is for, pricing and availability, limitations, and when to escalate. Include the answer key.
7. Plan follow-up: recording and materials, where questions go after the session, a check-in at two weeks, and the signals that enablement worked (win rate on the feature, support tickets resolved without escalation).
</task>

<constraints>
- Use only the product facts given; anything unclear becomes [confirm with PM] rather than an invented detail.
- Include the limitations and "what not to promise" explicitly; reps who overpromise create churn and support load.
- Fit the agenda to the time given; default to 60 minutes if none.
- Owners are roles, not names.
</constraints>

<output_format>
## Session goals
Three bullets.

## Agenda
Table: time | segment | who leads | format.

## Demo walkthrough
Numbered steps with the line to say.

## Objection drills
Table: objection | good answer | weak answer.

## Role-plays
Scenario cards with the observer checklist.

## Certification quiz
Questions, then the answer key.

## Follow-up
Bullets.
</output_format>
