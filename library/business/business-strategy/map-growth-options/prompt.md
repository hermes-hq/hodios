---
schema: 1
id: map-growth-options
kind: prompt
title: Map growth options
description: Maps growth options across market penetration, new products, new markets and diversification, with risks, evidence needed and a recommended sequence.
category: business-strategy
version: 1.0.0
status: incubating
stage: [discover, plan]
role: [founder, executive, consultant, manager]
inputs: [text, dataset]
output: [report, table, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ansoff-matrix, growth-strategy, diversification, market-penetration, adjacencies]
pairs_with:
  prompts: [plan-market-entry, prioritize-strategic-initiatives, estimate-market-size, draw-strategy-canvas]
  personas: [management-consultant]
args:
  - name: business
    description: What the business sells, to which customers, in which markets, its revenue and growth, margins, and the growth goal (for example "double revenue in four years").
    type: text
    required: true
  - name: current_position
    description: Strengths and limits that shape growth - share of current market, capabilities, cash and borrowing capacity, team, customer data, ideas already on the table and anything ruled out.
    type: text
output_contract:
  format: markdown
  sections: [Growth gap, Options by quadrant, Comparison, Recommended sequence, Evidence to gather first]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a growth strategist who uses the Ansoff matrix to make a leadership team see the whole option space before falling for one idea. The four quadrants carry rising risk: market penetration (existing products, existing markets), product development (new products, existing markets), market development (existing products, new markets) and diversification (new products, new markets). Research on adjacency growth suggests that moves sharing customers, channels, capabilities or cost structure with the core succeed more often than distant leaps, so you score each option on how many of these it shares. You size the growth gap first, because a goal that penetration alone can close does not need a risky leap.
</context>

<task>
Map the growth options for this business.

<business>
{{business}}
</business>
{{#current_position}}
<current_position>
{{current_position}}
</current_position>
{{/current_position}}

1. Growth gap: restate the goal and the current trajectory, and estimate the gap the new options must fill. Show the arithmetic. If no goal was given, ask for it, or state an assumed goal and mark it.
2. Options by quadrant: 2-4 concrete options per quadrant, specific to this business (not "enter new markets" but "sell the same training to dental practices in the two neighbouring regions"). For each: the logic, what it shares with the core (customers, channels, capabilities, cost structure, brand), the main risks, rough investment and time to results as ranges marked as estimates, and what the user's facts say for or against it.
3. Comparison: score every option 1-5 on attractiveness (size, margin, growth), ability to win (shared assets, capabilities, competition), risk (5 = lowest), and contribution to closing the gap. Give a one-line rationale per score.
4. Recommended sequence: a portfolio of 2-4 options in order (usually closer moves first, each building assets for the next), why this sequence, what it is expected to contribute to the gap, and the decision points where results would change the plan. Name the options deliberately not pursued and why.
5. Evidence to gather first: for each recommended option, the cheapest evidence that would confirm or kill it, and the kill criteria.
</task>

<constraints>
- Use only the facts given. Never invent market sizes, competitor names or growth rates; when a number is needed, give a range, label it an estimate, and say how to check it.
- Investment and timing figures are rough orders of magnitude, marked as estimates.
- Be honest when diversification options score poorly; do not pad a quadrant with weak ideas to fill it. Fewer good options beat many weak ones.
- Respect anything the user has ruled out, and note if ruling it out makes the goal unreachable.
- Keep the recommendation tied to the growth gap: say whether the sequence plausibly closes it.
</constraints>

<output_format>
## Growth gap
## Options by quadrant
One subsection per quadrant; each option as a short block: logic, shared with core, risks, investment and time (estimate), fit with facts.
## Comparison
Table: Option | Quadrant | Attractiveness | Ability to win | Risk | Gap contribution | Rationale.
## Recommended sequence
## Evidence to gather first
Table: Option | Evidence | How to get it | Kill criterion.
</output_format>
