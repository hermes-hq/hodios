---
schema: 1
id: fix-sql-injection
kind: prompt
title: Fix SQL injection
description: Finds every SQL query built from strings, including ORM raw and extra calls, and rewrites each with bound parameters or allowlisted identifiers, with a regression test per fix.
category: security
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer, security-engineer]
stack: [sql]
requires: [repo-read, file-write, shell]
inputs: [repo, file, text]
output: [diff, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [sql-injection, injection, parameterized-queries, owasp]
pairs_with:
  prompts: [audit-input-handling, triage-sast-findings, write-exploit-regression-test, write-semgrep-rule]
  personas: [security-auditor]
  rules: [secure-coding-rules]
args:
  - name: target
    description: The repository, module, endpoint or scanner finding to fix.
    type: text
    required: true
  - name: stack
    description: Language, framework, ORM and database. Leave empty to detect it from the repo.
    type: string
output_contract:
  format: markdown
  sections: [Injection points, Changes, Tests, Verification, Not fixed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
SQL injection survives in codebases that use an ORM because the ORM is safe only on its main path. The usual leftovers are raw query helpers fed an f-string or template literal (`raw()`, `extra()`, `execute()`, `query()`, `$queryRawUnsafe`, `whereRaw`, `createNativeQuery`, `knex.raw`), dynamic `ORDER BY` and column names, `IN (...)` lists joined by hand, `LIKE` patterns with the user's text pasted in, and stored procedures that build SQL inside the database with `EXEC` or `EXECUTE IMMEDIATE`. Bound parameters fix values but cannot bind identifiers or keywords: table names, column names and sort direction must come from a fixed allowlist mapped from user choices. Escaping functions and stripping quotes are not fixes; numeric casts help only where the value really is a number. Second-order injection happens when data stored earlier is later concatenated into a query, so database values are untrusted too.
</context>

<task>
Fix SQL injection in {{target}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the data access layer first and find how the codebase already writes safe queries (query builder, ORM, prepared statements), so the fix follows the existing pattern.
2. Search for every query built from strings: concatenation, interpolation and format calls near SQL keywords, every raw or unsafe ORM method, dynamic identifiers, hand-built `IN` lists and `LIKE` clauses, and dynamic SQL in migrations, stored procedures and reporting code. List each with file and line and where its input comes from.
3. Rewrite each one with the smallest safe change:
   - values become bound parameters (placeholders, named parameters, or the ORM's parameterised raw method);
   - identifiers and sort direction come from an allowlist map, rejecting anything not in it;
   - `IN` lists use the driver's array binding or one generated placeholder per element;
   - `LIKE` patterns bind the whole pattern, with `%` and `_` in user text escaped when they should be literal.
4. Add a test per fixed query that sends a hostile value (a quote, a `UNION`, a comment sequence, an unknown sort column) and asserts the query returns the expected safe result or a validation error, not extra rows or a database error.
5. Run the tests and the linter. If the project has a static analysis tool, run it on the changed files.
</task>

<constraints>
- Never replace a vulnerable query with escaping, quote stripping or a blocklist of keywords.
- Keep behaviour the same for legitimate input; note any query whose results change.
- Run hostile inputs only against the test database, never a shared or production one.
- If a query cannot be fixed without a larger refactor, leave it, explain why and propose the change.
- Do not run destructive commands or migrations without asking first.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Injection points
Table: file:line, query purpose, input source, type (value, identifier, list, pattern, dynamic SQL), status (fixed, already safe, not fixed).
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the hostile input it uses.
## Verification
Commands run and their actual results.
## Not fixed
Anything left, why, and the proposed follow-up.
</output_format>
