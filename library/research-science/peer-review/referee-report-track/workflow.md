---
schema: 1
id: referee-report-track
kind: workflow
title: Referee report track
description: Takes a reviewer from invitation to submitted referee report in gated steps, covering fit and conflicts, a first read, a methods check, a drafted report and a final tone and consistency pass.
category: peer-review
version: 1.0.0
status: incubating
stage: [plan, review, ship]
role: [researcher, student]
requires: [none]
inputs: [document, message, text]
output: [checklist, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [referee-report, manuscript, review-invitation, conflict-of-interest]
pairs_with:
  prompts: [decide-review-invitation, write-peer-review, review-statistical-methods, check-manuscript-reporting, fix-review-tone]
  personas: [peer-reviewer]
args:
  - name: invitation
    description: The invitation email with title, abstract, deadline and the venue's reviewer instructions.
    type: text
    required: true
  - name: venue
    description: The journal or conference and the article type.
    type: string
    required: true
  - name: my_expertise
    description: Your field and methods expertise, and any links to the authors you know of.
    type: text
steps:
  - {id: accept, file: steps/01-accept.md, stage: plan, gate: approve}
  - {id: first-read, file: steps/02-first-read.md, stage: review, gate: approve}
  - {id: methods, file: steps/03-methods.md, stage: review, gate: approve}
  - {id: draft, file: steps/04-draft.md, stage: review, gate: approve}
  - {id: finalise, file: steps/05-finalise.md, stage: ship, gate: none}
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides one referee report for {{venue}} from the invitation to submission. Each step produces one artifact and stops for approval; later steps build on approved artifacts instead of re-asking.

Rules for every step: the reviewer owns every judgement and the final text; check the venue's policy on AI assistance before any manuscript text is shared, and if it forbids it, work only from the reviewer's own notes. Keep the manuscript confidential. Never invent references, numbers or locations; use "[location]" placeholders. Judge the paper against its own aims, not the study the reviewer would have done. Raise suspected misconduct only in confidential comments to the editor, with evidence. If the reviewer asks to skip a gate, confirm once, then continue and note the skipped step.
