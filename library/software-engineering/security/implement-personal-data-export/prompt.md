---
schema: 1
id: implement-personal-data-export
kind: prompt
title: Implement a personal data export for users
description: Implements a user data export for access and portability requests that gathers every store, formats it readably, verifies identity and delivers it securely.
category: security
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, schema]
output: [code, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [data-subject-access, data-portability, right-of-access, account-data, privacy-engineering]
pairs_with:
  prompts: [implement-user-data-deletion, implement-large-data-export, review-diff-for-personal-data]
  personas: [data-privacy-engineer]
args:
  - name: system
    description: The app, its stack, the data stores (databases, object storage, search, analytics, third-party processors) and how users sign in.
    type: text
    required: true
  - name: requirements
    description: Jurisdictions served, existing manual process, format wishes, or deadlines the team works to. Optional.
    type: text
output_contract:
  format: markdown
  sections: [Data map, Export contents, Flow and security, Changes, Tests, Gaps for review]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Privacy laws such as the GDPR (access and portability), the UK GDPR, California's CCPA/CPRA and Brazil's LGPD give people the right to get a copy of their personal data, with deadlines that differ by law (one month under the GDPR, 45 days under the CCPA, shorter under some others). Teams that handle these by hand miss data, run late and sometimes send one user's data to another. A self-serve or support-triggered export fixes that, but the hard parts are not the file format. First, completeness: data sits in the main database, but also in uploads, logs kept for long periods, analytics and CRM tools, support systems and processors, so the export needs a data map. Second, scope: the export is the requester's data, not other people's; a message thread or shared document contains third parties' personal data that may need redacting or excluding, and internal security signals (fraud scores, abuse flags) may be withheld under some laws. Third, the export itself is a high-value target: an attacker with a stolen session can request it, so it needs re-authentication, a notification to the account email, an expiring single-use download link and an audit record. Portability means a structured, commonly used machine-readable format (JSON or CSV), plus a readable summary for people.
</context>

<task>
Implement a personal data export for {{system}}.
{{#requirements}}Requirements: {{requirements}}{{/requirements}}

1. Read the models, migrations and integrations to build a data map: every table and store keyed to a user, directly or through joins, plus files, logs and third-party processors that hold the user's data.
2. For each source, decide include, include with redaction of third parties, exclude with a reason, or "point to processor". Mark legal judgement calls (internal fraud signals, other users' content, derived data) as questions, not decisions.
3. Design the export: one archive with a JSON file per data category, CSV where a table is natural, a README or HTML summary explaining each file in plain language, and attached files the user uploaded.
4. Build the request flow: recent re-authentication, rate limiting, an email notice to the account address, generation as a background job that streams data to avoid memory blow-up, encrypted storage of the archive, an expiring single-use link, automatic deletion of the archive after expiry, and an audit log entry for request, generation and download.
5. Add a support-side path for requests arriving by email, with identity verification steps that do not collect more data than needed.
6. Reuse the existing job queue, storage and email code; find patterns before adding new ones.
7. Write tests with fake users: completeness against the data map (a test fails when a new user-linked table is not classified), no other user's data in the archive, link expiry, and the auth checks. Run them.
</task>

<constraints>
- Never use real user data in tests, fixtures or examples.
- Do not decide legal exemptions or deadlines; list them for the privacy lead or counsel and note that rules vary by jurisdiction.
- Do not email the archive as an attachment or put it in a public bucket.
- Do not include secrets (password hashes, tokens, internal keys) in the export.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Data map
Table: source, how it links to the user, decision, reason.
## Export contents
The archive layout and a sample of each file with fake data.
## Flow and security
Request, verification, generation, delivery, expiry and audit, step by step.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the result of running them.
## Gaps for review
Processors to contact, legal questions, and stores not covered yet.
</output_format>
