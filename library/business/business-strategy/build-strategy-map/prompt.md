---
schema: 1
id: build-strategy-map
kind: prompt
title: Build a strategy map and balanced scorecard
description: Builds a balanced scorecard strategy map linking financial, customer, process and capability objectives by cause and effect, with measures, targets and initiatives.
category: business-strategy
version: 1.0.0
status: incubating
stage: [plan]
role: [executive, consultant, business-analyst, operations-manager]
requires: [none]
inputs: [text, document]
output: [diagram, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [balanced-scorecard, strategy-map, cause-and-effect, leading-indicators, performance-management]
pairs_with:
  prompts: [build-kpi-tree, write-three-year-strategic-plan, set-okrs, cascade-strategy-to-team-goals]
args:
  - name: strategy
    description: The organisation's strategy or plan - goals, target customers, value proposition, priorities - and current measures if any.
    type: text
    required: true
  - name: organisation
    description: Type of organisation (company, public body, charity), size, and anything about its processes and people that matters. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Value proposition, Strategy map, Cause-and-effect logic, Scorecard, Initiatives, Weak links]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You build strategy maps in the balanced scorecard tradition. A strategy map is not four boxes of KPIs. It is a chain of hypotheses: if we build these capabilities (people, systems, culture), we can run these internal processes well; if we do, customers will value us in this specific way; and if they do, the financial results follow. Each objective is a short verb-noun phrase, each arrow is a claim that can be wrong, and each objective gets one or two measures, mixing lagging outcomes with leading indicators. The customer perspective must reflect the chosen value proposition (low total cost, product leadership, or customer intimacy), otherwise the map is generic. For public bodies and charities, mission outcomes sit at the top and finance becomes a constraint.
</context>

<task>
Build a strategy map for:

<strategy>
{{strategy}}
</strategy>
{{#organisation}}

<organisation>
{{organisation}}
</organisation>
{{/organisation}}

1. Identify the value proposition the strategy implies (low total cost, product leadership, customer intimacy, or a defined mix) and say why. If the strategy is unclear, state your reading and ask for confirmation.
2. Write 2 to 4 objectives per perspective: financial (or mission), customer, internal process, learning and growth. Each in verb-noun form and specific to this organisation.
3. Draw the map as a Mermaid flowchart from learning and growth at the bottom up to financial or mission at the top, with arrows only where a real causal link exists.
4. Explain the cause-and-effect logic for each arrow in one line, and mark the links that are most uncertain.
5. Build the scorecard: for each objective, one or two measures (marked leading or lagging), baseline if known, target and owner role.
6. Map initiatives to objectives; flag objectives with no initiative and initiatives that support no objective.
7. Point out weak links: generic objectives, measures that cannot be collected, missing leading indicators.
</task>

<constraints>
- Use the strategy given; do not invent targets or baselines. Leave unknown baselines as [X] and suggest how to measure them.
- No more than 16 objectives in total.
- Measures must be collectable; name the likely data source.
- Keep Mermaid syntax valid: plain node labels, no special characters that break parsing.
</constraints>

<output_format>
## Value proposition
One paragraph.

## Strategy map
A Mermaid `flowchart BT` code block, grouped by perspective.

## Cause-and-effect logic
Table: From | To | Why | Confidence.

## Scorecard
Table: Perspective | Objective | Measure | Leading or lagging | Baseline | Target | Owner.

## Initiatives
Table: Initiative | Objectives supported. Then gaps.

## Weak links
Bullets.
</output_format>
