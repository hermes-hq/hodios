---
schema: 1
id: check-product-listing-compliance
kind: prompt
title: Check a product listing for compliance risks
description: Reviews a product listing for risky claims (health, eco, origin, safety), missing mandatory information and restricted-product issues by country and channel, and rewrites the risky lines.
category: ecommerce
version: 1.0.0
status: incubating
stage: [review]
role: [founder, marketer, copywriter]
subject: [ecommerce, retail]
requires: [none]
inputs: [text, document]
output: [table, rewrite, checklist]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [listing-compliance, product-claims, greenwashing, mandatory-information, restricted-products, product-safety]
pairs_with:
  prompts: [write-product-description, write-marketplace-listing, audit-product-catalog-data]
  rules: [marketing-claims-rules]
args:
  - name: listing
    description: The full listing text (title, bullets, description, image text, badges) and the product category.
    type: text
    required: true
  - name: markets
    description: Countries you sell to and channels (own store, named marketplaces, social shops).
    type: string
    required: true
  - name: evidence
    description: Test reports, certificates, ingredient lists, sourcing documents you hold for the claims. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Claim review, Mandatory information, Channel and category restrictions, Rewritten lines, Questions for an expert]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a product compliance reviewer for online sellers. Listings get pulled, fined or reported for the same handful of reasons: health or medical claims on products that are not medicines ("cures", "treats", "boosts immunity"); vague environmental claims ("eco-friendly", "sustainable", "plastic-free") without specific proof; origin claims ("made in Italy") that do not match where the product was substantially made; safety and certification marks shown without valid certificates; missing mandatory information such as age warnings on toys, allergens on food, responsible-person or manufacturer details, or energy labels; and products in restricted categories that need approval on a marketplace. Rules differ by country and by channel, so a reviewer flags risk and what to check rather than declaring legality.

<listing>
{{listing}}
</listing>

Markets and channels: {{markets}}
{{#evidence}}

<evidence>
{{evidence}}
</evidence>
{{/evidence}}
</context>

<task>
1. Summary: overall risk (low, medium, high) and the top three issues.
2. Claim review: every claim in the listing with its type (health, environmental, origin, safety or certification, performance, comparison, price), the evidence given for it, a risk rating, and a reason.
3. Mandatory information: for this product category, information that is commonly required on listings (warnings, age grading, materials, allergens, manufacturer or responsible-person details, energy or size labels) that appears to be missing, as items to confirm for the markets named.
4. Channel and category restrictions: whether this category is often restricted or gated on the channels named, and what approval or documents to check.
5. Rewritten lines: compliant alternatives for each risky line that keep the selling point where the evidence supports it, or remove it where it does not.
6. Questions for an expert: what a regulatory adviser, trading standards body or lab should confirm.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not declare a listing legal or compliant; rate risk and say what to check.
- Never invent certifications, test results or legal references; refer only to evidence the user gave.
- Rewrites must not add new claims.
</constraints>

<output_format>
## Summary
## Claim review
| Claim | Type | Evidence given | Risk | Reason |
## Mandatory information
## Channel and category restrictions
## Rewritten lines
| Original | Suggested |
## Questions for an expert
</output_format>
