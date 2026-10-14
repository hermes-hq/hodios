---
schema: 1
id: write-reserves-policy
kind: prompt
title: Write a reserves policy
description: Drafts a nonprofit reserves policy with a target range worked out from the organisation's own risks, the current position, what reserves may be used for and a plan to build or release them.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan, build]
role: [executive, operations-manager]
requires: [none]
inputs: [text, dataset]
output: [docs, table]
risk: read-only
advice_risk: [financial]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [reserves, financial-resilience, governance, trustees, risk-based-planning]
pairs_with:
  prompts: [explain-restricted-funds, plan-for-funding-loss]
  personas: [nonprofit-advisor]
args:
  - name: finances
    description: Annual income and spending, the income mix and how secure each source is, unrestricted free reserves (excluding restricted funds, designated funds and fixed assets), commitments such as leases and staff notice periods, and any planned investments.
    type: text
    required: true
  - name: risks
    description: The main financial risks, for example losing a contract, late grant payments, a building repair, redundancy costs if a service closed, or seasonal income.
    type: text
    required: true
  - name: country
    description: Country and legal form, for example "charity in England and Wales" or "US 501(c)(3)". Optional.
    type: string
output_contract:
  format: markdown
  sections: [Current position, Risk-based target, Draft policy, Plan to reach the target, Questions for your accountant or auditor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit board and finance lead write a reserves policy. Weak policies pick a round number ("three months of running costs") with no reasoning, count money the organisation cannot freely spend, and never say when reserves may be used. Experienced treasurers do it differently: they define free reserves correctly (unrestricted funds less fixed assets used for the work and less designated funds), build the target from specific risks the organisation faces (how much it would cost to survive the loss of the biggest contract for six months, or to close a service responsibly, or to cover a cash-flow gap from grants paid in arrears), and state a range rather than a single figure. Holding far more than the risks justify is also a problem: donors, funders and regulators may ask why money is not being spent on the purpose.

Finances: {{finances}}
Risks: {{risks}}
{{#country}}Country and legal form: {{country}}{{/country}}
</context>

<task>
1. Current position: calculate free reserves from the figures given, showing the working, and express them in months of unrestricted spending. If the figures mix restricted, designated or fixed-asset funds into "reserves", separate them and say so.
2. Risk-based target: for each risk, estimate the amount needed with the assumption stated (for example "three months of salary and lease costs for a service, plus notice and redundancy, if the contract ended"), weight by likelihood where reasonable, and sum to a target range with a minimum and a maximum.
3. Draft policy: purpose of reserves; definition of free reserves; the target range and how it was worked out; what reserves may be used for and who can authorise it; what happens if reserves fall below the minimum (a plan to rebuild) or rise above the maximum (a plan to invest in the purpose); how often the policy is reviewed; and how it is reported in the annual accounts.
4. Plan to reach the target: if below the range, realistic ways to build reserves over two to four years (a surplus target in the budget, full cost recovery on contracts, unrestricted fundraising); if above, options to designate funds for specific purposes or invest in services, with the board decision needed.
5. List questions for the accountant or auditor.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given. Show calculations. Mark missing figures [needed] instead of assuming them.
- Do not recommend specific investment products or banks for holding reserves.
- Reporting rules for reserves differ by country and accounting framework; name the assumption and say to check the regulator's guidance and with the auditor or independent examiner.
- Never suggest using restricted funds to meet the reserves target.
</constraints>

<output_format>
## Current position
Working in a short table: Item | Amount.
## Risk-based target
Table: Risk | Assumption | Amount | Likelihood | Weighted amount. Then the target range.
## Draft policy
Numbered clauses ready for the board to edit.
## Plan to reach the target
## Questions for your accountant or auditor
</output_format>
