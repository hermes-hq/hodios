---
schema: 1
id: write-security-whitepaper
kind: prompt
title: Write a customer-facing security overview
description: Writes a security overview or whitepaper explaining how a SaaS product protects customer data, accurate to the controls that really exist, with no overclaiming.
category: security
version: 1.0.0
status: incubating
stage: [build, ship]
role: [security-engineer, founder, engineering-manager, technical-writer]
stack: []
subject: [saas]
requires: [none]
inputs: [notes, document, text]
output: [docs, questions]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [security-whitepaper, trust, customer-facing]
pairs_with:
  prompts: [answer-security-questionnaire, write-security-policy, audit-compliance-controls, plan-data-encryption]
  personas: [security-auditor]
args:
  - name: product
    description: The product, its customers, and what data it handles.
    type: text
    required: true
  - name: controls
    description: The facts about security controls - hosting, encryption, access control, SSO and MFA, logging, backups, testing, certifications, subprocessors, incident process. Paste notes, policies or questionnaire answers.
    type: text
    required: true
  - name: audience
    description: Who will read it (procurement, customer security teams, small business owners) and where it will be published.
    type: text
output_contract:
  format: markdown
  sections: [Questions before publishing, Security overview, Claims to verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Customer security teams read these documents to decide whether to send a long questionnaire, so a clear overview saves both sides weeks. They also read them as commitments: a statement like "all data is encrypted end to end" or "we are SOC 2 compliant" that is not exactly true can become a contract or regulatory problem, and reviewers spot vague marketing language at once. A credible overview is specific and checkable: which cloud provider and regions; encryption in transit (TLS versions) and at rest (provider-managed or customer-managed keys); who in the company can access customer data, how access is granted, reviewed and logged; SSO, MFA and role options for customers; how the software is built and tested (code review, dependency scanning, penetration tests and how often); backups, recovery objectives and where they are stored; incident response and breach notification commitments; data retention and deletion on contract end; subprocessors; and certifications with their exact scope and dates, or an honest "in progress". "Type I" and "Type II" reports, ISO 27001 scope, and "aligned with" versus "certified" mean different things to these readers.
</context>

<task>
Write a security overview for {{product}}.
Known controls: {{controls}}
{{#audience}}Audience: {{audience}}{{/audience}}

1. Sort the provided facts by area (infrastructure, data protection, access, application security, operations, compliance, privacy). Note every area where the facts are missing, vague or possibly out of date.
2. Before drafting, list the questions whose answers would change what the document can claim; if the gaps are large, ask them first.
3. Draft the overview with one short section per area, written for the stated audience: plain sentences, specific facts, no adjectives doing the work of facts. Where a control does not exist, leave it out or describe the plan honestly with no date unless one is given.
4. State certifications exactly as provided (name, type, scope, period) and point readers to request reports under NDA rather than paraphrasing them.
5. Add a short section on how customers can report a vulnerability and contact security, using only contact details provided.
6. After the draft, list every factual claim made so an owner can confirm it before publishing.
</task>

<constraints>
- Never invent controls, certifications, numbers, audit dates, subprocessors or contact addresses; use only the facts given.
- Avoid absolute claims ("unhackable", "military-grade", "100% secure", "fully compliant").
- Do not include details that help attackers (internal hostnames, exact versions, network layouts, unpatched gaps).
- Note that legal commitments such as breach notification times should be checked against contracts by the legal team.
{{> output/uncertainty}}
</constraints>

<output_format>
## Questions before publishing
Numbered questions about missing or unclear facts.
## Security overview
The document, with a heading per area.
## Claims to verify
Table: claim, section, source fact, owner to confirm.
</output_format>
