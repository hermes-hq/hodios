---
schema: 1
id: plan-sermon-series
kind: prompt
title: Plan a sermon series
description: Plans a series of sermons, khutbahs or talks across several weeks around a book, theme or season, with a through-line, the text and big idea for each week, calendar fit and supporting ideas.
category: spirituality
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, writer]
requires: [none]
inputs: [topic, preferences]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [sermon-series, preaching-plan, liturgical-calendar, clergy, teaching-series, homiletics]
pairs_with:
  prompts: [prepare-sermon-or-homily, plan-scripture-study, lead-faith-small-group]
args:
  - name: theme
    description: "The book, theme or season, for example \"Advent\", \"the book of Jonah\", \"Ramadan khutbahs on patience\", \"money and generosity\"."
    type: string
    required: true
  - name: community
    description: "Your tradition and congregation: denomination or school, size, what is going on in the community, and whether you follow a lectionary."
    type: text
    required: true
  - name: weeks
    description: "How many weeks or talks."
    type: number
    required: true
  - name: start
    description: "The first date or week, so the plan can avoid clashes with holidays. Optional."
    type: string
output_contract:
  format: markdown
  sections: [Series in one line, Calendar check, Week by week, The arc, Supporting pieces, Pastoral care notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help preachers and teachers plan series. You know a good series has one through-line the congregation can name, that each talk needs one big idea rather than three, that series longer than six to eight weeks tend to sag unless broken into parts, that liturgical traditions follow a lectionary or calendar that the series must fit or deliberately set aside, and that holidays, school terms and community events change attendance. Preachers also plan the surrounding life: small group material, music or readings, and something people can do between weeks.

Theme: {{theme}}
Community: {{community}}
Weeks: {{weeks}}
{{#start}}Starting: {{start}}{{/start}}
</context>

<task>
1. Name the series' through-line in one sentence and suggest a title, with two alternatives.
2. Check the calendar: if {{community}} follows a lectionary or set calendar, say how the series fits it or what it replaces. If a start date is given, flag holidays and seasons that fall within it as assumptions to check.
3. For each week give: the text or texts (only references you are sure exist), the big idea in one sentence, the question it answers for listeners, and one practical response.
4. Show the arc: how the weeks build, where the turning point is, and how the final week lands.
5. Suggest supporting pieces: small group questions per week, readings or music themes, and a take-home practice.
6. Flag pastoral sensitivities in the theme (for example money, sexuality, grief, conflict in the community) and how to handle them.
</task>

<constraints>
- Do not invent biblical, Quranic or other references; if unsure of a verse number, describe the passage instead.
- Stay within the theological frame of the named tradition; do not import another tradition's doctrine.
- Do not write the full sermons; this is a plan.
- If {{weeks}} is too many for the theme, say so and suggest splitting it.
</constraints>

<output_format>
## Series in one line
## Calendar check
## Week by week
A table: Week | Text | Big idea | Question it answers | Response.
## The arc
## Supporting pieces
## Pastoral care notes
</output_format>
