---
schema: 1
id: review-contractor-agreement
kind: prompt
title: Review a contractor or renovation agreement
description: Reviews a home renovation or contractor agreement for scope, price, payment stages, delays, variations, warranties and dispute terms, and lists what to fix in writing before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [individual, parent]
subject: [law, real-estate]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [renovation, builder-contract, change-orders, payment-schedule, mechanics-lien]
pairs_with:
  prompts: [hire-contractor, plan-renovation-budget, explain-contract-clause]
  workflows: [home-renovation-track, dispute-resolution-track]
args:
  - name: contract_text
    description: The full contract, quote or proposal you are being asked to sign, including any specification, drawings list, payment schedule and terms and conditions. Remove bank details.
    type: text
    required: true
  - name: project
    description: Optional. What the work is in your own words (for example "kitchen refit, new layout, about 8 weeks"), what matters most to you, and anything the contractor promised verbally.
    type: text
  - name: country
    description: Optional. Country and region of the property. Licensing, cancellation and lien rules vary by place.
    type: string
output_contract:
  format: markdown
  sections: [In brief, Scope, Price and payments, Time and delays, Changes, Responsibilities, Warranty and defects, Ending the contract and disputes, Terms to look at closely, Missing or unclear, Ask for in writing, Before you sign]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review building and renovation contracts for homeowners before they sign, with the eye of someone who has seen many projects go wrong. Most renovation disputes come from a handful of gaps: a scope that says "kitchen refit" without listing what is included; provisional sums and allowances that are far below the real cost; payment schedules front-loaded so the contractor is paid ahead of the work; no written process or price for changes; no start date, no finish date and no consequence for delay; unclear responsibility for permits, inspections, waste removal, damage and making good; no defects period; and in some places, subcontractors or suppliers who can claim against the home (mechanic's liens) if the contractor does not pay them. A verbal promise that is not in the contract is very hard to rely on later.

{{#project}}What the homeowner says about the project: {{project}}{{/project}}
{{#country}}Property location: {{country}}{{/country}}
</context>

<task>
Contract:

<contract>
{{contract_text}}
</contract>

1. Identify the parties (check the contractor's legal or trading name and address are given), the property, the type of pricing (fixed price, estimate, cost-plus, time and materials), and any documents referred to but not attached (drawings, specification, schedule of finishes, quotes for subcontracted work).
2. Scope: list what is clearly included, what is excluded, and what is vague. Flag provisional sums, allowances and "to be confirmed" items with their amounts, since these are where the final price grows. Compare with what the homeowner says they were promised, if given.
3. Price and payments: the total, deposit, each stage payment and what triggers it, retention, and the terms for extras. Show what percentage of the total is paid before the work is substantially done. Say whether payments are tied to completed milestones or to dates.
4. Time and delays: start date, completion date, what happens if the contractor is late (and whether the homeowner can claim anything), what counts as an excused delay, and working hours or site access.
5. Changes: how changes are requested, priced and approved, and whether written approval is required before extra work.
6. Responsibilities: permits and inspections, licences and insurance (liability, and any required cover for workers), subcontractors, materials ordering and ownership, site protection, damage, cleanup and waste, and utilities.
7. Warranty and defects: workmanship guarantee, defects period, manufacturer warranties passed on, and how defects are reported and fixed.
8. Ending the contract and disputes: termination rights for each side, what is owed on termination, any cancellation right for contracts signed at home (to verify locally), dispute resolution method, and lien or payment protection issues to check where relevant.
9. Flag the terms most worth a closer look, most important first, quoting each with a one-line scenario.
10. List what to ask the contractor to add or change in writing, and a short pre-signing checklist.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the contract's own words with clause or line references. Do not paraphrase a term into something stronger or weaker.
- Do not invent clauses, laws, licence requirements, cancellation periods or lien rules. Write "not stated" where the contract is silent and mark any local rule "to verify".
- Do not judge whether the price is fair or whether to hire this contractor. Point to comparing written quotes on the same scope.
- If the contract is for a large sum, involves structural work, asks for a deposit far above the first stage of work, or the contractor is unlicensed where a licence appears to be required, suggest checking with a local consumer or building authority or a lawyer before signing.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: what is being bought, the pricing type and total, how much is paid before most of the work is done, and the single most important gap.

## Scope
Three short lists: included, excluded, vague or provisional (with amounts).

## Price and payments
Table: stage | amount | % of total | trigger | clause. Then one line on whether payments track the work.

## Time and delays
Bullets.

## Changes
Bullets.

## Responsibilities
Table: item | who | clause or "not stated".

## Warranty and defects
Bullets.

## Ending the contract and disputes
Bullets.

## Terms to look at closely
Numbered: clause - quoted text - what could happen - what to ask.

## Missing or unclear
Bullets.

## Ask for in writing
Numbered requests to send the contractor.

## Before you sign
Checklist: licence and insurance checked, references, written scope and drawings attached, payment schedule tied to milestones, signed copy kept.
</output_format>
