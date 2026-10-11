---
schema: 1
id: map-roadmap-against-customer-journey
kind: prompt
title: Map the roadmap against the customer journey
description: Overlays a roadmap on the customer journey to show which stages get investment and which are neglected, weighs that against where customers struggle, and suggests rebalancing.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan, review]
role: [product-manager, designer, ux-researcher, executive]
requires: [none]
inputs: [text, document, dataset]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-journey, journey-stages, coverage-gaps, funnel-drop-off, rebalancing]
pairs_with:
  prompts: [critique-roadmap, build-outcome-roadmap, align-roadmap-to-okrs]
args:
  - name: roadmap
    description: The roadmap items with a short description and size if known.
    type: text
    required: true
  - name: journey
    description: The customer journey stages (for example discover, evaluate, buy, onboard, use, get help, renew or leave), or let the assistant propose them from the product description.
    type: text
    required: true
  - name: evidence
    description: Optional. Where customers struggle - funnel conversion by stage, churn reasons, support ticket themes, research findings.
    type: text
output_contract:
  format: markdown
  sections: [Journey stages, Coverage map, Where it hurts, Mismatches, Suggested rebalancing, Data to collect]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You check a roadmap against the customer journey to find stages that are over- or under-served. Roadmaps tend to cluster on the core "use" stage, because that is where product teams live and where loud feature requests come from, while onboarding, billing, getting help, renewal and leaving are owned by nobody and quietly cause churn. Equally, some teams pour effort into acquisition while existing customers struggle. Coverage by item count is misleading; what matters is effort compared with where the biggest losses or pain are. The journey stages also differ by business: self-serve products lose people in sign-up and activation, sales-led products in evaluation and onboarding, and subscription products at renewal.
</context>

<task>
Roadmap:

<roadmap>
{{roadmap}}
</roadmap>

Journey:

<journey>
{{journey}}
</journey>

{{#evidence}}
Evidence:

<evidence>
{{evidence}}
</evidence>
{{/evidence}}

1. Confirm the journey stages. If the user gave a product description instead, propose five to eight stages fitted to the business model and mark them as proposed.
2. Place each roadmap item on the stage or stages it mainly affects and show the share of effort (by size, or by count if sizes are missing) per stage.
3. Using the evidence, describe where customers struggle or drop out at each stage. If no evidence is given, say so and list which signals would show it.
4. Name the mismatches: stages with high pain and little investment, and stages with heavy investment and little evidence of pain.
5. Suggest a rebalancing: specific items to move, shrink or add, with the stage and the expected effect, and what would be given up.
6. List the data to collect to make the next check sharper.
</task>

<constraints>
- Base pain on the evidence given. Never invent conversion rates, churn figures or customer quotes.
- Do not recommend spreading effort evenly; recommend putting it where the evidence of pain or loss is greatest.
- Keep suggestions to items the team could realistically change this period.
{{> output/uncertainty}}
</constraints>

<output_format>
## Journey stages
Numbered list with one-line definitions.

## Coverage map
Table: stage | roadmap items | share of effort.

## Where it hurts
Table: stage | evidence of pain or loss | strength of evidence.

## Mismatches
Bullets.

## Suggested rebalancing
Numbered list: change, stage, expected effect, trade-off.

## Data to collect
Bullets.
</output_format>
