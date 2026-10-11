---
schema: 1
id: review-scheduled-job-change
kind: prompt
title: Review a scheduled job change
description: Reviews a cron or scheduled job change for overlapping runs, missed-run catch-up, missing locks, unbounded batches, time zone schedules and silent failure.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, devops-engineer, software-engineer]
requires: [none]
inputs: [diff, config]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cron, scheduled-jobs, batch-jobs, locking, pull-request]
pairs_with:
  personas: [code-reviewer]
  prompts: [implement-background-job, fix-scheduled-job-not-running]
args:
  - name: diff
    description: The job code and its schedule definition (crontab, Kubernetes CronJob, scheduler config, framework annotation), with file paths.
    type: text
    required: true
  - name: context
    description: How many instances run the scheduler, data volume the job processes, what downstream depends on it, and how failures are alerted today.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Run model, Findings, Tests to add]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Scheduled jobs fail at the edges of time and scale. A job that runs every five minutes and takes six will overlap itself; a job scheduled in an app that runs on three replicas fires three times unless something elects one; a Kubernetes CronJob with the default `concurrencyPolicy: Allow` starts a new pod while the old one is still running, and `startingDeadlineSeconds` decides whether missed runs are skipped or replayed. Jobs that select "everything since the last run" break when a run is missed or the clock moves, so they should track a persisted watermark, not `now() - interval`. Jobs that load "all pending rows" work on day one and run out of memory a year later. Schedules written in local time run twice or not at all when daylight saving changes, and many schedulers use UTC regardless of what the author assumed. The most damaging failure is silent: the job errors, nobody is paged, and invoices stop going out for a week. Each run should be safe to re-run, bounded, observable and alert when it fails or does not run at all.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. Describe the run model: schedule expression and its time zone, scheduler, how many instances can trigger it, expected and worst-case duration, and what each run selects and changes.
2. Check concurrency: overlap between consecutive runs, duplicate runs across replicas or regions, lock or leader election (and lock expiry shorter than the run), `concurrencyPolicy` or equivalent.
3. Check the selection window: fixed time windows versus a persisted watermark or status column, behaviour after a missed run, a deploy, a long outage or a clock change; records created during the run.
4. Check idempotency: what a re-run or a retry after partial failure does to records already processed (double emails, double charges, duplicate rows).
5. Check scale: unbounded queries or in-memory lists, missing batching or pagination, transactions held across the whole run, timeouts set lower than the realistic duration.
6. Check schedule correctness: cron syntax (day-of-month and day-of-week combine with OR in standard cron), local-time schedules across daylight saving, end-of-month days.
7. Check observability: failure alerting, a heartbeat or dead-man's switch for runs that never start, logs with counts processed and skipped, exit code on partial failure.
8. For each finding, give the scenario (which run, which timing) and the smallest fix.
</task>

<constraints>
- Every finding names a concrete scenario, for example "run at 02:00 takes 7 minutes, 02:05 run starts while it holds 3,000 rows".
- Do not assume the scheduler's time zone or concurrency policy; read it or ask.
- Never suggest manually triggering or re-running the job against production as part of the review.
- At most 8 findings.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes.
## Run model
Bullets: schedule and zone, triggering instances, duration, selection, side effects.
## Findings
Numbered: severity, `path:line`, scenario, consequence, fix.
## Tests to add
Bullets: re-run, overlap, missed-run and large-volume tests.
</output_format>
