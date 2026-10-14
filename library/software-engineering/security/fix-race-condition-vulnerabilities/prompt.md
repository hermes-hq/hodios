---
schema: 1
id: fix-race-condition-vulnerabilities
kind: prompt
title: Fix exploitable race conditions
description: Finds check-then-act races attackers exploit with parallel requests (coupon reuse, double withdrawals, token reuse), fixes them with atomic updates, constraints or locks, and adds concurrent tests.
category: security
version: 1.0.0
status: incubating
stage: [build, review]
role: [backend-engineer, security-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, report, tests]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [toctou, limit-overrun, concurrency, business-logic, idempotency]
pairs_with:
  prompts: [debug-race-condition, write-exploit-regression-test, prevent-double-booking, fix-password-reset-flaws]
  personas: [security-auditor]
args:
  - name: scope
    description: The code or flows to check, for example "redeem coupon, withdraw balance, accept invitation", or a reported issue where a limit was exceeded.
    type: text
    required: true
  - name: stack
    description: Language, framework, database and isolation level, and whether the app runs as several instances, if the agent cannot read them.
    type: text
output_contract:
  format: markdown
  sections: [Findings, Changes, Concurrent tests, Residual risk]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many business rules are written as "read, check, then write": load the coupon, check it is unused, mark it used; load the balance, check it covers the amount, subtract. Sent once, this works. Sent twenty times in parallel (trivial with a script, or a single HTTP/2 packet carrying many requests), several requests pass the check before any write lands, so a single-use coupon is redeemed five times, a balance goes negative, a rate or quota limit is exceeded, or a one-time token is used twice. Testers rarely catch it because they click once. Common mistakes in fixes: a mutex in application memory, which does nothing across several instances or workers; a transaction alone, which at READ COMMITTED (the default on Postgres, SQL Server and Oracle) still allows both reads to see the old value; and caching the check in Redis without an atomic operation. Fixes that hold: a single conditional write whose affected row count is the check (`UPDATE coupons SET used_at = now() WHERE id = :id AND used_at IS NULL`, `UPDATE accounts SET balance = balance - :amount WHERE id = :id AND balance >= :amount`); a unique constraint that makes the second insert fail (one redemption per user and coupon); `SELECT ... FOR UPDATE` row locks inside a transaction; SERIALIZABLE isolation with retries; atomic Redis operations or Lua scripts for counters; and idempotency keys for client retries.
</context>

<task>
Find and fix exploitable races in {{scope}}.
{{#stack}}Stack: {{stack}}{{/stack}}

1. Read the code for each flow from request to database write, and note the database, isolation level, ORM behaviour and how many instances and workers run.
2. List every check-then-act sequence that guards a limit or a one-time action: uniqueness, balances, quantities, quotas, single-use tokens, state transitions (pending to approved), and "first N" rewards.
3. For each, decide whether parallel requests can both pass the check, and what an attacker gains.
4. Fix each real finding with the narrowest atomic mechanism: a conditional update checking affected rows, a unique or check constraint with the error mapped to a clear response, a row lock in a short transaction, or an atomic counter. Remove in-memory locks that pretend to protect shared state.
5. Write a concurrent test per fix that fires many parallel requests or calls (threads, async tasks or a parallel HTTP client against the test server and a real database, not mocks) and asserts the limit holds exactly. Show it fails before the fix where practical.
6. Run the tests and report results, including any flakiness and how the test avoids it.
</task>

<constraints>
- Do not treat a transaction at the default isolation level, or an in-process lock, as a fix without showing why it holds.
- Do not use SQLite or mocks for the concurrent test when production uses another database; the locking behaviour differs.
- Do not run load or race tests against shared or production environments.
- Keep locks short and say what new contention or deadlock risk a fix adds.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Findings
Table: flow, check and write locations, what parallel requests gain, severity, fix.
## Changes
One line per file: `path`, what changed.
## Concurrent tests
Each test, how it runs requests in parallel, and real results before and after.
## Residual risk
Flows not fixed, new lock contention, and anything that needs a decision.
</output_format>
