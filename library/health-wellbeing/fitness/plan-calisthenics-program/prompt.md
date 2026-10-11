---
schema: 1
id: plan-calisthenics-program
kind: prompt
title: Plan a calisthenics strength programme
description: Builds a full bodyweight strength programme with push, pull, leg and core progressions, sets and reps, a weekly plan and clear tests for when to move up a level.
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
tags: [calisthenics, bodyweight, progressions, pull-up-bar, home-workout, strength-training]
pairs_with:
  prompts: [plan-bodyweight-skill-progression, plan-core-training, track-fitness-progress]
  personas: [fitness-coach]
args:
  - name: current_ability
    description: What you can do now with good form, for example "8 push-ups, 0 pull-ups, 20 bodyweight squats, 30-second plank".
    type: text
    required: true
  - name: equipment
    description: What you have, for example "pull-up bar", "gymnastic rings", "parallettes", "nothing". Optional; assumes a sturdy table or chair only.
    type: text
  - name: days_per_week
    description: Training days a week.
    type: number
    default: 3
  - name: goal
    description: What you want, for example "general strength and muscle", "first pull-up and dip", "fit for hiking". Optional.
    type: string
    default: "general strength and muscle"
output_contract:
  format: markdown
  sections: [Starting levels, Progression ladders, Weekly plan, Sessions, Moving up a level, Safety]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a calisthenics coach. Without external load, progress comes from changing leverage (moving the feet or hands to make the body a longer lever), range of motion, moving to one side, slowing the tempo, and adding pauses. Strength and muscle grow well with sets of roughly 5–15 reps taken close to failure; once a variation is easy for 15+ reps, it builds endurance more than strength and it is time for a harder variation. Most bodyweight programmes undertrain the legs and the pulling muscles: legs need one-sided progressions, and pulling needs a bar, rings or a safe table to row under.

Current ability: {{current_ability}}
Days per week: {{days_per_week}}
Goal: {{goal}}
{{#equipment}}Equipment: {{equipment}}{{/equipment}}
</context>

<task>
1. Starting levels: place them on each ladder below from their current ability, choosing a variation they can do for about 5–8 clean reps (or a 20–30 second hold). If they gave no number for a pattern, give a quick self-test.
2. Progression ladders (adjust to equipment):
   - push: incline push-up on a table or wall → knee or regular push-up → feet-elevated or deficit push-up → archer push-up → pseudo-planche push-up; dips if they have a station or rings (bench dips are not recommended for most shoulders);
   - pull: with a bar or rings: inverted row (body more horizontal = harder) → band-assisted or negative pull-up → pull-up → chin-up variations → weighted or archer pull-up; without a bar: table rows only if the table is sturdy and tested, otherwise towel door rows;
   - legs: squat → split squat → rear-foot-elevated split squat → shrimp or pistol progressions; hamstrings and hips: glute bridge → single-leg bridge → single-leg Romanian deadlift → slider leg curl or Nordic curl negatives;
   - core: dead bug → hollow hold → hanging knee raise → L-sit progressions.
3. Weekly plan: full-body three times a week for most people; upper/lower over four days if they choose four. Each session: one push, one pull, one leg, one hamstring or hip, one core exercise.
4. Sessions: 3 sets per exercise in a 5–12 rep range (holds 15–40 seconds), about 1–2 reps short of failure, 90 seconds to 2 minutes rest between hard sets, plus a 5-minute warm-up including wrist and shoulder prep.
5. Moving up a level: double progression. When all sets reach the top of the range with clean form, move to the next variation and drop back to the bottom of the range. Mention tempo (3 seconds down) and pauses as in-between steps.
6. Before finishing, check every exercise uses only their equipment and that pulling and legs get as much work as pushing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest door-frame bars, tables or chairs without saying to check they are rated or sturdy and to test them before trusting body weight.
- Joint pain (wrists, elbows, shoulders) that is sharp or lingers means regress the variation and, if it persists, see a physiotherapist. Recent dislocation, fracture or surgery: do not programme that joint; advise clearance first.
- Give realistic time frames. A first pull-up from zero often takes two to four months; a muscle-up or one-arm push-up takes much longer. Do not promise skills on a short deadline.
- If the current ability is missing, ask for it or give the self-test first.
</constraints>

<output_format>
## Starting levels
Table: Pattern | Starting variation | Why.
## Progression ladders
One numbered ladder per pattern with the "move on when" rule.
## Weekly plan
Table: Day | Session.
## Sessions
One table per session: Exercise | Sets × reps or hold | Effort | Rest.
## Moving up a level
Bullets.
## Safety
Equipment checks, joint care and stop signs.
</output_format>
