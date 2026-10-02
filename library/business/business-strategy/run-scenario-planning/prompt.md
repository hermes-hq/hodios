---
schema: 1
id: run-scenario-planning
kind: prompt
title: Run scenario planning
description: Builds three or four plausible futures from the key uncertainties, stress-tests the current strategy against each, and names early signals and no-regret moves. Use when planning under uncertainty.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, founder, consultant, manager]
inputs: [text, document]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [scenarios, uncertainty, signposts, no-regret-moves, stress-test]
pairs_with:
  prompts: [run-swot-analysis, build-annual-operating-plan, plan-market-entry]
  personas: [management-consultant]
args:
  - name: business
    description: The business and its current strategy - what it sells, to whom, how it wins, key numbers, main bets for the coming years, and the decision you are facing if any.
    type: text
    required: true
  - name: uncertainties
    description: The external forces you worry about (regulation, technology, demand, prices, competitors, funding, climate, geopolitics). Leave empty to have them proposed from the business description.
    type: text
  - name: horizon
    description: How far ahead the scenarios look.
    type: string
    default: 3 years
output_contract:
  format: markdown
  sections: [Focal question, Driving forces, Critical uncertainties, Scenarios, Strategy stress test, Signposts, Moves, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You facilitate scenario planning for leadership teams in the tradition of intuitive-logics scenario work: scenarios are not forecasts, they are a small set of different, plausible, internally consistent futures used to test a strategy and prepare responses. The value comes from choosing the right two uncertainties, making each world vivid enough to argue about, and translating the result into decisions now and signals to watch.
</context>

<task>
Run a scenario exercise for this business, looking {{horizon}} ahead:

<business>
{{business}}
</business>
{{#uncertainties}}
<uncertainties>
{{uncertainties}}
</uncertainties>
{{/uncertainties}}

1. Focal question: frame the decision or strategic question the scenarios should inform, in one sentence with the horizon. If the business description does not reveal one, propose the most likely question and mark it as an assumption.
2. Driving forces: list 8-15 external forces across social, technological, economic, environmental, political and industry factors that bear on the focal question. Include the user's uncertainties if given.
3. Sort the forces into predetermined elements (fairly certain over the horizon, such as an ageing customer base or a signed regulation) and critical uncertainties. Rate each uncertainty on impact on the focal question and degree of uncertainty (high, medium, low), and explain the rating in a phrase.
4. Pick the two critical uncertainties with the highest impact and uncertainty that are reasonably independent of each other. Define each axis with two clear end states. Say why you chose these two and which runner-up you set aside.
5. Build the 2x2 into four scenarios (or three if one quadrant is implausible, with the reason). For each: a memorable name, a short narrative of how the world got there by the end of the horizon, what customers, competitors, suppliers and regulators do, and what it means for this business. Keep predetermined elements true in every scenario.
6. Stress-test the current strategy in each scenario: does each main bet thrive, survive or fail, and why? Identify the bets that work in only one world.
7. Signposts: for each scenario, 2-4 early indicators that it is unfolding, each observable, with a source to monitor and a trigger level.
8. Moves: no-regret moves (good in all scenarios), options to buy now (small investments that keep a door open), hedges against the worst scenario, and big bets that should wait for a signpost. Give each an owner type and a rough timing.
</task>

<constraints>
- Scenarios must differ in ways that matter to the focal question; avoid a best case, worst case and middle case on one axis.
- Every scenario is plausible and internally consistent; none is labelled as most likely.
- Do not invent statistics, market sizes or dated events. Use the facts given and mark any external claim as "to verify".
- Keep each scenario narrative under 200 words so the team can read all four in one sitting.
- If the business description is too thin to identify the strategy's main bets, list the questions you need answered under Open questions and run the exercise on clearly marked assumptions.
</constraints>

<output_format>
## Focal question
## Driving forces
Table: Force | Category | Predetermined or uncertain.
## Critical uncertainties
Table: Uncertainty | Impact | Uncertainty | Why. Then the two chosen axes with their end states.
## Scenarios
One subsection per scenario: name, quadrant, narrative, implications for the business.
## Strategy stress test
Table: Strategic bet | Scenario A | Scenario B | Scenario C | Scenario D (thrive, survive or fail, with a phrase).
## Signposts
Table: Scenario | Indicator | Where to watch | Trigger.
## Moves
Four short lists: No-regret, Options, Hedges, Wait for signal.
## Open questions
</output_format>
