---
schema: 1
id: write-teaching-assistant-briefing
kind: prompt
title: Write a teaching assistant briefing
description: Writes a short one-lesson briefing for a teaching assistant with the objectives, which pupils to support and how, what to look for and what to report back, using initials only.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [teaching-assistant, support-staff, deployment, independence, lesson-briefing]
pairs_with:
  prompts: [write-lesson-plan, plan-intervention-group, differentiate-lesson]
args:
  - name: lesson_plan
    description: The lesson plan or a summary of it, including the objective, main activities and timings.
    type: text
    required: true
  - name: pupils_to_support
    description: Which pupils the assistant should support and their needs, using initials only, e.g. "J.K. - working below age-related in reading; A.M. - autism, finds group work and noise hard".
    type: text
    required: true
  - name: minutes_available
    description: How long the assistant will have to read the briefing before the lesson.
    type: number
    default: 5
output_contract:
  format: markdown
  sections: [This lesson, Your role through the lesson, Pupils to support, What to look for, What to report back]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teaching assistants add most when they know the lesson's purpose, are deployed deliberately, and help pupils become independent rather than doing the work for them; when they are briefed in a corridor thirty seconds before the lesson, they default to sitting beside the same pupils and supplying answers. Research on deploying assistants supports giving them the objective, specific strategies, and a clear role in each phase, while the teacher keeps responsibility for the lowest attainers' learning. This briefing must be readable in about {{minutes_available}} minutes.
</context>

<task>
<lesson_plan>
{{lesson_plan}}
</lesson_plan>

<pupils_to_support>
{{pupils_to_support}}
</pupils_to_support>

1. **Check privacy.** If the pupil notes contain full names, replace them with initials in the briefing and add one line saying you did. Do not add any diagnosis, label or detail that is not in the notes.
2. **This lesson:** the objective in one sentence, the key vocabulary, and the one thing that matters most for pupils to understand.
3. **Your role through the lesson:** for each phase of the lesson plan (input, guided practice, independent work, plenary), what the assistant does: where to be, who to work with, and what to say or ask. Include at least one phase where the assistant roves or works with a different group, so the teacher also works with the supported pupils.
4. **Pupils to support:** for each pupil by initials: their need as given, one or two specific strategies for this lesson (scaffolds, prompts, chunking tasks, pre-teaching a word, a movement break), what to avoid, and the independence goal (what they should try alone first).
5. **What to look for:** signs the objective is being met, and the misconceptions or sticking points likely in this lesson.
6. **What to report back:** a short template the assistant fills in during or after the lesson for each supported pupil: what they did independently, what support they needed, any misconceptions, anything the teacher needs to know today.
</task>

<constraints>
- Initials only, and only the needs the teacher supplied. Nothing in the briefing should identify a pupil if the sheet is left on a desk.
- Promote independence: the assistant asks questions and prompts before giving help, using a least-to-most prompting order (wait, prompt to recall the strategy, give a hint, show a similar example, then model).
- Keep it short enough to read in {{minutes_available}} minutes; plain words, no jargon or acronyms without explanation.
- If the lesson plan lacks an objective or the pupil notes lack needs, say what is missing in one line at the top and work with what is there.
- Before finishing, check the briefing against the lesson plan's phases and timings, and check that every supported pupil appears with a strategy and an independence goal.
</constraints>

<output_format>
## This lesson
Objective, key vocabulary, the one big idea.
## Your role through the lesson
Table: Phase (time) | Where you are | What you do and say.
## Pupils to support
Table: Pupil (initials) | Need | Strategies today | Avoid | Try alone first.
## What to look for
Bullets.
## What to report back
A short template with blank lines per pupil.
</output_format>
