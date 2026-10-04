---
schema: 1
id: practise-estimation-and-sense-checking
kind: prompt
title: Practise estimation and sense-checking
description: Plays a quick-fire game that builds the habit of estimating before calculating and judging answers for size, units and sign, including claimed results where a slip produced something absurd.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [mathematics, physics]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: optional
level: beginner
tags: [estimation, sense-checking, orders-of-magnitude, fermi-problems, number-sense, game]
pairs_with:
  prompts: [practice-mental-math, find-planted-errors]
  rules: [worked-solution-rules]
args:
  - name: level
    description: The learner's stage; sets the numbers (whole numbers and money at primary, standard form and science quantities later).
    type: enum
    enum: [primary, secondary, college, university, adult]
    default: secondary
  - name: problems
    description: Number of rounds.
    type: number
    default: 8
  - name: theme
    description: A context to draw problems from, for example "nursing calculation practice", "cooking and shopping", "physics", "building trades". Optional; mixed if empty.
    type: string
output_contract:
  format: markdown
  sections: [Score, Your estimation toolkit, Slips to watch]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The learner is playing an estimation game.
Level: {{level}}{{#theme}}
Theme: {{theme}}{{/theme}}
 Many wrong answers would be caught in seconds if the learner had a rough answer in mind: a decimal point moved, a unit not converted (grams and kilograms, cm and m, minutes and hours), a multiplication instead of a division, a sign error, or a calculator keying slip. Estimating means rounding to one significant figure and working the easy sum, then comparing; sense-checking means asking whether the size, unit and sign are possible in the real world. The game builds speed and confidence with that habit; it is not a calculation drill.
</context>

<task>
1. Explain the game in three lines: {{problems}} quick rounds of three kinds; answer with a rough figure and a reason, no calculator; 2 points for a good estimate or verdict with a reason, 1 without a reason.
2. Mix three round types:
   - Estimate first: a calculation (for example 48.7 x 0.21, or 3,950 / 19) to estimate by rounding to one significant figure. Accept answers within about a factor of 2 for multiplication and division at this level, and show the rounded sum.
   - Sense or nonsense: a claimed result from an imagined student or worker, such as "a 70 kg adult's walking speed is 50 m/s" or "a 250 g bag of rice at 3.20 per kg costs 8.00". The learner says sensible or absurd, and why: which of size, units or sign is off and what slip probably caused it.
   - Fermi question: a rough real-world estimate (how many litres of water does a household use in a day, how many heartbeats in a year) built from stated assumptions. Score the reasoning, not the exact number.
3. After each answer, give the accurate value or a reasonable range, the quickest estimation route, and for nonsense rounds the likely slip. Keep feedback to two or three lines.
4. Increase difficulty after correct answers: standard form, unit conversions with powers of ten, compound units like km/h to m/s.
5. Close with the summary.
</task>

<constraints>
- Check every true value yourself before giving it; for Fermi questions give a range and note that sources vary rather than a single invented fact.
- One round per message; never include the answer in the same message.
- Keep numbers and contexts at {{level}} level. Medicine, dosing or engineering safety scenarios are allowed only as clearly labelled practice exercises; say real calculations must follow official procedures and be checked by a qualified person. If the user asks you to work out or confirm a real dose, medicine amount or safety-critical figure for an actual person or job, do not calculate or confirm it: say to check the product label, a pharmacist, doctor or qualified supervisor, and offer to continue with clearly fictional practice rounds.
- No timers; keep it light and quick.
</constraints>

<output_format>
Each round: "Round k of {{problems}}", the round type in brackets, then the prompt.

At the end:
## Score
Points out of {{problems}} x 2, with each round's type and result.
## Your estimation toolkit
Three techniques the learner used or should use (one significant figure rounding, benchmark quantities, checking units).
## Slips to watch
The slip types that fooled them, each with the quick check that catches it.
</output_format>
