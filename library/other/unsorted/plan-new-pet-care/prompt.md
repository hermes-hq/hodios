---
schema: 1
id: plan-new-pet-care
kind: prompt
title: Plan care for a new pet
description: Plans care for a new pet covering supplies, home setup, feeding, a vet schedule to confirm, first-weeks training and realistic costs. Use before or right after bringing a pet home.
category: unsorted
proposed_category: pet-care
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
requires: [none]
inputs: [preferences, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: optional
level: beginner
tags: [new-pet, puppy, kitten, pet-supplies, pet-costs, animal-welfare]
pairs_with:
  prompts: [train-dog-behavior, prepare-vet-visit]
  personas: [pet-care-advisor]
args:
  - name: pet_type_and_age
    description: The species, breed or mix if known, and age, for example "8-week-old Labrador puppy", "two adult guinea pigs" or "rescue cat, about 5".
    type: string
    required: true
  - name: home
    description: Your home and routine (flat or house, garden, other pets, children, hours away from home, country or region, budget) and any experience with this kind of animal. Optional but makes the plan fit.
    type: text
output_contract:
  format: markdown
  sections: [First things first, Supplies, Home setup, Feeding, Vet plan to confirm, First weeks, Costs, Watch for]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help new owners prepare for a pet, drawing on how shelters, breeders and veterinary practices brief new adopters. The first weeks set the pattern for the animal's health and behaviour, and new owners often over-buy the wrong things, underestimate costs, and miss species-specific needs (small animals that must live in pairs, rabbits that need far more space than a hutch, reptiles that need precise heat and UV). You give practical, species-specific guidance and leave medical decisions to the vet.

Pet: {{pet_type_and_age}}
{{#home}}Home and routine: {{home}}{{/home}}
</context>

<task>
1. If the species is unclear, ask and stop. If the home details are missing, plan for a typical home, state the assumptions, and list the questions whose answers would change the plan.
2. First things first: the three most important things to do in the first 48 hours for this animal (for example a quiet decompression space, registering with a vet, keeping to the previous diet).
3. Supplies: an essentials list sized to the species and age, with what to skip or buy later. Flag species-specific must-haves and common mistakes (for example cage size minimums, companion needs, a carrier for every cat).
4. Home setup: pet-proofing (toxic plants and foods, cables, small objects, escape routes, balconies), where the animal sleeps, eats and toilets, and introductions to children and other pets step by step.
5. Feeding: the type of diet suited to the species and life stage, how many meals a day, how to switch food gradually, fresh water, and foods that are dangerous for this species. Give portion guidance only as "follow the food's label for the expected adult weight and confirm with your vet".
6. Vet plan to confirm: the usual topics for a first vet visit and the first year (health check, vaccinations, parasite prevention, microchipping, neutering or spaying timing, dental care, insurance) as items to confirm with the vet. Do not give vaccine schedules or medication doses as instructions.
7. First weeks: routines, socialisation windows if relevant to this species and age, house or litter training basics using reward-based methods, enrichment, and time alone built up gradually.
8. Costs: one-off and monthly cost categories with rough ranges, labelled as estimates that vary by country and to be checked locally, plus an emergency fund or insurance note.
9. Watch for: signs that need a vet call the same day for this species (for example not eating, breathing changes, repeated vomiting or diarrhoea, lethargy, straining to urinate, especially in young animals).
</task>

<constraints>
- Reward-based methods only; never recommend punishment, shock, prong or choke tools.
- Be species-specific. Do not apply dog advice to cats, or cat advice to rabbits.
- Medical topics are things to confirm with a vet, never instructions: no diagnoses, doses or treatment. If asked for a product or dose, explain that it depends on the animal's weight and health, and point to lower-cost options such as vet nurse clinics or animal welfare charities where cost is the worry.
- If the setup described would harm the animal's welfare (a single guinea pig, a rabbit kept permanently in a small hutch, a working breed left alone ten hours a day), say so kindly and suggest what would work.
- Name your country assumption for costs, rules (registration, microchipping) and products.
</constraints>

<output_format>
## First things first
## Supplies
Table: Item | Why | Now or later.
## Home setup
## Feeding
## Vet plan to confirm
Checklist of questions to ask at the first visit.
## First weeks
A simple week-by-week plan for the first four weeks.
## Costs
Table: Cost | One-off or monthly | Rough range (estimate).
## Watch for
Same-day vet signs, then "go to an emergency vet now" signs.
</output_format>
