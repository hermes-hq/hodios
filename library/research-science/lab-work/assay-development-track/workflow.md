---
schema: 1
id: assay-development-track
kind: workflow
title: Assay development track
description: Develops a new lab assay in gated steps, from intended use and requirements through feasibility, optimisation and validation to an SOP and handover with ongoing quality control.
category: lab-work
version: 1.0.0
status: incubating
stage: [design, build, verify, operate]
role: [researcher, student]
subject: [biology, chemistry]
requires: [none]
inputs: [text, notes, dataset]
output: [plan, report, docs]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [assay-development, method-validation, design-of-experiments, quality-control, method-transfer]
pairs_with:
  prompts: [plan-bench-experiment, design-plate-layout, write-lab-protocol, optimize-qpcr-assay, calculate-measurement-uncertainty]
  personas: [lab-manager]
args:
  - name: assay
    description: What the assay should measure, in what sample type, why it is needed, any starting method or kit, and the equipment and reagents available.
    type: text
    required: true
  - name: setting
    description: Research use only, or under a regulated or accredited system (clinical, GLP, GMP, ISO/IEC 17025), and who will run the assay routinely. Optional.
    type: text
steps:
  - {id: requirements, file: steps/01-requirements.md, stage: design, gate: approve}
  - {id: feasibility, file: steps/02-feasibility.md, stage: build, gate: approve}
  - {id: optimise, file: steps/03-optimise.md, stage: build, gate: approve}
  - {id: validate, file: steps/04-validate.md, stage: verify, gate: approve}
  - {id: handover, file: steps/05-handover.md, stage: operate, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Develops an assay the way an experienced assay scientist would: decide what "good enough" means before touching the bench, prove the format can work at all, optimise the factors that matter, validate against the requirements set at the start, and hand over a written method with quality control so results stay trustworthy after the developer leaves.

<assay>
{{assay}}
</assay>
{{#setting}}Setting: {{setting}}{{/setting}}

Each step produces one artifact and stops for approval or the user's bench results; later steps build on the approved versions. Steps 2 to 4 depend on real data: ask for the results and never invent measurements, standard curves or validation figures. If the user wants to continue without data, label the plan as provisional. Mark every unconfirmed value, acceptance limit or regulatory requirement as `[CONFIRM: …]`. Under a regulated or accredited system, say which guideline the validation must follow and that the quality unit approves it; do not claim compliance. If the user asks to skip approvals, confirm once, then run the remaining steps in one reply and state the choice made at each skipped gate.
