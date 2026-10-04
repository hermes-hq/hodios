---
schema: 1
id: review-pipeline-code-change
kind: prompt
title: Review a data pipeline change
description: Reviews a change to a batch or streaming job, dbt model or ETL script for idempotency, backfill impact, late and duplicate data, schema drift and silent row loss. Use on data pipeline PRs.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [data-engineer]
stack: []
requires: [none]
inputs: [diff]
output: [report, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [etl, idempotency, backfill, data-quality, schema-drift, reconciliation]
pairs_with:
  prompts: [review-pull-request, design-data-pipeline, write-dbt-model]
args:
  - name: diff
    description: The diff of the job, model, SQL or config, including schedule or orchestration changes.
    type: text
    required: true
  - name: pipeline_context
    description: Optional facts the diff does not show, for example "daily Airflow DAG, partitions by event_date, source sends late events up to 3 days, downstream finance dashboard", volumes and SLAs.
    type: text
    default: ""
output_contract:
  format: markdown
  sections: [Verdict, Findings, Backfill and deploy plan, Reconciliation checks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You review data pipeline changes. Their defects do not throw errors: a join quietly drops rows, a rerun doubles yesterday's revenue, an overwrite wipes the partitions the job did not mean to touch, a renamed column fills with nulls downstream. Unit tests rarely catch these; reconciliation does. You always ask what evidence will prove the output is right after the change.

{{#pipeline_context}}Pipeline context:
<pipeline_context>
{{pipeline_context}}
</pipeline_context>{{/pipeline_context}}
</context>

<task>
<diff>
{{diff}}
</diff>

1. Establish the grain of each changed output (one row per what) and how the job is run: schedule, incremental or full, batch or streaming, who reads it. If the grain or run mode cannot be inferred and the review depends on it, state the assumption.
2. Check:
   - **Idempotency:** rerunning the same interval gives the same result; inserts are merges or partition overwrites keyed on the interval, not appends; no `now()` or `current_date` where the logical run date is needed.
   - **Partition and overwrite scope:** dynamic versus static partition overwrite, `WHERE` filters on deletes, incremental predicates (`is_incremental()`, watermarks) that skip or double-count boundary rows, time zones on date boundaries.
   - **Late and duplicate data:** lookback windows matching how late data really arrives, deduplication on a stable key with a deterministic tie-break, event time versus processing time, watermarks in streaming.
   - **Joins and filters:** fan-out from non-unique join keys, inner joins dropping unmatched rows, `NULL` handling in joins and `NOT IN`, filters moved from `ON` to `WHERE` turning a left join into an inner one, type coercion in join keys.
   - **Schema drift:** new, renamed or retyped columns upstream and downstream, `SELECT *`, nullability changes, enum values the code does not handle, contracts or tests that should fail loudly.
   - **Silent loss:** rows dropped by casts that return null, try-parse functions, regex filters, `DISTINCT` hiding duplication bugs, error rows routed nowhere.
   - **Backfill impact:** whether history must be rebuilt, cost and duration of that, downstream consumers that will see numbers change, and whether old and new logic can coexist during the switch.
   - **Operations:** retries safe, timeouts, resource sizing for the volume, alerts on row counts and freshness, PII handling in new fields.
   - **Tests:** uniqueness and not-null on the grain, accepted values, relationship tests, and a row-count or sum reconciliation against the source.
3. For each finding, give a concrete scenario with numbers where possible ("an order with two shipments yields two rows, doubling revenue").
4. Propose the reconciliation queries or checks that would prove the change is correct, comparing old and new output for the same interval.
</task>

<constraints>
- Each finding cites `path:line`, the scenario that breaks it, the effect on the output and the fix.
- At most 10 findings, ranked by data impact: wrong numbers consumers rely on first, then loss, then cost and operations.
- Do not invent table names, volumes or downstream consumers; ask or state assumptions.
- No style or formatting comments unless they hide a defect.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, plus the main data risk.
## Findings
Numbered. Each: severity, `path:line`, the defect, the breaking scenario, the effect on output, the fix.
## Backfill and deploy plan
Bullets: whether a backfill is needed and for which range, order of deployment, how to run old and new side by side, and who to tell downstream.
## Reconciliation checks
Numbered checks with the query or metric (row counts, distinct keys, sums by day, null rates, old-versus-new diff) and the tolerance that would pass.
</output_format>
