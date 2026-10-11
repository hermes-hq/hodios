---
schema: 1
id: write-teaching-job-application
kind: prompt
title: Write a teaching job application
description: Writes a school teaching application, supporting statement or teacher cover letter tied to the person specification, with classroom evidence, impact on pupils and safeguarding awareness.
category: job-search
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, job-seeker]
requires: [none]
inputs: [job-posting, resume, notes]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [education-sector]
tags: [teaching-jobs, supporting-statement, person-specification, school-applications]
pairs_with:
  prompts: [practise-teaching-job-interview, prepare-teaching-demo-lesson, write-teacher-resume]
args:
  - name: vacancy
    description: The job advert, job description and person specification (or selection criteria), plus what you know about the school - phase, context, priorities from its website or inspection report.
    type: text
    required: true
  - name: experience
    description: Your teaching experience and training - schools, year groups and subjects, placements, results or progress data, interventions, extra-curricular work, responsibilities, CPD and anything that shows impact on pupils.
    type: text
    required: true
  - name: limits
    description: Word or page limit and the format the school asks for (application form statement, letter, criteria responses). Leave blank if none.
    type: string
output_contract:
  format: markdown
  sections: [Criteria map, Statement, Gaps and how they are handled, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teachers write applications that get shortlisted. Schools usually shortlist by scoring the statement against the person specification or selection criteria, often with a grid, so a statement that does not address each essential criterion in recognisable language scores low however well written it is. Heads look for evidence of impact on pupils (progress, engagement, attendance, outcomes for particular groups), not lists of duties; for specific teaching strategies with a short example; for behaviour management that is calm and consistent; for adaptive teaching and support for pupils with additional needs; for a commitment to safeguarding expressed through practice; and for real knowledge of this school, shown by a link to its context or priorities. Common failures: a generic letter sent to many schools, quoting the school's own values back without evidence, long paragraphs about personal philosophy, ignoring the word limit, and claiming results without saying what the teacher did. Early-career teachers can draw on placements and training. Terms differ by country (supporting statement, letter of application, selection criteria, cover letter), and some systems require a standard application form rather than a CV.

<vacancy>
{{vacancy}}
</vacancy>

<experience>
{{experience}}
</experience>
{{#limits}}

Limits and format: {{limits}}
{{/limits}}
</context>

<task>
1. Extract the essential and desirable criteria from the person specification, keeping their wording. If none are given, infer the usual criteria for the role and label them as inferred.
2. Map each criterion to the teacher's strongest evidence, rating it strong, partial or missing.
3. Write the statement in the requested format and limit. Open with why this school and this post in two or three sentences tied to its context. Then cover the criteria, grouped in a logical order (teaching and learning, behaviour and relationships, adaptive teaching and inclusion, assessment and progress, safeguarding, wider contribution, professional development), using short examples in a situation, action, impact pattern. Close with what the teacher would contribute in the first year.
4. Handle gaps honestly: transferable evidence, training under way, or a brief statement of willingness to learn.
5. Give a pre-send checklist: criteria all covered, word count, school name and post correct everywhere, matching dates with the application form, referee details including the current or most recent headteacher where the school expects that, and no unexplained gaps in employment history, which schools often ask about as part of safer recruitment.
</task>

<constraints>
- Use only the teacher's real experience; never invent results, data, schools or responsibilities. Mark missing figures as [add data].
- Do not paste the school's values back without evidence.
- Respect the word or page limit; if none is given, aim for about two sides of A4 or 800 to 1,000 words.
- Do not state recruitment rules of a specific country as universal; say "check the application pack" where requirements vary.
- Write in plain, professional English in the first person.
</constraints>

<output_format>
## Criteria map
Table: Criterion (essential or desirable) | Evidence | Rating.
## Statement
The full text, then "Words: N".
## Gaps and how they are handled
## Before you send
Checklist.
</output_format>
