---
schema: 1
id: set-up-hr-function-track
kind: workflow
title: Set up the HR function
description: Guides a small company setting up HR for the first time in gated steps, from a baseline audit to records and contracts, core policies, lifecycle processes and an operating rhythm.
category: hr-operations
version: 1.0.0
status: incubating
stage: [discover, plan, build, operate]
role: [founder, operations-manager, executive]
requires: [none]
inputs: [text, document]
output: [report, plan, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [first-hr-hire, hr-foundations, employee-records, hr-processes, growing-company]
pairs_with:
  prompts: [write-employee-handbook, design-probation-review-process, plan-employee-offboarding, select-hr-system, plan-hr-annual-calendar]
  personas: [hr-business-partner]
args:
  - name: company
    description: Headcount now and in a year, countries or states where people work, worker types (employees, contractors, interns), industry, and who handles HR today.
    type: text
    required: true
  - name: current_state
    description: What exists today, such as contracts, a handbook, payroll provider, where employee files live, any open disputes or recent problems, and what triggered this work.
    type: text
    required: true
steps:
  - {id: baseline, file: steps/01-baseline-audit.md, stage: discover, gate: approve, artifact: "hr-setup/01-baseline.md"}
  - {id: records, file: steps/02-records-and-contracts.md, stage: build, gate: approve, artifact: "hr-setup/02-records-and-contracts.md"}
  - {id: policies, file: steps/03-core-policies.md, stage: build, gate: approve, artifact: "hr-setup/03-core-policies.md"}
  - {id: lifecycle, file: steps/04-lifecycle-processes.md, stage: plan, gate: approve, artifact: "hr-setup/04-lifecycle-processes.md"}
  - {id: rhythm, file: steps/05-operating-rhythm.md, stage: operate, gate: none, artifact: "hr-setup/05-operating-rhythm.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a small company from "the founder does HR in spreadsheets" to a working HR foundation, in the order an experienced first HR hire would: find out what exists and what is exposed, fix records and contracts, put the few essential policies in place, design the processes that run from hire to exit, then set a calendar and a handful of measures. Each step writes one artifact and stops for approval, because what the user finds (a missing contract, a misclassified contractor) changes what comes next.

<company>
{{company}}
</company>

<current_state>
{{current_state}}
</current_state>

{{> guardrails/professional-limits}}

Rules for every step:
- Use only what the user tells you. Never invent laws, thresholds, deadlines or what their documents say; mark gaps [X] and ask.
- Every point that depends on employment, tax or data protection law is marked "confirm locally" and carried to a running list of questions for an employment lawyer or adviser.
- Fix exposure first: missing contracts, unpaid entitlements, misclassified workers, right-to-work gaps and unsecured personal data come before nice-to-have programmes.
- Keep it proportionate to the headcount. A 15-person company needs a few clear basics, not an enterprise HR model.
- If the user mentions an open dispute, claim, harassment or safety issue, pause the step, say it needs prompt specialist attention, and continue only once they confirm it is in hand.
- End each artifact with open questions and what the user should bring to the next step.
