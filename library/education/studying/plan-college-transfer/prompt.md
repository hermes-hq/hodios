---
schema: 1
id: plan-college-transfer
kind: prompt
title: Plan a college transfer
description: Plans a transfer from community college or between universities, with credit transfer checks, target school requirements, deadlines to verify and the courses to take now.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [student]
requires: [none]
inputs: [text, document]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [transfer-student, credit-transfer, community-college, articulation, admissions]
pairs_with:
  prompts: [plan-courses-to-graduation, plan-university-application, calculate-gpa-and-target]
args:
  - name: current
    description: Where you study now, your programme, credits completed or in progress with grades, your GPA, and when you want to transfer.
    type: text
    required: true
  - name: targets
    description: The schools and majors you are considering, with anything you have found about their transfer requirements, credit policies and agreements with your current school.
    type: text
    required: true
  - name: reasons
    description: Optional reasons for transferring (cost, programme, location, fit) and constraints such as finances, family or a student visa.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Credit transfer check, Target requirements, Courses to take now, Timeline, Questions for advisers]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Transfer students lose the most to credit that does not count: a course that transfers only as a general elective instead of a major requirement, a credit cap, a minimum grade (often C or better) for transfer, or a residency rule that requires a set number of credits at the new school. The difference between "transfers" and "applies to my degree" is where students get caught, and it can add a year. Planning works best early: check any articulation or transfer agreement between the schools, use the target school's transfer equivalency tools, take the major preparation courses the target expects (for competitive majors these often matter more than the overall GPA), and track deadlines, which for transfer applicants often differ from first-year deadlines. Rules vary widely by country, state and institution.
</context>

<task>
Plan the transfer.

<current>
{{current}}
</current>

<targets>
{{targets}}
</targets>
{{#reasons}}
<reasons>
{{reasons}}
</reasons>
{{/reasons}}

1. State assumptions: the country and system, and anything the student has not said that changes the plan (for example whether they want an associate degree first).
2. Credit transfer check: for each completed course, say what to check - whether it transfers, whether it applies to a major or general requirement, the minimum grade, and the source to use (articulation agreement, equivalency database, registrar). Mark every course "check" unless the student gave an official equivalency; never assert one.
3. Target requirements: for each target, list what to confirm - minimum GPA, required major preparation courses, credit minimums or caps, residency rules, application essays, recommendations and transcripts. Use what the student found and mark it as such; mark the rest as typical items to verify.
4. Courses to take now: recommend the categories of courses to prioritise in the remaining terms (major preparation, courses that transfer to all targets, any required general education pattern), and courses to avoid (those that may not transfer).
5. Timeline: working back from the transfer term, when to research, meet advisers, apply, send transcripts, apply for aid and scholarships, and decide, with deadlines marked "verify".
6. Questions for advisers: specific questions for the current school's transfer adviser and each target's admissions or transfer office.
</task>

<constraints>
- Do not state any school's requirements, GPA cut-offs, agreements or deadlines as fact unless the student supplied them; mark them to verify.
- Do not promise that credits will transfer or that the student will be admitted.
- If the plan suggests the student will lose a lot of credit or time, say so plainly and show the alternatives.
- If the student is on a student visa, note that transferring usually involves the visa sponsor at both schools, to check with the international student office.
</constraints>

<output_format>
## Assumptions
## Credit transfer check
A table: Course | Credits | Grade | Transfers? | Applies to | Source to check.
## Target requirements
A table per target: Requirement | Status | Where to confirm.
## Courses to take now
## Timeline
A table: When | Action.
## Questions for advisers
</output_format>
