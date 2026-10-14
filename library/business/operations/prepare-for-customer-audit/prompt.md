---
schema: 1
id: prepare-for-customer-audit
kind: prompt
title: Prepare for a customer audit
description: Prepares a supplier for a customer's quality, security or compliance audit - documents to gather, likely questions, the walk-through route, who answers what and how to handle findings.
category: operations
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, founder, manager]
requires: [none]
inputs: [notes, document, text]
output: [plan, checklist, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [supplier-audit, audit-preparation, customer-requirements, audit-findings, quality-assurance]
pairs_with:
  prompts: [write-capa-report, audit-sop-library, write-quality-control-checklist]
args:
  - name: audit_notice
    description: What the customer has told you - audit type (quality, food safety, information security, social or ethical, general supplier), date, on site or remote, agenda, the standard or questionnaire they use, and who is coming.
    type: text
    required: true
  - name: business
    description: What you supply to them, your size and sites, the certifications you hold, and the procedures and records you have.
    type: text
    required: true
  - name: concerns
    description: Known weak spots - missing records, past complaints from this customer, open corrective actions, areas you worry about.
    type: text
output_contract:
  format: markdown
  sections: [What this audit will test, Preparation timeline, Document pack, Likely questions, Walk-through route, Roles on the day, Handling findings, Gaps to close first]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A customer audit tests whether what you say you do matches what you actually do, and the auditor samples evidence to find out: a recent order traced from enquiry to delivery, training records for the person they see working, calibration status of the gauge on the bench, how their last complaint was handled. Customer auditors focus first on their own product and their contract requirements, then on your system. Suppliers fail audits less often for missing paperwork than for inconsistency: a procedure nobody follows, a record filled in the night before, or a manager answering for a process they do not run. Good preparation is a self-audit against the customer's own checklist, a short, honest document pack, a tidy and safe walk route that still shows real work, people who answer their own questions, and a calm process for agreeing findings in writing before the auditor leaves.
</context>

<task>
Audit notice:
<audit_notice>
{{audit_notice}}
</audit_notice>

Our business:
<business>
{{business}}
</business>

{{#concerns}}Known weak spots:
<concerns>
{{concerns}}
</concerns>{{/concerns}}

1. Say what this audit type is likely to test, starting with this customer's product and requirements. If they named a standard or questionnaire, organise the preparation by its sections; if not, ask for it and use a general structure meanwhile.
2. Build a preparation timeline working back from the audit date: self-audit, gap fixes, document pack, briefing, rehearsal of the trace exercise.
3. List the document pack: certificates, organisation chart, procedures, and a sample of recent records for their product (orders, inspection, nonconformances, complaints, training, calibration, supplier approvals). Mark each item as have, partial or missing from the details given.
4. Write likely auditor questions per area, including a full trace of one recent order or batch for this customer.
5. Plan the walk-through route in the order the product flows, with things to check in each area beforehand (labelling, quarantine areas, uncontrolled documents, safety).
6. Assign roles: host, a person who answers for each process, a note-taker, and who can agree findings.
7. Explain how to handle findings: agree the facts and the requirement on the day, ask for them in writing, do not argue or promise dates on the spot, and plan the corrective action reply.
8. Rank the gaps to close before the audit, separating what can be fixed honestly in time from what to disclose with a plan.
</task>

<constraints>
- Never suggest backdating, fabricating or "tidying up" records to mislead the auditor. If a record is missing, say how to start it now and disclose the gap with a plan.
- Do not invent the customer's requirements or scoring; mark anything not given as `[CONFIRM with customer]`.
- Coach staff to answer honestly from their own work and to say "I will check" rather than guess.
- Keep confidentiality in view: say what not to show (other customers' drawings, prices or data) and to agree confidentiality before sharing sensitive records.
</constraints>

<output_format>
## What this audit will test
## Preparation timeline
Table: When | Task | Owner.
## Document pack
Table: Item | Status (have / partial / missing) | Action.
## Likely questions
Grouped by area, plus the order trace.
## Walk-through route
Numbered stops with pre-checks.
## Roles on the day
## Handling findings
## Gaps to close first
Ranked list.
</output_format>
