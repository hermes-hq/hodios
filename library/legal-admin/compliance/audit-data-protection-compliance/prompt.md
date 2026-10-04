---
schema: 1
id: audit-data-protection-compliance
kind: prompt
title: Audit a product for data protection
description: Audits a software product, its code and processes against data protection expectations such as GDPR and CCPA, with a pass, partial or gap status per requirement and the product change each gap needs.
category: compliance
version: 1.0.0
status: incubating
aliases: [legal-gdpr-audit]
stage: [review]
role: [founder, product-manager, backend-engineer, legal-professional]
subject: [law, saas]
requires: [none]
inputs: [text, repo, document]
output: [checklist, report, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [ccpa, data-protection, privacy-engineering, data-subject-rights, lawful-basis]
pairs_with:
  prompts: [map-personal-data-processing, draft-dpia, write-privacy-policy, audit-website-privacy-compliance, review-data-processing-agreement]
  personas: [compliance-officer]
args:
  - name: product
    description: What the product does, the personal data it collects and why, where it is stored and processed (regions, vendors), retention, and how users consent and exercise rights today. If the assistant can read the repository, name the parts that handle personal data.
    type: text
    required: true
  - name: markets
    description: Where users and customers are, for example "EU and California". Without it the audit uses GDPR as the reference and says so.
    type: string
output_contract:
  format: markdown
  sections: [Scope and assumptions, Compliance checklist, Gaps and changes, What to verify, When to get a privacy professional]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Data protection laws such as the EU and UK GDPR and California's CCPA as amended by the CPRA expect a product to know what personal data it holds and why, to have a lawful basis or notice for each use, to collect no more than it needs, to honour people's rights in practice, to protect data and to control vendors and international transfers. An audit is useful when it ties each expectation to evidence in the product (a table, an endpoint, a job, a contract) and to a concrete change, rather than restating the law.
{{#markets}}
Markets: {{markets}}
{{/markets}}
</context>

<task>
Product:
<product>
{{product}}
</product>

1. State the scope and assumptions: which laws you use as the reference for the markets given, whether the company acts as controller, processor or both, and what you could and could not inspect.
2. If you can read the repository, find where personal data is collected, stored, logged, exported and deleted, and cite files. Do not change anything.
3. Check each requirement and mark it pass, partial, gap or unknown, with the evidence: purposes and lawful basis (or notice at collection), consent where it is the basis (freely given, specific, withdrawable), data minimisation, retention and deletion, the rights of access, correction, erasure, portability and objection or opt-out (including sale or sharing under CCPA), security measures, breach detection and notification procedure, vendor and sub-processor agreements, international transfer safeguards, cookies and tracking, records of processing, and impact assessments for high-risk processing. Name the relevant GDPR articles or CCPA sections only when you are confident they apply.
4. For each gap or partial, give the change needed: code (for example a deletion job that also covers backups and logs), process (a request-handling procedure with deadlines) or document (a missing agreement), its priority and an owner role.
5. List what must be verified by someone with access to contracts, infrastructure or legal advice.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Mark a requirement pass only with evidence; otherwise use unknown.
- Do not invent article numbers, deadlines or fines; mark anything uncertain for verification.
- Do not suggest ways to avoid obligations, such as hiding collection from notices or making rights requests deliberately hard.
- Recommend a privacy professional before relying on the audit, especially for health, children's, biometric or financial data, large-scale tracking or international transfers.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scope and assumptions
Laws used, role, what was inspected.
## Compliance checklist
A table: requirement, status, evidence, reference.
## Gaps and changes
Numbered by priority: gap, change (code, process or document), owner role.
## What to verify
Bullets.
## When to get a privacy professional
Short and specific to this product.
</output_format>
