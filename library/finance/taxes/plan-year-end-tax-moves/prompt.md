---
schema: 1
id: plan-year-end-tax-moves
kind: prompt
title: Plan year-end tax moves
description: Builds a checklist of tax moves to consider before your tax year ends - contributions, allowances, gains and losses, donations and income timing - with deadlines to verify.
category: taxes
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent, founder]
requires: [none]
inputs: [text]
output: [checklist, table, questions]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [tax-year-end, allowances, pension-contributions, tax-planning]
pairs_with:
  prompts: [plan-estimated-tax-payments, explain-marginal-tax-rates, explain-tax-on-investments]
  personas: [tax-educator]
args:
  - name: situation
    description: Income sources and rough amounts this year, accounts you hold (pension, retirement, tax-free savings, health or education accounts) and what you have paid in, gains or losses realised, donations, life events, and for self-employed people expected profit and planned purchases.
    type: text
    required: true
  - name: country
    description: Country where you are tax resident.
    type: string
    required: true
  - name: year_end
    description: "Optional: the date your tax year ends, if you know it (it is not 31 December everywhere)."
    type: string
output_contract:
  format: markdown
  sections: [Key dates, Moves to consider, Moves that do not apply, Deadlines checklist, Questions for an adviser]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone review their tax position before the tax year closes, while there is still time to act. Many reliefs are "use it or lose it": annual allowances for tax-free savings or investment accounts, pension or retirement contribution limits, annual capital gains exemptions, gift allowances, and health or flexible spending account deadlines. Other moves depend on timing: realising gains or losses in one year or the next, making donations before year end, for self-employed people timing invoices, expenses or equipment purchases, and topping up payments to avoid underpayment penalties. Experts check the real deadline for each move, because tax years end on different dates in different countries and some contributions can be made after year end and still count. They also weigh each move against cash needs and the person's longer-term plans; a tax saving is not worth locking away money needed soon.

Country: {{country}}
{{#year_end}}Tax year ends: {{year_end}}{{/year_end}}
</context>

<task>
Situation:

<situation>
{{situation}}
</situation>

1. Key dates: when the tax year ends in {{country}} and the related deadlines (contribution deadlines that may run past year end, filing and payment dates), marked "verify".
2. Moves to consider: for each relevant area, the move, why it may help this person, rough effect in money if figures allow (with a labelled assumed rate), the trade-off (cash tied up, risk, admin), and the deadline. Areas: retirement or pension contributions and any employer match not yet captured; tax-free savings or investment allowances; capital gains and losses and annual exemptions; charitable gifts; health, childcare or education accounts; income and expense timing for the self-employed; estimated or advance payments to avoid penalties; allowances shared with a spouse where allowed.
3. Moves that do not apply: briefly, common moves that do not fit this situation and why, so the person does not chase them.
4. A deadlines checklist in date order.
5. Questions for an adviser, especially where moves interact (for example a large pension contribution and a benefit threshold).
</task>

<constraints>
{{> guardrails/professional-limits}}
- Present moves to consider, not instructions. Do not recommend specific products, funds or providers.
- Never invent allowances, limits, rates or deadlines; label figures with the tax year and "verify", or use placeholders.
- Do not suggest moves that only make sense to cut tax if they harm the person's finances (spending money just for a deduction, locking away an emergency fund).
- Do not suggest artificial arrangements or anything that conceals income.
{{> output/uncertainty}}
</constraints>

<output_format>
## Key dates
Bullets marked "verify".

## Moves to consider
Table: move | why it may help | rough effect | trade-off | deadline.

## Moves that do not apply
Short bullets.

## Deadlines checklist
Checklist in date order.

## Questions for an adviser
Up to six questions.
</output_format>
