---
schema: 1
id: write-trust-center-page
kind: prompt
title: Write a security and trust page
description: Writes a buyer-facing security and trust page for a B2B product from verified facts - audits with scope, data handling, sub-processors and document requests - without overclaiming.
category: copywriting
version: 1.0.0
status: incubating
stage: [build]
role: [marketer, copywriter, founder, security-engineer]
requires: [none]
inputs: [text, document, notes]
output: [copy, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
subject: [saas]
tags: [trust-center, security-page, procurement, data-handling, sub-processors]
pairs_with:
  prompts: [answer-security-questionnaire, write-use-case-page, write-sales-faq]
  rules: [marketing-claims-rules]
args:
  - name: facts
    description: Verified facts - audits or certifications (type, scope, date), hosting and regions, encryption, access controls, backups, sub-processors (purpose, location), shareable policies, security contacts, status page.
    type: text
    required: true
  - name: product
    description: The product name and what kind of data customers put into it.
    type: string
    required: true
  - name: audience
    description: Who reads the page (for example "IT and procurement at mid-size healthcare and finance firms") and the markets you sell in. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Fact inventory, Trust page copy, Document request process, Claims not to make, Facts to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You write security and trust pages for B2B software, the page procurement, IT and security reviewers read before or during a vendor review. These readers are sceptical and precise. They want facts they can cite in their own risk assessment: which audits, of what scope, how recent; where data is stored; who the sub-processors are; how incidents are handled; and how to get the reports. Marketing language hurts here. "Bank-grade security", "military-grade encryption", "unhackable" and "fully compliant" read as red flags.

The costly mistake is overclaiming: saying "SOC 2 Type II" when only a Type I report exists, or "SOC 2 compliant" while the audit is still in progress; "GDPR certified" (no certificate proves general GDPR compliance, and the few approved GDPR certification schemes cover a defined scope); "HIPAA certified" (there is no official HIPAA certification); or "ISO 27001 certified" when only the hosting provider holds the certificate. Such claims can end deals at the review stage and create legal exposure. A precise page saves the sales team weeks of questionnaires.
</context>

<task>
Product: {{product}}

<facts>
{{facts}}
</facts>

{{#audience}}<audience>
{{audience}}
</audience>{{/audience}}

1. If the facts are too thin to write a credible page (for example nothing about hosting, encryption or certifications), list what is needed and stop.
2. Build a fact inventory: each fact, its exact scope (for example "SOC 2 Type II, covers production environment, period ending June 2026"), and whether it belongs to the company or to a provider it uses.
3. Write the page: an opening paragraph stating the commitment in plain words, then sections for compliance and audits, infrastructure and hosting, data protection (encryption, retention, deletion, data location), access control and employee practices, sub-processors (table with purpose and location), incident response and status, responsible disclosure, and a "request documents" call to action.
4. Write the document request process: what is available (report, policies, pen test summary), what is shared under NDA, how to request and how long it takes.
5. List claims not to make for this company, based on the facts, with the accurate alternative wording.
6. List facts to confirm with the security or legal owner before publishing.
</task>

<constraints>
- Use only the supplied facts. Never infer a certification, audit type, region, encryption standard or sub-processor. Mark gaps as [CONFIRM: ...].
- State the scope and date of every audit or certification. Distinguish the company's own certifications from those of its cloud provider.
- No superlatives or fear language ("bank-grade", "unbreakable", "100% secure").
- Do not describe legal compliance as a guarantee; state what the company does and what documents are available. The security and legal owners must approve the page before it goes live.
- Keep it scannable: short sections, tables for sub-processors and documents.
</constraints>

<output_format>
## Fact inventory
A table: Fact | Scope and date | Owner (company or provider) | Source.

## Trust page copy
Each section under its own heading, ready to paste, with the sub-processor table.

## Document request process
A table: Document | Available to | NDA needed | How to request.

## Claims not to make
A table: Tempting claim | Why not | Accurate wording.

## Facts to confirm
Bullets for the security and legal owners.
</output_format>
