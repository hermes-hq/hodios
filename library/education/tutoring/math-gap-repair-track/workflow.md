---
schema: 1
id: math-gap-repair-track
kind: workflow
title: Maths gap repair track
description: Finds and repairs missing prior knowledge in maths before a course or exam, from a prerequisite map and short diagnostic to a gap list, mini-lessons with practice and a retest.
category: tutoring
version: 1.0.0
status: incubating
stage: [plan, verify, learn]
role: [student, parent, teacher]
subject: [mathematics]
requires: [none]
inputs: [topic, text]
output: [diagram, quiz, plan, conversation]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [prerequisites, diagnostic-assessment, knowledge-gaps, mastery-learning, catch-up, retest]
pairs_with:
  prompts: [hint-through-problem, find-planted-errors]
  personas: [math-tutor]
  workflows: [new-tutee-onboarding-track]
args:
  - name: target_course
    description: The course, unit or exam the learner is preparing for, for example "A-level maths year 1", "first-year calculus", "nursing numeracy test", "Grade 9 algebra".
    type: string
    required: true
  - name: known_struggles
    description: Anything already known, for example "never got fractions", "forgets how to rearrange", recent marks or teacher comments. Optional.
    type: text
  - name: weeks
    description: Weeks available before the course or exam starts.
    type: number
    default: 4
steps:
  - {id: prerequisite-map, file: steps/01-prerequisite-map.md, stage: plan, gate: approve, artifact: "gap-repair/01-prerequisite-map.md"}
  - {id: diagnostic, file: steps/02-diagnostic.md, stage: verify, gate: approve, artifact: "gap-repair/02-diagnostic.md"}
  - {id: gap-list, file: steps/03-gap-list.md, stage: plan, gate: approve, artifact: "gap-repair/03-gap-list.md"}
  - {id: mini-lessons, file: steps/04-mini-lessons.md, stage: learn, gate: approve}
  - {id: retest, file: steps/05-retest.md, stage: verify, gate: none, artifact: "gap-repair/05-retest.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Finds the maths a learner is missing before {{target_course}} and repairs it in {{weeks}} weeks. Maths is cumulative: a shaky skill underneath (fractions, negative numbers, rearranging) makes every topic built on it feel impossible, and re-teaching the new topic does not help. This track maps what the course assumes, tests exactly those skills, repairs the gaps that block the most, and retests. Each step stops for approval or for the learner's answers.
{{#known_struggles}}
<known_struggles>
{{known_struggles}}
</known_struggles>
{{/known_struggles}}

Rules for every step:
- Ask for missing information (course, exam board, level, time per week) instead of guessing.
- Never invent the learner's answers or scores; wait for them.
- Check every maths item and answer before showing it.
- Diagnose kindly: a gap is a missing step, not a lack of ability. Keep encouragement specific.
- If gaps are very wide or progress stalls despite practice, suggest talking to the teacher about support or an assessment for maths learning difficulties.
