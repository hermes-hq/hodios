---
schema: 1
id: decide-whether-to-close-site
kind: prompt
title: Decide whether to close a site
description: Decides whether to keep, fix or close an underperforming shop, branch or unit - contribution after its own costs, lease exit, staff, customers who may move - with a time-boxed turnaround test.
category: business-strategy
version: 1.0.0
status: incubating
stage: [review, plan]
role: [founder, executive, operations-manager]
advice_risk: [financial]
requires: [none]
inputs: [dataset, text]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [site-closure, branch-profitability, four-wall-contribution, lease-exit, turnaround, multi-site]
pairs_with:
  prompts: [plan-second-location, review-commercial-lease, forecast-cash-flow]
  personas: [small-business-advisor]
args:
  - name: site_figures
    description: The site's figures for the last 12-24 months - sales, cost of sales, wages, rent, rates and utilities, local marketing, any central costs allocated to it - and the same for other sites if you can, plus what you know about why it is struggling.
    type: text
    required: true
  - name: lease_terms
    description: Lease length left, rent, break clauses and notice, dilapidations, whether you could assign or sublet, and any personal guarantee. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Short answer, Site contribution, Why it underperforms, Options compared, Turnaround test, Closure plan outline, Questions for advisers]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a multi-site owner or franchisee decide what to do with a site that is not pulling its weight. The judgement is often distorted in two directions: a site looks loss-making only because central costs are allocated to it, so closing it would leave those costs on the other sites; or a loss-making site is kept for years on hope, draining cash and the owner's attention. The useful number is the site's own contribution - sales minus the costs that would disappear if it closed - compared with the cost of exiting (lease, dilapidations, redundancy) and the sales that might move to other sites. You set a time-boxed turnaround test with clear measures so the decision is made on evidence, not mood.
</context>

<task>
<site_figures>
{{site_figures}}
</site_figures>

{{#lease_terms}}
<lease_terms>
{{lease_terms}}
</lease_terms>
{{/lease_terms}}

1. Short answer: keep, fix with a turnaround test, or prepare to close, and why.
2. Site contribution: sales minus costs that would go if the site closed (its own cost of sales, wages, rent, rates, utilities, local marketing). Show it monthly and for 12 months, separately from allocated central costs. Show the trend.
3. Why it underperforms: separate causes the owner can fix (manager, opening hours, offer, local marketing, staffing) from those they cannot (footfall shift, new competitor, area decline). Mark each as evidence or hypothesis.
4. Options compared: keep as is, fix (turnaround), shrink (shorter hours, smaller format, relocate nearby), and close. For close: exit costs (rent to lease end or break, dilapidations, redundancy costs to check, write-offs), sales that may move to other sites (state an assumption and its range), and the effect on central costs. Compare the 12-month and 24-month cash outcome of each.
5. Turnaround test: up to three changes, a time box (typically 90 days to six months, labelled), weekly measures, and the threshold that triggers closure or keeps the site.
6. Closure plan outline (if needed): order of steps - advice first, lease negotiation, staff consultation as local law requires, redeployment to other sites, customer messaging, stock and equipment.
7. Questions for a solicitor (lease, staff), an accountant (tax, write-offs, cash) and the landlord.
8. Check the arithmetic before answering.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Use only the figures given; mark gaps as [X].
- Do not interpret the lease or employment law; list what a solicitor must review. Staff should not hear about a closure through rumour; plan consultation with advice.
- Label any assumption on transferred sales or turnaround time.
- If the site's sales or own costs are missing, ask for them and stop.
{{> output/uncertainty}}
</constraints>

<output_format>
## Short answer
Two or three sentences.
## Site contribution
Table: Line | Monthly | 12 months. Then the trend and the allocated costs shown separately.
## Why it underperforms
Table: Cause | Fixable? | Evidence or hypothesis.
## Options compared
Table: Option | 12-month cash effect | 24-month cash effect | Risks.
## Turnaround test
Changes, time box, weekly measures, and the decision threshold.
## Closure plan outline
Numbered steps, or "Not needed now".
## Questions for advisers
Grouped by solicitor, accountant, landlord.
</output_format>
