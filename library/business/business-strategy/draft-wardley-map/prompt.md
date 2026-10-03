---
schema: 1
id: draft-wardley-map
kind: prompt
title: Draft a Wardley map
description: Drafts a Wardley map in text form from a user need and its value chain, places each component by evolution stage and highlights strategic moves and build-versus-buy calls.
category: business-strategy
version: 1.0.1
status: incubating
stage: [discover, design]
role: [executive, architect, product-manager, tech-lead]
inputs: [text]
output: [diagram, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [wardley-mapping, value-chain, situational-awareness, build-vs-buy, evolution]
pairs_with:
  prompts: [run-scenario-planning, assess-competitive-advantage, analyze-business-model]
  personas: [management-consultant]
args:
  - name: user_need
    description: Who the user or customer is and the need the map anchors on (for example "small retailers need to take payments in store and online").
    type: text
    required: true
  - name: components
    description: The capabilities, activities, data and practices that meet the need, how you provide each today (built in-house, bought, rented, outsourced), and anything you know about how mature each is in the market. Leave empty and the prompt will propose a value chain to confirm.
    type: text
output_contract:
  format: markdown
  sections: [Anchor and value chain, Component placement, Map, Observations, Strategic moves, Assumptions to challenge]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "The mapping-tool syntax includes the anchor line for the user."}
---
<context>
You are a practitioner of Wardley mapping. A map has two axes: the y-axis is visibility to the user (the need at the top, the components it depends on below), and the x-axis is evolution, in four stages: genesis (novel, uncertain, rare), custom-built (understood by a few, built bespoke), product or rental (increasingly common, feature competition), and commodity or utility (standardised, cost and volume matter). Components evolve left to right through supply and demand competition. Mapping exposes common errors: custom-building what is already a commodity, outsourcing what is a source of differentiation, and applying one method (agile, lean, outsourcing) to everything. You place components using observable characteristics (ubiquity, how well understood, how the market talks about it), not wishes, and you are explicit about your uncertainty.
</context>

<task>
Draft a Wardley map.

<user_need>
{{user_need}}
</user_need>
{{#components}}
<components>
{{components}}
</components>
{{/components}}

1. Anchor and value chain: state the user and the need. Build the chain of components from the need downwards, each with what it depends on. If components were not given, propose a chain and mark it "proposed, confirm".
2. Component placement: for each component, its visibility (0-1, 1 = visible to the user) and evolution (0-1, with the stage name), the characteristics that justify the stage, how it is provided today, and confidence (high, medium, low).
3. Map: render the map as a text grid with stages as columns and visibility as rows, plus the same map in OWM text syntax (`anchor User [0.95, evolution]` for the user, `component Name [visibility, evolution]`, `A->B` for dependencies, `evolve Name 0.xx` for expected movement) so the user can paste it into a mapping tool.
4. Observations: where the way a component is provided does not match its stage (building a commodity, renting something that differentiates), components about to evolve and what that will do to the components above them, inertia (past investment, skills, contracts) that resists change, and where competitors could gain from moving first.
5. Strategic moves: 3-6 moves, each tied to components on the map: for example use a utility instead of building, invest in a genesis component that could differentiate, open-source or standardise a component to commoditise a competitor's advantage, build an ecosystem around a component. For each give the expected effect, the risk and the method suited to the stage (exploration for genesis, product management for product, outsourcing or utility for commodity).
6. Assumptions to challenge: the placements with low confidence and how to test each (market scan, supplier count, customer interviews).
</task>

<constraints>
- Place by evidence and characteristics; label judgement. Do not invent market facts about named vendors.
- Keep the map at a useful size: 8-20 components. Group detail that does not change a decision.
- Moves must refer to specific components on the map, not general strategy advice.
- If the user need is vague ("our company"), ask for a specific user and need before mapping, or propose one and mark it.
</constraints>

<output_format>
## Anchor and value chain
## Component placement
Table: Component | Depends on | Visibility | Evolution (stage) | Why this stage | Provided today | Confidence.
## Map
A text grid, then an OWM code block.
## Observations
## Strategic moves
Numbered: move, components, expected effect, risk, method for the stage.
## Assumptions to challenge
</output_format>
