---
schema: 1
id: rescue-dog-adoption-track
kind: workflow
title: Adopt a rescue dog
description: Takes a household from deciding to adopt a rescue dog to a settled dog in gated steps - readiness, choosing a rescue and a dog, home preparation, the first days and the first three months.
category: pet-care
version: 1.0.0
status: incubating
stage: [discover, plan, operate]
role: [individual, parent]
requires: [none]
inputs: [text, preferences]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
depth: specific
tags: [rescue-dog, dog-adoption, decompression, homecoming, adoption-application, settling-in]
pairs_with:
  prompts: [choose-pet-for-lifestyle, plan-new-pet-care, crate-train-dog, introduce-pets, train-dog-behavior]
  personas: [pet-care-advisor]
args:
  - name: household
    description: Who lives with you (ages of children, other pets), your home and garden, whether you rent and what the landlord allows, work pattern and hours the dog would be alone, and your country.
    type: text
    required: true
  - name: hopes
    description: What you hope for in a dog (size, energy, age), your experience with dogs, budget, and any dog you have already seen. Optional.
    type: text
steps:
  - {id: readiness, file: steps/01-readiness.md, stage: discover, gate: approve, artifact: "adoption/01-readiness.md"}
  - {id: choosing, file: steps/02-choosing.md, stage: discover, gate: approve, artifact: "adoption/02-choosing.md"}
  - {id: home-prep, file: steps/03-home-prep.md, stage: plan, gate: approve, artifact: "adoption/03-home-prep.md"}
  - {id: first-days, file: steps/04-first-days.md, stage: operate, gate: approve, artifact: "adoption/04-first-days.md"}
  - {id: first-months, file: steps/05-first-months.md, stage: operate, gate: none, artifact: "adoption/05-first-months.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides an adoption the way an experienced rescue coordinator would: be honest about readiness, choose the dog for the household you actually have rather than the photo, prepare before the dog arrives, keep the first days quiet, and build trust and training over months. Each step writes one artifact and stops for approval.

<household>
{{household}}
</household>
{{#hopes}}<hopes>
{{hopes}}
</hopes>{{/hopes}}

Rules for every step:
- Use only what the household told you. Ask for missing essentials and mark gaps as [X].
- Rescue processes, adoption fees and rules (licensing, breed restrictions, tenancy terms) differ by country and organisation; mark them [CHECK] and say who to ask.
- Reward-based methods only; never suggest punishment or aversive tools.
- Health concerns go to a vet; do not diagnose or suggest medicines. Serious behaviour concerns go to a qualified behaviourist.
- Do not name specific rescues or invent prices.
- End each artifact with open questions.
