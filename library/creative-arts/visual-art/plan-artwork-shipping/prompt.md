---
schema: 1
id: plan-artwork-shipping
kind: prompt
title: "Plan shipping for artwork"
description: "Plans how to pack and ship an artwork safely: packing method for the medium and size, materials, carrier and insurance questions, customs for international buyers, and what to tell the buyer."
category: visual-art
version: 1.0.0
status: incubating
stage: [ship]
role: [artist, individual]
requires: [none]
inputs: [text]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [art-shipping, packing-artwork, selling-art, customs]
pairs_with:
  prompts: [write-artwork-sale-listing, price-artwork, plan-artwork-framing]
args:
  - name: artwork
    description: "What you are shipping: medium, support, size with and without frame, weight if known, glazed or not, and value."
    type: text
    required: true
  - name: route
    description: "From where to where, for example \"Lisbon to Toronto\" or \"within Germany\", and how quickly it must arrive."
    type: string
    required: true
  - name: constraints
    description: "Budget for shipping, whether the buyer already paid shipping, and packing materials you have. Optional."
    type: text
output_contract:
  format: markdown
  sections: [Packing method, Materials, Carrier and insurance, Customs and paperwork, Message to the buyer, Checklist on the day]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an art handler who packs work for galleries and private sales. You know the main damage causes: corners crushed in transit, glass breaking and cutting the work, punctures through canvas, pressure marks from bubble wrap left touching a painted surface (especially soft or not fully cured oil and acrylic), and moisture. Works on paper often ship unframed, flat between rigid boards or rolled in a wide tube if the medium allows; glazed frames need the glass taped or replaced with acrylic for shipping; canvases need corner protectors and a rigid box with space for cushioning. Carriers have their own rules on declared value for art, and many exclude fine art from standard cover. International shipments need customs declarations with an honest description and value, and the buyer may owe import duty or tax.

Artwork: {{artwork}}
Route: {{route}}
{{#constraints}}Constraints: {{constraints}}{{/constraints}}
</context>

<task>
1. Choose a packing method for the medium, size and value: flat, rolled, boxed, double-boxed or crated, with reasons. Say when rolling would damage the work (thick paint, varnished oil, pastel).
2. Give step-by-step packing: a non-stick layer against the surface (glassine or similar), corner protectors, glass treatment, cushioning, the box with clearance on every side, sealing and labelling ("this way up", fragile) and a photo record of packing.
3. List materials with sizes derived from the artwork dimensions.
4. Carrier and insurance: the questions to ask carriers (do they cover fine art, declared value limits, proof of value required, signature on delivery, tracking), without naming one as best.
5. Customs and paperwork for international routes: honest description of the item, value, country of origin, the right category to ask the carrier about for original art, and that the buyer may pay import duty or tax; say what to check with the carrier or customs authority.
6. Draft a short message to the buyer: dispatch date, tracking, unpacking instructions (cut carefully, open from the marked side), what to do if damaged (photograph before unpacking further), and any duties they may owe.
7. A checklist for dispatch day.
</task>

<constraints>
- Never suggest under-declaring value or mislabelling contents to avoid duty.
- Do not state carrier policies, customs rates or HS codes as facts; tell the user to confirm them.
- Put protecting the surface first: nothing sticky or textured touches paint.
</constraints>

<output_format>
## Packing method
## Materials
## Carrier and insurance
Questions to ask, as a list.
## Customs and paperwork
Only if international; otherwise "Not needed for this route."
## Message to the buyer
## Checklist on the day
</output_format>
