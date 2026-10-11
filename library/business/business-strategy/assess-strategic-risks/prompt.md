---
schema: 1
id: assess-strategic-risks
kind: prompt
title: Assess strategic risks
description: Identifies and rates a business's strategic risks - market shifts, dependencies, disruption, regulation, key people - with early-warning signposts and mitigation choices.
category: business-strategy
version: 1.0.0
status: incubating
stage: [review, plan]
role: [executive, founder, consultant, business-analyst]
requires: [none]
inputs: [text, document, notes]
output: [table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [strategic-risk, risk-appetite, signposts, concentration-risk, board-reporting]
pairs_with:
  prompts: [run-scenario-planning, run-pestle-analysis, prepare-for-economic-downturn, map-supply-risk]
args:
  - name: business
    description: The business and its strategy - what it sells, to whom, revenue mix, key customers and suppliers, technology, regulation, people, financing - and any risks already on the leadership's mind.
    type: text
    required: true
  - name: audience
    description: Who the assessment is for (owner, leadership team, board, lender) and the risk appetite if known. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Risk universe, Rated risks, Heat map, Top risks in depth, Signposts, Owners and review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You assess strategic risks: events or trends that could stop the business achieving its strategy, as opposed to operational risks such as a server outage or a workplace accident. Strategic risks are often slow-moving and easy to ignore until late: a customer concentration that grows quietly, a technology shift that makes the offer less relevant, a regulation change, a key person who holds the business together, a strategy that rests on an untested assumption. Good assessment is specific to this business, rates likelihood and impact on a defined scale, names leading indicators (signposts) that show a risk is growing, and chooses a response for each (accept, reduce, transfer, avoid, or exploit when the risk is also an opportunity). A list of fifty generic risks helps nobody; the board needs the five that matter and what is being done.
</context>

<task>
Assess the strategic risks for:

<business>
{{business}}
</business>
{{#audience}}

<audience>
{{audience}}
</audience>
{{/audience}}

1. Risk universe: scan the categories (market and customers, competition and disruption, dependency and concentration, regulation and politics, technology, people and leadership, financial structure, reputation, strategy execution and assumptions) and list the risks specific to this business. Write each as cause, event and consequence.
2. Rated risks: rate each on likelihood and impact (1 to 5 with defined scales, impact measured against the strategy's goals), note velocity (how fast it could hit), and label the evidence as given, inferred or assumption.
3. Heat map: show where the risks sit.
4. Top risks in depth: for the five highest, give the current controls, the response chosen (accept, reduce, transfer, avoid, exploit), specific mitigation actions and the residual rating.
5. Signposts: for each top risk, one or two leading indicators with thresholds that would trigger action.
6. Owners and review: owner role for each top risk, review frequency, and how to report it to the audience.
</task>

<constraints>
- Keep to strategic risks; mention operational risks only where they could change the strategy, and point to an operational risk register for the rest.
- Use only the facts given; mark inferences and assumptions. Do not invent market data.
- Do not present insurance or financial products as recommendations; frame transfer options as questions for a broker or adviser.
- Be specific: "Top customer (38% of revenue) consolidates suppliers" beats "loss of customers".
{{> output/uncertainty}}
</constraints>

<output_format>
## Risk universe
Table: Category | Risk (cause, event, consequence).

## Rated risks
Table: Risk | Likelihood | Impact | Velocity | Evidence label.

## Heat map
A 5 by 5 grid in a table with risk numbers placed.

## Top risks in depth
One block per top risk: controls, response, actions, residual rating.

## Signposts
Table: Risk | Indicator | Threshold | Action triggered.

## Owners and review
Table: Risk | Owner | Review frequency; then reporting note.
</output_format>
