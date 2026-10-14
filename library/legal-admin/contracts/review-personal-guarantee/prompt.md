---
schema: 1
id: review-personal-guarantee
kind: prompt
title: Review a personal guarantee for a business debt
description: Reviews a personal guarantee a business owner is asked to sign for a lease, loan or supplier credit, covering scope, caps, duration, release, joint liability and alternatives to offer.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, individual]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, questions]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [personal-guarantee, director-guarantee, limited-liability, all-monies, joint-and-several, business-debt]
pairs_with:
  prompts: [review-commercial-lease, review-supplier-terms, explain-contract-clause]
args:
  - name: guarantee
    description: The guarantee document and the clause in the main agreement that requires it, with clause numbers. Remove ID numbers and home addresses.
    type: text
    required: true
  - name: situation
    description: What the business is getting (lease, loan, trade credit), the amount, your role and ownership, other guarantors, and your personal assets at risk in general terms (home, savings, spouse's interest).
    type: text
    required: true
  - name: country
    description: Country and region and the governing law named. Rules on guarantees, spouses' consent and homes vary.
    type: string
output_contract:
  format: markdown
  sections: [In brief, What you would owe, Clause check, How you get out of it, Alternatives and limits to propose, Before you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A limited company or LLC protects its owners' personal assets until the owner signs a personal guarantee, which puts that protection back on the table for one creditor. Landlords, lenders and suppliers ask for them routinely, and owners often sign them as a formality. What lawyers advising guarantors check: the scope (only this lease or loan, or "all monies" the business ever owes this creditor, now or in future); whether there is a cap on the amount and whether interest, costs and enforcement fees come on top; duration and whether it survives renewals, extensions, assignments and changes to the main contract made without the guarantor's consent; "principal debtor" or "on demand" wording that lets the creditor pursue the guarantor before the business; joint and several liability when several owners guarantee, so one can be pursued for everything; waivers of defences; whether the guarantee is secured on the home; continuing liability after the guarantor sells their shares or leaves; and how the guarantee is released. Many creditors accept alternatives if asked early: a cap, a time limit, a rent deposit or bank guarantee, release after a period of on-time payment, or a guarantee limited to the first part of a lease.
{{#country}}

Country and law: {{country}}
{{/country}}

<situation>
{{situation}}
</situation>
</context>

<task>
<guarantee>
{{guarantee}}
</guarantee>

1. In brief: what the guarantor would be personally liable for, the realistic maximum exposure, and the three most important issues.
2. What you would owe: the debts covered, any cap, what is added on top, and a worst-case example from the stated amounts with arithmetic. Say plainly if there is no cap.
3. Clause check, quoting each clause: scope and covered obligations, cap, interest and costs, duration and termination, effect of changes to the main contract, demand and principal debtor wording, joint and several liability, waivers of defences, security over property, continuing liability after leaving the business, release, assignment by the creditor, governing law.
4. How you get out of it: every route to release in the text, and what is not a release (selling shares, resigning as director, the business closing).
5. Alternatives and limits to propose: ranked, each with why a creditor might accept it.
6. Before you sign: what to gather, whether the guarantor's spouse or partner should get independent advice where a shared home is involved, and the questions for a lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Never invent caps or amounts.
- Do not say whether the guarantee is enforceable or how a court would treat it.
- Do not tell the user to sign or refuse; set out the exposure and options.
- Always recommend independent legal advice before signing a personal guarantee, and separately for anyone whose home is put at risk.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## What you would owe
Short bullets and a worst-case example.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## How you get out of it
Bullets.

## Alternatives and limits to propose
Numbered: proposal - why the creditor might accept.

## Before you sign
Checklist and questions for a lawyer.
</output_format>
