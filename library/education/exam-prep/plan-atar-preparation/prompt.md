---
schema: 1
id: plan-atar-preparation
kind: prompt
title: Plan ATAR preparation
description: Plans Year 11-12 preparation toward an Australian ATAR under HSC, VCE, QCE, WACE or SACE, with assessment weightings and scaling facts to verify, a term-by-term plan and a practice exam schedule.
category: exam-prep
version: 1.0.1
status: incubating
stage: [plan]
role: [student, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [atar, hsc, vce, qce, wace, australia, senior-secondary]
pairs_with:
  prompts: [create-study-plan, analyze-past-papers, plan-last-minute-revision]
  workflows: [exam-prep-track]
args:
  - name: state_certificate
    description: The certificate and state, such as "HSC, NSW", "VCE, Victoria", "QCE, Queensland", "WACE, WA", "SACE, SA", and whether you are in Year 11 or 12.
    type: string
    required: true
  - name: subjects
    description: Your subjects with current marks or ranks if known, how each is assessed at your school, and which you find hardest.
    type: text
    required: true
  - name: goal
    description: Optional target ATAR or course and university you are aiming for.
    type: string
  - name: hours_per_week
    description: Realistic study hours per week outside class during term.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [How your ATAR is built, Subject priorities, Term-by-term plan, Weekly rhythm, Practice exam schedule, Facts to verify, Wellbeing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Output format lists every heading explicitly instead of pointing to the contract."}
---
<context>
The ATAR is a rank, not a mark, calculated by each state's tertiary admissions centre from scaled subject results, and the rules differ by state: which subjects count and how many (for example English requirements and best-of rules), how school assessment and the external exam combine, and how school assessments are moderated or ranked against the exam. Students lose ground by treating Year 12 internal assessments as practice when they count, by choosing study effort from rumours about scaling instead of their strengths, and by leaving full timed papers until the last month. A good plan gives every assessment task its due weight, keeps all counting subjects moving, and builds a past-paper routine from Term 2 or 3.

Certificate: {{state_certificate}}.{{#goal}} Goal: {{goal}}.{{/goal}} About {{hours_per_week}} hours a week.
</context>

<task>
<subjects>
{{subjects}}
</subjects>

1. How your ATAR is built: explain in plain words, for {{state_certificate}}, which results count, how internal assessment and the external exam typically combine, and what scaling does in principle. Mark every specific rule or percentage "verify with your school and the state authority or admissions centre". If the goal names a course, note that prerequisites and adjustment factors may matter as much as the ATAR.
2. Subject priorities: for each subject, list assessment tasks still to come (from the student's notes; ask for the school assessment schedule if missing), their weight if known, the student's position, and the highest-return action. Do not drop or neglect a subject because of rumoured scaling; flag only that scaling is real and to check published reports.
3. Term-by-term plan through to the final exams: content completion, assessment task preparation blocks two to three weeks before each task, holiday revision with past papers, trial exams, and the final run-in.
4. Weekly rhythm within {{hours_per_week}} hours: each subject touched weekly, retrieval practice and spaced review, one timed section a week from Term 2 or 3.
5. Practice exam schedule: when to sit full timed papers under conditions, how to mark them with the official marking guidelines, and an error log.
6. Wellbeing: sleep, exercise, one rest day a week, and who to talk to (year coordinator, school counsellor) if pressure becomes too much.
</task>

<constraints>
- Never state scaling values, ATAR cut-offs, bonus points or exact weightings as fact; tell the student where to check (the state curriculum authority, the admissions centre's published reports, their school).
- Do not promise an ATAR.
- If Year 11 or 12, the state or the assessment schedule is unclear and it changes the plan, ask; mark placeholders [X] otherwise.
- Respect the hours given.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
Markdown with these headings, in this order:
## How your ATAR is built
Short plain explanation, every specific rule marked to verify.
## Subject priorities
Table: Subject | Upcoming tasks | Weight (if known) | Current position | Highest-return action.
## Term-by-term plan
Table: Term | Weeks | Focus | Key dates [to fill].
## Weekly rhythm
Table: Day | Subject | Activity | Minutes.
## Practice exam schedule
Bullets: when to sit full papers, how to mark them, the error log.
## Facts to verify
Checklist naming where to check each item.
## Wellbeing
Three or four bullets, including who to talk to.
End with up to three questions.
</output_format>
