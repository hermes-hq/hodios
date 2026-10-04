---
schema: 1
id: spec-in-app-reporting-feature
kind: prompt
title: Specify an in-app reporting feature
description: Specifies a report or export feature in a B2B product, with filters, columns, permissions, row limits, async export, formats, time zones, scheduled delivery and how numbers reconcile with the screens.
category: product
version: 1.0.0
status: incubating
stage: [plan, design]
role: [product-manager, backend-engineer, fullstack-engineer, business-analyst]
subject: [saas]
stack: []
requires: [none]
inputs: [ticket, spec, text]
output: [docs, table, questions]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [csv-export, scheduled-reports, data-reconciliation, b2b, report-builder]
pairs_with:
  prompts: [write-prd, list-feature-edge-cases, define-non-functional-requirements]
args:
  - name: feature_request
    description: The request as received - customer asks, sales notes, the report or export they want, and any example spreadsheet they build by hand today.
    type: text
    required: true
  - name: users
    description: Who will use it and how - roles, how many accounts, data volumes per account (rows per month), and any customers with unusual scale.
    type: text
output_contract:
  format: markdown
  sections: [Problem and users, Report definition, Permissions and data access, Delivery and formats, Scale and performance, Reconciliation, Edge cases, Out of scope, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Can we get an export?" is one of the most common B2B requests, and one of the most underspecified. Reporting features go wrong when the numbers in the export do not match the numbers on screen (different time zone, status filter or rounding), when an export leaks data a role should not see, when the largest customer's export times out or takes the database down, when CSVs open broken in spreadsheet tools (encoding, separators, formula injection), and when scheduled reports keep emailing people who left the company. A good spec answers the job behind the request first, then makes these decisions explicit.
</context>

<task>
<feature_request>
{{feature_request}}
</feature_request>
{{#users}}
<users>
{{users}}
</users>
{{/users}}

1. Problem and users: the decision or task the report supports (reconciling invoices, auditing activity, feeding another system), who uses it, how often, and what they do today. If an existing screen or API already answers it, say so.
2. Report definition: grain (one row per what), columns with source, definition, format and unit, default sort, filters (date range with which date field, status, owner, custom fields), totals and how they are computed, and saved views if needed.
3. Permissions and data access: who can run, see, schedule and share each report; row-level scoping by role, team or region; sensitive columns hidden or masked by role; and an audit log of exports.
4. Delivery and formats: on-screen table, CSV, XLSX, PDF or API; synchronous download below a row threshold and asynchronous export above it (with notification and expiring download link); file naming; CSV rules (UTF-8 with BOM if spreadsheet users need it, separator, quoting, neutralising values starting with =, +, - or @ to prevent formula injection).
5. Scheduling, if requested: frequencies, recipients limited to users with access, time zone of the schedule, what happens when a recipient loses access or the report fails, and unsubscribe.
6. Scale and performance: largest expected export from the user data, row limits, pagination or streaming, running against a replica or warehouse rather than the primary database, timeouts, rate limits per account, and retention of generated files.
7. Reconciliation: which screen numbers the report must match, the time zone used for date boundaries (account, user or UTC), currency and rounding, how late-arriving or edited records appear, and the "as of" timestamp printed on every report.
8. Edge cases: empty results, deleted or merged entities, renamed custom fields, multi-currency totals, data changing during an async export.
9. Out of scope for version one, and open questions.
</task>

<constraints>
- Do not invent customer needs, data fields or volumes; mark unknowns [X] and add them to Open questions.
- Where data protection or retention rules may apply (personal data in exports, cross-border delivery), flag them to check with the privacy or legal owner without stating the law.
- Prefer the smallest version that serves the job; push builders, charts and scheduling to later unless the request needs them.
- Every threshold you propose (row limits, timeouts, retention) is marked "proposed" with the reason.
</constraints>

<output_format>
## Problem and users
Short paragraph and bullets.
## Report definition
Grain, then a columns table (column, source, definition, format), then filters and totals.
## Permissions and data access
Table: role, run, view, schedule, row scope, hidden columns.
## Delivery and formats
Bullets, including CSV rules.
## Scale and performance
Bullets with proposed thresholds.
## Reconciliation
Bullets naming the screens and rules.
## Edge cases
Table: case, expected behaviour.
## Out of scope
Bullets.
## Open questions
Numbered.
</output_format>
