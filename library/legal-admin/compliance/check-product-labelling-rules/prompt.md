---
schema: 1
id: check-product-labelling-rules
kind: prompt
title: Check what must go on a product label
description: Lists the mandatory label information for a food, cosmetic, textile, toy or electrical product in a given market, with layout and language rules, claims to avoid and gaps in your draft label.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [founder, operations-manager, designer]
subject: [law, retail, ecommerce]
requires: [none]
inputs: [text, image]
output: [checklist, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [product-labelling, packaging, allergen-labelling, cosmetics-labelling, mandatory-information, importers]
pairs_with:
  prompts: [plan-product-conformity-marking, draft-farm-produce-labels, build-allergen-matrix, check-advertising-claims]
args:
  - name: product
    description: What the product is (for example granola, face cream, children's T-shirt, phone charger, wooden toy), what it contains or is made of, how it is packed and sold (shop, online, wholesale), and who makes or imports it.
    type: text
    required: true
  - name: market
    description: The country or region where it will be sold, and where it is made if different.
    type: string
    required: true
  - name: current_label
    description: The text of your draft or current label, including any claims such as "natural", "vegan" or "hypoallergenic". Optional.
    type: text
output_contract:
  format: markdown
  sections: [Rules that apply, Mandatory information, Layout and language, Claims to check, Gaps in your label, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small producer or importer work out what a product label must say. Labelling rules depend on the product type and the market, and they are detailed. Food labels typically need the product name, an ingredients list in descending order with allergens emphasised, net quantity, a date mark (a "use by" for safety and a "best before" for quality are different things), storage conditions, the name and address of the responsible business, sometimes the country of origin, and often a nutrition declaration, with exemptions for some very small producers or loose foods. Cosmetics typically need the responsible person's name and address, ingredients in standard nomenclature, a batch number, a durability date or a period-after-opening symbol, the function if not obvious and any warnings. Textiles need fibre composition using standard fibre names. Electrical goods and toys typically need conformity marking, the manufacturer's and the importer's contact details, type or batch identification, ratings and safety warnings, and often a disposal symbol. Mandatory text usually has to be in the language of the market and legible, and some rules set minimum text sizes or require certain items in the same field of vision. Small sellers commonly miss the importer's address, emphasis of allergens, the right type of date mark, and the fact that words like "natural", "hypoallergenic", "detox" or health benefits are claims that need proof and may be restricted.

Market: {{market}}
</context>

<task>
Product:
<product>
{{product}}
</product>
{{#current_label}}

Current or draft label:
<label>
{{current_label}}
</label>
{{/current_label}}

1. Rules that apply: name the product category and the kinds of labelling rules that typically apply in this market (general food labelling, cosmetics, textiles, toy safety, electrical safety and so on), plus any that may apply because of how it is sold, such as online sales needing the same information before purchase. Name a specific law only when you are confident of it, and mark it "confirm current version".
2. Mandatory information: list each item that must appear, why, and whether it must be on the pack itself or can be on a leaflet, shelf label or website.
3. Layout and language: language requirements, legibility and minimum size rules, items that must appear together, and symbols that are required or must not be used without meeting a standard.
4. Claims to check: for every claim on the label or likely to be added, say whether it is regulated, what proof it needs, and safer wording or removal.
5. Gaps in your label: if a label was supplied, compare it item by item and list what is missing, wrong or risky. If no label was supplied, say so and give a blank label checklist instead.
6. Points to verify: what to confirm with the local trading standards, food safety or product safety authority, a trade association, or a labelling consultant, and any testing that must happen before a claim or marking can be used.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent regulation numbers, minimum font sizes, thresholds or exemptions. If you are unsure of a figure, describe the type of rule and mark it "confirm for {{market}}".
- Never suggest adding a conformity mark, organic logo or certification symbol the product has not earned through the required assessment or certification.
- If the product could be classed as a medicine, medical device, pesticide or food supplement because of its claims or ingredients, say so plainly and recommend specialist advice before sale.
- If allergens or safety warnings are missing, put that first, because those gaps can harm people.
{{> output/uncertainty}}
</constraints>

<output_format>
## Rules that apply
Bulleted list with the product category and the rule types.

## Mandatory information
Table: item | why it is required | where it must appear | notes.

## Layout and language
Bulleted list.

## Claims to check
Table: claim | regulated or not | proof needed | safer wording.

## Gaps in your label
Table: item | current label | problem | fix. Or a blank checklist if no label was given.

## Points to verify
Numbered list with who to ask.
</output_format>
