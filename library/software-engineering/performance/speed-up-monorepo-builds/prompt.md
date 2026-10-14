---
schema: 1
id: speed-up-monorepo-builds
kind: prompt
title: Make monorepo builds run only what changed
description: Makes a monorepo build and test only what a change affects by fixing the Nx, Turborepo or Bazel task graph, task inputs and outputs, and local plus remote caching, measured by cache hit rate.
category: performance
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, devops-engineer, tech-lead]
requires: [repo-read, file-write, shell]
inputs: [repo, config, logs, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [monorepo, task-graph, remote-cache, affected-builds, cache-hit-rate]
pairs_with:
  prompts: [set-up-monorepo-ci, speed-up-ci-pipeline, speed-up-frontend-build, speed-up-typescript-type-checking]
  personas: [platform-engineer, devops-engineer]
args:
  - name: repo
    description: Tool (Nx, Turborepo, Bazel, Pants, Gradle, plain workspaces), languages, number of packages, current local and CI times for a typical change, and whether a remote cache is configured.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Baseline, Why work is not skipped, Changes, Results]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A monorepo tool only saves time if its graph and its cache keys are right. The two failure modes are rebuilding too much and caching wrongly. Too much: a root-level file (lockfile, shared tsconfig, a `.env`, CI config) listed as an input to every task means any change invalidates everything; packages that import each other without declaring the dependency are missed by affected detection, so teams fall back to building all; and tasks with no declared outputs cannot be restored from cache. Wrong caching: inputs that are missing (environment variables, a generated file, a tool version) produce cache hits with stale results, which destroys trust and leads people to disable the cache. Nx uses `namedInputs`, `inputs` and `outputs` per target and `nx affected`; Turborepo uses `inputs`, `outputs`, `env` and `globalDependencies` in `turbo.json` and `--filter=...[base]`; Bazel derives everything from declared `deps` and hermetic actions, with remote caching and execution. The useful measures are cache hit rate per task in CI and the number of tasks run for a typical one-package change. Non-deterministic outputs (timestamps, absolute paths, unordered file lists) make tasks miss the cache even with correct inputs.
</context>

<task>
Make builds run only what changed for: {{repo}}

1. Read the workspace and tool configuration, package dependency declarations, task definitions with inputs, outputs and env, and the CI workflow that invokes the tool.
2. Measure: for a recent typical one-package change, how many tasks ran, how long locally and in CI, and the cache hit rate. Use the tool's run summary or dry-run output.
3. Explain why work is not skipped: global inputs that invalidate everything, undeclared dependencies, missing outputs, non-deterministic tasks, CI not using affected or filtered runs, no remote cache.
4. Fix the graph and cache keys: narrow global inputs, declare missing dependencies, declare outputs, add environment variables that change outputs to the cache key, make outputs deterministic, and use affected or filtered runs in CI against the right base.
5. Set up or tune the remote cache with read-only access for untrusted contexts such as fork pull requests.
6. Re-run the same change and a no-op change; report tasks run, time and hit rate. Run the full build once to confirm correctness.
</task>

<constraints>
- A cache hit must never return a stale result: any input that can change an output goes in the key. Say how you checked.
- Do not give write access to the remote cache from untrusted pull requests.
- Do not switch monorepo tools as the fix unless asked; mention it only as a larger option.
- Report before and after on the same change and runner type.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Baseline
Tasks run, time and hit rate for a typical change.
## Why work is not skipped
Causes with the config lines involved.
## Changes
One line per file: `path`, what changed.
## Results
Tasks run, time and hit rate after, plus the full-build correctness check.
</output_format>
