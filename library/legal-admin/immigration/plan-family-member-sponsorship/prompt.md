---
schema: 1
id: plan-family-member-sponsorship
kind: prompt
title: Plan sponsoring a family member
description: Plans sponsoring a parent, child or other relative to join you, with the sponsor's own conditions, the relative's eligibility points, the money and housing evidence, waiting times and what to confirm.
category: immigration
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [family-sponsorship, parent-visa, dependent-child, family-reunification, sponsor-obligations]
pairs_with:
  prompts: [prepare-financial-evidence-for-visa, compare-visa-routes, prepare-visa-application, vet-immigration-adviser]
  personas: [legal-information-guide]
args:
  - name: country
    description: The country you live in and want to bring the relative to.
    type: string
    required: true
  - name: sponsor
    description: Your own status there (citizen, permanent resident, worker, refugee), how long you have held it, your household, income and housing.
    type: text
    required: true
  - name: relative
    description: Who you want to bring (for example widowed mother aged 72, son aged 17, adult sister), where they live now, their health, and whether they depend on you. No ID numbers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Possible routes, Sponsor conditions, The relative's case, Evidence plan, Time and cost, What to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Family sponsorship beyond partners and young children is where people are most often surprised. Many countries limit who can sponsor (often citizens and permanent residents only, or recognised refugees on special terms), set income thresholds measured over past tax years rather than current salary, require adequate housing, and make the sponsor sign an undertaking to support the relative for years, sometimes with repayment of benefits if the relative claims them. Routes for parents may have caps, lotteries, very long queues or a need to show the parent depends on the sponsor and cannot get care at home. Children usually must be under an age limit on a specific date, and a child from a separated family often needs the other parent's consent. Visitor routes are not a substitute, because overstaying ruins later chances.

Country: {{country}}

<sponsor>
{{sponsor}}
</sponsor>

<relative>
{{relative}}
</relative>
</context>

<task>
1. Possible routes: the family routes that commonly exist in this country for this relationship (for example parent or grandparent, dependent child, adult dependent relative, a long-stay visitor option), marked to confirm, and any route that commonly does not exist for this relationship.
2. Sponsor conditions: status, length of residence, income test and how it is measured, housing, undertaking and its length, and anything in the sponsor's history that commonly matters.
3. The relative's case: age limits and the date they apply, dependency, health and care needs, consent of the other parent for a child, and medical or police checks.
4. Evidence plan: the documents for each condition, translations, and who must provide them.
5. Time and cost: queues, caps or intake windows, fees and health charges, all as "to confirm".
6. What to confirm: questions for the official source and for a regulated adviser, especially where the route is narrow or discretionary.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Mark every requirement, threshold, cap and fee "typical, confirm on the official source"; do not state numbers from memory as fact.
- Never say the relative qualifies; compare the facts with the requirements as given.
- Do not suggest using a visitor or student visa to bring the relative with an intention to stay.
- Where a child's custody, a refugee family, a disability or a refusal is involved, recommend a regulated adviser or free legal service.
{{> output/uncertainty}}
</constraints>

<output_format>
## Possible routes
Table: Route | Who it is for | Main conditions | Notes.
## Sponsor conditions
Checklist.
## The relative's case
## Evidence plan
Table: Condition | Documents | Who provides | Translation?
## Time and cost
## What to confirm
Numbered.
</output_format>
