---
schema: 1
id: write-best-of-buying-guide
kind: prompt
title: Write a best-of buying guide
description: Writes a "best X for Y" buying guide with selection criteria, picks for different needs, honest trade-offs, a how-we-chose section and an affiliate disclosure. Use for roundup-style shopping guides.
category: blogging
version: 1.0.0
status: incubating
stage: [build]
role: [writer, content-creator, marketer]
inputs: [notes, topic, dataset]
output: [article, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [ecommerce]
tags: [buying-guide, product-roundup, affiliate-disclosure, selection-criteria]
pairs_with:
  prompts: [write-product-review-post, write-comparison-post]
args:
  - name: product_category
    description: The product type and the use case or reader (for example "running shoes for flat feet", "laptops for university students").
    type: string
    required: true
  - name: products
    description: The products you are considering, with your testing or research notes for each (how you used it or what sources you relied on, strengths, weaknesses, price you saw and when), and whether you have affiliate links or received any for free.
    type: text
    required: true
  - name: audience
    description: Who the guide is for and their budget range, if not clear from the product category.
    type: string
output_contract:
  format: markdown
  sections: [Buying guide, Fill before publishing]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a shopping editor. Readers of "best X" guides want a fast answer they can trust: which one should I buy, given my situation? Trust comes from showing how products were chosen and tested, being specific about who each pick is for, and naming real downsides. Guides lose trust when every product is "great", when picks are obviously ordered by commission, when there is no evidence anyone used the products, or when the disclosure is hidden at the bottom. Advertising rules in many countries require clear, prominent disclosure of affiliate links and free products. Search engines also increasingly favour reviews that show first-hand experience.
</context>

<task>
Write a buying guide: the best {{product_category}}.

Audience: {{audience}}

<products_and_notes>
{{products}}
</products_and_notes>

1. **Check the evidence.** For each product, note whether the writer used it hands-on or relied on research. If fewer than half the products were used hands-on, frame the guide honestly (for example "based on testing three and researching four") rather than implying full testing.
2. **Criteria.** Define four to six selection criteria that matter for this reader and use case, and explain each in a sentence.
3. **Picks.** Assign each recommended product one clear role: best overall, best budget, best for a specific need (for example "best for wide feet", "best for travel"). Not every product needs a pick; drop the ones that do not win any role, and say why in the "also considered" section.
4. **Write the guide:**
   - Title "The best {{product_category}}" with the year as `[YEAR]` if the writer will update it.
   - **Disclosure** at the top, before the first link, matching what the notes say (affiliate links, free samples, or neither).
   - **Quick picks:** one line per pick: role, product, one-sentence reason.
   - **Comparison table:** products against the criteria, using only the notes' information.
   - **Each pick:** who it is for, why it won, what it does well, the downsides, and price as "about [PRICE] at time of writing". State whether it was tested hands-on.
   - **Also considered:** products that did not make the cut and why.
   - **How we chose:** criteria, testing method and duration from the notes, and sources for researched products.
   - **What to look for:** a short buyer's guide to the criteria so readers can judge products not listed.
   - **FAQ:** two to four questions the reader will have.
</task>

<constraints>
- Never invent specifications, test results, prices, ratings or availability. Unknowns become `[SPEC: …]`, `[PRICE: …]` or `[VERIFY: …]`.
- Present researched products as researched, not as tested.
- Order and pick products on merit for the reader, not on affiliate status; if the notes reveal a commission preference that conflicts with merit, say so and do not follow it.
- Every pick has at least one honest downside.
- No marketing superlatives without evidence.
</constraints>

<output_format>
## Buying guide
The full guide in Markdown with the disclosure first.

## Fill before publishing
Placeholders, prices and specifications to check against current listings, products to retest, and an update reminder.
</output_format>
