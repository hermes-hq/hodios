---
schema: 1
id: break-down-life-skill-task
kind: prompt
title: Break down a life skill task
description: Breaks a life skill such as making a drink or paying in a shop into a task analysis with prompt levels, a chaining plan and a data sheet, for learners with learning disabilities.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher, parent]
subject: [education-sector, social-care]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [task-analysis, backward-chaining, prompt-hierarchy, independence, learning-disabilities, post-16]
pairs_with:
  prompts: [create-visual-timetable, plan-one-to-one-support-session, write-iep-goals]
args:
  - name: task
    description: The life skill to teach, e.g. "make a cup of tea", "catch the number 12 bus to college", "pay for one item at a shop with a card".
    type: string
    required: true
  - name: learner_notes
    description: Optional. What the learner can already do, how they communicate, physical or sensory needs, what motivates them, and the setting (school, college, home). Initials only.
    type: text
  - name: chaining
    description: backward (adult does all but the last step; learner finishes and gets the reward), forward (learner learns step 1 first) or whole-task (all steps each time, prompting where needed).
    type: enum
    enum: [forward, backward, whole-task]
    default: backward
output_contract:
  format: markdown
  sections: [Task analysis, Prompting plan, Chaining plan, Data sheet, Safety and generalisation, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Staff in a special school, post-16 provision or a care setting, or a family carer, want to teach a life skill step by step. Task analysis works when the steps are small, observable and in the order this learner will actually do them; it fails when steps bundle several actions ("make the drink"), when adults keep prompting at the same level so the learner becomes prompt-dependent, and when the skill is only ever practised in one room with one adult and does not transfer to real life.

Chaining method: {{chaining}}
</context>

<task>
<task_to_teach>
{{task}}
</task_to_teach>
{{#learner_notes}}
<learner_notes>
{{learner_notes}}
</learner_notes>
{{/learner_notes}}

1. Write the task analysis: 8 to 20 numbered steps, each a single observable action that starts with a verb ("Fill the kettle to the line"). Note the materials and the natural cue that starts the task. Mark steps with a safety risk (hot water, roads, sharp items, money) with "SAFETY".
2. Note steps the learner can probably already do from the notes, and steps that may need an adaptation (a kettle tipper, a pre-loaded card, a picture shopping list) rather than more teaching.
3. Prompting plan: use the hierarchy full physical, partial physical, model, gestural, verbal, independent. Say which direction to use: most-to-least for new or safety steps (fewer errors), least-to-most for steps the learner partly knows. Add a short wait time (3 to 5 seconds) before each prompt and say how to fade prompts.
4. Chaining plan, using the chaining method above: the order steps are taught, which steps the adult completes, what counts as mastery of a step (for example independent on three sessions in a row), and when to move on.
5. Data sheet: a table to record the prompt level per step per session using codes (FP, PP, M, G, V, I).
6. Generalisation: how to vary people, places, materials and times once steps are mastered, and how to move from practice to the real situation.
</task>

<constraints>
- Ask for or flag missing essentials: the learner's current level and any physical needs. If absent, write the plan for a learner new to the task and list the questions.
- Physical prompts only with the learner's consent and within the setting's policy; never restraint. Stop and reassess if the learner is distressed.
- For community tasks (roads, buses, shops), keep road and personal safety steps adult-supervised until a risk assessment by the setting says otherwise.
- Respect dignity: age-appropriate materials and language for teenagers and adults.
- Do not invent the learner's abilities; mark guesses as [check].
</constraints>

<output_format>
## Task analysis
Table: Step | Action | Materials | Notes (SAFETY, likely already able, adaptation).

## Prompting plan
Bullets: direction, wait time, how to fade, praise and reinforcement.

## Chaining plan
Numbered teaching order with mastery criteria and what the adult does.

## Data sheet
Table: Step | Session 1 to Session 5 columns, with the code key below.

## Safety and generalisation
Bullets.

## Questions
What to check with the learner, family or team.
</output_format>
