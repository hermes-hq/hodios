---
schema: 1
id: analyze-class-assessment-results
kind: prompt
title: Analyse a class's assessment results
description: Analyses a class's scores by item and standard to find the weakest skills, likely misconceptions, suspect items and reteaching groups. Use after marking a test or quiz.
category: teaching
version: 1.0.0
status: incubating
stage: [review]
role: [teacher]
requires: [none]
inputs: [dataset, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [item-analysis, data-driven-instruction, reteaching, formative-assessment]
pairs_with:
  prompts: [design-formative-assessment, differentiate-lesson, write-multiple-choice-questions]
args:
  - name: scores
    description: The score table pasted as CSV or a table, one row per student (initials or IDs, not full names) and one column per item; letter answers per item help find misconceptions.
    type: text
    required: true
  - name: item_to_standard_map
    description: Optional mapping of items to standards or skills, e.g. "Q1-Q4 = 5.NF.1 adding fractions; Q5-Q8 = 5.NF.2 word problems", plus the answer key if letters are given.
    type: text
  - name: class_size
    description: Optional number of students in the class, to spot missing rows (absentees or unsubmitted work).
    type: number
output_contract:
  format: markdown
  sections: [Data check, Headline findings, Results by standard, Item analysis, Likely misconceptions, Reteaching groups, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A class average says almost nothing a teacher can act on. What they need is which skills are weak for most of the class (re-teach to everyone), which are weak for a few students (small group), which items were probably badly written rather than badly learned, and what the wrong answers say about how students are thinking. With class-sized data the numbers are small, so the analysis must be honest about what a handful of responses can and cannot show.
</context>

<task>
Analyse these assessment results.

<scores>
{{scores}}
</scores>
{{#item_to_standard_map}}
<item_to_standard_map>
{{item_to_standard_map}}
</item_to_standard_map>
{{/item_to_standard_map}}
{{#class_size}}Class size: {{class_size}} students.{{/class_size}}

1. **Check the data first.** State how many students and items you read, the scoring (right/wrong, points, letters), and any problems: blank cells, inconsistent scales, rows that look duplicated{{#class_size}}, and how many of the {{class_size}} students are missing{{/class_size}}. If the table cannot be read reliably, stop and say exactly what format you need.
2. **Per item:** compute the percentage correct (or mean score as a percentage of the maximum). If letter answers are given, count how many chose each option.
3. **Per standard or skill:** group items using the map. If no map is given, infer skill groups from the item content if it is visible and mark them "inferred"; otherwise analyse items only and say so. Report the class percentage per standard and the number of students at or above 80%, 50 to 79%, and below 50% on it.
4. **Suspect items:** flag items that may be flawed rather than hard: an item that students who did well overall missed more often than weaker students, an item where one wrong option drew more answers than the key, or an item far out of line with others on the same standard. Recommend checking the item before re-teaching.
5. **Misconceptions:** from popular wrong answers and patterns of errors, state the likely misconception behind each, and mark it as a hypothesis to confirm by talking to two or three students.
6. **Reteaching groups:** decide which skills need whole-class re-teaching (roughly under 60 to 70% correct for the class), which need a small group, and which students are secure and need extension. List students by the identifiers given.
7. **Next steps:** the three highest-impact actions for the next one or two lessons.
</task>

<constraints>
- Do the arithmetic carefully and show the numbers that each conclusion rests on. Do not round away differences that matter, and do not report differences of one or two students as meaningful trends.
- With fewer than about 5 items on a standard, or fewer than about 15 students, say that the evidence is thin.
- Never invent scores, answers, standards or students. If something you need is missing, say what and continue with what you have.
- Describe performance on skills, not the worth of students: no labels like "low kids" or "weak students". Groups are temporary and based on this assessment only.
- Use only the identifiers in the data. If the data contains full names, refer to students by initials in your output and remind the teacher not to share identifiable data with tools their school has not approved.
- Thresholds above are defaults; if the teacher's message gives their own mastery cut-off, use it.
</constraints>

<output_format>
## Data check
Students, items, scoring, and any problems found.
## Headline findings
3 to 5 bullets a teacher can read in 30 seconds.
## Results by standard
Table: Standard or skill | Items | Class % | ≥80% | 50–79% | <50% | Action (whole class / small group / secure).
## Item analysis
Table: Item | % correct | Most common wrong answer (if letters given) | Flag.
## Likely misconceptions
Bullets: evidence → hypothesis → how to confirm it.
## Reteaching groups
For each group: skill, students, what to do.
## Next steps
Three numbered actions.
</output_format>
