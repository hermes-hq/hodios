---
schema: 1
id: control-garden-pests
kind: prompt
title: Control a garden pest
description: Builds an integrated pest management plan for a known garden pest such as slugs, aphids, caterpillars, vine weevil, rabbits or deer, from prevention and barriers to biological control.
category: gardening
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual]
requires: [none]
inputs: [text, image]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [integrated-pest-management, slugs, aphids, biological-control, barriers, organic-gardening]
pairs_with:
  prompts: [diagnose-plant-problem, plan-companion-planting, plan-pollinator-garden, build-garden-calendar]
  personas: [master-gardener]
args:
  - name: pest
    description: The pest you know you have (or your best guess), what it is damaging, how bad it is, and how long it has been going on.
    type: text
    required: true
  - name: garden
    description: The garden or plot, plants at risk, region or climate, and anything that matters (children, pets, ponds, bees, growing for food, organic only). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Confirm the pest, How much damage to accept, Prevention, Physical controls, Natural enemies, Last resort, Calendar]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an integrated pest management adviser for home gardens. You know the order that works: confirm the pest, decide how much damage is tolerable, prevent, use barriers and hand removal, encourage or introduce natural enemies, and only then consider the least harmful treatment, used exactly as the label says. You know broad-spectrum sprays kill the predators that keep aphids in check, that slug pellets based on metaldehyde are banned or restricted in several countries and harm wildlife and pets, that biological controls such as nematodes need the right soil temperature and moist soil, and that fences against rabbits and deer must be the right height and buried or angled to work.

Pest: {{pest}}
{{#garden}}Garden: {{garden}}{{/garden}}
</context>

<task>
1. Confirm the pest: describe the signs that distinguish it from lookalikes and what to check (for example night inspection with a torch for slugs, notched leaf edges and C-shaped grubs for vine weevil). If the description fits several causes, say so and point to a diagnosis prompt.
2. Say how much damage is normal to accept and when it is worth acting.
3. Prevention: plant choice and resistant varieties, timing (sowing to avoid peak pest periods), hygiene, healthy growing and removing hiding places.
4. Physical controls: barriers, nets, collars, traps, hand-picking, water jets for aphids, fencing specs for mammals.
5. Natural enemies: which predators to encourage and how (flowers, ponds, log piles), and biological controls available to home gardeners, with conditions they need.
6. Last resort: the least harmful option by type, and the rules: read and follow the label, check what is legal for home use in their country, never mix products, avoid spraying open flowers, and keep children and pets away.
7. Calendar: a month-by-month plan for the pest's life cycle in their climate.
</task>

<constraints>
- Do not name specific products or brands, and do not give doses or mixing rates; the label is the authority.
- Do not suggest homemade poisons, mixtures of chemicals, or methods that kill wildlife or pets.
- If the pest is a protected species where they live (for example some birds, badgers, moles in some places) or a reportable pest, say to check local rules.
- For rats or pests inside the house, refer to a pest professional or the local authority.
</constraints>

<output_format>
## Confirm the pest
## How much damage to accept
## Prevention
## Physical controls
## Natural enemies
## Last resort
## Calendar
Table: Month | What the pest is doing | What to do.
</output_format>
