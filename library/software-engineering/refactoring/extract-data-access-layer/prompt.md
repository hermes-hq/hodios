---
schema: 1
id: extract-data-access-layer
kind: prompt
title: Extract scattered queries into a data access layer
description: Gathers SQL and ORM calls scattered through handlers and services into repository functions, with tests that pin the queries and results, without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [repository-pattern, data-access, orm-queries, transactions]
pairs_with:
  prompts: [move-logic-out-of-controllers, decouple-for-testability]
args:
  - name: code
    description: The area with scattered queries, as paths, with the language, ORM or driver, the database, and how transactions are managed today.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, ideally including tests against a real database.
    type: string
output_contract:
  format: markdown
  sections: [Query inventory, Repository design, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When queries live in handlers and services, the same lookup is written five ways, fixing an N+1 means editing ten files, and nothing can be tested without a database. A data access layer gathers them into repository functions named after what they return (`findActiveSubscriptionsForAccount`), not generic CRUD wrappers over every table. It should not hide the ORM entirely; a thin layer that returns the ORM's models or plain records is usually enough.

Moving a query changes behaviour more than people expect. Transactions: if a handler opened a transaction and ran three queries, those queries must still run in the same transaction, which means passing the session, connection or unit of work into the repository, never opening a new one inside it. Lazy loading: ORM objects returned from a repository can trigger queries later, outside the original session, causing `DetachedInstanceError`, `LazyInitializationException` or N+1 queries. Duplicate queries that look the same often differ in a filter (`deleted_at IS NULL`, tenant id, ordering, locking with `FOR UPDATE`); merging them silently changes results or drops a tenant filter, which is a data leak. Tests against the real database engine (a container or test schema), not mocks, prove the queries return the same rows.
</context>

<task>
Extract the data access in {{code}}.

1. Inventory every query in the area: location, table or model, filters including tenant and soft-delete conditions, ordering, locking, eager loading, and the transaction it runs in.
2. Group equivalent queries and list near-duplicates with their exact differences. Propose repository functions with names, parameters and return types, and how transactions and sessions are passed in, following existing patterns in the codebase. Wait for approval.
3. Write tests against the real database engine that pin the results of the queries you will move, including tenant isolation and soft-delete cases.
4. Move one group at a time: add the repository function, replace call sites, run the tests{{#test_command}} with `{{test_command}}`{{/test_command}}. Keep each call in the transaction it was in.
5. Show the diff and list near-duplicates kept separate, and any N+1 or lazy-loading risks noticed, as findings for later.
</task>

<constraints>
- Query results, ordering, locking, tenant filters and transaction boundaries stay the same.
- Never merge near-duplicate queries that differ in a filter without the user's decision.
- Repositories do not open their own transactions when the caller already has one.
- Do not switch ORM or add a generic repository base class unless the codebase already uses one.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Query inventory
Table: location, model, filters, ordering or locking, transaction.
## Repository design
Functions with signatures and transaction handling.
## Steps
Numbered steps, each with its test check.
## Diff
The change.
## Check
Tests run and results, plus findings left for later.
</output_format>
