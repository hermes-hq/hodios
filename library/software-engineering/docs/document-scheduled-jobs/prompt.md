---
schema: 1
id: document-scheduled-jobs
kind: prompt
title: Document scheduled jobs
description: Finds every cron job, scheduled task and recurring worker across code and infrastructure config, and documents schedule, time zone, purpose, failure impact and rerun steps.
category: docs
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer, sre, devops-engineer, backend-engineer]
stack: []
requires: [repo-read]
inputs: [repo, config]
output: [docs, table, report]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [cron-jobs, background-jobs, job-inventory, operations-docs, job-schedules]
pairs_with:
  prompts: [write-runbook, document-data-pipeline, write-ownership-handover-doc, implement-background-job]
args:
  - name: scope
    description: The repositories or services to cover, and where infrastructure config lives if it is separate.
    type: text
    required: true
  - name: notes
    description: What you already know - schedulers in use, jobs that live outside the repo (a cloud console, a server crontab), owners, and recent incidents.
    type: text
output_contract:
  format: markdown
  sections: [Job inventory, Job details, Risks found, Not found in code]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Scheduled work is the part of a system people forget until it fails quietly: invoices not sent, a certificate not renewed, a cleanup that stopped months ago. Jobs are scattered across schedulers: crontab files, Kubernetes CronJobs, framework schedulers (Celery beat, Sidekiq-cron, Laravel's scheduler, Spring `@Scheduled`, node-cron), CI scheduled workflows, and cloud schedulers defined in Terraform. The details that matter are the ones that bite: the time zone the schedule is evaluated in (often UTC on the server, local in someone's head), what happens around daylight-saving changes, whether two runs can overlap (Kubernetes `concurrencyPolicy`, missing locks), whether a missed run is caught up or skipped, whether the job is safe to rerun, and whether anyone is alerted when it fails or simply does not run. Silent non-running is the most common failure and needs a heartbeat or dead-man check, not just error alerts.
</context>

<task>
Inventory and document the scheduled jobs in: {{scope}}
{{#notes}}Notes: {{notes}}{{/notes}}

1. Search for every scheduler: crontab files and cron syntax strings, Kubernetes CronJob manifests and Helm templates, framework scheduler registrations, CI scheduled triggers, cloud scheduler and event-rule resources in infrastructure code, and long-running workers with sleep loops or intervals.
2. For each job record: name, where it is defined, schedule in its original syntax and in plain words, the time zone it runs in (and how you know), what it does (from reading the code it calls), what it reads and writes, typical duration if visible, overlap protection, catch-up behaviour, idempotency, failure alerting and heartbeat, and owner if the code or CODEOWNERS shows one.
3. Note what breaks or who notices if the job fails or stops running.
4. Write rerun or manual-run instructions for each job from the code (the command, task name or console action), marked with a warning when a rerun is not safe.
5. Flag risks: no alerting, no overlap protection, non-idempotent jobs with retries, schedules in local time across daylight-saving changes, jobs that call code that no longer exists, and duplicated jobs in two schedulers.
</task>

<constraints>
- Do not trigger, run or disable any job; this is documentation from code and config.
- Say "unknown" for time zone, owner or alerting when the code does not show it; do not assume UTC without evidence.
- List jobs mentioned in notes but not found in code separately, as unverified.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Job inventory
Table: job, scheduler, schedule (plain words and time zone), purpose, alerting, owner.
## Job details
One subsection per job with the fields from step 2, failure impact and rerun steps.
## Risks found
Ranked list of risks with the job and evidence.
## Not found in code
Jobs that must be confirmed elsewhere (consoles, server crontabs) and how to check.
</output_format>
