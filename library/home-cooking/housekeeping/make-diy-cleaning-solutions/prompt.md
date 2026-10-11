---
schema: 1
id: make-diy-cleaning-solutions
kind: prompt
title: Make safe homemade cleaning solutions
description: Gives safe homemade cleaning mixes for each job and surface, the chemicals never to combine, how to label and store them, and where a bought product or disinfectant is the better choice.
category: housekeeping
version: 1.0.0
status: incubating
stage: [plan]
role: [individual]
requires: [none]
inputs: [preferences]
output: [table, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [homemade-cleaners, vinegar, baking-soda, chemical-safety, green-cleaning, cleaning-recipes]
pairs_with:
  prompts: [build-cleaning-kit, clean-by-surface-material, disinfect-after-illness]
  personas: [cleaning-coach]
args:
  - name: jobs
    description: What you want to clean (glass, kitchen counters, limescale on taps, oven, bathroom grime, floors, fridge, mould), and the surfaces involved (granite, marble, wood, stainless steel, laminate).
    type: text
    required: true
  - name: household
    description: Children, pets (especially cats or birds), asthma or sensitivities, what ingredients you already have, and why you want homemade (cost, fewer chemicals, smell). Optional.
    type: string
output_contract:
  format: markdown
  sections: [Never mix, Your mixes, Surfaces to be careful with, When to buy a product instead, Labelling and storage, For your household]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help someone make homemade cleaners that work and are safe. A handful of cheap ingredients covers most jobs: a few drops of washing-up liquid in warm water cleans most sealed surfaces; diluted white vinegar dissolves limescale and soap scum and helps on glass; bicarbonate of soda (baking soda) makes a gentle scrubbing paste for sinks, hobs and ovens; citric acid is a strong descaler; rubbing alcohol diluted with water gives streak-free glass and stainless steel. What people get wrong: acids such as vinegar, lemon and citric acid etch marble, limestone, travertine and some grouts and can damage waxed or oiled wood and some metal finishes; mixing vinegar with baking soda in a bottle just makes salty water and gas, so use them separately; and homemade mixes are cleaners, not reliable disinfectants. The dangerous mistakes are combinations: bleach with ammonia or ammonia-based glass cleaner makes toxic chloramine gas; bleach with acids, including vinegar and some toilet cleaners, releases chlorine gas; hydrogen peroxide with vinegar forms a corrosive acid; different drain cleaners together can react violently. Essential oils are toxic to cats and some other pets, and fragrances can trigger asthma. Every bottle needs a label, and food or drink bottles must never be reused for cleaners.

Jobs: {{jobs}}
{{#household}}Household: {{household}}{{/household}}
</context>

<task>
1. Start with a short "never mix" box covering the dangerous combinations above, and what to do if someone has mixed them (leave the room, ventilate, get fresh air, call the poison information service or emergency number if anyone has symptoms).
2. For each job they listed, give one mix: ingredients and rough proportions in household measures, how to apply, contact time, and rinse or wipe.
3. Flag surface conflicts: for each surface they listed, which mixes to avoid and what to use instead, and to patch-test in a hidden spot.
4. Say where a bought product does a better or safer job: disinfecting after illness or raw meat, heavy mould, stubborn oven grease, and blocked drains, and to follow the label for those.
5. Labelling and storage: label with contents and date, use clean spray bottles never food containers, make small batches, store away from children and pets and from bleach.
6. Adjust for their household: fragrance-free versions for asthma, no essential oils with cats or birds, and keeping products out of reach.
</task>

<constraints>
- Never suggest mixing bleach with anything except water, or combining ammonia, acids or peroxide with other cleaners.
- Do not call vinegar or other homemade mixes disinfectants or sanitisers.
- Do not invent brand names or claim health benefits.
- Keep proportions approximate and practical; say to start dilute.
</constraints>

<output_format>
## Never mix
## Your mixes
Table: Job | Mix | How to use | Avoid on.
## Surfaces to be careful with
## When to buy a product instead
## Labelling and storage
## For your household
</output_format>
