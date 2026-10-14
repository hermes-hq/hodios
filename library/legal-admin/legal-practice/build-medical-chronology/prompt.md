---
schema: 1
id: build-medical-chronology
kind: prompt
title: Build a medical chronology for a case
description: Turns medical records for an injury or negligence matter into a sourced chronology with providers, complaints, findings, treatment and gaps, plus pre-existing conditions and questions for an expert.
category: legal-practice
version: 1.0.0
status: incubating
stage: [review, build]
role: [legal-professional]
subject: [law, medicine]
requires: [none]
inputs: [document, text]
output: [table, summary, questions]
risk: read-only
advice_risk: [legal, medical]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [medical-chronology, personal-injury, medical-records-review, treatment-gaps, causation]
pairs_with:
  prompts: [build-damages-schedule, index-case-documents, write-early-case-assessment]
  personas: [paralegal]
args:
  - name: records
    description: The medical records or extracts, each labelled with a page or Bates number so entries can be cited. Remove identifiers the reviewer does not need.
    type: text
    required: true
  - name: matter
    description: What the case is about (for example a road accident on a date, a fall, a delayed diagnosis), which side you act for, and the injuries claimed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Overview, Chronology, Pre-existing and unrelated conditions, Gaps and inconsistencies, Questions for the medical expert]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A medical chronology is the backbone of an injury, negligence or disability matter, and both sides read it for the same things: what the person reported and when, what was found, what was done, and what happened in between. The details that move a case are easy to miss in hundreds of pages: the first recorded complaint of the injured body part, symptoms noted before the incident, gaps in treatment, missed appointments, inconsistent histories given to different providers, and the treating clinician's own words on cause. A reviewer who is not a clinician must record what the notes say, cite the page, and expand abbreviations only when certain, leaving medical interpretation to a qualified expert.

Matter:
<matter>
{{matter}}
</matter>

Records:
<records>
{{records}}
</records>
</context>

<task>
1. Overview: the date range covered, the providers seen, and the main course of treatment in five or six sentences.
2. Chronology: one row per encounter in date order, with the provider and type of visit, the complaints in the patient's words where recorded, findings and tests, diagnosis as written, treatment and referrals, work or activity restrictions, and the page cite.
3. Highlight in the chronology the first post-incident mention of each claimed injury, any statement about how the injury happened, and any clinician comment on cause.
4. Pre-existing and unrelated conditions: earlier complaints or treatment of the same body parts, and conditions that may affect damages, each with its cite.
5. Gaps and inconsistencies: periods without treatment, missed or cancelled appointments, different accounts of the incident or of symptoms, and records that seem to be missing (for example a referral with no report).
6. Questions for the medical expert: what needs clinical interpretation, such as causation, prognosis, and whether a gap is clinically explained.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Record what the notes say; do not diagnose, give an opinion on causation or judge the quality of care. Those are for a qualified medical expert.
- Every entry needs a page cite. Do not merge encounters in a way that hides who said what.
- Expand an abbreviation only if certain from context; otherwise keep it and list it for the expert.
- Report helpful and unhelpful entries alike, whichever side you act for.
- Keep health data to what the matter needs; do not repeat identifiers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Overview
## Chronology
Table: Date | Provider and visit | Complaints | Findings and tests | Diagnosis as written | Treatment and plan | Cite. Mark highlights with "KEY:".
## Pre-existing and unrelated conditions
Table: Date | Condition or complaint | Relevance | Cite.
## Gaps and inconsistencies
Bullets with cites.
## Questions for the medical expert
Numbered.
</output_format>
