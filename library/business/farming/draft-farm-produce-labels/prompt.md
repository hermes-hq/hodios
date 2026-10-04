---
schema: 1
id: draft-farm-produce-labels
kind: prompt
title: Draft farm produce labels
description: Drafts label content for eggs, honey, jam, cheese, meat or juice from a small farm producer - name, weight, allergens, dates, storage, producer - each marked as a rule to verify locally.
category: farming
version: 1.0.0
status: incubating
stage: [build, verify]
role: [founder, individual]
subject: [agriculture, retail]
requires: [none]
inputs: [notes, text]
output: [copy, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [food-labelling, allergens, date-marks, small-producer, direct-selling]
pairs_with:
  prompts: [price-farm-gate-produce, plan-freezer-meat-boxes, prepare-for-food-safety-inspection]
args:
  - name: product
    description: The product and pack, for example "wildflower honey, 340 g jar", "raspberry jam, 227 g", "free-range eggs, box of 6", "raw milk cheese, cut wedges".
    type: string
    required: true
  - name: country
    description: Country where it is sold, since labelling law differs by country and region.
    type: string
    required: true
  - name: sale_route
    description: Optional. Where and how it is sold - farm gate, honesty box, market stall, local shops, online with delivery - since some small direct sales have different rules.
    type: text
  - name: product_details
    description: Optional. Recipe or ingredients with amounts, how it is made, shelf life tested, storage, producer name and address, any registration or approval numbers, and claims you want to make (organic, local, free-range).
    type: text
output_contract:
  format: markdown
  sections: [Label draft, Element check, Claims, Layout notes, Rules to verify, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small farm producer draft label content they can then check against local rules. Small producers' labels most often go wrong on the same items: allergens not emphasised in the ingredients list; "use by" (safety) confused with "best before" (quality); net quantity missing or in the wrong place; a product name that implies something it is not (honey "blend", "jam" with too little fruit for the legal name); claims such as "organic", "free-range" or "local" used without meeting the rules; and producer details missing. Some products have extra rules (eggs, honey, meat, dairy and raw milk products), and some small direct sales may be exempt from parts of the rules in some countries. Every element must be verified locally; your job is a complete, well-organised draft and a clear list of what to check.

Product: {{product}}
Country: {{country}}
{{#sale_route}}Sale route: {{sale_route}}{{/sale_route}}
</context>

<task>
{{#product_details}}
<product_details>
{{product_details}}
</product_details>
{{/product_details}}

1. Draft the label text in the order a label usually carries it: product name (the legal or customary name, plus any descriptive name), ingredients in descending order by weight with allergens emphasised (bold), quantity of key ingredients where named in the title, net quantity, date mark (use by or best before, and which applies and why), storage and use instructions (including after opening and freezing), producer or packer name and address, lot or batch code, and country or place of origin where relevant.
2. Add product-specific elements to check: eggs (class, farming method, egg and pack marks, best before, storage advice), honey (origin, blend wording), jam and preserves (fruit and sugar content wording), cheese and dairy (raw milk statement, approval or health mark), meat (species, cut, approval mark, cooking advice), juice (pasteurisation, from concentrate or not).
3. Check every claim against what the producer said; list the evidence or certification each claim needs.
4. Note whether the sale route might change what is required (for example loose sales, sales direct to the final consumer, or online sales needing information before purchase), as questions to check.
5. Give layout notes: minimum legible font size to check, what must appear in the same field of view, durable and water-resistant labels for chilled products.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not present any legal requirement, exemption, font size or wording as definitive; mark each element `[VERIFY with the food authority in {{country}}]` or similar.
- Never invent ingredients, weights, shelf lives, approval numbers or addresses; use `[ADD]` placeholders.
- Do not set a shelf life or date mark from guesswork; say it must come from the producer's own testing or guidance from the food authority or a food safety adviser.
- If the product or country is missing, ask and stop.
</constraints>

<output_format>
## Label draft
The label text as it would appear, in a code block, with `[ADD]` placeholders.

## Element check
Table: element | draft text | why it is there | status (given / placeholder) | verify with.

## Claims
Table: claim | allowed if | evidence needed.

## Layout notes
Bullets.

## Rules to verify
Checklist of questions for the local food authority or trading standards body.

## Questions
Missing details to add.
</output_format>
