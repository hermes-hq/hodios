---
schema: 1
id: build-bill-of-materials
kind: prompt
title: Build a bill of materials
description: Builds a structured bill of materials for a physical product - levels, part numbers, quantities, units, scrap allowance, suppliers, lead times and a cost roll-up - with the gaps to confirm.
category: operations
version: 1.0.0
status: incubating
stage: [plan, build]
role: [operations-manager, founder]
subject: [supply-chain]
inputs: [spec, notes, dataset]
output: [table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [bill-of-materials, bom, manufacturing, costing, components, lead-times, product-costing]
pairs_with:
  prompts: [calculate-product-margin, set-product-cost-target, plan-production-schedule, write-manufacturing-spec-sheet]
args:
  - name: product
    description: The product and how it is made or assembled, for example "flat-pack oak side table, two drawers, sold with fixings" or "200 ml soy candle in a glass jar with lid and label".
    type: text
    required: true
  - name: components
    description: What you know about the parts, materials, packaging and labour - quantities per unit, suppliers, prices, minimum order quantities and lead times. Rough notes are fine.
    type: text
    required: true
  - name: batch_size
    description: Optional. Typical production batch size, so setup costs and minimum order quantities can be spread correctly.
    type: number
  - name: currency
    description: Currency for costs.
    type: string
    default: USD
output_contract:
  format: markdown
  sections: [Structure, Bill of materials, Cost roll-up, Long lead and single-source items, Gaps to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a manufacturing engineer who sets up bills of materials (BOMs) for small brands and workshops. A BOM is the recipe for a product: every raw material, component, sub-assembly and packaging item, with the quantity needed for one finished unit. Common mistakes: forgetting packaging, labels, fixings, glue and consumables; mixing units (metres of fabric costed per roll, grams costed per kilo); leaving out scrap and yield loss, so the real cost and the material order are too low; no part numbers, so two suppliers' versions of "the same" screw get mixed; and a flat list that hides sub-assemblies, which makes building and costing harder. The BOM also drives purchasing, so it must show supplier, minimum order quantity and lead time for each line.
</context>

<task>
Build a bill of materials for this product.

<product>
{{product}}
</product>

<components>
{{components}}
</components>
{{#batch_size}}Typical batch size: {{batch_size}} units.{{/batch_size}}
Currency: {{currency}}

1. Structure: show the product structure as levels - level 0 the finished product, level 1 its main sub-assemblies and packaging, level 2 the parts of each sub-assembly. Use a simple indented tree. Add the items people forget (fixings, adhesives, labels, inserts, cartons, shipping cartons, instructions) and mark the ones you added as "suggested - confirm".
2. Bill of materials: one row per line with level, a simple part number scheme you propose (and explain it), description, quantity per finished unit, unit of measure, scrap or yield allowance %, supplier, unit cost, minimum order quantity and lead time. Convert units so quantity and cost use the same unit and show the conversion.
3. Cost roll-up: extended cost per line (quantity x (1 + scrap) x unit cost), material cost per unit, then labour and any setup costs. If a batch size is given, spread setup and one-off costs across the batch. Show totals and the arithmetic for at least one line.
4. Long lead and single-source items: list the lines that set the minimum lead time to make a batch and the lines with only one supplier, and what to do about each.
5. Gaps to confirm: list every missing quantity, price, lead time or specification, and what question to ask which supplier.
6. Check that every component in the input appears in the BOM and that the cost roll-up adds up.
</task>

<constraints>
- Never invent prices, lead times or supplier names; leave the cell blank or marked "to confirm" and list it under gaps. Scrap percentages you suggest must be labelled as typical assumptions.
- Keep units consistent; flag any line where the user's unit and the supplier's selling unit differ.
- Do not give safety, electrical or regulatory approval for the product's materials; if the product is for children, food contact, cosmetics or electrical use, note that materials may need compliance documents and testing to confirm.
</constraints>

<output_format>
## Structure
An indented tree.
## Bill of materials
Table: Level | Part no. | Description | Qty per unit | UoM | Scrap % | Supplier | Unit cost | MOQ | Lead time.
## Cost roll-up
Table: Part no. | Extended cost per unit, then totals for materials, labour, setup and cost per unit, with one worked line.
## Long lead and single-source items
Bullets: item - risk - action.
## Gaps to confirm
Table: Item | What is missing | Ask whom.
</output_format>
