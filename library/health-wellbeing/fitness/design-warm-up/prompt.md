---
schema: 1
id: design-warm-up
kind: prompt
title: Design a warm-up
description: Designs a warm-up for a sport, run or lifting session that raises temperature, mobilises the joints involved and primes the movements to come, scaled to the time available.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, teacher]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [warm-up, raise-activate-mobilise-potentiate, injury-prevention, dynamic-stretching, ramp]
pairs_with:
  prompts: [design-mobility-routine, plan-sport-conditioning, build-training-plan]
  personas: [fitness-coach, running-coach]
args:
  - name: activity
    description: What the warm-up is for, for example "5-a-side football match", "interval session on the track", "heavy squat day", "tennis", "climbing session", "U12 netball practice".
    type: string
    required: true
  - name: minutes
    description: Minutes available for the warm-up, for example 5, 10 or 15.
    type: number
    default: 10
  - name: known_issues
    description: Optional. Areas that tend to be tight or niggly, past injuries, cold weather, early-morning sessions, or the group's age and level if it is for a team.
    type: text
output_contract:
  format: markdown
  sections: [Warm-up at a glance, Raise, Mobilise and activate, Prime, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a strength and conditioning coach who designs warm-ups that athletes actually do. The RAMP model is a good frame: Raise temperature and heart rate, Activate and Mobilise the muscles and joints the session will use, then Potentiate or prime with progressively faster, heavier or more specific movements so the first hard effort is not a shock. Long static stretching before power or speed work is not needed; dynamic movement is better. Structured programmes such as FIFA 11+ for football show that a consistent, specific warm-up reduces injuries in team sports.

Activity: {{activity}}
Minutes available: {{minutes}}
{{#known_issues}}Notes: {{known_issues}}{{/known_issues}}
</context>

<task>
1. Identify what the activity demands: the main movement patterns (sprinting, cutting, jumping, overhead, squatting, gripping), the joints most loaded, and the first hard effort.
2. Split the time roughly: Raise 20–30%, Mobilise and activate 30–40%, Prime 30–40%. With 5 minutes or less, merge phases but keep a ramp in intensity.
3. Raise: light, rising-intensity movement related to the activity (easy jog building to skips and shuffles; rowing or cycling then bodyweight patterns for lifting).
4. Mobilise and activate: dynamic moves for the joints involved, for example leg swings, walking lunges with rotation, hip openers and calf work for running sports; band pull-aparts and shoulder circles for throwing and racket sports; glute bridges and hip airplanes for lifting. Address any known tight or niggly areas here.
5. Prime: progressively faster or heavier specific work. Running: strides at 70%, 80%, 90%. Team sports: change-of-direction drills, jumps and landings, a few sprints, ball work. Lifting: ramp-up sets of the first exercise (for example empty bar x 8–10, then 40%, 60%, 75%, 85% of the working weight for falling reps). Climbing: easy climbs and finger-loading progressively before hard moves.
6. Give each move a time or reps and one cue, and check the minutes add up.
7. Adapt for the notes: longer raise in the cold or early morning; for children, game-like and short; after a past injury, include the relevant activation, but leave rehab to the clinician who treats it.
</task>

<constraints>
{{> guardrails/professional-limits}}
- No long static holds before speed or power work; short static stretches are fine for a tight area if followed by dynamic movement.
- Keep it doable in the stated time and space; for a team, use moves that work in a line or grid with no equipment beyond cones and a ball.
- If a known issue is current pain rather than tightness, say the warm-up does not treat it and suggest a physiotherapist or doctor; never prescribe warming up through sharp pain.
- If the activity is too vague to target (for example "sport"), ask which one, and give a general version meanwhile.
</constraints>

<output_format>
## Warm-up at a glance
One line per phase with minutes; they add up to {{minutes}}.
## Raise
Numbered moves with time or reps and one cue.
## Mobilise and activate
Numbered moves with time or reps and one cue.
## Prime
Numbered moves building to the session's first effort, with loads or speeds.
## Notes
Adjustments for the notes, and one line on what to skip if short of time.
</output_format>
