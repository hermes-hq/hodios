---
schema: 1
id: practise-differentiation-rules
kind: prompt
title: Practise differentiation rules
description: Drills derivatives with the power, product, quotient and chain rules, having the learner name the function's structure and the rule before differentiating, then simplify.
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
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [derivatives, chain-rule, product-rule, quotient-rule, differentiation, ap-calculus]
pairs_with:
  prompts: [build-intuition-for-calculus, practise-function-graph-sketching]
  personas: [math-tutor]
  rules: [worked-solution-rules]
args:
  - name: rules
    description: Which rules to drill. mixed combines them, including functions that need two rules.
    type: enum
    enum: [power, product, quotient, chain, implicit, mixed]
    default: mixed
  - name: problems
    description: How many functions in the session.
    type: number
    default: 8
  - name: course
    description: The course, for example "AP Calculus AB", "A-level Maths", "Calculus I". Sets which functions (trig, exponential, log, inverse trig) appear.
    type: string
    default: Calculus I
output_contract:
  format: markdown
  sections: [Results, Rule chooser, Next practice]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} wants to drill differentiation. Rules: {{rules}}.

Differentiation errors are rarely about not knowing a rule; they are about misreading the function's structure. Experts first ask "what is the last operation I would do if I evaluated this?" A product of two functions needs the product rule; a function of a function needs the chain rule; sin²(3x) is (sin(3x))², a chain inside a chain. Typical slips: forgetting the inner derivative in the chain rule, writing (fg)' = f'g', getting the quotient rule's subtraction in the wrong order, differentiating e^(2x) as e^(2x) without the 2, treating a constant like π² or e³ as a variable, and not rewriting roots and fractions as powers before using the power rule. Rewriting first (√x as x^(1/2), 3/x² as 3x^(−2)) avoids many quotient-rule slogs.
</context>

<task>
1. Show the rule chooser once:
   - Rewrite roots and simple fractions as powers.
   - Find the last operation: sum, constant multiple, product, quotient or composition.
   - Power: (x^n)' = n x^(n−1). Product: (uv)' = u'v + uv'. Quotient: (u/v)' = (u'v − uv') / v². Chain: (f(g(x)))' = f'(g(x)) x g'(x).
   - Standard derivatives for the course (sin, cos, e^x, ln x and so on).
   - Simplify and factor the answer.
2. Set {{problems}} functions one at a time, growing in difficulty, matched to {{rules}}: single-rule warm-ups, then functions needing two rules, then one in context (a rate of change or a gradient at a point).
3. For each function, ask the learner to name the structure and the rule (or rules) before differentiating. For the chain rule, ask them to name the outer and inner functions.
4. Check their derivative. If wrong, name the slip (missing inner derivative, wrong sign order in the quotient rule, constant treated as variable) and let them retry. Then show the working in a few lines and a simplified answer.
5. Every few functions, ask for the gradient at a specific point to keep a link to meaning.
6. Close with the summary.
</task>

<constraints>
- Differentiate every function yourself before setting it and check the answer carefully, including simplification.
- One function per message; never show the derivative before the learner has tried.
- Accept equivalent forms of a correct answer; say they are equivalent and show the simplified form.
- Only include functions the course covers; ask if unsure whether inverse trig or implicit differentiation is in scope.
- If the learner asks why the rules work, give a short intuition and point to a calculus-intuition session for more.
</constraints>

<output_format>
Each function: "Function k of {{problems}}" and f(x) = ...

At the end:
## Results
| Function | Structure | Rule(s) | Correct? | Slip |
## Rule chooser
Five lines, plus the learner's personal watch-out.
## Next practice
Three functions targeting their slip, answers hidden until asked.
</output_format>
