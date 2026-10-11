---
schema: 1
id: check-benefits-entitlement
kind: prompt
title: Check benefits entitlement
description: Screens a household's situation for government benefits, tax credits and support schemes it may qualify for, with the official place to verify each and how to apply.
category: paperwork
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [individual, parent]
subject: [law, public-sector]
requires: [none]
inputs: [text]
output: [table, checklist, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [benefits-check, tax-credits, welfare, means-tested, household-support, unclaimed-benefits]
pairs_with:
  prompts: [apply-for-housing-assistance, prepare-disability-benefits-application, apply-for-unemployment-benefits, find-free-legal-help]
args:
  - name: location
    description: Country and region or city; many schemes are national, but some are run by states, provinces or local councils.
    type: string
    required: true
  - name: household
    description: Who lives with you (adults, children's ages), work and hours, rough income and savings, housing costs, disability, health or caring roles, pregnancy, students, anyone over pension age, and residence status if relevant. Use roles, not names.
    type: text
    required: true
  - name: already_receiving
    description: Optional. Benefits, credits or discounts the household already gets, and any recent change such as a new baby, job loss, separation or a diagnosis.
    type: text
output_contract:
  format: markdown
  sections: [What I am assuming, Worth checking now, Possibly eligible, Questions that would change the answer, How to verify and apply, Before you claim]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a household find support it may be missing. Large amounts of benefits, tax credits and discounts go unclaimed every year, mostly because people assume they earn too much, own a home, work full time or have savings, and stop looking. Experts screen by life situation rather than by scheme name: low income, children, disability or long-term illness (of anyone in the household, including children), caring for someone, pregnancy, pension age, study, housing costs, and recent changes. They also know the knock-on effects: one benefit often unlocks others (reduced local taxes, utility or phone social tariffs, free school meals, health-cost help, transport discounts), and claiming one can reduce another, or affect immigration status. Official benefit calculators and free advice services give the reliable answer; your job is a well-organised first screen that tells the person what to check and where.

Location: {{location}}
</context>

<task>
Household:

<household>
{{household}}
</household>

{{#already_receiving}}
Already receiving or recent changes:

<already_receiving>
{{already_receiving}}
</already_receiving>
{{/already_receiving}}

1. State the assumptions you are making about the household from what was given, and what is missing.
2. Screen by situation, not by scheme: income and work, children, housing costs, disability and health (adult and child), caring, pregnancy and new baby, pension age, study, and recent life changes. For each that applies, name the types of support that commonly exist in {{location}}, using official names only when confident, otherwise a descriptive name marked "to verify".
3. Sort the results into "worth checking now" (strong fit on the facts given) and "possibly eligible" (depends on details). For each give: what it is for, why it may fit this household, the main condition that decides it, and the type of official body that runs it.
4. Include the passported and local extras that commonly follow from a main benefit or low income: local tax reductions, utility and broadband social tariffs, school meals and uniform help, health-cost help, childcare support, transport concessions, hardship funds.
5. List the questions whose answers would change the result most (for example exact income, savings thresholds, immigration status, who is on the tenancy).
6. Explain how to verify and apply: the official government benefits site or calculator for the country, independent free benefit calculators or advice services if they exist there, and the order to claim in when one claim unlocks others.
7. Warn about interactions before claiming: a new claim can stop an existing one, some claims cannot be reversed, and some affect immigration conditions. Say to run a full calculation or get advice when moving between systems.
8. Check before answering: nothing presented as a definite entitlement, no amounts stated unless confident and marked to verify, and every scheme tied to a fact in the household description.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not tell the person they are or are not entitled. Say "worth checking" and name the deciding condition.
- Do not invent scheme names, thresholds or amounts. Mark anything uncertain "to verify" and prefer descriptive names over guessed official ones.
- Never suggest understating income, hiding a household member or arranging affairs to qualify dishonestly.
- If immigration status is unclear or restricted, warn that some public funds can affect status and advise checking with an immigration adviser before claiming.
- If the household seems in crisis (no food, about to lose the home, no heating), put emergency help first: food banks, emergency payments, homelessness services, to verify locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## What I am assuming
Bullets.

## Worth checking now
Table: support | what it is for | why it may fit | deciding condition | run by.

## Possibly eligible
Same table.

## Questions that would change the answer
Bullets.

## How to verify and apply
Numbered steps, including the order to claim in.

## Before you claim
Bullets on interactions and risks.
</output_format>
