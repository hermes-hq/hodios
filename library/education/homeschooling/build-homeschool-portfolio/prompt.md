---
schema: 1
id: build-homeschool-portfolio
kind: prompt
title: Build a homeschool portfolio
description: Turns a year or term of homeschool work, photos and notes into an organised portfolio by subject with dated samples showing progress, a learning summary, and an index ready for a review or evaluator.
category: homeschooling
version: 1.0.0
status: incubating
stage: [review]
role: [parent]
requires: [none]
inputs: [notes, image, preferences]
output: [outline, summary, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [learning-portfolio, work-samples, record-keeping, annual-review, evidence-of-progress, evaluator-meeting]
pairs_with:
  prompts: [plan-homeschool-year, run-homeschool-term-review, write-homeschool-transcript]
args:
  - name: work_log
    description: What the child did over the period - your notes, lists of books, projects, trips, courses, photos or descriptions of work samples with dates, and anything already filed.
    type: text
    required: true
  - name: purpose
    description: Who the portfolio is for and what they look for, e.g. "annual review with the local authority", "evaluator in our state", "our own record", plus any required subjects or format you were told about by the official body.
    type: text
    required: true
  - name: child_info
    description: Optional - age, grade equivalent and the goals set at the start of the year.
    type: text
output_contract:
  format: markdown
  sections: [Portfolio structure, Subject sections, Progress evidence, Learning summary, Gaps and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help home-educating families present their child's learning clearly. You know that reviewers and evaluators are usually looking for evidence of steady, suitable progress rather than volume: a few dated samples from the start, middle and end of the period in each subject show growth better than a box of worksheets. Everyday learning (baking for fractions, a museum trip for history, a nature journal for science) counts when it is described with what was learned. A short narrative summary in the parent's words, a reading list, and an index make the portfolio easy to review. What must be included, and whether a portfolio is required at all, differs by country, state or local authority, so the official requirements decide the structure.

Work log: {{work_log}}
Purpose: {{purpose}}
{{#child_info}}Child: {{child_info}}{{/child_info}}
</context>

<task>
1. Portfolio structure: propose the sections and order (cover page, contents, learning summary, subject sections, reading list, activities and trips, optional extras), fitted to the purpose and any requirements stated. If the purpose mentions an official review but no requirements were given, list the questions to ask the official body (subjects, period covered, format, sample count, deadline).
2. Subject sections: map everything in the work log to subjects, including everyday activities, and for each subject list which items to include as samples, with a one-line caption template ("Date - what it is - what it shows").
3. Progress evidence: for each core subject, pick or say what to look for in early, middle and late samples that show growth, and flag subjects with no evidence yet.
4. Learning summary: write a one-page narrative in the parent's voice describing the approach, main areas of progress per subject, interests pursued, and plans for the next period, using only what the log contains.
5. Gaps and next steps: missing evidence to gather before the deadline, how to store it (a simple folder or digital structure with file naming), and a lighter routine for collecting samples next year.
</task>

<constraints>
- Use only activities and work the parent described; never invent books, trips, results or progress.
- Do not state what a jurisdiction requires; follow only the requirements the parent gives and point to the official body for the rest.
- Keep the child's personal details minimal; suggest leaving out addresses and full names from anything shared beyond the reviewer.
- Write the summary in plain, positive and accurate language; do not overstate progress or hide areas of difficulty, but frame them with the plan for support.
</constraints>

<output_format>
## Portfolio structure
## Subject sections
A table: Subject | Items to include | Caption.
## Progress evidence
## Learning summary
## Gaps and next steps
A checklist.
</output_format>
