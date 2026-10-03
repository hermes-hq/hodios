---
schema: 1
id: design-packaging
kind: prompt
title: Plan product packaging design
description: Plans product packaging with the brand's role, shelf and online impact, information hierarchy, mandatory label items to verify, materials, and three concept directions to brief a designer.
category: graphic-design
version: 1.0.0
status: incubating
stage: [plan, design]
role: [graphic-designer, designer, founder, marketer]
requires: [none]
inputs: [text, document]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [ecommerce]
tags: [packaging-design, shelf-impact, labelling, sustainable-packaging, consumer-goods]
pairs_with:
  prompts: [write-design-brief, create-mood-board, prepare-print-files, build-brand-guidelines]
  personas: [art-director, brand-strategist]
args:
  - name: product_and_brand
    description: The product (category, variants, size, price point, what is inside), the brand and its existing identity, the target buyer, competitors, the markets it will be sold in, budget and quantities, and any sustainability goals.
    type: text
    required: true
  - name: retail_context
    description: Where and how it is sold - supermarket shelf, boutique, pharmacy, online only, subscription box, marketplace - and how it is displayed or shipped. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Packaging role, Buyer and moment of choice, Shelf and online impact, Information hierarchy, Mandatory label items to verify, Structure and materials, Concept directions, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a packaging design director for consumer goods. Packaging must win a choice made in seconds, at a distance on a shelf or as a small image on a phone, then inform, protect, comply and be thrown away or reused responsibly. Packs fail when they look beautiful up close but disappear at two metres, when variants are indistinguishable, when every claim is shouted so none stands out, when legally required information is squeezed in at the end, and when a material choice blows the budget or cannot be recycled where the product is sold.
</context>

<task>
<product_and_brand>
{{product_and_brand}}
</product_and_brand>
{{#retail_context}}

Retail context: {{retail_context}}
{{/retail_context}}

If the product category, the markets or where it is sold is missing, ask for them and stop: they decide the label rules, structure and hierarchy.

1. **Packaging role.** Where this pack sits in the brand architecture (hero product, range member, sub-brand, limited edition), and what it must do for the brand: build recognition, signal premium, signal value, recruit new buyers or reassure loyal ones.
2. **Buyer and moment of choice.** Who chooses, where, how fast, and what they compare it with. The single message the front must land first.
3. **Shelf and online impact.** How it stands out among the competitors named (colour block, shape, type scale, a distinctive brand asset), how variants are told apart (colour coding, numbering, consistent layout), a blink test (recognisable brand and variant in about three seconds from two metres), and how the front reads as a small e-commerce thumbnail. Note shelf-ready or display packaging needs if relevant.
4. **Information hierarchy.** Front panel order (brand, product name, variant, key benefit, one proof point), what goes on the back and sides, and what to cut. Every claim must be one the company can substantiate.
5. **Mandatory label items to verify.** A checklist of items commonly required for this product category in the stated markets (for example legal product name, net quantity, ingredients and allergens, nutrition information, date marking, batch or lot code, business name and address, country of origin, usage warnings, safety or conformity marks, recycling and disposal marks, barcode). Mark each "verify with a regulatory specialist for each market", note where requirements differ by market or language, and do not state the exact legal wording, minimum type sizes or symbols unless you are certain.
6. **Structure and materials.** Pack format options suited to the product, protection and shipping needs, unboxing for direct-to-consumer, material options with their recyclability where sold, recycled content, and void fill; print process and finishes with cost implications (for example digital print for short runs, foils and embossing as costly extras); minimum order quantities as a question for suppliers.
7. **Concept directions.** Three distinct directions. For each: name, the core idea in one sentence, visual approach (colour, typography, imagery or illustration, use of the brand mark), how it handles variants, structure or material idea, why it would win at shelf, and its main risk.
8. **Next steps.** Dielines from the converter or printer, first mock-ups at real size, a shelf test against competitors (physical or a photographed shelf), an online thumbnail test, and regulatory sign-off before final artwork.
</task>

<constraints>
- Do not claim that any design or label is legally compliant; the team must confirm with a regulatory specialist or the relevant authority in each market.
- Do not invent product claims (organic, clinically proven, recyclable); use only claims from the input, and flag any that need substantiation or certification.
- Sustainability statements must be specific and true for the markets sold in; avoid vague "eco-friendly" wording.
{{> output/uncertainty}}
</constraints>

<output_format>
## Packaging role
## Buyer and moment of choice
## Shelf and online impact
## Information hierarchy
| Panel | Content, in order |
## Mandatory label items to verify
Checklist with a market note per item.
## Structure and materials
| Option | Pros | Cons | Recyclability where sold | Cost note |
## Concept directions
### Direction 1: name
## Next steps
</output_format>
