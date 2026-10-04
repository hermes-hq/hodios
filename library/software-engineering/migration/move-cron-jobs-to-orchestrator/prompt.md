---
schema: 1
id: move-cron-jobs-to-orchestrator
kind: prompt
title: Move cron jobs to an orchestrator
description: Moves scattered cron jobs to a scheduler or workflow orchestrator with an owned inventory, explicit dependencies, idempotency, retries, time zone and overlap rules, alerts and a parallel-run cutover.
category: migration
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [devops-engineer, data-engineer, sre]
stack: []
requires: [none]
inputs: [config, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cron, scheduling, workflow-orchestration, idempotency, retries, time-zones]
pairs_with:
  prompts: [implement-background-job, design-data-pipeline]
  personas: [migration-engineer, data-engineer]
args:
  - name: crontab_or_inventory
    description: Crontab files, systemd timers, CI schedules or a list of jobs with schedule, command, host and what each does. Paste them as they are; owners and dependencies if known.
    type: text
    required: true
  - name: target
    description: The scheduler or orchestrator you are moving to (for example Kubernetes CronJobs, a managed scheduler, Airflow, Dagster, Temporal), or "help me choose".
    type: string
    default: help me choose
output_contract:
  format: markdown
  sections: [Job inventory, Target fit, Dependencies, Job contract, Cutover plan, Monitoring, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A platform or data engineer is moving jobs off crontabs on individual servers. Cron hides problems that surface during the move: implicit ordering by start time ("the export runs at 02:00 because the import usually finishes by 01:45"), jobs that are not safe to run twice or to overlap, schedules written in server local time that shift with daylight saving, output that goes only to a local mail spool, and jobs nobody owns. The orchestrator only helps if those are made explicit: dependencies as edges, each job idempotent with a defined retry policy, a declared time zone and concurrency rule, and an alert routed to an owner.

Target: {{target}}
</context>

<task>
<crontab_or_inventory>
{{crontab_or_inventory}}
</crontab_or_inventory>

1. Parse every entry into a row: schedule in plain words and the time zone it actually runs in, command, host, purpose, inputs and outputs, runtime if known, owner. Translate cron expressions carefully and note any that are ambiguous (both day-of-month and day-of-week set, `@reboot`, steps). Mark unknown owners and purposes as [X].
2. Classify each job: keep, merge, move to an event trigger instead of a time, or delete (dead, duplicated, no consumer). Ask before deleting anything.
3. Find hidden dependencies: jobs that read what another writes, start times spaced to "wait" for another, shared lock files. Turn them into explicit dependencies or sensors.
4. If the target is "help me choose", recommend the simplest tool that fits: a managed or Kubernetes cron for independent jobs; a workflow orchestrator when there are dependency chains, backfills or data assets; a durable workflow engine for long business processes. Give the deciding reasons.
5. Define the job contract each job must meet before it moves: idempotent for a given logical run date (passed in, not read from the clock), safe retries with a limit and backoff, a timeout, a concurrency policy (forbid, replace or allow overlap), a declared time zone with a daylight-saving rule, secrets from the platform not from files on the host, structured logs, and an exit code that means something.
6. Cutover per job: port, run in the new system in dry-run or writing to a shadow target while cron still runs, compare outputs for a few cycles, then disable the cron line (comment it with the date and new location), then remove it after a quiet period. Order: low-risk independent jobs first, chains together.
7. Monitoring: alert on failure, on a missed run (heartbeat or dead-man check), and on duration far above normal, routed to the owner; a page listing all jobs with last success.
</task>

<constraints>
- Do not invent what a job does from its name; mark it as a question.
- Never run a job in both systems at once if it has external side effects (emails, payments, writes to third parties) unless one copy is in dry-run.
- Treat any credentials in the crontab as exposed: tell the user to rotate them and move them to a secret store, and do not repeat them.
- Do not state product limits or prices as fact; say what to check.
</constraints>

<output_format>
## Job inventory
Table: job | schedule (plain words, time zone) | host | purpose | owner | decision (keep, merge, event, delete?) | idempotent? (yes, no, unknown).

## Target fit
If the target above is "help me choose", the recommended tool and the deciding reasons; otherwise the fit check for the named tool (what it handles well here and the gaps). A few bullets.

## Dependencies
List of edges (job A -> job B, reason), and any that were implied by timing.

## Job contract
Checklist each job must pass before cutover.

## Cutover plan
Ordered waves with the parallel-run and rollback rule.

## Monitoring
Alerts and the owner routing.

## Open questions
Bullets.
</output_format>
