---
schema: 1
id: design-structured-work-system
kind: prompt
title: Design a structured independent work system
description: Designs a structured work system for a pupil who needs visual structure to work independently, answering what work, how much, when it is finished and what comes next, with tasks and a fading plan.
category: special-education
version: 1.0.0
status: incubating
stage: [design]
role: [teacher, parent]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [education-sector]
tags: [structured-teaching, working-independently, visual-structure, workstation, task-boxes]
pairs_with:
  prompts: [create-visual-timetable, plan-one-to-one-support-session, break-down-life-skill-task]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: About the pupil (initials only) - age, how they understand information (objects, photos, symbols, written words), skills they have mastered, attention, motivators, and what happens now when asked to work alone.
    type: text
    required: true
  - name: space
    description: Where the system will be (classroom corner, shared table, home), and furniture and materials available. Optional.
    type: string
output_contract:
  format: markdown
  sections: [The four questions, Layout, The work system, Task ideas, Teaching the routine, Fading and generalising, What to record]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a teacher or parent set up a structured work system, an approach widely used with autistic pupils and others who need visual structure. Many pupils who "cannot work independently" can, once the work itself tells them four things without an adult talking: what work to do, how much, when it is finished, and what happens next. Experienced practitioners put only mastered skills in independent work (new skills are taught one-to-one first), make the system match how the pupil understands information (objects, colours, numbers, written lists), arrange work left to right or top to bottom with a clear "finished" place, end with something motivating, and step back so the adult does not become the prompt. Over time the system moves towards ordinary classroom tools such as a written checklist.

Pupil: {{pupil}}
{{#space}}Space: {{space}}{{/space}}
</context>

<task>
1. The four questions: for this pupil, how the system will show what work, how much, when finished and what next, at their level of understanding.
2. Layout: a description of the workstation (position, reducing distractions without isolating the pupil, left-to-right or top-to-bottom flow, finished box or tray), adapted to the space.
3. The work system: the matching method (for example colour or shape cards, numbers, a written list) and how the pupil uses it, step by step.
4. Task ideas: six to ten tasks based on mastered skills in the information given, each self-contained in a box or folder with a clear end, covering academic, fine motor and life-skill work, and the motivator that follows.
5. Teaching the routine: how to teach the system using minimal, mostly physical or gestural prompts from behind, fading quickly, with no verbal instructions once learned.
6. Fading and generalising: steps from the workstation to a written checklist at a class table, and to other settings.
7. What to record: independence on each step and time on task, for a short period each week.
</task>

<constraints>
- Only put skills the pupil has mastered into independent work; new skills belong in taught sessions.
- Do not frame the workstation as a punishment or isolation; it is a place to work successfully.
- Do not diagnose; base the design on the pupil's described strengths and needs.
- Initials only.
</constraints>

<output_format>
## The four questions
Table: Question | How the system answers it.
## Layout
## The work system
## Task ideas
Table: Task | Skill (mastered) | Materials | How it ends.
## Teaching the routine
## Fading and generalising
## What to record
</output_format>
