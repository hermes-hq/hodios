---
schema: 1
id: prepare-business-loan-application
kind: prompt
title: Prepare a small-business loan application
description: Prepares a small-business loan application package - document checklist, cash-flow and repayment story, use of funds and likely lender questions - without recommending lenders or products.
category: fundraising
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, individual]
advice_risk: [financial]
inputs: [dataset, document, text]
output: [checklist, docs, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [small-business-loan, debt-financing, cash-flow-forecast, use-of-funds, debt-service-coverage]
pairs_with:
  prompts: [write-business-plan, model-unit-economics, compare-loan-offers, review-small-business-pnl]
  personas: [small-business-advisor]
args:
  - name: business_financials
    description: Recent financials - revenue, profit, owner pay, cash in the bank, existing debts and repayments, for the last two or three years and the year to date, plus how long you have traded. Summaries are fine.
    type: text
    required: true
  - name: loan_purpose_and_amount
    description: How much you want to borrow, what it pays for (with quotes if you have them), the term you have in mind, and how the spending will increase revenue or cut costs.
    type: text
    required: true
  - name: country
    description: Country where the business is registered, to frame which documents and schemes to ask about. Never used to state rules.
    type: string
output_contract:
  format: markdown
  sections: [Scope and limits, Readiness check, Repayment story, Use of funds, Cash-flow and coverage, Document checklist, Lender questions and answers, Weak spots to address, Questions for your accountant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small-business owners prepare a loan application that a lender can say yes to quickly. Lenders ask the same core questions: can the business repay from its cash flow, what happens if things go worse than planned, what the money is for and whether it is the right amount, the owner's track record and commitment, and what security or guarantees exist. Owners often apply with a vague purpose, no cash-flow forecast and no answer to "what if sales drop", and get declined or offered worse terms. You organise the evidence and the story; you do not choose lenders, products or terms, and you do not tell the owner whether to borrow.
</context>

<task>
Prepare the loan application package{{#country}} for a business in {{country}}{{/country}}.

<business_financials>
{{business_financials}}
</business_financials>

<loan_purpose_and_amount>
{{loan_purpose_and_amount}}
</loan_purpose_and_amount>

1. Scope and limits: one short paragraph per the guardrails below.
2. Readiness check: rate readiness (ready, nearly, not yet) against lenders' common criteria - trading history, profitability trend, cash-flow cover for repayments, existing debt, owner's contribution, clarity of purpose, quality of records - with the evidence from the data and what is missing.
3. Repayment story: a short narrative (under 200 words) a lender can read in one minute - what the business does, its track record, what the loan pays for, how that changes cash flow, and how repayments are covered even in a weaker case.
4. Use of funds: a table of every item the loan pays for, with cost, source of the figure (quote, estimate), and the expected effect; check the amount against the items and flag over- or under-borrowing, including a working-capital buffer if the spending takes time to pay back.
5. Cash-flow and coverage: build a simple 12-month cash-flow outline from the data (opening cash, receipts, payments, existing debt service, the new repayment, closing cash). Estimate the annual repayment for the amount and term using a clearly labelled assumed interest rate and show the formula. Compute debt service coverage = cash available for debt service (operating profit plus non-cash costs such as depreciation, minus owner drawings beyond salary if relevant) / total annual debt repayments, and show a downside case with revenue 15-20% lower. Explain plainly what the ratio means; do not claim a lender's specific threshold.
6. Document checklist: what lenders commonly ask for - financial statements and tax returns, management accounts, bank statements, a cash-flow forecast, business plan or summary, quotes or invoices for the purchase, details of existing debts, ID and ownership documents, and information on security or personal guarantees - marked have, need to prepare, or need from accountant.
7. Lender questions and answers: the 10 questions a lender is most likely to ask about this application, with draft answers using the data, and `[ANSWER NEEDED]` where the owner must supply facts.
8. Weak spots to address: issues a lender may raise (falling profit, thin cash, high existing debt, tax arrears, no owner contribution, purpose not linked to revenue) and honest ways to strengthen the case or reasons to wait.
9. Questions for your accountant: specific to this application, including the interest rate assumption, tax effects, and whether the forecast is realistic.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not recommend lenders, loan products, government schemes by name as suitable, or terms to accept, and do not say whether the owner should borrow. Mention that government-backed or community lending schemes exist in many countries and that the owner can ask a lender, an accountant or a local business support service which apply.
- Use only figures given. Never invent revenue, interest rates presented as offered, or lender criteria presented as fact. Any assumed rate is labelled as a planning assumption with a sensitivity to a higher rate.
- Arithmetic must be exact, with formulas shown.
- Personal guarantees and secured lending put personal assets at risk; say so plainly and recommend independent advice before signing any guarantee.
- If the downside case cannot cover repayments, say so clearly and suggest options (smaller loan, longer term, staged spending, more owner contribution) rather than presenting the application as strong.
</constraints>

<output_format>
## Scope and limits
## Readiness check
Table: Criterion | Evidence | Rating | Gap.
## Repayment story
## Use of funds
Table: Item | Cost | Source | Expected effect. Then the amount check.
## Cash-flow and coverage
12-month outline table, the repayment formula, coverage in base and downside cases.
## Document checklist
Table: Document | Status | Note.
## Lender questions and answers
## Weak spots to address
## Questions for your accountant
</output_format>
