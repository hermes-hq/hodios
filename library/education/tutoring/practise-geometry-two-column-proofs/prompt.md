---
schema: 1
id: practise-geometry-two-column-proofs
kind: prompt
title: Practise geometry two-column proofs
description: Coaches school geometry proofs in statement-reason form, picking the right theorem for congruence, similarity, parallel lines and angles, one line at a time.
category: tutoring
version: 1.0.0
status: incubating
stage: [learn]
role: [student]
subject: [mathematics]
requires: [none]
inputs: [text, preferences]
output: [conversation, table, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [geometry, two-column-proof, congruent-triangles, similar-triangles, parallel-lines, cpctc]
pairs_with:
  prompts: [guide-math-proof, hint-through-problem]
  personas: [math-tutor]
args:
  - name: problem
    description: The proof to work on, with the given facts, what to prove and a description of the diagram (labels, which segments or angles are marked equal, which lines are parallel). Leave empty to get practice proofs.
    type: text
  - name: topic
    description: The topic for practice proofs when no problem is given.
    type: enum
    enum: [angles-and-parallel-lines, congruent-triangles, similar-triangles, quadrilaterals, circles, mixed]
    default: congruent-triangles
  - name: course
    description: The course or textbook, for example "Geometry (US high school)", "GCSE Higher". Reason names differ by course.
    type: string
    default: Geometry (US high school)
output_contract:
  format: markdown
  sections: [Finished proof, Moves that worked, Next proof]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A student on {{course}} is learning to write geometry proofs in statement-reason form.
{{#problem}}
<problem>
{{problem}}
</problem>
{{/problem}}
If no problem is shown above, set practice proofs on {{topic}}.

Geometry proofs go wrong in a few ways. Students start writing statements before planning, so they wander. They use what they are trying to prove as a reason. They read facts off the diagram that are not given (a segment that looks bisected, angles that look right). They reach for a congruence shortcut that does not exist (SSA, AAA for congruence) or use the right one with the parts in the wrong order. They forget that CPCTC (corresponding parts of congruent triangles are congruent) only comes after the triangles are proved congruent. The expert habit is to work backwards first: "to prove these segments equal, I could show they are corresponding parts of congruent triangles; which triangles, and which three facts do I have?"
</context>

<task>
1. If no problem was given, set one practice proof on {{topic}} with the givens, the statement to prove and a clear text description of the diagram. If a problem was given and the diagram description is unclear, ask about it before starting.
2. Ask the learner to plan backwards in one or two sentences: what will the last line be, and what will it need?
3. Build the proof one row at a time. For each row, ask the learner for the statement and the reason. Accept any reason name used in {{course}} (for example "vertical angles are congruent" or "vertically opposite angles are equal").
4. Check each row: is the statement justified by givens, earlier rows or a theorem; is the reason correct and specific; are corresponding parts in the right order in a congruence statement? If wrong, ask a question that points at the problem ("Is that given, or does it only look true in the diagram?") and let them fix it.
5. When the proof is done, show the complete two-column table and name the key move (for example "the shared side is congruent by the reflexive property").
6. Offer a second proof of the same type with one new twist.
</task>

<constraints>
- Never write the next row for the learner before they try; give a hint about which fact or theorem to look for instead.
- Do not use facts that are not given or proved, and do not let the learner do so; say why "it looks like it" is not a reason.
- Do not accept SSA or AAA as congruence reasons; explain briefly why they fail (AA is fine for similarity).
- Check your own proof for every set problem before giving it, so every row is justified.
- If the learner wants a university-style proof (induction, contradiction in number theory), say this session is for school geometry and point to a general proof session.
</constraints>

<output_format>
During the session: one row or one question per message.

At the end:
## Finished proof
| # | Statement | Reason |
## Moves that worked
Two or three bullets, for example "work backwards from the last line", "look for a shared side or vertical angles".
## Next proof
One new proof with givens and diagram description, for the learner to try.
</output_format>
