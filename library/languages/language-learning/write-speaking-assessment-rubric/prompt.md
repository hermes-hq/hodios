---
schema: 1
id: write-speaking-assessment-rubric
kind: prompt
title: Write a speaking assessment rubric
description: Writes a CEFR-aligned speaking rubric for one class task, with band descriptors markers can apply consistently, anchor performances, a marking procedure and a feedback comment bank.
category: language-learning
version: 1.0.0
status: incubating
stage: [design]
role: [teacher]
requires: [none]
inputs: [text, notes]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cefr, speaking-test, rubric-bands, marker-reliability, comment-bank, oral-assessment]
pairs_with:
  personas: [language-assessment-specialist]
  prompts: [build-placement-test-for-intake, write-language-progress-report]
args:
  - name: target_language
    description: The language being assessed.
    type: string
    required: true
  - name: task
    description: The speaking task - what students do (presentation, pair discussion, role-play, interview), how long, alone or in pairs, what it counts for, and anything your school's scheme requires.
    type: text
    required: true
  - name: level
    description: The CEFR level the task is aimed at.
    type: enum
    enum: [A1, A2, B1, B2, C1, C2]
    default: B1
output_contract:
  format: markdown
  sections: [Task and criteria, Rubric, Anchor performances, Marking procedure, Comment bank]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a {{target_language}} teacher or course lead build a speaking rubric for one class task at CEFR {{level}}. Speaking rubrics usually fail because descriptors use vague comparatives ("good range", "some errors") that two markers read differently; because they reward native-like accent instead of intelligibility; because criteria overlap so one weakness is punished twice; and because the top band describes a level above the task, so nobody reaches it.

<task_description>
{{task}}
</task_description>
</context>

<task>
1. Restate the task in one line and decide whether interaction applies (pairs, role-play, interview) or not (monologue, presentation). Choose the criteria from the five CEFR qualitative aspects of spoken language: range, accuracy, fluency, interaction (only if the task has it) and coherence, plus phonology (intelligibility). Merge or drop criteria to keep 4-5. Give each criterion a weight and say why.
2. Write the rubric with 4 bands per criterion (0-3, or the teacher's scheme if given): band 2 describes a solid {{level}} performance for this task; band 3 describes a strong {{level}} performance with a few features of the next level; band 1 describes features of the level below; band 0 describes too little language to judge.
3. Write every descriptor as observable behaviour linked to the task: what the student says and does, with every frequency word defined once in a note under the rubric (for example, "occasional" = errors that do not stop the listener following and appear in a minority of utterances; set the exact meaning with your markers). Avoid "good", "adequate", "some" unless defined. Each descriptor is one or two sentences.
4. Keep phonology about intelligibility and the effort the listener needs, never closeness to a native accent.
5. Write short anchor performances: for bands 1, 2 and 3, a 4-6 line transcript extract of a student doing this task in {{target_language}}, with the band each criterion would get and the reason. Mark them clearly as invented samples for marker training.
6. Set out a marking procedure: what the marker listens for in each minute, note-taking grid, recording if allowed, double-marking 10-20 percent, and a moderation step where markers compare scores on the anchors before marking.
7. Write a comment bank: for each criterion and band, one strength comment and one next-step comment, in plain words the student understands, each ending with a concrete action.
</task>

<constraints>
- The rubric assesses only what the task elicits; say so if a criterion cannot be judged from this task.
- Do not claim the rubric is officially CEFR-validated; it is aligned to CEFR descriptors and should be checked against the Companion Volume and your institution's scheme.
- Do not quote official exam rubrics; write original descriptors.
- If the task description is too thin to write task-linked descriptors (no length, format or topic), ask for those items and stop.
</constraints>

<output_format>
## Task and criteria
One-line task, criteria with weights and why.
## Rubric
Table: Criterion | Weight | 3 | 2 | 1 | 0.
## Anchor performances
### Band 1, ### Band 2, ### Band 3: extract, then scores and reasons.
## Marking procedure
Numbered steps and a note-taking grid.
## Comment bank
Table: Criterion | Band | Strength comment | Next step.
</output_format>
