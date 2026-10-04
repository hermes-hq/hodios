---
schema: 1
id: plan-library-reading-programme
kind: prompt
title: Plan a library reading programme
description: Plans a public library summer reading challenge or children's reading club, with a theme, non-competitive rewards, inclusive book choices, events and outreach to families who do not visit.
category: teaching
version: 1.0.0
status: incubating
stage: [plan]
role: [teacher]
requires: [none]
inputs: [topic, preferences]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [public-libraries, summer-reading, reading-for-pleasure, childrens-librarians, family-outreach, reading-challenge]
pairs_with:
  prompts: [audit-school-library-collection, write-reading-volunteer-guide, plan-guided-reading-group]
args:
  - name: age_range
    description: The children the programme is for, for example "4-11", "under-5s and their carers", "11-14".
    type: string
    required: true
  - name: weeks
    description: How many weeks the challenge or club runs.
    type: number
    default: 6
  - name: budget
    description: The budget, as an amount or as "none", "low" or "moderate". Shapes rewards, events and materials.
    type: string
    default: low
  - name: community_context
    description: Optional notes on your library and community - branch size and staff, languages spoken locally, schools and partners, families you rarely see and why (distance, cost, confidence, fines, opening hours), and what you tried before.
    type: text
output_contract:
  format: markdown
  sections: [Concept, How it works, Week by week, Choosing books, Events, Reaching families who do not visit, Inclusion and access, Budget, Measuring success]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan reading programmes with children's librarians and library assistants. Summer reading challenges exist because children's reading skills can slip over long holidays, most of all for children with fewer books at home, and because reading for pleasure is closely linked with how well children do later. The programmes that reach those children reward taking part rather than quantity, count every kind of reading (comics, audiobooks, non-fiction, home languages, being read to), make the library feel welcoming to families who never come in, and go out to where families already are. Programmes that reward the most books read mostly reward children who were reading anyway.

Ages: {{age_range}}
Length: {{weeks}} weeks
Budget: {{budget}}
{{#community_context}}
<community_context>
{{community_context}}
</community_context>
{{/community_context}}
</context>

<task>
1. Concept: a theme that suits {{age_range}} and works across cultures, a name, and how the theme carries through the weeks. Offer two alternatives in one line each.
2. How it works: how children join (with or without a library card, in branch, at school, at outreach events), what counts as reading, how progress is tracked (minutes, sessions or books, with a reason for the choice), and rewards at milestones that every child can reach, including children who read slowly or with support. Include a finishing celebration.
3. Week by week: a table of each week's theme beat, activity in branch, a take-home or online activity, and the staff time needed.
4. Choosing books: selection criteria for a booklist that is inclusive (characters, authors and cultures that reflect local families and the wider world, disability, different family shapes), spans reading levels, formats and home languages, and includes non-fiction and graphic novels. Give a list-building template for staff to fill from their own catalogue. If you suggest any titles, suggest only ones you are confident exist, and mark them "check catalogue".
5. Events: three to five events across the programme (author or storyteller visit, craft, family session, finale), each with purpose, set-up and cost band.
6. Reaching families who do not visit: concrete actions such as school assemblies before the holidays, sign-up at community venues, food banks, health clinics and holiday clubs, partnerships, removing barriers (fines, card requirements, opening hours, transport), and materials in local languages. Use the community context where given.
7. Inclusion and access: SEND and sensory-friendly sessions, accessible formats, quiet times, and support for children learning the language.
8. Budget: a table of costs by item within {{budget}}, with free or donated alternatives.
9. Measuring success: sign-ups, completion, new library members, and how many children came from target groups, with a simple way to collect each without extra burden; plus one way to hear from children and families.
10. Before answering, check the plan fits {{weeks}} weeks and the budget, and that every reward can be reached by a child who reads with support.
</task>

<constraints>
- Reward participation and enjoyment, not volume or speed. No public leaderboards ranking children.
- Count all formats and languages as reading.
- Collect only the personal data the library needs for sign-up and rewards, with consent from a parent or carer, and follow the library's data and safeguarding policies, especially for photographs and online activities.
- Do not invent statistics about reading outcomes or local data.
- Keep it achievable for the staff the context describes; if none is given, assume a small team and say so.
- If the age range is missing or too broad to plan for (for example "0-18"), ask whether to split it and stop.
</constraints>

<output_format>
## Concept
## How it works
## Week by week
Table: Week | Theme beat | In branch | Take-home or online | Staff time.
## Choosing books
Criteria bullets, then a template table: Category | Reading level | Format | Title from your catalogue.
## Events
## Reaching families who do not visit
## Inclusion and access
## Budget
Table: Item | Cost | Free alternative.
## Measuring success
</output_format>
