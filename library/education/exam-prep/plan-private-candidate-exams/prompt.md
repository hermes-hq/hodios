---
schema: 1
id: plan-private-candidate-exams
kind: prompt
title: Plan exams as a private candidate
description: Plans sitting GCSE, A-level, IGCSE or similar exams as a private candidate, covering specifications without coursework, finding an exam centre, fees and deadlines to verify, and a study plan.
category: exam-prep
version: 1.0.0
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [private-candidate, home-education, igcse, exam-centre, adult-learner, exam-entries]
pairs_with:
  prompts: [create-study-plan, analyze-past-papers, plan-resit-strategy]
args:
  - name: subjects
    description: The subjects you want to sit, the level (GCSE, IGCSE, A-level or other) and how far along you are with each.
    type: text
    required: true
  - name: country
    description: The country you will sit in. Centres, boards and rules depend on it.
    type: string
    required: true
  - name: exam_series
    description: The series you are aiming for, such as "May/June 2027" or "October/November".
    type: string
    required: true
  - name: notes
    description: Optional details - budget, access needs, whether you need the results for a specific college or university course, how far you can travel.
    type: text
output_contract:
  format: markdown
  sections: [Subject and specification choices, Finding a centre, Dated checklist, Study plan, Costs to budget, Facts to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Private candidates (home-educated teens, adults returning to study, students resitting) sit public exams without a school entering them. The hard parts are not the studying: they are choosing specifications a private candidate can complete (avoiding coursework, non-exam assessment, spoken or practical endorsements that need a teacher to supervise, or arranging them in advance), finding a centre that accepts private candidates for those exact specifications, and meeting entry deadlines, which often fall months before the exam, with late fees after. International versions such as IGCSE are popular because many have exam-only routes. Fees vary widely by centre and are set by the centre on top of board fees.

Country: {{country}}. Series: {{exam_series}}.
</context>

<task>
<subjects>
{{subjects}}
</subjects>
{{#notes}}
<notes>
{{notes}}
</notes>
{{/notes}}

1. Subject and specification choices: for each subject, the specification types to look for (exam-only routes), and which components could be a problem for a private candidate (coursework, practical endorsements in sciences, spoken language assessment, art portfolios), with how people usually handle them (choose a different specification, arrange with the centre, or find a centre that can supervise). If results are needed for a specific course, say to check that the course accepts the chosen qualification.
2. Finding a centre: how to find centres that take private candidates in {{country}} (the exam board's centre search or list, exam centre networks, local schools and colleges), and the questions to ask: which boards and specifications they host, entry deadline, fee per subject, practical or speaking arrangements, access arrangements, where results go.
3. Dated checklist working back from {{exam_series}}: choose specifications, contact centres, book, pay entry by the deadline [to confirm], arrange access arrangements, receive the timetable and candidate number, results day.
4. Study plan: per subject, map the specification content, a term-by-term plan to the series, past papers and mark schemes from the board's website, and a mock under timed conditions about six weeks out.
5. Costs to budget: centre fees per subject, possible late fees, practical or speaking arrangement fees, textbooks, travel; as categories without amounts unless the user gave them.
</task>

<constraints>
- Never state fees, deadlines or centre names as fact; tell the user to confirm with the board and the centre.
- Do not recommend specific commercial centres or tutoring companies.
- If the country uses a different system, adapt the advice and say what changes; if unsure, say so.
- If subjects, country or series are missing, ask and stop.
</constraints>

<output_format>
Use the contract headings. Subject choices as a table: Subject | Level | Spec type to look for | Tricky components | How to handle. Dated checklist as `- [ ]` items with "by [month]". Study plan as a table: Term or month | Subject focus | Milestone. Costs as a table: Item | Notes | Amount [to fill].
</output_format>
