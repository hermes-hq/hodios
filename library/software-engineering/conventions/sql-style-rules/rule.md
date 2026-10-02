---
schema: 1
id: sql-style-rules
kind: rule
title: SQL style rules
description: Standing rules for SQL an assistant writes, covering formatting, naming, explicit column lists, parameterised queries, NULL handling, data types and safe migrations.
category: conventions
version: 1.0.0
status: experimental
stage: [build]
role: [backend-engineer, data-engineer, dba, data-analyst]
stack: [sql]
requires: [none]
risk: read-only
tags: [migrations, sql-injection, null-handling]
applies_to: ["**/*.sql"]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change SQL in this project:

**Dialect and formatting**
- Write for the project's database engine and version. Do not use features it lacks, and flag engine-specific syntax when portability matters.
- Match the existing formatting. Where there is none: uppercase keywords, one major clause per line (`SELECT`, `FROM`, `JOIN`, `WHERE`, `GROUP BY`, `ORDER BY`), one column per line in long lists, and consistent indentation.
- Prefer common table expressions to deeply nested subqueries, with names that say what each step contains.
- Comment the reason for non-obvious logic, not what the SQL does.

**Naming**
- Use `snake_case` with no quoted identifiers, reserved words or unexplained abbreviations. Follow the existing singular or plural convention for table names.
- Name foreign keys `<referenced_table>_id`, booleans `is_` or `has_`, timestamps `_at` and dates `_on` or `_date`.
- Name constraints and indexes explicitly (`orders_customer_id_fkey`, `orders_created_at_idx`) so migrations can refer to them.

**Queries**
- List columns explicitly in `SELECT` and `INSERT`. Use `SELECT *` only in ad hoc exploration, never in application code, views or models.
- Use explicit `JOIN ... ON`, never comma joins, and qualify every column with a table alias when more than one table is involved.
- Add `ORDER BY` whenever the order matters, and always with `LIMIT` or `OFFSET`. Make the ordering deterministic with a unique tie-breaker.
- Check for fan-out before aggregating over joins, and aggregate before joining when that avoids it.

**Parameters and safety**
- Pass values as bound parameters, always. Never build SQL by concatenating or interpolating user input.
- When an identifier such as a sort column must be dynamic, choose it from an allowlist in code.
- Grant application roles only the privileges they need.

**NULLs and types**
- Compare with `IS NULL` or `IS DISTINCT FROM`, never `= NULL`. Prefer `NOT EXISTS` to `NOT IN` when the subquery can return NULL.
- Store money as `NUMERIC`/`DECIMAL` or integer minor units, never floating point. Store timestamps with time zone, in UTC.
- Enforce integrity in the schema with `NOT NULL`, `CHECK`, `UNIQUE` and foreign keys, not only in application code.

**Migrations**
- One logical change per migration. Never edit a migration that has already run anywhere shared; write a new one.
- Separate schema changes from data backfills. Run backfills in batches with short transactions.
- On large or busy tables, use lock-safe forms: build indexes concurrently or online, add constraints without validation and validate them separately, add columns as nullable first, and set a lock timeout.
- Make destructive changes (drop, rename, type narrowing) only after a release in which no deployed code uses the old shape, and give every migration a tested rollback or an explicit note that it cannot be reversed.
