---
schema: 1
id: summarize-building-pack-before-buying
kind: prompt
title: Summarise a building pack before buying a flat
description: Summarises the owners' association, condo, strata or leasehold pack for a flat you plan to buy - fees, reserve fund, planned works, special levies, rules and disputes - with questions to ask.
category: summarization
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [document]
output: [summary, questions]
advice_risk: [financial, legal]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [apartment-buying, owners-association, service-charges, reserve-fund, building-rules]
pairs_with:
  prompts: [explain-home-survey-report, extract-key-numbers, interrogate-a-document]
args:
  - name: documents
    description: What the seller or building manager gave you - budgets, accounts, meeting minutes, rules or bylaws, lease extracts, planned works, a management information form. Paste what you have.
    type: text
    required: true
  - name: plans
    description: Your plans for the flat and your country (for example "live in it with a dog, may rent it out later, Portugal").
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The building in brief, Regular costs, Reserve fund and planned works, Special levies and arrears, Rules that affect your plans, Disputes and problems in the minutes, Questions to ask before committing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a buyer read the shared-building documents that come with a flat or apartment. Whatever the local name (owners' association, condominium, strata, homeowners' association, leasehold management), the risks are similar: fees that rise every year, a reserve fund too small for an ageing roof or lift, major works already voted in that the buyer will pay for through a special levy, owners in arrears pushing costs onto others, rules that ban pets, short-term letting or renovations, and long-running disputes or legal cases. The minutes are often more revealing than the accounts, because that is where problems are discussed before they are priced. Buyers who only check the monthly fee miss the bill coming next year.

<documents>
{{documents}}
</documents>

Buyer's plans and country: {{plans}}
</context>

<task>
1. List which documents were supplied and which important ones seem missing (recent accounts, budget, minutes of the last two or three meetings, rules, planned works, insurance).
2. Summarise the building and its management in a few lines.
3. Set out regular costs for this flat, the trend over the years shown, and what they cover.
4. Summarise the reserve or sinking fund balance and any planned works, with dates and estimated costs as stated.
5. List special levies, approved but unbilled works, and owner arrears, and who pays if the flat is sold mid-way, if the documents say.
6. List rules that affect the buyer's plans (pets, letting, renovations, noise, use), quoting them.
7. Summarise disputes, defects, insurance claims or legal cases mentioned in the minutes.
8. Draft questions for the seller, the managing agent and the buyer's lawyer or notary.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the documents. Do not invent fees, balances, rules or works; write "not stated" where missing.
- Do not assess whether the reserve fund is adequate with a figure; say what the documents show and suggest asking how planned works will be funded.
- Rules about who pays levies on sale, disclosure duties and buyer protections vary by country; flag these for the buyer's lawyer, notary or conveyancer.
- Do not tell the buyer whether to proceed.
- Quote rules and minutes exactly where they matter.
</constraints>

<output_format>
## The building in brief
Three to five lines, plus documents supplied and missing.

## Regular costs
Table: Item | Amount | Period | Trend

## Reserve fund and planned works
Bullets with dates and amounts as stated.

## Special levies and arrears
Bullets.

## Rules that affect your plans
Bullets with quotes.

## Disputes and problems in the minutes
Bullets with meeting dates.

## Questions to ask before committing
Grouped by who to ask.
</output_format>
