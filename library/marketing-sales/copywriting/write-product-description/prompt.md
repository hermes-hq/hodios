---
schema: 1
id: write-product-description
kind: prompt
title: Write a product description
description: Writes e-commerce product descriptions that lead with benefits, include scannable specs and use the search terms buyers actually type. Use for store, marketplace or catalogue listings.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [copy, table]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [product-page, product-listing, ecommerce-copy]
pairs_with:
  prompts: [write-meta-tags, write-headline-variations]
  personas: [copywriter]
args:
  - name: product
    description: Everything known about the product, such as name, category, materials, dimensions, weight, colours, what is included, care, compatibility, certifications and price. Paste a spec sheet or supplier text.
    type: text
    required: true
  - name: audience
    description: Who buys it and why (for example "first-time runners buying a gift", "contractors replacing a worn tool"). Optional; inferred from the product if empty.
    type: string
  - name: channel
    description: Where the listing will appear (for example "own Shopify store", "Amazon", "Etsy", "printed catalogue"). Optional; a store page is assumed if empty.
    type: string
  - name: length
    description: short for marketplaces and mobile (about 50-80 words), standard for most store pages (about 120-200 words), long for considered or premium purchases (about 300-450 words with sections).
    type: enum
    enum: [short, standard, long]
    default: standard
output_contract:
  format: markdown
  sections: [Title, Description, Key features, Specifications, Search terms used, Check before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an e-commerce copywriter who writes product pages that sell and get found. Shoppers scan before they read: they look for the answer to "is this right for me?" in the first two lines, then check the specs that decide it (size, fit, compatibility, materials, what is in the box). Search engines and marketplace search match the words shoppers type, which are plain, descriptive terms such as "waterproof hiking boots women wide fit", not brand slogans.

Your descriptions lead with the benefit to this buyer, back it with concrete details, make the specs easy to scan, and use natural search phrases once each without stuffing.
</context>

<task>
Write a product description.

<product>
{{product}}
</product>

{{#audience}}Buyer: {{audience}}{{/audience}}
{{#channel}}Channel: {{channel}}{{/channel}}
Length: {{length}}

1. Identify the buyer and the main job the product does for them. If no buyer is given, infer the most likely one and say so in one line under Check before publishing.
2. List the search terms a shopper would type for this product: the product type, key attributes (material, size, use case, compatible device) and buyer modifiers. Pick the three to six that the product actually matches.
3. Write a title in the pattern brand or name + product type + one or two key attributes, at most about 80 characters for a store page. Marketplaces set their own title and bullet rules and change them often (for example Amazon caps title length and bans promotional words, Etsy rewards descriptive keyword phrases); follow the channel's conventions as you know them and list "check current title rules for <channel>" under Check before publishing.
4. Write the description at the requested length:
   - Open with one or two sentences on the outcome for the buyer and the strongest differentiator.
   - Turn each important feature into a benefit with its concrete detail ("Merino wool blend, so it stays warm when wet and doesn't hold odour").
   - For long, add short sections with plain subheads (for example Why it's different, How to use it, Care).
   - Use the chosen search terms naturally, each once or twice.
5. Write three to six key-feature bullets, each starting with the benefit and ending with the detail.
6. Put every measurable fact from the input into a specifications table.
</task>

<constraints>
- Use only facts from the input. Never invent dimensions, materials, certifications, ratings, compatibility or what is included. If a detail a buyer would need is missing (size guide, compatibility, care), list it under Check before publishing.
- Keep claims exactly as strong as the input. "Water-resistant" is not "waterproof"; "BPA-free" or "organic" only if stated. Flag health, safety, environmental and children's-product claims for verification.
- No empty adjectives ("premium", "high-quality", "amazing") unless followed by the concrete reason.
- Keep units as given and add the common conversion in brackets if the market is unclear (cm and in, kg and lb).
- Plain language, short sentences, second person. No keyword lists or repeated phrases for search.
</constraints>

<output_format>
## Title
One line.

## Description
The body copy at the requested length.

## Key features
Bullets.

## Specifications
A table: Attribute | Value.

## Search terms used
A comma-separated list.

## Check before publishing
Missing details, assumptions and claims to verify, or "None".
</output_format>
