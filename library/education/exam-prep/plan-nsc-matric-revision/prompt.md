---
schema: 1
id: plan-nsc-matric-revision
kind: prompt
title: Plan matric exam preparation
description: Plans preparation for South Africa's National Senior Certificate (matric) with SBA marks, trial exams, a revision timetable to the finals and the APS targets for chosen courses to verify.
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
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [matric, nsc, south-africa, aps-score, trial-exams, sba]
pairs_with:
  prompts: [create-study-plan, analyze-past-papers, plan-university-application]
args:
  - name: subjects
    description: Your seven subjects with latest marks or levels (1-7), including your languages, Maths or Maths Literacy, and Life Orientation, plus your grade (11 or 12) and SBA marks if known.
    type: text
    required: true
  - name: target_courses
    description: Optional courses and universities or colleges you are aiming for, with any APS or subject minimums you have seen.
    type: text
  - name: months_left
    description: Months until the final exams.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Where you stand, APS check, Subject priorities, Revision timetable, Past-paper routine, Facts to verify]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Output format lists every heading explicitly instead of pointing to the contract."}
---
<context>
Matric results combine school-based assessment (SBA), done during the year, with the final external exams, so SBA marks are banked before the finals; practical subjects and Life Orientation weight internal work differently. Results are reported as achievement levels from 1 to 7, and universities turn them into an Admission Point Score (APS), but each institution calculates it its own way (which subjects count, whether Life Orientation counts, bonus points) and many courses also set minimum levels in specific subjects such as Mathematics or Physical Sciences. Learners lose out by ignoring SBA tasks, revising only favourite subjects, and starting past papers after the preparatory (trial) exams instead of before.

Months to finals: {{months_left}}.
</context>

<task>
<subjects>
{{subjects}}
</subjects>
{{#target_courses}}
<target_courses>
{{target_courses}}
</target_courses>
{{/target_courses}}

1. Where you stand: convert each mark to an achievement level using the standard bands (7 = 80-100%, 6 = 70-79%, 5 = 60-69%, 4 = 50-59%, 3 = 40-49%, 2 = 30-39%, 1 = 0-29%) and note SBA tasks still to come.
2. APS check: for each target course, add up an APS in the common way (six subjects, Life Orientation often excluded) and show the arithmetic; say clearly that each institution's method differs and give the gap to any minimums the student pasted. If none pasted, list what to look up.
3. Subject priorities: rank by impact: subject minimums for the target course, subjects just below a level boundary (a 58% that could become a 60% gains a level), and any subject at risk of failing.
4. Revision timetable to the finals: phases (finish content, topic-by-topic past papers, trials, post-trial gap fixing, final exam timetable). A weekly template that touches every subject, heavier on priorities, with time for SBA tasks.
5. Past-paper routine: work through national past papers and memoranda by topic, then full papers under time; mark with the memo; keep a mistakes book; read examiners' diagnostic reports where available.
6. Facts to verify: SBA weightings, exam timetable, APS methods, and minimum requirements for a bachelor's, diploma or higher certificate pass.
</task>

<constraints>
- Never state a university's APS cut-off or requirement as fact unless the student pasted it; tell them to check the prospectus.
- Do not promise a pass type or admission.
- If marks or subjects are missing, ask and stop.
- If the learner mentions overwhelming stress, encourage them to talk to a teacher, school counsellor or a trusted adult.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
Markdown with these headings, in this order:
## Where you stand
Table: Subject | Mark | Level | SBA to come.
## APS check
Per course, a table: Subject | Level | Points | Course minimum, then the total and the gap, with the arithmetic shown.
## Subject priorities
Ranked list with the reason for each.
## Revision timetable
A phase table, then a weekly template: Day | Session 1 | Session 2 | Session 3.
## Past-paper routine
Numbered steps.
## Facts to verify
Checklist with where to check each item.
</output_format>
