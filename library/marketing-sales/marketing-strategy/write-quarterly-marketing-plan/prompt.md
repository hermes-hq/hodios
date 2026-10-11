---
schema: 1
id: write-quarterly-marketing-plan
kind: prompt
title: Write a quarterly marketing plan
description: Writes a marketing team's plan for next quarter with goals from company targets, lessons from last quarter, three to five programmes, capacity, budget, owners and what is not being done.
category: marketing-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [marketer, manager, founder]
requires: [none]
inputs: [text, notes]
output: [plan, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quarterly-plan, marketing-priorities, capacity-planning, marketing-goals, planning-cycle]
pairs_with:
  prompts: [write-marketing-plan, build-annual-marketing-calendar, define-marketing-kpis, write-marketing-performance-report]
  personas: [fractional-cmo]
args:
  - name: targets
    description: The company and marketing targets for the quarter (revenue, pipeline, signups, retention), and how last quarter went against its targets.
    type: text
    required: true
  - name: inputs
    description: Ideas and requests on the table, launches and events already fixed, team members and their available time, and the quarter's budget.
    type: text
    required: true
  - name: context
    description: Anything else that shapes the quarter, such as seasonality, a new product, a sales team change, or leadership priorities. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Quarter on a page, Last quarter in brief, Goals and measures, Priority programmes, Capacity and budget, Not this quarter, Risks and dependencies, Review rhythm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a head of marketing who runs quarterly planning. Quarterly plans fail when they list everything everyone asked for, when goals are activities ("publish 12 posts") rather than outcomes, when nobody checks capacity so half the work slips, and when last quarter's lessons are ignored. A useful plan starts from the targets, reviews what last quarter taught, chooses three to five programmes that move the targets, puts owners, hours and money against each, and says out loud what is not being done this quarter so stakeholders stop expecting it. It fits on one page for leadership with detail underneath.
</context>

<task>
<targets>
{{targets}}
</targets>

<inputs>
{{inputs}}
</inputs>

{{#context}}
<context_details>
{{context}}
</context_details>
{{/context}}

1. If there is no target or no information on team capacity, ask up to three questions and stop.
2. Last quarter in brief: results against targets, what worked, what did not, and the one lesson that changes this quarter.
3. Goals and measures: two to four outcome goals linked to company targets, each with a measure, baseline and target; plus leading indicators to watch monthly.
4. Priority programmes: three to five, each with the goal it serves, the main activities, owner, start and end, hours, budget and the result expected. Score candidate ideas on expected impact, confidence and effort and show why the chosen ones won.
5. Capacity and budget: hours available versus hours planned per person (leave a 15 to 20% buffer for reactive work), and budget allocation adding up to the total.
6. Not this quarter: requests and ideas deliberately left out and why, so they can be revisited.
7. Risks and dependencies: on sales, product, design, agencies or approvals, with mitigation.
8. Review rhythm: weekly check-in, monthly review against the measures, and the end-of-quarter retrospective.
</task>

<constraints>
- Do not invent last quarter's results or targets; use the user's figures or placeholders.
- Planned hours must not exceed available hours after the buffer; budget must add up.
- Goals are outcomes, not activity counts.
{{> output/uncertainty}}
</constraints>

<output_format>
## Quarter on a page
Goals, programmes, budget, top risk in a few bullets.

## Last quarter in brief

## Goals and measures
A table: Goal | Measure | Baseline | Target | Leading indicator.

## Priority programmes
A table: Programme | Goal | Owner | Dates | Hours | Budget | Expected result.

## Capacity and budget

## Not this quarter

## Risks and dependencies

## Review rhythm
</output_format>
