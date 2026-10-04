---
schema: 1
id: write-class-handover-notes
kind: prompt
title: Write class handover notes
description: Writes end-of-year class handover notes for the next teacher with a class overview, pupils needing support, what worked, attainment gaps, family context to share and what to leave out.
category: teaching
version: 1.0.0
status: incubating
stage: [review, plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [handover, end-of-year, transition, record-keeping, pupil-support]
pairs_with:
  prompts: [write-one-page-pupil-profile, analyze-class-assessment-results, plan-transition-to-secondary]
args:
  - name: class_notes
    description: Your notes on the class and individual pupils (initials only) - attainment, support, friendships and groupings, what worked, routines, family contact, and anything the next teacher must know.
    type: text
    required: true
  - name: year_group
    description: The year group the class is moving into, e.g. "Year 4".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Class overview, Pupils needing support, What worked, Attainment and gaps, Family context to share, Left out and why, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A teacher is writing handover notes so the next teacher can start the year well.

Class moving into: {{year_group}} Good handovers give practical, current information the next teacher can act on in September: what helps each pupil, what to keep, and where the learning gaps are. They go wrong when they pass on reputations ("a nightmare", "lazy") that shape expectations before the new teacher has met the pupil; when they are a long list nobody reads; and when sensitive family or safeguarding information is written into a general document instead of going through the proper route.
</context>

<task>
<class_notes>
{{class_notes}}
</class_notes>

1. Class overview: size, the class's strengths and character, routines and rewards that worked, seating or groupings to keep or avoid (with a reason that is about learning or wellbeing), in under 150 words.
2. Pupils needing support: for each pupil mentioned with a need, the need as recorded (SEN support, plan, medical plan, English as an additional language, attendance), what works for them, current targets or interventions, and who else is involved. Strengths first. Practical and current.
3. What worked: specific strategies, resources and routines for this class.
4. Attainment and gaps: what the data or notes show by subject, topics not covered or not secure, and pupils who need catch-up or extension.
5. Family context to share: only what the next teacher needs for day-to-day support (preferred contact, language for letters, separated parents' contact arrangements as the notes state them).
6. Left out and why: list anything in the notes you did not include (opinions, reputations, safeguarding or sensitive family detail, old incidents no longer relevant), so the teacher can confirm.
</task>

<constraints>
- Initials only. Facts and current strategies, not labels or reputations; reword judgemental comments into observable, helpful information or leave them out.
- Safeguarding concerns, child protection details and sensitive health or family information are not written in the handover; say they are passed on by the designated safeguarding lead or through the school's secure records, and that a verbal handover can flag "speak to the DSL about X.Y.".
- Do not invent attainment, needs or strategies. Missing information goes under Questions.
- Keep the whole document readable in about 10 minutes.
</constraints>

<output_format>
## Class overview
Short paragraph.

## Pupils needing support
Table: Pupil | Need as recorded | What works | Current support | Others involved.

## What worked
Bullets.

## Attainment and gaps
Table: Subject | Secure | Not secure or not covered | Pupils for catch-up or extension.

## Family context to share
Bullets.

## Left out and why
Bullets.

## Questions
Bullets.
</output_format>
