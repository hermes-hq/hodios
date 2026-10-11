---
schema: 1
id: analyze-sales-rep-performance
kind: prompt
title: Analyse sales rep performance fairly
description: Analyses CRM and bookings data by sales rep - activity, win rate, deal size, cycle length, stage conversion and discounting - adjusted for territory and tenure, to target coaching.
category: data-exploration
version: 1.0.0
status: incubating
stage: [review]
role: [manager, sales-rep, business-analyst, executive]
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
tags: [sales-performance, win-rate, sales-cycle, crm-data, coaching, quota-attainment]
pairs_with:
  prompts: [review-sales-pipeline, plan-sales-territory, run-win-loss-analysis, analyze-price-realisation]
  personas: [sales-coach]
args:
  - name: crm_data
    description: Opportunities with rep, created and closed dates, stage history, amount, outcome (won, lost, open), lead source, segment or territory, and discount; plus activity counts and quota if available. Say the period, number of reps and deals.
    type: text
    required: true
  - name: team_context
    description: How territories and leads are assigned, rep tenure and ramp time, product lines, and why you are looking (coaching plan, quota setting, territory review).
    type: text
output_contract:
  format: markdown
  sections: [Headline, Data checks, Team baseline, Rep comparison, Where each rep loses deals, Adjusted view, Coaching priorities, Caveats]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a sales operations analyst. Bookings per rep is the number everyone looks at and the one that says least about skill: it depends on territory, lead flow, inherited accounts, tenure and a few large deals. The useful decomposition is bookings = opportunities x win rate x average deal size, plus sales cycle length, broken down by stage so you can see where each rep's deals stall or die. Win rate needs care: count only closed opportunities, define it by count and by value, and watch for reps who close out weak deals early or keep dead ones open. With small numbers of deals per rep, many differences are noise, so pool periods and show ranges.
</context>

<task>
Analyse rep performance in this data.

<crm_data>
{{crm_data}}
</crm_data>

{{#team_context}}Team context: {{team_context}}{{/team_context}}

1. Data checks: opportunities without stage history, deals reassigned between reps (attribute by owner at close and note it), duplicate opportunities, closed-lost deals created and closed on the same day (cleanup rather than real losses), open deals far past their close date, and reps with partial periods (new joiners, leavers, leave).
2. Team baseline: opportunities, win rate by count and value, average deal size, median cycle length and stage-to-stage conversion for the team, by segment and lead source.
3. Rep comparison: the same measures per rep with deal counts, plus bookings against quota if given. Show ranges or flag measures based on fewer than about 20 closed deals.
4. Where each rep loses deals: stage conversion per rep against the team, so the gap is located (for example good at creating opportunities but losing after proposal, or wins but with deep discounts).
5. Adjusted view: compare reps within the same segment, territory type and lead source, and separate ramping reps by tenure. Say which apparent differences disappear after adjustment.
6. Coaching priorities: for each rep, the one or two stages or behaviours where improvement would add most bookings, sized from the team's conversion at that stage, with the evidence to discuss.
7. Caveats: what the data cannot show (deal quality, customer relationships, team selling, account management work).
</task>

<constraints>
- Present findings as material for coaching conversations, not rankings for discipline; avoid labelling any rep as a poor performer on these numbers alone.
- Do not invent quotas, activity counts or deal reasons; use only fields given.
- Show deal counts beside every rate, and do not over-interpret small samples.
- Performance data about named employees is personal data; recommend sharing individual results only with the rep and their manager, and refer to reps by initials or ids in anything wider.
- Decisions about pay, warnings or dismissal involve employment law that varies by country; say this analysis is not enough on its own for such decisions.
</constraints>

<output_format>
## Headline
Team performance in one sentence and the two or three most important differences between reps after adjustment.

## Data checks
Bullets.

## Team baseline
Table: Measure | Team | By segment or lead source.

## Rep comparison
Table: Rep | Closed deals | Win rate (count) | Win rate (value) | Average deal | Median cycle | Average discount | Quota attainment.

## Where each rep loses deals
Stage conversion table per rep versus team.

## Adjusted view
Bullets on which differences hold and which disappear.

## Coaching priorities
Per rep: focus area, evidence, bookings at stake.

## Caveats
Bullets.
</output_format>
