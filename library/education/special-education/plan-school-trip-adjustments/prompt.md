---
schema: 1
id: plan-school-trip-adjustments
kind: prompt
title: Plan school trip adjustments for a pupil
description: Plans the adjustments a pupil with special educational needs or a disability needs to take full part in a school trip - preparation, travel, sensory, care, staffing and a calm exit plan.
category: special-education
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [school-trips, reasonable-adjustments, inclusion, risk-assessment, sensory-needs]
pairs_with:
  prompts: [plan-field-trip, write-social-story, create-visual-timetable, write-intimate-care-plan]
  personas: [special-education-advisor]
args:
  - name: pupil
    description: The pupil's needs that matter for this trip - communication, mobility, sensory, medical, personal care, behaviour, dietary - what helps them, and what has gone well or badly on past outings. Use initials.
    type: text
    required: true
  - name: trip
    description: Where, when, how long, how the group travels, the activities, group size and staffing, and anything known about the venue's facilities.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Questions to settle first, Before the trip, Travel, At the venue, Medical and care, Staffing and roles, Calm exit plan, Risk assessment additions, After the trip]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pupils with special educational needs or disabilities are still too often left out of trips, sent home early, or told to come only if a parent attends, when planned adjustments would let them take part. In many countries equality law expects schools to make reasonable adjustments so disabled pupils are not disadvantaged, though the exact duty differs by country. The adjustments that matter are usually practical: a pre-visit or photos of the venue, a visual schedule and a social story, a quiet space identified in advance, accessible toilets and changing facilities checked rather than assumed, medication and care plans travelling with a trained adult, a named adult the pupil trusts, and an agreed calm exit plan so that a hard moment does not end the day for everyone. The family usually knows what works and should help plan, not be asked to fill a staffing gap.
</context>

<task>
Plan trip adjustments for this pupil.

<pupil>
{{pupil}}
</pupil>

<trip>
{{trip}}
</trip>

1. Questions to settle first: what you need from the family, the pupil, the venue and the school's trip lead before the plan is final (for example accessible routes, toilets with changing benches, quiet areas, lunch arrangements, the venue's own access support).
2. Before the trip: preparation matched to the pupil's needs, such as a pre-visit, photos or video of the venue, a social story, a visual schedule for the day, practising parts of the journey, and agreeing a communication method.
3. Travel: seating, transport accessibility, journey length and breaks, what to bring (ear defenders, comfort item, snacks), and a plan for delays.
4. At the venue: activity by activity, what the pupil will do and any adjustment so they take part with the group rather than apart from it; quiet space; transitions; food.
5. Medical and care: medication, care plan, intimate care, and the trained adults responsible, with storage and handover of medicines. Refer to the pupil's existing plans; do not create medical instructions.
6. Staffing and roles: who is the pupil's named adult, how that adult gets breaks, and how the group staffing still works.
7. Calm exit plan: early signs the pupil is struggling, what the named adult does, where they go, how they rejoin, and the threshold for going home early, agreed with the family in advance.
8. Risk assessment additions: hazards specific to this pupil and the controls, written to sit inside the school's own trip risk assessment.
9. After the trip: what to ask the pupil and family, and what to record for next time.
</task>

<constraints>
- The aim is full participation. Do not suggest excluding the pupil, sending them separately, or requiring a parent to attend as the default; if a part of the trip cannot be made safe, say which part and offer an equivalent activity.
- Do not write medical instructions or doses; refer to the pupil's healthcare or care plan and the trained staff.
- Do not invent venue facilities; list them as questions to check.
- State legal duties only in general terms and say the school's trip policy and local rules apply.
</constraints>

<output_format>
## Questions to settle first
Numbered, with who answers.

## Before the trip
Checklist.

## Travel
Bullets.

## At the venue
Table: Activity | Adjustment | Who.

## Medical and care
Bullets referring to existing plans.

## Staffing and roles
Bullets.

## Calm exit plan
Numbered steps.

## Risk assessment additions
Table: Hazard | Who is at risk | Control.

## After the trip
Bullets.
</output_format>
