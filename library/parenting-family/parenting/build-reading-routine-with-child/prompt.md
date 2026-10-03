---
schema: 1
id: build-reading-routine-with-child
kind: prompt
title: Build a reading routine with a child
description: Builds a daily reading routine with a child by age, with what to read, questions to ask before, during and after, ways to keep it fun and signs it is time to ask the school for help.
category: parenting
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences]
output: [plan, questions, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [reading-aloud, early-literacy, dialogic-reading, reluctant-readers, bedtime-stories, family-reading]
pairs_with:
  prompts: [plan-child-bedtime-routine, help-with-homework, plan-bilingual-upbringing]
  personas: [bedtime-storyteller]
args:
  - name: child_age
    description: The child's age and, for school-age children, how reading is going, for example "6, sounding out short words", "9, reads well but only Minecraft books".
    type: string
    required: true
  - name: interests
    description: What the child loves, for example "dinosaurs, football, jokes, anything gross". Optional.
    type: text
  - name: minutes_per_day
    description: How many minutes a day you can realistically spend.
    type: number
    default: 15
output_contract:
  format: markdown
  sections: [The routine, What to read, Questions to ask, Keeping it fun, A week at a glance, If reading is a struggle]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents build a reading habit with their child that lasts. Reading aloud together keeps paying off long after a child can read alone, because children understand far richer language than they can yet decode. Interactive reading, where the adult asks open questions and lets the child talk about the book (often called dialogic reading), builds vocabulary and understanding more than reading straight through. For beginning readers, practice books matched to the phonics they are learning build skill, while read-aloud books build love of stories; both have a place. The habit sticks when it is short, at the same time each day, cosy, and partly chosen by the child. Comics, graphic novels, non-fiction, joke books and audiobooks all count.

Child's age and reading: {{child_age}}
{{#interests}}Interests: {{interests}}{{/interests}}
Minutes per day: {{minutes_per_day}}
</context>

<task>
1. The routine: when and where (link it to an existing habit such as after dinner or bedtime), how to split the minutes for this age (for example, for a beginning reader: a few minutes of the child reading a practice book, then the parent reading aloud), and a simple ritual that marks reading time.
2. What to read: types of books that fit this age, stage and interests, with why each helps (picture books with rhythm and repetition, decodable practice books, early chapter books, series, graphic novels, non-fiction about their passion, audiobooks for car journeys). Describe the kinds of books to look for; name a title only if you are confident it exists and suits the age, and suggest asking a librarian or the child's teacher.
3. Questions to ask: questions for before reading (predict from the cover), during (what do you think will happen, why did she do that, what does this word mean), and after (favourite part, link to the child's life), phrased for this age. Add the reminder to ask only a few per session and let the story flow.
4. Keeping it fun: let the child choose often, re-read favourites, use voices, take turns reading pages, act scenes out, make a reading den, visit the library, and stop while it is still enjoyable. Never use reading as a punishment.
5. A week at a glance: a table for seven days that varies the activity within the minutes available.
6. If reading is a struggle: what is typical at this age, and signs to talk to the teacher about (difficulty linking letters and sounds, reading much below classmates despite practice, avoiding reading, family history of reading difficulties), noting that early help works best.
</task>

<constraints>
- Fit everything to the child's age and stage; a 2-year-old and a 9-year-old need different plans.
- Respect the time available: never plan more minutes than {{minutes_per_day}} a day.
- No product or app recommendations; describe what to look for.
- Do not diagnose dyslexia or any learning difficulty; describe signs and who can assess.
- If the child's age is missing, ask for it.
- Encouraging and practical; no guilt about screens or missed days.
</constraints>

<output_format>
## The routine
## What to read
Table: Type of book | Why it helps | What to look for.
## Questions to ask
Before / During / After lists.
## Keeping it fun
## A week at a glance
Table: Day | Activity | Minutes.
## If reading is a struggle
</output_format>
