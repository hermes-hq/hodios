---
schema: 1
id: analyze-past-papers
kind: prompt
title: Analyse past exam papers
description: Analyses past exam papers for recurring topics, question styles, command words and mark allocation, and ranks revision priorities without pretending to predict the paper.
category: exam-prep
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [student, teacher]
requires: [none]
inputs: [document, text]
output: [table, report, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [past-papers, command-words, mark-allocation, topic-frequency, revision-priorities]
pairs_with:
  prompts: [generate-practice-exam, write-model-exam-answer, grade-practice-answers, create-study-plan]
  workflows: [exam-prep-track]
args:
  - name: past_papers
    description: Past papers pasted as text, or a question-by-question list with year, question number, marks and question wording. More years give a more reliable picture.
    type: text
    required: true
  - name: syllabus
    description: Optional syllabus or specification topic list, so unexamined topics and coverage gaps show up.
    type: text
  - name: exam_date
    description: Optional exam date and today's date, so the priorities can be turned into a rough time split.
    type: string
output_contract:
  format: markdown
  sections: [What was analysed, Topic frequency, Question styles and command words, Mark allocation, Revision priorities, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Past papers are the best evidence of what an exam rewards: which topics carry the marks, how questions are phrased, what each command word demands, and how marks split between recall, application and extended writing. Students often use them only as practice, missing the pattern. But a handful of papers is a small sample, examiners vary topics on purpose, and syllabuses change, so analysis should guide priorities, not "predict" the paper. Everything on the syllabus can be examined.
</context>

<task>
Analyse these past papers.

<past_papers>
{{past_papers}}
</past_papers>
{{#syllabus}}
<syllabus>
{{syllabus}}
</syllabus>
{{/syllabus}}
{{#exam_date}}Exam date: {{exam_date}}.{{/exam_date}}

1. Inventory what was given: which papers, years and sections, how many questions, and whether marks are shown. If marks are missing, estimate from question type and say so.
2. Tag every question with its topic (using the syllabus wording if given), question type (multiple choice, short answer, calculation, data or source response, extended writing), command word and marks.
3. Topic frequency: count appearances and total marks per topic per year. Note topics that appear every year, topics that alternate, and topics never examined in this sample.
4. Question styles and command words: list each command word used, what it requires in practice (for example "state" needs a fact, "explain" needs a reason linked to the outcome, "evaluate" needs a weighed judgement), how many marks it usually carries, and any recurring question formats such as the same data-response structure each year.
5. Mark allocation: the share of marks by question type and by skill (recall, application, analysis or evaluation), and where the high-mark questions sit.
6. Revision priorities: rank topics by expected marks (marks per paper and consistency), then adjust for anything the student says they are weak at. Separate the always-examined core, the rotating topics and the unexamined syllabus topics, which still need at least light coverage. {{#exam_date}}Turn the ranking into a rough share of revision time before the exam.{{/exam_date}}
7. Practice recommendations: which past questions to redo first and which question types to drill.
</task>

<constraints>
- Do not predict the exact questions or tell the student to skip any syllabus topic. Say how many papers the analysis is based on and how reliable that makes it (one or two papers are a weak sample).
- Watch for syllabus or format changes between years if the papers show them, and weight recent papers more.
- Do not invent questions or marks that are not in the papers; label every estimate.
- If what was pasted is not past paper content (for example only a topic list), say what is needed and stop.
</constraints>

<output_format>
## What was analysed
Papers, years, question count, and any estimates.
## Topic frequency
A table: Topic | one column per year (marks) | Total marks | Pattern (every year, alternating, rare, never).
## Question styles and command words
A table: Command word | What it requires | Typical marks | Example from the papers.
## Mark allocation
Shares by question type and by skill.
## Revision priorities
A ranked table: Rank | Topic | Why | Suggested share of time.
## Caveats
Sample size, syllabus changes, and the reminder that every syllabus topic can appear.
</output_format>
