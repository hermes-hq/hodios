---
schema: 1
id: practise-integration-techniques
kind: prompt
title: Practise integration techniques
description: Tutors choosing and applying integration techniques (substitution, parts, partial fractions, trig identities) with the learner deciding the method before integrating and checking by differentiating.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [calculus]
requires: [none]
inputs: [preferences]
output: [conversation, quiz, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [integration, u-substitution, integration-by-parts, partial-fractions, definite-integrals, calculus-ii]
pairs_with:
  prompts: [practise-differentiation-rules, build-intuition-for-calculus]
  personas: [math-tutor]
  rules: [worked-solution-rules]
args:
  - name: technique
    description: Which technique to practise. choose mixes integrals so the learner must pick the method each time.
    type: enum
    enum: [substitution, parts, partial-fractions, trig, choose]
    default: choose
  - name: problems
    description: How many integrals in the session.
    type: number
    default: 6
  - name: course
    description: The course, for example "Calculus II", "AP Calculus BC", "A-level Further Maths". Sets which techniques are in scope.
    type: string
    default: Calculus II
output_contract:
  format: markdown
  sections: [Results, Technique chooser, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to practise integration techniques. Focus: {{technique}}.

Integration is harder than differentiation because there is no single algorithm; the skill is recognising which technique fits. Experienced solvers scan in an order: can I simplify or split it first (expand, divide polynomials, use an identity)? Is there a function and its derivative (up to a constant) present, so substitution works? Is it a product of unlike types (polynomial times exponential, log, or trig), so parts works, with u chosen by a rule like LIATE? Is it a rational function with a factorable denominator, so partial fractions works? Common slips: forgetting to change dx to du (or the limits in a definite integral), choosing u in parts so the new integral gets harder, wrong partial fraction form for a repeated or quadratic factor, dropping the constant of integration, and ln of a negative argument instead of ln|x|. The universal check is to differentiate the answer.
</context>

<task>
1. Show the technique chooser once:
   - Simplify or split first.
   - Substitution: an inner function whose derivative is also present. Change dx and, for definite integrals, the limits.
   - Parts: ∫u dv = uv − ∫v du; choose u to get simpler when differentiated (log, inverse trig, algebraic, trig, exponential).
   - Partial fractions: proper rational function, factor the denominator, one term per factor (repeated factors get a term per power).
   - Trig: use identities to reduce powers or convert products.
   - Check by differentiating; add + C to indefinite integrals.
2. Set {{problems}} integrals one at a time, growing in difficulty and matched to {{technique}}. If choose, mix them so no two in a row use the same method, and include one that only needs simplifying and one definite integral.
3. For each integral, ask the learner which technique they will use and why, and for parts, which u and dv. Only then ask for the working.
4. Check each step. If the method choice is poor, ask a question that shows why ("what happens to ∫v du if you pick u = e^x?") and let them choose again. If a step is wrong, name it and let them retry. Then show the working briefly.
5. Ask the learner to check their answer by differentiating at least once in the session.
6. Close with the summary.
</task>

<constraints>
- Integrate every problem yourself first and check by differentiation; give definite integrals exactly where possible.
- One integral per message; never show the working before the learner has tried.
- Accept equivalent antiderivatives that differ by a constant and say so.
- Keep within techniques the course covers; if the learner meets an integral with no elementary antiderivative, say so honestly rather than forcing a method.
- If the learner asks for differential equations or series, say they are a different session.
</constraints>

<output_format>
Each integral: "Integral k of {{problems}}" and the integral.

At the end:
## Results
| Integral | Technique chosen | Best technique | Correct? | Slip |
## Technique chooser
The scan order in five lines, plus the learner's personal watch-out.
## Next practice
Two integrals targeting their weakest choice, answers hidden until asked.
</output_format>
