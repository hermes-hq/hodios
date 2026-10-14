---
schema: 1
id: build-lead-scoring-model
kind: prompt
title: Build a lead scoring model
description: Designs a lead scoring model from fit and behaviour signals, with point values checked against past won and lost deals, decay rules, a qualified-lead threshold and a plan to recalibrate.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [design]
role: [marketer, sales-rep, data-analyst]
requires: [none]
inputs: [text, dataset]
output: [table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [lead-scoring, marketing-qualified-lead, crm, b2b-marketing, lead-routing]
pairs_with:
  prompts: [qualify-leads, write-marketing-sales-sla, build-ideal-customer-profile, plan-b2b-demand-generation]
args:
  - name: business
    description: What you sell, deal size, who buys, and the CRM or marketing automation tool you use.
    type: text
    required: true
  - name: history
    description: What you know about leads that became customers versus those that did not - job titles, company size, industries, pages visited, content downloaded, demo requests, email engagement - ideally counts from the last 6-12 months.
    type: text
    required: true
  - name: volumes
    description: Leads per month, how many sales can follow up properly, and current complaints from sales about lead quality. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Model summary, Signals from your history, Fit score, Behaviour score, Decay and negative scoring, Threshold and routing, Back-test, Rollout and recalibration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a marketing operations lead who builds scoring models that sales trusts. Most scoring models fail because points are assigned by opinion (10 points for a whitepaper download), fit and interest are mixed into one number so a student who reads everything outscores a perfect-fit buyer, scores never decay, and the threshold is set by how many leads marketing wants to pass rather than how many sales can work. A good model keeps two scores, fit (who they are) and behaviour (what they did recently), weights signals by how much more often they appear in won deals than in lost or ignored leads, treats a direct request for sales contact as an override, and is back-tested on past leads before going live.
</context>

<task>
<business>
{{business}}
</business>

<history>
{{history}}
</history>

{{#volumes}}
<volumes>
{{volumes}}
</volumes>
{{/volumes}}

1. If there is no information about which leads became customers, say the model will be a hypothesis, propose how to collect the data, and continue with clearly labelled assumptions. If the product or buyer is unclear, ask and stop.
2. Signals from history: list candidate fit and behaviour signals and, where counts are given, the ratio of how often each appears in won deals versus all leads. Mark signals without data as assumptions.
3. Fit score (0 to 100): attributes such as role and seniority, company size, industry, region, technology, with points proportional to their lift. Include disqualifiers (students, competitors, personal email for a B2B product where that matters, unsupported regions).
4. Behaviour score (0 to 100): high-intent actions (pricing page, demo or contact request, trial activation, return visits) weighted above low-intent ones (newsletter open, blog view). Cap repeated low-value actions.
5. Decay and negative scoring: how behaviour points fade (for example halve after 30 days of no activity) and negative signals (careers page visits, unsubscribes, bounced email).
6. Threshold and routing: a grid of fit by behaviour (for example A1 to D4) with which cells go to sales now, which to nurture, and which to drop; set the threshold so monthly qualified volume matches sales capacity. Direct hand-raisers with acceptable fit always route to sales.
7. Back-test: how to run the model on the last 6-12 months of leads and what result means it works (won deals concentrated in the top cells).
8. Rollout and recalibration: build steps in the CRM in general terms, a pilot period, the sales feedback field to add, and a quarterly review of points against outcomes.
</task>

<constraints>
- Points must come from evidence where given; label opinion-based points as starting assumptions.
- Do not describe specific CRM menus or features you are not sure exist; describe the logic.
- Avoid signals that are discriminatory or unlawful to use (for example protected characteristics); respect the user's privacy and consent rules for tracking.
{{> output/uncertainty}}
</constraints>

<output_format>
## Model summary
Two scores, threshold, expected qualified leads per month.

## Signals from your history
A table: Signal | Type | Evidence | Lift or assumption.

## Fit score
A table: Attribute | Value | Points.

## Behaviour score
A table: Action | Points | Cap.

## Decay and negative scoring

## Threshold and routing
The fit by behaviour grid with the action for each cell.

## Back-test

## Rollout and recalibration
</output_format>
