---
schema: 1
id: build-github-action
kind: prompt
title: Build a reusable custom GitHub Action
description: Builds a reusable GitHub Action (composite, JavaScript or Docker) with a clear action.yml, safe input handling, outputs, a bundled build, tests in CI and versioned releases.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, maintainer, software-engineer]
stack: [github-actions]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [custom-action, action-yml, composite-action, script-injection, versioning]
args:
  - name: action_job
    description: What the action does, its inputs and outputs, and who will use it (one org's repos or the public).
    type: text
    required: true
  - name: action_type
    description: Kind of action. "decide" picks from the job.
    type: enum
    enum: [composite, javascript, docker, decide]
    default: decide
output_contract:
  format: markdown
  sections: [Design, Changes, action.yml, Tests, Release steps, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A custom action runs inside other people's workflows with their token and secrets, so mistakes spread. The biggest one is script injection: interpolating an input or event field (such as a pull request title) directly into a `run:` script lets an attacker run commands; inputs must reach the shell through environment variables. Other recurring problems: JavaScript actions that do not commit the bundled `dist/` (the runner does not install dependencies), or that target a Node runtime GitHub has deprecated; using the deprecated `set-output` workflow command instead of writing to the `GITHUB_OUTPUT` file; Docker actions that only run on Linux runners and are slow to start; and releases without a moving major tag (`v1`), so users must pin every patch or pin nothing.
</context>

<task>
Build this action:

{{action_job}}

Type: {{action_type}}

1. Read the repo: is this a dedicated action repo or a `.github/actions/` folder inside a project; existing actions, workflows, Node version and tooling.
2. If type is "decide": composite for gluing shell steps and other actions; JavaScript (TypeScript compiled and bundled with ncc or esbuild) for logic, API calls through `@actions/core` and `@actions/github`, and cross-platform runners; Docker only when a specific toolchain is required and Linux-only is acceptable. State the choice.
3. Write `action.yml`: `name`, `description`, `author`, `branding` if public; each input with `description`, `required` and `default`; each output with `description`; `runs` with the current supported Node runtime for JavaScript actions.
4. Handle inputs safely: in composite steps, pass inputs and event fields to scripts through `env:` and reference them as quoted shell variables; never interpolate them into the script text. In JavaScript, read with `core.getInput` and validate.
5. Set outputs by appending to the `GITHUB_OUTPUT` file (composite) or `core.setOutput` (JavaScript); mask any secrets with `core.setSecret` or `add-mask`; write a job summary if useful.
6. Fail clearly with `core.setFailed` or a non-zero exit and an actionable message. Document the minimum `permissions` the calling workflow's `GITHUB_TOKEN` needs.
7. For JavaScript actions, add a build script, commit `dist/`, and add a CI check that the committed `dist/` matches a fresh build.
8. Test: unit tests for the logic, plus a workflow in the repo that runs the action with `uses: ./` on pull requests across the runner OSes it supports. Run local tests and the build.
9. Write a README with usage, inputs, outputs, permissions and a pinned example, and list release steps: semver tag, move the major tag, GitHub release notes. Do not create tags or releases yourself without confirmation.
</task>

<constraints>
- Never place inputs, event data or secrets directly inside `run:` script text.
- Do not request broader token permissions than the action needs.
- Do not push tags, create releases or publish to the Marketplace without the user's confirmation.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Action type and why, inputs, outputs, required permissions.

## Changes
One line per file: `path`, what changed.

## action.yml
The full file in a code block.

## Tests
One line per test, including the self-test workflow.

## Release steps
Numbered steps for the user.

## Verification
Commands run and their real results.
</output_format>
