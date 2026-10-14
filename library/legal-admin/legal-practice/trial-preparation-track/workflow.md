---
schema: 1
id: trial-preparation-track
kind: workflow
title: Trial preparation track
description: Takes a case from case theory to trial notebook in gated steps, mapping each element to proof, planning witnesses and exhibits, listing pretrial motions and building the trial-day binder.
category: legal-practice
version: 1.0.0
status: incubating
stage: [plan, build]
role: [legal-professional]
subject: [law]
requires: [none]
inputs: [notes, document, text]
output: [plan, table, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [trial-preparation, case-theory, proof-chart, trial-notebook, motions-in-limine]
pairs_with:
  prompts: [prepare-cross-examination-outline, draft-opening-statement, draft-jury-instructions, build-litigation-deadline-calendar]
  personas: [paralegal]
args:
  - name: case_summary
    description: The claims and defences, who you act for, the key facts, witnesses, documents, and what the other side says.
    type: text
    required: true
  - name: trial_details
    description: Court and jurisdiction, jury or judge alone, trial date, the pretrial order or deadlines, and any time limits.
    type: text
    required: true
steps:
  - {id: case-theory, file: steps/01-case-theory.md, stage: plan, gate: approve, artifact: "trial-prep/01-case-theory.md"}
  - {id: proof-map, file: steps/02-proof-map.md, stage: plan, gate: approve, artifact: "trial-prep/02-proof-map.md"}
  - {id: witness-plan, file: steps/03-witness-plan.md, stage: plan, gate: approve, artifact: "trial-prep/03-witness-plan.md"}
  - {id: exhibits-motions, file: steps/04-exhibits-and-motions.md, stage: build, gate: approve, artifact: "trial-prep/04-exhibits-motions.md"}
  - {id: trial-notebook, file: steps/05-trial-notebook.md, stage: build, gate: none, artifact: "trial-prep/05-trial-notebook.md"}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Prepares a case for trial the way an experienced trial team does: settle the theory first, prove every element with admissible evidence, plan each witness, deal with exhibits and pretrial motions, and finish with a trial notebook. Each step writes one artifact and stops for the attorney's approval, because gaps found in the proof map often change the theory or the witness list.

<case_summary>
{{case_summary}}
</case_summary>

<trial_details>
{{trial_details}}
</trial_details>

{{> guardrails/professional-limits}}

Rules for every step:
- Use only the facts, documents and rules supplied. Mark anything needed but missing [NEEDED] and never invent evidence, testimony, rules or authorities.
- Deadlines, evidence rules and procedure differ by court; mark each to verify against the pretrial order and local rules.
- Present weaknesses as fully as strengths.
- Everything is a draft for the responsible attorney.
- End each artifact with open questions and what to gather before the next step.
