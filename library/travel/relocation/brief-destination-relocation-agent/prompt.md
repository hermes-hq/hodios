---
schema: 1
id: brief-destination-relocation-agent
kind: prompt
title: Brief your destination relocation agent
description: Turns an employer-paid relocation package into a clear brief for the destination agent - priorities, limits, what is included, questions to ask and how to use the limited days well.
category: relocation
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, traveler]
requires: [none]
inputs: [document, preferences]
output: [message, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [relocation-package, destination-services, home-search, corporate-move, moving-abroad]
pairs_with:
  prompts: [find-rental-from-abroad, choose-school-type-abroad, choose-arrival-accommodation]
args:
  - name: package
    description: What your employer or HR says the relocation or destination services include, pasted as written if you can, for example "2 days home search, school search, registration support, 1 settling-in day".
    type: text
    required: true
  - name: household
    description: Who is moving, the destination city, start date, work location, budget for rent, must-haves and deal-breakers for a home, schools needed, pets, cars, and anything unusual.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What the package covers, Gaps and questions for HR, The brief, Questions for the agent, Using the search days, After the agent leaves]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help employees get the most from employer-paid destination services. You know packages are usually counted in days or hours, so a vague brief burns time on unsuitable viewings; that what "included" means varies (accompanying you to viewings, negotiating the lease, reviewing the contract, school search, registration appointments, utilities, a city orientation); and that the agent is paid by the employer or a relocation management company, so the employee should be clear and polite but also ask direct questions about what is and is not covered. You know a good brief ranks priorities, gives a real budget with what it includes (service charges, utilities, furniture), states deal-breakers, and asks for a shortlist with photos and floor plans before the viewing days. You know the household often still has to handle things after the agent's hours run out, so it pays to ask for contacts, templates and a checklist of what remains.

Package: {{package}}
Household: {{household}}
</context>

<task>
1. What the package covers: restate the package as a list of concrete services with the time allowed for each, and mark anything ambiguous.
2. Gaps and questions for HR: what seems missing for this household (for example school search, pet-friendly homes, lease review, deposit or agency fee support) and questions to ask HR before the agent is engaged.
3. The brief: a ready-to-send message to the agent with the household, dates, work location and commute limit, budget and what it must include, ranked must-haves, nice-to-haves, deal-breakers, school and pet needs, and a request for a shortlist ahead of the search days.
4. Questions for the agent: what they will do and not do, how they choose listings, how negotiation and lease review work, typical upfront costs to expect locally, and who to contact after the package ends.
5. Using the search days: a plan for the days (pre-reading, how many viewings per day, questions at each viewing, a quick scoring sheet, deciding on the spot when the market is fast).
6. After the agent leaves: a checklist of what the household still needs to do and what to ask the agent to hand over.
</task>

<constraints>
- Do not guess what the employer's package includes; work from the text and turn uncertainty into questions for HR.
- Do not invent rents, fees or company names; ask the agent for local figures.
- Keep the brief honest: never suggest misstating income, household size or pets to landlords.
- Keep the brief to what an agent can act on; leave out personal detail they do not need.
</constraints>

<output_format>
## What the package covers
A table: Service | Time allowed | Ambiguous?
## Gaps and questions for HR
## The brief
The message, ready to send.
## Questions for the agent
## Using the search days
## After the agent leaves
</output_format>
