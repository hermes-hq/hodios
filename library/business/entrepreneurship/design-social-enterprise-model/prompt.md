---
schema: 1
id: design-social-enterprise-model
kind: prompt
title: Design a social enterprise model
description: Designs a social enterprise - the mission, who pays and who benefits, trading against grant income, legal forms to check and impact measures - and tests whether trading and mission pull the same way.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [discover, design]
role: [founder]
subject: [nonprofit]
requires: [none]
inputs: [text, notes]
output: [plan, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [social-enterprise, theory-of-change, mission-drift, earned-income, impact-measures, legal-form]
pairs_with:
  prompts: [model-unit-economics, write-impact-report, write-business-plan, validate-business-idea]
  personas: [social-entrepreneur-mentor, nonprofit-advisor]
args:
  - name: mission
    description: The social or environmental problem you want to change, for whom, and what would be different if you succeed.
    type: text
    required: true
  - name: idea
    description: What you plan to sell or run (a cafe that trains young people, a repair shop, a cleaning company employing people leaving prison, a paid service for councils) and any figures you have.
    type: text
    required: true
  - name: country
    description: Country where you will set up, used only to frame what to check about legal forms and tax.
    type: string
    default: not given
output_contract:
  format: markdown
  sections: [Mission and change, Model type, Who pays and who benefits, Income mix, Mission-trading tension test, Legal form options to check, Impact measures, Risks and next tests]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a social entrepreneur, or a charity starting to trade, design a social enterprise: a business whose trading exists to deliver a social or environmental purpose. The common failures are well known. The beneficiary is not the customer, so nobody checks who actually pays and why; the social programme adds costs (support workers, slower production, training time) that the price cannot carry, so the business quietly depends on grants; and mission drift sets in as the most profitable activity stops serving the people it was meant for. A good design names the model type, prices in the "social cost", and decides the income mix on purpose.

Country: {{country}}
</context>

<task>
<mission>
{{mission}}
</mission>

<idea>
{{idea}}
</idea>

1. Mission and change: a one-sentence mission, the people it serves, and a short theory of change - activities, outputs, outcomes, long-term change - with the assumption each step rests on.
2. Model type: identify which pattern fits and why - employment or training (beneficiaries are the workforce), trading with beneficiaries (they are the customers, often at subsidised prices), profit for purpose (profits fund a programme), service contracts (public bodies pay for outcomes), or cross-subsidy (paying customers subsidise those who cannot pay).
3. Who pays and who benefits: map customers, beneficiaries, funders and partners; for each, what they value and what they pay.
4. Income mix: estimate the split between trading income, contracts, grants and donations in year one and year three; the extra cost of the social element per unit or per year; and the trading volume needed to cover it. Use their figures and mark estimates.
5. Mission-trading tension test: five questions - does selling more deliver more impact? Who loses if price goes up? What would a purely commercial rival do cheaper? What profitable activity would pull away from the mission? What happens to the mission if grants stop? Answer each for this idea and rate it aligned, manageable or conflicting.
6. Legal form options to check: compare the families of forms usually available (a company limited by shares or guarantee with a social purpose clause or asset lock, a community-interest or benefit company form, a cooperative, a charity with a trading subsidiary, a sole trader or partnership to start) on ownership, investment, grants eligibility, profit distribution and admin. Frame country-specific forms as names to confirm with an adviser.
7. Impact measures: three to five outcome measures (not just outputs) that are cheap to collect, with the source and frequency, and one honest counterfactual question.
8. Risks and next tests: top risks and the next three cheap tests to run.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never state that a particular legal form exists in their country or what its rules are; name it as an option to verify with a lawyer, accountant or the national social enterprise support body.
- Never invent grant programmes, funders, market sizes or impact statistics.
- Be candid when the trading and mission conflict; do not paper over it.
- If the mission or idea is too vague to model (no beneficiary, no product), ask for those before going further.
</constraints>

<output_format>
## Mission and change
Mission sentence, then a table: Stage | What | Assumption.

## Model type
The type and two sentences on why.

## Who pays and who benefits
Table: Group | Role | What they value | What they pay.

## Income mix
Table: Source | Year 1 | Year 3 | Confidence. Then the social cost and volume arithmetic.

## Mission-trading tension test
Table: Question | Answer | Rating.

## Legal form options to check
Table: Form family | Fits because | Watch out for | Ask your adviser.

## Impact measures
Table: Outcome | Measure | Source | Frequency.

## Risks and next tests
Numbered list.
</output_format>
