---
schema: 1
id: reduce-pci-scope
kind: prompt
title: Reduce PCI DSS scope in a payment integration
description: Reviews how an app takes card payments and changes it (hosted fields, redirects, tokens, isolated payment pages) so card data never touches its servers, then lists remaining controls.
category: security
version: 1.0.0
status: incubating
stage: [design, build, review]
role: [backend-engineer, fullstack-engineer, security-engineer, architect]
stack: []
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [report, diff, checklist]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [pci-dss, cardholder-data, tokenization, payment-security, hosted-fields]
pairs_with:
  prompts: [choose-pci-dss-saq, integrate-payments, secure-third-party-scripts, adopt-strict-csp, redact-secrets-from-logs]
args:
  - name: payments
    description: How card payments work today (provider, embedded form or own form, mobile apps, phone orders, recurring billing, refunds) and where the code lives.
    type: text
    required: true
  - name: context
    description: Business size, card volume level if known, what the acquirer or a QSA has asked for, and any deadline. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Card data flows, Findings, Target design, Changes, Remaining controls, Questions for the assessor]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Under PCI DSS, every system that stores, processes or transmits card numbers, and every system connected to those, is in scope, and the cost of compliance grows with scope. The biggest lever is engineering, not paperwork: if the card number is typed into the payment provider's own hosted fields or page and the app only ever receives a token, the app's servers are out of the cardholder data flow. What novices miss: a form the app renders itself that posts to the provider through the app's JavaScript still puts the page in scope, and PCI DSS v4.0 added requirements (6.4.3 and 11.6.1) to inventory, authorise and monitor every script on payment pages, because a tampered analytics or chat script can skim cards even with an iframe. Card numbers also leak into scope sideways: request logging, error trackers, session replay and analytics tools recording the payment page, support tickets and call recordings where customers read out numbers, and "card on file" stored locally instead of as provider tokens. Scope decisions are made with the acquirer or a Qualified Security Assessor; an engineer's job is to shrink the data flow and document it.
</context>

<task>
Reduce the PCI DSS scope of {{payments}}.
{{#context}}Context: {{context}}{{/context}}

1. Read the payment code paths: checkout pages and components, mobile payment screens, API endpoints that create payments, webhook handlers, refund and recurring billing jobs, and any admin or support tools that touch payments.
2. Trace where a full card number or security code could appear: request bodies, server-side forms, logs, error tracker payloads, session replay and analytics on payment pages, databases and backups, support tooling and phone channels.
3. List findings with file references and severity: card data reaching app servers, card data stored, security codes kept after authorisation, payment pages loading scripts without integrity or inventory, and logging or recording of payment fields.
4. Propose the target design: the provider's hosted payment page, hosted fields or iframe elements, or mobile SDK tokenisation; tokens or customer ids for card on file; a minimal, separately served payment page with a strict CSP and an inventory of its scripts; session replay and analytics excluded from payment pages; and a phone payment option that keeps numbers out of agents' screens and recordings if phone orders exist.
5. Make the code changes that are safe to make now, following existing patterns: remove card fields from logs and error reports, mask payment inputs in replay tools, stop storing anything the provider token replaces. Leave larger migrations as a plan.
6. List the controls that remain in scope even after the redesign (the page that hosts the iframe or redirect, script management, access to the provider dashboard, webhook verification, staff training) without deciding which questionnaire applies.
</task>

<constraints>
- Do not state which SAQ or compliance level applies or that the app "is compliant"; give the facts the assessor or acquirer needs and point to the choose-pci-dss-saq entry for that question.
- Never put real card numbers in examples or tests; use the provider's documented test cards.
- Do not invent provider features; ask which hosted options the user's provider offers if unsure.
- Do not delete stored payment data yourself; describe a reviewed deletion plan.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Card data flows
Each path card data takes today, from entry to storage or provider.
## Findings
Table: issue, location, why it expands scope or risk, severity.
## Target design
The proposed flow and what leaves scope.
## Changes
Changes made now (file and what changed) and changes planned.
## Remaining controls
What stays in scope and the control each needs.
## Questions for the assessor
Points to confirm with the acquirer or QSA.
</output_format>
