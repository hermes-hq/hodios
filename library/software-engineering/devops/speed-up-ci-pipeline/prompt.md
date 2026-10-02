---
schema: 1
id: speed-up-ci-pipeline
kind: prompt
title: Speed up a CI pipeline
description: Finds where a CI pipeline spends its time and proposes ranked changes such as caching, parallelism and skipping unaffected work, without dropping checks. Use when builds are slow or queue up.
category: devops
version: 1.0.0
status: experimental
stage: [maintain]
role: [devops-engineer, software-engineer, tech-lead]
stack: []
requires: [repo-read, file-write]
inputs: [config, logs]
output: [report, diff]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ci, build-cache, test-sharding]
pairs_with:
  prompts: [write-github-actions-workflow]
args:
  - name: pipeline
    description: Path to the CI config (for example `.github/workflows/ci.yml` or `.gitlab-ci.yml`), or its contents.
    type: text
    required: true
  - name: timings
    description: Durations per job and step from a recent run, or a run log. Without them the analysis is an estimate.
    type: text
  - name: target
    description: The goal, for example "PR checks under 10 minutes".
    type: string
output_contract:
  format: markdown
  sections: [Where the time goes, Changes, Expected result, Risks]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Slow CI costs every engineer on every change, and the usual fixes make things worse: dropping tests, adding broad caches that serve stale results, or splitting jobs that then spend all their time on setup. Speed-ups that last come from measuring the critical path and removing repeated or unnecessary work on it.
</context>

<task>
Make {{pipeline}} faster.
{{#timings}}
Timings from a recent run:
{{timings}}
{{/timings}}
{{#target}}Target: {{target}}{{/target}}

1. Read the pipeline config and the scripts it calls. Draw the job graph and find the critical path: the chain of dependent jobs that sets the wall-clock time.
2. Split time on the critical path into queueing, setup (checkout, runtime install), dependency install, build, test, and artefact upload or download. Use the timings when given. Without timings, say the breakdown is an estimate and ask for a run log once.
3. Look for these levers, in roughly this order of payoff:
   - Repeated work: the same build or install done in several jobs; build once and pass the artefact.
   - Dependency and build caches keyed on the lockfile and toolchain version, using the CI's native cache.
   - Parallelism: independent jobs that run in sequence; test suites that can be sharded by timing.
   - Skipping unaffected work: path filters, or affected-project detection in monorepos.
   - Cancelling superseded runs on the same branch.
   - Slow setup: large container images, full git history clones where a shallow clone works.
4. For each lever that applies, estimate the saving on the critical path and the effort, then rank by saving per effort.
5. Ask before editing files. When the user agrees, make the top changes one at a time.
</task>

<constraints>
- Never remove, skip or weaken a check (tests, lint, type check, security scan) to save time. Making it run only on affected code is allowed when the detection is reliable.
- Every cache key includes the lockfile hash and the toolchain version. Never cache test results or build output in a way that can serve a stale pass.
- Label every saving as measured or estimated.
- Keep the config readable. Do not trade a small gain for a large increase in complexity; say when a change is not worth it.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where the time goes
| Job or step | Duration | On critical path | Category |
Then one sentence naming the biggest cost.

## Changes
Numbered, best ratio first. Each: what to change, the saving (measured or estimated), the effort (small, medium, large), and the config diff.

## Expected result
Critical path time before and after, and whether it meets the target.

## Risks
What each change could break (stale caches, flaky shards, skipped work that was needed) and how to detect it.
</output_format>
