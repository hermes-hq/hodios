---
schema: 1
id: set-smart-goals
kind: prompt
title: Set SMART goals
description: Turns vague intentions into a few SMART goals - specific, measurable, achievable, relevant, time-bound - with outcome and effort measures, checkpoints and a check that they fit your week.
category: habits
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, student, manager, job-seeker]
requires: [none]
inputs: [topic, preferences, text]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [smart-criteria, goal-writing, measurable-targets, checkpoints]
pairs_with:
  prompts: [set-woop-goals, design-habit-plan, run-daily-accountability-check-in]
  personas: [productivity-coach]
args:
  - name: intentions
    description: What you want to achieve, in your own words, however vague - for example "get fitter, read more, sort out my finances, be a better manager".
    type: text
    required: true
  - name: context
    description: Optional - time frame, hours per week you can give, where you are starting from, and anything that limits you.
    type: text
output_contract:
  format: markdown
  sections: [Starting point, SMART goals, Measures, Checkpoints, Load check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SMART (specific, measurable, achievable, relevant, time-bound) is the most common goal format and the most commonly misused. Typical errors: a measure that is easy to count but not what matters (pages read rather than understanding), a goal entirely outside the person's control (get promoted) with no controllable effort goal beside it, "achievable" set by optimism rather than by the person's actual track record and hours, and five goals that each look fine but together need more time than the person has. Good goal setting pairs an outcome measure with an effort measure the person controls, sets checkpoints before the deadline, and adds up the weekly load.

<intentions>
{{intentions}}
</intentions>
{{#context}}
Context:
<context_details>
{{context}}
</context_details>
{{/context}}
</context>

<task>
1. Note the starting point for each intention from what the user said; where it is missing, ask for it in one short list of questions, then continue with stated assumptions so the user can correct them.
2. Ask why each intention matters in one line if it is not obvious, and drop or merge intentions that serve the same purpose. Recommend at most three goals at once and say which to park.
3. Rewrite each kept intention as a SMART goal in one sentence. Check each letter explicitly, and fix the usual errors: add a controllable effort goal beside any outcome the person does not fully control; make "achievable" match their starting point and hours.
4. For each goal, give an outcome measure, an effort measure, how and how often to record it, and the minimum version for a bad week.
5. Set checkpoints (for example at a quarter and halfway) with what "on track" looks like and what to adjust if not.
6. Add up the weekly hours the goals need and compare them to the hours available. If they do not fit, say which goal to shrink or delay.
</task>

<constraints>
- Use the person's own aims; do not add goals they did not mention.
- Do not invent their starting point; label assumptions.
- For health, weight, diet or money goals, keep targets general and moderate, suggest checking medical or financial specifics with a professional, and do not set extreme targets.
- If anything suggests an eating disorder, self-harm or crisis, set the exercise aside, respond with care, and point to a doctor or local crisis line.
</constraints>

<output_format>
## Starting point
Bulleted list per intention; assumptions marked.

## SMART goals
Numbered list: the goal sentence, then a one-line check of each letter.

## Measures
Table: Goal | Outcome measure | Effort measure | Record how and when | Bad-week minimum.

## Checkpoints
Table: Date or week | On track looks like | If not, adjust.

## Load check
Hours needed per week against hours available, and what to shrink or park.
</output_format>
