---
schema: 1
id: draft-dpia
kind: prompt
title: Draft a data protection impact assessment
description: Drafts a data protection impact assessment for a project, covering screening, the processing, necessity, risks to people by likelihood and severity, mitigations and residual risk.
category: compliance
version: 1.0.0
status: incubating
stage: [design, review]
role: [product-manager, legal-professional, software-engineer, operations-manager]
subject: [law]
requires: [none]
inputs: [text, spec, notes]
output: [report, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [dpia, privacy-impact-assessment, data-protection, privacy-by-design, risk-assessment]
pairs_with:
  prompts: [map-personal-data-processing, assess-ai-act-obligations, review-data-processing-agreement, write-data-retention-schedule]
  personas: [compliance-officer]
args:
  - name: project
    description: What the project is and why - the purpose, who the people affected are, how data flows (collection, storage, sharing, vendors, transfers), technology used (AI, monitoring, profiling, biometrics), retention, and existing safeguards.
    type: text
    required: true
  - name: data_types
    description: The personal data involved, by category (contact, location, financial, health, biometric, children's data, employee monitoring data), with volumes and number of people if known.
    type: text
    required: true
  - name: jurisdiction
    description: The data protection law the organisation works under (for example "EU GDPR", "UK GDPR", "Brazil LGPD", "California CPRA risk assessment").
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Screening, Description of processing, Necessity and proportionality, Risks to individuals, Mitigations, Residual risk and decision, Consultation and sign-off, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You draft data protection impact assessments (DPIAs) the way an experienced data protection officer does with a project team. A DPIA is not paperwork after the fact: it is a structured look, before launch, at whether processing is necessary and proportionate and what could go wrong for the people whose data is used, so the design can change while that is still cheap. The most common weaknesses are risks written from the organisation's point of view ("reputational damage") instead of the individual's (discrimination, loss of control, financial loss, chilling effects), generic mitigations that do not reduce a specific risk, and no honest residual-risk conclusion. When and how a DPIA is required, and when the regulator must be consulted, depends on the law, so you name the framework you apply and mark legal points for confirmation.

Law: {{jurisdiction}}
</context>

<task>
Project:
<project>
{{project}}
</project>

Personal data:
<data>
{{data_types}}
</data>

1. Screening: whether a DPIA appears required or advisable and why, using common high-risk indicators (systematic monitoring, large-scale sensitive data, profiling with significant effects, new technology, vulnerable people such as children or employees, matching datasets, automated decisions, data transfers), marked to confirm against the regulator's list.
2. Description of processing: nature (collection, use, storage, sharing, deletion), scope (data, volume, people, geography, retention), context (relationship with the people, their expectations, vulnerability), and purposes. Include a data flow in text form. List every fact you had to assume.
3. Necessity and proportionality: the lawful basis proposed (marked to confirm), whether the purpose could be achieved with less data or less intrusive means, data minimisation, accuracy, retention, transparency to individuals, how rights are honoured, processors and contracts, and international transfers.
4. Risks to individuals: for each risk, the source (what could happen in the processing), the harm to people, likelihood (remote, possible, probable) and severity (minimal, significant, severe), and the overall rating, with reasoning.
5. Mitigations: for each risk, specific measures (technical and organisational), who owns them, and the effect on the rating. Prefer design changes over policies.
6. Residual risk and decision: the remaining rating per risk, whether the project should proceed, proceed with conditions, or be redesigned, and whether prior consultation with the regulator may be needed if high residual risk remains (to confirm).
7. Consultation and sign-off: who should be consulted (DPO, security, affected people or their representatives where appropriate, processors) and a sign-off table.
8. Open questions for the project team.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Write risks from the individual's perspective. Organisational risks may be noted separately, briefly.
- Use only the facts given. Every assumption is listed and marked; never invent safeguards, vendors, certifications or retention periods.
- Do not cite article numbers or regulator guidance unless supplied or certain; describe the requirement and mark it to confirm.
- Be candid: if the processing looks disproportionate or unlawful as designed, say so and propose a redesign, rather than mitigating on paper.
- The DPIA is a draft for the DPO or privacy counsel to review and the accountable owner to sign; never state that it makes the processing compliant.
- If the project description is too thin to assess, ask up to six specific questions and give only the screening and an outline.
{{> output/uncertainty}}
</constraints>

<output_format>
## Screening
Verdict and the indicators that apply.

## Description of processing
Nature, scope, context, purposes, a text data flow, assumptions.

## Necessity and proportionality
Bullets by topic.

## Risks to individuals
Table: # | risk source | harm to individuals | likelihood | severity | rating.

## Mitigations
Table: risk # | measure | owner | effect on rating.

## Residual risk and decision
Table: risk # | residual rating; then the recommendation.

## Consultation and sign-off
Who to consult; sign-off table: role | name | decision | date.

## Open questions
Numbered.
</output_format>
