---
schema: 1
id: write-report-card-comments
kind: prompt
title: Write report card comments
description: Writes specific, balanced report-card comments from a teacher's notes, with a strength, a next step and a consistent tone and length across a class. Use at reporting time.
category: teaching
version: 1.0.0
status: incubating
stage: [build]
role: [teacher]
requires: [none]
inputs: [notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [report-cards, parent-communication, strengths-and-next-steps]
args:
  - name: student_notes
    description: 'Notes per student, one block each, starting with a first name and pronouns, e.g. "Sam (he): strong reader, rushes maths, kind to peers, missed 2 homework". Use first names only and follow your school''s policy on sharing student information with AI tools.'
    type: text
    required: true
  - name: tone
    description: formal for school-standard reporting language, warm for a friendlier register.
    type: enum
    enum: [formal, warm]
    default: warm
  - name: max_words
    description: Maximum words per comment.
    type: number
    default: 80
output_contract:
  format: markdown
  sections: [Comments, Check before sending]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Families read report comments closely, often several times. The comments that help name something specific the student did, give one clear next step, and sound like they were written about this child. The comments that hurt are generic ("a pleasure to have in class"), vague about problems, compare the child with classmates, use labels ("lazy", "disruptive"), or hint at a diagnosis. Across a class, comments must also be consistent in length and tone so no family feels short-changed.
</context>

<task>
Write report-card comments in a `{{tone}}` tone, at most {{max_words}} words each, from these notes:

<student_notes>
{{student_notes}}
</student_notes>

For each student:
1. Lead with a specific strength drawn from the notes, with evidence (a piece of work, a skill, a behaviour).
2. Give one area for growth framed as a next step the student can take, specific enough to act on.
3. Where it fits, add one way the family can support at home.
4. Close on a forward-looking sentence.
5. Use the student's name and the pronouns given. If no pronouns are given, use the name and "they".

Across the class:
6. Keep lengths within about 15% of each other, and keep the same structure and register.
7. Vary sentence openings and wording between students so comments do not read as a template.
</task>

<constraints>
- Use only what is in the notes. Do not invent achievements, grades or incidents. If a student's notes are too thin to write a fair comment (one word, or only negatives), write the best comment you can and flag it.
- Describe behaviour, not character: "often begins tasks after reminders" rather than "lazy".
- No comparisons with other students, no medical or diagnostic language, no mention of family circumstances, discipline records or attendance unless the notes explicitly ask for it to be included.
- Avoid jargon families will not know, and clichés ("a joy to teach", "needs to apply themselves").
- `formal`: third person, school reporting register. `warm`: third person, friendly and encouraging, still professional.
</constraints>

<output_format>
## Comments
For each student: a heading with the name, the comment as one paragraph, then "(n words)".
## Check before sending
Bullets: students whose notes were too thin, anything you left out because it was sensitive, and any statement the teacher should verify.
</output_format>
