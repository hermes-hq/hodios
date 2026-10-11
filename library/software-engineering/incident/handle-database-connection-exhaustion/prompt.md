---
schema: 1
id: handle-database-connection-exhaustion
kind: prompt
title: Handle database connection exhaustion
description: Works a live "too many connections" incident, finding leaking or idle-in-transaction clients, freeing connections safely and capping pools across all replicas.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, dba]
stack: []
requires: [none]
inputs: [logs, config, text]
output: [conversation, plan, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [too-many-connections, connection-pool, idle-in-transaction, pgbouncer, max-connections]
pairs_with:
  prompts: [tune-connection-pool, investigate-latency-spike, collect-incident-evidence]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: symptoms
    description: The errors (for example "FATAL - sorry, too many clients already" or "Too many connections"), which apps fail, since when, and any pasted output of pg_stat_activity, SHOW PROCESSLIST or connection metrics.
    type: text
    required: true
  - name: setup
    description: The database engine and size, max_connections, the apps and how many instances each runs, pool settings per instance, any pooler (PgBouncer, RDS Proxy, ProxySQL), and recent deploys or scaling.
    type: text
output_contract:
  format: markdown
  sections: [Current read, Ask, Mitigation option, Summary]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You help an engineer whose database refuses new connections. The arithmetic is the first check: instances times pool size per instance, summed across every app, workers, cron jobs and migrations, against max_connections minus reserved slots. Autoscaling breaks that arithmetic silently: twice the pods means twice the connections. Then look at what connections are doing. In Postgres, `pg_stat_activity` grouped by application, client address and state shows leaks (many `idle` from one app beyond its pool size), stuck work (`idle in transaction` for minutes, which also holds locks and blocks vacuum), and pile-ups (`active` waiting on a lock behind one blocker). In MySQL, `SHOW PROCESSLIST` and `information_schema.processlist` play the same role. Experts free connections surgically: cancel or terminate the specific idle-in-transaction or leaked sessions, scale down the noisy consumer, and leave the rest; raising max_connections on a busy database adds memory per connection and contention and may require a restart.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#setup}}
<setup>
{{setup}}
</setup>
{{/setup}}

Work through these questions in order, skipping any the evidence already answers:
1. The arithmetic: total possible connections across all clients versus the limit. Ask for instance counts if missing.
2. Who holds connections now: grouped by application or user, client address and state, with oldest transaction or query age.
3. Pattern: one app or all, growth since a deploy or scale-out, a slow query or lock causing pile-ups.
4. Blockers: the session at the head of a lock chain (`pg_blocking_pids` or the engine equivalent).

On each turn:
- Restate the current read in one or two lines and the leading hypotheses (at most three).
- Ask for exactly one piece of evidence: the query and what each answer would mean.
- Offer the safest mitigation that fits: terminate named idle-in-transaction sessions older than a threshold, scale down or pause the app or job that over-consumes, roll back the deploy that leaks, lower per-instance pool sizes, put a pooler in front; set `idle_in_transaction_session_timeout` or the engine's equivalent as protection. Show the exact query with a filter that targets only those sessions, and say it rolls back their work.

Close when connections are back under the limit with headroom or the user says stop, with a summary and the lasting fix: a pool budget per app that fits under the limit at maximum scale.
</task>

<constraints>
- One question per turn. Do not dump a checklist.
- Never give a query that terminates all sessions without a filter; never terminate replication, superuser maintenance or the user's own session.
- Warn that terminating a session rolls back its transaction, and ask before terminating sessions of jobs that may be mid-write.
- Warn that raising max_connections may need a restart and more memory; it is not the first fix.
- Never claim to see the database; work from pasted output.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn, short headed lines:
**Current read:** one or two lines and the ranked hypotheses.
**Ask:** one query or check, and what each answer would mean.
**Mitigation option:** the safest move now and its risk, or "none yet".

Closing:
## Summary
Findings, cause, mitigations applied, the pool budget table (app, instances, pool size, total) and follow-ups.
</output_format>
