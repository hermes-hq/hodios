---
schema: 1
id: plan-summer-learning-maintenance
kind: prompt
title: Plan to stop the summer slide
description: Plans light summer learning so a school-age child's reading and maths do not slip, with 15-20 minute routines, everyday maths, a reading plan and a gentle last-week check.
category: studying
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [text, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [summer-slide, reading-for-pleasure, everyday-maths, school-holidays]
pairs_with:
  prompts: [set-up-homework-routine]
args:
  - name: age
    description: The child's age and the school year they are moving into, e.g. "8, going into Year 4" or "11, starting middle school".
    type: string
    required: true
  - name: child_interests
    description: Optional. What the child enjoys (football, animals, Minecraft, baking), what they find hard, any notes from the teacher's report, and the family's summer plans (trips, camps, days with grandparents).
    type: text
  - name: weeks
    description: Number of weeks of summer holiday.
    type: number
    default: 6
output_contract:
  format: markdown
  sections: [Summer at a glance, Weekly rhythm, Reading plan, Everyday maths, Week by week, Last-week check, If it is not working]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A parent wants to keep their child's reading and maths from slipping over a {{weeks}}-week summer holiday. Child: {{age}}. This is not a holiday activity plan and not a catch-up programme. Learning loss over summer varies a lot between children; maths facts and procedures tend to slip more than reading, and children who keep reading books they chose themselves tend to hold on to their reading. Plans fail when they look like school (workbooks every morning, long sessions), when they run every day with no breaks so they collapse by week two, and when the child has no say. What works: short sessions (15-20 minutes) four or five days a week, reading the child wants to do, maths hidden in daily life plus a few minutes of fluency practice, and weeks off during trips.
</context>

<task>
{{#child_interests}}
<child_interests>
{{child_interests}}
</child_interests>
{{/child_interests}}

1. Set the rhythm: 15-20 minutes a day (10-15 for ages 6-7), four or five days a week, at a fixed point in the day (after breakfast, before screen time). Mark trip or camp weeks as "reading only" or "off".
2. Reading plan: the child chooses most books; aim for books they can read with few stumbles (the five-finger check: fewer than about five unknown words on a page). Mix in comics, non-fiction on their interests, audiobooks while following the text, and a parent reading aloud harder books. Suggest using the public library and any summer reading challenge it runs. Add a simple reading log the child fills in themselves.
3. Everyday maths tied to the child's age: money and change in shops, doubling a recipe, timetables and journey times, measuring, scores in games, card and dice games. For each, say which skill it practises (number bonds, times tables, fractions, time, measures).
4. Fluency: three to five minutes of number facts suited to the year they are entering (number bonds for younger children, times tables to 12 x 12 for ages 8-11, fractions, decimals and percentages for older ones), as a game, not a test.
5. Write the plan week by week for {{weeks}} weeks, with a theme or focus linked to the child's interests where possible.
6. Last week: a gentle check, not a test. The child reads a page aloud and talks about it; ten quick maths questions from the year just finished. Say what to do with the result (share a concern with the new teacher in the first weeks, or nothing).
</task>

<constraints>
- Keep total time light; never plan more than 20 minutes of structured work a day.
- Use only what the parent shares about the child. If the child's current reading level or maths level is unknown, plan from the age and say so; do not invent levels or teacher comments.
- Do not name specific book titles unless you are sure they exist and suit the age; otherwise describe the type of book and suggest asking a librarian.
- If the parent mentions a diagnosed or suspected learning need, keep the plan short and suggest asking the school for summer advice; do not diagnose.
- Rewards are for routine (sticker for reading days), not for scores. No screens or treats taken away as punishment.
- Plain, warm language a busy parent can use.
</constraints>

<output_format>
## Summer at a glance
Three bullets: the daily routine, the reading goal, the maths focus.

## Weekly rhythm
A sample week: Day | Reading | Maths | Time.

## Reading plan
Bullets on choosing books, read-aloud, audiobooks, library, and a reading log the child can copy.

## Everyday maths
Table: Activity | Skill it practises | How to do it in five minutes.

## Week by week
Table: Week | Focus | Reading | Maths | Notes (trips, off weeks).

## Last-week check
The reading check, ten example maths questions for the year just finished, and what to do with the result.

## If it is not working
Three or four bullets on cutting back without dropping reading.
</output_format>
