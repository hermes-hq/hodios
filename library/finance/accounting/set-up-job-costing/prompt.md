---
schema: 1
id: set-up-job-costing
kind: prompt
title: Set up job costing
description: Sets up job costing for a trades, agency or project business to track labour, materials, subcontractors and overhead per job, compare estimates with actuals and find unprofitable work.
category: accounting
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, operations-manager, project-manager]
requires: [none]
inputs: [text, dataset]
output: [plan, table, checklist]
risk: read-only
advice_risk: [financial]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [job-costing, project-profitability, overhead-rate, estimating]
pairs_with:
  prompts: [calculate-product-margin, analyze-customer-profitability, set-up-chart-of-accounts]
  personas: [fractional-cfo]
args:
  - name: business_type
    description: What kind of jobs you do (for example kitchen fitting, marketing campaigns, software projects, event production), typical job size and length, and how you price (fixed quote, time and materials, retainer).
    type: string
    required: true
  - name: current_tracking
    description: How you track time, materials and costs today, your bookkeeping tool, annual overheads, team size and billable hours if known, and any jobs you suspect lost money. Optional.
    type: text
output_contract:
  format: markdown
  sections: [How job costing will work here, Overhead rate, Job cost sheet, Capturing costs, Job profitability report, Spotting unprofitable work, Rollout]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up job costing for a business that sells work job by job. Most such businesses know their overall margin but not which jobs, job types, clients or estimators make or lose money, so they keep quoting the losers the same way. Job costing fixes that by giving every job a code, charging every direct cost to it as it happens (labour at a fully loaded hourly rate, materials, subcontractors, equipment, travel), adding a fair share of overhead, and comparing the result with the estimate when the job closes.

Business: {{business_type}}
</context>

<task>
{{#current_tracking}}Current tracking and figures:

<current_tracking>
{{current_tracking}}
</current_tracking>{{/current_tracking}}

1. Describe the setup in a few lines: job codes and naming, phases or cost codes within a job if useful (for example design, build, snagging), and where job costs are recorded (bookkeeping tool's project or class tracking, or a spreadsheet).
2. Calculate the fully loaded labour cost per hour: pay plus employer costs and benefits, divided by realistic productive hours (after holidays, sickness, training and non-billable time). Use the user's figures or labelled placeholders.
3. Calculate an overhead rate: annual overheads divided by annual productive labour hours, or as a percentage of direct cost if labour is a small share. Show the arithmetic and say which basis suits this business and why.
4. Design a job cost sheet: estimate versus actual by cost type and phase, change orders or variations, revenue invoiced, gross profit before overhead, overhead charged, net job profit and margin.
5. Set the capture rules: daily time against job codes, materials and subcontractor invoices coded to a job on entry, returns and stock taken from the van or store, and how to record change orders before the work is done.
6. Design the profitability report by job, job type, client and estimator, monthly.
7. Explain how to spot unprofitable work: patterns to look for (small jobs carrying the same setup cost, one client's scope creep, underestimated phases), and what to change (quoting rates, minimum job size, change order discipline).
8. Give a rollout plan, starting with the next few jobs rather than backfilling history.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Label every assumed figure as a placeholder to replace, and show all arithmetic.
- Keep it light enough for the team to follow: fewer, well-used cost codes beat many unused ones.
- Explain the difference between gross job profit (before overhead) and net job profit (after), and why a job that covers its direct costs can still lose money.
- Revenue recognition and work-in-progress valuation for the annual accounts are for the accountant; flag them, do not decide them.
{{> output/uncertainty}}
</constraints>

<output_format>
## How job costing will work here
Bullets.

## Overhead rate
Working table: item | amount. Then the loaded labour rate and overhead rate.

## Job cost sheet
Table template with estimate, actual and variance columns, and one example job filled in.

## Capturing costs
Checklist of rules.

## Job profitability report
Table template.

## Spotting unprofitable work
Bullets: pattern | what to check | what to change.

## Rollout
Numbered steps for the first month.
</output_format>
