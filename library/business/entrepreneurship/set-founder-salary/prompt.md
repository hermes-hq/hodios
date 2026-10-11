---
schema: 1
id: set-founder-salary
kind: prompt
title: Set your pay as a founder or owner
description: Works out how much a founder or small business owner can pay themselves from cash flow, runway and personal needs, with tax questions to check and a rule for when to review it.
category: entrepreneurship
version: 1.0.0
status: incubating
stage: [plan]
role: [founder]
advice_risk: [financial]
requires: [none]
inputs: [text, dataset]
output: [plan, table, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [owner-pay, founder-salary, drawings, cash-reserve, tax-set-aside]
pairs_with:
  prompts: [record-owner-drawings-and-capital, forecast-cash-flow, build-small-business-budget, decide-when-to-go-full-time]
  personas: [small-business-advisor]
args:
  - name: business_finances
    description: Monthly revenue and costs for recent months, cash in the bank, money owed to and by the business, upcoming big costs, loans, and whether you have outside investors.
    type: text
    required: true
  - name: personal_needs
    description: Your monthly living costs, other household income, and the minimum you need to take.
    type: text
    required: true
  - name: structure
    description: Country and business structure (sole trader, partnership, limited company or LLC), and whether there are cofounders. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions, Cash the business can spare, Pay options, Recommendation, Tax and structure questions, Review rule]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help founders and owners decide what to pay themselves. Two opposite mistakes are common: paying nothing for so long that the founder burns out or takes on personal debt, and drawing whatever is in the bank without leaving money for tax, slow months and planned spending. A sound owner's pay comes after a cash reserve, a tax set-aside and committed costs, is set as a fixed monthly amount rather than ad hoc withdrawals, and rises by a rule tied to results. How the founder is paid (salary, drawings, dividends, a mix) depends on country and structure and has tax consequences, so it belongs with an accountant. With outside investors, founder salaries are usually set modestly and agreed with the board.

<business_finances>
{{business_finances}}
</business_finances>

<personal_needs>
{{personal_needs}}
</personal_needs>
{{#structure}}
<structure>
{{structure}}
</structure>
{{/structure}}
</context>

<task>
1. State assumptions: currency, whether figures include sales tax, which months are typical, and any seasonality.
2. Cash the business can spare: from average monthly profit, subtract a tax set-aside (as a placeholder percentage the founder must confirm with an accountant), loan repayments, and contributions to a cash reserve until it reaches a target of a stated number of months of fixed costs. Show the sums and what remains for owner's pay.
3. Pay options: a floor (the minimum personal need), a sustainable level (what the business can spare on average), and a stretch level (only if a condition is met). For each, show months of cash left in a bad month or a slow quarter.
4. Recommendation: the monthly amount to set now, paid on a fixed day, and how to handle a shortfall (pay the floor, defer, or cut costs first).
5. Tax and structure questions to raise with an accountant: the best mix of salary, drawings or dividends for the structure, personal tax and social contributions, pension contributions, and whether payments to cofounders should match.
6. Review rule: when and how pay changes, for example quarterly, rising when the reserve is full and profit has stayed above a level for a set number of months.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use the founder's figures only; mark any assumption. Do not state tax rates or rules as facts for their country.
- Do not recommend taking pay that would leave the business unable to pay taxes, staff, suppliers or loan repayments; show the effect instead.
- If personal needs exceed what the business can sustain, say so plainly and list options (lower costs, keep other income, raise prices, external funding) rather than hiding the gap.
- With investors or cofounders, note that pay should be agreed transparently with them.
</constraints>

<output_format>
## Assumptions
## Cash the business can spare
The sum, line by line.
## Pay options
Table: Option | Monthly pay | Cash left after a bad month | Condition.
## Recommendation
## Tax and structure questions
## Review rule
</output_format>
