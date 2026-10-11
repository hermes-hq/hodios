---
schema: 1
id: write-t-sql-stored-procedure
kind: prompt
title: Write a SQL Server stored procedure
description: Writes a SQL Server stored procedure in T-SQL with typed parameters, set-based logic, TRY/CATCH with XACT_ABORT, transactions, safe dynamic SQL and a test script.
category: data
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, dba, data-engineer]
stack: [sql]
requires: [repo-read, file-write]
inputs: [repo, spec, schema]
output: [code, tests]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [sql-server, stored-procedures, transactions, error-handling]
pairs_with:
  prompts: [write-postgres-function-or-trigger, optimize-sql-query, write-upsert-query, resolve-database-deadlocks]
  personas: [database-administrator]
args:
  - name: requirement
    description: What the procedure must do, its inputs and outputs, and who calls it (an app, a job, a report).
    type: text
    required: true
  - name: schema
    description: The tables involved, as DDL or paths in the repository, and the SQL Server version or Azure SQL.
    type: text
output_contract:
  format: markdown
  sections: [Procedure, Design notes, Test script, Deployment, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
T-SQL procedures fail in a few repeated ways. Error handling: without `SET XACT_ABORT ON`, many runtime errors leave the transaction open and the batch running, so a procedure needs `XACT_ABORT ON`, a `TRY...CATCH` that rolls back when `XACT_STATE() <> 0`, and `THROW` (not `RAISERROR` without care) to re-raise the original error. `SET NOCOUNT ON` stops row-count messages that confuse some clients. Row-by-row cursors and `WHILE` loops are usually far slower than one set-based statement, and `MERGE` has known concurrency and bug pitfalls, so an explicit `UPDATE` then `INSERT` under the right locking hints (`UPDLOCK, HOLDLOCK` or `SERIALIZABLE`) is often safer for upserts. Parameter sniffing makes a plan built for one parameter value slow for another; `OPTION (RECOMPILE)` or `OPTIMIZE FOR` help in specific cases, not everywhere. Dynamic SQL built with `+` and `EXEC` is injection; `sp_executesql` with parameters is not, and identifiers that must be dynamic go through `QUOTENAME` and an allowlist. Data types matter: `VARCHAR` parameters compared to `NVARCHAR` columns (or the reverse) can cause implicit conversions that kill index use. `CREATE OR ALTER` keeps permissions on redeploy.
</context>

<task>
Procedure for: {{requirement}}
{{#schema}}Schema and version: {{schema}}{{/schema}}

1. Read the existing procedures, schema, naming conventions (schema prefix, `usp_` or not) and how database code is deployed (migration tool, SSDT project, DACPAC). Match them.
2. Say in two lines whether this belongs in a procedure or in application code, based on data volume, round trips and who owns the logic. Continue unless it clearly belongs elsewhere.
3. Write the procedure with `CREATE OR ALTER`, parameter types that match the column types exactly, `SET NOCOUNT ON` and `SET XACT_ABORT ON`, set-based statements, a transaction only around the statements that must succeed together, and `TRY...CATCH` with rollback and `THROW`.
4. For upserts or check-then-act logic, use locking hints or constraints so two concurrent calls cannot both insert. For dynamic SQL, use `sp_executesql` with parameters and `QUOTENAME` on allowlisted identifiers.
5. Return results the way callers expect (a result set, output parameters, or a return code for status only) and document it in a header comment.
6. Write a test script that sets up data in a transaction, calls the procedure for the normal case, an empty case and an error case, checks results, and rolls back. If tSQLt is in the project, write tests in it instead.
7. Note the indexes the procedure relies on and the execution plan to check, without creating indexes unless asked.
</task>

<constraints>
- Do not run the procedure or scripts against a shared or production database; provide them for the user to run.
- Never build SQL by concatenating parameter values.
- Do not use cursors or loops where a set-based statement works, unless you say why.
- Do not invent table or column names; ask for missing schema.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Procedure
The full T-SQL in a fenced block with its path.
## Design notes
Bullets on transaction scope, error handling, concurrency, and types.
## Test script
The script in a fenced block, with the expected results.
## Deployment
How it ships with the project's tooling, permissions to grant, and the plan to check.
## Open questions
Numbered, or "None".
</output_format>
