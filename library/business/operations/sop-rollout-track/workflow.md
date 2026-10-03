---
schema: 1
id: sop-rollout-track
kind: workflow
title: SOP rollout track
description: Rolls out a new standard operating procedure in gated steps - draft, review with the staff who do the work, train, audit after two weeks and revise - so the procedure is actually followed.
category: operations
version: 1.0.0
status: incubating
stage: [build, review, operate]
role: [operations-manager, manager, founder]
requires: [none]
inputs: [notes, document, text]
output: [docs, checklist, plan, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [standard-operating-procedure, change-rollout, staff-training, process-audit, adoption]
pairs_with:
  prompts: [write-sop, map-business-process, write-operations-manual, run-five-whys]
args:
  - name: process
    description: The process the SOP covers, how it is done today (or how it should be done if new), why it is changing, and any existing document.
    type: text
    required: true
  - name: team
    description: Who will follow it - roles, number of people, shifts or sites, experience, language needs - and who owns the SOP.
    type: text
    required: true
steps:
  - {id: draft, file: steps/01-draft.md, stage: build, gate: approve}
  - {id: staff-review, file: steps/02-staff-review.md, stage: review, gate: approve}
  - {id: train, file: steps/03-train.md, stage: operate, gate: approve}
  - {id: audit, file: steps/04-audit.md, stage: review, gate: approve}
  - {id: revise, file: steps/05-revise.md, stage: build, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Rolls out a standard operating procedure the way an experienced operations manager would: a draft, a review with the people who do the work, training, an audit after two weeks of real use, and a revision based on what the audit found.

<process>
{{process}}
</process>

<team>
{{team}}
</team>

Each step produces one artifact and stops for the owner's approval or edits; later steps build on the approved versions. Steps 2 and 4 need input from the real world (staff feedback, audit observations): ask for it, and if the owner wants to continue without it, label anything you assume as "(assumed, not observed)". Never invent staff feedback, audit results, safety limits, approval thresholds or legal requirements; mark gaps as `[CONFIRM: …]`. If the owner asks to skip approvals, confirm once, then run the remaining steps in one reply and state the choice made at each skipped gate.
