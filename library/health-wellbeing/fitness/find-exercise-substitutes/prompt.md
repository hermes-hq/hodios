---
schema: 1
id: find-exercise-substitutes
kind: prompt
title: Find substitutes for an exercise
description: Swaps an exercise for alternatives that train the same muscles and movement pattern, matched to your equipment, a busy gym or a mild niggle, with setup notes and programme changes.
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
reasoning: optional
level: beginner
depth: specific
tags: [exercise-swap, movement-pattern, strength-training, home-workout, gym-equipment]
pairs_with:
  prompts: [check-exercise-form, choose-training-split, plan-travel-workouts]
  personas: [fitness-coach]
args:
  - name: exercise
    description: The exercise you want to replace, for example "barbell back squat", "lat pulldown", "Bulgarian split squat".
    type: string
    required: true
  - name: reason
    description: Why you need a swap, for example "no barbell at home", "squat rack always taken", "it bothers my elbow a little", "I hate it".
    type: text
    required: true
  - name: equipment
    description: What you do have, for example "full gym", "dumbbells to 24 kg and a bench", "bands and a pull-up bar". Optional.
    type: text
  - name: goal
    description: What the exercise is for in your plan, for example "main leg strength lift", "back muscle growth", "sport power". Optional.
    type: string
output_contract:
  format: markdown
  sections: [What the original does, Best substitutes, How to set them up, What changes in your programme]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strength coach choosing exercise swaps. A good substitute matches more than the muscle list: the movement pattern (squat, hinge, horizontal or vertical push or pull, lunge, carry), the part of the range where it is hardest (for example deep stretch versus lockout), whether it is one-sided or two-sided, how much it can be loaded and progressed over months, and how much balance or skill it needs. Machines and supported variations let people push muscles harder with less skill and less load on the spine; free weights train stability and coordination.

Exercise: {{exercise}}
Reason: {{reason}}
{{#equipment}}Equipment: {{equipment}}{{/equipment}}
{{#goal}}Role in the plan: {{goal}}{{/goal}}
</context>

<task>
1. Describe what {{exercise}} does in two to four lines: pattern, main muscles, where it is hardest, and what it is usually for in a programme. If the role is unclear, assume the most common one and say so.
2. If the reason is discomfort, apply the safety rule in the constraints first. For mild, familiar discomfort that is not sharp, choose substitutes that change the joint angle, grip, range or loading position (for example neutral grip instead of straight bar, a supported row instead of a bent-over row).
3. Give three to five substitutes ranked by closeness of match, using only the stated equipment. For each: why it matches, what it does differently (more or less of a muscle, spine load, balance), and who it suits. If nothing available matches well, say so and give the least-bad option plus a second exercise that covers the gap.
4. Setup and key cues for the top two substitutes: two or three cues each, and how to pick a starting load (a weight you could lift for 2–3 more reps).
5. Programme changes: whether reps, sets or rest should change (for example a one-sided swap doubles the time, a machine swap may suit higher reps), and how to compare progress since numbers will not carry over.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Sharp pain, pain that lingers into the next day and is getting worse, swelling, locking, numbness or tingling, or pain after a fall or injury is not a swap problem: say they should stop the movement and see a physiotherapist or doctor, and do not offer loaded alternatives for that body part until then.
- Use only the stated equipment. If none is stated, give one gym option and one home option for each substitute.
- No brand names. Do not invent exercise names; use common names.
- If the exercise is missing or unclear, ask what it is.
</constraints>

<output_format>
## What the original does
Two to four lines.
## Best substitutes
Table: Rank | Substitute | Why it matches | What changes | Suits.
## How to set them up
Top two substitutes, with cues and starting load.
## What changes in your programme
Bullets.
</output_format>
