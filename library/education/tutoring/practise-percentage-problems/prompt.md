---
schema: 1
id: practise-percentage-problems
kind: prompt
title: Practise percentage problems
description: Tutors percentage problems (percent of, percent change, reverse percentages, repeated change) with the multiplier method and real contexts like discounts, pay rises and interest.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [mathematics]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [percentages, multipliers, reverse-percentages, percentage-change, compound-growth, discounts]
pairs_with:
  prompts: [practise-ratio-and-proportion, set-up-word-problem, practise-estimation-and-sense-checking]
  personas: [math-tutor]
args:
  - name: topic
    description: Which type to practise. mixed builds from percent of an amount up to reverse and repeated change.
    type: enum
    enum: [percent-of, percent-change, reverse, repeated-change, mixed]
    default: mixed
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
  - name: calculator
    description: Whether the learner may use a calculator. Without one, numbers are chosen to be workable by hand.
    type: boolean
    default: true
output_contract:
  format: markdown
  sections: [Results, Method card, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learner wants to get confident with percentages. Topic: {{topic}}. Calculator allowed: {{calculator}}.

Percentages cause more everyday mistakes than almost any other school topic. The classic errors: taking a reverse percentage off the new price (a price after a 20% rise is 120%, so divide by 1.2; taking 20% off gives the wrong original), adding successive percentage changes (a 10% rise then a 10% fall is a 1% loss, not zero), dividing by the new value when finding percentage change (change is always over the original), confusing percentage points with percent, and mixing up 0.5% with 0.5. The multiplier method fixes most of these: every change becomes "multiply by one number" (a 15% increase is x1.15, a 15% decrease is x0.85, n years of 3% growth is x1.03^n), and reversing a change means dividing by the same multiplier.
</context>

<task>
1. Show the method card once:
   - Percent of an amount: multiplier = percent / 100.
   - Increase by p%: multiply by (1 + p/100). Decrease by p%: multiply by (1 − p/100).
   - Percentage change = (new − original) / original x 100.
   - Reverse: original = new / multiplier.
   - Repeated change: multiply the multipliers; n equal changes give multiplier^n.
   - Sense-check: is the answer bigger or smaller than the start, and should it be?
2. Set {{problems}} problems one at a time, growing in difficulty, in real contexts: sale prices, VAT or sales tax (say the rate is an example, not a specific country's rate), pay rises, population or price growth, savings interest, test score changes, exam marks out of a total. If no calculator, use friendly numbers.
3. For each problem, first ask the learner to write the multiplier (or say what the original is) before any calculation. Then ask for the calculation and the answer with units or currency.
4. Check each step. If wrong, name the slip (wrong base, added percentages, divided by the wrong value, multiplier for increase used for decrease) and let them retry. Then show the working in two or three lines.
5. Include at least one problem that tempts each classic error for the chosen topic, and one percentage points versus percent question if the topic is mixed.
6. Close with the summary.
</task>

<constraints>
- Work out every answer yourself before setting it and state rounding (for example to the nearest cent or 2 decimal places).
- One problem per message; never show the working before the learner has tried.
- Do not present a specific tax rate, interest rate or salary figure as current fact for any country; label figures as examples.
- Keep to percentages; if the learner asks for ratio sharing or algebra, say it is a different session and offer to continue here.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the situation and what to find.

At the end:
## Results
| Problem | Type | Correct? | Slip |
## Method card
The rules above in five lines, plus the learner's personal watch-out.
## Next practice
Two problems aimed at the slip they made most, answers hidden until asked.
</output_format>
