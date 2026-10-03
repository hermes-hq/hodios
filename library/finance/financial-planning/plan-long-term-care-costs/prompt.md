---
schema: 1
id: plan-long-term-care-costs
kind: prompt
title: Plan long-term care costs
description: Explains long-term care options and costs for an ageing relative - home care, assisted living, care homes - with funding sources, how long the money lasts and questions to ask.
category: financial-planning
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [table, explanation, questions]
risk: read-only
advice_risk: [financial, legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [long-term-care, ageing-parents, care-home-fees, assisted-living, means-testing]
pairs_with:
  prompts: [manage-parent-finances, plan-supporting-family-financially, plan-retirement-drawdown]
  personas: [personal-finance-coach]
args:
  - name: situation
    description: Who needs care, their age, health and daily needs as far as you know them, where they live now, what support they already get, and who in the family is involved.
    type: text
    required: true
  - name: country
    description: Country (and region where rules differ), since public funding, means tests and care markets vary widely.
    type: string
    required: true
  - name: assets_overview
    description: Their income (pensions, benefits) and assets (savings, home, investments), and whether a partner still lives in the home. Optional; general guidance is given without it.
    type: text
output_contract:
  format: markdown
  sections: [Where to start, Care options compared, Funding sources to check, How long the money lasts, Rules that catch families out, Questions to ask, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Families usually face long-term care decisions in a hurry, after a fall or a hospital stay, and in a system that is hard to read: who pays depends on a needs assessment and often a means test, health-related care may be funded differently from personal care, the family home may or may not count, and giving money away to qualify can be treated as deliberate deprivation or caught by a look-back period. Costs vary from a few hours of home care a week to full-time nursing care costing more than many people's salaries. The aim is to map the options and funding routes for this person, estimate how long their money would last, and give the family the right questions for the assessors, providers and a specialist adviser.

Country: {{country}}

<situation>
{{situation}}
</situation>
{{#assets_overview}}<assets_overview>
{{assets_overview}}
</assets_overview>{{/assets_overview}}
</context>

<task>
1. Where to start: the first two or three steps in this country as far as you know them - typically requesting a formal care needs assessment from the local authority or health system, a financial assessment, and checking health-funded care if needs are primarily medical. Mark country-specific names and processes as "check locally" if you are not confident.
2. Care options compared: home care (hourly visits), live-in care, adult day services, assisted or supported living, residential care homes, nursing homes, and respite care. For each: who it suits, typical cost pattern (hourly, weekly, monthly) as a labelled rough range or "get local quotes", what is included, and the trade-offs for independence and family workload.
3. Funding sources to check: public funding and its means test, health-funded care for medical needs, disability or attendance-type benefits for the person, carer benefits for the family, private long-term care insurance if they hold it, pensions and income, savings, the home (including deferred payment schemes or equity release where they exist, flagged as needing specialist advice), and family contributions or top-up fees.
4. How long the money lasts: if assets and income are given, compute a simple runway for two or three care options - (savings and assets that count) / (annual cost - annual income) - and show when any means-test thresholds would be reached, with the thresholds labelled as to verify. State what is assumed about the home.
5. Rules that catch families out: deprivation of assets and look-back rules, the home being disregarded while a partner lives there, top-up fees and who signs for them, contracts with notice periods and fee increases, care home fees continuing after death for a set period, the need for a power of attorney before capacity is lost.
6. Questions to ask: for the needs assessor, for care providers (fees, increases, what is extra, staffing, what happens when money runs out), and for a specialist later-life financial adviser or elder-law lawyer.
7. Next steps: a short, ordered list for the coming two weeks.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not give medical opinions about the level of care needed; suggest asking the person's doctor and the assessor.
- Do not help move or hide assets to qualify for public funding; explain that this can be reversed or penalised and point to an elder-law lawyer or specialist adviser.
- Give costs as labelled ranges or tell them to get local quotes; never invent precise local prices or thresholds.
- Recognise the emotional load; keep the tone warm and practical, and mention carer support for the family.
- Mark every country-specific rule you are not sure is current as "check locally".
{{> output/uncertainty}}
</constraints>

<output_format>
## Where to start
Numbered first steps.

## Care options compared
Table: option | suits | cost pattern | included | trade-offs.

## Funding sources to check
Bullets.

## How long the money lasts
Table: care option | annual cost (assumed) | annual income | gap | years of funding | threshold reached. Then assumptions.

## Rules that catch families out
Bullets.

## Questions to ask
Grouped by assessor, provider, adviser or lawyer.

## Next steps
Numbered list for the next two weeks.
</output_format>
