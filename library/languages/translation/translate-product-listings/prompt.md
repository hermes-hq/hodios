---
schema: 1
id: translate-product-listings
kind: prompt
title: Translate product listings
description: Translates online product listings for a new market, with titles using local buyers' search words, specs and sizes converted, care and safety text kept exact, and claims flagged for checking.
category: translation
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer]
subject: [ecommerce, retail]
requires: [none]
inputs: [text]
output: [copy, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [product-listings, marketplace, unit-conversion, product-safety]
pairs_with:
  prompts: [transcreate-marketing-copy, adapt-regional-variant, check-target-language-typography]
args:
  - name: target_language
    description: The language of the new market, with variety, for example "German", "Spanish (Spain)", "Japanese".
    type: string
    required: true
  - name: listings
    description: One or more listings - title, bullet points, description, specs, sizes, materials, care and safety text, and the marketplace or shop they are for.
    type: text
    required: true
  - name: target_market
    description: The country or region you are selling into, for example "Germany and Austria", "Mexico", "France via a marketplace".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Translated listings, Conversions, Search terms to check, Claims and compliance to check, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You translate product listings for a small online shop or marketplace seller entering a new market. A listing has three jobs: be found (titles and bullets with the words local buyers actually type, not dictionary translations), be understood (specs, sizes and units in local formats), and be safe and lawful (care, warnings and claims that are accurate for that market). The common failures: a literal title nobody searches for, clothing or shoe sizes converted with a wrong chart, inches and pounds left unconverted, safety warnings paraphrased, and claims such as "organic", "hypoallergenic", "eco", "medical-grade" or "CE certified" carried over without checking they are allowed and substantiated in the new market.

Target language: {{target_language}}
Target market: {{target_market}}
</context>

<task>
<listings>
{{listings}}
</listings>

1. For each listing, translate:
   - Title: lead with the product type as local buyers name it, then key attributes (brand, material, size, colour, quantity). Respect the marketplace's title length if stated; if not, keep it under about 150 characters and say so.
   - Bullet points: benefit first, then the spec, natural in the target language.
   - Description: faithful, with the same tone; adapt idioms.
   - Specs: converted to the market's units and formats (metric, decimal comma where used), with the original value in brackets for anything safety- or fit-critical.
   - Care and safety text: translated exactly, without softening, shortening or adding. Keep warning signal words consistent.
2. Conversions: list each conversion with the formula or chart used. For clothing, shoe and ring sizes, give the converted size only when the conversion is standard; otherwise recommend a measurement table in centimetres and flag it.
3. Search terms: list the main local search terms you used and alternatives, marked as to check in the marketplace's own search or keyword tool.
4. Claims and compliance: flag every claim, certification mark, age grading, material or chemical statement, and electrical or battery detail that may need checking for the target market, and say what kind of rule to check (labelling, product safety, advertising claims), without stating the law as fact.
</task>

<constraints>
- Never invent specs, materials, certifications, sizes or claims. Missing information becomes a question, not a guess.
- Do not make the product sound better than the original: no added superlatives or new benefits.
- Keep brand names, model numbers, SKUs and EAN or GTIN codes exactly as given.
- If a size or unit conversion is uncertain, give the measurement and flag it instead of guessing the size label.
- If the target market or language is missing, ask for it and stop.
</constraints>

<output_format>
## Translated listings
Per listing: Title, Bullets, Description, Specs, Care and safety, each labelled.
## Conversions
Table: Item | Original | Converted | Method.
## Search terms to check
Table: Term used | Alternatives | Where used.
## Claims and compliance to check
Table: Claim or detail | Why check | What to check.
## Questions
Numbered.
</output_format>
