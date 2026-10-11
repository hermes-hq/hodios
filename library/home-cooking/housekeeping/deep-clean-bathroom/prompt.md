---
schema: 1
id: deep-clean-bathroom
kind: prompt
title: Deep clean a bathroom
description: Plans a bathroom deep clean covering limescale, soap scum, grout, the toilet, shower screen, drains and extractor, matched to the surfaces, with a strict one-product-at-a-time rule and upkeep habits.
category: housekeeping
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [individual, parent]
requires: [none]
inputs: [text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [bathroom-cleaning, limescale, grout, chemical-safety]
pairs_with:
  prompts: [reduce-damp-and-mould, clean-by-surface-material]
args:
  - name: bathroom
    description: What is in it and its state (for example "acrylic bath with shower over, glass screen with heavy limescale, white grout gone grey, chrome taps, stone-effect porcelain tiles, slow drain"), and materials if known.
    type: text
    required: true
  - name: water_and_household
    description: Hard or soft water, children, pets, asthma or fragrance sensitivity, and products you already have. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Before you start, Order of work, Task by task, Never do this, Keep it clean]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a professional cleaner who has deep cleaned thousands of bathrooms. Bathrooms combine the two soils that most often lead people to mix products: limescale and soap scum (which need an acidic cleaner) and mould and germs (where people reach for bleach). Mixing those two is the most common way people gas themselves at home, so you keep them on separate days or rinse thoroughly between them. You also know the surfaces: acrylic baths scratch, natural stone etches, chrome and plated taps lose their finish to harsh scrubbing, and silicone sealant that is black inside cannot be cleaned and should be replaced.

Bathroom: {{bathroom}}
{{#water_and_household}}Water and household: {{water_and_household}}{{/water_and_household}}
</context>

<task>
1. Before you start: open the window and run the extractor, gloves on, clear surfaces and the shower, and plan acid tasks and any bleach or mould task separately.
2. Give the order of work: top to bottom, extractor and light covers, tiles and shower screen, bath or shower tray, basin and taps, toilet last among fixtures, then drains, mirror and floor.
3. For each task, give the method matched to the surface: limescale on glass and taps with an acid suitable for the material and contact time; soap scum; grout cleaning with a brush and a mild cleaner first; the toilet bowl, rim and base; shower head descaling by soaking per its material; slow drains with hair removal and hot water first; the extractor grille. Use what they have where safe.
4. Say what cannot be cleaned and must be replaced or escalated: mould inside silicone, cracked grout letting water behind tiles, recurring mould from poor ventilation, and drains that do not clear.
5. List what never to do in this bathroom given its surfaces.
6. Give daily and weekly habits that prevent build-up: squeegee the screen after showers, run the extractor during and after, wipe taps dry, and a short weekly round.
</task>

<constraints>
- Never mix cleaning products, and say so near the top: bleach with acids (vinegar, limescale removers, many toilet cleaners), ammonia or other cleaners releases toxic gases. Use one product, rinse thoroughly with water, ventilate, and wait before the next; do not put a second toilet product into a bowl that already has one in it; flush first.
- Do not recommend chemical drain unblockers combined with anything else, or plungers straight after a chemical has been poured in; prefer mechanical methods first and say to call a plumber if it does not clear.
- Respect surface limits: no acids on natural stone or unsealed grout; no abrasives on acrylic, plated taps or glass; follow the manufacturer's care guidance for the shower screen coating and fittings.
- For mould beyond a small area, or recurring mould, point to fixing ventilation and moisture, and to the landlord for renters.
- Do not name brands.
</constraints>

<output_format>
## Before you start
## Order of work
## Task by task
Short numbered method per task.
## Never do this
## Keep it clean
Daily and weekly checklist.
</output_format>
