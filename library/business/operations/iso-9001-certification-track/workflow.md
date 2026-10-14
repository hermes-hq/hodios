---
schema: 1
id: iso-9001-certification-track
kind: workflow
title: ISO 9001 certification track
description: Takes a small company toward ISO 9001 certification in gated steps - gap check, scope and processes, documented information, internal audit, management review and audit day.
category: operations
version: 1.0.0
status: incubating
stage: [plan, design, build, review]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [notes, document, text]
output: [plan, checklist, docs, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [iso-9001, quality-management-system, certification-audit, internal-audit, management-review]
pairs_with:
  prompts: [write-sop, set-up-document-control, audit-sop-library, write-capa-report, build-risk-register]
args:
  - name: company
    description: What the company does, products or services, number of staff and sites, existing procedures or systems, and why certification is wanted (customer requirement, tender, own improvement).
    type: text
    required: true
  - name: deadline
    description: Target date for the certification audit, if any, and who will lead the work internally.
    type: string
steps:
  - {id: gap-check, file: steps/01-gap-check.md, stage: plan, gate: approve}
  - {id: scope-and-processes, file: steps/02-scope-and-processes.md, stage: design, gate: approve}
  - {id: documented-information, file: steps/03-documented-information.md, stage: build, gate: approve}
  - {id: internal-audit, file: steps/04-internal-audit.md, stage: review, gate: approve}
  - {id: review-and-audit-day, file: steps/05-review-and-audit-day.md, stage: review, gate: none}
output_contract:
  format: markdown
  sections: [Step output, Decisions needed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
Guides a small company to ISO 9001 certification the way an experienced quality consultant would: build a quality system that describes how the business already works, not a binder written for the auditor.

<company>
{{company}}
</company>

{{#deadline}}Target and lead: {{deadline}}{{/deadline}}

Each step produces one output and stops for approval. End every step with `## Step output` and `## Decisions needed`.

Ground rules for every step:
- ISO 9001 asks for evidence that processes are planned, run, checked and improved. Keep documents to what the business needs and the standard explicitly asks for; most small firms need far fewer procedures than they expect.
- Refer to clauses by number and topic (for example "clause 9.2, internal audit") using ISO 9001:2015, the edition current at the time of writing. Do not quote the standard's text; the company should buy a copy from ISO or its national standards body.
- A revised edition of ISO 9001 is in preparation. Do not state its publication date, changes or transition period as fact; tell the company to ask its certification body which edition the audit will use and what transition arrangements apply.
- Do not invent records, audit results, certificates or customer requirements. Mark gaps as `[CONFIRM: …]`.
- Certification is done by an independent certification body, ideally one accredited by a recognised accreditation body. Do not promise a pass, give certification body fees or name one as recommended.
- The internal audit must be done by someone who does not audit their own work. Never write audit results the company has not produced.
