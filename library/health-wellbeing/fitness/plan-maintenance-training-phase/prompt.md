---
schema: 1
id: plan-maintenance-training-phase
kind: prompt
title: Plan a maintenance training phase
description: Plans the minimum training that keeps strength and fitness through a busy spell such as exams, a new baby, a work crunch or travel season, and how to ramp back up after.
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
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [maintenance, minimum-effective-dose, busy-schedule, strength-training, detraining]
pairs_with:
  prompts: [adjust-week-after-missed-workouts, plan-return-to-training, plan-travel-workouts]
  personas: [fitness-coach]
args:
  - name: current_training
    description: What you do now in a normal week, for example "4 gym sessions upper/lower plus 2 runs, about 25 km".
    type: text
    required: true
  - name: disruption
    description: What is coming and for how long, for example "final exams for 8 weeks", "new baby due next month", "quarter-end crunch for 6 weeks".
    type: text
    required: true
  - name: time_available
    description: What you can realistically keep, for example "two 30-minute slots a week, maybe a walk at lunch".
    type: text
    required: true
  - name: priorities
    description: What you most want to keep, for example "my squat and deadlift", "running fitness", "just feeling energetic". Optional.
    type: text
output_contract:
  format: markdown
  sections: [What you can keep, Minimum weekly dose, Sessions, If a week falls apart, Coming back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a coach planning a deliberate holding pattern. Fitness is easier to keep than to build. Research on detraining suggests strength and muscle can be largely maintained for months with about one-third of normal training volume, as long as the sets stay hard and heavy enough; one or two sessions a week often do it. Endurance fades faster than strength, but keeping some intensity (one harder session a week) while cutting frequency and duration holds most of it. A few weeks of full rest costs little; months of nothing cost more. The aim is to protect intensity, cut volume, and make the plan small enough to survive the busy spell.

Current training: {{current_training}}
Disruption: {{disruption}}
Time available: {{time_available}}
{{#priorities}}Priorities: {{priorities}}{{/priorities}}
</context>

<task>
1. Say plainly what can be kept with the time available and what will drift (for example: strength mostly kept; long-run endurance will drop somewhat and return in a few weeks). If the time is genuinely zero for a few weeks, say that is fine and plan the restart instead.
2. Set the minimum weekly dose, matched to their priorities:
   - strength: one or two full-body sessions, one or two hard sets of each main movement at about 1–2 reps in reserve, keeping loads close to normal;
   - endurance: one session with some intensity (for example short intervals or a tempo block) and, if possible, one easy session; drop the long session or shorten it;
   - general health: daily walking or other easy activity counts and is worth protecting.
3. Write the sessions to fit {{time_available}}, with a short warm-up, the exercises or run, sets, reps or time, and effort. Give a 15-minute emergency version of each.
4. Add rules for weeks that fall apart: skip without guilt, never double up, and if two weeks are missed, do one easier week before returning to the maintenance sessions.
5. Plan the way back: when the disruption ends, a first week at about 60–70% of their old volume, then build over two to four weeks. Say what signs show they are ready to progress again.
6. If the disruption involves a new baby, note sleep deprivation: keep intensity moderate on the worst nights, and if they gave birth themselves, say the return to exercise after birth should follow postnatal guidance and clinician clearance, not this plan.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not promise zero loss; give honest ranges in plain words.
- Keep sessions within the stated time. Do not add sessions they did not say they could do.
- No exact loads; use reps in reserve or effort descriptions relative to their normal training.
- If the disruption is an illness, injury or surgery, say training through it needs advice from their doctor or physiotherapist and plan only the general structure.
</constraints>

<output_format>
## What you can keep
Two to four lines.
## Minimum weekly dose
Bullets.
## Sessions
One table per session: Exercise or block | Sets × reps or time | Effort. Then the 15-minute version.
## If a week falls apart
Three or four rules.
## Coming back
A short week-by-week ramp.
</output_format>
