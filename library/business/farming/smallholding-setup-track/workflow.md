---
schema: 1
id: smallholding-setup-track
kind: workflow
title: Set up a smallholding
description: Takes a new smallholder from land to first stock or crops in gated steps - land and buildings, registrations to verify, enterprise choice, infrastructure, first animals and a routine.
category: farming
version: 1.0.0
status: incubating
stage: [discover, plan, build, operate]
role: [individual, founder]
subject: [agriculture]
requires: [none]
inputs: [notes, text, preferences]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: beginner
tags: [smallholding, career-change, land-assessment, holding-registration, first-livestock, self-sufficiency]
pairs_with:
  prompts: [plan-livestock-record-keeping, set-up-farm-biosecurity, estimate-farm-stocking-rate, plan-laying-flock-cycle, write-farm-safety-induction]
  personas: [stockperson-mentor, farm-business-advisor]
args:
  - name: land
    description: The land and buildings - area, fields, soil, slope, water, fencing, sheds, access, neighbours, and whether owned, rented or still being bought.
    type: text
    required: true
  - name: country
    description: Country, and region where rules differ, so registrations and rules to check can be named.
    type: string
    required: true
  - name: goals
    description: What you want from the smallholding - food for the family, income, a lifestyle change, care farming - with the time per week, budget and experience you have.
    type: text
    required: true
steps:
  - {id: land, file: steps/01-land-and-buildings.md, stage: discover, gate: approve, artifact: "smallholding/01-land.md"}
  - {id: rules, file: steps/02-rules-to-verify.md, stage: plan, gate: approve, artifact: "smallholding/02-rules.md"}
  - {id: enterprise, file: steps/03-enterprise-choice.md, stage: plan, gate: approve, artifact: "smallholding/03-enterprises.md"}
  - {id: infrastructure, file: steps/04-infrastructure.md, stage: build, gate: approve, artifact: "smallholding/04-infrastructure.md"}
  - {id: first-stock, file: steps/05-first-stock.md, stage: build, gate: approve, artifact: "smallholding/05-first-stock.md"}
  - {id: routine, file: steps/06-routine.md, stage: operate, gate: none, artifact: "smallholding/06-routine.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a new smallholder from land to a working first year, the way an experienced neighbour would: see what the land can really do, sort the paperwork before the animals arrive, start with fewer enterprises than planned, build only what those need, and set a routine the household can keep. Each step writes one artifact and stops for approval.

Country: {{country}}
<land>
{{land}}
</land>
<goals>
{{goals}}
</goals>

Rules for every step:
- Use only facts the smallholder gave or confirmed. Ask for missing essentials and mark gaps as [X].
- Rules, registrations and permissions differ by country and change: name the likely authority, mark each item [CHECK], and never state it as certain.
- Never prescribe animal medicines, doses or pesticide use; those belong to the vet, the label and qualified advisers.
- Do not invent prices, grants or incomes; show what to price and where to ask.
{{> guardrails/professional-limits}}
- End each artifact with open questions.
