---
schema: 1
id: write-school-absence-request
kind: prompt
title: Write a school absence note or request
description: Writes a parent's note or request to school for an illness, appointment, family event or term-time leave, with dates, a reason at the right level of detail and a catch-up plan.
category: family-logistics
version: 1.0.0
status: incubating
stage: [build]
role: [parent]
requires: [none]
inputs: [text]
output: [message, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [school-absence, term-time-leave, absence-note, school-attendance, parent-to-school]
pairs_with:
  prompts: [write-email-to-teacher, plan-catch-up-after-absence, extract-actions-from-school-messages]
args:
  - name: absence
    description: Child's name or initials and class, the dates and times, and the reason (illness, medical or dental appointment, funeral, religious observance, family event, holiday, a sports or music event), plus whether it already happened or is planned.
    type: text
    required: true
  - name: school_rules
    description: Optional. What the school's attendance policy says, the form or app they use, who to send it to, and any previous absences this year.
    type: text
  - name: location
    description: Country and region. Rules on authorised absence, term-time leave and penalties differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [How this absence is likely treated, Note to school, Catch-up plan, Before you send]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a parent tell a school about an absence. Schools sort absences into authorised and unauthorised, and the rules differ widely: illness and medical appointments are usually authorised with notice on the day; planned leave in term time may need a request well in advance, may be granted only in exceptional circumstances, and in some places unauthorised holidays can lead to fines or attendance meetings. What helps a note: the right recipient and channel (attendance line, office email or the school's app, not just a message to the class teacher), the child's full name and class, exact dates and times, a reason at the right level of detail (enough to classify it, without private medical or family information the school does not need), notice as early as possible for planned absences, and an offer to catch up on work. For requests, a clear explanation of why the dates cannot be moved, with evidence where relevant (appointment letter, funeral details), gives the head teacher a basis to agree. Dishonest notes (claiming illness for a holiday) can be checked and damage trust with the school.

Location: {{location}}

<absence>
{{absence}}
</absence>

{{#school_rules}}
<school_rules>
{{school_rules}}
</school_rules>
{{/school_rules}}
</context>

<task>
1. Say how this kind of absence is likely to be treated (usually authorised, needs a request, or at risk of being unauthorised) and any consequence to check, such as fines or attendance meetings, marked "[check the school's policy]".
2. Write the note or request in the right form: a same-day illness message, a notice of an appointment, or a leave request for a planned absence. Include the child's name, class, dates, reason at the right level of detail, any evidence offered, the parent's contact details as a placeholder, and an offer to support catch-up. Under 150 words for a notice, under 250 for a request.
3. For a planned absence, explain the reasons the dates cannot be moved, using only what the parent said, and note that the decision is the school's.
4. Write a short catch-up plan the parent can offer: asking for key work, reading to keep up, and a check-in with the teacher on return.
5. List what to check before sending: correct recipient and channel, notice period, evidence to attach, and keeping a copy.
</task>

<constraints>
- Never write a note that gives a false reason, such as illness for a holiday; if the parent asks, explain the risk and write an honest request instead.
- Do not include medical or family detail beyond what the school needs to classify the absence.
- Do not state attendance laws, fines or thresholds as fact; mark them "[check the school's policy]".
- Keep the tone polite and brief.
</constraints>

<output_format>
## How this absence is likely treated
Two or three lines.

## Note to school
The ready-to-send text with a subject line if by email.

## Catch-up plan
Three to five bullets.

## Before you send
Checklist.
</output_format>
