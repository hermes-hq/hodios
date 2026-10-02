---
schema: 1
id: build-annual-operating-plan
kind: prompt
title: Build an annual operating plan
description: Builds an annual operating plan with priorities, targets, budget and headcount by function, quarterly milestones and a review cadence, tied to the strategy. Use for yearly planning.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, executive, operations-manager, manager]
inputs: [text, document, dataset]
output: [plan, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [annual-plan, budgeting-cycle, headcount-plan, quarterly-milestones, operating-cadence]
pairs_with:
  prompts: [set-okrs, run-scenario-planning, prepare-board-meeting]
  personas: [management-consultant]
args:
  - name: strategy
    description: The company's strategy and goals for the year - where you are going, the big bets, what you will not do, and any targets the board or owners have set.
    type: text
    required: true
  - name: last_year_results
    description: Last year's actuals - revenue, margin, costs by function, headcount, cash, key metrics, and what went well or badly. Leave empty if this is the first year.
    type: text
  - name: constraints
    description: Fixed limits - cash or runway floor, maximum burn, hiring freeze, debt covenants, fixed commitments, seasonality.
    type: text
output_contract:
  format: markdown
  sections: [Planning assumptions, Priorities, Targets, Budget by function, Headcount plan, Quarterly milestones, Risks and triggers, Review cadence, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help leadership teams turn a strategy into an annual operating plan that people use all year. A good plan has few priorities, targets that follow from explicit assumptions, a budget and headcount that match the priorities, and a cadence that catches drift early. A plan with twelve priorities has none; a budget that funds everything equally is not a plan.
</context>

<task>
Build the operating plan.

<strategy>
{{strategy}}
</strategy>
{{#last_year_results}}
<last_year_results>
{{last_year_results}}
</last_year_results>
{{/last_year_results}}
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Planning assumptions: list the drivers the plan rests on (pricing, volume, conversion, churn, average deal size, cost inflation, hiring time, seasonality). Take them from last year's results where possible; mark every other assumption clearly.
2. Priorities: at most three to five company priorities that follow from the strategy, each with why it matters this year, the outcome that shows it worked, and an accountable owner role. List what the company will explicitly not do this year.
3. Targets: annual and quarterly targets for revenue, gross margin, operating costs, operating result, cash at period end and two to four leading metrics. Show how revenue is built from the drivers (for example customers x average revenue x retention), not just a growth percentage. If last year's results are missing, give the structure with placeholders.
4. Budget by function: allocate operating costs across functions (for example sales, marketing, product and engineering, operations, customer support, general and administrative), separating people costs from other costs, and show how each line supports a priority. Check the totals against the targets and constraints.
5. Headcount plan: start and end headcount by function, hires by quarter with role and start month, and the cost impact of hiring timing. Flag hires that depend on hitting a milestone first.
6. Quarterly milestones: for each priority, what must be true at the end of Q1, Q2, Q3 and Q4.
7. Risks and triggers: the main risks to the plan, the early metric for each, and the pre-agreed response if it trips (for example "if Q1 new revenue is below 80% of plan, pause Q2 hires in sales and marketing").
8. Review cadence: weekly, monthly, quarterly and mid-year reviews, with who attends, what is reviewed and which decisions each can make. Include a mid-year re-forecast.
9. Check the plan for consistency: revenue drivers versus sales and marketing capacity, cash against the floor or covenant, and priorities versus where the money goes. Report any conflict.
</task>

<constraints>
- Do not invent last year's figures or market data. Use placeholders such as `[ACTUAL: Q4 churn]` and list them under Open questions.
- Arithmetic must be exact and totals consistent across tables; state the currency and whether figures are in thousands.
- Respect the given constraints. If the strategy cannot be funded within them, show the gap and offer two options (cut scope, phase spending, or raise funding) rather than hiding it.
- This is a management plan, not accounting or tax advice; recommend the finance lead or accountant checks tax, depreciation and cash timing.
</constraints>

<output_format>
## Planning assumptions
Table: Driver | Value | Source (last year, assumption).
## Priorities
Numbered, each with Why, Outcome, Owner. Then "Not doing this year".
## Targets
Table: Metric | Q1 | Q2 | Q3 | Q4 | Year. Then the revenue build.
## Budget by function
Table: Function | People cost | Other cost | Total | Priority supported.
## Headcount plan
Table: Function | Start | Hires (role, quarter) | End | Annual cost impact.
## Quarterly milestones
Table: Priority | Q1 | Q2 | Q3 | Q4.
## Risks and triggers
Table: Risk | Early metric | Trigger | Pre-agreed response.
## Review cadence
Table: Meeting | Frequency | Attendees | Reviews | Decides.
## Open questions
Checklist of placeholders and assumptions to confirm.
</output_format>
