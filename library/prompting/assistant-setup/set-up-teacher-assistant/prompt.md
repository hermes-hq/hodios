---
schema: 1
id: set-up-teacher-assistant
kind: prompt
title: Set up an AI assistant for a teacher
description: Sets up an assistant for a teacher with curriculum, year groups, school policies and no pupil names, plus saved prompts for planning, differentiation, marking feedback and parent emails.
category: assistant-setup
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [prompt, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [lesson-prep, pupil-privacy, differentiation, marking-feedback, school-policy]
pairs_with:
  prompts: [build-project-instructions, prepare-knowledge-files, write-lesson-plan]
  rules: [privacy-first-assistant-rules]
args:
  - name: teaching
    description: Subjects, year groups or grades, curriculum or exam board, country, school type, and typical class needs (for example mixed ability, many language learners).
    type: text
    required: true
  - name: school_rules
    description: "Optional: your school's or authority's rules on AI tools and pupil data, and any approved tool."
    type: text
  - name: tasks
    description: "Optional: the jobs you most want help with, for example lesson plans, worksheets, quizzes, report comments, parent emails."
    type: text
output_contract:
  format: markdown
  sections: [Teaching profile, Assistant instructions, Pupil data rules, Saved prompts, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Teachers lose time to generic AI output: lessons pitched at the wrong age, content from another country's curriculum, activities that ignore a 50-minute period or a class with no devices, and invented "curriculum codes". The other big risk is pupil data: names, grades, behaviour notes, special educational needs and safeguarding details are sensitive, and most schools and data protection laws restrict putting them into AI tools. A good setup records the teaching context once (curriculum, ages, period length, resources, class needs), makes the assistant ask before assuming, keeps pupils anonymous by design (initials or codes, no health or safeguarding detail), and leaves professional judgement, final marks and safeguarding decisions with the teacher.

<teaching>
{{teaching}}
</teaching>
{{#school_rules}}
<school_rules>
{{school_rules}}
</school_rules>
{{/school_rules}}
{{#tasks}}
<tasks>
{{tasks}}
</tasks>
{{/tasks}}
</context>

<task>
1. Write a teaching profile: subjects, ages or grades, curriculum and country, period length, resources, class needs. Mark gaps [CONFIRM].
2. Write assistant instructions, ready to paste, that:
   - pitch content to the stated age and curriculum, and say when unsure whether a topic is in the curriculum rather than inventing codes or objectives;
   - fit activities to the period length and resources;
   - offer support and stretch versions when asked to differentiate;
   - write feedback that names what was done well and one next step, in language the pupil can act on;
   - treat final grades, report decisions and anything about safeguarding as the teacher's call;
   - never ask for pupil names or identifying details.
3. Write pupil data rules: use initials or codes, never paste health, special needs detail beyond what a task needs, safeguarding notes, home circumstances or photos of pupils; follow school rules and approved tools. Quote the school rules if given; otherwise tell the teacher to check the school's data protection lead.
4. Write saved prompts for each task (or for planning, quiz, feedback and parent email by default): the prompt, what to paste in, and a quick check before use.
5. Give four tests, including one where the teacher pastes a pupil's full name with a diagnosis and one asking for an exam board specification reference.
</task>

<constraints>
- Do not invent curriculum codes, exam board specifics or school policies; mark them for checking.
- Safeguarding concerns are never handled by the assistant: the instructions must tell the teacher to follow the school's safeguarding procedure.
- Keep the instructions under about 2,000 characters.
</constraints>

<output_format>
## Teaching profile
Bullets with [CONFIRM] gaps.
## Assistant instructions
One fenced block, ready to paste.
## Pupil data rules
Bullets.
## Saved prompts
One short subsection per task.
## Tests
Four bullets: prompt and pass condition.
</output_format>
