---
schema: 1
id: debug-failed-pipeline-run
kind: prompt
title: Debug a failed pipeline run
description: Finds why a scheduled data pipeline run failed or produced wrong data, using logs, row counts and recent upstream changes, then gives a safe plan to fix, rerun and check downstream impact.
category: data
version: 1.0.0
status: incubating
stage: [operate]
role: [data-engineer, data-analyst]
stack: []
requires: [repo-read, shell]
inputs: [logs, repo, text]
output: [report, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [root-cause, data-incident, rerun-plan, upstream-changes, row-counts]
pairs_with:
  prompts: [make-pipeline-idempotent, write-data-quality-checks, data-backfill-track]
  personas: [data-engineer]
args:
  - name: failure
    description: What happened (error message and failed task, or the wrong numbers someone noticed), which run or date, and when it last worked.
    type: text
    required: true
  - name: evidence
    description: Logs, orchestrator run details, row counts, recent commits or upstream changes you know of, and where the code lives.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Root cause, Evidence, Fix, Rerun plan, Downstream impact, Prevention]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Pipeline failures come in two kinds. Loud ones fail a task: a schema change upstream (renamed or retyped column), expired credentials, a source that arrived late or empty, out-of-memory on a bigger than usual day, a dependency upgrade, a quota. Quiet ones succeed and write wrong data: a join that fanned out after an upstream key stopped being unique, a filter that dropped a new category, a time zone or daylight-saving shift, a partial upstream load that the pipeline treated as complete, a rerun that appended twice. The first question is always what changed: code, upstream data, configuration, volume or the environment, compared with the last good run. Row counts and simple aggregates per step for the bad run and a good run usually locate the step. Rerunning before understanding the cause often makes things worse, especially for non-idempotent jobs, and downstream tables, dashboards and exports that already consumed the bad data need checking too.
</context>

<task>
Failure: {{failure}}
Evidence: {{evidence}}

1. Read the failing task's code and configuration, and the orchestrator's run history. Identify the last good run and compare it with the failed one: code commits between them, dependency versions, input row counts and freshness, schema of each input, run duration and resources.
2. For a loud failure, trace the error to the line and the input that caused it. For wrong data, compare row counts and key aggregates per step between the good and bad runs to find the first step where they diverge, and check key uniqueness at each join.
3. State the root cause with the evidence, or the two most likely causes and the read-only query or check that would decide between them. Run read-only checks if you have access.
4. Propose the fix: a code or configuration change, a request to the upstream owner, or a guard (schema check, freshness check, volume check) that makes the failure loud next time.
5. Write a rerun plan: whether the job is safe to rerun as is (check idempotence first), which runs or partitions to rerun in which order, and what to check afterwards.
6. List downstream tables, dashboards, exports and consumers that read the bad output, and what each needs (rebuild, notification).
</task>

<constraints>
- Read-only investigation. Do not trigger reruns, clear tasks, backfills or deletes yourself; give the commands for the user.
- Do not guess a root cause without evidence; label hypotheses as such.
- If the job is not idempotent, say so before recommending any rerun.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Summary
Two or three sentences: what failed, why, and impact.
## Root cause
The cause, or ranked hypotheses with the deciding check.
## Evidence
Bullets: logs, counts, commits or schema differences.
## Fix
Code or config change, or the upstream request.
## Rerun plan
Ordered steps with the checks after each.
## Downstream impact
Affected consumers and actions.
## Prevention
Checks or alerts to add.
</output_format>
