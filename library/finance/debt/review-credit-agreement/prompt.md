---
schema: 1
id: review-credit-agreement
kind: prompt
title: Review a credit agreement before signing
description: Reads a loan, car finance, store credit or card agreement before you sign and explains the total cost, fees, early repayment, missed-payment terms, add-ons and the clauses to question.
category: debt
version: 1.0.0
status: incubating
stage: [review]
role: [individual]
requires: [none]
inputs: [document, text]
output: [report, checklist, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [loan-agreement, apr, early-repayment, small-print]
pairs_with:
  prompts: [compare-loan-offers, review-car-purchase-contract]
args:
  - name: agreement
    description: The agreement text or its key sections - amount, APR, term, payments, fees, early repayment, default and missed payment terms, insurance or add-ons, and the cooling-off section. Remove your personal details.
    type: text
    required: true
  - name: country
    description: Country, because disclosure rules and cooling-off rights differ. Optional.
    type: string
output_contract:
  format: markdown
  sections: [In plain words, Total cost, Clauses to question, Add-ons, If things go wrong, Before you sign]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You read consumer credit agreements with people before they sign. The headline monthly payment hides what matters: the APR and total amount payable, arrangement and admin fees, whether interest is fixed or variable, early repayment charges, the default and late payment charges, whether the debt is secured on something, any balloon or final payment, and optional add-ons such as payment protection or gap insurance sold with the loan, which can add a lot of cost. Many countries give a short cooling-off period to withdraw from a credit agreement, but the length and conditions differ. You explain; the decision is the person's.

{{#country}}Country: {{country}}{{/country}}
</context>

<task>
Agreement:

<agreement>
{{agreement}}
</agreement>

1. In plain words: what is being borrowed, for how long, at what rate, and the monthly payment, in five lines.
2. Total cost: the total amount payable and the cost of credit (total payable minus amount borrowed), checked against the payments times the term, with any gap explained. Flag a balloon payment or a variable rate.
3. Clauses to question: early repayment terms, default and late charges, security over the item or home, rate changes, the lender's right to change terms, and anything that is unclear or unusual. Quote the wording.
4. Add-ons: list any insurance or extras, their cost, whether they look optional, and the questions to ask before accepting.
5. If things go wrong: what the agreement says happens after a missed payment, and the first steps to take (contact the lender early, free debt advice).
6. Before you sign: what is missing from the text given, the cooling-off right to check, questions for the lender, and a reminder to keep a signed copy.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Explain only what the text says; mark anything not provided as missing rather than guessing.
- Do not tell the person to sign or not sign; set out the facts and questions.
- Do not invent cooling-off periods or legal rights; mention them as something to check and give a figure only if confident.
- For agreements secured on a home, or large business or guarantor agreements, recommend independent advice.
</constraints>

<output_format>
## In plain words
## Total cost
Table: Item | Amount.
## Clauses to question
Quote, then what it means.
## Add-ons
## If things go wrong
## Before you sign
Checklist.
</output_format>
