---
schema: 1
id: seasonal-crew-track
kind: workflow
title: Run a seasonal crew
description: Runs a seasonal harvest crew in gated steps - labour forecast, recruitment and rules to check, housing and welfare, induction, daily supervision and pay records, and an end-of-season review.
category: farming
version: 1.0.0
status: incubating
stage: [plan, build, operate, review]
role: [founder, manager, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, text]
output: [plan, checklist, table, docs]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [seasonal-workers, harvest-crew, worker-welfare, labour-planning, piece-rates, ethical-recruitment]
pairs_with:
  prompts: [estimate-harvest-labour-needs, write-farm-worker-welcome-pack, write-farm-safety-induction, build-farm-daily-job-sheet]
  personas: [farm-safety-adviser]
args:
  - name: crop
    description: The crop or crops and the harvest window, for example "strawberries and raspberries, May to September".
    type: string
    required: true
  - name: workers_needed
    description: Rough number of seasonal workers needed at peak (step 1 checks it).
    type: number
    required: true
  - name: farm_context
    description: Optional. Country, farm size, how you recruited before, housing on site or not, supervisors, pay method, and what went wrong last season.
    type: text
steps:
  - {id: forecast, file: steps/01-forecast.md, stage: plan, gate: approve, artifact: "crew/01-forecast.md"}
  - {id: recruit, file: steps/02-recruit.md, stage: plan, gate: approve, artifact: "crew/02-recruitment.md"}
  - {id: welfare, file: steps/03-housing-welfare.md, stage: build, gate: approve, artifact: "crew/03-housing-welfare.md"}
  - {id: induction, file: steps/04-induction.md, stage: build, gate: approve, artifact: "crew/04-induction.md"}
  - {id: run, file: steps/05-run-season.md, stage: operate, gate: approve, artifact: "crew/05-season-routine.md"}
  - {id: review, file: steps/06-review.md, stage: review, gate: none, artifact: "crew/06-review.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a seasonal harvest crew the way a good grower and labour manager would: size the crew from the crop, recruit fairly through lawful routes, get housing and welfare right before anyone arrives, induct properly, supervise and pay accurately day to day, and learn from the season. Each step writes one artifact and stops for approval.

Crop and window: {{crop}}
Workers needed at peak: {{workers_needed}}

{{#farm_context}}
<farm_context>
{{farm_context}}
</farm_context>
{{/farm_context}}

Rules for every step:
- Use only facts the grower gave or confirmed. Ask for missing essentials (country, harvest dates, pay method, housing) and mark gaps `[X]`.
- Wages, piece-rate top-ups, working time, right to work, visas, housing standards, labour provider licensing and tax vary by country: mark each `[CHECK locally]` and never state them as fact.
- Workers never pay recruitment fees, always keep their own documents and pay, and can raise problems through a route that bypasses their supervisor. Refuse to plan anything that breaks this, and say why.
- People's safety comes before the crop. If the grower reports a worker who is hurt, threatened, abused or talking about harming themselves, put the step aside: say to contact local emergency services if anyone is in danger now, and to involve the welfare contact and, where exploitation is suspected, the relevant labour authority `[CHECK locally]`.
{{> guardrails/professional-limits}}
- End each artifact with open questions.
