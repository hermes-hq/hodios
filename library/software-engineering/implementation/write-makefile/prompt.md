---
schema: 1
id: write-makefile
kind: prompt
title: Write a Makefile or justfile for project tasks
description: Writes a Makefile or justfile for a project's common tasks with self-documenting help, phony targets, overridable variables, real file dependencies and wrappers around existing scripts.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, devops-engineer, maintainer]
requires: [repo-read, file-write, shell]
inputs: [repo, spec]
output: [code, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [gnu-make, justfile, task-runner, developer-experience, build-automation]
args:
  - name: tasks
    description: Tasks people run, for example "setup, dev server, test, lint, format, db migrate, docker build". Leave empty to derive them from the repo.
    type: text
  - name: tool
    description: Which task runner to write.
    type: enum
    enum: [make, just, decide]
    default: decide
output_contract:
  format: markdown
  sections: [Choice, File, Targets, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A task file is the front door to a repo, and small mistakes make it fail on someone else's machine. In Make, recipe lines must start with a tab; every line runs in a new shell, so `cd dir` on one line does not affect the next; targets that are not files need `.PHONY` or they silently stop running once a file of that name exists; `=` versus `:=` changes when a variable is evaluated; and `$` must be written `$$` for the shell. Make is not installed by default on Windows. A justfile avoids most of these but needs `just` installed. Task files also drift when they duplicate commands already in `package.json` scripts, `pyproject.toml` or CI.
</context>

<task>
Write a task file for this repo.

{{#tasks}}
Tasks: {{tasks}}
{{/tasks}}
Tool: {{tool}}

1. Read the repo: README setup steps, package manager scripts, CI workflow commands, Dockerfile and compose files, existing Makefile or justfile, and contributors' platforms if documented.
2. If tool is "decide", pick Make when it is already used or files are actually built from sources (real dependency tracking), and just when the file is only a command menu and contributors use Windows or prefer simpler syntax. State why.
3. List the tasks: from the input, or derived from what README and CI actually run. Each target wraps the existing command (for example `npm run test`) rather than copying its flags, so there is one source of truth.
4. Make: start with `SHELL := bash`, `.SHELLFLAGS := -eu -o pipefail -c`, `.DEFAULT_GOAL := help` and `MAKEFLAGS += --no-builtin-rules`; declare `.PHONY` for every non-file target; use `?=` for overridable variables (for example `PORT ?= 3000`); use `$(MAKE)` for recursion; join dependent shell lines with `&&` or use `.ONESHELL`; use real file targets with prerequisites where outputs are files (for example generated code from a schema).
5. just: `set shell := ["bash", "-euo", "pipefail", "-c"]` (or the Windows shell setting if needed), recipes with parameters and defaults, `set dotenv-load` only if the project uses `.env`, and a default recipe that lists recipes.
6. Self-document: a `help` target that prints each target with a one-line description (from `##` comments in Make; `just --list` with doc comments in just).
7. Guard destructive targets (clean volumes, reset database, deploy) with a confirmation prompt or a required variable such as `CONFIRM=1`, and never make them the default.
8. Run `make help` or `just --list`, then run the safe targets (lint, test, build) and report results. Do not run destructive or deploy targets.
</task>

<constraints>
- Do not duplicate long commands that already live in package scripts or CI; call them.
- Do not hard-code local paths, usernames or secrets; read secrets from the environment.
- Use tabs for Make recipe lines and say so in a comment at the top.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Choice
Make or just, and why, in two or three lines.

## File
The complete file in one code block.

## Targets
Table: Target | What it runs | Notes.

## Verification
Commands run and their real results; which targets were not run and why.
</output_format>
