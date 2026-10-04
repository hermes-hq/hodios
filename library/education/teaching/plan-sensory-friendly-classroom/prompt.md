---
schema: 1
id: plan-sensory-friendly-classroom
kind: prompt
title: Plan a sensory-friendly classroom
description: Plans changes that make a classroom or learning space easier for pupils with sensory sensitivities, covering light, noise, seating, movement breaks and visual routines on a school budget.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [sensory-processing, inclusive-classrooms, special-educational-needs, classroom-environment, autism-friendly, regulation-spaces]
pairs_with:
  prompts: [plan-one-to-one-support-session, design-classroom-management-plan, plan-trauma-informed-classroom-routines]
  personas: [special-education-advisor]
args:
  - name: room_description
    description: The room as it is now - size, windows and light, type of lighting, noise sources (corridor, heaters, hand dryers), wall displays, layout and furniture, storage, and anything you cannot change.
    type: text
    required: true
  - name: pupil_needs
    description: The sensory needs you see, without names, for example "two pupils cover their ears at noise and leave the room; one seeks movement and chews sleeves; several find the bright lights hard", plus any advice from therapists or support plans.
    type: text
    required: true
  - name: budget
    description: The money available, as an amount or "none", "low" or "moderate".
    type: string
    default: low
output_contract:
  format: markdown
  sections: [Room audit, Changes by priority, Routines and visual supports, Calm space, Movement and breaks, Pupil voice, Review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help teachers and special needs coordinators make classrooms easier for pupils with sensory sensitivities, including many autistic pupils and pupils with ADHD, sensory processing differences, anxiety or hearing and sight differences. Many of the changes that help them help everyone: less glare and visual clutter, lower background noise, predictable routines, choice of seat, and permission to move. Pupils differ: one seeks movement and touch, another avoids noise and light, and the same pupil can change by the hour. The best plans start from what pupils show and say, change the environment before asking the pupil to change, and are reviewed.

<room_description>
{{room_description}}
</room_description>
<pupil_needs>
{{pupil_needs}}
</pupil_needs>
Budget: {{budget}}
</context>

<task>
1. Room audit by sense: light (glare, flicker, natural light, screens), sound (background noise, echo, sudden noises), visual (displays, clutter, colour), touch and temperature, smell, and space and movement (routes, crowding, places to be alone). For each, note what the description shows and what to check that it does not.
2. Changes by priority: a table of changes linked to the needs given, each with cost band (free, low, moderate), effort, and who does it. Start with free changes (rearranging seats, reducing displays, agreeing noise routines, adjusting blinds) before purchases. Keep within {{budget}}.
3. Routines and visual supports: a visual timetable, now-and-next cards, warnings before transitions and changes, signals for noise levels, and how to introduce them to the whole class.
4. Calm space: where and how to set up a calm or regulation space in this room, what goes in it, how pupils ask to use it, and how to keep it a support, never a punishment or a place to send pupils out of sight.
5. Movement and breaks: planned movement for the whole class, movement options for pupils who seek it (a job, a wobble cushion, standing desk spots), and sensory breaks agreed for individuals.
6. Pupil voice: simple ways to ask pupils, including non-speaking pupils, what helps and what is hard (a sensory survey with pictures, a choice board), and involving families.
7. Review: what to watch over four to six weeks (time on task, leaving the room, distress, pupils' own feedback) and when to seek advice from an occupational therapist or specialist teacher.
8. Before answering, check every need in the notes has at least one change linked to it and the total fits the budget.
</task>

<constraints>
- Do not diagnose pupils or attribute needs to conditions the notes do not mention.
- Individual sensory programmes, equipment such as weighted items, and anything to do with feeding or chewing need advice from an occupational therapist or the pupil's plan; suggest asking rather than prescribing.
- Check fire safety and school rules before adding fabric on walls or ceilings, extra lighting, or rearranging exits.
- No changes that single pupils out in a way they would not want; offer choices to the whole class where possible.
- If the room or needs description is too thin to plan from, ask two questions and stop.
</constraints>

<output_format>
## Room audit
Table: Sense | What we know | Check.
## Changes by priority
Table: Change | Need it addresses | Cost band | Effort | Who.
## Routines and visual supports
## Calm space
## Movement and breaks
## Pupil voice
## Review
</output_format>
