---
schema: 1
id: assess-international-data-transfer
kind: prompt
title: Assess an international data transfer
description: Checks whether sending personal data to a supplier or team in another country needs a transfer mechanism, which one may fit, the risk assessment to document and the supplementary measures to consider.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, review]
role: [operations-manager, founder, legal-professional, engineering-manager]
subject: [law, saas]
requires: [none]
inputs: [text, document]
output: [report, checklist, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [data-transfers, cross-border-data, transfer-risk-assessment, standard-contractual-clauses, adequacy]
pairs_with:
  prompts: [review-data-processing-agreement, map-personal-data-processing, run-vendor-due-diligence]
  personas: [compliance-officer]
args:
  - name: transfer
    description: What is being sent or made accessible, to whom (supplier, group company, contractor), in which country, for what purpose, how (hosting, remote access, support access), and the kinds of personal data and people involved.
    type: text
    required: true
  - name: origin
    description: Where the organisation and the people whose data it is are based - for example "EU company, EU customers", "UK", "Brazil", "California".
    type: string
    required: true
  - name: supplier_documents
    description: What the supplier offers - DPA, transfer clauses, certifications, data location options, encryption details, transparency reports. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Is this a restricted transfer, Mechanism options, Risk assessment, Supplementary measures, Questions for the supplier, Record and next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation handle a cross-border transfer of personal data. Several data protection regimes (EU and UK GDPR, Switzerland, Brazil's LGPD, and others) restrict sending personal data to countries without an adequacy decision or equivalent recognition, unless an approved mechanism is used: standard contractual clauses or an addendum, binding corporate rules, certification schemes or frameworks recognised for a particular country, or narrow derogations for occasional transfers. Under some regimes the exporter must also assess whether the destination's laws and practices, especially government access, could undermine the protections, and add supplementary measures where needed. Points novices miss: remote access from abroad (a support engineer viewing data) can count as a transfer; onward transfers by the supplier's subprocessors matter; adequacy decisions and frameworks can change or be challenged; and encryption only helps if the keys stay out of reach of the importer where that is the risk.
</context>

<task>
Transfer:

<transfer>
{{transfer}}
</transfer>

Origin: {{origin}}
{{#supplier_documents}}

Supplier documents and offers:
<supplier>
{{supplier_documents}}
</supplier>
{{/supplier_documents}}

1. Is this a restricted transfer under the origin regime? Consider hosting location, remote access, subprocessors and onward transfers. Name the regime as an assumption to verify.
2. Mechanism options: whether the destination may have adequacy or a recognised framework (marked "verify the current status"), whether transfer clauses or an addendum are offered and the right module or party roles (controller to processor, processor to subprocessor), and whether any derogation could apply (usually only for occasional, necessary transfers).
3. Risk assessment: the data's sensitivity and volume, the likelihood of government access in practice for this type of supplier and data, the supplier's track record and transparency, and the practical effect of existing measures. Keep it proportionate for a small organisation.
4. Supplementary measures: technical (encryption in transit and at rest with keys held by the exporter where feasible, pseudonymisation, regional hosting, access restrictions), contractual (notice of government requests, challenge commitments, audit rights) and organisational (minimisation, access logging).
5. Questions for the supplier.
6. Record and next steps: a short transfer record (what, where, mechanism, assessment summary, measures, review date) and updates needed to the processing register and privacy notice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state that a country has or lacks adequacy, or that a framework is valid, as current fact; adequacy and frameworks change. Say "verify the current status" with the regulator's published list.
- Do not invent clause modules, article numbers, certification names or supplier facts.
- Do not conclude a transfer is "compliant" outright; describe the position and residual risk.
- Recommend a data protection professional for special category data, large volumes, transfers to destinations with known government-access concerns, or where the supplier refuses transfer clauses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Is this a restricted transfer
Short answer with reasoning and assumptions.

## Mechanism options
Table: option | available? | fit | to verify.

## Risk assessment
Bullets and a short conclusion.

## Supplementary measures
Table: measure | type | effect | effort.

## Questions for the supplier
Numbered list.

## Record and next steps
Transfer record and checklist.
</output_format>
