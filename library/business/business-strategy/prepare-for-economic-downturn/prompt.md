---
schema: 1
id: prepare-for-economic-downturn
kind: prompt
title: Prepare the business for a downturn
description: Prepares a business for a recession or sector downturn - exposure check, early-warning triggers, tiered cost and cash levers, and opportunities to take while rivals retreat.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, operations-manager]
advice_risk: [financial]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [recession-planning, downturn-playbook, cash-resilience, early-warning-triggers, cost-levers]
pairs_with:
  prompts: [run-scenario-planning, forecast-cash-flow, assess-strategic-risks, business-turnaround-track]
args:
  - name: business
    description: What you sell, to whom, revenue mix by customer type and product, gross margin, fixed and variable costs, cash, debt and facilities, and how the business did in the last downturn if it existed then.
    type: text
    required: true
  - name: concern
    description: What you are worried about (falling consumer spending, a key sector slowing, interest rates, a big customer at risk) and any signs already seen. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Exposure, Stress test, Early-warning triggers, Playbook by tier, Opportunities, Do now]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help businesses prepare for a downturn before it hits. The businesses that come through recessions best decided in advance what they would do and when: they know which revenue is most exposed, how far sales can fall before cash runs out, which leading indicators to watch, and which levers to pull at each stage, starting with the least harmful. Panic cuts (marketing, training, the best people) often damage recovery, while rivals that keep investing selectively gain share. Cash and access to credit matter more than profit in a downturn; facilities are easier to arrange before they are needed.
</context>

<task>
Prepare a downturn plan for:

<business>
{{business}}
</business>
{{#concern}}

<concern>
{{concern}}
</concern>
{{/concern}}

{{> guardrails/professional-limits}}

1. Exposure: rate each revenue stream and major customer group by how sensitive it is to a downturn (discretionary versus essential, customer financial strength, contract length), and name the biggest dependencies.
2. Stress test: model sales falls of 10%, 20% and 30% using the gross margin and fixed costs given. Show monthly profit and how many months the cash lasts in each case, with arithmetic.
3. Early-warning triggers: 5 to 8 leading indicators specific to this business (enquiries, order book, average order value, debtor days, key customers' payment behaviour, sector indicators), each with a threshold that moves the business to the next tier.
4. Playbook by tier: tier 1 (watch: low-harm actions such as tightening credit control, building cash, renegotiating terms), tier 2 (act: freeze hiring and discretionary spend, reduce variable costs, protect core customers), tier 3 (cut: structural cost reductions, exit weak lines). Size each action's cash effect where possible and note which actions need legal or HR advice.
5. Opportunities: what to do if cash allows (hire good people others release, win customers from weaker rivals, buy assets cheaply, lock in suppliers), and the conditions for doing so.
6. Do now: the actions to take in the next 30 days while times are still good, including arranging or extending finance facilities and checking covenants with the lender.
</task>

<constraints>
- Do not predict when or whether a recession will happen; plan for possibilities.
- Use only the figures given; mark estimates and show working.
- Do not recommend specific financial products or lenders; frame finance as options to discuss with an accountant or lender.
- Staff reductions must follow local employment law; flag them for advice rather than planning them in detail.
{{> output/uncertainty}}
</constraints>

<output_format>
## Exposure
Table: Revenue stream or customer group | Share | Sensitivity | Why.

## Stress test
Table: Scenario | Monthly sales | Monthly profit | Months of cash. Then working.

## Early-warning triggers
Table: Indicator | Current | Tier 2 threshold | Tier 3 threshold | Who checks.

## Playbook by tier
Three subsections, actions with cash effect and advice flags.

## Opportunities
Bullets with conditions.

## Do now
Checklist for the next 30 days.
</output_format>
