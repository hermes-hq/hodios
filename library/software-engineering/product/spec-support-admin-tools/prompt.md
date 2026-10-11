---
schema: 1
id: spec-support-admin-tools
kind: prompt
title: Specify support and admin tools for a feature
description: Specifies the internal admin and support tools a new feature needs to be operated, such as lookups, safe overrides, impersonation rules, bulk fixes and audit, so support never needs database access.
category: product
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [product-manager, backend-engineer, support-agent, operations-manager]
stack: []
requires: [none]
inputs: [spec, ticket, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [back-office, support-tooling, operability, requirements]
pairs_with:
  prompts: [write-prd, implement-audit-log, spec-roles-and-permissions]
args:
  - name: feature_description
    description: The customer-facing feature being built, with its main objects and states.
    type: text
    required: true
  - name: support_context
    description: Who supports customers (tiers, ops, finance), common ticket types today, and existing admin tooling.
    type: text
output_contract:
  format: markdown
  sections: [Support scenarios, Required tools, Guardrails, Audit and access, Not in scope, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Features ship with a customer interface and no way for the company to operate them. In the first week, support needs to see why a customer's payment failed, resend a lost email, fix a wrong status, or extend a trial, and without tools those requests go to engineers who run ad-hoc database queries in production. That is slow, risky and hard to audit. Specifying the minimum admin tooling with the feature, driven by the tickets support will actually receive, avoids this. The important parts are guardrails: who can perform each action, which actions need a second person or a reason, what must never be possible (viewing passwords, editing financial records directly), how impersonation or "view as customer" is limited and logged, and an audit trail of every change.
</context>

<task>
<feature>
{{feature_description}}
</feature>
{{#support_context}}
<support_context>
{{support_context}}
</support_context>
{{/support_context}}

1. List the support scenarios this feature will generate in its first months: questions ("why did X happen"), fixes ("undo, retry, correct"), and exceptions ("extend, waive, override"), each with an estimated frequency (high, medium, low) as an assumption.
2. For each scenario, specify the minimum tool: a read-only lookup with the fields shown, a single safe action, or a bulk operation, and what the support person sees before and after acting.
3. Write guardrails per action: which support role may use it, limits (amounts, counts), reason required, second-person approval for high-impact actions, confirmation text, and actions that must never exist in the tool.
4. Specify audit and access: what is logged for each action, who can see the log, whether the customer is notified, and rules for viewing customer data or acting as the customer, including consent and time limits where relevant.
5. List what is deliberately not in scope for the first version and the fallback (escalation path) for it.
6. List open questions with a recommended default marked as a proposal.
</task>

<constraints>
- Prefer read-only lookups and narrow actions over general edit screens; never propose raw database or free-form data editing as a tool.
- Do not include viewing secrets, full payment card numbers or passwords in any tool.
- Viewing personal data needs a stated purpose and a log; flag privacy review for impersonation features.
- If the feature description lacks objects or states, ask before listing scenarios.
</constraints>

<output_format>
## Support scenarios
Table: scenario, type (question / fix / exception), frequency (assumption).
## Required tools
Table: scenario, tool, fields shown, action, result.
## Guardrails
Table: action, allowed roles, limits, reason required, approval, never allowed.
## Audit and access
Bullets.
## Not in scope
Bullets with fallback.
## Open questions
Numbered: question, recommended default (proposal).
</output_format>
