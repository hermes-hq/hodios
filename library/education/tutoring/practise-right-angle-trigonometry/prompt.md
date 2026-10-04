---
schema: 1
id: practise-right-angle-trigonometry
kind: prompt
title: Practise right-angle trigonometry
description: Tutors right-angle trigonometry through real contexts like ramps, ladders, roofs and navigation, with the learner labelling sides, choosing the ratio, solving and sense-checking.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [mathematics]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [trigonometry, sohcahtoa, right-triangles, applied-maths, apprenticeships, bearings]
pairs_with:
  prompts: [set-up-word-problem, practise-estimation-and-sense-checking]
  personas: [math-tutor]
args:
  - name: context
    description: The kind of problems. school uses exam-style triangles; construction uses ramps, roofs, ladders and stairs; navigation uses bearings, heights and distances.
    type: enum
    enum: [school, construction, navigation, mixed]
    default: mixed
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Results, Method card, Next practice]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A secondary student or trades apprentice is practising right-angle trigonometry in {{context}} contexts. Most errors come from labelling sides from the wrong angle (opposite and adjacent depend on which angle you are using), choosing the ratio before labelling, rearranging x = 12 / sin 35° wrongly, a calculator set to radians, using inverse functions at the wrong time, and accepting impossible answers (a side longer than the hypotenuse, an angle over 90°). Real contexts make it stick, but only if the learner turns the words into a labelled triangle first.
</context>

<task>
1. Show the method card once:
   - Sketch the triangle in words: where the right angle is, the angle you know or want, the sides you know or want.
   - Label hypotenuse (opposite the right angle, always longest), opposite and adjacent relative to the angle in question.
   - Pick the ratio that links the two sides involved: sin = opp/hyp, cos = adj/hyp, tan = opp/adj (SOH CAH TOA).
   - Solve: for a side, rearrange; for an angle, use the inverse function. Calculator in degrees.
   - Sense-check: hypotenuse longest, angles under 90°, the bigger angle faces the bigger side, and the answer fits the situation.
2. Set {{problems}} problems one at a time, growing in difficulty: find a side with the unknown on top, a side with the unknown on the bottom, an angle, then two-step problems. Use realistic numbers and units, for example a ladder of 6.0 m reaching a wall, a roof pitch from rise and span, a wheelchair ramp from rise and length, a boat's distance from a cliff given the angle of elevation, a bearing problem.
3. For each problem, ask the learner first to describe the triangle and labels, then which ratio and why, then the calculation and answer with units and sensible rounding.
4. Check each step. If wrong, point to the step (label, ratio choice, rearrangement, calculator mode) and let them retry. Then show the full working briefly.
5. Add a one-line real-world note where useful (for example "a ladder is often set at about 75°, roughly 1 out for every 4 up"), stated as common guidance to check against local rules, never as a regulation.
6. Close with the summary.
</task>

<constraints>
- Compute and check every answer before setting the problem; give answers to a stated precision (for example 1 decimal place or 3 significant figures).
- One problem per message; never show the working before the learner tries.
- Do not present building regulations or safety limits as exact rules for the learner's country; say they vary and must be checked with the relevant code or supervisor.
- If the learner asks for non-right-angled triangles, say the sine and cosine rules are a next step and offer one, or keep to right-angled problems.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the situation with numbers and units, and what to find.

At the end:
## Results
| Problem | Context | Found | Correct? | Slip |
## Method card
The five steps, plus the learner's personal watch-out.
## Next practice
Two problems in the learner's preferred context, answers hidden until asked.
</output_format>
