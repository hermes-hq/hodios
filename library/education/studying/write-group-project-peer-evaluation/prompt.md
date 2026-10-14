---
schema: 1
id: write-group-project-peer-evaluation
kind: prompt
title: Write a group project peer evaluation
description: Writes honest, specific peer and self evaluations for a group project from the student's notes on who did what, fair to every teammate and backed by examples.
category: studying
version: 1.0.0
status: incubating
stage: [review]
role: [student]
requires: [none]
inputs: [text, notes]
output: [table, rewrite]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [peer-assessment, group-project, self-evaluation, teamwork, fair-feedback]
pairs_with:
  prompts: [address-peer-not-pulling-weight, plan-group-project, write-reflective-account]
args:
  - name: form
    description: The evaluation form - the criteria, the rating scale, any points-split rule (for example "share 100 points among the team") and word limits for comments.
    type: text
    required: true
  - name: contributions
    description: Your notes on what each teammate (first names or initials) and you actually did - tasks, meetings attended, deadlines met or missed, quality of work, and examples.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Evidence summary, Ratings, Comments per teammate, Self-evaluation, Fairness check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Peer evaluations move real marks in many courses, and instructors read them for patterns: everyone giving everyone full marks tells them nothing, and an angry, vague comment about one person reads as a personality clash. Evaluations that instructors trust are specific and evidenced: what the person did against each criterion, with an example and a date, rating differences that match the evidence, and the same standard applied to oneself. Common traps are rating on likeability, punishing one late deadline after weeks of good work, hiding a real problem to be nice, and an inflated self-rating.
</context>

<task>
Write the peer and self evaluations.

<form>
{{form}}
</form>

<contributions>
{{contributions}}
</contributions>

1. Summarise the evidence per person against each criterion on the form, using only the student's notes. Note where evidence is missing for a criterion.
2. Propose ratings on the form's scale for each teammate, each justified by the evidence. If the form uses a points split, show the split and that it sums correctly.
3. Write a comment per teammate within the word limit: specific contributions with examples, one honest development point where the evidence supports it, in neutral, professional wording.
4. Write the self-evaluation to the same standard, including one real thing to improve.
5. Run a fairness check: ratings match the evidence, the same standard is used for everyone including the student, no comment relies on personality or guesses about motives, and anything the student would not be comfortable with the teammate reading is reworded or justified.
</task>

<constraints>
- Use only facts from the student's notes; do not invent tasks, dates or examples. Mark a criterion "no evidence noted" rather than guessing.
- Do not inflate or deflate ratings beyond the evidence, including the student's own.
- No personal remarks, health speculation or accusations of misconduct; if the student describes misconduct, suggest raising it with the instructor separately.
- Keep teammates to the names or initials the student used.
</constraints>

<output_format>
## Evidence summary
A table: Person | Criterion | Evidence.
## Ratings
A table on the form's scale, with the points split if used.
## Comments per teammate
## Self-evaluation
## Fairness check
Checkboxes, with anything changed.
</output_format>
