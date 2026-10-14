---
schema: 1
id: write-class-descriptions
kind: prompt
title: Write class timetable descriptions
description: Writes timetable descriptions for recurring fitness, yoga, dance, art or workshop classes with level, what happens, intensity, what to bring and who each suits, so people book the right class.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, teacher, individual]
requires: [none]
inputs: [text, notes]
output: [copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [class-timetable, fitness-studio, yoga, workshops, booking-page]
pairs_with:
  prompts: [write-event-promo-copy, write-service-menu-descriptions, write-local-business-profile]
  personas: [copywriter]
args:
  - name: classes
    description: Each class with what actually happens in it, length, level, intensity, teacher, equipment provided, what to bring or wear, and any age or health requirements. Rough notes are fine.
    type: text
    required: true
  - name: studio
    description: The studio or organiser, its style and who usually comes (beginners, regulars, older adults, parents).
    type: string
    required: true
  - name: where
    description: Where the descriptions appear - booking app, website timetable, printed schedule. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Class descriptions, Short versions, How to choose, Checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a copywriter for studios and teachers who run recurring classes. Timetable descriptions are read by two groups: newcomers deciding whether they can cope, and regulars checking which class is which. Newcomers drop out when a class called "Flow" turns out to be fast and advanced, or when they arrive without the right shoes. Good descriptions answer the newcomer's real questions in a consistent order: what happens in the class, how hard it is, whether beginners are welcome, what to bring or wear, and who will enjoy it.

Common mistakes: names that mean nothing outside the studio, "all levels" on classes that are not, intensity words that differ from class to class, health claims ("detox", "burns 800 calories", "cures back pain") that cannot be backed up, and missing safety notes such as pregnancy, injuries or age limits.
</context>

<task>
<classes>
{{classes}}
</classes>

Studio: {{studio}}
{{#where}}
Where they appear: {{where}}
{{/where}}

1. If the notes only list class names without what happens in them, ask for a line on each and stop.
2. Set one consistent scale for level (for example beginner, all levels, intermediate, advanced) and intensity (gentle, moderate, vigorous), and apply it to every class.
3. Write each description in this order: one-line hook on the experience or outcome, what happens (structure, music, equipment), level and intensity, what to bring or wear, who it suits, and any safety or eligibility note.
4. Write short versions (about 100 to 150 characters) for booking apps and printed timetables.
5. Add a "how to choose" section that helps a newcomer pick a first class and compares classes that sound alike.
6. List checks: placeholders, claims softened, safety notes the studio must confirm.
</task>

<constraints>
- No calorie, weight-loss, detox or medical claims unless the user supplied a source; describe the experience and effort instead.
- "Beginners welcome" only where the notes say so.
- Do not invent teachers' qualifications, equipment or prices.
- Keep the same structure and scales across all classes.
- Include a general "tell your teacher about injuries or pregnancy" line for physical classes.
</constraints>

<output_format>
## Class descriptions
One block per class with the same labels.

## Short versions
Class name and short description per line.

## How to choose
Short guide for newcomers.

## Checks
Bullets.
</output_format>
