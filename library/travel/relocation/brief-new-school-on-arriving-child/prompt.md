---
schema: 1
id: brief-new-school-on-arriving-child
kind: prompt
title: Brief a new school on your arriving child
description: Writes a parent's handover to a child's new school after a move from another country - previous schooling, levels, languages, needs, records to send and questions for a good start.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [document, preferences]
output: [message, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [school-handover, school-records, new-pupil, moving-abroad, children]
pairs_with:
  prompts: [choose-school-type-abroad, raise-child-in-new-country, learn-school-vocabulary-for-parents]
args:
  - name: child
    description: Age, the school year joined, previous school system and curriculum, recent reports or levels in reading and maths, languages and level in the school's language, strengths, interests, friendships, and how they feel about the move.
    type: text
    required: true
  - name: needs
    description: Learning support, diagnoses, allergies, medicines, dietary or religious needs, or past difficulties the school should know about. Share only what you are comfortable with. Optional.
    type: text
  - name: school
    description: The new school's country and type, start date, the language you will write in, and what the school has already asked for. Optional.
    type: text
output_contract:
  format: markdown
  sections: [The handover message, Records to send, Safety-critical information, Questions for the school, First weeks at home]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents introduce a child to a new school after an international move. You know schools often receive little from a previous system abroad: reports in another language, grades on an unfamiliar scale, and no sense of the child as a person. You know a short, well-organised handover helps the school place the child well, plan language support and pair them with a buddy, and that the most useful content is concrete: what the child could do recently in reading, writing and maths with examples, the curriculum topics covered, languages and their level, what helps them learn, what they found hard, how they react to stress, and interests that give teachers an easy way in. You know safety-critical information (allergies, medicines, medical conditions, custody arrangements and who may collect) must reach the school before the first day through the school's official forms. You know teachers prefer one page they can read in two minutes, with records attached.

Child: {{child}}
{{#needs}}Needs: {{needs}}{{/needs}}
{{#school}}School: {{school}}{{/school}}
</context>

<task>
1. The handover message: a one-page message to the class teacher or head of year, in the language the parent chose, covering the child's previous schooling, current levels with examples, languages, how they learn best, what to watch for, interests, how they feel about the move, and how the parent prefers to be contacted.
2. Records to send: a checklist of documents to gather (recent reports, assessments, learning support plans, vaccination or health records, work samples, curriculum outlines), which may need translation, and how to explain an unfamiliar grading scale.
3. Safety-critical information: allergies, medicines, conditions and who may collect the child, with the advice to put them on the school's official forms as well as in the message.
4. Questions for the school: placement and year group, language support, a buddy, how progress will be checked in the first term, how the school contacts parents, and what to expect on the first day.
5. First weeks at home: how to support the child after school, signs to raise with the teacher, and when to request a check-in meeting.
</task>

<constraints>
- Write only from what the parent provides; do not invent grades, diagnoses or achievements.
- Keep the message factual and balanced, neither overselling nor dwelling on problems.
- If the parent wants to leave out safety-critical information such as an allergy or a medical condition, explain why the school needs it; respect their choice on other private matters.
- Do not state the new country's school rules as fact; frame them as questions.
</constraints>

<output_format>
## The handover message
The message, ready to send.
## Records to send
## Safety-critical information
## Questions for the school
## First weeks at home
</output_format>
