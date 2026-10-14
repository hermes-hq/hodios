---
schema: 1
id: store-seasonal-items
kind: prompt
title: Store seasonal clothes and bedding
description: Plans how to pack away out-of-season clothes, bedding, coats and holiday items so they come out clean and undamaged, with cleaning first, moth and damp prevention, containers, labels and location.
category: housekeeping
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [seasonal-storage, clothes-moths, damp-prevention, storage]
args:
  - name: items
    description: What you are putting away (for example "winter coats, wool jumpers, duvets, ski gear, children's clothes to keep for a sibling, Christmas decorations"), roughly how much, and the materials if you know them.
    type: text
    required: true
  - name: space
    description: Where you could store things (under the bed, top of a wardrobe, loft, garage, cellar, a storage unit) and what those spaces are like (damp, hot, cold, dusty, mice). Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before packing, How to pack each type, Where to store it, Moth and damp prevention, Labels and inventory, When you unpack]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a textile care specialist and professional organiser. Stored items are ruined by a few things: storing them dirty (body oils and food traces attract moths and set stains), storing them damp or in damp places (mould, mildew and smells), airtight plastic in places that swing in temperature (condensation), heat and light in lofts (yellowing and brittle fibres), pests in garages and cellars, and crushing down jackets or structured coats. You clean, dry and edit first, pick the container to the item and the place, and label so nothing is bought twice.

Items: {{items}}
{{#space}}Space: {{space}}{{/space}}
</context>

<task>
1. Before packing: edit (let go of what was not used this season or no longer fits, with outgrown children's clothes sorted by size to keep or pass on), then wash or clean everything following care labels, mend what needs it, and make sure it is completely dry.
2. How to pack each type: wool and cashmere folded in breathable cotton bags or lidded boxes; down and synthetic duvets and jackets loosely in breathable bags, not compressed long term; structured coats hung on shaped hangers in breathable covers; leather breathable and away from heat; children's clothes by size in labelled boxes; decorations wrapped by fragility. Say where vacuum bags are fine and where they damage items.
3. Where to store it: rank the available spaces by suitability for each item (cool, dry, dark and stable is best), with what to do about a damp cellar, a hot loft or a garage with pests (raised off the floor, sealed hard boxes, kept away from walls).
4. Moth and damp prevention: clean storage, cedar or lavender as mild deterrents (with their limits), sealed containers for wool only where moths are a known problem and the items are clean and fully dry, a check every few months, and moisture absorbers or a dehumidifier for damp spaces.
5. Labels and inventory: label each box by contents and size or season, and keep a simple list or photo record of what is where.
6. When you unpack: air items, check for moths and damp before mixing with current clothes, and wash or freeze anything suspect per its care label.
</task>

<constraints>
- Follow care labels for cleaning; do not suggest washing dry-clean-only items at home.
- Do not recommend mothballs or chemical moth products as a default; if mentioned, note they are toxic to children and pets and must be used exactly per the label and kept out of reach, and that items need airing afterwards.
- Do not suggest storing items near boilers, flues, heaters or anything blocking access to them, or blocking escape routes and loft hatches.
- Do not name brands.
</constraints>

<output_format>
## Before packing
## How to pack each type
Table: Item | Clean first | Container | Notes.
## Where to store it
## Moth and damp prevention
## Labels and inventory
## When you unpack
</output_format>
