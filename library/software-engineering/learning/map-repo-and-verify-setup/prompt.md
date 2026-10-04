---
schema: 1
id: map-repo-and-verify-setup
kind: prompt
title: Map an unfamiliar repo and verify its setup docs
description: Explores an unfamiliar repository, builds and runs it and its tests by following the docs exactly, records every gap without fixing code, and writes a verified getting-started note. Use on day one.
category: learning
version: 1.0.0
status: incubating
stage: [learn, verify]
role: [software-engineer, maintainer, technical-writer]
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [docs, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [developer-setup, setup-verification, getting-started, docs-gaps, codebase-map]
pairs_with:
  prompts: [explain-codebase, write-onboarding-guide, write-agents-md, write-contributing-guide]
args:
  - name: repo_path
    description: Path to the local clone.
    type: string
    required: true
  - name: goal
    description: What "set up" means here, for example run-locally, run-tests, build-release, or a specific task such as "run the API against a local database".
    type: string
    default: run-locally
output_contract:
  format: markdown
  sections: [Map, Setup log, Gaps, Getting started, Verification]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Setup docs are usually written once by someone whose machine already had half the tools, so they skip steps, pin old versions, or describe a flow the CI config abandoned long ago. The fastest way to find out is to follow them literally on a clean path and write down every place reality differs. The value of this run is the record, not a working checkout at any cost: a silent workaround helps one person once, while a recorded gap fixes the docs for everyone.
</context>

<task>
Explore the repository at `{{repo_path}}` and verify its setup for this goal: {{goal}}.

1. Map the repository before running anything: purpose (README), languages and frameworks (manifests), top-level layout and what each main directory holds, entry points, the test setup, external services it needs, and where configuration and secrets come from. Read README, CONTRIBUTING, AGENTS-style files, Makefiles or task runners, package scripts, devcontainer and compose files, and the CI configuration, which is often the most accurate description of a working setup.
2. Follow the documented setup for the goal literally, in order. For each step record the command, its exit status, the time it took, and the relevant output lines.
3. When a step fails or is missing, diagnose the cause (missing tool, version mismatch, undocumented environment variable, service not running, wrong order, platform difference) and try the smallest workaround that leaves tracked files unchanged: an environment variable, an untracked local config file copied from an example, a different tool version through a version manager, a step taken from CI. Record the gap and the workaround either way.
4. Run the tests the docs describe, and the app if the goal includes running it. Report real results; a failing test is a finding, not something to work around.
5. Write a getting-started note containing only commands you actually ran successfully, in order, with prerequisites and versions, to a new file outside the existing docs (for example `GETTING-STARTED.verified.md` at a path the user can review), so the maintainers can merge it into their docs.
</task>

<constraints>
- Fix nothing in tracked files: no code, config, docs or lockfile changes. Record instead.
- Do not install tools globally, use administrator rights, or change shell profiles without asking; prefer project-local or version-managed installs, and list anything installed.
- If a step needs credentials, paid accounts or access you do not have, stop that path, record it, and continue with whatever does not depend on it.
- Never skip, deselect or mark tests as expected failures to make the run look clean.
- Do not run commands that deploy, publish, send email, or touch shared or production resources, even if the docs say to.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
</constraints>

<output_format>
## Map
Purpose, stack, layout (Directory | What it holds), entry points, external services, configuration sources.

## Setup log
Table: Step | Source (doc and line, or CI) | Command | Exit | Time | Notes.

## Gaps
Table: Gap | Effect | Workaround used | Suggested docs fix.

## Getting started
Where the verified note was written, and its contents.

## Verification
Test and run results for the goal, real output summarised, and anything installed along the way.
</output_format>
