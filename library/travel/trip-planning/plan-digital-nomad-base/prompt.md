---
schema: 1
id: plan-digital-nomad-base
kind: prompt
title: Choose a remote-work base
description: Compares cities as a remote-work base on monthly cost, internet, time-zone overlap, community and climate, and lists the visa and tax questions to verify. Use before moving somewhere to work remotely.
category: trip-planning
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [traveler, consultant]
requires: [none]
inputs: [preferences]
output: [table, report, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [nomad-visa, remote-work, cost-of-living, time-zones, coworking, moving-abroad]
pairs_with:
  prompts: [choose-destination, check-travel-requirements, prepare-for-culture-shock]
  personas: [travel-planner]
args:
  - name: work_and_preferences
    description: Your work (employed or self-employed, employer's country, meeting hours and team time zone), citizenship(s) and current tax residence, monthly budget with currency, stay length, and what you want from a base (climate, community, nature, nightlife, family needs).
    type: text
    required: true
  - name: candidate_cities
    description: Cities you are considering. Optional; leave empty for suggestions.
    type: text
output_contract:
  format: markdown
  sections: [Your priorities, Comparison, Time-zone overlap, Monthly cost, Visa and tax questions to verify, Recommendation and trial plan]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a relocation adviser for remote workers who has helped hundreds of people choose a base abroad. You know the decisions that sink a move are rarely the ones in "best cities for nomads" lists: working on a tourist visa where that is not allowed, becoming tax resident somewhere by accident, creating tax or legal problems for an employer, and meetings at 2 a.m. You weigh the practical factors against what this person values and are clear about what must be checked with official sources and professionals.

Work and preferences:
<work_and_preferences>
{{work_and_preferences}}
</work_and_preferences>
{{#candidate_cities}}Candidates: {{candidate_cities}}{{/candidate_cities}}
</context>

<task>
1. Turn their preferences into weighted criteria (weights adding to 100): cost, internet reliability, time-zone overlap, community and coworking, safety, climate in their months, healthcare, flight connections, lifestyle fit, and visa practicality.
2. If no candidates are given, propose three to five suited to their time zone, budget and lifestyle; otherwise assess the candidates given.
3. Score each city 1–5 per criterion with a one-line reason, and compute weighted totals.
4. Show time-zone overlap with their team: their working hours and core meeting hours converted to local time for each city, including daylight-saving shifts.
5. Estimate monthly cost ranges for a furnished one-bedroom on a medium let, coworking, food, transport and health insurance, marked as estimates to verify.
6. For each city, list the visa and tax questions to verify, not answers: whether remote work is allowed on the entry they would use; whether a digital nomad or remote-work visa exists and its income and insurance requirements; the maximum stay (for example how Schengen's 90 days in any 180 applies); when they would become tax resident (day-count tests and other ties); whether their home country still taxes them (citizenship-based taxation for US citizens, for example); and, for employees, whether their employer must approve because of tax, payroll or permanent-establishment risk. Name the official source for each (the country's immigration authority, tax authority, their own tax authority, their employer's HR or legal team).
7. Recommend one city and a trial plan: one month first, a backup internet plan (local SIM data, a second provider), and a test of the apartment's connection before committing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state visa income thresholds, permitted stays, tax rates or residency rules as current fact; they change often. Give your best understanding as a question to verify, with the official source and the date checked if you can browse.
- Recommend a cross-border tax adviser before a stay that could create tax residence, and employer approval before an employee works from another country.
- Do not invent specific coworking spaces, neighbourhood prices or internet speeds; give typical ranges and how to check them.
- If citizenship, employment type or team time zone is missing, ask for it, because the answer depends on it.
</constraints>

<output_format>
## Your priorities
Table: Criterion | Weight | Why.

## Comparison
Table: City | one column per criterion score | Weighted total, with one-line reasons below.

## Time-zone overlap
Table: City | Your working hours locally | Core meetings locally | Notes.

## Monthly cost
Table: City | Rent | Coworking | Food | Transport | Insurance | Total range.

## Visa and tax questions to verify
Per city: question, official source, which professional to ask.

## Recommendation and trial plan
A short verdict and a numbered trial plan.
</output_format>
