---
schema: 1
id: design-retiree-learning-group
kind: prompt
title: Design a peer-led learning group for retirees
description: Designs a peer-led interest group for older adults on a topic such as history, languages, science or art, with a session format, rotating presenters, discussion, outings and accessibility.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [individual]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [older-adults, lifelong-learning, peer-led, interest-group, third-age, group-convenor]
pairs_with:
  prompts: [design-peer-learning-circle, design-adult-evening-class]
args:
  - name: topic
    description: The group's interest, e.g. "local history", "Italian conversation", "astronomy", "art appreciation", "reading Shakespeare".
    type: string
    required: true
  - name: sessions
    description: Number of meetings in the first programme (for example one term).
    type: number
    default: 10
  - name: group_details
    description: Optional. How many members, their range of knowledge, where you meet and for how long, budget, mobility or hearing needs, and whether anyone has expertise to share.
    type: text
output_contract:
  format: markdown
  sections: [Group purpose, Session format, Programme, Presenter guide, Outings and extras, Accessibility, Running the group]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Peer-led learning groups for older adults, in the spirit of the University of the Third Age movement, have no teachers or exams: members share what they know, learn together for the pleasure of it, and the convenor organises rather than lectures. Groups thrive on a predictable format, real discussion, variety of voices and a social side. They struggle when the convenor or one expert does all the talking, when sessions are too long or hard to hear, when new members feel the group is a closed circle, or when nobody else will take a turn presenting because it feels like an exam.

Topic: {{topic}}. Programme: {{sessions}} meetings.
</context>

<task>
{{#group_details}}
<group_details>
{{group_details}}
</group_details>
{{/group_details}}

1. **Group purpose:** a two-sentence description for a newsletter or noticeboard, who it suits (beginners welcome?) and what members can expect to get out of it.
2. **Session format:** a repeatable 90-120 minute meeting (or the length given): welcome and news, a 20-30 minute member talk or shared activity, discussion with three or four prepared questions, a tea break, a second activity (reading aloud, object handling, listening, practice in pairs), and planning next time.
3. **Programme:** themes for each of the {{sessions}} meetings that build a sense of journey, with a suggested format for each (member talk, shared reading, guest speaker, film or recording, hands-on, outing), and who might lead.
4. **Presenter guide:** a one-page guide that makes taking a turn easy: choose a small slice, 20 minutes, two or three objects or pictures, a handout of no more than one page in large print, end with questions for the group. Include pairing nervous presenters and the option of leading a discussion instead of giving a talk.
5. **Outings and extras:** visits, walks or events linked to the topic, with access and cost notes to check, and low-cost reading or listening between meetings.
6. **Accessibility:** hearing (seating, microphone, one person speaks at a time), sight (large print, contrast, slides readable from the back), mobility (venue access, seating with arms, breaks), and memory-friendly recaps.
7. **Running the group:** convenor tasks, sharing the jobs (tea, room, records), welcoming newcomers, handling a dominant talker kindly, keeping costs low, and a short feedback round at the end of the programme.
</task>

<constraints>
- No teacher-pupil hierarchy: language and format treat members as equals with life experience to share.
- Do not invent venue, outing or speaker details, prices or access facts; mark them [check].
- Keep tasks optional; no homework, tests or pressure to present.
- If the topic is very broad ("culture"), suggest three narrower options and ask which to plan, or plan the most likely one and say so.
</constraints>

<output_format>
## Group purpose
Short paragraph.
## Session format
Table: Minutes | Part | Who leads.
## Programme
Table: Meeting | Theme | Format | Possible lead.
## Presenter guide
Bullets, ready to print.
## Outings and extras
Bullets.
## Accessibility
Bullets.
## Running the group
Bullets.
</output_format>
