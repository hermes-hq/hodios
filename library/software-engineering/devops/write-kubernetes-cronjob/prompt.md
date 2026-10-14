---
schema: 1
id: write-kubernetes-cronjob
kind: prompt
title: Write a Kubernetes Job or CronJob
description: Writes a Kubernetes Job or CronJob with concurrency policy, deadlines, retry backoff, history limits, time zone, resources and an idempotent task design, plus how to monitor missed or failed runs.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer, data-engineer]
stack: [kubernetes]
requires: [repo-read, file-write]
inputs: [spec, repo]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [cronjob, batch-jobs, scheduled-tasks, idempotency]
pairs_with:
  prompts: [write-kubernetes-manifests, fix-scheduled-job-not-running, tune-kubernetes-resources]
args:
  - name: task
    description: What the job does, the image and command, how long it takes, how often it runs (with time zone), what it reads and writes, and what happens if it runs twice or not at all.
    type: text
    required: true
  - name: cluster
    description: Kubernetes version and anything relevant such as spot nodes, a service mesh sidecar, or the monitoring stack.
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Manifest, Idempotency, Monitoring, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
CronJobs fail in quiet ways. The default `concurrencyPolicy: Allow` lets a slow run overlap the next one, so two copies process the same data. Without `startingDeadlineSeconds`, a run missed during a controller outage can start long after its slot, and after many missed schedules the controller only warns and starts the latest one (older controllers stopped scheduling after more than 100 misses). Without `activeDeadlineSeconds`, a hung job runs forever and blocks the next run under `Forbid`. Kubernetes guarantees roughly once, not exactly once: a run can be skipped or, rarely, created twice, and a pod can be killed midway by node drains or spot reclaims, so the task itself must be idempotent and resumable. Schedules are in the controller's time zone (usually UTC) unless `timeZone` is set (stable since 1.27), and daylight-saving changes can skip or repeat a local-time run. Service mesh sidecars keep a Job pod running after the main container exits unless native sidecar containers (restartable init containers) or a shutdown call are used. `restartPolicy: OnFailure` retries in the same pod and hides failures from `backoffLimit` counting in ways people do not expect; `Never` gives one pod per attempt and clearer history.
</context>

<task>
Write a Kubernetes {{#cluster}}({{cluster}}) {{/cluster}}Job or CronJob for:
{{task}}

1. If a repository is available, read existing manifests or charts for conventions (labels, service accounts, config and secret references) and the job's code to see whether it is idempotent.
2. Decide Job (one-off or triggered) or CronJob, and say what happens on a missed run and on a duplicate run for this task.
3. Write the manifest: `schedule` and `timeZone`, `concurrencyPolicy` (usually `Forbid`; `Replace` only when the newest run supersedes the old), `startingDeadlineSeconds`, `successfulJobsHistoryLimit` and `failedJobsHistoryLimit`, `backoffLimit`, `activeDeadlineSeconds` from the expected duration, `ttlSecondsAfterFinished` for plain Jobs, `restartPolicy: Never`, resource requests and limits, a dedicated service account, security context, and a `podFailurePolicy` if some exit codes should not be retried.
4. Handle sidecars if a mesh is present, and node disruption (avoid spot nodes for long non-resumable runs, or make the job resumable; a `safe-to-evict: false` style annotation where the autoscaler supports it).
5. Idempotency: describe the concrete changes or checks the task needs (checkpointing, upserts, a lock or lease, processing by time window rather than "since last run").
6. Monitoring: alert on last successful run older than the expected interval plus slack, and on failed Jobs, using the stated monitoring stack (for example kube-state-metrics series) or a dead-man's-switch ping from the job.
</task>

<constraints>
- Use only fields valid for the stated Kubernetes version; mark any you are unsure of.
- No secret values in the manifest; reference Secrets by name.
- Do not create or trigger jobs on a cluster; write files and give commands for a manual test run.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets, including the time zone and run-time estimate.
## Manifest
Fenced `yaml` block with file path, with short comments on non-obvious fields.
## Idempotency
Bullets: what happens on a duplicate, a missed run and a mid-run kill, and the change needed for each.
## Monitoring
The alert rules or checks.
## Verify
Commands to trigger a manual run from the CronJob (`kubectl create job --from=cronjob/...`), watch it, and read its logs.
</output_format>
