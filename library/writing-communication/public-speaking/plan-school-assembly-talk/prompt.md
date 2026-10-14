---
schema: 1
id: plan-school-assembly-talk
kind: prompt
title: Plan a school assembly talk
description: Plans a school assembly for a teacher, head or visiting speaker with one message, a story or demonstration, pupil involvement and timings pitched to the age group in the hall.
category: public-speaking
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher, individual]
subject: [education-sector]
requires: [none]
inputs: [topic, notes]
output: [plan, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [school-assembly, head-teacher, pupils, whole-school, collective-worship]
pairs_with:
  prompts: [plan-audience-interaction, plan-classroom-visit-talk]
args:
  - name: topic
    description: "The theme or message, for example 'kindness online', 'resilience before exams', 'Black History Month', 'start of term: our school values', 'road safety'."
    type: string
    required: true
  - name: audience
    description: "Ages or year groups in the hall, roughly how many, the school's type and any rules (faith or non-faith assembly, what equipment is available, time slot), and who you are (class teacher, head, visitor)."
    type: string
    required: true
  - name: material
    description: Optional. Stories, examples, props or pupils' work you want to use, and anything going on in the school the assembly should respond to.
    type: text
  - name: minutes
    description: Time slot.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [Message, Running order, Script, Pupil involvement, Kit list, Follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An assembly hall is a hard room: hundreds of pupils on the floor or in rows, often across a wide age range, sitting still after a busy morning, with staff watching their behaviour. Teachers who run good assemblies follow a few rules. One message, said in a sentence the youngest child can repeat. A story, object or demonstration in the first two minutes, because attention drops fast and talk alone will not hold it. Pupil involvement that is controlled: hands-up questions with a few chosen answers, a volunteer or two at the front, a short call-and-response, or a class presenting, never an open free-for-all. Attention spans roughly track age (young children manage a few minutes of listening before needing to do something). A moment of reflection or a question to carry back to class lets teachers continue it. Mixed-age assemblies need language for the youngest and ideas for the oldest; secondary assemblies fail when they patronise. Sensitive topics (bereavement, online safety, current events) need checking with the safeguarding lead because some pupils may be directly affected.
</context>

<task>
Plan a {{minutes}}-minute assembly on: {{topic}}. Audience: {{audience}}.
{{#material}}
<material>
{{material}}
</material>
{{/material}}

1. State the one message in a sentence a pupil in the youngest year could repeat.
2. Choose an opening hook that works for this hall in the first two minutes: a short story, a prop or reveal, a picture, a quick show of hands, or a demonstration. Use the user's material first; if you suggest a story, make it clearly labelled as a suggestion or a known public story, not a fact about real pupils.
3. Build the running order with timings: entry and settling (allow time), hook, main story or explanation, involvement, the message said again, reflection or quiet moment (a prayer only if the audience field says it is a faith assembly and the user supplies or asks for one), close and exit.
4. Write the speaking script for the presenter's parts, at the level of the youngest pupils if the hall is mixed, with stage directions.
5. Design pupil involvement with control: exactly what is asked, how many answers, how volunteers are chosen and returned to their places.
6. List the kit and a follow-up question or short activity for classes.
7. If the topic is sensitive, add a note to check with the safeguarding or pastoral lead and to warn staff in advance.
</task>

<constraints>
- Do not invent stories about real pupils, staff or local events; label any illustrative story as such.
- Keep language age-appropriate; no frightening detail for young children on safety topics.
- Do not include religious content unless the audience field says it is a faith assembly; never choose prayers or scripture on the school's behalf without saying it should be checked.
- Respect the time slot, including entry and exit.
</constraints>

<output_format>
## Message
One sentence.
## Running order
Table: Time | What happens | Who.
## Script
The presenter's words with stage directions.
## Pupil involvement
Each moment of involvement and how it is managed.
## Kit list
Props, slides, music, microphones.
## Follow-up
A question or short activity for class teachers.
</output_format>
