---
schema: 1
id: adapt-lesson-for-visually-impaired-pupil
kind: prompt
title: Adapt a lesson for a visually impaired pupil
description: Adapts a lesson for a blind or partially sighted pupil, with materials in the right format, verbal description, tactile and audio alternatives, seating and lighting, and pre-teaching.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, document, notes]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [education-sector]
tags: [visual-impairment, low-vision, braille, tactile-graphics, lesson-adaptation]
pairs_with:
  prompts: [adapt-lesson-for-hearing-impaired-pupil, describe-diagrams-for-blind-learner, differentiate-lesson]
  personas: [special-education-advisor]
args:
  - name: lesson
    description: The lesson plan or outline - subject, objectives, activities, resources (slides, worksheets, diagrams, video, practical work) and timings.
    type: text
    required: true
  - name: pupil
    description: About the pupil (initials only) - what they can see and in what conditions according to the qualified teacher of visual impairment or report, preferred formats (font size, contrast, braille, audio, magnifier, screen reader), mobility, and what helps.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Before the lesson, Room and seating, Resource by resource, Teaching talk, Practical and group work, Checks for understanding, Questions for the visual impairment specialist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a class teacher adapt a lesson for a blind or partially sighted pupil. Teachers often enlarge a worksheet on the photocopier and stop there, but enlarged copies blur and spread across pages, diagrams lose meaning, and the pupil still misses what is written on the board and pointed to ("this one here"). Experienced specialist teachers plan ahead: materials go to the pupil's preferred format in advance (modified large print with clear fonts and spacing, braille, accessible digital files for a screen reader or magnifier), diagrams are simplified or made tactile or described, the teacher reads aloud everything written, uses names instead of "this" and "over there", pre-teaches new vocabulary and concepts that rely on sight, and allows extra time because reading by touch, magnification or audio is slower. Mobility and safety matter in practical lessons.

Lesson: {{lesson}}
Pupil: {{pupil}}
</context>

<task>
1. Before the lesson: what to send to whoever produces adapted materials and how far in advance; concepts and vocabulary to pre-teach, especially visual ones (colours, graphs, maps, spatial words).
2. Room and seating: position relative to the board and light sources, glare, contrast, clear routes, storage for equipment, and a consistent layout.
3. Resource by resource: for each resource in the lesson, the adaptation (modified large print specification, braille, accessible digital version, tactile diagram, real objects, audio description, a simplified diagram), and anything that cannot be adapted well and what to use instead.
4. Teaching talk: verbalising everything written or shown, naming pupils in discussion, describing images and video, avoiding vague pointing language.
5. Practical and group work: safe handling of equipment, roles in group work that give the pupil real participation, and extra time.
6. Checks for understanding that do not rely on sight.
7. Questions for the qualified teacher of visual impairment or specialist service.
</task>

<constraints>
- Base adaptations on what the pupil's specialist reports say they can see and prefer; do not assume all visually impaired pupils need braille or large print.
- Do not diagnose or interpret eye conditions beyond the information given.
- Initials only.
- Keep the learning objective the same unless the user asks to modify it; adapt access, not ambition.
</constraints>

<output_format>
## Before the lesson
## Room and seating
## Resource by resource
Table: Resource | Adaptation | Who prepares it | When.
## Teaching talk
## Practical and group work
## Checks for understanding
## Questions for the visual impairment specialist
</output_format>
