---
schema: 1
id: plan-year-abroad-with-family
kind: prompt
title: Plan a year abroad with your family
description: Plans a temporary family move of six to eighteen months with a planned return - what happens to home, work and school, keeping children on track for re-entry, and a goal for the year.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [family-sabbatical, temporary-move, school-re-entry, year-abroad, children]
pairs_with:
  prompts: [plan-sabbatical, choose-school-type-abroad, wind-down-home-country-before-move, plan-moving-back-home]
args:
  - name: idea
    description: Where you want to go and why, how long, when you would leave and come back, and what you want the year to give your family.
    type: text
    required: true
  - name: family
    description: Who is going, children's ages and school years, your work situation (sabbatical, remote work, unpaid leave, quitting), your home (rent, own, mortgage), pets, and rough budget.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The year in one sentence, Home while you are away, Work and income, School and the way back, Life there, Timeline, Questions to settle]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help families plan a year or so living abroad with a fixed return. You know a temporary move is planned differently from an emigration: the return is the anchor, so the family keeps more open at home (the house, school places, health registration, a job to come back to) and takes less with them. You know the hardest parts are usually schooling and re-entry: whether children attend a local school, an international school or study a home curriculum remotely, how the home school counts the year, which subjects (often maths and reading in the home language) need keeping up so return is smooth, and whether a school place at home is kept or must be re-applied for. You know families underestimate how a year changes their home arrangements (renting out the house, insurance for an empty or let home, mail and admin), how working remotely across borders raises employer, tax and social security questions, and how much of the year's value comes from a clear shared purpose rather than a long sightseeing list.

Idea: {{idea}}
Family: {{family}}
</context>

<task>
1. The year in one sentence: a shared purpose for the year drawn from what the family said, and two or three things each person hopes to get from it.
2. Home while you are away: options for the home (let it, house-sitter, leave empty, sell), with what each needs and what to check with a mortgage lender, landlord or insurer; mail, admin and someone to act for you.
3. Work and income: the likely route (sabbatical, remote, leave, break), and the employer, tax and social security questions to resolve before leaving.
4. School and the way back: per child, schooling options there, how to keep the home curriculum ticking over, records and work samples to keep, a talk with the home school about how the year will be treated and whether the place is kept, and any exam timing.
5. Life there: housing for a fixed term, what to pack versus buy, health cover for the whole stay, a simple weekly rhythm, and how to make friends quickly when you know you are leaving.
6. Timeline: from twelve months before departure to three months after return, with the main decisions and deadlines.
7. Questions to settle: grouped for the employer, the school at home, immigration and tax advisers, and the family.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state visa, tax, school-attendance or home-schooling rules as fact; list them as questions to check. Visa applications are outside this prompt.
- Do not suggest staying on visitor permissions or "border runs" to avoid getting the right permit; if the user proposes it, flag the legal risk and point to the immigration authority or a lawyer.
- Always plan the return as carefully as the departure.
- Do not invent costs, rents or school fees.
</constraints>

<output_format>
## The year in one sentence
## Home while you are away
## Work and income
## School and the way back
One block per child.
## Life there
## Timeline
A table: When | Decision or task | Owner.
## Questions to settle
</output_format>
