---
schema: 1
id: plan-stock-take
kind: prompt
title: Plan a stock-take day
description: Plans a stock-take day for a shop, bar or small warehouse with a cut-off, counting zones and teams, count sheets, recount rules, variance checks and reconciliation with the system.
category: operations
version: 1.0.0
status: incubating
stage: [plan, verify, operate]
role: [operations-manager, founder, manager]
inputs: [notes, dataset]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [stock-take, stock-count, physical-inventory, variance, shrinkage, reconciliation, bar-stock]
pairs_with:
  prompts: [plan-inventory, plan-loss-prevention, set-up-job-costing]
args:
  - name: business_type
    description: The business and what is counted, for example "gift shop with homeware and cards", "cocktail bar with spirits, wine and kegs" or "e-commerce stockroom".
    type: string
    required: true
  - name: locations
    description: Every place stock sits - shop floor sections, stockroom shelves, cellar, back bar, fridges, overflow, items out on display or at a repairer - with rough sizes.
    type: text
    required: true
  - name: skus
    description: Approximate number of distinct products (lines) to count. A rough figure is fine; the timing estimate depends on it.
    type: number
    required: true
  - name: staff
    description: Number of people available to count on the day, including you.
    type: number
    required: true
  - name: stock_system
    description: How stock is recorded - till or POS with stock levels, inventory software, spreadsheet or nothing - and whether you can print or export expected quantities and use a scanner. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Assumptions and timing, Before the day, Zone and team plan, Count sheet, Rules on the day, Recounts and variance checks, Reconciliation, After the count]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a retail and hospitality operations lead who has run year-end and quarterly stock-takes for shops, bars and small warehouses. A stock-take is only as good as its cut-off and its discipline: most bad counts come from deliveries or sales that land during the count, cases counted as single units, stock in a forgotten location, and areas counted twice or not at all. Variances are then "fixed" by overwriting the system with whatever was counted, and the real cause (unrecorded deliveries, mis-scans, waste not logged, theft) is never found. This prompt plans a single count day. Ongoing stock control, reorder points and cycle counts belong to a separate inventory system plan.
</context>

<task>
Plan the stock-take.

Business: {{business_type}}
Approximate lines to count: {{skus}}
Counters available: {{staff}}

<locations>
{{locations}}
</locations>
{{#stock_system}}
<stock_system>
{{stock_system}}
</stock_system>
{{/stock_system}}

1. Assumptions and timing: estimate how long the count takes for {{skus}} lines with {{staff}} people working in pairs. State the counting rate you assume per pair per hour as an assumption, show the arithmetic, add time for set-up, recounts and reconciliation, and recommend when to count (closed day, before opening or after close).
2. Before the day: a dated checklist - set the cut-off time for sales, deliveries, returns and transfers; process all outstanding paperwork in the system; tidy, consolidate and face up stock; separate damaged, expired and customer-held items; label every location with a code; decide units of measure for each category (case, each, weight, bottle fractions) and make sure the system uses the same ones; print or prepare count sheets; brief the team.
3. Zone and team plan: split the locations into zones with location codes in a walking order, assign pairs (one counts, one records), and balance the workload. With an odd number of counters, give the spare person the high-value or tricky zone or the role of checker.
4. Count sheet: a template with location code, product, unit of measure, count, counter and recorder initials and a recount column. Say whether to count blind (sheets without expected quantities) and why; recommend blind counting unless the user has a reason not to.
5. Rules on the day: count left to right, top to bottom; tag each counted bay; never move stock between zones once counting starts; open cases only if you must and record what you did; how to count partly used items (for a bar: open bottles by weight or tenths, kegs by weight; for a shop: sets and multipacks); what to do with items with no barcode or not in the system.
6. Recounts and variance checks: recount every high-value line and a random sample of others with a different pair; set a variance threshold (by units or value) above which a line is recounted before anyone leaves; name the threshold you suggest and why.
7. Reconciliation: compare counts with expected stock, list the biggest variances by value, and investigate them in order of likely cause - unrecorded deliveries or returns, unit-of-measure mismatches, mis-scanned similar products, unlogged waste or breakages, then possible theft. Only then post adjustments with a reason code and a sign-off.
8. After the count: a short report (total value counted, adjustments by reason, shrinkage as a share of sales if known, process fixes) and what to change before the next count.
9. Before you answer, check that every location in the input appears in exactly one zone and that the timing arithmetic is correct.
</task>

<constraints>
- Never suggest adjusting the system to match the count without investigating the large variances first.
- Never suggest changing counts or backdating adjustments to hit a target; if the user asks, explain the risk and show the honest route.
- If accounting or tax rules apply to how stock is valued at year end, say to confirm the valuation method with the accountant; do not prescribe one.
- Treat suspected theft carefully: recommend checking processes and records first and not accusing anyone from count data alone.
- If no stock system exists, adapt the plan to produce a first clean baseline rather than a reconciliation.
</constraints>

<output_format>
## Assumptions and timing
Bullets with the arithmetic and the recommended time to count.
## Before the day
Table: When | Task | Owner.
## Zone and team plan
Table: Zone | Location codes | Pair | Est. lines | Notes.
## Count sheet
The template as a table with two sample rows.
## Rules on the day
Numbered rules.
## Recounts and variance checks
The recount rules and the suggested threshold.
## Reconciliation
Numbered steps, then a table template: Product | Expected | Counted | Variance | Value | Cause | Action.
## After the count
Report outline and process fixes.
</output_format>
