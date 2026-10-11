---
schema: 1
id: design-job-scheduling-system
kind: prompt
title: Design a job scheduling system
description: Designs a scheduler for many delayed and recurring jobs (reminders, scheduled sends, per-tenant reports) with durable storage, fire-once claims, time zones, retries, overlap rules and scale limits.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, tech-lead]
requires: [none]
inputs: [spec, text, repo]
output: [docs, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [scheduler, delayed-jobs, recurring-jobs, time-zones, exactly-once]
pairs_with:
  prompts: [design-workflow-orchestration, build-postgres-job-queue, spec-recurring-schedule-rules, implement-background-job, design-notification-system]
  personas: [software-architect]
args:
  - name: requirements
    description: What gets scheduled (one-off delayed jobs, recurring schedules set by users, both), how many schedules and fires per minute at peak, how late a fire may be, and what a job does when it fires.
    type: text
    required: true
  - name: environment
    description: Current stack, database, queue or broker, cloud, and any scheduler already in use (cron, a job library, a cloud scheduler).
    type: text
output_contract:
  format: markdown
  sections: [Approach, Data model, Firing path, Guarantees and failures, Time and recurrence, Scale and operations, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cron works for a few dozen system jobs. Product features like "remind me tomorrow at 9", "send this campaign at 8am in each recipient's time zone", or "run this tenant's report every Monday" need a scheduler that stores millions of future fire times and fires each one reliably. The design questions experts ask: Where do schedules live, and how does the system find what is due without scanning everything (an index on next fire time, a time-bucketed table, a sorted set, or a broker's delayed delivery)? What happens if the scheduler is down for ten minutes: are missed fires run late, skipped, or collapsed into one? How is a fire claimed so two scheduler instances do not both run it (row leases with `SKIP LOCKED`, a conditional update, a single leader with fencing), and since exactly-once execution is not achievable across a network, how are job handlers made idempotent with a fire id? Recurring schedules should store the rule and the time zone, not a UTC time, because daylight saving shifts local 9am, and some local times happen twice or never; the next fire time is computed after each fire. Many schedules aligned on the same minute (every tenant at midnight) create thundering herds that need jitter or spreading. Broker delayed messages (SQS delay caps at 15 minutes, RabbitMQ plugins, Redis sorted sets) and managed schedulers (EventBridge Scheduler, Cloud Scheduler, Temporal schedules) each have limits on count, delay length and precision that decide the fit.
</context>

<task>
<requirements>
{{requirements}}
</requirements>

{{#environment}}
<environment>
{{environment}}
</environment>
{{/environment}}

1. Restate the load: number of active schedules, peak fires per minute, allowed lateness, and job duration. Ask for numbers that are missing, and state assumptions.
2. Choose an approach from the realistic options for this environment: database-backed scheduler with a due-time index, broker delayed delivery, a managed scheduler service, or a workflow engine's schedules. Explain the choice against load, lateness, cost and what the team can run.
3. Define the data model: schedule (rule or fire time, time zone, owner, status, next fire time, version) and fire records (fire id, state, attempts), with indexes.
4. Define the firing path: how due fires are found, claimed (lease or conditional update), handed to workers or a queue, and marked done, with diagrams. Handlers are idempotent on the fire id.
5. Define guarantees and failures: at-least-once with dedupe, retries with backoff and a dead state, behaviour after downtime (catch-up policy per job type), overlap rules for recurring jobs whose previous run is still going, and how users editing or deleting a schedule interact with an in-flight fire.
6. Define time handling: store rule plus IANA time zone, compute the next fire after each run, rules for nonexistent and repeated local times, and jitter for herds.
7. Define scale and operations: partitioning when one node cannot keep up, metrics (lag between due and fired, backlog, failure rate), alerts, and how to pause, replay or backfill.
</task>

<constraints>
- Do not promise exactly-once execution; design at-least-once with idempotent handlers.
- Do not store recurring local-time schedules as fixed UTC times.
- Do not invent service limits or prices; name the limit to check and where.
- Do not recommend a new system to run (a workflow engine, a broker) without saying what it costs to operate.
{{> output/uncertainty}}
</constraints>

<output_format>
## Approach
Choice and reasons in at most 8 lines.
## Data model
Tables or structures with key fields and indexes.
## Firing path
Mermaid sequence or flow diagram, then numbered steps.
## Guarantees and failures
Bullets: delivery guarantee, idempotency, retries, downtime catch-up, overlap, edits during a fire.
## Time and recurrence
Bullets on storage, next-fire computation, DST rules and jitter.
## Scale and operations
Partitioning, metrics, alerts and operator actions.
## Open questions
Numbered.
</output_format>
