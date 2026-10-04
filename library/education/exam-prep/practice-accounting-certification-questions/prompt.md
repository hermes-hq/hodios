---
schema: 1
id: practice-accounting-certification-questions
kind: prompt
title: Practise accounting certification questions
description: Drills original objective and task-based questions for accounting certifications such as CPA, ACCA, CIMA or AAT, with full working, the standard behind each answer and a weak-topic tally.
category: exam-prep
version: 1.0.0
status: incubating
stage: [verify, learn]
role: [student]
requires: [none]
inputs: [preferences]
output: [quiz, conversation, table]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cpa-exam, acca, ifrs, us-gaap, journal-entries, task-based-simulation]
pairs_with:
  prompts: [prepare-certification-exam, analyze-exam-mistakes, make-flashcards]
args:
  - name: exam
    description: The exam and paper, such as "CPA FAR", "ACCA Financial Reporting (FR)", "CIMA F1", "AAT Level 3 Financial Accounting". Add the sitting or syllabus year if you know it.
    type: string
    required: true
  - name: topic
    description: The topic to drill, such as "leases", "deferred tax", "consolidation with NCI", "variance analysis", "bank reconciliations".
    type: string
    required: true
  - name: questions
    description: Number of questions in the set.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Score, Weak-topic tally, Rules to remember, Next set]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Accounting certification exams mix short objective questions with task-based or constructed-response questions: journal entries, schedules, extracts of financial statements, reconciliations and short written explanations. Marks go to correct working laid out step by step, not just the final figure, and the framework matters: US CPA exams test US GAAP (and US tax for tax papers), while ACCA, CIMA and many national exams test IFRS, and AAT tests UK practice. The same transaction can be treated differently under each, and tax rules change by year and country.

Common mark-losers: wrong framework, debits and credits reversed, missing the time-apportionment of an item, rounding mid-calculation, and not reading which figure the question actually asks for (the expense, the liability, the carrying amount at year end).
</context>

<task>
Run {{questions}} original questions for {{exam}} on {{topic}}.

1. Identify the framework and jurisdiction for {{exam}} (US GAAP, IFRS, UK practice, a national standard) and say it in one line. If the exam or paper is unclear, ask before starting. For any tax topic, ask which tax year and country the exam follows.
2. Write every question yourself; never reproduce released questions or tuition-provider material. Solve each privately with full working and check the numbers reconcile. Use round, realistic figures and dates.
3. Mix formats: about two thirds objective items (four options, distractors built from the classic errors: wrong side, wrong period, wrong measurement basis), one third short task-based items (a journal entry, a schedule or a statement extract, with the exhibit as a small table).
4. Ask one question per message, labelled "Question k of {{questions}}", and ask for workings, not only the answer.
5. After each answer:
   - Mark it. For task-based items, award method marks for correct steps even when the final figure is wrong, and say which marks were earned.
   - Show the full working as a layout a marker expects (labelled steps, a T-account or schedule where it helps).
   - Name the standard or principle behind the treatment, by its common name ("IFRS 16 lessee accounting", "ASC 842") only when you are certain; otherwise describe the principle and say to check the reference.
   - Say why each distractor is tempting and which error produces it.
   - Update a weak-topic tally by sub-skill (recognition, measurement, presentation, disclosure, calculation).
6. After two misses on the same sub-skill, give a short worked example before continuing.
7. After the last question, give the review.
</task>

<constraints>
- Never invent standard paragraph numbers, tax rates, thresholds or allowances. If a question needs a rate, state it in the question as given data.
- If the student's exam uses a syllabus you do not know well, say so and keep to principles common to it.
- No partial marks on objective items; method marks on task-based items only.
- This is exam practice, not accounting or tax advice for a real business.
</constraints>

<output_format>
During the set: the verdict, working and explanation for the last answer, then the next question, in one message.

At the end, under these headings:
## Score
x / {{questions}}, with method marks shown for task-based items.
## Weak-topic tally
A table: Sub-skill | Asked | Correct | Typical error.
## Rules to remember
Up to six one-line rules drawn from the misses.
## Next set
The topic or sub-skill to drill next.
</output_format>
