---
schema: 1
id: plan-reading-accommodations
kind: prompt
title: Plan reading accommodations across subjects
description: Plans accommodations in every subject for a pupil whose reading is well below their thinking level, so they access the curriculum while reading is taught separately, with checks that they work.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [education-sector]
tags: [reading-difficulties, curriculum-access, text-to-speech, accommodations, cross-curricular]
pairs_with:
  prompts: [adapt-text-reading-level, modify-test-for-access-needs, write-iep-goals]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age and year, reading assessment results (decoding, fluency, comprehension), listening comprehension and spoken vocabulary, subjects and tasks where reading blocks them, current support and technology available.
    type: text
    required: true
  - name: subjects
    description: The subjects or timetable to cover. Optional; defaults to the main subjects for the age.
    type: string
output_contract:
  format: markdown
  sections: [Profile in brief, Principles, Accommodations by subject, Homework and independent study, Tests and assessments, Keep teaching reading, Checking it works, Staff briefing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teacher or inclusion lead plan reading accommodations for a pupil whose reading lags far behind their understanding. The key distinction is between decoding and comprehension: a pupil who decodes slowly but understands well when they listen needs the text delivered another way (read aloud, text-to-speech, audio, a reading partner), while a pupil who struggles to understand language needs pre-teaching of vocabulary and simplified explanations. Accommodations change how the pupil accesses content, not what they learn; if every text is simplified the pupil falls behind in knowledge and vocabulary. Experienced teachers apply accommodations consistently across all subjects (not just English), keep high-level content, set them up so the pupil does not have to ask every time, and keep teaching reading explicitly in a separate intervention.

Pupil: {{pupil}}
{{#subjects}}Subjects: {{subjects}}{{/subjects}}
</context>

<task>
1. Profile in brief: decoding, fluency, comprehension and listening comprehension from the data, and what that means for access. Name missing data (for example no listening comprehension measure) and how to get it.
2. Principles: three or four rules all staff follow, such as never asking the pupil to read aloud unprepared, providing texts in advance, and keeping content at age level.
3. Accommodations by subject: for each subject, the reading demands (textbooks, worksheets, board text, word problems, sources, instructions) and the accommodation for each, with who sets it up.
4. Homework and independent study: digital texts, audio versions, reading routines at home without making homework a reading test.
5. Tests and assessments: reader or text-to-speech, extra time, modified layout; say these should match normal classroom practice and that exam rules vary by exam body.
6. Keep teaching reading: confirm the pupil has a separate, targeted reading intervention, and how accommodations and teaching work together.
7. Checking it works: a short check after four to six weeks with the pupil's view and work samples from two subjects.
8. Staff briefing: a five-line summary for all teachers.
</task>

<constraints>
- Do not diagnose; work from the assessment data and observations given.
- Use only the data provided; mark missing data [needed].
- Do not recommend modifying content (lowering what is taught) unless the user asks; separate accommodations from modifications.
- Exam access rules vary; do not promise arrangements will be approved.
- Initials only.
</constraints>

<output_format>
## Profile in brief
## Principles
## Accommodations by subject
Table: Subject | Reading demand | Accommodation | Who sets it up.
## Homework and independent study
## Tests and assessments
## Keep teaching reading
## Checking it works
## Staff briefing
</output_format>
