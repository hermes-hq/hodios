---
schema: 1
id: collect-incident-evidence
kind: prompt
title: Collect evidence for an ongoing incident, read-only
description: Gathers evidence for a live incident with read-only commands, covering recent deploys, error rates, logs and resource use, and writes a timestamped evidence summary. Use while responders work the fix.
category: incident
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, devops-engineer, backend-engineer]
requires: [repo-read, shell]
inputs: [logs, config, text]
output: [report, table]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
tags: [incident-response, evidence, read-only, timeline, triage]
pairs_with:
  prompts: [triage-production-alert, build-incident-timeline, write-incident-update, write-postmortem]
  personas: [incident-commander, site-reliability-engineer]
args:
  - name: service
    description: The affected service and where it runs, for example "checkout-api on the prod-eu Kubernetes cluster, namespace shop".
    type: string
    required: true
  - name: time_window
    description: The window to examine, with time zone, for example "2026-10-04 13:30 to now UTC". Include some time before the first symptom.
    type: string
    required: true
  - name: allowed_commands
    description: The commands or command prefixes you may run, for example "kubectl get, kubectl describe, kubectl logs, kubectl top, git log, the metrics CLI in read mode". Anything not listed is off limits.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Window and sources, Timeline, Signals, Top errors, Changes in window, Hypotheses, Gaps, Commands run]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
During an incident the responders need facts fast and cannot afford a helper that changes things. Good evidence answers: what changed just before it started, what is failing and how much, since exactly when, for which requests, and what the system's resources are doing. Common traps: reading timestamps in mixed time zones, treating a noisy error that was always there as the cause, pasting logs full of tokens or customer data into the incident channel, and "just restarting" a pod, which destroys the evidence.
</context>

<task>
Collect evidence for the incident affecting {{service}} over {{time_window}}.

<allowed_commands>
{{allowed_commands}}
</allowed_commands>

1. Before running anything, check each command you plan against the allowed list. Run only commands on it, and within those, only read operations. If a useful command is not allowed, write it under Gaps as a command for a human to run, with what it would show.
2. Changes in the window: deploys and rollouts (rollout history, release tags, `git log` of the deployed revision range), config and feature flag changes, infrastructure or dependency changes, scaling events, certificate expiries, scheduled jobs.
3. Signals: request rate, error rate and latency for the service and its dependencies, compared with the same window a day or a week earlier where the tools allow; saturation (CPU, memory, restarts and OOM kills, connection pools, queue depth, disk).
4. Logs: group errors by signature (exception type and normalised message), with count, first seen and last seen in the window, and whether the signature also appears before the incident started. Quote one short example line per signature with secrets, tokens and personal data redacted.
5. Normalise every timestamp to UTC and name its source. Note clock skew or gaps in data.
6. Build a timeline, then rank hypotheses that the evidence supports, each with evidence for and against and the next check that would confirm or rule it out.
7. Write the evidence summary to a file named with the service and the UTC time of writing, and print the same summary.
</task>

<constraints>
- Read-only, always. Never restart, scale, roll back, delete, drain, exec into a container to change state, edit config, flush caches, acknowledge or silence alerts, or post to incident channels, even if the allowed list seems to permit it. Recommending an action is fine; taking it is not.
- Do not run commands that put heavy load on a struggling system, such as unbounded log queries over days; scope queries to the window and add limits.
- Label each statement as observed (with its source) or inferred. Do not present a hypothesis as the cause.
- Never copy secrets, tokens, credentials or customer personal data into the summary.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Window and sources
Window in UTC, systems queried, and data gaps.

## Timeline
Table: Time (UTC) | Event | Source | Observed or inferred.

## Signals
Table: Signal | Baseline | During incident | Source.

## Top errors
Table: Signature | Count | First seen | Present before incident | Example (redacted).

## Changes in window
Table: Time | Change | Who or what | Source.

## Hypotheses
Ranked list: hypothesis, evidence for, evidence against, next check.

## Gaps
Missing data and commands for a human to run.

## Commands run
Each command with its exit status, in order.
</output_format>
