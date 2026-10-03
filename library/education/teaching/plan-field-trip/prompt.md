---
schema: 1
id: plan-field-trip
kind: prompt
title: Plan a school field trip
description: Plans a school field trip with learning goals, pre and post activities, a timed itinerary, supervision plan, risk assessment and a parent permission letter to adapt to school policy.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [field-trip, educational-visit, risk-assessment, permission-slip, supervision]
pairs_with:
  prompts: [write-parent-email, write-classroom-newsletter, write-lesson-plan]
args:
  - name: destination_and_purpose
    description: Where the class is going and why, e.g. "the city science museum's electricity gallery to see circuits in use, linked to our Grade 4 energy unit".
    type: text
    required: true
  - name: students_and_ages
    description: Who is going, e.g. "54 students aged 9-10, two classes, three with allergies, one wheelchair user".
    type: string
    required: true
  - name: constraints
    description: Optional constraints such as date, school hours, transport, budget, available adults, school trip policy or venue rules.
    type: text
output_contract:
  format: markdown
  sections: [Learning goals, Before the trip, Itinerary, Supervision plan, Risk assessment, Emergency procedures, After the trip, Permission letter, Admin checklist]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A field trip is a lesson that happens to be off site, plus a duty of care that does not pause. The trips that teach something have a clear question students go to investigate, pre-teaching so they know what to look for, structured tasks on the day, and follow-up that uses what they saw. The trips that go smoothly have a realistic timetable with buffers, named adults with named groups, a written risk assessment, and families who know exactly what is happening. School and local-authority policies on ratios, transport, consent and first aid always take precedence over any general plan.
</context>

<task>
Plan this trip.

<destination_and_purpose>
{{destination_and_purpose}}
</destination_and_purpose>
Students: {{students_and_ages}}
{{#constraints}}
<trip_constraints>
{{constraints}}
</trip_constraints>
{{/constraints}}

1. **Learning goals:** 2 or 3 goals tied to the curriculum unit, and the one question students will investigate on the trip.
2. **Before the trip:** 2 or 3 short pre-trip activities (building background knowledge, setting up the investigation, practising expectations), plus a briefing for students on behaviour, buddy system and what to do if lost.
3. **Itinerary:** a timed schedule from departure to return, including travel, toilet and meal breaks, group rotations if the class is large, buffer time, and a structured task for each stop (a recording sheet, a scavenger hunt tied to the goals, an interview question).
4. **Supervision plan:** proposed group sizes and adult assignments, how adults are briefed, headcount points (at least on leaving, on arrival, after each stop, before departure home), a meeting point, and how students with medical, mobility, sensory or behaviour needs are supported. State the ratio you used and that it must be checked against school and local requirements, which vary by age, activity and jurisdiction.
5. **Risk assessment:** a table of hazards for this specific trip (travel, roads, crowds, water or heights if relevant, allergies and medication, weather, lost or separated child, behaviour, accessibility), who is at risk, controls, and who is responsible.
6. **Emergency procedures:** first aid, medical emergencies and medication, lost child, transport breakdown, contacting school and families. Include a contact-card template with placeholders.
7. **After the trip:** 2 or 3 follow-up activities that use what students gathered, and how learning will be assessed.
8. **Permission letter:** a plain-language letter to families with date, times, destination, purpose, transport, cost and how to get help with it, what to bring and wear, lunch and medical arrangements, and a tear-off consent section including medical and emergency contact information.
9. **Admin checklist:** bookings, approvals, venue pre-visit or venue risk information, transport, medical forms, inclusion arrangements, staffing, and deadlines counting back from the trip date.
</task>

<constraints>
- Do not invent venue facts (opening hours, prices, programmes, accessibility features). Use placeholders like [confirm with venue] for anything you do not know.
- Ratios, consent rules, transport requirements and first-aid requirements differ by country, region and school. Present your choices as a starting point to check against policy, not as the legal requirement.
- Cost must never stop a student from going: include a discreet way for families to ask for help.
- Plan for every student listed, including those with access needs; never plan an alternative that leaves a student behind without saying so and offering an inclusive option.
- Keep the permission letter jargon-free and short enough to read on a phone, with placeholders for names, dates and contacts.
- If the destination or purpose is unclear, ask about it before planning.
</constraints>

<output_format>
## Learning goals
Bullets and the investigation question.
## Before the trip
Numbered activities and the student briefing.
## Itinerary
Table: Time | Location | Activity | Group | Notes.
## Supervision plan
Groups and adults, ratio used, headcount points, support for individual needs.
## Risk assessment
Table: Hazard | Who is at risk | Controls | Responsible.
## Emergency procedures
Bullets, then the contact-card template.
## After the trip
Numbered activities and assessment.
## Permission letter
The letter, ready to adapt.
## Admin checklist
Checkbox list with "weeks before" deadlines.
</output_format>
