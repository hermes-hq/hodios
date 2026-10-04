---
schema: 1
id: plan-transition-to-secondary
kind: prompt
title: Plan a transition to secondary school
description: Plans the move from primary to secondary school for a class or a vulnerable pupil, with information sharing, visits, a transition booklet, first-week adjustments and check-ins.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [school-transition, enhanced-transition, special-educational-needs, wellbeing, year-7]
pairs_with:
  prompts: [write-one-page-pupil-profile, write-social-story, write-class-handover-notes]
  personas: [special-education-advisor]
args:
  - name: pupils_or_needs
    description: Who the plan is for - a whole class, a group, or one pupil - and what is known about their needs, worries and strengths (initials only). Say which schools are involved in general terms.
    type: text
    required: true
  - name: school_side
    description: Whether you are the sending-primary or the receiving-secondary school.
    type: enum
    enum: [sending-primary, receiving-secondary]
    default: sending-primary
  - name: start_date
    description: Optional. When the pupils start at secondary school, so the timeline can count back, e.g. "early September".
    type: string
output_contract:
  format: markdown
  sections: [Timeline, Information sharing, Visits and familiarisation, Transition booklet, First weeks, Check-ins and review, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A primary or secondary teacher, SENCO or transition lead is planning the move to secondary school. Most pupils settle within weeks; some, often pupils with special educational needs, anxiety, attendance or safeguarding concerns, or a difficult home situation, struggle and their attainment and wellbeing dip. What helps: early, specific information passed to the people who will actually teach the pupil; extra visits that make the new building, routines and adults familiar; one named key adult; and planned check-ins rather than waiting for problems. What goes wrong: information that sits in a file nobody reads, a single crowded induction day, and support that stops after the first week.

Your school's side: {{school_side}}
{{#start_date}}Start date: {{start_date}}{{/start_date}}
</context>

<task>
<pupils_or_needs>
{{pupils_or_needs}}
</pupils_or_needs>

1. Decide the level of transition for each pupil or group: universal (whole cohort), enhanced (extra visits and a key adult) or intensive (a personalised plan with family and specialists). Give the reason from the notes.
2. Timeline: count back from the start date (or from "start of the new school year" if none) across the spring and summer terms and the first half term, with who does what.
3. Information sharing: what to pass on (strengths, what helps, current support, attainment, attendance, friendships to keep or separate), how (a meeting for enhanced pupils, not only forms), and to whom. Sensitive and safeguarding information goes from safeguarding lead to safeguarding lead through the schools' secure process.
4. Visits and familiarisation: extra small-group visits, a photo tour, a map with key places, practising the journey, meeting the key adult, trying the lunch system and timetable.
5. Transition booklet: the pages to include, written for the pupil (key adults with photo placeholders, the day's timings, what to bring, who to ask for help, what to do if lost or worried) and a page the pupil fills in about themselves.
6. First weeks: practical adjustments (an early-leave pass between lessons, a quiet place at break, a buddy, a written timetable, a soft start), and what all teachers are told.
7. Check-ins and review: planned conversations with the pupil and family after week one, week three and half term, what to ask, and signs that need action (attendance drop, isolation, refusal, behaviour change).
</task>

<constraints>
- Initials only. Never put safeguarding detail in a booklet, profile or general staff briefing.
- Do not invent school routines, names or dates; use placeholders like [key adult] and list them under Questions.
- Sharing personal data follows the schools' data protection policies and, where required, consent from the family; say so.
- If the notes show a new or current risk (a fresh disclosure, recent self-harm, a pupil in danger), say first that it must go to the designated safeguarding lead today. If they repeat past or known safeguarding history and ask to put it in a booklet or briefing, leave it out, say it goes safeguarding lead to safeguarding lead through the secure process, and still plan a supportive transition from the non-sensitive information.
- Involve the pupil and family in every enhanced or intensive plan.
</constraints>

<output_format>
## Timeline
Table: When | Action | Who | Done.

## Information sharing
Bullets.

## Visits and familiarisation
Bullets per level.

## Transition booklet
List of pages with the content of each.

## First weeks
Bullets: adjustments per pupil or group, and the staff briefing points.

## Check-ins and review
Table: When | With whom | Questions | Warning signs.

## Questions
Placeholders and things to confirm.
</output_format>
