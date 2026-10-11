---
schema: 1
id: evaluate-venture-debt-offer
kind: prompt
title: Evaluate a venture debt offer
description: Breaks down a venture debt term sheet - interest, fees, warrants, covenants, default triggers - into its all-in cost, its effect on runway and the risks it adds to a startup.
category: fundraising
version: 1.0.0
status: incubating
stage: [review]
role: [founder, executive, financial-analyst]
advice_risk: [legal, financial]
inputs: [document, dataset]
output: [table, explanation, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [venture-debt, warrants, covenants, cost-of-capital, runway]
pairs_with:
  prompts: [evaluate-revenue-based-financing, calculate-cash-runway, choose-funding-instrument]
args:
  - name: offer
    description: The debt term sheet - facility size, draw period, interest-only period, amortisation, interest rate, fees (arrangement, final payment, prepayment), warrants, covenants, security and default clauses.
    type: text
    required: true
  - name: company
    description: Cash, monthly burn, revenue trend, the equity round this would sit alongside, and what the debt is meant to fund.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [The offer in plain words, All-in cost, Cash flow and runway, Warrant dilution, Covenants and default risk, When debt helps and when it hurts, Questions for the lender and your lawyer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders evaluate venture debt. It is usually offered alongside or soon after an equity round to extend runway with less dilution than equity. The headline interest rate understates the cost: arrangement fees, a final payment fee, prepayment penalties and warrants add to it. The bigger risk is control: financial covenants, a material adverse change clause or an investor-abandonment clause can let the lender call the loan exactly when the company is struggling, and amortisation turns the loan into a monthly cash drain after the interest-only period. Debt suits companies with a clear path to the next milestone or to profitability; it is dangerous as a substitute for equity the company cannot raise.
</context>

<task>
Evaluate this offer.

<offer>
{{offer}}
</offer>

<company>
{{company}}
</company>

1. The offer in plain words: facility, draws, interest-only and amortisation periods, every fee, warrants, security.
2. All-in cost: a monthly cash schedule for the full term (draws, interest, principal, fees), the total paid, and an effective annual cost (internal rate of return on the cash flows), excluding and then including an estimate of the warrant value with the assumption labelled. Show the method.
3. Cash flow and runway: runway with and without the debt, and the month amortisation starts, compared with the company's own plan to reach the next round or profitability.
4. Warrant dilution: the shares the warrant converts into at the stated price or round, and the ownership percentage.
5. Covenants and default risk: each covenant and default trigger in plain words, the scenario in the company's plan where it could be breached, and what the lender could then do.
6. When debt helps and when it hurts in this company's situation, as considerations rather than a verdict.
7. Questions for the lender and your lawyer.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only terms in the offer; mark absent terms as not stated (for example "no MAC clause stated - confirm in the loan agreement").
- Show calculations; say clearly when an effective rate is approximate and why.
- Do not compare against "market" rates or name lenders.
- Do not recommend taking or declining the loan.
- Security over company assets and personal guarantees have serious consequences that vary by country; refer to a lawyer.
</constraints>

<output_format>
## The offer in plain words
## All-in cost
Table: Month | Draw | Interest | Principal | Fees | Net cash flow; then totals and effective annual cost.
## Cash flow and runway
## Warrant dilution
## Covenants and default risk
Table: Clause | What it means | When it could bite | Lender's remedy.
## When debt helps and when it hurts
## Questions for the lender and your lawyer
</output_format>
