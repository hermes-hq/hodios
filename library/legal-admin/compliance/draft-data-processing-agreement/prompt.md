---
schema: 1
id: draft-data-processing-agreement
kind: prompt
title: Draft a data processing agreement for your customers
description: Drafts the data processing agreement a SaaS or service provider offers its business customers - instructions, security annex, subprocessors, transfers, breach notice, audits and deletion.
category: compliance
version: 1.0.0
status: incubating
stage: [build]
role: [founder, operations-manager, legal-professional]
subject: [law, saas]
requires: [none]
inputs: [text, document]
output: [docs, table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [data-processing-agreement, processor-obligations, subprocessors, standard-contractual-clauses, security-measures, vendor-contracts]
pairs_with:
  prompts: [review-data-processing-agreement, assess-international-data-transfer, answer-security-questionnaire, map-personal-data-processing]
args:
  - name: service
    description: What your product or service does, whose personal data customers put in it and which types, where it is hosted, your subprocessors (hosting, email, support, analytics) and their locations, and your actual security measures.
    type: text
    required: true
  - name: customers
    description: Where your customers are based, their size, and what they have asked for in negotiations (breach notice hours, audit rights, liability). Optional.
    type: text
  - name: jurisdiction
    description: The data protection law the DPA is written for, for example EU GDPR, UK GDPR or both.
    type: string
    default: "EU GDPR and UK GDPR"
output_contract:
  format: markdown
  sections: [Processing description, DPA clauses, Security measures annex, Subprocessor annex, Transfer mechanism, Negotiation positions, Points to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a service provider draft the data processing agreement (DPA) it offers customers who are controllers. GDPR-style laws require a written contract with set terms: process only on the controller's documented instructions; staff confidentiality; appropriate security; conditions for using subprocessors (prior specific or general authorisation, notice of changes with a right to object, and the same obligations flowed down); assistance with data subject requests, security, breach notification and impact assessments; deletion or return at the end; and making information available and allowing audits. It also needs a description of the processing (subject matter, duration, nature and purpose, data types, categories of people) and the security measures, usually in annexes. International transfers need a mechanism such as standard contractual clauses in the correct module or an adequacy decision. Providers get into trouble by attaching a security annex that describes measures they do not have, leaving out subprocessors, forgetting to carve out processing they do as a controller for their own purposes (billing, product analytics, security), and promising breach notice times or on-site audits they cannot meet. Customers commonly negotiate breach notice timing, audit rights, subprocessor objections and liability, so a provider benefits from a clear fallback position for each.

Law: {{jurisdiction}}
</context>

<task>
Service:
<service>
{{service}}
</service>
{{#customers}}

Customers:
<customers>
{{customers}}
</customers>
{{/customers}}

1. Processing description: the annex describing subject matter, duration, nature and purpose, data types, special category data if any, and categories of data subjects, drawn only from what the user said.
2. DPA clauses: numbered clauses in plain contract English covering roles and scope, instructions, confidentiality, security, subprocessors, assistance, breach notification, deletion and return, audits and information, transfers, liability and order of precedence, term, and the provider's own controller processing kept separate. Use [BRACKETS] for party names, notice periods and contacts.
3. Security measures annex: structured by area (access control, encryption, logging, backups, resilience, incident response, personnel, supplier management, testing), stating only the measures the user said exist and marking others "[CONFIRM OR REMOVE]".
4. Subprocessor annex: table of subprocessors from the input with purpose and location, and the change notification mechanism.
5. Transfer mechanism: which transfers occur and the mechanism likely needed, as a point to confirm.
6. Negotiation positions: for breach notice timing, audits, subprocessor objections, liability, deletion timing and assistance costs, give the standard position, an acceptable fallback, and a red line.
7. Points to verify.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Never describe security measures, certifications or subprocessors the user did not mention as if they exist.
- Do not invent clause references to specific laws beyond those you are confident of; mark them "confirm".
- Do not reproduce standard contractual clauses text; refer to the official clauses and the module to select.
- Recommend a lawyer review before the DPA is offered, especially for health, financial or children's data.
{{> output/uncertainty}}
</constraints>

<output_format>
## Processing description
Table: item | description.

## DPA clauses
Numbered clauses.

## Security measures annex
Grouped list by area.

## Subprocessor annex
Table: subprocessor | purpose | location | transfer mechanism.

## Transfer mechanism
Short explanation.

## Negotiation positions
Table: topic | standard position | fallback | red line.

## Points to verify
Numbered list.
</output_format>
