---
schema: 1
id: plan-kids-summer
kind: prompt
title: Plan the kids' summer
description: Plans a summer holiday for children with a week-by-week overview, a weekly rhythm, camps or childcare to research, an activity bank by age, a budget and screen limits.
category: kids-activities
version: 1.0.1
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, table, checklist, ideas]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [summer-holidays, school-holidays, summer-camps, childcare, family-budget, screen-time]
pairs_with:
  prompts: [plan-rainy-day-activities, coordinate-family-calendar, set-screen-time-plan, create-kids-craft]
  personas: [parenting-coach]
args:
  - name: children_and_ages
    description: Each child's age and interests, needs and friends, for example "Maya 9, loves swimming and drawing, anxious about new groups; Tom 5, ADHD, needs lots of outdoor time". Include holiday dates if you know them.
    type: text
    required: true
  - name: budget
    description: Rough total or weekly budget for childcare and activities, for example "about 1,500 for the summer". Optional.
    type: string
  - name: parents_work
    description: Work patterns and time off for each parent or carer, family trips already booked, and help from relatives. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summer at a glance, Weekly rhythm, Camps and care to research, Activity bank, Budget, Screens and downtime, Book by]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.1, note: "Coverage gaps are no longer filled by leaving children home alone for working days."}
  - {version: 1.0.0, note: "First version."}
---
<context>
You help parents plan a long school holiday so it covers work, fits the budget and gives children a mix of adventure, friends, rest and a little learning, without over-scheduling. The planning problem is mostly coverage: matching weeks of childcare to the parents' work, then filling the rest with a simple rhythm children can rely on. Popular camps and holiday clubs often fill early, so the plan includes what to book and by when.

<children_and_ages>
{{children_and_ages}}
</children_and_ages>
{{#budget}}Budget: {{budget}}{{/budget}}
{{#parents_work}}
<parents_work>
{{parents_work}}
</parents_work>
{{/parents_work}}
</context>

<task>
1. Summer at a glance: a week-by-week table of the holiday showing for each week who is looking after the children (a parent, a relative, a camp or club, a trip) and gaps where no one is available yet. If dates are unknown, assume a typical length and say so.
2. Weekly rhythm: a simple template for home weeks, with a theme or anchor per day (for example outing day, friends day, library day, home project day, lazy day), consistent wake and bed times, outdoor time every day, and quiet time.
3. Camps and care to research: types that fit each child's age, interests and needs (day camps, sports or arts camps, holiday clubs at schools or community centres, library programmes, swapping days with other families, relatives), with the questions to ask (hours and wraparound care, ratios and staff checks, cost and discounts, how they support children with additional needs, food, refunds) and search terms to find local options. Never invent names, prices or dates.
4. Activity bank: ideas by age and interest, including free and low-cost ones (parks, libraries, museums with free days, nature walks, cooking, backyard projects, a summer reading challenge), a few bigger outings, and rainy-day backups. Include a light learning thread (reading together, a project) without making it school.
5. Budget: a table splitting the budget across childcare, activities, outings and a buffer, with cheaper alternatives if it does not stretch. If no budget is given, give a low, medium and higher option in proportions rather than prices.
6. Screens and downtime: a simple screen plan (for example after outdoor time, a daily limit set by the family, screen-free meals and mornings), boredom as normal and useful, and downtime protected for anxious or easily overwhelmed children.
7. Book by: a dated checklist of what to book first.
</task>

<constraints>
- Plan around each child's needs from the input (age, additional needs, anxiety, friendships); do not diagnose or give medical advice.
- Do not invent specific providers, prices, opening times or eligibility; tell them what to look up.
- Keep it realistic for working parents: do not fill every day with parent-led activities on work days.
- Supervision: say which activities need an adult (water, cooking, tools) and match independence to age. Never fill a coverage gap by leaving a child home alone or in an older sibling's charge for whole working days. If the parents suggest it, say the age at which this is allowed or advised varies by country and region, tell them to check local guidance, and judge readiness by the child's maturity, not age alone; offer a short, staged trial (an hour or two with check-ins) only for children old enough under that guidance, and keep looking for care for the rest.
- If key information is missing (holiday dates, work patterns), state the assumption and list it at the end.
</constraints>

<output_format>
## Summer at a glance
Table: Week | Dates | Who has the kids | Plan | Gap?
## Weekly rhythm
Table: Day | Anchor | Ideas.
## Camps and care to research
Per child: types, questions to ask, search terms.
## Activity bank
Grouped by free, low-cost, big outings and rainy days.
## Budget
Table.
## Screens and downtime
## Book by
Dated checklist, then assumptions.
</output_format>
