---
schema: 1
id: understand-assignment-brief
kind: prompt
title: Understand an assignment brief
description: Decodes an assignment brief and rubric into what is actually being asked, the hidden expectations, a dated step plan and a pre-submission checklist. Use when starting coursework.
category: studying
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [student]
requires: [none]
inputs: [document, text]
output: [explanation, plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [assignment-brief, command-words, rubric, coursework, backward-planning]
pairs_with:
  prompts: [plan-essay-argument, plan-semester-workload, create-study-plan]
  personas: [writing-tutor, study-coach]
  rules: [academic-integrity-rules]
args:
  - name: brief
    description: The assignment brief exactly as given, including the title or question, word count, format, referencing style and submission instructions.
    type: text
    required: true
  - name: rubric
    description: Optional marking rubric, criteria or grade descriptors. Without one, hidden expectations are inferred from the brief and labelled as such.
    type: text
  - name: due_date
    description: Optional due date and time, plus today's date so the plan can be dated, for example "14 March 23:59; today is 20 February".
    type: string
output_contract:
  format: markdown
  sections: [The task in one sentence, What the brief requires, What the marker is really looking for, Questions to ask your tutor, Plan, Pre-submission checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Students lose more marks to misreading the brief than to weak writing: answering "describe" when the brief says "critically evaluate", missing a required section, ignoring the weighting of the criteria, or writing an essay when a report was asked for. Briefs also carry expectations they never state outright, such as "use of literature" meaning peer-reviewed sources rather than websites. The job is to make every requirement explicit, separate what is stated from what is inferred, and turn the deadline into a plan.
</context>

<task>
Decode this assignment brief.

<brief>
{{brief}}
</brief>
{{#rubric}}
<rubric>
{{rubric}}
</rubric>
{{/rubric}}
{{#due_date}}Due: {{due_date}}.{{/due_date}}

1. State the core task in one plain sentence: what the student must produce and what it must do.
2. Analyse the command words (analyse, discuss, evaluate, critically assess, compare, justify, reflect). For each, say what it demands in practice and how it differs from the weaker thing students usually do instead.
3. Extract every explicit requirement: deliverable type, word count and whether references count, sections, format, sources, referencing style, submission method and file type, collaboration and AI-use rules if stated.
4. Infer the hidden expectations: what the top grade band needs that a pass does not, how the marks are weighted across criteria, the genre conventions of the deliverable (a report has headings and an executive summary; a literature review synthesises rather than lists). Base each inference on the brief's or rubric's wording and quote it. Mark each as inferred.
5. List ambiguities that only the tutor can settle, phrased as short questions the student can send.
6. Build a step plan working back from the due date: understand and question, research, plan or outline, draft, revise against the rubric, proofread and reference check, submit early. Size each step to the deliverable and leave a buffer of about 15 percent. Use real dates if the due date and today's date are given; otherwise use "D-14"-style countdowns and say so.
7. Write a pre-submission checklist tied to the rubric's criteria and the explicit requirements, each item checkable as yes or no.
</task>

<constraints>
- Do not write any part of the assignment: no thesis, paragraphs or answers. Planning steps can name what each section must achieve.
- Never invent a requirement. Anything not in the brief or rubric is labelled "inferred" with its reason, or goes in the questions for the tutor.
- If the brief is too thin to decode (only a topic, no task or format), say what is missing and give the questions to ask, rather than guessing a word count or format.
- Use the rubric's own words when referring to criteria, so the student can match them.
</constraints>

<output_format>
## The task in one sentence
## What the brief requires
A checklist of stated requirements, each with the brief's wording quoted.
## What the marker is really looking for
Command words first, then inferred expectations, each marked "(inferred)" with its evidence. If a rubric is given, a table: Criterion | Weight | What top band needs | Common way to lose marks.
## Questions to ask your tutor
## Plan
A table: Step | What to do | Done by.
## Pre-submission checklist
Checkboxes.
</output_format>
