---
schema: 1
id: plan-inventory
kind: prompt
title: Plan small-business inventory
description: Sets up inventory management for a small business - ABC classes, reorder points, safety stock, a counting routine and dead-stock handling, with the maths shown. For retailers and makers.
category: operations
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [founder, operations-manager, individual]
inputs: [dataset, text]
output: [table, plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [stock-control, reorder-point, safety-stock, abc-analysis, cycle-counting, dead-stock]
pairs_with:
  prompts: [plan-online-store, prepare-supplier-negotiation, write-sop]
  personas: [small-business-advisor]
args:
  - name: products_and_sales
    description: Your products or materials with unit cost, price, current stock and sales per week or month (a pasted table or export is ideal), plus any seasonality.
    type: text
    required: true
  - name: lead_times
    description: How long each supplier takes from order to delivery, how reliable they are, minimum order quantities and order costs. Leave empty if unknown.
    type: text
  - name: storage_limits
    description: Shelf, warehouse or cash limits on how much stock you can hold, and shelf-life or expiry constraints.
    type: text
output_contract:
  format: markdown
  sections: [Data check, ABC classes, Reorder settings, Order plan, Counting routine, Dead and slow stock, Weekly routine, Assumptions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You set up inventory control for small retailers, cafes, makers and online sellers who do not have an operations team. Stock is cash sitting on a shelf: too much ties up money and goes stale, too little loses sales and customers. You use simple, proven methods (ABC classification, reorder points with safety stock, cycle counts) that one person can run with a spreadsheet, and you show every calculation so the owner can maintain it.
</context>

<task>
Set up inventory management from this data.

<products_and_sales>
{{products_and_sales}}
</products_and_sales>
{{#lead_times}}
<lead_times>
{{lead_times}}
</lead_times>
{{/lead_times}}
{{#storage_limits}}
<storage_limits>
{{storage_limits}}
</storage_limits>
{{/storage_limits}}

1. Data check: confirm units, time period and currency; list missing or inconsistent data; state assumptions you must make (for example a default lead time of two weeks if none is given).
2. ABC classes: rank items by annual consumption value (annual units x unit cost). Class A is roughly the top 70-80% of value, B the next 15-20%, C the rest. Show the table with cumulative percentages. If there are more than 30 items, show the top 15 and summarise the rest by class.
3. Reorder settings for each A and B item (and C items where useful):
   - Average daily or weekly demand.
   - Safety stock. If demand variability data exists, use safety stock = z x standard deviation of demand over the lead time, with z of about 1.65 for a 95% service level on A items and about 1.28 for 90% on B and C items. If not, use a simple buffer such as 50% of lead-time demand and say it is a rule of thumb.
   - Reorder point = average demand during lead time + safety stock.
   - Order quantity: the larger of the minimum order quantity and the economic order quantity (EOQ = square root of 2 x annual demand x cost per order / annual holding cost per unit) when order and holding costs are known; otherwise a simple cover such as 4-6 weeks of demand, capped by storage, cash and shelf life.
4. Order plan: items at or below their reorder point now, what to order and the cash needed.
5. Counting routine: cycle counts by class (for example A monthly, B quarterly, C twice a year), how to count, how to record and investigate variances, and an annual full count if needed for accounts.
6. Dead and slow stock: items with no sales or very low turnover in the period; options for each (bundle, discount, return to supplier, donate, write off), and how to avoid repeats.
7. A short weekly routine for the owner.
</task>

<constraints>
- Show every formula with the numbers substituted so the owner can redo it in a spreadsheet. Round order quantities to sensible pack sizes.
- Never invent sales, costs or lead times; if a value is missing, state the assumption and mark it.
- Respect storage, cash and shelf-life limits; flag when a recommended order would exceed them and propose a split.
- Keep it runnable by one person in under an hour a week. Suggest a spreadsheet layout, not specialist software, unless the item count clearly needs it.
- Write-offs and stock valuation have accounting and tax effects; suggest the owner confirm treatment with their accountant.
</constraints>

<output_format>
## Data check
## ABC classes
Table: Item | Annual units | Unit cost | Annual value | Cumulative % | Class.
## Reorder settings
Table: Item | Avg weekly demand | Lead time | Safety stock | Reorder point | Order quantity. Then one worked example in full.
## Order plan
Table: Item | On hand | Reorder point | Order now | Cost. Total cash.
## Counting routine
## Dead and slow stock
Table: Item | Weeks of cover or last sale | Action.
## Weekly routine
Checklist.
## Assumptions
</output_format>
