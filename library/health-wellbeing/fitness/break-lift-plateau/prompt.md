---
schema: 1
id: break-lift-plateau
kind: prompt
title: Break a plateau on one lift
description: Diagnoses why one lift such as the bench, squat or deadlift has stalled and prescribes a 4-6 week block of variations, volume and technique fixes, ending in a retest.
category: fitness
version: 1.0.0
status: incubating
stage: [plan, review]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [plateau, strength-training, sticking-point, bench-press, squat, deadlift]
pairs_with:
  prompts: [calculate-training-loads, track-fitness-progress, check-exercise-form]
  personas: [fitness-coach]
args:
  - name: lift
    description: The lift that has stalled, for example "bench press", "back squat", "overhead press".
    type: string
    required: true
  - name: stall_details
    description: Your recent best sets and how long they have not moved, for example "stuck at 80 kg x 5 for 7 weeks".
    type: text
    required: true
  - name: current_programme
    description: How you train this lift now - days per week, sets, reps, how hard - and the other lifts in the week.
    type: text
    required: true
  - name: where_it_fails
    description: Where the rep gets stuck or breaks down, for example "slows just off the chest", "hips shoot up out of the hole", "fine off the floor, fails at the knees". Optional.
    type: text
  - name: recovery
    description: Sleep, bodyweight trend (gaining, steady, dieting), stress and other training. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is it a real plateau, Likely causes, The block, Weekly sessions for the lift, Retest and what next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strength coach who has seen many stalled lifts. Most stalls have ordinary causes: a calorie deficit or short sleep, a beginner's add-weight-every-session plan that has simply run out, training the lift once a week, grinding near-maximal sets every session, or too little volume to drive further adaptation. Technique and a specific weak point matter more as lifters get stronger. The fix is usually one or two deliberate changes held for 4–6 weeks, not a new programme every fortnight.

Lift: {{lift}}
Stall: {{stall_details}}
Current programme: {{current_programme}}
{{#where_it_fails}}Where it fails: {{where_it_fails}}{{/where_it_fails}}
{{#recovery}}Recovery: {{recovery}}{{/recovery}}
</context>

<task>
1. Is it a real plateau? A stall is no progress in load or reps at a given load for about three weeks or more with consistent training. Two bad sessions are not a plateau. If they are dieting for weight loss, say that holding strength in a deficit is a reasonable outcome and adjust expectations.
2. Rank the likely causes using their inputs, with the evidence for each: recovery (sleep, deficit, stress); programme (frequency, weekly sets, always training at maximal effort, progression model outgrown); technique and sticking point. Name what is missing from their inputs and how it changes the diagnosis.
3. Use the sticking point if given. Common patterns (heuristics, not rules): bench slow off the chest → paused bench, wider-grip work, chest and front-shoulder volume; bench fails at lockout → close-grip bench, triceps volume; squat stuck out of the hole or hips rise first → pause squats, tempo squats, front squats for upper back and quads; deadlift slow off the floor → paused or deficit deadlifts, leg drive cues; deadlift fails at the knees or lockout → Romanian deadlifts, upper back and hip work. If no sticking point is given, say how to find one (film a heavy set from the side).
4. Build a 4–6 week block that changes only one or two things:
   - frequency: train the lift or a close variation two to three times a week if currently once;
   - structure: one heavier day (a top set of 1–5 reps at RPE 7–8, then back-off sets) and one volume day (3–5 sets of 5–8 at 2–3 reps in reserve);
   - one main variation for the weak point, plus one or two accessories for the limiting muscles;
   - progression rule per week, and a lighter final week before the retest.
5. Show the weekly sessions for this lift only, so they can slot them into the rest of their week. Say what to reduce elsewhere if total fatigue would rise too much.
6. Retest: how to test (a rep-out at the old stalled weight, or a top set at a fixed RPE, rather than a max single) and what to do with each result: progress means continue; no change means look again at recovery and technique, or get a coach to watch.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not prescribe exact kilograms; use RPE, reps in reserve or percentages of a recent estimated max.
- If the stall comes with pain, numbness, or a joint that clicks painfully, say the pain comes first: stop loading that movement heavily and see a physiotherapist or doctor. Do not write a heavier block around pain.
- No supplements, drugs or extreme diets. If the cause is a deficit, say so plainly without prescribing a diet.
- Keep accessory lists short; do not rebuild their whole programme.
- If the lift or stall details are missing, ask for them.
</constraints>

<output_format>
## Is it a real plateau
Two to four lines.
## Likely causes
Numbered, most likely first, each with the evidence from their inputs.
## The block
Bullets: length, what changes, the variation and accessories, the progression rule.
## Weekly sessions for the lift
Table: Week | Day | Exercise | Sets × reps | Effort.
## Retest and what next
How to test, then what to do for each outcome.
</output_format>
