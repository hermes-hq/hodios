---
schema: 1
id: set-up-farm-biosecurity
kind: prompt
title: Set up farm biosecurity
description: Writes a practical biosecurity routine for a livestock or poultry farm - gate and visitor rules, boot and vehicle cleaning, isolation of bought-in stock, shared kit and gate sign text.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [checklist, plan, copy]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [biosecurity, quarantine, visitor-rules, disinfection, bought-in-stock, notifiable-disease]
pairs_with:
  prompts: [prepare-herd-health-plan-review, plan-livestock-record-keeping, write-farm-safety-induction]
args:
  - name: enterprise
    description: What the farm keeps and how - species, numbers, housed or outdoor, shared boundaries, neighbours' stock, wild bird or wildlife contact, shared grazing.
    type: text
    required: true
  - name: buys_in_stock
    description: Whether animals or birds are brought onto the farm (bought, hired rams or bulls, returning from shows or shared grazing).
    type: boolean
    required: true
  - name: visitors
    description: Optional. Who comes onto the farm - vets, feed and milk lorries, contractors, shearers, the public, school groups, volunteers.
    type: text
output_contract:
  format: markdown
  sections: [Main risks, Farm gate and visitors, Cleaning routine, Bought-in and returning stock, Shared equipment and contractors, Gate sign, Rules to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer set up biosecurity that people will actually follow. Vets rank the routes disease takes onto farms: bought-in or returning animals first, then shared equipment and contractors, vehicles, people, wildlife and wild birds, feed, water and bedding. A good routine targets the biggest routes for this farm and is simple enough to keep on a busy day. Common failures: a long laminated list no one reads, footdips that are never refreshed (disinfectant does little on dirty boots), bought-in animals mixed with the herd on the day they arrive, and lorries driven into the yard past the animals.

Buys in or brings back stock: {{buys_in_stock}}
<enterprise>
{{enterprise}}
</enterprise>
{{#visitors}}
<visitors>
{{visitors}}
</visitors>
{{/visitors}}
</context>

<task>
1. Rank the top three to five disease routes for this enterprise with a one-line reason each.
2. Farm gate and visitors: a single entry point where possible, a parking area away from livestock and feed, a visitor log (name, date, last contact with livestock), and clean or farm-provided boots and overalls. Set a stand-down rule as a starting point to agree with the vet (for example no contact with other livestock or poultry in the previous 24-72 hours for people entering sheds), stricter for poultry and pigs.
3. Cleaning routine: clean first, then disinfect. Boot wash with brush and running water, then a footdip with an approved product at the label dilution, refreshed as the label says or when dirty. Vehicle routes and wheel washing where lorries come close to stock.
4. Bought-in and returning stock (if buys in stock is true): source from known-health herds or flocks and ask for health status; isolation away from the herd with no nose-to-nose contact, separate kit and handled last, for a period to agree with the vet (often about 28 days for many species); tests and treatments on arrival decided by the vet. If false, say so and cover returns from shows or shared grazing only if mentioned, plus boundary fencing.
5. Shared equipment and contractors: what to clean before it comes on and goes off (trailers, crush, shearing gear, scanning gear), and the order of jobs (young or clean stock first).
6. Wildlife, feed and water: rodent control, covered feed, keeping wild birds out of sheds and feed (vital for poultry), safe water sources. Put these as a short "Feed, water and wildlife" list at the end of Cleaning routine.
7. Write a short gate sign: who to contact, what visitors must do, and no entry to livestock areas without permission.
8. Rules to check: notifiable diseases and how to report suspicion, any housing orders or movement standstills, approved disinfectants and their dilutions.
</task>

<constraints>
- Do not prescribe vaccines, treatments or tests; frame them as items to agree with the vet.
- Do not name disinfectant brands or dilutions as fact; say to use a product approved for the purpose in the country, at the label rate.
- Mark legal points as [CHECK locally], naming the type of authority (national veterinary or agriculture authority).
- If the notes describe signs that could be a notifiable disease (for example blisters, sudden deaths, many sick animals at once), or ask how to hide or move sick stock, stop: tell them to keep all animals on the farm and call their vet or the national veterinary authority now. Do not help conceal disease.
- Keep the routine proportionate: if a step will not be kept on a busy day, say what the minimum version is.
</constraints>

<output_format>
## Main risks
Numbered list.
## Farm gate and visitors
Checklist.
## Cleaning routine
Numbered steps.
## Bought-in and returning stock
Numbered steps.
## Shared equipment and contractors
Table: Item or contractor | Before arriving | Before leaving.
## Gate sign
Text under 80 words, ready to print.
## Rules to check
Bullets, each ending in [CHECK locally].
</output_format>
