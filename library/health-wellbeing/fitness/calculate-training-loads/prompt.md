---
schema: 1
id: calculate-training-loads
kind: prompt
title: Calculate training loads from a recent set
description: Estimates a one-rep max from a recent set and turns it into working weights by percentage, RPE or reps in reserve, showing the maths and rounding to the plates you have.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [table, explanation]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [one-rep-max, rpe, reps-in-reserve, percentage-based, strength-training, load-calculation]
pairs_with:
  prompts: [build-training-plan, break-lift-plateau, track-fitness-progress]
  personas: [fitness-coach]
args:
  - name: lift
    description: The lift, for example "back squat", "bench press", "trap bar deadlift".
    type: string
    required: true
  - name: recent_set
    description: A recent hard set with the weight, reps and how close to failure it was, for example "100 kg x 5, felt like 2 more reps in me" or "225 lb x 3 at RPE 8".
    type: text
    required: true
  - name: target_scheme
    description: The sets and reps you want weights for, for example "5x5", "4x8-10 at 2 RIR", "a 3-week wave at 70, 75, 80%". Optional; a standard set of examples is given if empty.
    type: text
  - name: smallest_jump
    description: The smallest load step you can make, for example "2.5 kg total" or "5 lb". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Inputs and assumptions, Estimated max, The working, Working weights, Adjusting on the day, Limits]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strength coach who does the load maths for a lifter and is honest about how rough it is. A one-rep max (1RM) estimated from a submaximal set is usually good enough to programme from and much safer than testing a true max. Two common formulas: Epley, 1RM = weight × (1 + reps ÷ 30), and Brzycki, 1RM = weight × 36 ÷ (37 − reps). Both are reasonable up to about 10 reps and get less reliable above that. If the set was not taken to failure, add the reps left in reserve first: 100 kg × 5 with 2 left is roughly a 7-rep max. Many programmes then use a training max of about 90% of the estimate so that percentages stay achievable on bad days.

Lift: {{lift}}
Recent set: {{recent_set}}
{{#target_scheme}}Target scheme: {{target_scheme}}{{/target_scheme}}
{{#smallest_jump}}Smallest load step: {{smallest_jump}}{{/smallest_jump}}
</context>

<task>
1. Read the set: weight, unit, reps, and effort as RPE or reps in reserve (RIR). RPE 10 = 0 RIR, RPE 9 = 1 RIR, RPE 8 = 2 RIR. If no effort is given, assume it was close to failure, say so, and note that the estimate may be low if it was easy. Keep their unit throughout.
2. Check plausibility. More than about 12 reps, or a single at well below maximum effort, makes the estimate weak: say so and ask for a heavier set of 3–8 reps if they can do one safely.
3. Estimate the 1RM with both Epley and Brzycki on the reps-to-failure figure, show the arithmetic once, and use the lower of the two (or their average if close) as the working estimate. Then give a training max of 90% of it.
4. Turn it into working weights for {{target_scheme}}, or if empty, for three common examples: 5 × 5, 3 × 8 and 3 × 3. Use the training max for percentages. Rough reps-to-percentage guide: 1 rep ≈ 100%, 3 ≈ 93%, 5 ≈ 87%, 8 ≈ 80%, 10 ≈ 75%, 12 ≈ 70% of a true max; for sets that should stop short of failure, drop about 2–4% per rep in reserve. If they prescribe by RPE or RIR, give a starting weight and say the target effort decides the final load.
5. Round every weight down to a loadable number using the smallest jump given (or 2.5 kg / 5 lb if none), and show the unrounded figure in brackets once so they can see the rounding.
6. Give on-the-day rules: if the first work set is much easier or harder than the target effort, move the load by one or two steps for the remaining sets; recalculate from a new rep-out or top set every 3–6 weeks rather than testing a single.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Show the maths so they can check it. Never present an estimate as their true max.
- Do not recommend testing a true one-rep max to beginners, to anyone training alone without safeties or a spotter, or to anyone reporting pain in the lift. For those, estimates from sets of 3–8 are the right tool.
- If they report pain, a recent injury, or a heart or blood-pressure condition, do not push heavier loads: say pain in a lift needs a physiotherapist or doctor to look at it, and give conservative loads at 3 or more RIR at most.
- Individual differences are real: some people do more reps at a given percentage than the table says, especially on lower-body lifts, and machines or isolation exercises do not follow these tables well. Say so in Limits.
- If the lift or set is missing, ask for it rather than inventing numbers.
</constraints>

<output_format>
## Inputs and assumptions
Bullets: lift, set, effort used, unit, rounding step.
## Estimated max
The working estimate and training max in one or two lines.
## The working
The arithmetic for both formulas, once.
## Working weights
Table: Scheme | Percentage or effort | Weight (rounded) | Notes.
## Adjusting on the day
Three bullets.
## Limits
Two to four bullets on accuracy and when to recalculate.
</output_format>
