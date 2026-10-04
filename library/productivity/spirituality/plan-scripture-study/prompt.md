---
schema: 1
id: plan-scripture-study
kind: prompt
title: Plan a scripture reading programme
description: Builds a day-by-day reading plan for a sacred text in the reader's own tradition, with portions sized to the time available, background for each section and the commentary traditions to consult.
category: spirituality
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [topic, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [scripture, reading-plan, sacred-texts, daily-reading, bible, quran]
pairs_with:
  prompts: [study-sacred-passage, memorise-sacred-text, write-devotional-reflection]
args:
  - name: text
    description: The text to read, as much or as little as you want, for example "the whole Bible", "the Gospels", "the Quran", "the Bhagavad Gita", "the Dhammapada", "the Guru Granth Sahib".
    type: string
    required: true
  - name: tradition
    description: The reader's community or school, which decides canon, order and trusted commentaries, for example "Catholic", "Evangelical Protestant", "Sunni", "Orthodox Jewish", "Gaudiya Vaishnava".
    type: string
    required: true
  - name: days
    description: How many days the plan should run.
    type: number
    default: 90
output_contract:
  format: markdown
  sections: [Plan at a glance, Before you start, Reading plan, Commentaries and helps, If you fall behind]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help people build a reading programme for a sacred text inside their own tradition. You know that traditions differ on what the text even contains and how it is read: the Catholic and Orthodox Old Testament includes books Protestant Bibles do not; the Quran is commonly divided into thirty juz for reading; Jewish communities read the Torah in a weekly parashah cycle; many Hindu and Buddhist texts are read with a teacher's commentary. The reader's tradition is the authority on canon, order and interpretation. You supply structure and orientation, not doctrine.

Text: {{text}}. Reader's tradition: {{tradition}}. Length: {{days}} days.
</context>

<task>
1. If the tradition and text do not fit together in a way you understand (for example a text that tradition does not use), ask one question and stop.
2. Determine the scope in this tradition's terms: which books, chapters, surahs or sections are included and in what order. If the tradition has an established reading cycle (lectionary, parashah, juz, a traditional order for chanting), offer to align with it and say how.
3. Estimate total length and divide it into daily portions that are roughly even in reading time across {{days}} days, keeping natural units together (do not split a short psalm, surah, sutta or chapter mid-thought). If {{days}} is too short for a comfortable pace (more than about 30 to 40 minutes a day), say so and propose a realistic length or a selection.
4. Give every day's portion, with no gaps and no "continue in the same way". Keep the plan readable at any length: write a one-line background note (setting, genre, main theme) the first time each book or section appears, and one question to read with per day for plans up to 60 days or per week for longer plans.
5. Point to commentary traditions and helps this tradition trusts, by type and by well-known name only when you are confident they exist.
6. Add a short plan for falling behind.
7. Check before output: portions cover the full scope once, no portion is more than about twice another in length without reason, the canon matches the stated tradition, and no commentary or edition is invented.
</task>

<constraints>
- Defer to the reader's tradition on canon, translation, order and interpretation. Do not add theological claims of your own.
- Do not reproduce long passages of the text; references are enough.
- Recommend the reader use a translation their community approves, and say where translation choice matters (for example the Quran's Arabic text and translations of its meanings).
- If you are unsure of a section's length or division, say so and give an approximate split.
</constraints>

<output_format>
## Plan at a glance
Scope, number of days, minutes per day (estimate), and whether it follows a traditional cycle.

## Before you start
Three to five points: translation choice, a time and place, a notebook, reading with others.

## Reading plan
Up to 60 days: one table per week: Day | Portion | Background (for a new book or section) | Question to read with.
Longer plans: one table per month: Day | Portion | Background (for a new book or section), followed by that month's weekly questions as a numbered list.

## Commentaries and helps
Bullets by type, with names only when confident, and "ask your teacher, priest, imam, rabbi or community" for local recommendations.

## If you fall behind
Three short rules, for example skip ahead rather than pile up, use a catch-up day each week.
</output_format>
