---
schema: 1
id: plan-curriculum-night-presentation
kind: prompt
title: Plan a curriculum night presentation
description: Plans a teacher's curriculum night or open house talk with a timed slide outline, what students will learn, routines, how families can help at home and answers to likely questions.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [outline, script]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [curriculum-night, open-house, family-engagement, presentation-outline]
pairs_with:
  prompts: [write-back-to-school-letter, plan-parent-workshop, write-classroom-newsletter]
args:
  - name: grade_level
    description: Grade or subject and level.
    type: string
    required: true
  - name: minutes
    description: Length of the talk in minutes.
    type: number
    default: 15
  - name: year_content
    description: What the class covers this year (units, big projects, trips), and key routines (homework, grading, communication).
    type: text
    required: true
  - name: notes
    description: Optional context, e.g. "many families new to the country", "repeat talk every 20 minutes", "new grading system this year".
    type: text
output_contract:
  format: markdown
  sections: [Slide outline, Speaker notes, Take-home handout, Likely questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
At curriculum night families mostly want to know three things: that the teacher knows and cares about their child, what a normal day or week looks like, and how they can help. Teachers often run out of time because they try to cover every unit and policy. The talks that land are short, show real student work or a photo of the classroom routine, give two or three concrete ways to help at home, explain anything new (a grading system, a reading approach) in plain words, and make it clear how to raise individual concerns privately later, since the session is not the place for one family's issue. A one-page handout covers the details so the talk does not have to.
</context>

<task>
Plan a {{minutes}}-minute curriculum night talk for **{{grade_level}}**.
<year_content>
{{year_content}}
</year_content>
{{#notes}}
Notes: {{notes}}
{{/notes}}

1. Build a slide outline of 6 to 10 slides with minutes per slide adding to {{minutes}}, covering: welcome and who I am; a day or week in our class; what we will learn (big ideas, not every unit); how learning is assessed and reported; homework and routines; how to communicate with me; how to help at home; questions.
2. Write speaker notes for each slide: the two or three points to say, in plain language, including one concrete example or story.
3. Give 2 or 3 specific ways families can help at home, suited to the grade and doable for busy families or those who do not speak the language of instruction.
4. If anything is new or often misunderstood (a grading scale, a reading method, a maths approach), explain it in one slide with an example.
5. Draft a one-page take-home handout with the details (contacts, key dates, homework, supplies) so the talk does not need them.
6. List 6 to 8 likely questions with short answers, and a polite line for redirecting individual concerns to a private conversation.
</task>

<constraints>
- Use only the content given; use [placeholders] for missing details such as dates or contacts.
- No jargon or acronyms without explanation.
- Do not discuss individual students or use student work that identifies a child without permission.
- If families speak other languages, suggest translation or interpreter options and visuals.
</constraints>

<output_format>
## Slide outline
A table: Slide | Title | Minutes | Content.
## Speaker notes
Per slide.
## Take-home handout
Ready to print.
## Likely questions
Question → short answer, plus the redirect line.
</output_format>
