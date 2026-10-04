---
schema: 1
id: implement-user-data-deletion
kind: prompt
title: Implement user data deletion
description: Implements account and personal-data deletion across a system with a data map, delete versus anonymise choices, backups, logs, audited jobs and processors. Flags legal questions.
category: data
version: 1.0.0
status: incubating
stage: [design, build]
role: [backend-engineer, data-engineer, architect]
stack: []
requires: [none]
inputs: [text, schema]
output: [plan, code, table]
risk: read-only
advice_risk: [legal]
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [right-to-erasure, data-map, anonymisation, privacy-engineering, audit-trail, account-deletion]
pairs_with:
  prompts: [handle-data-subject-request, plan-data-archival, design-change-data-capture]
args:
  - name: system_overview
    description: Every place user data may live - databases and key tables, object storage, search indexes, caches, analytics and event streams, logs, backups, emails, third-party services (payments, email, CRM, support, analytics) - plus how users are identified across them. Rough notes are fine.
    type: text
    required: true
  - name: jurisdictions
    description: Where your users and company are (for example "EU and UK", "California", "Brazil"), so legal questions can be named for counsel.
    type: string
    default: not stated
output_contract:
  format: markdown
  sections: [Scope and legal questions, Data map, Treatment per store, Deletion flow, Backups and logs, Evidence and testing, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A backend engineer has to make "delete my account" real across the whole system. Deletion is usually implemented as one `DELETE FROM users` and fails because the person survives elsewhere: in denormalised copies, search indexes, caches, analytics events, file storage, logs, backups, the data warehouse, and third-party processors. The opposite mistake is deleting records the business must keep (invoices, fraud and abuse records, legal holds) or breaking referential integrity so other users' data disappears. A sound implementation starts from a data map, chooses per store between hard delete, anonymisation and retention with a documented reason, runs as an asynchronous job with retries, and keeps evidence that it ran without keeping the personal data.

Jurisdictions: {{jurisdictions}}
</context>

<task>
<system_overview>
{{system_overview}}
</system_overview>

1. Scope and legal questions: list the questions for counsel or the privacy lead rather than answering them (which data must be retained and for how long, response deadlines, exemptions, identity verification standard, whether anonymisation meets the bar here). Note that rules differ by jurisdiction.
2. Data map: every store holding the user, the identifier used there (user id, email, device id, payment customer id), the fields with personal data, and who owns it. Include indirect identifiers and free text (support tickets, comments mentioning the user).
3. Treatment per store, each with the reason: hard delete; anonymise or pseudonymise (replace identifiers, null free text, keep aggregates; note that pseudonymised data is often still personal data); retain under a stated obligation with restricted access and a deletion date; or delete via the processor's API. Content shared with others (messages, comments in shared spaces) needs a product decision, flagged.
4. Deletion flow: request intake and identity check, a grace period if the product has one, a deletion request record with status per store, an idempotent job per store that can retry, ordering that respects foreign keys (children before parents, or anonymise the parent row), calls to processors with their request ids, and a final confirmation to the user. Write the core job in pseudocode or the user's language.
5. Backups and logs: backups usually cannot be edited, so keep a deletion ledger and re-apply deletions after any restore, and rely on backup expiry; logs should avoid personal data in the first place, with retention limits. Say what to confirm with counsel.
6. Evidence and testing: an audit record per request (request id, timestamps, stores done, no personal data), an end-to-end test that creates a user touching every store and asserts nothing searchable remains, and a periodic check for new stores added without deletion support.
</task>

<constraints>
{{> guardrails/professional-limits}}
- Do not state what the law requires as settled; frame it as questions for counsel and note the jurisdiction assumption.
- Do not invent stores or processors; list what the user named and ask about common ones they did not mention (analytics, support desk, email provider, warehouse).
- Never recommend keeping personal data in the audit trail itself.
- If the system overview is too thin to build a data map, ask for the missing stores and stop.
</constraints>

<output_format>
## Scope and legal questions
Bullets, starting with a one-line note that this is engineering guidance, not legal advice.

## Data map
Table: store | identifier | personal fields | owner.

## Treatment per store
Table: store | treatment (delete, anonymise, retain, processor API) | reason | when.

## Deletion flow
Numbered steps and the job code.

## Backups and logs
Bullets.

## Evidence and testing
Checklist.

## Open questions
Bullets.
</output_format>
