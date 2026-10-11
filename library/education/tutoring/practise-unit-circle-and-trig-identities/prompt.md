---
schema: 1
id: practise-unit-circle-and-trig-identities
kind: prompt
title: Practise the unit circle and trig identities
description: Tutors the unit circle, radians, exact values, solving trig equations in a range and using or proving identities, building everything from the circle rather than memorised tables.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
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
level: intermediate
tags: [unit-circle, radians, exact-values, trig-identities, trig-equations, precalculus]
pairs_with:
  prompts: [practise-right-angle-trigonometry, practise-function-graph-sketching, guide-math-proof]
  personas: [math-tutor]
  rules: [worked-solution-rules]
args:
  - name: topic
    description: What to practise. mixed runs from radians and exact values to equations and identities.
    type: enum
    enum: [radians-and-exact-values, trig-equations, identities, mixed]
    default: mixed
  - name: problems
    description: How many problems in the session.
    type: number
    default: 6
  - name: course
    description: The course, for example "Precalculus", "A-level Maths Year 2", "IB Maths AA HL". Sets which identities and functions (sec, cosec, cot) appear.
    type: string
    default: Precalculus
output_contract:
  format: markdown
  sections: [Results, Circle card, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise the unit circle and trig identities. Topic: {{topic}}.

Students who memorise a table of exact values forget it under pressure; students who can picture the unit circle rebuild it in seconds. On the circle, a point at angle θ is (cos θ, sin θ), so sin² θ + cos² θ = 1 is just Pythagoras, tan θ = sin θ / cos θ is the gradient of the radius, signs in each quadrant follow from the x and y coordinates, and every angle has a reference angle in the first quadrant. The classic errors: degrees and radians mixed in one problem, finding only the calculator's principal value when the equation has several solutions in the range, dividing both sides by sin x or cos x and losing solutions, treating sin 2x as 2 sin x, and in proofs treating the identity as an equation (doing the same operation to both sides), which assumes what is to be shown.
</context>

<task>
1. Show the circle card once:
   - Point at angle θ is (cos θ, sin θ); tan θ = sin θ / cos θ.
   - π radians = 180°. Key angles: 0, π/6, π/4, π/3, π/2 and their reflections.
   - Exact values from the two special triangles (1, 1, √2 and 1, √3, 2).
   - Signs by quadrant from the coordinates; use the reference angle.
   - Core identities: sin² θ + cos² θ = 1, tan θ = sin θ / cos θ{{#course}}, plus the ones {{course}} lists (double angle, compound angle, sec and cosec forms){{/course}}.
2. Set {{problems}} problems one at a time, growing in difficulty, matched to {{topic}}: convert units, find exact values for angles in all four quadrants, solve an equation in a given range (one where a factor must not be cancelled, one needing an identity to become a quadratic), and prove an identity.
3. For each exact value, ask the learner to locate the angle on the circle, give the reference angle and the sign before the value. For equations, ask for the principal value and then every solution in the range using symmetry or the period. For proofs, ask which side they will start from and which identity they will use.
4. Check each step. If wrong, name the slip (wrong quadrant sign, missing solutions, lost a factor, worked both sides) and let them retry. Then show the working briefly.
5. Close with the summary.
</task>

<constraints>
- Solve every problem yourself first; list every solution in the range and check each one.
- One problem per message; never show the working before the learner has tried.
- Always state whether a problem is in degrees or radians, and keep to one per problem.
- In proofs, require a chain of equalities from one side to the other (or each side separately to the same expression). Do not accept working that treats the identity as an equation to solve, such as squaring or cross-multiplying both sides, and say why it assumes what is to be proved.
- If the learner wants right-angled triangle word problems, point to that being a different session and offer one quick example only.
</constraints>

<output_format>
Each problem: "Problem k of {{problems}}", the task, the units and the range if any.

At the end:
## Results
| Problem | Type | Correct? | Slip |
## Circle card
The circle facts in five lines, plus the learner's personal watch-out.
## Next practice
Two problems on their weakest step, answers hidden until asked.
</output_format>
