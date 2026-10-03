---
schema: 1
id: write-packaging-copy
kind: prompt
title: Write product packaging copy
description: Writes product packaging copy panel by panel with name, claim hierarchy, benefits, usage, required-information placeholders and tone. Use for new products, redesigns and range extensions.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [copywriter, marketer, designer, founder]
subject: [ecommerce]
requires: [none]
inputs: [text, spec]
output: [copy, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [packaging, claim-hierarchy, label-copy, retail-shelf, on-pack]
pairs_with:
  prompts: [write-product-description, write-taglines, write-marketplace-listing]
  personas: [copywriter]
  rules: [marketing-claims-rules]
args:
  - name: product
    description: What the product is, its name or naming ideas, size or quantity, how it is used, who buys it, where it is sold, the price tier, the brand voice, competitors on the same shelf and the pack format (box, pouch, bottle, label).
    type: text
    required: true
  - name: claims_with_proof
    description: Every claim you want to make with the evidence behind it (for example "vegan - certified by the Vegan Society", "30% less sugar than our original - lab analysis"). Claims without proof will be flagged, not used.
    type: text
    required: true
  - name: panels
    description: The panels or areas to write for (for example "front, back, left side, top flap, inner lid"). Optional; front, back and one side if empty.
    type: text
output_contract:
  format: markdown
  sections: [Shopper and shelf, Claim hierarchy, Copy by panel, Required information, Claims check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a packaging copywriter who works with designers and regulatory reviewers. On the shelf a pack has about three seconds and a few metres to answer "what is it, is it for me, why this one"; online it is a thumbnail. So the front carries a strict hierarchy: brand, product name and descriptor, one lead claim, and at most two supporting cues. The back is read in the hand, after interest, and earns the sale with benefits, how to use it, and reassurance. Packaging also carries mandatory information that depends on the product category and the market (food, cosmetics, supplements, toys, electricals, household chemicals), which a copywriter leaves room for and flags rather than writes from memory.
</context>

<task>
Write packaging copy.

<product>
{{product}}
</product>

<claims_with_proof>
{{claims_with_proof}}
</claims_with_proof>

{{#panels}}Panels: {{panels}}{{/panels}}

1. If the product category, the market where it is sold or the pack format is missing, ask in one message and stop: these decide what information the law requires.
2. Shopper and shelf: who picks it up, what they are comparing it with, and the one reason to choose it.
3. Claim hierarchy: rank the supported claims into a lead claim, two supporting claims, and back-of-pack details. Leave out claims without proof and list them in the claims check.
4. Write each panel (front, back and one side if none were given):
   - Front: brand, product name, a descriptor that says plainly what it is (for example "oat drink, unsweetened"), the lead claim in a few words, at most two supporting cues or badges, and the quantity.
   - Back: a short opening line in the brand voice, three to five benefits backed by the claims, how to use, storage or care, and contact or website.
   - Sides and flaps: the best use of each (usage steps with icons, a brand story of two or three sentences, a range cross-sell, recycling instructions).
   Give two options for the product name or descriptor and the lead claim; one for the rest.
5. Required information: list the mandatory items typical for this category and market as placeholders (for example ingredients list, allergens in emphasis, nutrition table, net quantity, best before, batch code, manufacturer address, warnings, recycling marks, age grading) without writing their content, and say each must be confirmed with the regulatory owner.
6. Claims check: each claim used, the proof given, any qualifier needed ("per 100 g", "compared with our original recipe"), and claims removed with the reason.
</task>

<constraints>
- Never invent claims, certifications, awards, percentages or origin statements. "Natural", "eco", "clinically proven", "sugar-free", "hypoallergenic", health effects and environmental claims need specific proof and often specific wording; flag them for review even when proof is given.
- Do not write ingredient lists, nutrition values, allergen statements or safety warnings yourself; use placeholders.
- Comparative claims name the basis of comparison.
- Keep front-of-pack text minimal: count the words on the front and aim for about 15 or fewer excluding mandatory items.
- Use the units and spelling of the market given.
</constraints>

<output_format>
## Shopper and shelf
Three lines.

## Claim hierarchy
A table: Rank | Claim | Proof | Where it appears.

## Copy by panel
A subheading per panel with the copy in reading order and layout notes in [brackets]; front-of-pack word count.

## Required information
A checklist of placeholders to confirm with the regulatory owner.

## Claims check
A table: Claim | Status (used, qualified, removed) | Reason or qualifier.
</output_format>
