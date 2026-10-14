---
schema: 1
id: clean-upholstered-furniture
kind: prompt
title: Clean an upholstered sofa or chair
description: "Plans how to clean a sofa, armchair or upholstered headboard from its cleaning code and fabric, covering vacuuming, spot cleaning, removable covers and when to call an upholstery cleaner."
category: housekeeping
version: 1.0.0
status: incubating
stage: [operate]
role: [individual, parent]
requires: [none]
inputs: [text, image]
output: [checklist, explanation]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
depth: specific
tags: [upholstery, sofa-care, fabric-care, chemical-safety]
pairs_with:
  prompts: [remove-stain, manage-pet-hair-and-odours]
args:
  - name: furniture
    description: "The piece, its fabric (cotton, linen, velvet, microfibre, leather, faux leather, chenille), the cleaning code on its label if any (W, S, W/S, X), and whether covers are removable."
    type: text
    required: true
  - name: problem
    description: "What needs fixing: general grime, greasy armrests, water rings, smells, pet hair, a specific spill."
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What your label allows, Routine clean, Fixing the problem, Removable covers, When to call a professional]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an upholstery cleaner. Most furniture carries a cleaning code: W means water-based cleaners, S means solvent-based only (water can leave rings or shrink), W/S allows either, and X means vacuum only. Ignoring the code is how people ruin sofas. Removable covers are not automatically washable: many shrink and will not go back on, and washing one cover changes its colour against the rest. Velvet and microfibre need brushing with the pile; leather needs a leather cleaner and conditioner, not household sprays. Always test on a hidden area and use as little moisture as possible.

Furniture: {{furniture}}
Problem: {{problem}}
</context>

<task>
1. Read the cleaning code and fabric and say what it allows and forbids. If there is no label, give the safest approach and say so.
2. Give the routine clean: vacuum with an upholstery tool into seams and under cushions, brush with the pile, and rotate and fluff cushions.
3. Give a method for the stated problem, matched to the code, gentlest first, with a hidden-area test and how to avoid water rings (work from the outside in, blot, feather the edges, dry quickly).
4. Say whether covers may be washed, and the risks, and to check the care label and wash all matching covers together if so.
5. Say when to stop and call a professional upholstery cleaner.
</task>

<constraints>
- Chemical safety: one product at a time, rinse or wipe with water between products, never mix cleaners (bleach with ammonia, vinegar, acids or other cleaners releases toxic gases), ventilate, wear gloves for strong products, and store products in their original containers away from children and pets.
- Never use water on S or X coded fabric, or solvents on X coded fabric. Never soak cushions or the frame.
- No household sprays, vinegar, baking soda pastes or wipes on leather or suede beyond what the maker allows; use products made for leather.
- Do not invent the code: if the user does not know it, ask them to check under the cushions or the frame, and otherwise treat the fabric as the most delicate likely type.
- Antique, silk or valuable pieces go to a professional.
</constraints>

<output_format>
## What your label allows
## Routine clean
## Fixing the problem
Numbered steps starting with the patch test.
## Removable covers
Two to four lines.
## When to call a professional
</output_format>
