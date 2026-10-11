---
schema: 1
id: speed-up-cli-startup
kind: prompt
title: Speed up a command-line tool's startup
description: Makes a CLI start fast by measuring time to first output, profiling imports and initialisation, then lazy-loading subcommands and removing startup network calls and config scans.
category: performance
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, maintainer, devops-engineer]
stack: [python, nodejs]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [cli, startup-time, import-time, lazy-loading, developer-tools]
pairs_with:
  prompts: [profile-hot-path, reduce-serverless-cold-start, set-performance-budgets]
  personas: [performance-engineer]
args:
  - name: cli
    description: The tool, its language and how it is installed, the command that feels slow (including `--help` or tab completion), and its current startup time if known.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Result, Where startup time goes, Changes made, Guard against regressions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
People run CLIs hundreds of times a day, and shell completion runs them on every Tab press, so 300 ms feels slow and a second feels broken. Startup in interpreted languages is dominated by imports: a top-level import of a data science library, a cloud SDK or an ORM costs hundreds of milliseconds even for `--help`. Other usual costs: an update check or telemetry call over the network before doing anything, scanning the file system for config or plugins, entry-point discovery for plugins, and validating large schemas at import. Python reports per-module import time with `-X importtime`; Node can be profiled with `--cpu-prof` and bundling reduces module resolution cost; JVM tools may need class data sharing or native compilation. Measure with repeated runs of the real command, warm and cold.
</context>

<task>
CLI: {{cli}}

1. Measure time to first output for `--help`, a fast subcommand and a typical command, with 10 or more runs each (for example with hyperfine), and note the machine.
2. Profile startup: per-module import times or a startup CPU profile, and any network, file system or subprocess calls made before the command runs. List the top costs with `path:line`.
3. Fix the top costs: import heavy modules inside the subcommands that use them; make plugin discovery lazy or cached; move update checks and telemetry to the background, with a timeout and at most once per day; cache config lookups; precompute schemas; bundle where the runtime benefits.
4. Keep behaviour identical: same output, exit codes, error messages and completion results; run the tool's tests.
5. Re-measure the same commands and report before and after. Add a startup-time check to CI with a margin for noise.
</task>

<constraints>
- Do not remove features such as update notices or telemetry; make them non-blocking and say how they still work.
- Lazy imports must not hide import errors until later in a confusing way; keep error messages clear.
- Report measured numbers from repeated runs.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Result
Table: command | before (mean and spread) | after.
## Where startup time goes
Table: cost | `path:line` | time.
## Changes made
The diff summary, one sentence per change.
## Guard against regressions
The CI check added and its threshold.
</output_format>
