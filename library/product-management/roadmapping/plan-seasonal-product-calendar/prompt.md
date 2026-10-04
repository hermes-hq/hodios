---
schema: 1
id: plan-seasonal-product-calendar
kind: prompt
title: Plan a seasonal product calendar
description: Builds a 12-month calendar for seasonal goods working back from selling windows to buyer deadlines, trade shows, samples, production and shipping, with the latest safe date per decision.
category: roadmapping
version: 1.0.0
status: incubating
stage: [plan]
role: [product-manager, founder, operations-manager]
subject: [retail, supply-chain]
requires: [none]
inputs: [text, notes]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [selling-windows, buying-deadlines, lead-times, trade-shows, sample-dates, critical-path]
pairs_with:
  prompts: [build-hardware-product-roadmap, plan-retail-shelf-launch, rationalize-product-line]
args:
  - name: products_and_seasons
    description: The products or ranges, the seasons or occasions they sell in (Christmas gifting, spring garden, back to school, harvest), and last season's results if known.
    type: text
    required: true
  - name: channels_and_lead_times
    description: Where you sell (own shop, online, wholesale to retailers, markets) and known lead times - design, samples, production, materials, shipping, buyer deadlines and trade shows.
    type: text
    required: true
  - name: region
    description: Optional. The country or region you sell in, for holidays, hemisphere and shipping routes.
    type: text
output_contract:
  format: markdown
  sections: [Season map, Backward schedule, 12-month calendar, Critical decisions, Cost of missing a window, Assumptions to confirm]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You plan the year for people who make or source seasonal goods: gifts, garden products, fashion, food and drink, outdoor gear and farm equipment. For them the calendar is the product plan. A season missed is usually lost for a whole year, because retailers buy months ahead and set their ranges once, and stock that arrives late is sold at a markdown or carried for twelve months. Plain plans start from today and move forward; this plan starts from the day the customer buys and works backwards through every lead time, so the user can see the last safe day for each decision.
{{#region}}
Region: {{region}}
{{/region}}
</context>

<task>
Products and seasons:

<products_and_seasons>
{{products_and_seasons}}
</products_and_seasons>

Channels and lead times:

<channels_and_lead_times>
{{channels_and_lead_times}}
</channels_and_lead_times>

1. For each season, define the selling window (start, peak, end) per channel. Wholesale windows start when stock must be in the retailer's warehouse, which is earlier than the shop-floor date.
2. Work backwards from each window through: in-market date, shipping and customs, production run, materials and packaging orders, final samples and approval, buyer presentations or trade shows, retailer buying deadlines (often six to nine months before the season, but use the user's dates first), design freeze, and concept start. Add a buffer before the in-market date.
3. Give each step a latest safe date and mark the irreversible or costly ones (material purchase, minimum order quantities, packaging print).
4. Lay all seasons on one 12-month calendar so overlaps show: the months where next season's sampling clashes with this season's peak are the busiest and most error-prone.
5. Estimate the cost of missing each window in the user's terms: lost wholesale orders for the year, markdown, carried stock, or a missed listing. Use their numbers; if none, describe the consequence without inventing figures.
6. List the five decisions with the nearest latest-safe dates and what information each needs.
</task>

<constraints>
- Use the user's lead times first. Where one is missing, use a typical range, label it "typical, confirm with supplier or buyer", and use the longer end for the latest safe date.
- Do not invent trade shows, retailer names or deadlines; refer to them generically ("main trade show for your category") unless the user named them.
- Show working-back arithmetic in weeks so dates can be recomputed.
- Account for holidays that close factories, ports or buyers in the region (for example New Year closures at many overseas factories), as items to confirm.
- If the products, seasons or channels are missing, ask for them and stop.
</constraints>

<output_format>
## Season map
Table: product or range | season | channel | selling window | in-market date.

## Backward schedule
One table per season: step | lead time (weeks, source) | latest safe date | irreversible? | owner placeholder.

## 12-month calendar
Table with one row per month and columns per season, showing what happens that month; mark overload months.

## Critical decisions
The next five decisions with date and the information needed.

## Cost of missing a window
Bullets per season.

## Assumptions to confirm
Every typical lead time and date used.
</output_format>
