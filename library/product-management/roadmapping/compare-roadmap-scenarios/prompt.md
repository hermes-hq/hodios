---
schema: 1
id: compare-roadmap-scenarios
kind: prompt
title: Compare roadmap scenarios
description: Lays out two or three alternative roadmaps under different budgets, headcount or priorities side by side, with what each delivers, gives up and risks, for a leadership decision.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, executive, founder, engineering-manager]
requires: [none]
inputs: [text, notes, document]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [scenario-comparison, budget-planning, headcount, trade-offs, decision-paper]
pairs_with:
  prompts: [build-annual-product-roadmap, critique-roadmap, brief-board-on-roadmap, roadmap-reset-track]
args:
  - name: scenarios
    description: The two or three scenarios to compare, for example flat budget, plus four engineers, or a 20 percent cut; or a different strategic priority in each.
    type: text
    required: true
  - name: initiatives
    description: The candidate initiatives with rough sizes, the goal each serves, and any fixed dates or customer commitments.
    type: text
    required: true
  - name: context
    description: Optional. Current capacity, the decision deadline, who decides, and what the decision-makers care about most.
    type: text
output_contract:
  format: markdown
  sections: [Shared assumptions, Scenarios side by side, What changes between them, Risks per scenario, Recommendation, Questions for the decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You prepare a side-by-side comparison of alternative roadmaps so leaders can choose between budgets, headcount levels or priorities with the consequences in view. Leaders often approve a budget and only later learn what it bought. A useful comparison holds everything constant except the variable being decided, uses the same capacity maths for every scenario, and shows the differences in outcomes and risk rather than only in feature counts. Extra headcount is not instantly extra capacity: hiring takes months and new people need time to become productive, which shrinks the gain in the first half of the year. Cuts rarely remove only the bottom item; they often break dependencies, commitments and morale.
{{#context}}
Context: {{context}}
{{/context}}
</context>

<task>
Scenarios:

<scenarios>
{{scenarios}}
</scenarios>

Initiatives:

<initiatives>
{{initiatives}}
</initiatives>

1. State the shared assumptions every scenario uses: capacity per person or team, the reserve for support and maintenance, hiring lead time and ramp-up for added headcount, and the order of priority used to fill capacity.
2. For each scenario, fill capacity in priority order and list what is in, what is out, and what slips to a later period. Respect fixed dates and commitments first; if a scenario cannot meet one, flag it.
3. Translate each scenario into outcomes: which goals it moves, by roughly how much where the user gave targets, and what customers or the business would notice.
4. Show the differences explicitly: the items and outcomes that change between scenarios, and the marginal value of the extra money or people.
5. List risks per scenario: delivery, commitments broken, team morale or attrition, dependency breaks, and what happens if estimates are wrong by 30 percent.
6. Recommend one scenario with the reasons, or say the decision is a values call and name the trade-off. List what the decision-makers still need to answer.
</task>

<constraints>
- Use the same method and numbers for every scenario so the comparison is fair. Show the capacity arithmetic.
- Never invent sizes, revenue figures or targets; mark unknowns and how they affect the comparison.
- Do not make one scenario look better by optimistic assumptions applied only to it.
- Keep the recommendation separate from the comparison so readers can disagree with it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Shared assumptions
Bullets.

## Scenarios side by side
Table: initiative | scenario A | scenario B | scenario C (in, out, slipped, with timing).

## What changes between them
Bullets: outcomes gained or lost, and the marginal value of the difference.

## Risks per scenario
Table: scenario | main risks | likelihood | what would show it early.

## Recommendation
Short paragraph with reasons.

## Questions for the decision
Numbered list.
</output_format>
