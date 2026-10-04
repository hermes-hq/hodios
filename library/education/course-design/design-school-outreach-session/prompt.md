---
schema: 1
id: design-school-outreach-session
kind: prompt
title: Design a school outreach session
description: Designs a one-off school outreach session run by a university, museum or employer, with a hands-on activity, a role model element, curriculum links, timing and follow-up resources for teachers.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [researcher, teacher]
requires: [none]
inputs: [text, topic]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [school-outreach, public-engagement, stem-outreach, role-models, hands-on-activities, widening-participation]
pairs_with:
  prompts: [design-workshop, design-summer-bridge-programme]
args:
  - name: topic
    description: What the session is about, e.g. "how vaccines are tested", "bridge engineering", "archaeology from objects", "careers in renewable energy".
    type: string
    required: true
  - name: pupil_age
    description: Age or school year of the pupils, e.g. "9-10", "Year 9", "16-17".
    type: string
    required: true
  - name: minutes
    description: Session length in minutes.
    type: number
    default: 60
  - name: setting
    description: Optional. Where it runs (in school, on campus, museum gallery, online), group size, equipment, who delivers (researcher, students, staff), and the goal (curiosity, subject choice, careers, widening participation).
    type: text
output_contract:
  format: markdown
  sections: [Session goal, Run of show, Hands-on activity, Role model moment, Curriculum links, Practicalities and safety, Follow-up for teachers, Evaluation]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Outreach sessions are often a researcher talking over 40 slides of their own work to pupils who were told to attend. Pupils remember sessions where they did something with their hands, solved a puzzle a real researcher faces, met someone they could picture themselves becoming, and got a clear link to what they study in class. Teachers value sessions that connect to the curriculum and come with something to use afterwards. Short sessions need ruthless focus: one big idea, one activity, one memorable person.

Topic: {{topic}}.
Pupils' age or school year: {{pupil_age}}.
Length: {{minutes}} minutes.
</context>

<task>
{{#setting}}
<setting>
{{setting}}
</setting>
{{/setting}}

1. **Session goal:** the one big idea pupils should leave with and the one feeling (for example "people like me can do this"), stated in pupil-friendly words for {{pupil_age}}.
2. **Run of show:** a timed plan for {{minutes}} minutes: a hook in the first three minutes (a mystery object, a surprising question, a live demo), a short framing, the hands-on activity as the largest block, the role model moment, and a close with a question to take away.
3. **Hands-on activity:** a task that mirrors real work in the field, with materials, set-up, pupil instructions, roles in small groups, questions to ask while circulating, an easier and a harder version, and what to do if it does not work.
4. **Role model moment:** how the presenter or a student ambassador briefly shares their route into the field (including setbacks and non-standard routes), and a short Q&A with prompts to get pupils asking.
5. **Curriculum links:** the subjects and topics this connects to at this age; mark specific curriculum references [check with the teacher] unless given.
6. **Practicalities and safety:** room and kit, risk assessment points for the activity, safeguarding basics for visiting adults (a teacher present at all times, no one-to-one contact, no collecting pupils' personal contact details, photo consent via the school), and accessibility.
7. **Follow-up for teachers:** a one-page teacher sheet with a 20-minute follow-up lesson idea, links to free resources described generically, and how pupils can find out more about routes into the field.
8. **Evaluation:** two or three quick measures (a before-and-after hands-up or card sort, one-word exit tickets, a teacher comment) and what not to claim from a single session.
</task>

<constraints>
- Pitch language, activity and examples at {{pupil_age}}; no jargon without a plain explanation.
- Talk-only time is under a third of the session.
- Use inclusive examples and role models, and avoid suggesting the field is only for "the clever ones".
- Do not invent curriculum references, statistics about the field, or named resources; describe them and mark [check].
- If the topic or age is missing, ask and stop.
</constraints>

<output_format>
## Session goal
Two lines.
## Run of show
Table: Minutes | Segment | Presenter does | Pupils do.
## Hands-on activity
Materials, set-up, instructions, circulating questions, variations.
## Role model moment
Bullets and Q&A prompts.
## Curriculum links
Bullets.
## Practicalities and safety
Checklist.
## Follow-up for teachers
Teacher sheet text.
## Evaluation
Bullets.
</output_format>
