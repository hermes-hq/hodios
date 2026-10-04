---
schema: 1
id: calculate-landed-cost
kind: prompt
title: Calculate the landed cost of imported goods
description: Calculates the per-unit landed cost of imported goods - product, freight, insurance, duty, import taxes and fees - for the chosen incoterm, then shows margin at the planned price and sensitivities.
category: operations
version: 1.0.0
status: incubating
stage: [plan]
role: [founder, operations-manager]
subject: [ecommerce]
requires: [none]
inputs: [dataset, notes]
output: [table, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [landed-cost, importing, incoterms, customs-duty, freight, margin]
pairs_with:
  prompts: [prepare-shipping-documents-checklist, model-unit-economics, design-pricing]
  workflows: [import-first-shipment-track]
args:
  - name: goods
    description: The product and order - description, quantity, unit price and currency, total weight and volume or carton count, and the tariff code if you know it.
    type: text
    required: true
  - name: origin
    description: Country and city or port the goods ship from.
    type: string
    required: true
  - name: destination
    description: Country and city or warehouse the goods are delivered to.
    type: string
    required: true
  - name: incoterm
    description: The incoterm on the supplier's quote, for example EXW, FOB, CIF or DDP, which decides which costs are already in the price.
    type: string
    default: FOB
  - name: quotes
    description: Optional. Freight, insurance, customs broker and delivery quotes, the duty rate if confirmed, exchange rate used, and any other fees.
    type: text
  - name: selling_price
    description: Optional. The planned selling price per unit, with currency and whether it includes sales tax or VAT.
    type: string
output_contract:
  format: markdown
  sections: [Inputs and assumptions, What the incoterm covers, Cost build-up, Landed cost per unit, Margin, Sensitivity, To confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help small importers work out what a product really costs once it is on their shelf. The supplier's unit price is often half the story: depending on the incoterm the buyer may also pay origin charges, export clearance, main freight, insurance, destination terminal charges, customs brokerage, import duty, import VAT or sales tax, inland delivery, bank and currency fees, and inspection or certification. Duty is a percentage of the customs value, and the customs value is calculated differently by country (some value goods including freight and insurance to the border, others on the transaction value without international freight), so the same rate can produce different amounts. Import VAT or GST is often recoverable for registered businesses, which affects cash flow more than cost.

Goods: {{goods}}
From: {{origin}}
To: {{destination}}
Incoterm: {{incoterm}}
{{#quotes}}
<quotes>
{{quotes}}
</quotes>
{{/quotes}}
{{#selling_price}}
Planned selling price: {{selling_price}}
{{/selling_price}}
</context>

<task>
1. If quantity or unit price is missing, ask for it and stop.
2. List inputs and assumptions, including the exchange rate used. Any cost without a quote becomes a named estimate the user should replace, shown as a range where it varies a lot (freight in particular).
3. Explain in a short table which costs are already in the supplier price under {{incoterm}} and which the buyer pays, and where risk passes.
4. Build the cost from supplier price to the destination door, line by line: origin charges, main freight, insurance, destination charges, brokerage, duty, import VAT or sales tax, inland delivery, finance and currency fees, other. For duty, use the confirmed rate if given; otherwise write the formula with `[DUTY RATE]` and, if helpful, an illustrative rate clearly labelled as illustrative. State which customs value basis you assumed for {{destination}}.
5. Allocate to units: by quantity, or by weight or volume if the shipment mixes products, and say which.
6. Show landed cost per unit with and without recoverable import VAT or GST.
7. If a selling price is given, show gross margin and markup per unit, after removing sales tax or VAT from the price if it is included, and the break-even price.
8. Run a sensitivity check: freight up 50%, duty at a different rate if the tariff code is uncertain, and the exchange rate moving 5% against the buyer.
9. List what to confirm and with whom: tariff code and duty rate with customs or a licensed broker, any trade agreement preference and the proof of origin it needs, anti-dumping or extra duties for the product and origin, and freight quotes valid for the shipping date.
10. Before writing the final version, recompute every total and per-unit figure and check that each line is counted once.
</task>

<constraints>
- Never present a duty rate, tax rate or freight price as confirmed unless the user supplied it. Label estimates and illustrative figures.
- Show the arithmetic so the user can replace any number and recompute.
- Keep currency consistent; convert once, at the stated rate.
- This is a costing aid, not customs advice; tariff classification is the importer's responsibility and should be confirmed.
</constraints>

<output_format>
## Inputs and assumptions
## What the incoterm covers
Table: Cost | In supplier price | Paid by you.
## Cost build-up
Table: Line | Basis | Amount | Confirmed or estimate.
## Landed cost per unit
## Margin
Omit if no selling price.
## Sensitivity
Table: Scenario | Landed cost per unit | Margin.
## To confirm
Bullets with who to ask.
</output_format>
