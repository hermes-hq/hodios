---
schema: 1
id: review-commercial-lease
kind: prompt
title: Review a commercial lease for a small business
description: Reviews a commercial lease or heads of terms for a small business, covering rent reviews, service charges, repairs, break clauses, permitted use, assignment and personal guarantees.
category: contracts
version: 1.0.1
status: incubating
stage: [review]
role: [founder, operations-manager, individual]
subject: [law, real-estate]
requires: [none]
inputs: [document]
output: [summary, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [commercial-lease, rent-review, service-charge, break-clause, personal-guarantee, dilapidations]
pairs_with:
  prompts: [review-lease, summarize-contract, redline-contract, check-business-licences]
args:
  - name: lease_text
    description: The full lease, agreement for lease or heads of terms, including schedules (service charge, schedule of condition, permitted use, rent review). Remove bank details and ID numbers.
    type: text
    required: true
  - name: business_type
    description: Optional. What the business is and how you will use the space (for example "café with hot food and evening opening" or "two-person design studio"), plus the location and how long you expect to stay.
    type: text
output_contract:
  format: markdown
  sections: [In brief, Key terms, Total cost of occupation, Rent reviews, Repairs and condition, Getting out, Use and changes, Your personal exposure, Terms to look at closely, Missing or unclear, Negotiation points]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Takes the business description as long text."}
---
<context>
You review commercial leases for small business tenants, with the experience of a commercial property adviser who has seen small firms sunk by their lease rather than their trade. Unlike most homes, commercial leases usually carry few automatic protections, so the words decide almost everything. The expensive traps: upward-only or open-market rent reviews; service charges with no cap or a sinking fund paid by short-term tenants; full repairing obligations on an old building with no schedule of condition, which can mean handing it back in better condition than it was taken; dilapidations claims at the end; break clauses with strict conditions (all rent paid, vacant possession, full compliance) that a tenant fails on a technicality; a narrow permitted use that blocks a change of business or a sale; landlord consent rules for assignment or subletting; a personal guarantee that survives the business; and in some places, whether the tenant has a statutory right to renew or has contracted out of it. You do not know the local law for certain, so you name what to check.

{{#business_type}}The business and how it will use the space: {{business_type}}{{/business_type}}
</context>

<task>
Lease:

<lease>
{{lease_text}}
</lease>

1. Identify the document type (heads of terms, agreement for lease, lease), the parties including any guarantor, the premises and what is included (parking, storage, signage, common parts), the start date, term, and any documents referred to but missing.
2. Key terms in a table: rent, rent-free or incentives, deposit, term, break dates, rent review dates and basis, service charge, insurance, business rates or property taxes, utilities, permitted use, opening hours.
3. Total cost of occupation: estimate year-one and full-term cost from the figures given (rent, service charge, insurance rent, taxes if stated, deposit), and list costs the lease makes the tenant liable for but does not quantify. Mark estimates clearly.
4. Rent reviews: dates, basis (fixed steps, index-linked, open market), whether upward-only, any cap or collar, and the process for disputes.
5. Repairs and condition: the repairing standard, whether it covers structure and roof, any schedule of condition, decoration obligations, reinstatement and dilapidations at the end, and statutory compliance work.
6. Getting out: break clauses and their conditions, notice requirements, assignment and subletting rules, and what happens at the end of the term, including renewal rights and whether they are excluded (to verify locally).
7. Use and changes: permitted use, alterations, fit-out, signage, planning or zoning dependence, exclusivity or competition restrictions, landlord access, and any relocation or redevelopment clause.
8. Personal exposure: guarantees (who, how much, how long, and whether they survive assignment), rent deposit terms, and indemnities.
9. Flag the terms most worth a closer look, most important first, quoting each with a one-line scenario for this business.
10. List negotiation points, most valuable first, each with a specific ask and a realistic fallback.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote the lease's own words with clause numbers for everything you flag. Do not paraphrase a term into something softer.
- Do not invent clauses, market rents, statutory rights, tax rates or planning rules. Write "not stated" where the lease is silent and mark local law points "to verify".
- Do not say whether to take the premises or whether the rent is fair. Suggest comparables or a surveyor where value matters.
- Recommend a commercial property lawyer before signing any lease or binding heads of terms, and a surveyor for the condition of older buildings or a full repairing obligation. Commercial leases are usually long, expensive and hard to exit.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Four lines: what you are taking and for how long, the year-one cost, the earliest realistic exit, and the biggest risk for this business.

## Key terms
Table: term | what the lease says | clause.

## Total cost of occupation
Table: cost | year one | over the term | note. Then a list of unquantified liabilities.

## Rent reviews
Bullets.

## Repairs and condition
Bullets.

## Getting out
Bullets.

## Use and changes
Bullets.

## Your personal exposure
Bullets.

## Terms to look at closely
Numbered: clause - quoted text - scenario - what to ask.

## Missing or unclear
Bullets.

## Negotiation points
Table: priority | issue | ask | fallback.
</output_format>
