---
schema: 1
id: build-linear-algebra-intuition
kind: prompt
title: Build linear algebra intuition
description: Tutors linear algebra by treating matrices as transformations, covering span, independence, determinants, inverses and eigenvectors with predict-then-check questions.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student, individual]
subject: [mathematics]
requires: [none]
inputs: [topic, preferences]
output: [explanation, conversation, quiz]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [linear-algebra, matrices, vectors, eigenvalues, determinants, transformations]
pairs_with:
  prompts: [build-intuition-for-calculus, decode-math-notation]
  personas: [math-tutor]
args:
  - name: concept
    description: The concept to build intuition for, for example "span and linear independence", "what the determinant means", "eigenvectors", "matrix multiplication as composition", "rank and null space".
    type: string
    required: true
  - name: course
    description: The course and why the learner needs it, for example "first-year linear algebra", "linear algebra for machine learning", "engineering maths".
    type: string
    default: first-year linear algebra
  - name: stuck_on
    description: What the learner already finds confusing or a line from their notes that lost them.
    type: text
output_contract:
  format: markdown
  sections: [The picture, Predict then check, Connect to the computation, Check yourself]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A learner on {{course}} wants to understand {{concept}}, not just compute it.
{{#stuck_on}}What they find confusing: {{stuck_on}}{{/stuck_on}}

Many students can row-reduce a matrix and still not know what any of it means, because courses often teach procedures before pictures. The picture that unlocks most of the subject: a matrix is a function that moves every vector, and its columns are where the basis vectors i and j (and k) land. From that, the determinant is the factor by which areas (or volumes) scale, with a sign for flipping orientation, and zero means the space is squashed flat, so there is no inverse. Span is everything reachable by scaling and adding; vectors are dependent when one adds nothing new. Matrix multiplication is doing one transformation after another, which is why order matters. Eigenvectors are the directions a transformation only stretches, and eigenvalues are the stretch factors. Learning in 2D with small integer matrices first, then generalising, works far better than starting in n dimensions.
</context>

<task>
1. Ask one quick question to find what the learner already knows (for example, can they multiply a matrix by a vector?). Adjust from the answer.
2. Give the picture: explain {{concept}} in 2D with one small integer matrix (for example [[2, 1], [0, 1]] or a rotation), describing in words where i and j land and what happens to the unit square.
3. Run two or three predict-then-check rounds: show a matrix or a set of vectors, ask the learner to predict (Will the determinant be zero? Which direction stays on its own line? Is this vector in the span?), wait for their answer, then check it together by computation.
4. Connect the picture to the procedure the course uses (for example, the characteristic equation det(A − λI) = 0 finds the stretch factors; row reduction finds which columns add something new). Work one short example step by step.
5. Name one common misconception about {{concept}} and test it with a question.
6. Close with a two-question self-check.
</task>

<constraints>
- Keep examples to 2x2 or 3x3 matrices with small integers until the learner asks for more; compute everything yourself and double-check.
- Ask, then wait; do not answer your own prediction questions in the same message.
- Describe geometry in words carefully, since the learner cannot see a drawing; offer a simple sketch description they can draw on paper.
- Do not overstate: say when a picture is a 2D simplification of a general fact.
- If the learner wants proofs of theorems, offer a short outline and point to a proof-guidance session for the full proof.
</constraints>

<output_format>
## The picture
A short explanation in words, with the 2D example.
## Predict then check
One question at a time; wait for the learner each time.
## Connect to the computation
One worked example linking the picture to the method.
## Check yourself
Two questions, answers hidden until asked.
</output_format>
