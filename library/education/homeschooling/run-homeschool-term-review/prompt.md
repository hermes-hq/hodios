---
schema: 1
id: run-homeschool-term-review
kind: prompt
title: Run a homeschool term review
description: Reviews a homeschool term from work samples, notes and the child's own view - what progressed, what stalled and why, what to drop - and sets a changed plan and goals for next term.
category: homeschooling
version: 1.0.0
status: incubating
stage: [review]
role: [parent]
requires: [none]
inputs: [notes, preferences, image]
output: [report, plan, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [term-review, progress-check, next-term-goals, child-voice, adjust-the-plan, reflection]
pairs_with:
  prompts: [plan-homeschool-year, build-homeschool-portfolio, plan-teaching-unfamiliar-subject]
args:
  - name: term_notes
    description: The term's goals, what was actually covered by subject, work samples from early and late in the term (described or photographed), what went well or badly, and how days actually ran.
    type: text
    required: true
  - name: child_view
    description: Optional - what the child said about the term (favourite and least favourite parts, what felt hard), or leave empty to get questions to ask them.
    type: text
output_contract:
  format: markdown
  sections: [Progress by subject, What stalled and why, Child's view, Keep and drop, Next term]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help homeschooling parents step back at the end of a term. You know that parents usually judge a term by how much of the curriculum they got through, while the better questions are whether the child can now do things they could not before, whether the daily routine actually happened, and whether learning was sustainable for both of them. Comparing an early and a late work sample in each subject shows progress more honestly than memory. Stalls usually have a cause that can be fixed: the material is pitched wrong, the time of day is wrong, the parent is overloaded, a skill gap underneath (such as weak number facts behind slow maths), or the child has lost interest in the format. Dropping something is often the best change.

Term notes: {{term_notes}}
{{#child_view}}Child's view: {{child_view}}{{/child_view}}
</context>

<task>
1. Progress by subject: for each subject, compare the evidence from early and late in the term against the term's goals, and rate progress as clear, some, or unclear, citing the evidence.
2. What stalled and why: for each weak area, name the most likely cause from the notes (pitch, time, format, underlying gap, parent capacity, motivation) and what would confirm it. Separate content problems from routine problems.
3. Child's view: if given, summarise it and connect it to the evidence. If not given, write six to eight age-appropriate questions to ask the child, including what they are proud of and what they would change.
4. Keep and drop: a short list of what to keep doing, what to change (with the specific change), and what to drop or pause, aiming to make the next term lighter or more focused, not fuller.
5. Next term: three to five specific goals that can be checked at the end of next term, the adjusted weekly rhythm in outline, and what samples to collect for the next review.
</task>

<constraints>
- Base judgements only on the notes and samples given; say when evidence is missing instead of guessing progress.
- If a persistent difficulty suggests an unassessed learning difference (for example little progress in reading despite steady teaching), suggest discussing it with a doctor, an educational psychologist or a specialist assessor, without diagnosing.
- Keep the tone encouraging and honest; do not blame the child or the parent.
- Do not add subjects or hours unless something essential is missing.
</constraints>

<output_format>
## Progress by subject
A table: Subject | Goal | Evidence | Progress.
## What stalled and why
## Child's view
## Keep and drop
Three short lists.
## Next term
</output_format>
