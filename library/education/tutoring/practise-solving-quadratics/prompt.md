---
schema: 1
id: practise-solving-quadratics
kind: prompt
title: Practise solving quadratic equations
description: Tutors solving quadratic equations by factorising, completing the square and the quadratic formula, with the learner choosing the method and checking the roots.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [algebra]
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
depth: specific
tags: [quadratic-equations, factorising, completing-the-square, quadratic-formula, discriminant, roots]
pairs_with:
  prompts: [practise-rearranging-formulas, practise-function-graph-sketching, hint-through-problem]
  personas: [math-tutor]
  rules: [worked-solution-rules]
args:
  - name: method
    description: Which method to practise. choose mixes equations so the learner must pick the best method each time.
    type: enum
    enum: [factorising, completing-the-square, formula, choose]
    default: choose
  - name: problems
    description: How many equations in the session.
    type: number
    default: 6
  - name: course
    description: The course or exam, for example "GCSE Higher", "Algebra 1", "IB Maths SL". Sets depth and whether complex roots appear.
    type: string
    default: GCSE Higher
output_contract:
  format: markdown
  sections: [Results, Method chooser, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise solving quadratic equations. Method focus: {{method}}.

Students who can run each method still lose marks in predictable places: not rearranging to "= 0" before factorising, dividing both sides by x and losing the root x = 0, sign errors with −b and with b² when b is negative, forgetting to divide every term by a before completing the square, taking only the positive square root, and stopping at a decimal when the question wanted exact surd form. Strong students also choose well: factorise when the numbers are friendly, use the formula when they are not, complete the square when the question asks for a turning point or exact form, and glance at the discriminant b² − 4ac to know how many real roots to expect before starting.
</context>

<task>
1. Show the method chooser once, briefly:
   - Rearrange to ax² + bx + c = 0. Take out any common factor first, including x.
   - Check the discriminant b² − 4ac: positive gives two real roots, zero gives one repeated root, negative gives no real roots{{#course}} (complex roots only if {{course}} covers them){{/course}}.
   - Friendly integers and a perfect-square discriminant: try factorising.
   - Otherwise use x = (−b ± √(b² − 4ac)) / 2a, or complete the square if asked for exact form or the turning point.
   - Check by substituting each root back into the original equation.
2. Set {{problems}} equations one at a time, growing in difficulty: simple factorising, a ≠ 1, an equation that needs rearranging first, one with surd answers, one with no real roots, and one in context (area of a rectangle, a projectile height) where a root must be rejected.
3. For each equation, ask the learner first which method they will use and why, then for the working step by step. If {{method}} is a single method, still ask them to state the discriminant first.
4. Check each step. If wrong, point to the exact slip (sign of −b, lost root, forgot ±, did not divide by a) and let them retry. Then show the full working briefly.
5. For context problems, ask which root makes sense and why.
6. Close with the summary.
</task>

<constraints>
- Solve every equation yourself before setting it and double-check each root by substitution.
- One equation per message; never give the working before the learner has tried.
- Give exact answers in simplified surd form when the roots are irrational, plus decimals to 3 significant figures if the course expects them.
- Do not accept a correct final answer reached by guessing without working; ask how they got it, kindly.
- If the learner asks for simultaneous equations or inequalities, say they are a different session and offer one quadratic inequality only if the course covers it.
</constraints>

<output_format>
Each equation: "Equation k of {{problems}}" and the equation or context.

At the end:
## Results
| Equation | Method chosen | Correct? | Slip |
## Method chooser
Five lines, plus the learner's personal watch-out.
## Next practice
Two equations aimed at their weakest step, answers hidden until asked.
</output_format>
