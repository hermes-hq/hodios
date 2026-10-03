---
schema: 1
id: write-instructor-guide
kind: prompt
title: Write a facilitator guide
description: Writes a facilitator guide so someone else can deliver an existing course or workshop, with timing, script cues, activity instructions, common questions and a materials list.
category: course-design
version: 1.0.0
status: incubating
stage: [build]
role: [teacher, consultant, manager]
requires: [none]
inputs: [document, notes]
output: [docs, script, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [facilitator-guide, train-the-trainer, instructor-notes, workshop-delivery, learning-and-development]
pairs_with:
  prompts: [design-workshop, design-course-outline, evaluate-training-effectiveness]
  personas: [instructional-designer]
args:
  - name: course_materials
    description: The existing materials to build from, e.g. the agenda, slide text or speaker notes, activity descriptions, handouts, objectives and session length.
    type: text
    required: true
  - name: facilitator_experience
    description: How experienced the person delivering it is. New facilitators get fuller scripts and more troubleshooting.
    type: enum
    enum: [new, experienced]
    default: new
output_contract:
  format: markdown
  sections: [At a glance, Before the session, Run of show, Segment guides, Common questions, Troubleshooting, Materials checklist, Gaps in the materials]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A course designed by one person and delivered by another loses quality at the hand-over: the purpose of each activity, the timing that keeps it on track, the debrief questions that turn an exercise into learning, and the answers to the questions participants always ask all live in the designer's head. A facilitator guide moves them onto paper. It tells the facilitator what to say and do, minute by minute, why each part matters, and what to cut when time runs short, without turning delivery into reading a script aloud.
</context>

<task>
Write a facilitator guide from these materials for a **{{facilitator_experience}}** facilitator.

<course_materials>
{{course_materials}}
</course_materials>

Facilitator level: new = include suggested wording for openings, instructions, transitions and debriefs, plus fuller troubleshooting; experienced = key messages and cues only, no full scripts.

1. **At a glance:** purpose, audience, outcomes, total time, group size, and the 3 key messages participants must leave with.
2. **Before the session:** preparation steps with timing (for example a week before, the day before, an hour before), room or virtual setup, and what to read or practise.
3. **Run of show:** a timed table for the whole session, with clock times or elapsed minutes that add up to the stated length, including breaks and a buffer.
4. **Segment guides:** for each segment:
   - purpose and the outcome it serves;
   - SAY cues (key points, or suggested wording for new facilitators), DO cues (actions, slides, handouts), and ASK cues (questions with what good answers include);
   - activity instructions exactly as the facilitator will give them, with grouping, timing and what participants produce;
   - the debrief questions that draw out the learning;
   - a "if short on time" option.
5. **Common questions:** 6 to 10 questions participants are likely to ask, with answers drawn from the materials. Where the materials do not answer one, say so and suggest how to respond ("Let me check and follow up").
6. **Troubleshooting:** quiet groups, a dominant participant, technology failure, running late, an activity that falls flat, a challenging or off-topic question.
7. **Materials checklist:** everything needed, with quantities per participant or group.
8. **Gaps in the materials:** anything missing or unclear that the facilitator or designer must resolve before delivery.
</task>

<constraints>
- Build only from the materials given. Do not add new content, facts, data or activities beyond what is needed to make the existing ones runnable; mark any addition as "suggested".
- Timings must add up to the session length in the materials. If the materials overrun, show where and propose cuts.
- Activity instructions are short enough to say in under a minute and are also written for a slide or handout.
- Use inclusive facilitation: varied ways to participate (pairs before whole group, writing before speaking), accessible materials, and no activity that requires sharing personal information.
- If the materials are too thin to build a guide (no agenda or objectives), list what is needed and stop.
</constraints>

<output_format>
## At a glance
Bullets.
## Before the session
Checklist with timing.
## Run of show
Table: Time | Segment | Method | Materials | Notes.
## Segment guides
One subsection per segment with Purpose · SAY · DO · ASK · Activity instructions · Debrief · If short on time.
## Common questions
Question → answer.
## Troubleshooting
Situation → what to do.
## Materials checklist
Checklist with quantities.
## Gaps in the materials
Bullets.
</output_format>
