---
schema: 1
id: plan-customer-due-diligence
kind: prompt
title: Plan customer due diligence checks
description: Designs the client onboarding checks for a small regulated firm - identity, beneficial owners, purpose, source of funds and when to escalate - as a step-by-step procedure with records to keep.
category: compliance
version: 1.0.0
status: incubating
stage: [plan, build]
role: [founder, operations-manager, legal-professional, consultant]
subject: [law]
requires: [none]
inputs: [text]
output: [plan, checklist, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [customer-due-diligence, kyc, beneficial-ownership, client-onboarding, enhanced-due-diligence]
pairs_with:
  prompts: [write-aml-risk-assessment, set-up-sanctions-screening, write-client-intake-questionnaire]
args:
  - name: firm
    description: The firm and its client types - individuals, sole traders, companies, trusts, charities, overseas clients - how clients are onboarded (in person, video, online), the services, and any existing checks or tools.
    type: text
    required: true
  - name: country
    description: Country and AML supervisor if known.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Risk-based levels, Procedure by client type, Escalation triggers, Records and ongoing monitoring, Client-facing request]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small firm in an AML-regulated sector set up client due diligence (often called KYC) that is proportionate and auditable. Regimes commonly require identifying and verifying the client, identifying beneficial owners of entities and taking reasonable steps to verify them, understanding the purpose and intended nature of the relationship, ongoing monitoring, and enhanced checks for higher risk, including politically exposed persons and high-risk countries. Simplified checks may be allowed for demonstrably low risk. Firms fail inspections less for missing a document than for inconsistency: checks done differently by each staff member, no record of the risk rating or why, beneficial ownership taken on trust from a register without any further thought, and no review of existing clients. Electronic identity verification tools help but need to be configured and understood.

Country: {{country}}
</context>

<task>
Firm:

<firm>
{{firm}}
</firm>

1. Assumptions: the regime and supervisor assumed, and what to verify (whether simplified checks are permitted, specific document or electronic verification standards, record retention periods).
2. Risk-based levels: define simplified (if permitted), standard and enhanced levels for this firm, with the factors that place a client in each.
3. Procedure by client type (individual, company, trust or other entity, overseas client): step by step - what to collect, how to verify, beneficial ownership, purpose and nature, source of funds or wealth where relevant, sanctions and politically exposed person screening, risk rating, and sign-off.
4. Escalation triggers: when to stop, when to apply enhanced checks, when senior approval is needed, and when to report internally to the nominated officer. Note tipping-off risk.
5. Records and ongoing monitoring: what to keep and where, review frequency by risk level, events that trigger a refresh, and how to handle existing clients onboarded before the procedure.
6. Client-facing request: a short, plain message asking a new client for the documents, explaining why, without making them feel suspected.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not invent legal thresholds, document lists required by law, or retention periods; describe common practice and mark "verify with your supervisor".
- Never draft anything that would tip off a client about a suspicion or report.
- Handle identity documents as sensitive personal data: secure storage, limited access, and retention only as required.
- Recommend the nominated officer and supervisor guidance, and specialist advice for trusts, complex overseas structures or politically exposed clients.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.

## Risk-based levels
Table: level | when it applies | extra steps.

## Procedure by client type
Numbered steps per client type.

## Escalation triggers
Bullets.

## Records and ongoing monitoring
Table: risk level | review frequency | refresh triggers; then record-keeping bullets.

## Client-facing request
Short message.
</output_format>
