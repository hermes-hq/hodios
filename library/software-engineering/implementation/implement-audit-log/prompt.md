---
schema: 1
id: implement-audit-log
kind: prompt
title: Implement an audit log
description: Implements an append-only audit log of who did what and when, with a schema, a transactional write path, tamper evidence, retention and an admin query view.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, spec, text]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [audit-trail, append-only, tamper-evidence, data-retention, privacy-by-design]
pairs_with:
  personas: [backend-engineer]
  prompts: [implement-role-based-access, plan-data-archival, design-database-schema]
args:
  - name: events
    description: The actions to record, for example "user role changes, invoice refunds, exports of customer data, settings changes, logins by support staff impersonating users".
    type: text
    required: true
  - name: stack
    description: Language, framework and database, for example "NestJS, PostgreSQL".
    type: string
    required: true
  - name: compliance_needs
    description: Any retention periods, regulations or customer contract terms that apply, and who must be able to read the log.
    type: text
  - name: tamper_evidence
    description: append-only blocks updates and deletes in the database; hash-chain also links each entry to the previous one so edits are detectable; worm-storage additionally ships entries to write-once storage.
    type: enum
    enum: [append-only, hash-chain, worm-storage]
    default: append-only
output_contract:
  format: markdown
  sections: [Event catalogue, Schema, Changes, Tests, Retention and compliance notes]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Audit logs fail when they are needed most: the entry was written by a fire-and-forget logger call and is missing, or it was written even though the change rolled back; the actor came from a request field anyone could set; support staff acting as a customer are recorded as the customer; the "diff" contains password hashes, tokens and card numbers; any admin with database access can quietly edit or delete rows; nobody decided how long to keep entries, so they are kept forever or purged by accident; and the only way to read the log is a raw database query. A useful audit log records a fixed set of events, in the same transaction as the change, with a trustworthy actor, the minimum personal data, protection against tampering and a view that the right people can search.
</context>

<task>
Implement an audit log for these events:

<events>
{{events}}
</events>

Stack: {{stack}}
Tamper evidence: {{tamper_evidence}}
{{#compliance_needs}}
Compliance needs: {{compliance_needs}}
{{/compliance_needs}}

1. Inspect the code: where each listed action happens, how the current user, service account and impersonation are represented, transaction handling, any existing logging or event infrastructure, multi-tenancy, and the admin area. If an event is ambiguous, or the compliance needs imply rules you cannot pin down (a specific retention period, who may read the log), ask and stop.
2. Build an event catalogue: a stable, namespaced action name for each event (for example `invoice.refunded`), the target type, and exactly which fields are recorded for it. Use an allow-list of fields, never a full-object dump.
3. Design the schema: id; occurred-at timestamp set by the server in UTC; actor type and id (user, service or system), plus the real actor when someone is impersonating; tenant id if the app is multi-tenant; action; target type and id; outcome (succeeded, denied, failed); the changed fields as before and after values restricted to the allow-list; request or correlation id; and a schema version. Record IP address and user agent only if the compliance needs or security use cases call for them, and say so. Add indexes for the admin queries (by target, by actor, by action, by time, scoped to tenant).
4. Write path: one small audit API (for example `audit.record(...)`) called inside the same database transaction as the business change, or through the project's transactional outbox, so an entry exists if and only if the change committed. Denied attempts on sensitive actions are recorded too. Take the actor from the authenticated context, never from request data. Redact secrets, credentials, tokens, full payment card numbers and special-category data, even when a field is on the allow-list by mistake.
5. Tamper evidence:
   - append-only: the application's database role may only insert into the audit table, with no update or delete grants, plus a trigger or rule that rejects updates and deletes.
   - hash-chain: the append-only protections, plus each entry stores a hash of its canonical content and the previous entry's hash (chained per tenant or globally), written under a lock or sequence so concurrent writes cannot fork the chain, and a verification command that reports the first broken link.
   - worm-storage: the hash-chain protections, plus entries or periodic signed digests shipped to write-once storage that the application cannot delete from.
6. Retention: a configurable retention period per event type (from the compliance needs, or a clearly marked placeholder), a purge job that is the only thing allowed to delete, running under a separate database role, recording its own runs, and honouring legal holds.
7. Admin query view: restricted to a dedicated permission, scoped to the viewer's tenant, filterable by actor, target, action and date range, paginated with a cursor, and exportable. Reads of the audit log are themselves recorded.
8. Write tests: each listed event creates exactly one entry with the right actor, target and fields; a rolled-back transaction leaves no entry; impersonation records both identities; redaction removes secrets; updates and deletes on the audit table fail; the hash-chain check (if used) detects an edited row; non-admins and other tenants cannot read entries; and the purge job deletes only expired entries. Run them and report the real result.
</task>

<constraints>
- Do not record more personal data than the event needs, and never record secrets, credentials or tokens.
- Do not claim the result satisfies a named regulation; list which controls it provides and which remain for the organisation.
- Do not add a new datastore or queue without asking; use the existing database unless worm-storage is chosen.
- Keep audit writes out of the general application log, which has different access and retention.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Event catalogue
Table: action name, where it is triggered, target, fields recorded, outcome values.
## Schema
The table definition or migration, and the indexes.
## Changes
One line per file.
## Tests
One line per test and the real result of the run.
## Retention and compliance notes
Retention per event type, tamper-evidence level, personal data recorded and why, and open decisions for the owner.
</output_format>
