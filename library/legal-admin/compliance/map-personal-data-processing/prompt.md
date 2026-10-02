---
schema: 1
id: map-personal-data-processing
kind: prompt
title: Map personal data processing
description: Drafts a record of personal-data processing activities from business processes, listing purposes, data categories, recipients, transfers, retention and open questions for privacy review.
category: compliance
version: 1.0.0
status: incubating
stage: [discover, review]
role: [founder, operations-manager, legal-professional, product-manager]
subject: [law]
requires: [none]
inputs: [text, notes]
output: [table, questions]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ropa, data-mapping, data-protection, retention]
pairs_with:
  prompts: [build-compliance-checklist, write-privacy-policy]
args:
  - name: business_processes
    description: How the business handles personal data - each process (sign-up, payments, support, marketing emails, hiring, payroll, analytics), what data it uses, which tools and vendors, where they are based, and how long data is kept, as far as you know.
    type: text
    required: true
  - name: regulation
    description: Privacy law the record is primarily for - gdpr (EU and UK style record of processing), ccpa (California data inventory), lgpd (Brazil) or other (name it in the processes text).
    type: enum
    enum: [gdpr, ccpa, lgpd, other]
    default: gdpr
output_contract:
  format: markdown
  sections: [Scope and assumptions, Processing register, Vendors and transfers, Higher-risk processing, Gaps and questions, Next steps]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help a small organisation build its first data map: a record, process by process, of what personal data it handles, why, where it goes and how long it stays. Under the GDPR this is the record of processing activities; under other laws it is the inventory behind privacy notices, access requests and vendor contracts. It is the foundation for nearly every other privacy task, and its value depends on being accurate rather than complete-looking, so unknowns must be visible, not papered over.

Primary regulation: {{regulation}}
</context>

<task>
Business processes:

<processes>
{{business_processes}}
</processes>

1. Split the description into distinct processing activities (one purpose each). A single tool can support several activities; a single activity can use several tools.
2. For each activity record: purpose; data subjects (customers, users, employees, candidates, suppliers' staff); data categories, flagging special or sensitive categories (health, biometrics, children's data, precise location, financial account data, government IDs); source; systems and vendors; recipients; international transfers; retention period; and security notes if given.
3. For the regulation, add the fields it typically expects. For gdpr: the organisation's role (controller or processor), and a candidate lawful basis marked "to confirm". For ccpa: whether data may be "sold" or "shared" for cross-context advertising, marked "to confirm". For lgpd: candidate legal basis marked "to confirm". For other: the general fields and a note on what to check.
4. List vendors with their role (likely processor or service provider vs independent controller or third party), location, and whether a data processing agreement is known to exist.
5. Flag higher-risk processing that may need extra steps (an impact assessment, consent, opt-outs): large-scale monitoring, profiling with significant effects, sensitive data, children, new technology, employee monitoring.
6. List gaps: every field you could not fill from the description, as specific questions to the process owner.
</task>

<constraints>
{{> guardrails/professional-limits}}
- This is a working draft for review by the organisation's privacy lead, data protection officer or counsel. Label lawful bases, roles and legal conclusions "to confirm"; never state that processing is lawful or compliant.
- Use only what the description says. Write "unknown" rather than guessing retention periods, vendor locations or data fields, and turn each unknown into a question.
- Do not invent article numbers or legal citations. Refer to requirements in general terms unless you are certain of the reference.
- Keep one row per activity; do not merge different purposes into one row just because they use the same tool.
- If the description includes actual personal data (names, emails, customer records), do not repeat it; describe categories only.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
Bullets: organisation role assumed, regulation, what was in and out of scope.

## Processing register
Table: # | activity | purpose | data subjects | data categories (sensitive marked) | source | systems and vendors | recipients | transfers | retention | basis or legal ground (to confirm).

## Vendors and transfers
Table: vendor | what it does | likely role | location | agreement in place.

## Higher-risk processing
Bullets: activity - why it is higher risk - step to consider.

## Gaps and questions
Numbered questions, grouped by process owner.

## Next steps
Short checklist.
</output_format>
