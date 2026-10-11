---
schema: 1
id: review-business-loan-agreement
kind: prompt
title: Review a small-business loan agreement
description: Reviews a small-business loan or credit facility agreement for true cost, covenants, security, guarantees, default triggers, prepayment and reporting duties before signing.
category: contracts
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, financial-analyst]
subject: [law]
requires: [none]
inputs: [document]
output: [report, table, checklist]
risk: read-only
advice_risk: [legal, financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [business-loan, credit-facility, loan-covenants, security-interest, event-of-default, prepayment]
pairs_with:
  prompts: [prepare-business-loan-application, compare-loan-offers, record-business-loan, explain-contract-clause]
args:
  - name: agreement
    description: The facility letter or loan agreement, term sheet, security documents and fee schedule, with clause numbers. Remove account numbers.
    type: text
    required: true
  - name: business
    description: What the loan is for, amount and term, your revenue and cash position in rough terms, other debts, and what you can realistically report on.
    type: text
    required: true
  - name: country
    description: Country and region, the lender type (bank, online lender, government-backed scheme) and the governing law named.
    type: string
output_contract:
  format: markdown
  sections: [In brief, True cost, Clause check, Covenants and reporting calendar, Questions for the lender, Get advice if]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Small-business owners compare loans on the headline rate and then sign a document whose real risk lives in the covenants and default clauses. What experienced finance directors read for: total cost including arrangement, commitment, non-utilisation, monitoring and exit fees, and whether the rate is fixed or floating over a reference rate; financial covenants (minimum cash, debt service cover, leverage, net worth) and how they are tested, since a breach is a default even when every payment is on time; information covenants (management accounts, annual accounts within a deadline, notice of litigation) that busy owners miss; negative covenants restricting further borrowing, dividends, asset sales or changes of ownership; security over all assets (often called a debenture or general security agreement) and personal guarantees, sometimes "all monies" so they cover other debts too; events of default including cross-default on other debts, "material adverse change" and late reporting; on-demand clauses that let the lender call an overdraft at any time; prepayment and break costs; and set-off rights over the business's accounts. Business borrowers typically have fewer statutory protections than consumers.
{{#country}}

Country, lender and law: {{country}}
{{/country}}

<business>
{{business}}
</business>
</context>

<task>
<agreement>
{{agreement}}
</agreement>

1. In brief: what the business is borrowing, what it puts at risk (assets, guarantees), and the three most important issues.
2. True cost: list every rate and fee in the text, total the cost over the term where the text allows, and show the arithmetic; flag floating rates and fees that cannot be calculated.
3. Clause check, quoting each clause: amount, purpose and drawdown, interest and rate changes, fees, repayment profile, prepayment and break costs, on-demand rights, security, guarantees and their scope, financial covenants, information covenants, negative covenants, events of default and cure periods, cross-default and material adverse change, set-off, costs and indemnities, assignment, governing law.
4. Covenants and reporting calendar: each covenant and reporting duty with how and when it is tested, what the business must deliver and by when, and whether the stated finances look tight against it.
5. Questions for the lender: ranked, each with the change to request (longer reporting deadlines, covenant headroom, cure periods, a cap or time limit on any guarantee, removal of material adverse change, lower break costs).
6. Get advice if: when to involve a lawyer or accountant before signing.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Quote clause numbers; write "not stated" where a topic is missing. Never invent rates, fees or covenant levels.
- Do not say whether the loan is affordable or whether to take it; show the obligations against the stated finances and leave the decision to the owner.
- Do not predict how a lender would act on a default or whether a clause is enforceable.
- Treat any personal guarantee or security over a home as a reason to recommend independent legal advice.
{{> output/uncertainty}}
</constraints>

<output_format>
## In brief
Three to five bullets.

## True cost
Table: item | rate or amount | note; then the total with arithmetic.

## Clause check
Table: topic | clause and short quote | rating (fine / check / negotiate) | why.

## Covenants and reporting calendar
Table: obligation | test or deadline | what to deliver | headroom note.

## Questions for the lender
Numbered: question - clause - change to request.

## Get advice if
Bullets.
</output_format>
