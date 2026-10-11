---
schema: 1
id: write-amazon-a-plus-content
kind: prompt
title: Write Amazon A+ content
description: Writes Amazon A+ (enhanced brand) content module by module, with image briefs, alt text, a comparison chart and a check against the content rules that get A+ rejected.
category: ecommerce
version: 1.0.0
status: incubating
stage: [build]
role: [founder, marketer, copywriter]
subject: [ecommerce]
requires: [none]
inputs: [spec, text]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [amazon, a-plus-content, enhanced-brand-content, comparison-chart, image-briefs, product-listing]
pairs_with:
  prompts: [write-marketplace-listing, brief-product-image-set, write-product-range-comparison]
  personas: [copywriter]
args:
  - name: product_details
    description: What the product is, the main reasons people buy it, specifications, materials, what is in the box, proof you hold (tests, certificates), and the top questions or complaints from reviews.
    type: text
    required: true
  - name: brand
    description: The brand name, what it stands for in one or two sentences, and the tone it uses.
    type: text
    required: true
  - name: other_products
    description: Your other products that could go in a comparison chart, with the two or three attributes that tell them apart. Optional.
    type: text
  - name: tier
    description: basic (standard A+, up to about five modules) or premium (premium A+, if your account is eligible).
    type: enum
    enum: [basic, premium]
    default: basic
output_contract:
  format: markdown
  sections: [Module plan, Module copy, Image briefs and alt text, Comparison chart, Rule check, Information still needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write Amazon A+ content (the brand modules below the bullets) for brand-registered sellers. A+ is a conversion tool, not a ranking tool: do not treat its text as a place for keywords, because shoppers mostly see it on a phone as a stack of images, and text baked into images must be readable at phone size. Its job is to answer the questions that stop a purchase (does it fit, will it last, which version do I need, why this brand) and to keep shoppers inside your brand through a comparison chart that links your other products.

Good A+ follows a story: the main promise, the two or three differentiators with proof, how it is used, specifications or sizing, and the range comparison. Each module carries one idea.

A+ is reviewed before publishing and rejections are common. The rules that trip sellers most often: no prices, discounts, promotions or shipping claims; no time-sensitive words ("new", "this season"); no guarantees or warranty promises unless the marketplace allows them in that field; no customer reviews or star ratings quoted; no claims of being "best", "number one" or a best seller; no references to competitors; no links, contact details or off-Amazon calls to action; no unproven health, environmental or safety claims. Module types and image sizes change, so you name module types generically and tell the seller to match the current module specifications in Seller Central.
</context>

<task>
Write {{tier}} A+ content for this product.

<product_details>
{{product_details}}
</product_details>

<brand>
{{brand}}
</brand>

{{#other_products}}
<other_products>
{{other_products}}
</other_products>
{{/other_products}}

1. If the details do not say what the product is, its key specifications, or why someone would choose it over alternatives, ask for those in one message and stop.
2. Plan the modules in order (five for basic, up to seven for premium): a header that states the main promise, differentiator modules each tied to a piece of proof, a usage or "how it works" module, a specifications or sizing module, and a comparison chart if other products were given. Say what question each module answers.
3. Write the copy for each module: a headline of a few words and body text of one to three short sentences. Keep text that will sit on images to a few words.
4. Write an image brief per module: what the image shows, the text overlay if any, the angle or setting, and what it proves. Write alt text for each image that describes the image plainly and uses natural product terms.
5. Build the comparison chart: this product and the others as columns, four to six rows of attributes shoppers decide on, with facts only from the input.
6. Check every line against the rules in the context and fix or remove anything that breaks them. List what you removed and why.
</task>

<constraints>
- Use only facts and proof from the input. Do not invent test results, materials, certifications, awards or review quotes.
- No prices, promotions, shipping promises, time-sensitive words, superlatives, competitor names, links or contact details.
- No keyword stuffing in copy or alt text; write for a shopper on a phone.
- Do not state exact pixel sizes or module names as current fact; tell the seller to confirm them in the module builder.
- If a claim needs proof that was not supplied (a health, safety, eco or durability claim), leave it out and list it under information still needed.
</constraints>

<output_format>
## Module plan
A table: Order | Module type | Question it answers | Proof used.

## Module copy
One subsection per module with headline and body text.

## Image briefs and alt text
A table: Module | What the image shows | Overlay text | Alt text.

## Comparison chart
The chart as a table, or "Not included" with the reason.

## Rule check
A checklist of the rules applied, then anything removed or softened and why.

## Information still needed
Proof, specifications or assets to collect. "None" if complete.
</output_format>
