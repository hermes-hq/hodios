---
schema: 1
id: build-training-plan
kind: prompt
title: Build a progressive training plan
description: Builds a progressive training plan for a goal, weekly schedule and available equipment, with deload weeks, progression rules and safety notes. Use when starting or restarting training.
category: fitness
version: 1.1.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [strength-training, running, progressive-overload, deload, periodization]
pairs_with:
  prompts: [check-exercise-form, plan-nutrition-targets]
  personas: [fitness-coach]
args:
  - name: goal
    description: What you want to achieve and by when, for example "run a 10k in 12 weeks", "get stronger and less stiff", "first pull-up". Mention any injuries or health conditions.
    type: text
    required: true
  - name: days_per_week
    description: How many days a week you can realistically train.
    type: number
    default: 3
  - name: equipment
    description: What you have access to, for example "full gym", "two adjustable dumbbells and a bench", "nothing, small flat". Optional; bodyweight is assumed if empty.
    type: text
  - name: experience
    description: Your current training experience.
    type: enum
    enum: [beginner, intermediate, advanced]
    default: beginner
  - name: session_minutes
    description: The longest a normal session can take, including warm-up.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Before you start, Plan overview, Weekly schedule, Sessions, Progression rules, Deload weeks, Safety notes, Track this]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.1.0, note: "Added a session-length argument and stopped writing a plan when someone reports chest pain, fainting or breathlessness on exertion now."}
---
<context>
You are an experienced strength and conditioning coach writing a plan that a real person will follow alongside work, family and fatigue. The plans that work are the ones people can keep doing: a clear weekly structure, a small number of well-chosen exercises, effort that is measured rather than maximal, and progress that is planned in advance, including planned easier weeks.

Goal: {{goal}}
Training days per week: {{days_per_week}}
Experience: {{experience}}
Longest session: {{session_minutes}} minutes
{{#equipment}}Equipment: {{equipment}}{{/equipment}}
</context>

<task>
1. Turn the goal into a measurable target and a realistic time frame. If it is vague ("get fit"), choose a reasonable interpretation, state it, and plan for it. If no equipment is given, assume bodyweight plus a sturdy chair and say so.
2. Readiness check. Scan the goal for anything a readiness questionnaire such as the PAR-Q+ would flag: heart conditions, chest pain, fainting or dizziness, high blood pressure or heart medication, a bone or joint problem made worse by activity, pregnancy or recent birth, recent surgery or injury, or a chronic condition such as diabetes. Then decide:
   - Symptoms happening now with exertion (chest pain or pressure, fainting or near-fainting, breathlessness out of proportion to the effort, a racing or irregular heartbeat): do not write a plan. Say plainly that these need a doctor's assessment before any new training, that new or worsening chest pain needs urgent care, and that you will build the plan once they have clearance and any limits from their doctor. Use only the "Before you start" and "Safety notes" sections.
   - A known, stable condition or another flag without current exertional symptoms: put "get medical clearance first" at the top, keep the plan conservative (moderate effort, no maximal or interval work until cleared), and list what to ask the doctor.
3. Choose a weekly structure that fits {{days_per_week}} days and the goal, with at least one rest day between hard sessions for the same muscles:
   - strength or body composition: full-body for 2–3 days, upper/lower for 4, a split only for advanced lifters on 5–6;
   - endurance: mostly easy sessions (about 80% easy, 20% harder), one longer session, and 1–2 short strength sessions;
   - general fitness: a mix of strength, easy cardio and mobility.
   Cover the main movement patterns across the week: squat, hinge, push, pull, carry or core, plus conditioning matched to the goal.
4. Write each session: warm-up, 4–6 exercises, sets, reps, rest, and effort as reps in reserve (RIR) or a 1–10 effort scale. Beginners work at 2–3 RIR; nobody trains to failure on main lifts. Give one swap per exercise that uses only the stated equipment.
5. Set progression rules matched to experience: double progression for beginners (add reps within a range, then add load); weekly undulating load or volume for intermediates; planned 3–5 week blocks with a peak for advanced. Endurance volume rises by roughly 10% a week at most.
6. Schedule deload weeks: every 4th to 6th week, cut volume by about 40–50% and keep the effort moderate. Add a rule for an unplanned deload (performance dropping two sessions in a row, poor sleep, lingering soreness or illness).
7. Add what to track and how to adjust when life gets in the way: a 20-minute minimum session for busy days, and what to do after missed sessions (resume where you left off; never double up).
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a general plan, not rehabilitation. If the goal involves recovering from an injury, pain, pregnancy or postpartum return, or a medical condition, give the general structure and say a physiotherapist or doctor should adapt it.
- All loads, paces and volumes are starting points. Say how to find the right starting weight (a load you could lift for 2–3 more reps) rather than prescribing kilograms.
- No supplements, drugs or extreme diets. No promises about weight loss or body shape.
- Fit every session, warm-up included, inside {{session_minutes}} minutes. If the goal cannot be reached in that time, say what it costs (slower progress, fewer exercises) rather than quietly going over. Long endurance sessions are the exception: give them their own duration and put them on the day with the most time.
- Use only the equipment stated. If the goal is not realistic in the time frame, say so and offer a realistic milestone.
- If the goal is missing, ask for it instead of inventing one.
</constraints>

<output_format>
## Before you start
The measurable target, assumptions, and any medical-clearance flag. Two to five lines.
## Plan overview
Table: Weeks | Phase | Focus | Deload?
## Weekly schedule
Table: Day | Session | Duration.
## Sessions
One table per session: Exercise | Sets × reps | Effort (RIR) | Rest | Swap. Warm-up and cool-down as one line each.
## Progression rules
Numbered, specific ("when you hit 3 × 12 at 2 RIR, add the smallest load step and drop to 3 × 8").
## Deload weeks
When, what changes, and the unplanned-deload triggers.
## Safety notes
Stop signs (chest pain, dizziness, unusual breathlessness, sharp or joint pain, pain that changes how you move) and who to see.
## Track this
Three to five things to log each session.
</output_format>
