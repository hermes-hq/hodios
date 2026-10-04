---
schema: 1
id: design-peer-learning-circle
kind: prompt
title: Design a peer learning circle
description: Designs a facilitated peer learning circle around a free online course, with a weekly meeting format, facilitator script, goal-setting, check-ins and a plan to keep going without an expert.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher, manager, individual]
requires: [none]
inputs: [text, topic]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [learning-circles, peer-learning, facilitation, library-programmes, online-courses, community-learning]
pairs_with:
  prompts: [design-retiree-learning-group, build-self-study-curriculum]
args:
  - name: topic
    description: What the circle will learn and, if known, the free course or materials it will follow (title, provider, weekly hours).
    type: string
    required: true
  - name: weeks
    description: Number of weekly meetings.
    type: number
    default: 6
  - name: setting
    description: Optional. Host (library, community centre, workplace), meeting length, devices and wifi available, who is likely to join, and the facilitator's own background.
    type: text
output_contract:
  format: markdown
  sections: [Circle overview, Meeting format, Week-by-week plan, Facilitator script, Goals and check-ins, Keeping it going]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most people who start a free online course never finish it alone. A learning circle is a small group (about 4-12 people) that meets weekly to work through the same online material together, with a facilitator who is not an expert in the topic: their job is to host, keep time, ask good questions and help people get unstuck. Circles work when meetings have a steady rhythm, learners set their own goals, the group solves problems together instead of waiting for an answer, and people feel missed if they do not come. They fail when the facilitator tries to teach, when the course is too hard or too long for the time, or when the group stops after the material ends with no next step.

Topic: {{topic}}. {{weeks}} weekly meetings.
</context>

<task>
{{#setting}}
<setting>
{{setting}}
</setting>
{{/setting}}

1. **Circle overview:** a short invitation for a flyer or post, who it suits, the material and the time learners need between meetings. If no material is named, describe what to look for in a free course (clear weekly units, no paywall for the core content, works on the devices available) and mark the choice [to select].
2. **Meeting format:** a repeatable 90-minute meeting (or the given length): check-in round, recap of the week's material, working time on the course with peers, a group problem-solving or discussion activity, reflection, and planning for next week.
3. **Week-by-week plan:** for each of the {{weeks}} meetings, the course section, a discussion or activity idea, and what learners do before the next meeting. Include a first meeting for goals and tech set-up, and a final meeting for sharing and next steps.
4. **Facilitator script:** short, sayable wording for opening the first meeting, running check-ins, answering "I don't know" honestly ("Let's find out together"), helping someone stuck without solving it for them, drawing in quiet members, and closing.
5. **Goals and check-ins:** a simple personal goal card, a weekly one-line progress check, and how to respond when someone falls behind.
6. **Keeping it going:** handing facilitation to members, what happens after the last week (a new course, a project, a meet-up), and a short end feedback round.
</task>

<constraints>
- The facilitator is a host, not a teacher. Do not write lectures for them.
- Keep the between-meeting load realistic (state hours per week) and the course pitch right for beginners unless the setting says otherwise.
- Do not invent specific course titles, providers or links; describe criteria or mark [to select] unless the user named one.
- Include accessibility and digital inclusion: device lending or pairing, captions, offline notes, and help with log-ins without sharing passwords.
- If the topic is missing, ask and stop.
</constraints>

<output_format>
## Circle overview
Invitation text and practical details.
## Meeting format
Table: Minutes | Segment | What happens.
## Week-by-week plan
Table: Week | Course section | Activity | Before next meeting.
## Facilitator script
Short headed blocks of wording.
## Goals and check-ins
Goal card and weekly check.
## Keeping it going
Bullets.
</output_format>
