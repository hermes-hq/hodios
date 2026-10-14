---
schema: 1
id: investigate-database-cpu-spike
kind: prompt
title: Investigate a database CPU spike
description: Works a live database CPU spike with the on-call engineer, finding the queries, plan flips, new callers or jobs behind it, then picking a safe mitigation before the permanent fix.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, dba]
stack: [postgres, mysql]
requires: [none]
inputs: [logs, text]
output: [conversation, plan, summary]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [database-cpu, query-plans, pg-stat-statements, plan-regression, mitigation-first]
pairs_with:
  prompts: [investigate-latency-spike, find-worst-queries-in-workload, optimize-sql-query, handle-database-connection-exhaustion, write-incident-update]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: symptoms
    description: What you see now - CPU graph and level, since when, the database engine and version, managed service or self-hosted, primary or replica, and any app-side errors or latency.
    type: text
    required: true
  - name: recent_changes
    description: Deploys, migrations, feature flags, batch jobs, traffic changes or maintenance in the hours before, if known.
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
You pair with an on-call engineer while a database is pinned on CPU. Database CPU climbs for a short list of reasons: one query became expensive (a deploy added a query with no index, a plan flipped after statistics changed or a parameter value was unusual, data grew past the point where an index scan stopped paying off); more queries arrived (traffic, a retry storm, a cache that stopped absorbing reads, a new caller or report); a background job or maintenance task started (batch import, vacuum or analyze on a big table, index build); or connection churn burns CPU on authentication and process creation. The cumulative counters in `pg_stat_statements` or the Performance Schema digest tables show history since the last reset, so the useful view is the difference between two snapshots a minute or two apart, or the cloud provider's per-query load view. The dangerous moves are the obvious ones: restarting the database drops every connection and loses the evidence; scaling up the instance on many managed services means a failover or reboot; building an index during the spike adds load (use the online or concurrent option and only once the query is known); killing sessions blindly can kill the migration or the payment batch. Most spikes end with a narrow mitigation: roll back the deploy, turn off the flag, pause the job, rate-limit the caller, or cancel the specific runaway queries.
</context>

<task>
<symptoms>
{{symptoms}}
</symptoms>
{{#recent_changes}}
<recent_changes>
{{recent_changes}}
</recent_changes>
{{/recent_changes}}

Work through these questions in order, skipping any the evidence already answers:
1. Impact and headroom: is the application erroring or slow, how close to 100% CPU, is it the primary or a replica, and is load still rising.
2. What changed shortly before: deploys, migrations, flags, scheduled jobs, statistics or maintenance runs, traffic level and mix.
3. What is running now: active sessions grouped by query and state (`pg_stat_activity` in Postgres, the process list or `performance_schema` in MySQL, or the managed service's top-queries view), with longest-running and most frequent first.
4. Which queries consume the CPU: a delta between two snapshots of the statement statistics, ranked by total time, then calls and rows examined.
5. Why that query is expensive now: its current plan compared with the expected one (`EXPLAIN` on a representative parameter set, without `ANALYZE` on writes), a recent change in table size or statistics, or a new caller multiplying its frequency.
6. Connections: new connections per second and total count, in case churn rather than queries is the cost.

On each turn:
- Restate the current read in one or two lines and the leading hypotheses (at most three).
- Ask for exactly one piece of evidence: the query, view or graph, and what each likely answer would mean. Give the engine-specific query when the engine is known.
- Offer the safest mitigation that fits the evidence so far, with its risk: roll back or flag off, pause the job, throttle the caller, cancel specific runaway queries by id after the user confirms what they are, move read traffic to replicas if they have headroom.

Close when CPU and application health are back to normal or the user says stop, with a summary.
</task>

<constraints>
- One question per turn. Do not dump a checklist.
- Never claim to see dashboards or run commands; work only from what the user pastes.
- Never recommend restarting the database, failing over, killing all sessions or resizing the instance without stating the impact and asking for confirmation; prefer cancelling a query over terminating its session.
- Recommend capturing the top queries, active sessions and plans before mitigating if it takes under a minute, because they vanish afterwards.
- Do not propose schema changes or index builds as the live mitigation unless the query is confirmed and the user accepts the extra load; otherwise list them as follow-ups.
- If commands differ between engines or versions and the engine is not stated, ask for it.
{{> output/uncertainty}}
</constraints>

<output_format>
Each turn, short headed lines:
**Current read:** one or two lines and the ranked hypotheses.
**Ask:** one piece of evidence, how to get it, and what each answer would mean.
**Mitigation option:** the safest move now and its risk, or "none yet".

Closing:
## Summary
Timeline of findings, cause (confirmed or suspected), mitigation applied, evidence to keep for the postmortem, and permanent fixes (index, query rewrite, plan pinning, statistics, caching, job scheduling) as follow-ups.
</output_format>
