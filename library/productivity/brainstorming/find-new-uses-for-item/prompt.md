---
schema: 1
id: find-new-uses-for-item
kind: prompt
title: Find new uses for something you have
description: Finds new uses for an object, leftover material or surplus stock you already have - by its properties, not its label - and sorts them into keep and use, give or sell, and safe disposal.
category: brainstorming
version: 1.0.0
status: incubating
stage: [discover]
role: [individual, parent, teacher, artist]
requires: [none]
inputs: [topic, text, image]
output: [ideas, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [alternative-uses, repurposing, reuse, functional-fixedness, waste-reduction]
pairs_with:
  prompts: [restore-old-furniture, dispose-of-household-items, find-zero-budget-solutions]
args:
  - name: item
    description: What you have, how much of it, its condition and size, and what it is made of if you know. For example "40 empty glass jars with lids" or "an old wooden ladder with a cracked rung".
    type: text
    required: true
  - name: context
    description: Optional - who you are making things for, skills and tools you have, space, and anything you want to avoid.
    type: text
output_contract:
  format: markdown
  sections: [Properties, Uses, Best picks, If not keeping it, Safety notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People get stuck on what a thing is for, a bias psychologists call functional fixedness. The classic alternative-uses exercise breaks it by describing an object by its properties (it is rigid, hollow, transparent, waterproof, stackable, a set weight, a certain shape) instead of its name, then asking what else needs each property. Practical reuse adds two checks that creative lists skip: whether the material is safe for the new use (old paint, treated wood, food contact, children, heat) and whether someone else would value the item more than any reuse would. Quantity matters too: one jar is a pencil pot; 40 jars need a plan, a swap or a buyer.

<item>
{{item}}
</item>
{{#context}}
Context:
<context_details>
{{context}}
</context_details>
{{/context}}
</context>

<task>
1. Describe the item by its properties: material, shape, size, strength, flexibility, transparency, weight, quantity, condition, and parts that can be separated. If the item is unclear, ask one or two questions and stop.
2. Generate 20 to 30 uses, grouped by property ("because it is hollow and sealable ..."), across home, garden, play and learning, storage, gifts, community use and parts for other projects. Include a few surprising ones.
3. Mark each use for effort (none, some tools, a project) and whether it suits the quantity the user has.
4. Pick five best uses{{#context}} for the user's context{{/context}}, each with simple steps and what else is needed.
5. If the user may not keep it all: options to give, swap, sell or recycle, described as types (community swap groups, repair or reuse centres, schools, makers), with what to check locally.
6. Note safety limits for this material and these uses.
</task>

<constraints>
- Flag safety concerns honestly: lead or old paint, treated or rotten wood, broken glass, sharp edges, food contact, use around babies and young children, heat and electrical use, structural loads such as using a damaged ladder for climbing.
- Do not name specific local organisations or state local recycling rules as fact; describe types and say to check locally.
- No uses that are illegal or that create a hazard for others.
</constraints>

<output_format>
## Properties
Bulleted list.

## Uses
Grouped by property; each use one line with effort and quantity fit.

## Best picks
Numbered list of five with steps and what is needed.

## If not keeping it
Bulleted options with what to check locally.

## Safety notes
Bulleted list specific to this item.
</output_format>
