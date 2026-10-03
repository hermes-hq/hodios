---
schema: 1
id: calculate-cash-runway
kind: prompt
title: Calculate cash runway
description: Calculates cash runway and gross and net burn from a cash balance and monthly flows, with a month-by-month projection, downside and upside scenarios, decision dates and levers to extend it.
category: accounting
version: 1.0.1
status: incubating
stage: [plan, operate]
role: [founder, executive, financial-analyst]
requires: [none]
inputs: [text, dataset]
output: [table, report, plan]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [runway, burn-rate, startup-finance, scenario-analysis]
pairs_with:
  prompts: [forecast-cash-flow, build-three-year-projections, calculate-true-cost-of-hire]
  personas: [fractional-cfo]
args:
  - name: cash_balance
    description: Cash available today across operating accounts, with any part that is restricted, pledged or held for customers or tax noted separately, and the date.
    type: text
    required: true
  - name: monthly_costs
    description: Monthly outgoings by line (payroll with employer costs, rent, software, contractors, marketing, loan repayments) plus known changes ahead such as hires, annual bills or tax payments.
    type: text
    required: true
  - name: monthly_revenue
    description: Cash actually received per month and the expected trend, contracted revenue, and how long customers take to pay. Optional; without it, runway is calculated on gross burn.
    type: text
output_contract:
  format: markdown
  sections: [Headline, Burn, Month-by-month projection, Scenarios, Decision dates, Levers, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Asks for a real cash balance and cost lines before calculating; cash balance takes long text."}
---
<context>
You calculate how long a business can run on the cash it has, the way a careful CFO would present it to a founder or board. The quick formula (cash divided by net burn) misleads whenever burn is changing: a hire next month, an annual software bill, a tax payment, revenue that is growing or a big customer who pays late. So the answer is a month-by-month projection, a zero-cash month and, more usefully, the earlier dates by which decisions must be made, because raising money or cutting costs takes months to take effect.

Cash: {{cash_balance}}
</context>

<task>
Monthly costs:

<monthly_costs>
{{monthly_costs}}
</monthly_costs>

{{#monthly_revenue}}Revenue and collections:

<monthly_revenue>
{{monthly_revenue}}
</monthly_revenue>{{/monthly_revenue}}

1. Check the inputs first. If the cash balance or the costs are too vague to calculate with (no amount, or one undivided guess with no idea what it covers), ask for the cash balance and date, costs by line and cash received, show the calculation you will run, and stop there. Then work out usable cash: the balance minus anything restricted, held for customers, owed in sales tax or VAT already collected, or a minimum buffer (default: one month of payroll, stated).
2. Calculate gross burn (all cash out) and net burn (cash out minus cash in) for the current month, and the simple runway as a first approximation.
3. Project month by month for up to 24 months or until cash runs out: opening cash, cash in, cash out by major line, closing cash. Apply the known changes in the months they happen and revenue on a cash-received basis.
4. Run three scenarios with stated assumptions: base; downside (for example revenue 25 percent lower, collections a month slower, one planned cost arriving early); upside. Give the zero-cash month for each.
5. Set decision dates working back from the downside zero-cash month: when to start raising money (often six to nine months before), when cuts would need to start to matter, and the last date to act.
6. List the levers that extend runway, ranked by months gained and how fast they take effect, with the calculation for the top three.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; label anything you assume and keep assumptions in their own table.
- Make sure each month's closing cash equals the next month's opening cash and that totals add up.
- State the runway in months and as a calendar month, and say clearly which scenario each figure belongs to.
- If runway in the downside case is under six months, say so first and plainly, and put the fastest levers at the top.
- Do not recommend a specific lender, investor or financing product; describe the options in general terms.
{{> output/uncertainty}}
</constraints>

<output_format>
## Headline
Two lines: runway in the base and downside cases (months and calendar month), and the first decision date.

## Burn
Table: measure | amount | working.

## Month-by-month projection
Table: month | opening cash | cash in | cash out | closing cash, for the base case.

## Scenarios
Table: scenario | assumptions | zero-cash month | runway in months.

## Decision dates
Table: decision | latest date | why.

## Levers
Table: lever | months gained | time to take effect | trade-off.

## Assumptions
Table: assumption | value | source.
</output_format>
