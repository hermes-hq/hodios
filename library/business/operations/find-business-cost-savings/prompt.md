---
schema: 1
id: find-business-cost-savings
kind: prompt
title: Find small-business cost savings
description: Reviews a small business's costs line by line to find savings - renegotiation, consolidation, waste, energy and software - ranked by annual impact and effort, with what to protect.
category: operations
version: 1.0.0
status: incubating
stage: [review]
role: [founder, operations-manager, manager]
inputs: [dataset, text]
output: [table, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [cost-reduction, renegotiation, overheads, software-spend, energy-costs, supplier-review]
pairs_with:
  prompts: [prepare-supplier-negotiation, compare-vendors, plan-inventory]
  personas: [small-business-advisor]
args:
  - name: cost_list
    description: Your costs for the last 12 months or a recent typical month - each line with supplier or category, amount, frequency and, if you know, contract end date and what it is for. An export from your accounts or bank is ideal.
    type: text
    required: true
  - name: business_type
    description: The kind of business and its size (for example "two-site coffee shop, 9 staff, 480k revenue").
    type: string
output_contract:
  format: markdown
  sections: [Cost picture, Line-by-line review, Savings ranked, Protect list, 30-day action plan, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review small-business costs the way a careful finance manager does: line by line, looking for money that leaves without buying anything the customer or the business needs. Savings usually hide in the same places - subscriptions nobody uses, contracts that auto-renewed at a higher rate, duplicate tools, unbilled or overpaid fees, waste in stock and energy, and suppliers who were never asked for a better price. You also know which costs to protect: cutting the things customers notice, staff rely on or that keep the business safe and compliant costs more than it saves.
</context>

<task>
Find savings in these costs{{#business_type}} for a {{business_type}}{{/business_type}}.

<cost_list>
{{cost_list}}
</cost_list>

1. Cost picture: annualise every line (monthly x 12, weekly x 52, and so on) and group into categories such as premises, people, cost of goods, utilities and energy, software and subscriptions, finance and banking fees, insurance, professional services, marketing, equipment and maintenance, and other. Show each category's annual total and share of total costs. State the conversions you made.
2. Line-by-line review: for each line, decide one action and say why:
   - Keep: essential and fairly priced as far as the data shows.
   - Renegotiate: a supplier or contract worth asking for a better rate, term or bundle; say what to ask for and when (before the renewal date if given).
   - Consolidate: overlapping tools or suppliers that can be merged.
   - Cut: unused, duplicated or low-value spend.
   - Reduce: usage-based costs with waste (energy, stock waste, card fees, delivery).
   - Investigate: not enough information; say what to find out.
3. Savings ranked: for every non-keep action, estimate the annual saving as a range with the reasoning (for example "10-20% on a renewal, if the market has cheaper options - check by getting two quotes"), the one-off cost or switching effort, and the risk. Rank by annual saving relative to effort.
4. Protect list: the lines you recommend not cutting even though they are large, and why (customer experience, safety, legal or compliance duties, staff retention, the ability to sell).
5. 30-day action plan: the first ten actions in order, with owner, deadline and the evidence of completion (a cancelled subscription, a new quote, a signed renewal).
6. Questions: missing information that would change the biggest recommendations.
</task>

<constraints>
- Use only the costs given. Never invent supplier prices, market rates or "typical" savings percentages presented as facts. Savings estimates are ranges with stated reasoning, and the way to confirm them is getting quotes or reading the contract.
- Show the annualisation sums so the owner can check them.
- Watch for notice periods, early-exit fees and auto-renewal dates before recommending a switch; if unknown, add "check contract terms" to the action.
- Cutting staff hours or pay is a people decision with legal and morale effects. If labour is the largest cost, show it in the picture but recommend efficiency questions rather than cuts, and suggest professional HR or legal advice before any change to contracts.
- Do not recommend cancelling insurance, safety, compliance or tax-related services; at most suggest a review of cover or price with the provider or a broker.
</constraints>

<output_format>
## Cost picture
Table: Category | Annual cost | % of total.
## Line-by-line review
Table: Line | Annual cost | Action | Why.
## Savings ranked
Table: Rank | Action | Annual saving (range) | Effort or one-off cost | Risk | Deadline.
Then the total range of savings.
## Protect list
## 30-day action plan
Numbered: action, owner, deadline, evidence of completion.
## Questions
</output_format>
