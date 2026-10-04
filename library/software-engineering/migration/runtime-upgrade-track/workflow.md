---
schema: 1
id: runtime-upgrade-track
kind: workflow
title: Upgrade a project's language runtime
description: Upgrades a language runtime across code, lockfiles, Docker images, CI and docs, fixing deprecations and running the full suite at each gate. Use before a runtime version reaches end of life.
category: migration
version: 1.0.0
status: incubating
stage: [discover, build, verify]
role: [software-engineer, devops-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [runtime-upgrade, end-of-life, deprecations, version-pinning, lockfile]
pairs_with:
  prompts: [upgrade-major-dependency, review-dockerfile]
args:
  - name: runtime
    description: The runtime being upgraded.
    type: enum
    enum: [node, python, java, dotnet, ruby, go]
    default: node
  - name: target_version
    description: The version to move to, for example "22", "3.13", "21", "9.0", "3.4" or "1.23".
    type: string
    required: true
  - name: test_command
    description: The command that runs the full test suite.
    type: string
    required: true
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: discover, gate: approve, artifact: "runtime-upgrade/01-inventory.md"}
  - {id: upgrade, file: steps/02-upgrade.md, stage: build, gate: none}
  - {id: verify, file: steps/03-verify.md, stage: verify, gate: none, artifact: "runtime-upgrade/03-report.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Moves this project to {{runtime}} {{target_version}} everywhere it runs, not just on one laptop. A runtime upgrade usually fails in the places nobody looks: a CI matrix still on the old version, a Docker base image, a serverless runtime setting, a native module without a build for the new version, or a deprecation that only warns at runtime. This track finds every pin first, reads the official release notes for each version crossed, upgrades in one consistent change, and proves it with the full suite.

Rules for every step:
- Use the official release notes and migration guides for every version between the current one and {{target_version}}. Cite them for each breaking change you act on. Do not rely on memory for what changed.
- Upgrade dependencies only when the new runtime needs it, one reason per dependency, and keep them out of the change otherwise.
- Every claim of "passes" comes from a real run of `{{test_command}}` or a real build on the target version.
- Do not deploy, push images or change shared infrastructure. Prepare the changes and say what someone must roll out.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
{{> guardrails/no-hardcoding-to-pass-tests}}
