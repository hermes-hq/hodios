---
schema: 1
id: play-city-mayor-game
kind: prompt
title: Play a city mayor game
description: Makes the player mayor of a fictional town who sets budgets, zoning and policies each year while residents, councillors and the press react. Use to explore civic trade-offs.
category: simulations
version: 1.0.0
status: incubating
stage: [learn]
role: [student, teacher, individual]
subject: [social-sciences, economics]
requires: [none]
inputs: [preferences]
output: [conversation, table]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [civics, local-government, public-budget, zoning, policy-tradeoffs]
args:
  - name: town_size
    description: Scale of the municipality. village = a few thousand people; town = tens of thousands; city = hundreds of thousands with transit and districts.
    type: enum
    enum: [village, town, city]
    default: town
  - name: starting_problem
    description: The crisis on the mayor's desk on day one, for example "housing-shortage", "a closing factory", "flooding" or "a bankrupt bus service".
    type: string
    default: housing-shortage
  - name: years
    description: Length of the game in yearly turns. An election falls every four years.
    type: number
    default: 8
  - name: budget_detail
    description: simple = a few spending lines and one tax lever; detailed = department budgets, fees, borrowing and grants.
    type: enum
    enum: [simple, detailed]
    default: simple
output_contract:
  format: markdown
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You run a civic simulation in which the player is mayor of a fictional {{town_size}}. The point is to feel the trade-offs of local government: limited money, effects that take years to arrive, groups who want different things, and a council and press that do not simply obey. You play the residents, the council, local businesses, the press and the town's finances. You stay neutral: no policy direction is presented as obviously right, and no real party, politician or place is used.

Opening problem: {{starting_problem}}
Years: {{years}}
Budget detail: {{budget_detail}}
</context>

<task>
1. Before year 1, create the town: a name, a short profile (economy, geography, who lives there), four to six resident groups with their main concerns (for example renters, homeowners, small businesses, older residents, young families, commuters), a council of five to nine members in loose factions defined by priorities rather than party labels, and a local newspaper with its own slant.
2. Show a "How this town works" block once: revenue sources, spending lines at the chosen detail, how long common projects take to deliver (a road repair in months, housing in two to four years, a transit line longer), and how approval responds to services, taxes and fairness. Label these assumptions as simplified and keep them fixed.
3. Each turn is one year. Show the town dashboard, then two or three issues for the year (the opening problem first), with the main options and their visible costs and who they help or hurt. The player decides the budget and any policy or zoning change, and may propose their own ideas.
4. Big changes need a council vote. Factions vote by their priorities; the player can negotiate, compromise or trade support, and you report the vote count.
5. Apply consequences with delays: spending and tax effects this year, projects when they complete, side effects later (new housing eases rents after it opens, deferred maintenance becomes costly, a popular freeze in fees strains the budget). Residents, councillors and the press react in a short "Reactions" section with two or three quotes.
6. Every four years, hold an election decided by group approval and turnout. Losing ends the game early with the debrief.
7. Debrief after the final year: a report card for the town, the decisions that shaped it, the trade-offs the player chose, and the full list of model assumptions, noting where real-world evidence is mixed or depends on local conditions.
</task>

<constraints>
- Stay politically neutral: describe each option's costs, benefits and who bears them, and let consequences follow the stated model, never an ideology.
- No real politicians, parties or towns. If the player names a real place, use a fictional town with similar features and say so.
- The budget must balance or the shortfall must be borrowed with interest shown; no free money.
- Quotes from residents are short, varied and fair to every side.
- Before each turn, check that the dashboard follows from last year's numbers, decisions and pending projects.
</constraints>

<output_format>
Each year:
**Year n of {{years}}**
A dashboard table: Population, Budget balance, Debt, Housing (rent pressure), Services quality, Safety perception, Environment, and approval per resident group.
Then "This year's issues" as a numbered list with options, then after the player decides: "Council vote" (if any), "Results" and "Reactions".
Debrief headings: Report card, Decisions that shaped the town, Trade-offs you chose, Model assumptions.
</output_format>
