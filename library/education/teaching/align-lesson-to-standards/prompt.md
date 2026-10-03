---
schema: 1
id: align-lesson-to-standards
kind: prompt
title: Align a lesson or unit to standards
description: Maps a lesson or unit to the curriculum standards a teacher supplies, showing what is taught, practised and assessed, and flags gaps, depth mismatches and over-claims.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [document, text]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [curriculum-alignment, standards-based, coverage-audit, constructive-alignment]
pairs_with:
  prompts: [design-unit-plan, write-lesson-plan, write-learning-objectives]
args:
  - name: lesson_or_unit
    description: The lesson plan or unit plan to check, including objectives, activities and assessments.
    type: text
    required: true
  - name: standards
    description: The standards to align to, pasted with their codes and full text, e.g. from a national curriculum, state standards or an exam specification.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Alignment matrix, Gaps, Over-claims and depth mismatches, Suggested fixes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Plans often list standards they only touch. A standard is properly addressed when students are taught it, practise it, and are assessed on it at the depth its verb demands: a standard that says "analyse" is not met by a task that asks students to "identify". Alignment checks are most useful when they quote the evidence for each judgement and separate three problems: standards claimed but barely present (over-claims), standards present at a lower cognitive level than required (depth mismatches), and parts of a standard that nothing in the plan covers (gaps).
</context>

<task>
Check this lesson or unit against the standards given.

<lesson_or_unit>
{{lesson_or_unit}}
</lesson_or_unit>

<standards>
{{standards}}
</standards>

1. Break each standard into its assessable parts: the verb or verbs (the cognitive demand) and the content. A standard with "compare and contrast" or several content items has several parts.
2. For each part, find where the plan teaches it, where students practise it, and where it is assessed. Quote or cite the specific activity or item as evidence.
3. Rate each part: **Full** (taught, practised and assessed at the required depth), **Partial** (missing one of the three, or assessed at a lower depth), **Mentioned** (named but not actually taught or assessed), or **Absent**.
4. List the over-claims: standards the plan says it addresses but rates Mentioned or Absent.
5. List depth mismatches: where the plan's tasks require a lower level than the standard's verb (for example recall when the standard says evaluate), with the task quoted.
6. Note any significant plan content that maps to none of the standards, so the teacher can decide whether it earns its time.
7. Suggest the smallest changes that would close each gap, such as rewording an assessment item, adding a practice task, or dropping a claim.
</task>

<constraints>
- Use only the standards supplied. Do not add standards, codes or framework content from memory, and do not reinterpret a standard beyond its wording; if wording is ambiguous, say how you read it.
- Every rating cites evidence from the plan. Where you cannot find evidence, say so rather than inferring that it happens.
- Judge the plan as written. If the plan is an outline without activities or assessments, say what is missing and rate what you can.
- Keep suggestions within the plan's existing time and scope where possible; say when a standard needs more time than the plan has.
</constraints>

<output_format>
## Summary
Three bullets: overall alignment, the biggest gap, the most important fix.
## Alignment matrix
Table: Standard part | Taught (evidence) | Practised (evidence) | Assessed (evidence) | Rating.
## Gaps
Bullets: parts rated Absent or Partial, and what is missing.
## Over-claims and depth mismatches
Bullets with quoted evidence.
## Suggested fixes
Numbered, most impactful first, each naming the standard part it closes.
</output_format>
