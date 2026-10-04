---
schema: 1
id: plan-laying-flock-cycle
kind: prompt
title: Plan a laying flock cycle
description: Plans a small commercial laying flock from point of lay to depletion - housing and lighting, feed and egg records, daily checks, red mite and health watch-points, egg sales and replacement.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: beginner
tags: [laying-hens, egg-production, point-of-lay, red-mite, lighting-programme, egg-sales]
pairs_with:
  prompts: [set-up-farm-biosecurity, plan-livestock-record-keeping, triage-unwell-livestock]
args:
  - name: flock_size
    description: Number of hens per batch.
    type: number
    required: true
  - name: system
    description: The housing system.
    type: enum
    enum: [free-range, barn, small-backyard-commercial]
    required: true
  - name: selling_route
    description: Optional. How eggs are sold - farm gate, honesty box, shops, cafes, markets, a packer - and roughly how many eggs a week buyers take.
    type: text
output_contract:
  format: markdown
  sections: [Flock timeline, Housing and lighting, Daily and weekly routine, Records, Health watch-points, Egg handling and sales, Replacement plan, Rules to check]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small egg producer run a laying flock through one full cycle. Experienced poultry keepers manage by the numbers: daily egg count, feed and water use, and mortality, because a drop in water or feed intake is often the first sign of trouble, a day or two before egg numbers fall. Common failures: red mite building up unseen until production and welfare suffer, lighting changes that confuse birds (cutting day length during lay), selling more eggs than the flock will produce at the end of lay, and no plan for when and how to replace the flock.

Flock size: {{flock_size}}
System: {{system}}
{{#selling_route}}
<selling_route>
{{selling_route}}
</selling_route>
{{/selling_route}}
</context>

<task>
1. Flock timeline in weeks of age, as typical ranges for modern hybrid layers to confirm with the rearer: arrival at point of lay about 16-18 weeks; first eggs about 18-20 weeks; peak about 25-30 weeks at roughly 90-95% lay; gradual decline; end of lay often about 72-80 weeks, or later for small flocks that accept lower output. Show expected eggs per week at start, peak and end for {{flock_size}} hens.
2. Housing and lighting for {{system}}: space, nest boxes (as a rule of thumb about one per 5-7 hens or as the scheme sets), perches, litter, pop-holes and range management for free-range. Lighting: build up gradually to about 14-16 hours from the rearer's programme and never cut day length during lay; dimmers or timers for dawn and dusk.
3. Daily and weekly routine: morning check of birds, water and feed; egg collection at least twice a day; count and record eggs, floor eggs and deaths; evening shut-in; weekly checks of mites, weight sampling, litter and range.
4. Records: a sheet with date, hens alive, deaths, eggs collected, seconds and cracked, feed used, water used, and notes, plus flock source, vaccination records from the rearer and medicine records. Explain the warning triggers (water or feed drop of about 10% or more, a sudden egg drop, more than a few deaths in a day) and that each means call the vet.
5. Health watch-points: red mite (check perch ends and crevices at night, plan between-flock cleaning), feather pecking, egg peritonitis, worms, and wild bird contact. Treatments and vaccines are for the vet to decide.
6. Egg handling and sales: collect, grade by size and quality, keep cool and stable, rotate stock, and match sales to the production curve (start of lay small eggs, end of lay larger eggs and more seconds). Food safety, grading, marking and labelling rules depend on the country and the sales route [CHECK locally].
7. Replacement plan: when to order the next batch (lead times are often months), depletion options, the clean-out and rest period between flocks, and whether to run overlapping flocks to keep customers supplied.
</task>

<constraints>
- Mark all figures as typical and say the rearer's guide for the breed is the reference.
- Do not prescribe medicines, vaccines or doses; refer them to the vet.
- Rules on registration, egg marking, salmonella testing and bird flu housing orders vary; list them under Rules to check with [CHECK locally].
- If the notes describe sudden deaths, many sick birds or swollen heads or wattles, stop: tell them not to move birds or eggs and to contact their vet or the national veterinary authority now.
- If flock size or system is missing, ask and stop.
</constraints>

<output_format>
## Flock timeline
Table: Age (weeks) | Stage | Eggs per week (approx) | Key jobs.
## Housing and lighting
Bullets.
## Daily and weekly routine
Checklist.
## Records
Table of record columns, then the warning triggers.
## Health watch-points
Table: Problem | Early sign | What to do.
## Egg handling and sales
Bullets.
## Replacement plan
Numbered steps with timings.
## Rules to check
Bullets ending in [CHECK locally].
</output_format>
