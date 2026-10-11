---
schema: 1
id: draft-cohabitation-agreement
kind: prompt
title: Draft a cohabitation agreement for an unmarried couple
description: Drafts a cohabitation agreement for an unmarried couple living together, covering property shares, contributions, bills, joint purchases, pets and what happens if you separate.
category: contracts
version: 1.0.0
status: incubating
stage: [build]
role: [individual]
subject: [law]
requires: [none]
inputs: [text]
output: [docs, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cohabitation-agreement, living-together, unmarried-couple, property-shares, separation-terms, joint-ownership]
pairs_with:
  prompts: [plan-moving-in-together-finances, plan-couple-money-conversation, explain-contract-clause]
args:
  - name: situation
    description: Who owns or rents the home and in whose name, what each of you put in (deposit, mortgage payments, renovations), incomes in rough terms, children (existing or planned), pets, and big shared items.
    type: text
    required: true
  - name: agreed
    description: What you have agreed so far - how bills and mortgage are split, how the home would be divided if you split up, what happens to joint purchases, savings, debts and pets, notice to move out, and anything still undecided.
    type: text
    required: true
  - name: jurisdiction
    description: Country and state or region. Unmarried partners have very different rights from married ones in many places, and property ownership forms differ.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Before you use this, Agreement, Drafting notes, Gaps to decide together, Questions for a lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many couples who live together assume they have the same protections as married couples if they split up or one dies; in many places they do not, and the home goes to whoever's name is on the title unless something else is written down. Family and property lawyers recommend a cohabitation agreement especially when one partner moves into a home the other owns, when contributions to a deposit or mortgage are unequal, or when one partner reduces work for children. What a good one records: who owns the home and in what shares, and whether the title should match (joint ownership forms and declarations of trust or their local equivalents); how each person's deposit is treated (returned first, or shared); how mortgage payments, renovations and bills count towards shares; what happens to joint accounts, savings, debts, cars, furniture and pets; how much notice to give and who moves out; how the home is valued and bought out, or sold, and how long the other has to buy out; what happens if children arrive; disclosure of each person's finances; regular reviews; and that wills and life insurance are separate documents still needed. Whether a cohabitation agreement is binding, and what formalities it needs, depends on the place.

Jurisdiction: {{jurisdiction}}

<situation>
{{situation}}
</situation>
</context>

<task>
<agreed>
{{agreed}}
</agreed>

1. Check what the couple has agreed against what a cohabitation agreement needs and list missing decisions.
2. Draft the agreement in plain, neutral English with numbered clauses: parties with placeholders, purpose and the fact it is made freely with full disclosure, the home and ownership shares, deposits and capital contributions, mortgage and rent, renovations, household bills and how they are split, joint accounts, savings and debts, personal and joint possessions, cars, pets, children (stating that child arrangements and support cannot usually be fixed in advance), what happens on separation (notice, who stays, valuation, buy-out timing, sale), death (noting wills are needed separately), reviews and changes, independent advice and disclosure, signatures.
3. Add drafting notes explaining each important choice, with a worked example of how the home would be split on separation using the stated figures.
4. List gaps to decide together, with options and trade-offs, phrased neutrally.
5. List questions for a lawyer, including whether the agreement is binding locally, whether the property title should change, formalities such as witnesses, and tax points.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the terms given; put every missing amount, share and date in [BRACKETS]. Do not invent property values or local rules.
- Stay neutral between the partners even if only one is asking; one-sided terms make an agreement more likely to be challenged and harder to agree.
- Recommend that each partner takes independent legal advice before signing.
- Do not state whether the agreement is binding or what local law gives unmarried partners; list these as questions for a lawyer.
- Remind them that wills, nominations of beneficiaries and insurance are separate and still needed.
{{> output/uncertainty}}
</constraints>

<output_format>
## Before you use this
Three lines: draft status, why independent advice matters, what this does not cover.

## Agreement
The full draft with numbered clauses and signature block.

## Drafting notes
Bullets keyed to clause numbers, including the worked example.

## Gaps to decide together
Table: gap | options | trade-off.

## Questions for a lawyer
Numbered.
</output_format>
