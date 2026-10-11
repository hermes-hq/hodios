---
schema: 1
id: correct-error-on-official-record
kind: prompt
title: Correct an error on an official record
description: Plans fixing a mistake on a birth or marriage certificate, ID card, residence permit or civil register entry - which procedure applies, the evidence needed, and which other records to fix after.
category: paperwork
version: 1.0.0
status: incubating
stage: [plan]
role: [individual, parent]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, message, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [record-correction, civil-register, spelling-mistake, document-mismatch, rectification]
pairs_with:
  prompts: [replace-birth-or-marriage-certificate, resolve-name-mismatch-in-documents, prepare-name-change]
args:
  - name: error
    description: Which document or record has the mistake, what it says and what it should say (for example a misspelt name, wrong date of birth, wrong place, missing parent, wrong sex marker), and how you found out.
    type: text
    required: true
  - name: issued_by
    description: The country and the office that issued the record.
    type: string
    required: true
  - name: impact
    description: What the error is blocking, for example a passport application, a visa, a pension, a marriage, or an inheritance. Optional.
    type: string
output_contract:
  format: markdown
  sections: [Correction or change, Procedure, Evidence, Request letter, Records to update after, Confirm with the office]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Errors on official records cause trouble out of proportion to their size: a one-letter difference between a birth certificate and a passport can stop a visa, a marriage abroad or a pension claim. Most systems distinguish a clerical correction (the record was wrong when made, often fixed administratively by the registry with documentary evidence from the time) from a change (the facts changed later, such as a legal name change or gender recognition, which follows a different procedure), and some corrections need a court order. The fix must start with the source record: correcting a passport usually requires the underlying civil record to be right first, otherwise the error reappears at renewal. Evidence made close to the event (hospital records, baptism records, school records, older passports) is usually weighted most. After the correction, every record built on the old one needs updating in the right order.

Issued by: {{issued_by}}
{{#impact}}Blocking: {{impact}}{{/impact}}
</context>

<task>
Error:
<error>
{{error}}
</error>

1. Correction or change: decide whether this is likely a clerical correction, a change, or something that may need a court order, and which record is the source that must be fixed first.
2. Procedure: the type of office that usually handles it for {{issued_by}}, how applications are typically made, who can apply, whether a fee is common, and typical timing, all marked verify. If the person lives abroad, include consulate routes.
3. Evidence: documents that prove what the record should say, ranked by strength, with early-life documents first, and what to do if few exist (sworn statements, affidavits from relatives where accepted).
4. Request letter: a short factual letter to the office describing the error, the correct details and the evidence enclosed, with [BRACKETS] for personal details.
5. Records to update after: the order of other records to fix (ID, passport, residence permit, tax, social security, bank, employer, pension, children's records) and what to keep.
6. Confirm with the office: questions to ask.
If the error blocks something urgent, add a short note on interim options (a letter from the registry confirming the correction is under way, or explaining the discrepancy) marked verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never suggest altering a document by hand, using an uncorrected document as if corrected, or giving different details to different authorities.
- Do not state procedures, fees or timings as fact; mark them verify.
- If the "correction" is really a change of facts (age, parentage, identity) that could affect rights or benefits, say it may need a court or specialist procedure and legal advice.
- Keep personal identifiers out of the output; use [BRACKETS].
{{> output/uncertainty}}
</constraints>

<output_format>
## Correction or change
Short answer and the source record.

## Procedure
Bullets, marked verify.

## Evidence
Ranked checklist.

## Request letter
The letter text.

## Records to update after
Ordered checklist.

## Confirm with the office
Numbered questions.
</output_format>
