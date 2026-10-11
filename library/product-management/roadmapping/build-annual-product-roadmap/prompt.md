---
schema: 1
id: build-annual-product-roadmap
kind: prompt
title: Build an annual product roadmap
description: Builds a yearly product roadmap from strategy with themes, quarter placement, an investment split, capacity check and confidence that drops the further out an item sits.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, executive, founder, engineering-manager]
requires: [none]
inputs: [document, notes, text]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [annual-planning, product-themes, quarterly-plan, capacity-planning, confidence-levels]
pairs_with:
  prompts: [build-outcome-roadmap, critique-roadmap, run-quarterly-planning, forecast-roadmap-dates-with-ranges]
args:
  - name: strategy
    description: The product strategy, company goals or OKRs for the year, and the target customers or segments.
    type: text
    required: true
  - name: candidates
    description: The candidate initiatives, with any evidence, rough size (for example in team-weeks or T-shirt sizes) and fixed dates or commitments already made.
    type: text
    required: true
  - name: capacity
    description: Teams and headcount for the year, planned hires and when they start, and the share usually lost to support, bugs and maintenance.
    type: text
    required: true
  - name: audience
    description: Optional. Who will read the roadmap, for example the leadership team, the whole company or the board.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Themes, Roadmap by quarter, Investment split, Capacity check, Not this year, Review points]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build the yearly product roadmap that leadership asks for during annual planning. A year-long plan is useful for budgets, hiring and sequencing big bets, but it fails in predictable ways: every quarter is filled to 100 percent, items in Q3 and Q4 are shown with the same certainty as Q1, themes are just feature lists with a heading, and nothing is left for maintenance, bugs or the surprises every year brings. Good annual roadmaps are organised by a few themes that trace to strategy, are specific near-term and deliberately coarse later on, reserve capacity for unplanned work, and name the points in the year where the plan will be revisited. Confidence should fall with distance: Q1 is a plan, Q2 a forecast, Q3 and Q4 are intentions.
{{#audience}}
Audience: {{audience}}
{{/audience}}
</context>

<task>
Strategy and goals:

<strategy>
{{strategy}}
</strategy>

Candidate initiatives:

<candidates>
{{candidates}}
</candidates>

Capacity:

<capacity>
{{capacity}}
</capacity>

1. State the assumptions you are working from: planning year, team capacity in team-weeks or people-quarters, the share kept back for support, bugs and maintenance (use the user's figure; if none, use a labelled assumption of 20 to 30 percent), and when new hires become productive (not on their start date).
2. Group the candidates into three to five themes, each linked to a named strategy goal. Flag any candidate that links to no goal and any goal with no candidate behind it.
3. Place items by quarter. Q1 items are specific with owners and sizes; Q2 items are named with ranges; Q3 and Q4 are themes or problem areas, not committed features. Put fixed-date items first and plan backwards from their dates.
4. Show the investment split by theme and by type of work (new capability, improvement, maintenance) as a share of capacity, and compare it with what the strategy says matters most.
5. Check capacity quarter by quarter: planned load against available capacity after the reserve. If any quarter exceeds about 80 to 85 percent of available capacity, say so and propose what moves or drops.
6. List what is deliberately not in this year's plan and why, so the decision is visible.
7. Set review points (for example each quarter) and what would trigger a re-plan between them.
</task>

<constraints>
- Use only the initiatives, sizes and capacity the user gave. Never invent features, dates, customers or estimates; when a size is missing, mark it "unsized" and say how that weakens the plan.
- Do not show calendar dates for Q3 and Q4 items unless they are fixed external deadlines.
- Do not plan more than the stated capacity. If everything does not fit, say so plainly rather than squeezing it in.
- Label each item's confidence (high, medium, low) and explain what the label means.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets: capacity, reserve, hiring ramp, anything assumed.

## Themes
Table: theme | strategy goal it serves | why now | success signal.

## Roadmap by quarter
Table: quarter | theme | item or problem area | size | confidence | owner (Q1 only).

## Investment split
Table: theme or work type | share of capacity | comment on fit with strategy.

## Capacity check
Table: quarter | available | planned | load percent | action if over.

## Not this year
Bullets with a one-line reason each.

## Review points
When the plan is revisited and what triggers an early re-plan.
</output_format>
