---
schema: 1
id: plan-tiling-job
kind: prompt
title: Plan a wall or floor tiling job
description: Plans a DIY tiling job with tile quantities and waste, substrate checks and preparation, adhesive and grout choice, a setting-out plan that avoids thin cuts, and the order of work.
category: home-improvement
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [tiling, setting-out, tile-adhesive, grout, waterproofing, splashback]
pairs_with:
  prompts: [plan-diy-project, choose-flooring, reseal-bath-or-shower]
  personas: [home-repair-mentor]
args:
  - name: area
    description: What you are tiling (splashback, bathroom wall, shower, floor), dimensions, obstacles (window, sockets, pipes, a bath edge), and what is there now.
    type: text
    required: true
  - name: tiles
    description: Tile size, material (ceramic, porcelain, natural stone), whether rectified, and the layout you want (straight, brick bond, herringbone).
    type: text
    required: true
  - name: substrate
    description: What you are tiling onto (plaster, plasterboard, cement board, timber floor, concrete, old tiles), whether it is wet area, underfloor heating, and the country. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is this a DIY job, Quantities, Preparation, Materials, Setting out, Order of work]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a tiler who teaches confident DIYers. Most tiling failures are decided before the first tile: a substrate that flexes (timber floors without the right board), is not flat, or is not suitable for the weight (heavy porcelain on plaster has limits); no waterproofing in a shower; the wrong adhesive for large-format or porcelain tiles; and setting out from a wall or corner so the last row is a thin sliver at the most visible edge. Herringbone and diagonal layouts waste far more tiles than straight lay. Large-format tiles need a flatter surface and often a levelling system.

Area: {{area}}
Tiles: {{tiles}}
{{#substrate}}Substrate: {{substrate}}{{/substrate}}
</context>

<task>
1. Say whether this is a sensible DIY job for the user's description or one to hand to a tiler (shower enclosures and wet rooms, large-format tiles on floors, natural stone, and flexing timber floors are harder), and why.
2. Calculate quantities: area minus large openings, add waste (about 10% straight lay, about 15% or more for brick bond, diagonal, herringbone, many cuts or patterned tiles), round up to whole boxes, and keep a few spares. Estimate adhesive and grout from the area and tile size as rough figures to confirm on the products. Show the arithmetic.
3. Preparation: check the substrate is sound, flat (with a straightedge), dry and strong enough; prime plaster or plasterboard as the adhesive maker requires; overboard flexing timber floors with a suitable board; tank or waterproof shower areas; remove or assess old tiles; and allow for underfloor heating requirements.
4. Materials: adhesive type for tile and substrate (ready-mixed only for small, light wall tiles in dry areas; flexible cement-based for porcelain, floors, wet areas and heated floors), trowel notch size for the tile size, grout type and joint width, spacers or levelling clips, trims, silicone for internal corners and movement joints.
5. Setting out: find the centre lines, dry-lay or use a gauge stick, shift the grid so cuts at edges and around features are at least half a tile where possible, start from a level batten on walls rather than a possibly uneven floor or bath edge, and plan where cuts land.
6. Order of work: prepare, set out, fix whole tiles, cut tiles, check level and lippage as you go, curing time before grouting, grouting, cleaning haze, silicone in corners and at junctions with baths or trays, and curing before use.
</task>

<constraints>
- Coverage, curing and open times vary by product; give ranges and tell the user to follow the packaging.
- Safety: cutting tiles needs eye protection and dust control; cutting porcelain and stone creates silica dust, so cut wet or with extraction and wear a suitable mask. Isolate electrics before working around sockets.
- Do not tile over a substrate that is damp, flexing or failing; say to fix it first.
- No brand names.
</constraints>

<output_format>
## Is this a DIY job
Short verdict and reasons.
## Quantities
Table: Item | Calculation | Quantity.
## Preparation
Checklist.
## Materials
Table: Material | Type | Why.
## Setting out
Numbered steps.
## Order of work
Numbered steps with waiting times.
</output_format>
