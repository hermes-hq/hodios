---
schema: 1
id: plan-nursery-settling-in
kind: prompt
title: Plan a nursery settling-in schedule
description: Plans a key person's settling-in schedule for a new child at nursery or childcare, with gradual sessions, parent involvement, comfort items, and signs the child is ready for longer.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [notes, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [early-years, settling-in, key-person, nursery, separation-anxiety, parent-partnership]
pairs_with:
  prompts: [plan-early-years-activity, write-learning-story, welcome-newly-arrived-student]
  personas: [early-years-educator]
args:
  - name: child_age_months
    description: The child's age in months at the start of settling in.
    type: number
    required: true
  - name: family_notes
    description: What the family has shared, first name or initial only - routines for sleep and meals, comfort items, words or phrases in the home language, previous childcare, siblings, worries, any additional needs or medical plans, and the parent's working pattern and start date.
    type: text
  - name: days
    description: How many settling-in days the setting and family can plan for before the child's usual pattern starts.
    type: number
    default: 10
output_contract:
  format: markdown
  sections: [Before the first day, Schedule, Goodbyes, Ready for longer, Signs to slow down, Keeping the family informed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help early years key persons plan how a new child settles into nursery, a childminder's home or another childcare setting. Settling in is about the child forming a secure relationship with their key person before being left for long periods, so the plan is led by the child's cues rather than a fixed timetable. Separation distress is normal and often peaks between about eight months and two years; children who settle well are usually given gradual separations, a consistent key person, familiar routines and objects from home, and honest, short goodbyes. Parents settle too: a worried parent is reassured by updates and by seeing their child being comforted.

Child's age: {{child_age_months}} months
Days available: {{days}}
{{#family_notes}}
<family_notes>
{{family_notes}}
</family_notes>
{{/family_notes}}
</context>

<task>
1. Before the first day: a home visit or meeting to learn about the child, an "all about me" with routines, comforts, likes, words in the home language and how the child shows they are tired, hungry or upset; a photo book or a photo of the key person to look at at home; agreeing what comfort item comes in; and checking any care or medical plan with the family and the setting's lead.
2. Schedule across {{days}} days in a table: day, length of session, where the parent is (staying and playing, in the room but stepping back, leaving for a short time, leaving for longer), what the key person focuses on (bonding through play and care routines, first nappy or meal, first sleep), and the cue to move to the next stage. Adjust for {{child_age_months}} months: for babies, follow their own feed and sleep routines closely; for older toddlers, use play, a visual of the day and words for feelings.
3. Goodbyes: a short, consistent goodbye ritual; never slipping out unseen; how the key person comforts after the parent leaves; and what to say to the child.
4. Ready for longer: signs such as seeking the key person for comfort, being comforted within a few minutes, eating, sleeping and exploring.
5. Signs to slow down: prolonged distress, not eating or sleeping, withdrawal, or regression at home, and what to change. Say that every child is different and the plan can stretch.
6. Keeping the family informed: daily feedback (what the child did, ate, slept, how they were after goodbye, with a photo if the setting allows), a phone call during the first separations, a review meeting at the end, and how to raise worries.
7. Before answering, check the schedule fits {{days}} days, increases separation gradually, and follows any routines in the family notes.
</task>

<constraints>
- The child's cues lead. Present day lengths as a guide that the key person adjusts with the family.
- Follow the family's routines, cultural practices and language where given, and ask rather than assume.
- Any medical or care plan (allergies, medicines, feeding plans) is followed exactly as the family and the setting's policy require; do not give medical advice.
- If the child has additional needs, has experienced loss, care changes or trauma, or is a looked-after child, say the plan should be more gradual and agreed with the family and any professionals involved.
- If the child's age or the days available make the request unrealistic (for example a full day on day one for a baby), say so kindly and offer a gentler plan.
</constraints>

<output_format>
## Before the first day
Checklist.
## Schedule
Table: Day | Session length | Parent | Key person focus | Move on when.
## Goodbyes
## Ready for longer
## Signs to slow down
## Keeping the family informed
</output_format>
