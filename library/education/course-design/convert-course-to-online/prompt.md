---
schema: 1
id: convert-course-to-online
kind: prompt
title: Convert an in-person course to online
description: Redesigns an in-person course for online or hybrid delivery, deciding what becomes live or self-paced and how activities, assessment and community change. Use before moving a course online.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher, consultant]
requires: [none]
inputs: [document, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [online-learning, hybrid-teaching, synchronous, asynchronous, course-redesign, digital-accessibility]
pairs_with:
  prompts: [design-blended-program, write-course-welcome-message, review-course-for-udl]
  personas: [instructional-designer]
args:
  - name: course_outline
    description: The current in-person course - weekly topics, session types (lecture, seminar, lab), activities, assessments and class size.
    type: text
    required: true
  - name: platform
    description: Optional learning platform and video tool available, e.g. "Moodle and Zoom", "Canvas and Teams". Leave empty for a platform-neutral plan.
    type: string
  - name: delivery
    description: fully-online means every student is remote; hybrid means some sessions or some students are in the room and others online.
    type: enum
    enum: [fully-online, hybrid]
    default: fully-online
output_contract:
  format: markdown
  sections: [Conversion principles, Activity conversion, Weekly rhythm, Assessment changes, Community and presence, Accessibility and technology, Instructor workload, Pilot checklist, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Moving a course online by streaming the same lectures on a video call ("emergency remote teaching") produces exhausted students and low engagement. A real conversion asks of each activity what it is for, then picks the mode that does that job best online: self-paced (asynchronous) for explanation, reading and reflection people can do at their own pace; live (synchronous) time for discussion, practice with feedback and connection. Online courses need more explicit structure than in-person ones: a predictable weekly rhythm, clear instructions, visible instructor presence and deliberate community building. Assessment usually needs redesign because invigilated exams do not transfer cleanly.
</context>

<task>
Redesign this course for **{{delivery}}** delivery.

<course_outline>
{{course_outline}}
</course_outline>

{{#platform}}Available tools: {{platform}}.{{/platform}}

1. If the outline gives no activities or no assessments (for example only a course title), ask for the topics, weekly session types and lengths, assessments and class size in one short list and stop. If only class size or session lengths are missing, assume typical values, state them under Assumptions and continue.
2. **Conversion principles:** 4 to 6 rules you applied, specific to this course.
3. **Activity conversion:** for every current activity, the new mode (live, self-paced, or dropped/merged), the online format (for example a 3 x 8-minute video set with a check question after each; a breakout case discussion; a collaborative document; a virtual or take-home lab) and why.
4. **Weekly rhythm:** a repeating week template with what opens when, live session times and length (no more than about 90 minutes live without a break), and deadlines that do not all fall on the same day. For hybrid, say how in-room and online students take part equally (roles, a room microphone, a co-host who watches the chat).
5. **Assessment changes:** for each assessment, keep, adapt or replace, focusing on what it must evidence. Prefer authentic and open-book tasks, staged submissions and short oral checks over remote proctoring; note the integrity and equity trade-offs.
6. **Community and presence:** week-1 onboarding activities, discussion structures that need real responses (not "post once, reply twice"), small stable groups, and how the instructor shows up each week (announcements, short videos, feedback).
7. **Accessibility and technology:** captions and transcripts, accessible documents, low-bandwidth options, time-zone fairness for live sessions (recordings plus an alternative participation task), and a minimum tech requirements statement.
8. **Instructor workload:** a realistic estimate of build time and weekly running time, and where to save effort (reuse, a teaching assistant, peer feedback).
9. **Pilot checklist:** what to test before launch.
</task>

<constraints>
- Do not simply move every lecture into a live video session; justify each live minute.
- Keep student workload equivalent to the in-person course; list the weekly hours.
- If a platform is named, describe features in general terms and say to check what the institution's version supports; do not invent menu paths.
- Labs, placements or practical skills that cannot be done remotely must be flagged with options (on-campus intensive, kits, simulations) rather than quietly dropped.
</constraints>

<output_format>
## Conversion principles
Numbered.
## Activity conversion
Table: Current activity | Purpose | New mode | Online format | Reason.
## Weekly rhythm
A day-by-day template table, then hybrid notes if relevant.
## Assessment changes
Table: Assessment | Keep / adapt / replace | New design | Integrity and equity notes.
## Community and presence
Bullets.
## Accessibility and technology
Bullets.
## Instructor workload
Build hours and weekly hours with savings.
## Pilot checklist
Checkbox list.
## Assumptions
Bullets: every value you assumed and what the instructor should confirm.
</output_format>
