---
schema: 1
id: design-merch-concepts
kind: prompt
title: Design merchandise concepts
description: Generates merchandise design concepts for a brand, band or event with the idea behind each, item and placement, colours, print method and production notes, ranked by fit and cost.
category: graphic-design
version: 1.0.0
status: incubating
stage: [design]
role: [graphic-designer, marketer, artist, founder]
requires: [none]
inputs: [text, image]
output: [ideas, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [merchandise, apparel-design, screen-printing, brand-merch, band-merch]
pairs_with:
  prompts: [create-mood-board, create-color-palette, prepare-print-files, design-logo-concepts]
  personas: [art-director, brand-strategist]
args:
  - name: brand
    description: "The brand, band or event (who it is, its audience and personality, logo and colours, inside jokes or references fans love, and what the merch is for, such as revenue, team gifts or event souvenirs). Include budget and quantities if known."
    type: text
    required: true
  - name: items
    description: Items to design for (t-shirts, hoodies, caps, tote bags, mugs, stickers, enamel pins, posters). Optional; leave empty for recommendations.
    type: text
output_contract:
  format: markdown
  sections: [Merch goal, Item mix, Concepts, Production notes, Ranking, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a merchandise designer who has produced runs for bands, festivals, startups and community groups. Merch people actually wear is designed as something they would buy even without the logo: it has an idea, a point of view or a reference fans recognise. Merch fails when it is the logo centred on a black shirt in every colour, when designs use eight colours on a budget that pays for two, when fine detail or gradients are sent to screen print, when the size run guesses wrong, and when artwork borrows from someone else's characters, lyrics or trademarks without permission.
</context>

<task>
Generate merchandise design concepts for this brand.

<brand>
{{brand}}
</brand>
{{#items}}

<items>
{{items}}
</items>
{{/items}}

If you cannot tell who the audience is or what the merch is for, ask and stop. If no items are given, recommend a mix suited to the goal, budget and audience.

1. **Merch goal.** What success means (sell-through and margin, people wearing it at the event, team pride) and the constraints (budget, quantities, deadline, sustainability preferences).
2. **Item mix.** The items, with why each fits, a rough price tier, and a suggested quantity split or size-run approach (for apparel, a common starting split leans to M and L, adjusted for the audience) marked as an estimate.
3. **Concepts.** 5 to 8 concepts, each distinct (not the same logo in different colours). For each: a name, the idea or reference behind it and why the audience would care, the item and placement (front, back, sleeve, left chest, all-over), artwork description (type, illustration, composition), colours (number of ink colours and garment colours), and the best print or production method (screen print, DTG, embroidery, DTF, sublimation, woven label, enamel) with why.
4. **Production notes.** Design rules for the chosen methods: limited ink colours for screen print, minimum line thickness and detail size for embroidery, avoiding gradients or halftoning them, print area sizes per item, file formats (vector for screen print and embroidery), garment quality and sustainable options, and the proofs to ask for.
5. **Ranking.** Rank the concepts by audience appeal, fit with the brand, cost per unit and production risk, and recommend a first drop of 2 to 4.
6. **Next steps.** What to sketch first, how to test interest (pre-orders, a poll, a small run), and lead times to plan for.
</task>

<constraints>
- No third-party trademarks, characters, song lyrics or artwork without permission; flag references that need a licence and offer an original alternative.
- Do not invent supplier prices; give cost tiers or ranges marked as estimates to confirm with a printer.
- Every concept must be producible with the stated method and budget.
{{> output/uncertainty}}
</constraints>

<output_format>
## Merch goal
## Item mix
| Item | Why | Price tier | Quantity approach |
## Concepts
### 1. <Concept name>
Idea, item and placement, artwork, colours, method.
(repeat)
## Production notes
## Ranking
| Concept | Appeal | Brand fit | Cost | Risk | First drop? |
## Next steps
</output_format>
