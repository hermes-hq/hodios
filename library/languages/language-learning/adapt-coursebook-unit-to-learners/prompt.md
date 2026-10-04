---
schema: 1
id: adapt-coursebook-unit-to-learners
kind: prompt
title: Adapt a coursebook unit to your learners
description: Adapts a language coursebook unit for a specific group, keeping its language aims while swapping irrelevant contexts, adding personalisation and cutting what will not land, lesson by lesson.
category: language-learning
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [coursebook, materials-adaptation, personalisation, syllabus, relevance]
pairs_with:
  prompts: [plan-vocabulary-recycling-across-unit, turn-realia-into-worksheet, plan-task-based-language-lesson]
args:
  - name: unit_summary
    description: The unit as it stands - language, level, title, the language aims, and each lesson's texts, listening, exercises and speaking or writing tasks, in your own words or pasted from the contents page. Do not paste whole copyrighted pages.
    type: text
    required: true
  - name: learners
    description: Who your learners are (for example refugee adults, software engineers, 14-year-olds, retirees), why they learn, what they need soon, lesson length and number, and anything in the unit you already know will not work.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Fit check, What to keep, Change list, New materials, Recycling and assessment]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a language teacher who must use a set coursebook make one unit work for a specific group. Coursebooks are written for an imagined general learner; real groups need different contexts, more or less of some skills, and tasks about their own lives. Good adaptation follows a few principles: keep the syllabus aims (the school and the next unit depend on them), change the context and the task, not the target language; add, cut, replace, reorder or simplify, each for a reason; and do not rewrite everything, because teachers have limited preparation time.

<unit>
{{unit_summary}}
</unit>

<learners>
{{learners}}
</learners>
</context>

<task>
1. Fit check: list the unit's language aims (grammar, vocabulary, functions, skills) and judge each part of the unit against the learners: relevant as is, relevant with a new context, or low value for them. Note cultural assumptions (holidays, hobbies, family types, money) that may exclude or bore this group, and anything that could be sensitive for them.
2. What to keep: the aims and the parts that already fit, so the teacher does not change what works.
3. Change list, lesson by lesson. For each change give the type (add, cut, replace, reorder, simplify, personalise), what changes, the reason linked to the learners, and preparation time (none, 5 minutes, 15+ minutes). Typical moves: swap a reading context for one from their world while keeping the target grammar; turn a gap-fill into a personalised task; replace a role-play with one they will actually face; cut an activity that practises a skill they do not need; add support for a skill they lack.
4. New materials: write in full the 2-4 most important replacements (a short text, a task card, personalised questions, a role-play), at the unit's level and using its target language.
5. Recycling and assessment: where the adapted unit recycles earlier language, and how to check the aims were met (keep the coursebook's review or test if the school requires it, and say how the adapted lessons still prepare for it).
</task>

<constraints>
- Keep the unit's language aims unless the teacher says they can change; flag clearly if an aim is truly unsuitable rather than dropping it silently.
- Do not reproduce coursebook texts; refer to them by page or exercise and write only original replacements.
- Prioritise changes by payoff per preparation minute; mark the three changes to make if time is short.
- Avoid stereotypes about the group (all engineers love technology, all retirees are slow, all refugees want to talk about home).
- If the unit summary lacks the aims or lesson contents, ask for them and stop.
</constraints>

<output_format>
## Fit check
Aims, then a table: Unit part | Fit (as is, new context, low value) | Why.
## What to keep
## Change list
Table: Lesson | Change type | What changes | Reason | Prep time. Mark the top three.
## New materials
Each under a ### heading.
## Recycling and assessment
</output_format>
