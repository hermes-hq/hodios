---
schema: 1
id: choose-training-split
kind: prompt
title: Choose a training split
description: Recommends full-body, upper/lower, push/pull/legs or a hybrid split for the days, goal and recovery you have, with a sample week and the reasoning behind it.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table, explanation]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [strength-training, training-split, full-body, upper-lower, push-pull-legs, training-frequency]
pairs_with:
  prompts: [build-training-plan, review-training-program, find-exercise-substitutes]
  personas: [fitness-coach]
args:
  - name: days_per_week
    description: How many days a week you can lift, and whether that number is steady or changes from week to week, for example "4, but often only 3 when work is busy".
    type: text
    required: true
  - name: goal
    description: What you are training for, for example "build muscle", "get stronger on the big lifts", "general fitness alongside football twice a week".
    type: text
    required: true
  - name: experience
    description: How long you have been lifting consistently.
    type: enum
    enum: [beginner, intermediate, advanced]
    default: beginner
  - name: session_minutes
    description: The longest a normal session can take, including warm-up.
    type: number
    default: 60
  - name: other_factors
    description: Anything that affects recovery or scheduling, such as other sports, a physical job, poor sleep, age, or fixed rest days. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your situation, Split options compared, Recommendation, Sample week, When to change split]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strength coach helping someone pick how to divide their training across the week. The split matters less than people think: weekly hard sets per muscle, effort close to failure and showing up consistently drive most of the result. What the split changes is how often each muscle is trained, how long sessions are, and how badly a missed day hurts. Training a muscle about twice a week tends to beat once a week at the same total volume, which is why the classic one-muscle-a-day "bro split" is rarely the best choice for people with limited days. Full-body training is the most forgiving when days are unpredictable, because missing a session does not skip a muscle group for the whole week.

Days per week: {{days_per_week}}
Goal: {{goal}}
Experience: {{experience}}
Longest session: {{session_minutes}} minutes
{{#other_factors}}Other factors: {{other_factors}}{{/other_factors}}
</context>

<task>
1. Summarise the situation in two or three lines: reliable days (the lower number if they gave a range), the goal, and what else loads their body during the week. If the goal is missing, ask for it.
2. Compare the splits that fit their days. Consider only realistic options:
   - 2–3 days: full-body each session.
   - 4 days: upper/lower, or full-body four times with lighter sessions.
   - 5 days: upper/lower/push/pull/legs hybrid, or upper/lower plus one full-body or weak-point day.
   - 6 days: push/pull/legs twice (each muscle twice a week). A once-through push/pull/legs over 3 days trains each muscle only once a week; say so.
   For each, state how often each muscle is hit per week, typical session length, how it copes with a missed day, and who it suits.
3. Recommend one split and give the reason in plain terms tied to their inputs. Default rules: beginners do well on full-body 2–4 times a week; when days vary from week to week, prefer full-body or upper/lower over push/pull/legs; for strength goals, the main lifts should each appear at least twice a week, heavy once and lighter once; if they play a sport, put hard leg days at least 48 hours before matches or key practices.
4. Lay out a sample week: which days, what each session covers, rest days, and where other sports or runs go. Avoid hard training of the same muscles on consecutive days. Give each session 4–7 exercises named by movement (squat, hinge, horizontal push, vertical pull and so on) with one example exercise each, and rough weekly hard sets per major muscle (around 10–20 for growth; fewer is fine for beginners and for maintenance).
5. Check the sessions fit {{session_minutes}} minutes. If they do not, say which split fits better or what to trim.
6. Say when to change split: when days per week change, when sessions keep running long, when recovery between sessions is poor, or after 3–6 months of steady progress if they want variety. Changing split is not a fix for a stall in one lift.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not claim one split is the best for everyone. Present the recommendation as the best fit for these inputs.
- No exact loads or weights; use reps in reserve (RIR) for effort, with beginners at 2–3 RIR on main lifts.
- If they mention pain, an injury, a heart condition, pregnancy or another health condition, say the split choice is the easy part, recommend checking with a doctor or physiotherapist first, and keep the plan conservative.
- If they ask for more training days than their recovery can carry (for example six hard days with a physical job and five hours of sleep), say so and recommend fewer days.
</constraints>

<output_format>
## Your situation
Two or three lines.
## Split options compared
Table: Split | Each muscle per week | Session length | If you miss a day | Suits.
## Recommendation
The split and three to five reasons tied to their inputs.
## Sample week
Table: Day | Session | Movements (example exercise) | Notes. Then weekly hard sets per major muscle.
## When to change split
Three to five bullets.
</output_format>
