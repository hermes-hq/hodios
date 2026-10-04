---
schema: 1
id: write-seasonal-diary-post
kind: prompt
title: Write a seasonal diary post
description: Writes a monthly diary post for a farm, garden, allotment or smallholding blog from the grower's notes, with numbers, what went wrong, next month's jobs and how readers elsewhere should adjust.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, individual, content-creator]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [article, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [garden-diary, smallholding, allotment, growing-season, monthly-post]
pairs_with:
  prompts: [plan-blog-post-series, write-personal-essay]
args:
  - name: month_notes
    description: Your notes for the month - weather, what you sowed, planted, harvested and sold, numbers (yields, rainfall, egg counts, lambing), problems (pests, frost, losses), wins, and photos you took. Phone notes and bullet points are fine.
    type: text
    required: true
  - name: place_and_climate
    description: Where you grow, in terms readers can compare (for example "upland farm in mid Wales, 300m, wet and windy, last frost late May", or a hardiness zone), and the month.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Diary post, Photo plan, Check before publishing]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A farmer, grower, gardener or smallholder keeps a monthly diary on their blog. Readers come for the honest, specific record of one real place through the year: what the weather did, what worked, what failed and what the grower will do next. Diary posts lose readers when they read like a generic gardening calendar ("March: time to sow tomatoes!"), skip the failures, drop the numbers that make it useful year on year, or forget that readers in other climates and hemispheres need to shift the timing. The grower's own voice and observations are the point.

Place and climate: {{place_and_climate}}
</context>

<task>
<month_notes>
{{month_notes}}
</month_notes>

1. Find the thread of the month: the one event or theme that shaped it (a late frost, the first lambs, a glut, a dry spell). Use it for the title and opening paragraph.
2. Write the diary in the grower's first-person voice, using their phrasing where it is vivid. Sections: the weather and what it meant; what happened (sowing, planting, harvest, livestock, sales); the numbers (a small table of yields, counts, rainfall or temperatures given, with last year's figures only if supplied); what went wrong and what they learned, told plainly; small pleasures or observations (wildlife, a new variety, a visitor).
3. Write "Jobs for next month" as a short checklist from the grower's plans, separating what they will do from general suggestions, and only adding general suggestions labelled as such.
4. Write "If you grow somewhere else": how readers in warmer, colder or opposite-hemisphere places should shift the timing, using the grower's climate markers (last frost, soil temperature, day length) rather than calendar dates, and phrased as rules of thumb to check locally.
5. Suggest a photo plan: which photos from the notes to use, captions, alt text, and one photo to take next month for comparison.
6. Close with an invitation for readers to share what their month looked like.
</task>

<constraints>
- Use only the grower's facts and numbers; never invent yields, weather data, varieties, pests, prices or animal health details. Mark missing details as [X].
- For livestock health, pest control or chemicals, report what the grower did without recommending treatments or doses, and suggest readers consult a vet, agronomist or official guidance.
- Keep the honest failures; do not turn losses into upbeat lessons unless the grower does.
- Plain, warm, specific; under 900 words for the diary itself.
- If the notes are too thin to write a post (fewer than a few events), ask two or three questions about the month and stop.
</constraints>

<output_format>
## Diary post
Title, the diary sections above, Jobs for next month, If you grow somewhere else, and the closing invitation. Ready to paste.

## Photo plan
Bullets: photo, caption, alt text.

## Check before publishing
Bullets: numbers to confirm, [X] gaps, anything flagged.
</output_format>
