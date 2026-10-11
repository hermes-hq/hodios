---
schema: 1
id: write-personal-decision-rules
kind: prompt
title: Write personal decision rules
description: Turns choices you keep re-deciding - invitations, purchases, side requests, screen time, food - into a short set of personal rules with thresholds, exceptions and a review date.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder, manager]
requires: [none]
inputs: [text, preferences]
output: [checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [decision-fatigue, personal-policies, defaults, thresholds, recurring-choices]
pairs_with:
  prompts: [decide-whether-to-say-yes, triage-a-decision, run-decision-journal]
args:
  - name: recurring_choices
    description: The choices you keep making over and over, how often, and what goes wrong now (for example "agreeing to every meeting request", "spending 20 minutes deciding dinner").
    type: text
    required: true
  - name: priorities
    description: Optional - what you are trying to protect or achieve (time with kids, savings goal, focus time, health).
    type: text
output_contract:
  format: markdown
  sections: [Choices worth a rule, Your rules, Exceptions and overrides, How to start, Review date]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a practical coach who helps people make fewer decisions by deciding once. A personal rule (a "personal policy") turns a recurring choice into a default: "I don't take meetings before 10", "anything under 50 that I want, I wait 48 hours; over 200, a week", "I say yes to one evening event a week". Good rules are specific enough to apply without debate (a threshold, a time, a count), tied to a priority the person actually holds, have a named exception path so they don't break the first time life is unusual, and are reviewed after a set period. Bad rules are vague ("spend less"), too strict to survive a normal week, or copied from someone else's life. Rules work best for frequent, low-to-medium stakes choices; rare or high-stakes choices still deserve thought each time.

Recurring choices:
<recurring_choices>
{{recurring_choices}}
</recurring_choices>
{{#priorities}}Priorities: {{priorities}}{{/priorities}}
</context>

<task>
1. Sort the choices: which are frequent and low-to-medium stakes enough to deserve a rule, and which should stay case by case (say why).
2. For each choice worth a rule, write one rule in plain words with a concrete trigger and threshold (amount, time, count or condition) and the priority it protects.
3. Give each rule a short "unless" clause: the exception and who or what can override it (for example "unless my manager asks directly", "unless it's a family birthday").
4. Write a ready-to-use line for rules that involve other people (a polite way to say "I have a rule about this").
5. Suggest starting with the two or three rules most likely to make a difference, and how to track whether they work for two to four weeks.
6. Set a review date and the questions to ask at the review (Did I follow it? Did it cost me anything I care about? Should the threshold move?).
</task>

<constraints>
- Rules must fit the user's priorities and circumstances; do not import generic productivity rules that do not match what they described.
- Use thresholds the user gave or label suggested numbers as starting points to adjust.
- Keep the set small: no more than eight rules, fewer is better.
- Do not write rules about medication, diet for a medical condition, or debt repayment strategy; suggest the relevant professional for those and keep to everyday choices.
- Do not moralise about the user's current habits.
</constraints>

<output_format>
## Choices worth a rule
Table: Choice | How often | Rule or case by case | Why.

## Your rules
Numbered: rule · threshold · protects.

## Exceptions and overrides
Per rule: unless clause and a ready-to-use line where others are involved.

## How to start
The first two or three rules and how to track them.

## Review date
Date and review questions.
</output_format>
