---
schema: 1
id: write-one-page-pupil-profile
kind: prompt
title: Write a one-page pupil profile
description: Writes a one-page pupil profile or pupil passport from notes, in the pupil's voice where possible, covering what people like about them, what matters to them and how best to support them.
category: teaching
version: 1.0.0
status: incubating
stage: [plan, build]
role: [teacher, parent]
subject: [education-sector]
requires: [none]
inputs: [notes, text]
output: [docs]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pupil-passport, person-centred-planning, special-educational-needs, supply-cover, pupil-voice]
pairs_with:
  prompts: [write-teaching-assistant-briefing, plan-substitute-lesson, write-iep-goals]
  personas: [special-education-advisor]
args:
  - name: notes
    description: Everything you know about the pupil, from staff, the family and the pupil themselves - strengths, interests, what helps, what upsets them, how they communicate, and any quotes from the pupil. Initials or a first name only.
    type: text
    required: true
  - name: voice
    description: first-person ("I like...") written with or for the pupil, or third-person ("A. likes...") when the pupil cannot contribute.
    type: enum
    enum: [first-person, third-person]
    default: first-person
  - name: audience
    description: Who mainly reads it - all-staff (anyone who works with the pupil), supply (a cover teacher with two minutes) or new-setting (a new class or school).
    type: enum
    enum: [all-staff, supply, new-setting]
    default: all-staff
output_contract:
  format: markdown
  sections: [Profile, Sources and gaps, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A SENCO, teacher or teaching assistant wants a one-page profile (often called a pupil passport) that helps any adult support this pupil well from the first minute. It comes from person-centred planning: it describes the pupil as a person, not a list of deficits, and says exactly what helps. Common failures: it reads like a diagnosis summary; the support section is vague ("needs reassurance") rather than specific ("tell me the change before we line up, and show me on my timetable"); and it is too long to read before a lesson, so nobody reads it.

Voice: {{voice}}. Main reader: {{audience}}.
</context>

<task>
<notes>
{{notes}}
</notes>

1. Sort the notes into three headings: what people like and admire about me, what is important to me, and how best to support me.
2. Keep the pupil's own words wherever they appear, in quotation marks. In first person, write as the pupil would say it, at their age and in plain words.
3. Make every support point specific and observable: the situation, what the adult does, and why it helps. Order them by how often they will matter. Add a short "If I am upset" line: signs to notice and what helps, from the notes only.
4. For supply, put the five things a cover teacher must know at the very top. For new-setting, add one line on what to keep the same from the current setting.
5. Fit one printed page: about 250 to 350 words.
6. List what came from whom where the notes say so (pupil, family, staff), and list gaps worth asking the pupil or family about.
</task>

<constraints>
- Strengths first. No labels as identity ("the autistic boy"); name a diagnosis only if the notes include it and it helps the reader, once, in plain words.
- Use only what the notes say. Do not add strategies, needs or traits; put ideas under Next steps instead.
- If the notes give no strengths or interests, do not invent them: leave "What people like about me" as [ask the pupil, family and staff] and list the questions. Turn deficit labels ("can't sit still", "nightmare in class") into a support question ("What helps when I need to move?") rather than repeating them.
- First name or initials only. Leave out medical details, family circumstances and safeguarding information unless they are needed for day-to-day support, and say anything sensitive should stay in the school's secure records.
- If the notes contain a medical plan item (allergy, seizures, medication), keep it as one line pointing to the pupil's health care plan, without dosing or treatment detail.
- Write so the pupil and family would be happy to read it.
</constraints>

<output_format>
## Profile
The one-page profile: name line, then the three headings (and "Must know" first for supply), short bullets.

## Sources and gaps
Bullets: what is in the pupil's own words, what is missing or unclear.

## Next steps
Up to three: how to check the profile with the pupil and family and when to review it (at least termly).
</output_format>
