---
schema: 1
id: fix-scheduled-job-not-running
kind: prompt
title: Fix a scheduled job that does not run
description: Finds why a cron job, systemd timer, Kubernetes CronJob or cloud scheduler task does not fire, runs twice or fails only when scheduled, checking schedule, environment, time zone and overlap.
category: debugging
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [devops-engineer, backend-engineer, software-engineer]
stack: []
requires: [none]
inputs: [config, logs, text]
output: [explanation, config]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cron, systemd-timers, cronjob, scheduled-jobs, time-zones]
pairs_with:
  prompts: [move-cron-jobs-to-orchestrator, implement-background-job]
args:
  - name: symptom
    description: What happens, for example "the backup script runs fine by hand but the 2 a.m. cron run never produces a file" or "the report job ran twice on Sunday".
    type: text
    required: true
  - name: scheduler_config
    description: The schedule definition (crontab line, systemd timer and service units, CronJob manifest, cloud scheduler settings) and the script or command it runs.
    type: text
    required: true
  - name: logs
    description: Anything the scheduler or job logged, for example syslog or journalctl output, `kubectl get jobs` and events, or "nothing at all".
    type: text
output_contract:
  format: markdown
  sections: [Likely causes, Checks to run, Diagnosis, Fix, Make it observable]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who has debugged many scheduled jobs and knows that "it works when I run it" almost always means the scheduled run has a different environment. The usual causes, by scheduler:
- cron: a minimal `PATH` (often only `/usr/bin:/bin`), no login shell profile, `sh` instead of `bash`, a different working directory (the user's home), `%` characters in the crontab line treated as newlines, a missing newline at the end of the crontab file, the job installed in another user's crontab, output mailed to a local mailbox nobody reads, and the server's time zone differing from the one the author assumed.
- systemd timers: the timer unit not enabled or started, `OnCalendar` syntax that `systemd-analyze calendar` would reject, `Persistent=` deciding whether missed runs catch up after downtime, and service units with a stricter environment.
- Kubernetes CronJob: schedule interpreted in the controller's time zone unless `timeZone` is set, `concurrencyPolicy` allowing overlaps, `startingDeadlineSeconds` and more than 100 missed schedules stopping new runs, `suspend: true`, and failed pods hidden by history limits.
- Cloud schedulers and app-level schedulers: UTC by default, at-least-once delivery that can run a job twice, and in-process schedulers running once per replica.
Daylight saving time makes local-time jobs between roughly 1 a.m. and 3 a.m. skip or repeat on transition days. Jobs that overlap with their previous run cause double processing unless they take a lock.
</context>

<task>
Find why this scheduled job misbehaves.

Symptom:
{{symptom}}

Schedule and command:
{{scheduler_config}}

{{#logs}}
Logs:
{{logs}}
{{/logs}}

1. Check the schedule expression itself: say in plain words when it fires, in which time zone, and the next three run times. Flag syntax that does not mean what the author probably intended.
2. List the likely causes for this scheduler, ranked by fit with the symptom.
3. Give the checks that tell them apart, with exact commands: did the scheduler try to start it (syslog, `journalctl -u`, `systemctl list-timers`, `kubectl get jobs,events`), did the command start, and what did it print. Include how to run the command in the scheduler's exact environment, for example `env -i` with cron's variables or a one-off Job created from the CronJob. If the evidence is not there, ask for the results and stop.
4. State the diagnosis.
5. Give the fix as a corrected schedule or unit, with absolute paths, an explicit shell and environment, the working directory set, the time zone set explicitly, output sent to a log, and a lock (for example `flock`) or concurrency policy if overlap is possible.
6. Make failures visible: exit codes that mean something, logs that a person reads, and a dead-man's-switch style check that alerts when the job did not run.
</task>

<constraints>
- Never guess the server's time zone; ask, or show how to read it.
- Do not suggest running the job as root to get past a permission error; fix the permission or the user.
- If a job is not idempotent and can run twice, say so and propose how to make it safe.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Likely causes
Ranked list with one line each.
## Checks to run
Commands and what each result means.
## Diagnosis
The cause, or "Waiting for check results".
## Fix
The corrected schedule, unit or manifest.
## Make it observable
Logging and missed-run alerting.
</output_format>
