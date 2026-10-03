---
schema: 1
id: mark-student-work-against-rubric
kind: prompt
title: Mark student writing against a rubric
description: Marks a batch of student writing against the teacher's rubric with criterion scores, quoted evidence and one next step each, and flags borderline scripts for teacher review.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [document, text]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [marking, grading, rubric, writing-assessment, written-feedback, moderation]
pairs_with:
  prompts: [create-rubric, build-feedback-comment-bank, analyze-class-assessment-results, design-self-and-peer-assessment]
args:
  - name: rubric
    description: The rubric, with criteria and the descriptor for each level or score band. Paste it in full.
    type: text
    required: true
  - name: student_work
    description: The scripts to mark, each starting with a line like "=== Script S01 ===" (use codes or initials, not full names).
    type: text
    required: true
  - name: task
    description: The task or prompt students answered, including any word limit or required elements.
    type: text
    required: true
  - name: grade_level
    description: Optional grade, year or course, used to judge age-appropriate expectations where the rubric is silent.
    type: string
output_contract:
  format: markdown
  sections: [Marking notes, Score summary, Script feedback, Flagged for teacher review, Class patterns]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Rubric marking is reliable when every score is tied to the wording of a descriptor and to evidence in the script, when the same reading of each descriptor is applied to every script, and when uncertain cases go to a human. It goes wrong through drift (scripts marked later are judged against earlier ones instead of the rubric), halo effects (strong spelling raises the score for ideas), length bias, and feedback that names a level without telling the student what to do next. The teacher stays the assessor: this pass gives a consistent first marking with the evidence laid out, so the teacher can moderate quickly and spend their time on the scripts that genuinely need judgement.
</context>

<task>
Mark the scripts below against the rubric for this task{{#grade_level}} ({{grade_level}}){{/grade_level}}.

<task_set>
{{task}}
</task_set>

<rubric>
{{rubric}}
</rubric>

<student_work>
{{student_work}}
</student_work>

1. Read the rubric and write Marking notes: for each criterion, what evidence distinguishes adjacent levels, in one or two lines. If a descriptor is ambiguous, state the interpretation you will apply to every script. If the rubric is missing level descriptors or the scripts are not separated, stop and ask for what is missing.
2. Read all the scripts once before scoring any of them.
3. Score criterion by criterion across all scripts, not script by script, to keep each criterion consistent. For every score, quote the shortest piece of the script that justifies it (or note what is absent).
4. Judge each criterion on its own. Do not let spelling and grammar affect content criteria unless the rubric says so, and do not reward length for its own sake.
5. For each script, write one next step: specific, actionable in the next piece of work, and phrased to the student ("In your next paragraph, add a quotation that shows… and explain how it proves…").
6. Flag a script for teacher review when: a criterion sits on the boundary between two levels; the script does not answer the task; it is far shorter than expected or unfinished; its style or level is far from the rest of the set or from what the task and grade would lead you to expect (say only that it differs and that the teacher may want to compare it with the student's other work; do not accuse anyone of copying or AI use); or it contains anything that suggests a student may be at risk of harm (flag it as a welfare concern for the teacher to follow up through the school's safeguarding procedure the same day, and do not mark that script).
7. Summarise patterns across the class: the criteria most and least secure, and one suggestion for whole-class reteaching.
</task>

<constraints>
- Scores are provisional and for the teacher to confirm; say so once in Marking notes.
- Use only the rubric's levels and scale. Never invent extra criteria or a grade conversion the teacher did not give.
- Every score has a quotation or an explicit "not present". Quotations are copied exactly.
- Refer to students by the script code only. If a full name appears, use the code instead.
- Do not judge students' identities, dialects or home languages; apply the rubric to the writing.
</constraints>

<output_format>
## Marking notes
Interpretations of each criterion and the provisional-score reminder.
## Score summary
Table: Script | one column per criterion | Total (if the rubric totals) | Flag.
## Script feedback
For each script: a table Criterion | Score | Evidence (quote) | Why this level, then "Next step:" one sentence to the student.
## Flagged for teacher review
Script | Reason | What to check.
## Class patterns
Strongest and weakest criteria with counts, and a reteaching suggestion.
</output_format>
