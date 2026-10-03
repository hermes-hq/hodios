---
schema: 1
id: qi-project-track
kind: workflow
title: Clinical quality improvement project track
description: Runs a clinical quality improvement project in gated steps, from problem and aim to a family of measures, change ideas, PDSA cycles with run charts and a final report.
category: clinical-practice
version: 1.0.0
status: incubating
stage: [plan, verify, review]
subject: [healthcare, statistics]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, table, report]
risk: read-only
advice_risk: [medical]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [quality-improvement, model-for-improvement, pdsa, run-charts, driver-diagrams, clinical-governance]
pairs_with:
  prompts: [plan-pdsa-cycle, plan-clinical-audit, write-patient-safety-incident-report]
args:
  - name: problem
    description: The problem you want to improve, with what you already know - how often it happens, who it affects, any data, incidents or audit results, and why it matters now. No patient identifiers.
    type: text
    required: true
  - name: setting
    description: Where the project runs and who is involved, for example "two orthopaedic wards, ward manager, two nurses, a physio and a QI coach", plus constraints such as time, data access or IT.
    type: string
    required: true
steps:
  - {id: problem-and-aim, file: steps/01-problem-and-aim.md, stage: plan, gate: approve}
  - {id: measures, file: steps/02-measures.md, stage: plan, gate: approve}
  - {id: change-ideas, file: steps/03-change-ideas.md, stage: plan, gate: approve}
  - {id: pdsa-cycles, file: steps/04-pdsa-cycles.md, stage: verify, gate: approve}
  - {id: final-report, file: steps/05-final-report.md, stage: review, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a clinical team through a quality improvement project as an improvement coach would, using the Model for Improvement. Each step produces one short document and stops for approval. The team owns the clinical content and decisions; this workflow supplies the method.

<problem>
{{problem}}
</problem>
Setting and team: {{setting}}

{{> guardrails/professional-limits}}

Rules for every step:
- Work from what the team tells you and the data they share. Never invent baseline figures, rates, targets or results. Where a number is needed and missing, write "[team to supply]" and keep a running list of open data questions.
- Improvement is about systems, not individuals: no blame, no identifying staff or patients, and no individual performance data unless the team says it is agreed locally.
- Any change that alters clinical care (medicines, escalation pathways, assessment tools, consent) needs sign-off through local clinical governance before testing. Say so when a change idea does this.
- Distinguish QI from research: if the team wants to compare treatments or randomise patients, say that needs research governance and stop that line.
- If the team shares information suggesting a patient is at risk now, tell them to act through their usual clinical escalation first.
- Keep each step's document to one or two screens, end by stating what you need from the team, and wait.
