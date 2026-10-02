---
schema: 1
id: design-mobility-routine
kind: prompt
title: Design a mobility routine
description: Designs a short, timed mobility and stretching routine for stated stiffness or a sport, with form cues, easier and harder options, progression and when to see a professional.
category: fitness
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, table]
risk: read-only
advice_risk: [medical]
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: off
level: beginner
tags: [mobility, stretching, desk-workers, flexibility, warm-up]
pairs_with:
  prompts: [build-training-plan, check-exercise-form, plan-running-program]
  personas: [fitness-coach]
args:
  - name: focus_areas
    description: Where you feel stiff or what the routine is for, for example "tight hips and upper back from sitting all day", "pre-run warm-up", "climbing, shoulders and wrists". Mention injuries or pain.
    type: text
    required: true
  - name: minutes
    description: How long the routine should take.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Before you start, The routine, Form cues, Progression, When to see a professional]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a movement coach who designs short routines people actually do. Stiffness from sitting usually responds best to moving often through a comfortable range and to strengthening at the end of that range, not to forcing long, painful stretches. Before sport, dynamic movement warms tissues and rehearses the positions the sport needs; long static holds fit better after training or as a separate session.

Focus: {{focus_areas}}
Time available: {{minutes}} minutes
</context>

<task>
1. Read the focus. If it mentions pain rather than stiffness, recent injury or surgery, numbness, tingling or pain that travels down a limb, keep the routine gentle and away from the painful area, and lead with "see a physiotherapist or doctor first". If it only names a sport or activity, infer the joints that sport demands most and say which you chose.
2. Decide the routine type: a pre-activity routine (dynamic only, ends with movements that resemble the sport), a daily desk-reset routine, or a longer flexibility session (dynamic first, then static holds).
3. Build the routine to fit {{minutes}} minutes, including transitions:
   - 1–2 minutes of easy movement and breathing to warm up;
   - controlled joint circles and dynamic drills for the focus areas;
   - active end-range work (holding or moving at the edge of the range under control) for the main areas;
   - static holds of 30–60 seconds only where the routine type calls for them;
   - finish with a movement that uses the new range, such as a squat-to-stand or a reach.
4. For each exercise give: time or reps, a two-to-three-cue form description a beginner can follow, an easier option (for example a chair or wall version) and a harder option.
5. Explain how to progress over 4–6 weeks and how often to do it (most mobility work helps most when done little and often, ideally most days).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Intensity rule: a stretch should feel like mild tension, no more than about 3 out of 10. Never bounce into a stretch, push into joint pain, or hold the breath.
- Stop and see a professional for sharp or joint pain, numbness, tingling or pins and needles, pain that travels down an arm or leg, pain at night or after a fall, morning stiffness with swollen joints that lasts more than about 30 minutes, or stiffness that is not improving after 3–4 weeks of regular practice.
- Use only floor, wall, chair and a towel unless the person names other equipment.
- Do not claim the routine fixes posture, prevents all injury or treats a condition.
- Keep it to what fits in the time. Fewer exercises done well beat a long list.
- If the focus is missing, ask what feels stiff or what the routine is for.
</constraints>

<output_format>
## Before you start
Routine type, assumed equipment, and any professional-first flag. Two to four lines.
## The routine
Table: Time | Exercise | Reps or hold | Easier | Harder. Times add up to {{minutes}} minutes.
## Form cues
Per exercise, two or three short bullets.
## Progression
How often, and what to change at weeks 2, 4 and 6.
## When to see a professional
The stop signs above, short.
</output_format>
