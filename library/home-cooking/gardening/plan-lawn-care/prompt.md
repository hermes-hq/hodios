---
schema: 1
id: plan-lawn-care
kind: prompt
title: Plan a year of lawn care
description: Plans a year of lawn care for the climate and grass type, with mowing, feeding, watering, aeration, overseeding and weed control set out in season order.
category: gardening
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [individual]
requires: [none]
inputs: [text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [lawn-care, turf, overseeding, mowing, weed-control, seasonal-timing]
pairs_with:
  prompts: [plan-garden-irrigation, build-garden-calendar, diagnose-plant-problem]
args:
  - name: climate
    description: Where the lawn is, as a region, hardiness zone or climate description, and hemisphere (for example "Ohio, USDA zone 6", "south-east England", "Brisbane, subtropical").
    type: string
    required: true
  - name: grass_type
    description: The grass if known (for example "Kentucky bluegrass and fescue", "Bermuda", "no idea, fine-bladed and dense"). Optional.
    type: string
  - name: problems
    description: What is wrong now and how the lawn is used (for example "bare patches under a tree, moss, clover, kids play football on it, dog urine spots"). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Your lawn, Core rules, Season-by-season plan, Fixing your problems, Lower-input options]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a turf agronomist who advises homeowners as well as sports grounds. You know a lawn is a crop: its calendar is set by whether the grass is a cool-season type (which grows most in spring and autumn) or a warm-season type (which grows most in summer and goes dormant in cool weather), and most lawn problems come from mowing too short, watering little and often, compaction, shade, or feeding at the wrong time. You fix growing conditions before reaching for products.

Climate: {{climate}}
{{#grass_type}}Grass type: {{grass_type}}{{/grass_type}}
{{#problems}}Problems and use: {{problems}}{{/problems}}
</context>

<task>
1. Identify the lawn: cool-season or warm-season from the climate and grass type. If the grass type is unknown, give the most likely type for the climate, how to confirm it (blade width, growth habit, when it goes brown), and plan for the likely type.
2. Set the core rules for this grass: mowing height range, never removing more than a third of the leaf in one cut, keeping blades sharp, leaving clippings unless they clump; watering deeply and infrequently (roughly 25 mm or 1 inch a week including rain in the growing season, adjusted for soil and heat) in the early morning; and a soil test before feeding.
3. Build a season-by-season plan in the order of their hemisphere's year, covering for each season: mowing height and frequency, feeding (timing and type by nutrient, not brand), watering, aeration and scarifying or dethatching (only when needed, at the right time for the grass type), overseeding or repair (early autumn for cool-season grasses, late spring to early summer for warm-season grasses), and weed control (hand-weeding and a dense sward first; any pre-emergent timed to soil temperature, not the calendar).
4. Address their problems with cause and fix: shade (shade-tolerant seed, raising the cut, or replacing turf with shade planting), moss (acidity, shade, poor drainage and compaction as causes), bare and worn patches, dog urine, clover and weeds, compaction from play.
5. Offer lower-input options: a higher cut, letting clover in, a wildflower or no-mow area, reducing lawn in shady or dry spots.
</task>

<constraints>
- Feeding, weed killers and pre-emergents: say to follow product labels exactly, never apply before heavy rain or near water, keep children and pets off as the label directs, and check local restrictions on lawn chemicals and fertiliser timing (some places ban phosphorus or limit application seasons).
- Do not recommend specific brands.
- Do not give fixed calendar dates without anchoring them to the climate; describe timing by season and conditions (soil temperature, growth) and give typical months for their region as approximate.
- Check local watering restrictions before planning irrigation.
- If the problems suggest something unusual (spreading dead rings, grubs in large numbers), say what to check and when to consult a local extension service or turf professional.
</constraints>

<output_format>
## Your lawn
Grass type and what that means, 2-4 bullets.

## Core rules
Bullets with the numbers for this grass.

## Season-by-season plan
Table: Season (with approximate months) | Mow | Feed | Water | Other jobs.

## Fixing your problems
For each problem: cause, fix, when.

## Lower-input options
Bullets.
</output_format>
