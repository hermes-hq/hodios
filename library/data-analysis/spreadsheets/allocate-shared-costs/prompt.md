---
schema: 1
id: allocate-shared-costs
kind: prompt
title: Allocate shared costs across departments or products
description: Allocates overheads such as rent, IT and admin across departments, products, sites or clients by sensible drivers in a spreadsheet, with checks that allocations reconcile to the cost pools.
category: spreadsheets
version: 1.0.0
status: incubating
stage: [build]
role: [financial-analyst, business-analyst, operations-manager, founder]
stack: [excel, google-sheets]
inputs: [text, dataset]
output: [table, code, explanation]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [overhead-allocation, cost-drivers, recharges, step-down-method, shared-services]
pairs_with:
  prompts: [analyze-customer-profitability, calculate-programme-full-cost, calculate-product-margin, design-spreadsheet-model]
args:
  - name: cost_pools
    description: The shared costs to allocate, with amounts and period - rent, IT, HR, finance, facilities, management - and any support departments that serve each other.
    type: text
    required: true
  - name: receivers
    description: What the costs go to (departments, products, sites, clients) and the driver data you have for each, such as floor area, headcount, tickets, hours, revenue, transactions.
    type: text
    required: true
  - name: purpose
    description: Why you are allocating - internal recharges, pricing, product or client profitability, a funder's full cost, a management report - and Excel or Google Sheets.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Driver choice, Method, Layout, Allocation formulas, Reconciliation, Results and how to use them, Assumptions to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You allocate shared costs in spreadsheets. An allocation is only as fair as its driver: rent by floor area occupied, IT by users or devices, HR by headcount, finance by transactions or invoices, management time by estimated share; revenue is the driver of last resort, because it loads costs onto whatever sells most rather than whatever uses most. When support departments serve each other (IT supports HR and HR supports IT), the direct method ignores that, the step-down method allocates one support department at a time in a stated order, and the reciprocal method solves the mutual services exactly with simultaneous equations (MMULT and MINVERSE in a spreadsheet). Rounding must leave the total unchanged, so the last receiver or the largest takes the remainder. The most common misuse is dropping a product or client because it shows a loss after allocation, when most allocated fixed costs would stay if it went; decisions need contribution before allocation shown alongside.
</context>

<task>
Build the allocation.

<cost_pools>
{{cost_pools}}
</cost_pools>

<receivers>
{{receivers}}
</receivers>

<purpose>
{{purpose}}
</purpose>

1. Driver choice: for each cost pool, recommend a driver from the data available, one line on why, and a fallback if the data is missing. Point out any pool where the user's preferred driver would distort the result.
2. Method: direct, step-down (with the order: the department serving the most others first) or reciprocal, chosen for the purpose and the support-department structure, with one line on the trade-off.
3. Layout: tabs for Pools (cost by pool), Drivers (driver quantity per receiver per pool), Shares (driver share = quantity / total for that pool), Allocation (pool x share), and Results.
4. Allocation formulas: share `=quantity / SUMIFS(driver total for the pool)` or a column total, allocated amount `=ROUND(pool * share, 2)` with the remainder assigned so totals match; for step-down, the running pools after each step; for reciprocal, the equations and the MMULT/MINVERSE setup.
5. Reconciliation: each pool's allocated total equals the pool; total allocated equals total pools; no receiver with a driver of zero receives cost; shares sum to 100% per pool.
6. Results and how to use them: a table per receiver: direct revenue and costs, contribution before allocation, allocated costs by pool, result after allocation; a note on which allocated costs would go away if the receiver stopped and which would not.
7. Assumptions to confirm: driver data quality, period mismatches, and choices the user should agree with whoever receives the recharge.
</task>

<constraints>
- Every driver and pool is an input on its own tab; no numbers inside formulas.
- Do not present an allocated loss as a reason to cut a product, client or department without showing contribution before allocation.
- If the purpose is a statutory, tax or funder requirement (transfer pricing, grant full cost rules), say the method may be prescribed and must be checked against those rules.
- Use functions available in the user's tool.
- Test with the user's figures for two pools and show that totals reconcile.
</constraints>

<output_format>
## Driver choice
Table: Pool | Driver | Why | Fallback.
## Method
## Layout
## Allocation formulas
Code blocks with cell references.
## Reconciliation
## Results and how to use them
Table: Receiver | Contribution | Allocated | After allocation.
## Assumptions to confirm
</output_format>
