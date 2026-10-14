---
schema: 1
id: choose-school-for-child
kind: prompt
title: Choose a school for your child
description: Compares schools for a particular child on fit, journey, results in context, ethos, support and admission chances, and gives the questions to ask on visits and a ranked shortlist.
category: decision-making
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, notes, preferences]
output: [table, questions, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [school-choice, admissions, school-visits, child-wellbeing, shortlist]
pairs_with:
  prompts: [choose-school-type-abroad, compare-options-matrix, decide-where-to-live]
args:
  - name: child
    description: Your child - age and stage, personality, interests, friendships, any additional needs, and what they say they want.
    type: text
    required: true
  - name: schools
    description: The schools you are considering, with what you know about each (distance, type, inspection reports, results, impressions, fees if any).
    type: text
    required: true
  - name: family
    description: Optional - your country or region, travel and work constraints, budget, siblings' schools, and what matters most to you.
    type: text
output_contract:
  format: markdown
  sections: [What matters for this child, Comparison, Reading the results, Admission chances, Questions for visits, Shortlist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents choose a school for a specific child. Parents often rank schools by headline results, which mostly reflect the intake rather than what the school adds; a school with average results and a strong record of progress may do more for a child than one that selects high achievers. What usually matters more for a particular child: whether they will be happy and feel they belong, the journey (a long daily commute wears children and families down over years), the support for any additional needs or for very able children, class sizes, pastoral care and how bullying is handled, the breadth of activities that fit the child's interests, and whether friends or siblings will be there. Ethos and discipline approach suit some children more than others. Admission rules (catchment, distance, siblings, faith, selection tests, deadlines) decide what is actually available, so a realistic shortlist includes a likely option. Visits are most useful when parents ask specific questions and watch ordinary lessons and break times, not only the open-day presentation.

Child:
<child>
{{child}}
</child>

Schools:
<schools>
{{schools}}
</schools>
{{#family}}Family situation and priorities:
<family>
{{family}}
</family>
{{/family}}
</context>

<task>
1. Draw out what matters for this child from the description: needs, temperament, interests, friendships, the child's own view. Add the family's practical constraints. Turn these into five to seven criteria with rough importance.
2. Compare the schools on those criteria using only what the parent provided; mark unknowns as "find out".
3. Read the results in context: explain the difference between attainment and progress, how intake affects results, and what the inspection or report extracts given suggest. Do not quote figures that were not provided.
4. Assess admission chances in general terms from what the parent said (distance, catchment, siblings, selection), and tell them to confirm the rules and deadlines with the school or local admissions authority.
5. Write questions for visits, tailored to this child (for example how they support a shy child to settle, how they stretch a strong reader, how they handle additional needs), plus what to observe.
6. Give a ranked shortlist with reasons, including at least one realistic option, and what the visits need to confirm.
</task>

<constraints>
- Do not state school results, inspection grades, admission criteria or deadlines as fact unless the parent provided them.
- Keep the child's wellbeing and view central; do not rank on prestige alone.
- If the child has additional needs, mention that formal support plans or assessments may affect admissions and that local rules should be checked with the school or authority.
- Stay neutral between types of school (state, private, faith, selective, home education) unless the parent's criteria point one way.
</constraints>

<output_format>
## What matters for this child
Criteria with importance.

## Comparison
Table: Criterion | School A | School B | ..., unknowns marked "find out".

## Reading the results
Short explanation applied to these schools.

## Admission chances
Per school, with what to confirm.

## Questions for visits
Grouped questions and things to observe.

## Shortlist
Ranked, with reasons and what to confirm.
</output_format>
