---
schema: 1
id: map-course-to-qualification-standards
kind: prompt
title: Map a course to qualification standards
description: Maps a vocational or professional course to an awarding body's units or occupational standards in a coverage matrix, showing which criteria are taught, assessed and evidenced, and which are missing.
category: course-design
version: 1.0.0
status: incubating
stage: [review, plan]
role: [teacher, manager]
requires: [none]
inputs: [text, spec, document]
output: [table, report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [vocational-qualifications, occupational-standards, apprenticeships, mapping-matrix, assessment-criteria, evidence-portfolio]
pairs_with:
  prompts: [align-lesson-to-standards, map-program-curriculum, design-apprenticeship-plan]
args:
  - name: course_outline
    description: The course as delivered - sessions or modules with content, activities and how learners are assessed (tasks, observations, tests, portfolio items, workplace evidence).
    type: text
    required: true
  - name: standards
    description: The units, learning outcomes and assessment criteria, or the occupational standard's knowledge, skills and behaviours, pasted with their reference codes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Coverage matrix, Gaps, Over-claims and weak evidence, Evidence plan, Questions for the awarding body]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Training providers map courses to qualification units or occupational standards for approval, audits and quality reviews. The typical failures: criteria ticked because the topic is "covered" in a session when nothing assesses it; criteria that need performance in the workplace evidenced only by a quiz; one portfolio item claimed against fifteen criteria; behaviours (such as professionalism or teamwork) never explicitly taught or evidenced; and the command verb of a criterion (describe, explain, evaluate, demonstrate) ignored. A useful map is criterion by criterion, distinguishes taught from assessed from evidenced, and checks that the evidence type matches what the criterion asks.
</context>

<task>
<course_outline>
{{course_outline}}
</course_outline>

<standards>
{{standards}}
</standards>

1. List every criterion or knowledge, skill and behaviour statement with its code exactly as given. Do not paraphrase codes or merge criteria.
2. For each, find where the course teaches it, where learners practise it, and where it is assessed; record the session or module reference.
3. Judge the evidence fit: does the assessment method match the criterion's command verb and context? (A "demonstrate in the workplace" criterion needs observation, witness testimony or a work product; an "evaluate" criterion needs written or oral judgement, not a list.)
4. Rate each criterion: fully covered (taught and assessed with fitting evidence), partly covered (taught but not assessed, or assessed with weak evidence), or missing.
5. Flag over-claims: a single activity mapped to many criteria, generic evidence, criteria claimed but only mentioned in passing.
6. Propose an evidence plan for every partial or missing criterion: the smallest change (add a question, a task, an observation point, a reflective account, a professional discussion) and where in the course it fits.
7. Summarise coverage counts and the top risks for approval or audit.
</task>

<constraints>
- Use only the standards text supplied; never invent criteria, codes, assessment rules or awarding-body requirements. If the user's text is incomplete or ambiguous, say which parts.
- Mark interpretations of what a criterion requires as your reading, to confirm against the awarding body's guidance or the end-point assessment plan.
- Be strict: "mentioned in a session" is not "assessed".
- If either the course outline or the standards are missing, ask for the missing one and stop.
</constraints>

<output_format>
## Summary
Counts: fully, partly, missing; top three risks.
## Coverage matrix
Table: Code | Criterion (short) | Taught where | Assessed where | Evidence type | Fit | Rating.
## Gaps
Bullets, by code.
## Over-claims and weak evidence
Bullets, by code.
## Evidence plan
Table: Code | Proposed change | Where in course | Evidence produced.
## Questions for the awarding body
Bullets.
</output_format>
