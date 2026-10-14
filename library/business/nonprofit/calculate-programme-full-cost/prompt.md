---
schema: 1
id: calculate-programme-full-cost
kind: prompt
title: Calculate a programme's full cost
description: Works out the full cost of a nonprofit programme, sharing core and overhead costs fairly across activities, so the organisation can price contracts and bids and see which services it subsidises.
category: nonprofit
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, operations-manager, financial-analyst]
requires: [none]
inputs: [dataset, text]
output: [table, report]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
subject: [nonprofit]
tags: [full-cost-recovery, cost-allocation, overheads, contract-pricing, unit-cost]
pairs_with:
  prompts: [write-grant-budget-narrative, plan-for-funding-loss, explain-restricted-funds]
  personas: [nonprofit-advisor]
args:
  - name: costs
    description: The organisation's annual budget or accounts by line (salaries with roles and time split, rent, IT, insurance, finance, management, governance, fundraising, depreciation), and the programmes or services it runs.
    type: text
    required: true
  - name: activity
    description: What each programme delivers in a year (people helped, sessions, hours, beds) and current funding for each, including any overhead rate a funder allows. Optional but needed for unit costs.
    type: text
output_contract:
  format: markdown
  sections: [Direct costs by programme, Shared costs and how they are split, Full cost by programme, Unit costs, What this shows, Assumptions and checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a nonprofit understand what its work really costs. Many organisations price bids and grant requests on direct costs only (the project worker and materials) and quietly fund the rest - managers, rent, finance, IT, insurance, governance, the share of reserves needed - from unrestricted income, until reserves run out. Full cost recovery means each programme carries a fair share of these shared costs, using allocation bases that reflect how the costs are actually driven (staff time or headcount for management and HR, floor space for premises, transactions or budget for finance). The aim is not a precise number but a defensible one the board and funders can follow, and an honest view of which services make a loss.

Costs: {{costs}}
{{#activity}}Activity and funding: {{activity}}{{/activity}}
</context>

<task>
1. Direct costs by programme: assign each cost that belongs wholly to one programme, splitting staff by stated time where given.
2. Shared costs: group the rest into pools (premises, management and support, finance and IT, governance, fundraising costs where funders accept them), choose an allocation basis for each with one line on why, and show the split.
3. Full cost by programme: direct plus allocated shared costs, and the overhead percentage that results, compared with any rate funders allow.
4. Unit costs: cost per person helped, per session or per hour, if activity data is given.
5. What this shows: which programmes are under-funded and by how much, the gap between funded and full cost across the organisation, and options (renegotiate, price future bids at full cost, accept a planned subsidy from unrestricted income, change the model).
6. Assumptions and checks: every assumption, how sensitive the result is to the main ones, and what to verify with the finance lead or accountant.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only figures provided. Show every calculation in tables; mark missing figures [needed] and do not fill them with guesses.
- Allocation is a management judgement; present it as such, and say which costs a specific funder may or may not accept depends on its rules.
- Accounting presentation in statutory accounts follows the local framework and may differ from this management analysis; say so.
- Do not suggest charging the same shared cost to two funders.
</constraints>

<output_format>
## Direct costs by programme
Table.
## Shared costs and how they are split
Table: Cost pool | Amount | Basis | Split by programme.
## Full cost by programme
Table: Programme | Direct | Shared | Full cost | Funded | Gap | Overhead %.
## Unit costs
## What this shows
## Assumptions and checks
</output_format>
