---
schema: 1
id: design-esol-course-for-adults
kind: prompt
title: Design a community ESOL course
description: Designs a term-long community ESOL course for adult newcomers at one level, built on real-life topics, mixed literacy routes, rolling enrolment, patchy attendance and simple progress checks.
category: course-design
version: 1.0.0
status: incubating
stage: [design, plan]
role: [teacher, manager]
subject: [english]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [esol, adult-literacy, refugees, rolling-enrolment, can-do-statements, community-learning]
pairs_with:
  prompts: [design-adult-evening-class, write-learning-objectives]
args:
  - name: learner_profile
    description: Who the learners are - languages spoken, literacy in their first language and in the Latin script, prior schooling, work, childcare and shift patterns, why they come. Rough notes are fine; no names.
    type: text
    required: true
  - name: level
    description: Target level, using the UK adult ESOL levels (pre-entry, Entry 1-3, Level 1). Roughly pre-A1, A1, A2, B1, B2 on the CEFR.
    type: enum
    enum: [pre-entry, entry-1, entry-2, entry-3, level-1]
    default: entry-1
  - name: weeks
    description: Length of the term in weeks.
    type: number
    default: 12
  - name: setting
    description: Optional. Venue, hours per week, class size, volunteers, creche, funding or accreditation rules, and whether learners join any week.
    type: text
output_contract:
  format: markdown
  sections: [Needs snapshot, Term plan, Weekly lesson shape, Rolling enrolment and attendance, Progress checks, Signposting and wellbeing, Questions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Community ESOL learners are adults rebuilding a life in a new language: booking a GP appointment, talking to a child's teacher, reading a tenancy letter, getting and keeping work. A class at one level still mixes people with a university degree and people who never went to school, and fluent speakers who cannot read beside readers who cannot speak. Learners miss weeks for shifts, appointments, childcare and moves, and new people join mid-term.

Courses fail when they follow a grammar book instead of learners' lives, when literacy is treated as a speaking problem, when every lesson assumes last week's, and when progress is only shown by an exam at the end. Level: {{level}}. Term: {{weeks}} weeks.
</context>

<task>
<learner_profile>
{{learner_profile}}
</learner_profile>
{{#setting}}
<setting>
{{setting}}
</setting>
{{/setting}}

1. **Needs snapshot:** from the profile, name the two or three literacy routes the class needs (for example: emergent readers new to print, readers new to the Latin script, confident readers who need speaking) and the real situations learners face most. List what you would ask learners in week one to confirm this (a picture-based needs survey, not a form).
2. **Topic units:** group the {{weeks}} weeks into 3-4 week units on real-life topics chosen from the profile (health and the GP, children's school, work and job search, housing and bills, transport, shopping, local services, emergencies). Each unit ends in a real-world task (a role-played GP call, filling in a school absence note, a short job interview).
3. **Can-do outcomes:** three to five can-do statements per unit pitched at {{level}}, covering speaking and listening, reading and writing. Separate the literacy route outcomes when they differ.
4. **Lesson shape:** a repeatable weekly structure with a short recap that lets newcomers start, input with real or realistic materials (letters, forms, signs, recorded dialogues), controlled then freer practice, a literacy block split by route, and a close where learners say one thing they can now do.
5. **Rolling enrolment and attendance:** make every week self-contained within the unit theme; a welcome routine and buddy for new joiners; a one-page take-home summary per week with pictures; how to place a mid-term joiner (a quick oral and reading check).
6. **Progress checks:** light checks that respect adults (can-do self-assessment with pictures, a teacher checklist from observed tasks, a writing sample at the start and end of each unit), recorded as RARPA-style individual targets where the provider uses them. Note where an accredited exam would replace or add to this, without naming specific exam rules unless the user gave them.
7. **Wellbeing and signposting:** a short list of the local services to map with learners (advice, health, housing, employment support), marked [check locally], and how to respond if a learner raises trauma, immigration or housing crises (listen, do not counsel, refer to the named contact).
</task>

<constraints>
- Pitch everything at {{level}}; if the profile clearly shows learners at another level, say so and suggest splitting or differentiating.
- Never assume first-language literacy. Plan explicit literacy teaching for anyone who needs it (letter formation, sound-letter links, sight words for forms) rather than giving them the same worksheet.
- Use learners' languages as a resource (peer explanation, bilingual glossaries) rather than banning them.
- Topics must be adult and practical; no childish materials. Avoid tasks that make learners disclose immigration status, trauma or family circumstances in front of the group.
- Level names follow the UK adult ESOL framework. If the setting is outside the UK, use the CEFR equivalent and say to check the local framework.
- Do not invent funding rules, exam specifications or local services; mark them [check locally].
- If the profile is too thin to choose literacy routes or topics, ask for the missing items (literacy in any script, main life situations, hours per week) and stop.
</constraints>

<output_format>
## Needs snapshot
Literacy routes and priority situations, then the week-one needs check.
## Term plan
Table: Weeks | Unit topic | Real-world task | Can-do outcomes | Literacy route focus.
## Weekly lesson shape
Table: Minutes | Segment | What happens | Route differences.
## Rolling enrolment and attendance
Bullets.
## Progress checks
Bullets, with a sample can-do self-assessment line.
## Signposting and wellbeing
Bullets.
## Questions to confirm
Bullets.
</output_format>
