---
schema: 1
id: dependency-update-sweep-track
kind: workflow
title: Dependency update sweep track
description: Brings a project with many outdated dependencies up to date in gated steps, with a risk-ranked inventory, a patch and minor batch, majors one at a time, then lockfile hygiene and update automation.
category: migration
version: 1.0.0
status: incubating
stage: [discover, maintain, verify]
role: [maintainer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report, config]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [dependencies, outdated-packages, semver, lockfile, update-automation, vulnerabilities]
pairs_with:
  prompts: [upgrade-major-dependency, inventory-deprecated-api-usage]
  personas: [migration-engineer]
args:
  - name: project_manifests
    description: The manifest and lockfile names in the repo (for example package.json and package-lock.json, pyproject.toml and uv.lock, Gemfile, go.mod, pom.xml), or paste them if the repo is not available. Mention the test command.
    type: text
    required: true
  - name: package_manager
    description: The package manager in use, if not obvious from the files.
    type: string
    default: detect from the lockfile
steps:
  - {id: inventory, file: steps/01-inventory.md, stage: discover, gate: approve, artifact: "dependency-sweep/01-inventory.md"}
  - {id: safe-batch, file: steps/02-patch-minor-batch.md, stage: maintain, gate: approve, artifact: "dependency-sweep/02-batch-report.md"}
  - {id: majors, file: steps/03-majors-one-at-a-time.md, stage: maintain, gate: approve, artifact: "dependency-sweep/03-majors-log.md"}
  - {id: hygiene, file: steps/04-hygiene-and-automation.md, stage: verify, gate: none, artifact: "dependency-sweep/04-automation.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes a neglected project from "everything is years out of date" to current, in changes small enough to review and revert. Sweeps fail when everything is bumped in one commit (so nobody can tell which upgrade broke what), when majors are taken without reading their migration notes, when the lockfile is regenerated from scratch and silently moves hundreds of transitive versions, and when nothing stops the drift from coming back. Each step stops for approval.

<project_manifests>
{{project_manifests}}
</project_manifests>

Package manager: {{package_manager}}

Rules for every step:
- Record a baseline (install, build, type check, lint, tests) before changing anything, and report real results after each change. If you cannot run a command, say so and give the user the command.
- Use the package manager to change versions and the lockfile; never edit the lockfile by hand or delete it to start over.
- Read the official changelog or migration guide for every major version crossed; do not rely on memory. If you cannot fetch it, ask the user to paste it.
- Latest versions, advisories and maintenance status come from the package manager's outdated and audit output or the registry, never from memory. Without a repo or shell, give the user the commands, ask for the output, and leave those columns as [X] until it arrives.
- One logical change per commit: the safe batch, then one major per commit, so any of them can be reverted alone.
- Do not silence failures (skipped tests, ignore comments, loosened types, pinned sub-dependencies) to make an upgrade pass; stop and ask instead.
- Do not push, publish or merge; prepare commits or patches for the user.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
