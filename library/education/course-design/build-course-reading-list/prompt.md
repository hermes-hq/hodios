---
schema: 1
id: build-course-reading-list
kind: prompt
title: Build a course reading list
description: Builds a balanced course reading list with core and optional readings per week, range of perspectives, accessibility notes and a realistic reading load, flagging every item to verify.
category: course-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [teacher]
requires: [none]
inputs: [topic, notes]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [reading-list, syllabus, reading-load, open-access, decolonising-the-curriculum, citations]
pairs_with:
  prompts: [write-course-syllabus, design-course-outline, map-program-curriculum]
  personas: [instructional-designer]
args:
  - name: course
    description: Course title, focus and the weekly topics if known, e.g. "Introduction to Urban Sociology - week topics - cities and modernity, segregation, gentrification…".
    type: string
    required: true
  - name: weeks
    description: Number of teaching weeks that need readings.
    type: number
    required: true
  - name: level
    description: Student level and reading ability, e.g. "first-year undergraduates, many with English as an additional language".
    type: string
    required: true
  - name: existing_readings
    description: Optional readings already chosen or required, to keep and build around.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Reading list by week, Reading load, Perspectives audit, Accessibility notes, Verify before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A reading list shapes what students think a field is. Good lists have a small number of well-chosen core readings per week that students actually read, optional readings for depth, a mix of foundational and recent work, a range of perspectives, regions and authors, and a weekly load matched to the level. Unrealistic lists (200 pages a week for first-years) teach students to skim or skip. The single biggest risk when an assistant drafts a list is invented or garbled references, so every item must be checked against a library catalogue or database before it reaches students.
</context>

<task>
Build a reading list for **{{course}}**, {{weeks}} weeks, for **{{level}}**.

{{#existing_readings}}
Keep and build around these readings:
<existing_readings>
{{existing_readings}}
</existing_readings>
{{/existing_readings}}

1. If weekly topics were not given, propose a topic per week and mark them "proposed". If the field is one you cannot recommend readings for with confidence, say so and give search strategies and reading types instead of titles.
2. For each week choose 1 to 3 core readings and 2 to 4 optional readings. For each reading give author(s), title, year, type (book chapter, journal article, report, primary source, media), approximate length in pages, why it is on the list in one line, and your confidence that the reference is accurate (high, medium, low).
3. Include only works you are confident exist. Prefer well-known works whose details you can state accurately. Never invent DOIs, page ranges, editions or URLs; leave them out if unsure. Mark lower-confidence items clearly.
4. Balance the list: foundational and recent work, theory and empirical or applied work, and authors from different regions, traditions and backgrounds where the field allows. Include at least one item per week that is accessible to a struggling reader (a shorter, clearer text or a non-text source like a lecture or documentary).
5. **Reading load:** estimate core pages and hours per week at a realistic speed for the level (for academic text, first-years read roughly 10 to 15 pages an hour for close reading). Flag weeks above the target and swap or trim. If no target is given, aim for about 3 to 5 hours of core reading a week for undergraduates.
6. **Perspectives audit:** summarise who is represented (era, region, approach, author diversity as far as is publicly known and relevant) and what gaps remain, without guessing individuals' identities.
7. **Accessibility notes:** open-access or library-available options, items that need a digitised chapter, alternative formats, and reading guidance (questions to read with) for the hardest texts.
</task>

<constraints>
- Accuracy over coverage: a shorter list of real readings is better than a long list with errors. Say "I don't know a reliable reading for this week" if that is the case and suggest how to find one.
- Do not claim a reading is open access, in print or in a specific library unless you are sure; tell the instructor to check.
- Do not infer authors' race, gender or other identities; audit perspectives through stated approach, region and publicly self-described identity only.
- Respect existing required readings even if you would choose differently; you may note concerns.
</constraints>

<output_format>
## Approach
3 to 5 sentences on the shape of the list and the assumptions made.
## Reading list by week
A `###` per week with its topic, then a table: Core / optional | Reference | Type | Pages | Why | Confidence.
## Reading load
Table: Week | Core pages | Estimated hours | Flag.
## Perspectives audit
Bullets: represented, gaps, suggestions.
## Accessibility notes
Bullets.
## Verify before publishing
A checklist of every medium or low confidence item plus a reminder to check all references against the library catalogue.
</output_format>
