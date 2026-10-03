---
schema: 1
id: report-writing-track
kind: workflow
title: Report writing track
description: Takes a work report from purpose and audience to an answer-first outline, an evidence check, a full draft, an executive summary and a final edit, pausing for approval between steps.
category: business-writing
version: 1.0.0
status: incubating
stage: [plan, design, verify, build, review]
role: [consultant, manager, business-analyst, project-manager]
requires: [none]
inputs: [document, notes, dataset]
output: [plan, outline, report, summary]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [report-writing, answer-first, evidence-check, pyramid-principle, executive-summary]
pairs_with:
  prompts: [write-executive-summary, write-decision-memo, review-document-for-ambiguity, edit-for-structure]
  personas: [editor]
args:
  - name: report_purpose
    description: Why the report is being written and what should happen after it is read, for example "recommend whether to renew the cleaning contract" or "report the results of the customer survey to the board".
    type: text
    required: true
  - name: source_material
    description: The data, notes, interview findings, documents and figures the report must be built from. Label sources if you can.
    type: text
    required: true
  - name: audience
    description: Who reads it, what they already know, and who decides anything.
    type: string
steps:
  - {id: brief, file: steps/01-brief.md, stage: plan, gate: approve}
  - {id: outline, file: steps/02-outline.md, stage: design, gate: approve}
  - {id: evidence, file: steps/03-evidence-check.md, stage: verify, gate: approve}
  - {id: draft, file: steps/04-draft.md, stage: build, gate: approve}
  - {id: summary, file: steps/05-executive-summary.md, stage: build, gate: approve}
  - {id: edit, file: steps/06-final-edit.md, stage: review, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Writes a work report one approved step at a time, as an experienced report writer and editor would: brief, answer-first outline, evidence check, draft, executive summary, then a final edit.

<report_purpose>
{{report_purpose}}
</report_purpose>

<source_material>
{{source_material}}
</source_material>
{{#audience}}

Audience: {{audience}}
{{/audience}}

Each step produces one artifact and stops for approval or edits. Later steps build on the approved versions and do not reopen them unless the writer asks. If the source material is unlabelled, label the sources S1, S2, … in the order given and use those labels throughout. Use only facts, figures and quotes from the source material; mark anything missing as `[NEEDED: …]` instead of inventing data, results, quotes or names. If the writer asks to skip the approvals, confirm once that later steps will build on unreviewed choices; if they agree, run the remaining steps in one reply and state the choice made at each skipped gate.
