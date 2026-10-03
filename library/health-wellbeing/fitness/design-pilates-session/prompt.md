---
schema: 1
id: design-pilates-session
kind: prompt
title: Design a mat Pilates session
description: Designs a mat Pilates session for a level, focus and length, with a sequenced flow, set-up and breathing cues, modifications and timings. Use to practise at home or to plan a class.
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
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pilates, core-strength, mat-work, breathing, posture]
pairs_with:
  prompts: [design-yoga-sequence, design-mobility-routine, plan-fitness-class]
  personas: [yoga-instructor]
args:
  - name: level
    description: Pilates experience. Beginner means new to Pilates or returning after a long break.
    type: enum
    enum: [beginner, intermediate, advanced]
    default: beginner
  - name: focus
    description: Optional focus, for example "core and posture", "glutes and hips", "back-friendly", "full body flow", "for runners". Mention pregnancy, recent birth, osteoporosis, back or neck problems. A balanced full-body session is assumed.
    type: string
  - name: minutes
    description: Session length in minutes, for example 20, 45 or 60.
    type: number
    default: 45
output_contract:
  format: markdown
  sections: [Before you start, Session at a glance, Warm-up and centring, Main sequence, Cool-down, Modifications, Stop signs]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a comprehensively trained mat Pilates teacher. A good session follows the method's principles (breath, centring, control, precision, flow), starts with set-up skills before loading them, moves logically through spinal flexion, extension, lateral flexion and rotation, alternates supine, side-lying, prone and kneeling or seated work so nobody spends 20 minutes on their back, and uses a few precise cues rather than a stream of them. Repetitions are low (often 5–10) because quality is the point.

Level: {{level}}
Length: {{minutes}} minutes
{{#focus}}Focus: {{focus}}{{/focus}}
</context>

<task>
1. Screen the focus for pregnancy, recent birth, diastasis recti, osteoporosis or osteopenia, disc problems, recent back or neck injury, or recent abdominal surgery. Adjust the sequence and note it at the top (see constraints). If the person reports current severe or radiating pain, do not program loaded flexion; suggest seeing a physiotherapist and offer only gentle breathing and supported moves.
2. Allocate time: about 10–15% warm-up and centring (breathing, pelvic and rib-cage placement, imprint and neutral, bridging preparation), 70–80% main sequence, 10% cool-down and stretch.
3. Build the main sequence for the level using classical or contemporary repertoire with common names: beginner (hundred preparation with feet down or tabletop, single-leg stretch, spine stretch forward, side-lying leg series, swan preparation, cat-cow, bird-dog, shoulder bridge preparation), intermediate (hundred, roll-up or half roll-back, single and double-leg stretch, criss-cross, saw, side kick series, swan, swimming, side plank on knee), advanced (roll-over, teaser, jackknife-style progressions, corkscrew, full side plank and side bend, swimming, rocking only if appropriate). Sequence so positions change at most every few exercises.
4. Respect the focus: make it the thread through the main sequence, not just one exercise.
5. For each exercise: starting position, the movement in one or two sentences, the breath pattern (for example inhale to prepare, exhale to move), reps, and one key cue.
6. Give a modification and a progression for each main exercise, and say which props help (cushion under the head, small ball, band, block or a wall).
7. Check the timings add up to the session length.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Osteoporosis or osteopenia: no loaded spinal flexion (roll-ups, roll-overs, crunching hundreds, rolling like a ball) and no end-range twisting; favour extension, neutral-spine and side-lying work.
- Pregnancy after the first trimester or with diastasis: avoid prolonged lying flat on the back and strong crunching flexion, use side-lying, seated and four-point kneeling work, and remind them to follow their midwife or doctor's advice. Recent birth: point to a clinician-cleared return and a gentle, pelvic-floor-led start.
- Neck discomfort: keep the head down on the mat or supported.
- Stop signs: sharp pain, pain spreading into a leg, numbness, dizziness, or doming or coning of the abdomen that cannot be controlled.
- If both the level and the focus are missing, design a 45-minute beginner full-body session and say so.
- Use cues an experienced teacher would use, not mystical language.
</constraints>

<output_format>
## Before you start
Props, space, and any screening note.
## Session at a glance
Table: Block | Minutes | Positions. The minutes add up to {{minutes}}.
## Warm-up and centring
Numbered exercises with breath and reps.
## Main sequence
Table: Exercise | Position | How | Breath | Reps | Key cue.
## Cool-down
Numbered stretches with time.
## Modifications
Table: Exercise | Easier | Harder | Props.
## Stop signs
</output_format>
