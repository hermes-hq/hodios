---
schema: 1
id: prepare-farm-assurance-audit
kind: prompt
title: Prepare for a farm assurance audit
description: Prepares a farm for an assurance scheme or buyer audit with the records to have ready, a walk-round self-check of yards, stores and animals, and a fix list ranked by likely non-conformance.
category: farming
version: 1.0.0
status: incubating
stage: [plan, verify]
role: [founder, individual, operations-manager]
subject: [agriculture]
requires: [none]
inputs: [notes, document, text]
output: [checklist, table, plan]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [farm-assurance, audit-preparation, non-conformance, farm-records, self-assessment]
pairs_with:
  prompts: [answer-farm-audit-findings, plan-livestock-record-keeping, prepare-for-food-safety-inspection]
args:
  - name: enterprise
    description: What the farm produces and its size (for example "250 dairy cows, 80 ha grass, contract-reared heifers"), how records are kept now, and any past audit findings or known weak spots.
    type: text
    required: true
  - name: scheme
    description: The scheme or buyer standard being audited against and its version if known. Paste the relevant checklist or standards headings into enterprise if you have them.
    type: string
    required: true
  - name: audit_date
    description: Optional. Date of the audit, or "unannounced" if the scheme does spot checks.
    type: string
output_contract:
  format: markdown
  sections: [Audit snapshot, Records to have ready, Walk-round self-check, Fix list, Countdown, On the day, Questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a farmer get ready for an assurance scheme or buyer audit. Most non-conformances are not about bad farming; they are about missing or inconsistent records: a medicine used with no record of the withdrawal period, a sprayer operator whose certificate expired, a feed delivery with no ticket, a cleaning schedule nobody signed, a pest control log with gaps. The yard walk-round catches the rest: an unlocked or unbunded chemical store, out-of-date medicines, poor lying areas, lame animals not being treated, broken fencing. Auditors check the farm against the standard, so preparation means working from the scheme's own checklist, checking records against each other (does the medicine book match the vet invoices?), and fixing the biggest risks first.

Scheme: {{scheme}}
{{#audit_date}}Audit date: {{audit_date}}{{/audit_date}}
</context>

<task>
<enterprise>
{{enterprise}}
</enterprise>

1. If the scheme's standards or checklist were pasted, work from them and quote the reference for each item. If not, use the common areas such schemes cover and say clearly that the scheme's current standards must be checked line by line.
2. List the records to have ready, for this enterprise: holding and animal identification and movements; medicine purchases and use with withdrawal periods; vet health plan and review; feed and bedding sources; fertiliser, manure and plant protection product applications; operator training and certificates; equipment tests and calibrations; cleaning, pest control and water checks; staff training; complaints and previous corrective actions.
3. Cross-check: say which records should agree (medicine book vs vet invoices, spray records vs product stock, animal numbers vs movement records) and how to check them.
4. Write a walk-round self-check route: entrance and signage, yards, buildings and housing, animals (condition, lameness, water, feed, lying area), medicine store, chemical and fuel stores, feed stores, waste and fallen stock, field margins and watercourses.
5. Rank the fix list by likely grade (major or critical first: animal welfare, food safety and medicine records, then minor), with effort and owner.
6. Write a countdown from today to the audit date (ask for it if none was given), or a standing "always ready" routine if the audit is unannounced, and what to do on the day.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state any scheme's specific requirement, grading or deadline as fact unless it was pasted; mark it `[CHECK scheme standard]`.
- Never suggest creating, backdating or altering records to cover a gap; a gap is fixed going forward and explained honestly.
- Animal health questions go to the farm's vet; legal duties to check with the relevant authority.
- If the enterprise or scheme is missing, ask and stop.
</constraints>

<output_format>
## Audit snapshot
Three to five lines: scheme, date, enterprise, biggest risks.

## Records to have ready
Table: record | what the auditor looks for | where it is kept | status (have / gaps / missing) | cross-check against.

## Walk-round self-check
Checklist grouped by area, in walking order.

## Fix list
Table: rank | issue | likely grade | fix | effort | owner | by when.

## Countdown
Dated bullets.

## On the day
Short checklist: who attends, documents laid out, how to answer questions.

## Questions
What to confirm with the scheme or the vet.
</output_format>
