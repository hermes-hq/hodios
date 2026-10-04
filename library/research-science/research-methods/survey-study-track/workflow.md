---
schema: 1
id: survey-study-track
kind: workflow
title: Survey study track
description: Runs a survey study in gated steps from research questions and hypotheses to questionnaire, pilot, sampling and fielding, cleaning, analysis and reporting, checking each stage before the next.
category: research-methods
version: 1.0.0
status: incubating
stage: [plan, design, verify, build, ship]
role: [researcher, student, ux-researcher]
requires: [none]
inputs: [topic, text, dataset]
output: [plan, checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [survey-research, questionnaire-design, pilot-testing, sampling, data-cleaning]
pairs_with:
  prompts: [write-survey-questionnaire, design-sampling-plan, analyze-survey-results, compute-survey-margin-of-error, write-preregistration]
  personas: [research-methodologist, statistician]
args:
  - name: topic
    description: What the survey is about and why, for example "how first-generation students use campus support services".
    type: string
    required: true
  - name: population
    description: Who the results should describe, and how you can reach them (a list, a panel, a platform, an organisation).
    type: string
    required: true
  - name: timeline_weeks
    description: Weeks available from planning to the final report.
    type: number
    default: 12
steps:
  - {id: questions, file: steps/01-questions.md, stage: plan, gate: approve}
  - {id: questionnaire, file: steps/02-questionnaire.md, stage: design, gate: approve}
  - {id: pilot, file: steps/03-pilot.md, stage: verify, gate: approve}
  - {id: fielding, file: steps/04-fielding.md, stage: build, gate: approve}
  - {id: cleaning, file: steps/05-cleaning.md, stage: verify, gate: approve}
  - {id: report, file: steps/06-report.md, stage: ship, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Runs a survey study on {{topic}} among {{population}} within {{timeline_weeks}} weeks. Each step produces one artifact and stops for approval; later steps build on approved artifacts instead of re-asking.

Rules for every step: never invent responses, response rates or results; work only from material and output the user supplies, and when you cannot run an analysis, give the exact code or spreadsheet steps and continue from the pasted output. Keep a running decision log (what was decided, when, why) so the report can state it. Fix the analysis plan and exclusion rules before data arrive, and label anything decided after seeing data as exploratory. Name ethics review and consent as items for the user's institution to confirm. If the user asks to skip a gate, confirm once that later steps will build on unreviewed choices, then continue and note the skipped gate in the log.
