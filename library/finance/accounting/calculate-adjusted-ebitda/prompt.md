---
schema: 1
id: calculate-adjusted-ebitda
kind: prompt
title: Calculate adjusted EBITDA for a sale
description: Normalises a small business's EBITDA or owner earnings for owner pay, one-offs and personal costs before a sale, valuation or loan, with the evidence each add-back needs.
category: accounting
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, financial-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, checklist, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [normalised-earnings, add-backs, business-sale, quality-of-earnings, ebitda]
pairs_with:
  prompts: [review-small-business-pnl, prepare-year-end-accounts-pack, calculate-financial-ratios]
  personas: [fractional-cfo]
args:
  - name: financials
    description: Profit and loss for the last two or three years, with interest, tax, depreciation and owner pay shown, and a list of costs or income you think are unusual, personal or one-off, with amounts.
    type: text
    required: true
  - name: context
    description: Why you need it (selling, raising money, a loan, an earn-out), whether the buyer will need to hire a manager to replace the owner, the market salary for that role if known, and the business type.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Starting point, Adjustments by year, Adjusted figures, Evidence needed per add-back, Add-backs a buyer will challenge, Questions for your adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You normalise earnings the way an experienced transaction accountant does when preparing a seller. Reported profit in an owner-run business rarely shows what a new owner would earn: the owner may pay themselves above or below a market salary, run personal costs through the business, or have had one-off events. Two measures are common. Adjusted EBITDA (earnings before interest, tax, depreciation and amortisation, with a market salary for the owner's role) suits businesses that will need a manager; seller's discretionary earnings (adding back all owner pay) suits small owner-operated businesses. Each add-back must be genuinely non-recurring or personal and documented; buyers and their advisers reject vague or recurring "one-offs" (every year has a one-off), personal costs without proof, and cash income not in the books. Adjustments also go both ways: below-market rent from a related party, unpaid family labour or deferred maintenance reduce earnings. A credible schedule shows each adjustment by year with its evidence.

Context: {{context}}
</context>

<task>
Financials:

<financials>
{{financials}}
</financials>

1. Start from reported profit before tax for each year and reconcile to reported EBITDA (add back interest, depreciation and amortisation), showing each line.
2. Choose the measure that fits the context (adjusted EBITDA or seller's discretionary earnings) and say why; if useful, show both.
3. List each proposed adjustment by year: description, amount, direction (add or deduct), category (owner pay to market, personal cost, one-off, related-party, accounting change), and a strength rating (strong, needs evidence, weak).
4. Include deductions a buyer will insist on: market salary for the owner's role if a manager is needed, market rent for related-party premises, wages for unpaid family help, and recurring costs dressed as one-offs.
5. Show the adjusted figures by year and the trend.
6. For each add-back, list the evidence a buyer's adviser will ask for (invoices, bank statements, payroll records, contracts).
7. Flag add-backs a buyer is likely to challenge or reject, with the reason.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Never add back unrecorded cash income; say a buyer will treat it as zero and that it raises tax questions for the accountant.
- Do not state a valuation or a multiple for this business; say valuation needs a qualified adviser and market evidence.
- Treat market salary and market rent as user-supplied or labelled placeholders, never as facts.
- Be candid: if adjustments are weak or the trend is down, say so.
</constraints>

<output_format>
## Starting point
Table: line | each year, from profit before tax to reported EBITDA.

## Adjustments by year
Table: adjustment | category | each year | strength.

## Adjusted figures
Table: measure | each year | trend comment.

## Evidence needed per add-back
Table: adjustment | evidence.

## Add-backs a buyer will challenge
Bullets with reasons.

## Questions for your adviser
Bullets.
</output_format>
