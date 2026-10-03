---
schema: 1
id: map-program-curriculum
kind: prompt
title: Map programme outcomes across courses
description: Maps programme-level outcomes across courses showing where each is introduced, reinforced and mastered, and flags gaps, overloads and sequencing problems. Use for programme review or accreditation.
category: course-design
version: 1.0.0
status: incubating
stage: [review, plan]
role: [teacher, manager, consultant]
requires: [none]
inputs: [document, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [curriculum-mapping, programme-review, accreditation, constructive-alignment, programme-outcomes]
pairs_with:
  prompts: [write-learning-objectives, write-course-syllabus, design-capstone-project]
  personas: [instructional-designer]
args:
  - name: program_outcomes
    description: The programme learning outcomes, numbered, as approved or drafted.
    type: text
    required: true
  - name: courses
    description: The courses in the programme with year or term, required or elective, and their learning outcomes and main assessments (paste syllabus extracts if you have them).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Curriculum map, Gaps, Overloads, Sequencing issues, Assessment evidence, Recommendations, Questions for course leads]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A curriculum map shows whether a programme actually delivers what it promises. Each programme outcome should be introduced (I), reinforced (R) and finally mastered (M) in a sensible order, and mastery should be shown in an assessment, not just "covered" in a lecture. Common problems are outcomes that are never assessed at mastery, outcomes that only appear in electives (so some graduates never meet them), courses claiming nearly every outcome, and mastery placed before introduction. A map is only as good as its evidence, so it must separate what course documents state from what the mapper infers.
</context>

<task>
Build a curriculum map from the material below.

<program_outcomes>
{{program_outcomes}}
</program_outcomes>

<courses>
{{courses}}
</courses>

1. If the courses have no outcomes or assessments at all (only titles), say the map would be guesswork, list exactly what to collect from each course lead, and produce only a provisional map clearly labelled "inferred from titles".
2. For each course and programme outcome, assign I, R or M where there is a real link, using these definitions: I = the outcome is first taught and practised at a basic level; R = it is practised with more complexity or independence; M = students demonstrate it at the programme's exit standard in an assessed task. Leave the cell empty where there is no meaningful link.
3. Mark every cell as stated (the course's own outcomes or assessments show it) or inferred (you judged it from content). Put an asterisk on inferred cells.
4. **Gaps:** outcomes with no M, no assessed evidence, only elective coverage, or a missing I before R or M.
5. **Overloads:** courses mapped to more than about half the programme outcomes, or with M on several outcomes but a single assessment; outcomes concentrated in one year.
6. **Sequencing issues:** M or R appearing in a term before the first I, prerequisites that do not match the map, and long gaps where an outcome is not practised.
7. **Assessment evidence:** for each outcome, which assessment(s) provide mastery evidence, and whether the assessment type fits the outcome's verb (an exam cannot show "collaborate in a team").
8. **Recommendations:** the 5 to 8 changes with the biggest effect, each naming the course(s) and what to adjust (add an assessment, move an outcome, drop a claim), smallest effective change first.
</task>

<constraints>
- Do not inflate the map to make it look complete. An honest gap is more useful than a claimed link.
- Use only the course information supplied; do not assume content a course "probably" covers without marking it inferred.
- Be neutral about individual courses and staff; describe the curriculum, not the people.
- If accreditation standards are mentioned, do not quote their wording from memory; refer to them by name and ask the user to check the exact criteria.
</constraints>

<output_format>
## Summary
3 to 5 sentences on overall coverage and the biggest issues.
## Curriculum map
Table: rows are courses in programme order (with year/term and required/elective), columns are outcomes PO1, PO2, …; cells I, R, M or blank, inferred cells with *. Then a totals row counting I/R/M per outcome.
## Gaps
Bullets by outcome.
## Overloads
Bullets.
## Sequencing issues
Bullets.
## Assessment evidence
Table: Outcome | Mastery assessment(s) | Fit to the outcome's verb | Note.
## Recommendations
Numbered, each with course, change and the gap it closes.
## Questions for course leads
Bullets.
</output_format>
