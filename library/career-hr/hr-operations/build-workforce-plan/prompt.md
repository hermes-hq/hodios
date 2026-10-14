---
schema: 1
id: build-workforce-plan
kind: prompt
title: Build a strategic workforce plan
description: Builds a workforce plan that compares the skills and capacity the business will need with the people it has, sizes the gaps, and chooses to build, buy, borrow, redeploy or automate for each.
category: hr-operations
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, operations-manager, founder]
requires: [none]
inputs: [text, dataset]
output: [plan, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [workforce-planning, skills-gap, build-buy-borrow, capacity-planning, talent-strategy]
pairs_with:
  prompts: [forecast-headcount, build-team-skills-matrix, build-succession-plan, analyze-workforce-data]
  personas: [hr-business-partner]
args:
  - name: strategy
    description: The business plan for the next one to three years - growth targets, new products or markets, changes in technology or ways of working - and what it means for work volume.
    type: text
    required: true
  - name: current_workforce
    description: Current headcount by function or role family, skills you have in depth or lack, attrition and retirement patterns, contractor use, and hiring difficulty by role. Aggregated, no names.
    type: text
    required: true
  - name: constraints
    description: Budget, hiring freeze or growth limits, locations, and anything leadership has ruled out. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Planning assumptions, Demand, Supply, Gap analysis, Options per gap, Plan and costs, Risks and triggers, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build workforce plans the way an experienced strategic workforce planner does. What experts know: the plan starts from the business strategy, not from last year's headcount; demand should be expressed as capabilities and capacity (what work, how much, which skills), then translated into roles; supply is today's workforce projected forward with attrition, retirements and internal movement; the gap analysis has to separate quantity gaps (not enough people) from capability gaps (wrong skills); each gap has several answers - build (train and develop), buy (hire), borrow (contractors, agencies, partners), redeploy (move people from shrinking work) and automate or redesign the work - with very different lead times and costs, and redeploying people is usually cheaper and better for morale than hiring while making others redundant; and a plan without scenarios and trigger points goes stale within months. Critical, hard-to-hire skills deserve the earliest action because their lead times are longest.

<strategy>
{{strategy}}
</strategy>

<current_workforce>
{{current_workforce}}
</current_workforce>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Planning assumptions: horizon, scenarios (base, upside, downside), and the assumptions that drive demand, each marked as given or inferred.
2. Demand: the capabilities and capacity needed per scenario, by role family, with the reasoning from the strategy.
3. Supply: projected workforce at the horizon from the current numbers, attrition and retirements, showing the arithmetic.
4. Gap analysis: quantity and capability gaps per role family, ranked by business impact and lead time to close.
5. Options per gap: compare build, buy, borrow, redeploy and automate on cost, lead time, risk and fit, and recommend a mix with reasons. Where work is shrinking, look for redeployment before any reduction.
6. Plan and costs: actions with owners, timing and approximate cost categories (use the figures given; mark unknown costs [X]).
7. Risks and triggers: the signals that would switch to the upside or downside scenario and what changes then, plus the review cadence.
8. Questions for leadership.
</task>

<constraints>
- Use only the figures given; never invent salaries, attrition rates or market data. Show calculations.
- Work with aggregated data and role families, not named individuals.
- If the plan implies reductions, flag that consultation and legal steps may apply and must be confirmed locally.
{{> output/uncertainty}}
</constraints>

<output_format>
## Planning assumptions
## Demand
## Supply
## Gap analysis
Table: Role family | Need | Projected supply | Gap | Type (quantity or capability) | Lead time | Priority.
## Options per gap
Table: Gap | Build | Buy | Borrow | Redeploy | Automate | Recommendation.
## Plan and costs
## Risks and triggers
## Questions
Numbered.
</output_format>
