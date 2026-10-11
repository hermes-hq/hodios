---
schema: 1
id: compare-health-insurance-plans
kind: prompt
title: Compare health insurance plans
description: Compares health insurance plans by total yearly cost under low, expected and bad health years, plus networks, drug cover and limits, so the cheapest premium is not mistaken for the cheapest plan.
category: insurance
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [document, text]
output: [table, report, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [health-plan, deductible, out-of-pocket-maximum, provider-network, open-enrollment]
pairs_with:
  prompts: [explain-insurance-policy, choose-insurance-deductible, understand-medical-bill]
args:
  - name: plans
    description: "Each plan's details: premium (and any employer contribution), deductible or excess, co-pays and coinsurance, out-of-pocket maximum, network type, drug cover, annual or condition limits, and waiting periods. A summary of benefits is ideal."
    type: text
    required: true
  - name: expected_use
    description: "Who is covered and what care you expect: regular prescriptions, ongoing conditions, planned procedures or a pregnancy, number of doctor visits, therapy, and doctors or hospitals you want to keep. Share only what you are comfortable sharing."
    type: text
  - name: country
    description: Country, and state or region if relevant, because public systems and plan rules differ a lot.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Summary, Plans side by side, Yearly cost in three scenarios, Networks and drugs, Limits and exclusions to check, Questions before choosing, Assumptions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The plan with the lowest premium is often not the cheapest over a year, and the plan that is cheapest in a healthy year can be ruinous in a bad one. The honest comparison is total yearly cost (premiums plus what you pay when you use care, up to any out-of-pocket cap) under several scenarios: a quiet year, the year you expect, and a bad year such as a hospital stay. After that come the things that decide whether the plan works for you at all: whether your doctors and hospitals are in network, whether your regular medicines are covered and at what tier, waiting periods for pre-existing conditions or pregnancy, and annual or per-condition limits. Systems differ by country: in some, private cover sits on top of a public system and mainly buys speed and choice; in others it is the main way to pay for care, and tax-advantaged accounts may be tied to certain plan types. Decisions are usually locked for a year outside qualifying life events.

Country: {{country}}
{{#expected_use}}Expected use: {{expected_use}}{{/expected_use}}
</context>

<task>
<plans>
{{plans}}
</plans>

1. Line up the plans: premium net of any employer contribution, deductible or excess (individual and family), co-pays and coinsurance, out-of-pocket maximum, network type, drug tiers, limits and waiting periods. Mark anything not stated.
2. Yearly cost in three scenarios for this household: a low-use year, the expected year from the stated use, and a bad year (for example an unplanned hospital stay reaching the out-of-pocket maximum where one exists). Show the arithmetic for each plan.
3. Networks and drugs: list what must be checked in each plan's provider directory and drug list for the stated doctors and medicines, and the cost of going out of network.
4. Limits and exclusions to check: waiting periods, pre-existing condition rules, annual or lifetime limits, excluded treatments such as mental health or maternity, referral requirements.
5. Note country-specific features worth checking (for example tax-advantaged accounts tied to certain plans, public system interaction, tax rebates or penalties for private cover), as things to confirm rather than facts.
6. Summarise which plan is cheapest in each scenario and the trade-off, without choosing for the person; then list questions to ask the insurer or employer benefits team before the deadline.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Compute only from the plan details supplied; if a figure is missing, say the scenario cost cannot be completed and what to look up.
- Do not recommend a specific plan or insurer; show the trade-off and let the person decide, and suggest a licensed broker, navigator or benefits adviser where available.
- Do not give medical advice about which treatment the person needs.
- Treat health details as sensitive: use only what is offered and do not ask for diagnoses beyond what changes the cost comparison.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Which plan costs least in each scenario, and the main trade-off in two or three sentences.

## Plans side by side
Table: feature | plan A | plan B | ...

## Yearly cost in three scenarios
Table: scenario | plan A | plan B | ... with arithmetic below.

## Networks and drugs
Checklist per plan.

## Limits and exclusions to check
Bullets.

## Questions before choosing
Numbered.

## Assumptions
Bullets.
</output_format>
