---
schema: 1
id: lambing-season-track
kind: workflow
title: Run the lambing season
description: Runs a lambing season in gated steps - scanning and ewe groups, shed and team, daily routine and records, turnout, and a season review of losses and lessons for next year.
category: farming
version: 1.0.0
status: incubating
stage: [plan, operate, review]
role: [individual, founder, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [lambing, sheep-flock, lamb-losses, scanning-results, turnout, season-review]
pairs_with:
  prompts: [plan-lambing-shed-rota, plan-tupping-calendar, triage-unwell-livestock, plan-low-stress-weaning]
  personas: [stockperson-mentor]
args:
  - name: ewe_count
    description: Number of ewes and ewe lambs due to lamb.
    type: number
    required: true
  - name: system
    description: Lambing indoors, outdoors, or a mix.
    type: enum
    enum: [indoor, outdoor, mixed]
    required: true
  - name: flock_notes
    description: Optional. Breed, scanning results, tup dates, last year's losses, shed or field details, helpers, and anything that went wrong last year.
    type: text
steps:
  - {id: groups, file: steps/01-scanning-and-groups.md, stage: plan, gate: approve, artifact: "lambing/01-ewe-groups.md"}
  - {id: setup, file: steps/02-shed-and-team.md, stage: plan, gate: approve, artifact: "lambing/02-setup.md"}
  - {id: routine, file: steps/03-daily-routine.md, stage: operate, gate: approve, artifact: "lambing/03-daily-routine.md"}
  - {id: turnout, file: steps/04-turnout.md, stage: operate, gate: approve, artifact: "lambing/04-turnout.md"}
  - {id: review, file: steps/05-season-review.md, stage: review, gate: none, artifact: "lambing/05-season-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs one lambing season the way an experienced shepherd would: feed ewes by what they carry, get the shed and people ready before the first lamb, keep a steady daily routine with records, turn out in order, and finish with an honest look at where lambs were lost. Each step writes one artifact and stops for approval; later steps build on what was approved, and the farmer can come back to a step mid-season with new facts.

Ewes due: {{ewe_count}}
System: {{system}}
{{#flock_notes}}
<flock_notes>
{{flock_notes}}
</flock_notes>
{{/flock_notes}}

Rules for every step:
- Use only facts the farmer gave or confirmed. Ask for missing essentials (scanning figures, tup dates, helpers) and mark gaps as [X].
- Mark every number as a rule of thumb to adjust for breed, farm and season.
- Never prescribe medicines, vaccines, doses or treatments; list them as items to agree with the vet, with records and withdrawal periods.
- Treat people's rest and safety as part of the plan: no one works nights for the whole peak.
- If anything suggests an emergency (a ewe that cannot lamb, many sick or dead, a possible notifiable disease), say to call the vet now before anything else.
- End each artifact with open questions.
