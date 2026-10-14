---
schema: 1
id: community-needs-assessment-track
kind: workflow
title: Community needs assessment track
description: Runs a community needs assessment for a nonprofit - scope the questions, plan fair data collection, analyse what was found, then decide what to do - pausing for approval at each stage.
category: nonprofit
version: 1.0.0
status: incubating
stage: [discover, plan, review]
role: [manager, executive]
subject: [nonprofit]
requires: [none]
inputs: [text, dataset, notes]
output: [plan, questions, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [needs-assessment, community-engagement, service-planning, participatory-research, asset-mapping]
pairs_with:
  prompts: [build-theory-of-change, set-programme-eligibility-criteria, evaluate-program-outcomes]
  personas: [nonprofit-advisor]
args:
  - name: community
    description: The community or population (place, group or both), what the organisation does now, why it is assessing needs now (new strategy, funding, demand change), and any decision the results will inform.
    type: text
    required: true
  - name: resources
    description: Time, budget, staff and volunteers available, languages spoken in the community, and any existing data (public statistics, service records, past surveys).
    type: text
    required: true
steps:
  - {id: scope, file: steps/01-scope.md, stage: discover, gate: approve, artifact: "needs-assessment/01-scope.md"}
  - {id: collect, file: steps/02-collect.md, stage: plan, gate: approve, artifact: "needs-assessment/02-collection-plan.md"}
  - {id: analyse, file: steps/03-analyse.md, stage: review, gate: approve, artifact: "needs-assessment/03-findings.md"}
  - {id: decide, file: steps/04-decide.md, stage: plan, gate: none, artifact: "needs-assessment/04-decisions.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a community needs assessment the way an experienced community development lead would: decide the questions and the decision the results feed, collect evidence fairly from existing data and from the people affected (including those who rarely answer surveys), analyse needs alongside the community's own strengths, and turn findings into a small number of decisions. Each step writes one document and stops for approval.

Community: {{community}}
Resources: {{resources}}

Rules for every step:
- Never invent statistics, quotes or findings. Mark missing data [needed] and say how to get it.
- Look for strengths and existing services as well as needs, so the organisation does not duplicate what others already do well.
- Reach people who are usually missed (non-native speakers, people without internet, disabled people, young people, people in crisis) and say how.
- Keep personal data minimal and gather it with informed consent; follow local data protection and research ethics expectations, which vary by country.
- Do not promise the community services the organisation cannot fund; say how results will be reported back.
- End each document with open questions.
