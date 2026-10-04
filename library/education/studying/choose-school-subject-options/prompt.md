---
schema: 1
id: choose-school-subject-options
kind: prompt
title: Choose school subject options
description: Helps a teenager and their family choose GCSE, A-level, IB or similar subject options by interest, strength, workload and combinations that keep doors open, with requirements to verify.
category: studying
version: 1.0.0
status: incubating
stage: [plan, discover]
role: [student, parent]
requires: [none]
inputs: [text]
output: [table, questions, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [subject-choices, gcse-options, a-level-choices, ib-diploma, teenagers]
pairs_with:
  prompts: [choose-degree-course, plan-university-application]
args:
  - name: student_profile
    description: About the student - subjects they enjoy and dislike, current grades or teacher predictions, interests outside school, any career or course ideas (or none yet), and anything that affects workload.
    type: text
    required: true
  - name: options_available
    description: The school's option list or option blocks and how many subjects to choose, copied from the options booklet if possible, plus any compulsory subjects.
    type: text
    required: true
  - name: system
    description: The qualification system, e.g. GCSE, A-level, IB Diploma, Scottish Highers, Leaving Certificate, or a country's upper-secondary track.
    type: string
    default: GCSE
output_contract:
  format: markdown
  sections: [About the student, Option by option, Combinations to consider, Doors kept open or closed, Check before you decide, Talk it through]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Subject choices at 13 to 16 feel permanent and rarely are, but some combinations do close or open doors: certain university courses expect particular subjects at the next stage (for example maths for economics or engineering, chemistry for medicine in many countries), and some subjects are hard to start later without the earlier course. Families often choose for the wrong reasons: following friends, a favourite teacher who may leave, a subject's reputation as "easy" or "useful", or a career decided at 14. Good choices weigh enjoyment and strength first, because motivation drives grades, then check workload, combinations and requirements.

The decision belongs to the student and family. The aim is a clear picture and the right questions, not a verdict.

System: {{system}}. If the profile or option list clearly refers to a different system (for example A-level options when the system says GCSE), follow the option list and say which system you assumed.
</context>

<task>
<student>
{{student_profile}}
</student>

<options>
{{options_available}}
</options>

1. Summarise the student's interests, strengths, workload considerations and ideas about the future, in their terms.
2. For each available option, rate fit on: enjoyment or interest, current strength, workload and assessment style (exams, coursework, practical or performance components), and doors it opens. Note when a rating is a guess because the profile does not say.
3. Respect the option blocks and number of choices. Propose 2 or 3 combinations that fit the blocks, each with its trade-offs: one that follows interest most closely, one that keeps the most doors open, and one balanced option if different.
4. List which later routes each combination keeps open or makes harder (sciences, languages, creative subjects, apprenticeships, specific degree areas the student mentioned). Phrase requirements as typical patterns, never as fixed rules.
5. List what to verify and with whom: entry requirements for courses or routes they are considering (check current university and college course pages), school rules (minimum class sizes, prerequisite grades, timetable clashes), and how the subjects are assessed.
6. Give questions for the student to answer themselves and discuss with their family.
</task>

<constraints>
- Never state a specific university's or employer's requirements as fact; describe typical patterns and say where to check.
- Do not rank subjects as more or less valuable in general; judge fit for this student.
- Use only options listed. If no actual subjects are listed ("the usual ones", "see attached" with nothing attached), ask for the option list and how many to choose, and stop. If only the blocks or the number of choices are missing, state your assumption and carry on.
- If the profile is too thin to judge (only a list of subjects), ask 3 or 4 questions about enjoyment, grades and ideas before recommending combinations.
- Speak to the student directly and respectfully; if a parent wrote the profile, keep the student's voice central.
- If choices are causing serious stress, conflict at home or the student seems very low, suggest talking with a school careers adviser, form tutor or school counsellor.
{{> guardrails/crisis-safety}}
</constraints>

<output_format>
## About the student
3 to 5 bullets.

## Option by option
Table: Subject | Interest | Strength | Workload and assessment | Doors it opens | Notes. Ratings as high, medium, low or "unknown".

## Combinations to consider
2 or 3 combinations, each with subjects, why it fits and trade-offs.

## Doors kept open or closed
Table: Combination | Keeps open | Makes harder.

## Check before you decide
Checklist: what to verify and with whom.

## Talk it through
5 to 7 questions for the student and family.
</output_format>
