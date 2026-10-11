---
schema: 1
id: plan-core-training
kind: prompt
title: Plan core training
description: Plans core training around anti-extension, anti-rotation, side bending and carries, with progressions, sets and where to fit it into the sessions you already do.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [core-strength, anti-rotation, plank, loaded-carries, abs]
pairs_with:
  prompts: [plan-calisthenics-program, check-exercise-form, choose-training-split]
  personas: [fitness-coach]
args:
  - name: goal
    description: Why you want core work, for example "stronger for lifting", "support for running", "stop feeling weak in my midsection", "visible abs".
    type: text
    required: true
  - name: current_training
    description: What you do now and on which days, so core work can slot in. Optional.
    type: text
  - name: equipment
    description: What you have, for example "full gym", "a mat and a band", "one kettlebell". Optional.
    type: text
  - name: level
    description: How hard core work feels now, for example "can hold a plank 20 seconds", "do hanging leg raises easily". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What your core needs, Exercise menu, Progressions, Weekly placement, Form cues and stop signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strength coach programming core work. The trunk's main job in sport and lifting is to resist unwanted movement and pass force between the legs and arms: resisting the lower back arching (anti-extension), resisting twisting (anti-rotation), resisting side bending (anti-lateral flexion), and holding position under load (carries). Bending movements such as crunches and leg raises are fine for healthy people despite internet fears and add useful variety. Two facts people often miss: heavy squats and deadlifts train the trunk a lot, but not every direction; and visible abs depend mostly on body fat, not on core exercises, because fat cannot be lost from one spot.

Goal: {{goal}}
{{#current_training}}Current training: {{current_training}}{{/current_training}}
{{#equipment}}Equipment: {{equipment}}{{/equipment}}
{{#level}}Current level: {{level}}{{/level}}
</context>

<task>
1. What your core needs: translate the goal into the categories that matter most. If the goal is visible abs or a flat stomach, say honestly that this depends on body fat, that spot reduction does not work, and that core training still builds the muscles underneath.
2. Exercise menu: two or three options per category, using their equipment:
   - anti-extension: dead bug, plank, ab wheel or stability-ball rollout;
   - anti-rotation: Pallof press, bird dog, one-arm plank or row;
   - anti-lateral flexion: side plank, suitcase carry, one-arm farmer's carry;
   - flexion and hip flexion: crunch, reverse crunch, hanging knee or leg raise;
   - carries: farmer's, suitcase or front-rack carry.
3. Progressions for each category: make the lever longer, reduce the base of support, add load, slow down, or lengthen the hold. Give a "move on when" test (for example, three clean 30-second side planks a side). Long holds beyond about 60 seconds are not the goal; make the exercise harder instead.
4. Weekly placement: two or three short core blocks a week, 2–3 exercises from different categories, 2–3 sets each, placed at the end of existing sessions (or as a 10-minute stand-alone). Avoid hard core work right before heavy squats or deadlifts.
5. Form cues and stop signs: two cues per main exercise (for example, ribs down and lower back steady in the dead bug; hips square in the Pallof press).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Back pain that radiates down a leg, comes with numbness, tingling or weakness, or follows a fall, needs a doctor or physiotherapist before core training; do not frame core exercises as a back pain treatment.
- During pregnancy, after birth, or with a visible bulge down the middle of the stomach when sitting up, say core work should be guided by their midwife, doctor or a pelvic health physiotherapist.
- No sit-up challenges or daily high-rep routines; quality over volume.
- If the goal is missing, ask for it.
</constraints>

<output_format>
## What your core needs
Two to four lines.
## Exercise menu
Table: Category | Exercises | Equipment.
## Progressions
One short ladder per category with a "move on when" test.
## Weekly placement
Table: Day | Core block | Sets × reps or time.
## Form cues and stop signs
Bullets.
</output_format>
