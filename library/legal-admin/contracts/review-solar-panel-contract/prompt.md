---
schema: 1
id: review-solar-panel-contract
kind: prompt
title: Review a home solar panel contract
description: Reviews a home solar lease, loan or power purchase agreement for the true cost, escalators, savings claims, transfer on sale, warranties and cancellation rights.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
subject: [law]
requires: [none]
inputs: [document, text]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [solar-panels, power-purchase-agreement, home-energy, cooling-off, consumer-finance]
pairs_with:
  prompts: [plan-energy-efficiency-upgrades, review-consumer-terms, explain-contract-clause]
args:
  - name: contract
    description: The contract or proposal text, or the key terms - deal type, system size, price or monthly payment, rate and escalator, term, warranties, production estimate, cancellation and transfer clauses.
    type: text
    required: true
  - name: home
    description: Your current electricity bills or usage, roof age and condition, how long you expect to stay in the home, and any other quotes you have.
    type: text
    required: true
  - name: location
    description: Country and state or region. Incentives, net metering or export rules, and cooling-off rights vary.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [What kind of deal this is, True cost over the term, Savings claims checked, Clauses that matter, Questions to ask before signing, Cancellation window]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a homeowner review a solar panel deal before signing. The structure matters more than the panels. With a cash purchase or a loan, the owner owns the system and any incentives. With a lease, the owner pays monthly to use a system someone else owns. With a power purchase agreement (PPA), the owner buys the electricity the system produces at a set rate per kWh. Leases and PPAs often run 20 to 25 years and include an annual escalator (for example 2.9% a year) that can make the later years cost more than grid power. Common traps: savings projections that assume steep utility price rises or export rates that later change; loans with a low rate but a large hidden dealer fee built into the price; a loan payment that assumes a tax credit or rebate will be paid down by a set date, after which the payment jumps; a lien or filing on the property that complicates selling or refinancing; transfer-on-sale terms that require the buyer to qualify and take over the contract; a roof that will need replacing during the term, with removal and reinstall costs; and production guarantees that pay little. Door-to-door and high-pressure sales are common in this market, and many places give a short cooling-off period for doorstep or off-premises sales.

Location: {{location}}

<contract>
{{contract}}
</contract>

<home>
{{home}}
</home>
</context>

<task>
1. Identify the deal type (cash, loan, lease, PPA) and who owns the system, receives incentives and handles repairs. If the type is unclear from the text, say so and list what to ask.
2. Calculate the total cost over the full term from the figures given: monthly payment or rate per kWh with the escalator compounded year by year, any balloon or re-amortisation if an incentive is not paid down, and fees. Show the calculation and the payments in years 1, 10 and the final year.
3. Check the savings claims against the home's actual usage and bills: the utility price rise and export or net-metering assumptions used, and the system's estimated production. Show what savings look like if utility prices rise more slowly or export rates fall. Never assume incentives the person has not confirmed they qualify for.
4. Review the clauses that matter, quoting the contract: escalator, term, transfer on sale and buyout, liens or property filings, roof penetration and roof replacement, warranties (panels, inverter, workmanship) and who honours them if the installer closes, production guarantee, end-of-term removal, default and early termination.
5. List questions to put to the installer in writing before signing, and suggest getting at least two other quotes on the same basis (price per watt for purchases, rate and escalator for PPAs).
6. Explain the cancellation window to check: whether a cooling-off right likely applies to how the deal was sold, the deadline counting from the signing date, and how to cancel in writing. Mark it "[to verify]".
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state incentive amounts, tax credit eligibility, export rates or cooling-off periods as fact; mark them "[to verify]" with the type of official source to check.
- Base every number on figures the person supplied; label assumptions.
- If the person has already signed and may be inside a cancellation window, put that first.
- Do not recommend a particular installer or brand.
{{> output/uncertainty}}
</constraints>

<output_format>
## What kind of deal this is
Three or four lines.

## True cost over the term
Table: Year | Payment or rate | Annual cost | Running total. Then the method.

## Savings claims checked
Table: Assumption | Installer's figure | Realistic range | Effect on savings.

## Clauses that matter
Bullets: clause quoted | what it means | risk level.

## Questions to ask before signing
Numbered list.

## Cancellation window
Two or three lines marked "[to verify]".
</output_format>
