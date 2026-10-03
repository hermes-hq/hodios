---
schema: 1
id: plan-sales-territory
kind: prompt
title: Plan a sales territory
description: Plans a sales territory with account segmentation, a coverage model sized to capacity, pipeline math from quota, priorities and a quarterly activity plan.
category: sales
version: 1.0.0
status: incubating
stage: [plan]
role: [sales-rep, manager, founder]
requires: [none]
inputs: [dataset, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [territory-planning, account-segmentation, coverage-model, pipeline-math, quota]
pairs_with:
  prompts: [write-account-plan, review-sales-pipeline, build-sales-playbook]
  personas: [sales-coach]
args:
  - name: territory
    description: The territory - geography, segment or vertical, number of accounts, products you sell, average deal size, sales cycle, win rate if known, and how much time you have for selling.
    type: text
    required: true
  - name: accounts
    description: The account list or a summary, with whatever you have per account - size, industry, current customer or not, current spend, open opportunities, last contact, known fit. Optional.
    type: text
  - name: quota
    description: Your quota and its period, for example 1.2M USD new ARR for the year. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Segmentation, Coverage model, Pipeline math, Priorities, Quarterly activity plan, Risks and asks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sales manager who builds territory plans with reps at the start of each year. A territory plan answers three questions: where the revenue will come from, how the rep's limited hours will be spent across accounts, and whether the pipeline math can reach the number. The common failures are spreading effort evenly across every account, ignoring existing customers' expansion potential, and a plan that does not add up because nobody worked back from quota to the meetings it needs.
</context>

<task>
Plan this sales territory.

<territory>
{{territory}}
</territory>

{{#accounts}}
<accounts>
{{accounts}}
</accounts>
{{/accounts}}

{{#quota}}Quota: {{quota}}{{/quota}}

1. List the assumptions you need (deal size, win rate, cycle length, selling hours, ramp) and where each came from: the input, or your estimate labelled "est.". Ask for the ones that change the plan most.
2. Segment the accounts into tiers by fit and potential: A (high potential, focus), B (develop), C (light touch or marketing-led). Treat current customers with expansion potential as their own group. With an account list, assign each account; without one, define the criteria and the expected number per tier.
3. Design a coverage model: touch frequency and type per tier (meetings, calls, events, marketing), and check it against the rep's selling hours. If it does not fit, cut tiers, not depth on A accounts.
4. Work the pipeline math back from quota: deals needed at the average deal size, opportunities needed at the win rate, meetings or conversations needed to create them, and how that spreads across quarters given the cycle length. Show every step.
5. Name the priorities: the five to ten accounts or plays most likely to make the number, each with the reason.
6. Write a quarterly activity plan with targets per quarter for meetings, opportunities created, pipeline value and closed revenue, plus the main plays in each quarter.
7. List risks (concentration on a few deals, thin pipeline, long cycles) and what the rep needs from the manager or marketing.
</task>

<constraints>
- Show the math with units. Never present an estimated win rate or deal size as known; label it.
- Without a quota, plan to a target the user should confirm, and say so.
- Do not invent account facts. Where the list lacks data for tiering, say what to find out and tier provisionally.
- If the plan cannot reach quota on reasonable assumptions, say so plainly and show the gap, rather than inflating activity numbers.
</constraints>

<output_format>
## Assumptions
A table: Assumption | Value | Source (input or est.).
## Segmentation
Tier definitions, then accounts by tier (or expected counts).
## Coverage model
A table: Tier | Accounts | Touch frequency | Touch type | Hours per month. Then the capacity check.
## Pipeline math
The calculation, step by step.
## Priorities
Numbered, with reasons.
## Quarterly activity plan
A table: Quarter | Meetings | Opportunities | Pipeline | Closed | Main plays.
## Risks and asks
</output_format>
