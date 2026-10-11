---
schema: 1
id: write-student-visa-study-plan
kind: prompt
title: Write a student visa study plan
description: Writes the study plan or genuine student statement that some student visas require, linking the applicant's background, course choice, funding and plans after study in their own true words.
category: immigration
version: 1.0.0
status: incubating
stage: [build]
role: [student, individual]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [student-visa, study-plan, genuine-student, statement-of-purpose, ties-to-home]
pairs_with:
  prompts: [practise-visa-interview, prepare-financial-evidence-for-visa, prepare-visa-application]
args:
  - name: applicant
    description: Your education and grades, work experience, the course and institution you were admitted to, why this course and country rather than options at home or elsewhere, gaps in your history, how you will fund it, and your plans after the course.
    type: text
    required: true
  - name: visa
    description: The country and student visa, and the statement's required format if stated (questions to answer, word limit), copied from the official guidance or the form.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What this statement must show, Missing facts, Study plan, Consistency check, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Some student visas ask for a written study plan or a statement showing that the applicant is a genuine student, and officers read many that are copied from templates or written by agents: they recognise generic praise of the country, borrowed phrases, a course that does not follow from the person's background, and plans that do not match the funding or family situation. What persuades is specific and personal: why this course follows from their studies or work, why this institution and country rather than comparable options at home, how gaps in their history are explained, how the costs are truly covered, and what they realistically plan to do afterwards. The statement must match the application form, the documents and what they would say in an interview, and follow the required questions and word limit if the authority sets them.

<applicant>
{{applicant}}
</applicant>

<visa>
{{visa}}
</visa>
</context>

<task>
1. What this statement must show for this kind of visa, in general terms, and the required format if the user gave one (otherwise ask whether one exists and mark it to confirm).
2. Missing facts: anything the statement needs that the user did not give (for example the reason for a study gap, why not study at home, who pays). Ask, and write placeholders [LIKE THIS] rather than inventing.
3. Study plan: in the first person, in plain English the applicant could have written, within the word limit, structured around the required questions if any: background, course choice and fit, institution and country choice compared with alternatives, funding, gaps explained, and plans after study. Specific, not flattering.
4. Consistency check: points that must match the application form, financial documents, admission letter and interview answers, and any claim that sounds stronger than the evidence.
5. Questions for an adviser, especially for past refusals or a big change of field.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the applicant's true facts. Never invent achievements, job offers at home, family businesses or funding.
- Do not write promises of returning home that the applicant has not said; describe their real plans, and note that some routes allow staying to work after study, which is not a reason to hide that plan.
- Avoid template phrases and generic praise of the country or university.
- Do not predict the visa outcome.
{{> output/uncertainty}}
</constraints>

<output_format>
## What this statement must show
## Missing facts
## Study plan
The full draft with [placeholders] where facts are missing, then the word count.
## Consistency check
## Questions for an adviser
</output_format>
