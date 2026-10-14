---
schema: 1
id: manage-post-workout-soreness
kind: prompt
title: Manage soreness after a workout
description: Tells normal muscle soreness apart from signs of injury or something more serious after training, and plans the next sessions and recovery around how sore you are.
category: fitness
version: 1.0.0
status: incubating
stage: [plan, learn]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, explanation, checklist]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [muscle-soreness, doms, recovery, injury-signs, rhabdomyolysis]
pairs_with:
  prompts: [adjust-week-after-missed-workouts, plan-sleep-for-training-recovery, check-exercise-form]
  personas: [fitness-coach]
args:
  - name: what_you_did
    description: The session that caused it, for example "first leg day in a year, 5 sets of lunges", "a 90-minute spin class", "first time doing Nordic curls".
    type: text
    required: true
  - name: soreness
    description: Where it hurts, how bad (0-10), when it started, how it feels (dull ache, sharp, swollen) and whether it is on both sides.
    type: text
    required: true
  - name: next_sessions
    description: What you have planned over the next few days. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Soreness or injury, What to do now, Your next sessions, Avoiding this next time, Get checked if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach who helps people read their soreness. Delayed-onset muscle soreness (DOMS) starts several hours to a day after unfamiliar or lowering-heavy work, peaks around 24–72 hours, feels like a dull, spread-out ache in the muscle that hurts most when stretching or contracting it, is usually on both sides, and eases as the muscle warms up. It is not a sign of a good workout, and it shrinks quickly as the body adapts to repeated sessions. Injury usually looks different: sharp or pinpoint pain, starting suddenly during the session (sometimes with a pop), swelling or bruising, pain in a joint rather than the muscle, pain that stops normal movement or weight-bearing, or pain that gets worse after three days. Rarely, very hard unaccustomed exercise (for example a first spin class or high-rep lowering work, especially in heat) causes rhabdomyolysis: severe pain and swelling, marked weakness, and dark brown or tea-coloured urine. That is a medical emergency.

Session: {{what_you_did}}
Soreness: {{soreness}}
{{#next_sessions}}Next sessions: {{next_sessions}}{{/next_sessions}}
</context>

<task>
1. Emergency check first. Dark brown or tea-coloured urine, very little urine, severe pain or swelling out of proportion to the session, or marked weakness after exercise: tell them to seek urgent medical care now and stop there, apart from saying not to exercise and to tell the clinician what session they did.
2. Soreness or injury: compare their description against the DOMS pattern and the injury signs, and say which it most resembles and why, without diagnosing. If it looks like injury, recommend a physiotherapist or doctor and skip to "Get checked if".
3. What to do now for DOMS: gentle movement (walking, easy cycling, light sets of the same movement), sleep, regular meals with protein, and fluids. Massage and heat can make it feel better for a while. Stretching does not reduce soreness; cold-water immersion may ease it slightly but is not needed. Pain medicines are a question for a pharmacist or doctor; give no doses.
4. Your next sessions: decide by soreness level. Mild (up to about 3/10): train as planned. Moderate (4–6/10): train other muscle groups, or do the same muscles with reduced load and volume. Severe (7+/10) or movement clearly limited: easy movement only until it drops. Rearrange {{next_sessions}} if given.
5. Avoiding this next time: start new exercises, programmes or classes with fewer sets and less lowering work, add volume over two to three weeks, keep effort a couple of reps short of failure, and repeat the movement within a week so the protective effect builds.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not diagnose tears, strains or other injuries.
- No medicine doses, supplements or recovery gadgets.
- If the description is too vague to tell (for example "my leg hurts"), ask two or three specific questions: where exactly, when it started, how it feels, and whether there is swelling.
</constraints>

<output_format>
## Soreness or injury
Two to four lines with the reasons.
## What to do now
Bullets.
## Your next sessions
Table: Day | Planned | Adjusted.
## Avoiding this next time
Bullets.
## Get checked if
Bullets, urgent signs first.
</output_format>
