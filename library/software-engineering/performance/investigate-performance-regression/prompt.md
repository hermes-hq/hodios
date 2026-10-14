---
schema: 1
id: investigate-performance-regression
kind: prompt
title: Investigate a performance regression between releases
description: Finds why a new release is slower by confirming the slowdown is real, comparing profiles and metrics between versions, and narrowing it to the commit and code responsible.
category: performance
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [software-engineer, backend-engineer, sre]
stack: []
requires: [repo-read, shell, git]
inputs: [repo, logs, text]
output: [report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [regression, profiling, benchmarking, flame-graph, differential-profile]
pairs_with:
  prompts: [compare-benchmark-runs, bisect-regression, read-flame-graph, set-performance-budgets]
  personas: [performance-engineer]
args:
  - name: symptom
    description: What got slower (endpoint, job, page, command), by how much, the good and bad versions or dates, and where it was noticed.
    type: text
    required: true
  - name: evidence
    description: Metrics or benchmark numbers from both versions, profiles, and anything else that changed at the same time (dependencies, infrastructure, traffic, data size).
    type: text
output_contract:
  format: markdown
  sections: [Is it real, What changed, Narrowing, Cause, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Many "regressions" are not code: traffic mix, data growth, a cold cache after deploy, a noisy neighbour, a new instance type or a dependency bumped in the same release. Before bisecting, confirm the slowdown on the same inputs, hardware and load, with enough runs to see past noise; a 5% shift inside run-to-run spread is not a finding. Comparing percentiles matters: a mean can stay flat while p99 doubles. The fastest way to the cause is usually a differential profile: profile both versions under the same workload and compare where time moved, which points to a function, query or allocation pattern, then map that to commits touching it. Bisecting performance works like bisecting bugs only when the check is a scripted, repeatable benchmark with a threshold set above the noise; a flaky check sends the bisect the wrong way. Dependency upgrades, logging or tracing changes, serialization changes and ORM query changes are the usual suspects.
</context>

<task>
Symptom: {{symptom}}
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Confirm it is real. Reproduce on both versions with the same inputs, environment and load, several runs each, and compare medians and the relevant percentile with their spread. If you cannot run both versions, say what to run and mark everything after as unverified.
2. List everything that changed between the good and bad states: commits (`git log good..bad` on the relevant paths), dependency lock file diffs, configuration, infrastructure, data volume and traffic. Rule out non-code causes with evidence where possible.
3. Profile both versions under the same workload (CPU, allocations, and database or network calls as relevant) and compare. Name the functions, queries or calls whose share of time grew.
4. Map those hotspots to the commits and dependency changes that touched them. If several candidates remain, write a scripted benchmark with a pass threshold above the measured noise and bisect with it, with the user's agreement before long runs.
5. Explain the mechanism of the slowdown in plain terms and point to the code with `path:line`. Propose the fix or revert options, and a benchmark or budget check that would catch it next time.
</task>

<constraints>
- Do not name a culprit commit without evidence linking it to the measured slowdown.
- Report the spread and run count with every comparison; call differences inside the noise inconclusive.
- Do not revert, deploy or rewrite history; propose and wait for confirmation.
- Keep the investigation read-only apart from local benchmark scripts and builds.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Is it real
The before and after numbers, runs and spread, and the verdict.
## What changed
Code, dependencies, configuration, infrastructure, data and traffic, with what was ruled out and how.
## Narrowing
Profile comparison results and, if run, the bisect steps.
## Cause
The commit or change, the mechanism and `path:line`, with confidence.
## Next steps
Fix or revert options and the check that would catch this again.
</output_format>
