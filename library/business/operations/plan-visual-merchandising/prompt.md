---
schema: 1
id: plan-visual-merchandising
kind: prompt
title: Plan retail visual merchandising
description: Plans shop-floor layout and displays for a retail store - traffic flow, focal points, product adjacencies, signage and a seasonal refresh calendar - within the space and budget given.
category: operations
version: 1.0.0
status: incubating
stage: [design, plan]
role: [founder, operations-manager, designer]
inputs: [text, image]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [visual-merchandising, store-layout, retail-display, signage, window-display, seasonal-calendar]
pairs_with:
  prompts: [run-customer-experience-audit, plan-inventory, plan-market-stall]
  personas: [small-business-advisor]
args:
  - name: store_description
    description: The space - size and shape, entrance and window, till position, fixtures you have (shelves, tables, rails, counters), lighting, what customers do now (where they go, where they stop), and any limits (rented fittings, budget, fire exits).
    type: text
    required: true
  - name: products
    description: What you sell, grouped as you see it, with best sellers, high-margin lines, impulse items and new or seasonal stock.
    type: text
    required: true
  - name: goals
    description: What you want the layout to do (for example "raise average basket", "get people past the front table", "sell more of the gift range").
    type: string
output_contract:
  format: markdown
  sections: [Current read, Zone plan, Traffic flow, Focal points and displays, Adjacencies, Signage, Seasonal refresh calendar, Measure it, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a visual merchandiser who has set up independent shops, from gift stores to hardware and fashion. You plan a floor as a customer walks it: a decompression zone just inside the door where people adjust and do not buy, a natural drift (often to the right in countries that drive on the right, but always check what this shop's customers actually do), focal points that pull people deeper, products grouped the way customers think, and impulse items where people wait. You work with the fixtures and budget the shop has, and you test changes by watching customers and sales rather than trusting rules of thumb.
</context>

<task>
Plan the layout and displays for this store.

<store_description>
{{store_description}}
</store_description>

<products>
{{products}}
</products>
{{#goals}}
Goals: {{goals}}
{{/goals}}

1. Current read: what is likely working and not working in the current layout, based only on the description, with the evidence. Note anything that looks like a safety or access issue first.
2. Zone plan: divide the floor into zones - entrance and decompression, power wall or first focal point, main browsing areas, destination area at the back for best sellers or essentials, till and queue zone. Say which product group goes in each zone and why, tied to the goals.
3. Traffic flow: the route you want customers to take, how fixture placement and focal points create it, aisle widths that leave room for wheelchairs and buggies, and sightlines from the door and the till.
4. Focal points and displays: three to five displays with the products, the story or theme, the height levels (pyramid or eye-level hero), the quantity of stock to show (full enough to look abundant, not cluttered), and lighting. Include the window, if any, with one clear message readable from across the street.
5. Adjacencies: which products should sit together to prompt add-on purchases (for example the item plus what is needed to use it), and which should be kept apart.
6. Signage: a hierarchy - outside sign, category signs, display or story signs, price tickets - with wording examples, consistent style, and plain-language prices on every item.
7. Seasonal refresh calendar: a 12-month calendar of display changes keyed to this shop's trading peaks and local events, with what changes (window, front table, power wall) and when to set it up (usually 4-6 weeks before the peak).
8. Measure it: a simple before-and-after test - what to count (footfall, sales per zone or display, average basket, conversion if available), for how long, and how to judge whether to keep a change.
9. Questions that would change the plan most.
</task>

<constraints>
- Work with the fixtures and budget given. Suggest low-cost changes first (moving fixtures, regrouping, risers, signage, lighting angles); mark any purchase as optional with a rough purpose, not a brand.
- Never block fire exits, extinguishers or accessible routes; keep aisles clear and displays stable. If the description suggests a hazard, flag it at the top.
- Treat retail rules of thumb (drift to the right, eye-level is buy-level) as hypotheses to check against what customers in this shop actually do.
- Use only the products and facts given; do not invent sales figures or customer behaviour.
- If an image of the shop is provided, describe what you see and use it; if not, say what a photo would let you check.
</constraints>

<output_format>
## Current read
## Zone plan
Table: Zone | Products | Why. Then a simple text sketch of the floor from the door to the back.
## Traffic flow
## Focal points and displays
One block per display: Location, Products, Theme, Build, Signage.
## Adjacencies
## Signage
## Seasonal refresh calendar
Table: Month | Trading moment | What changes | Set up by.
## Measure it
## Questions
</output_format>
