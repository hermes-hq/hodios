---
schema: 1
id: switch-python-project-to-uv
kind: prompt
title: Switch a Python project to uv
description: Moves a Python project from pip, pip-tools, Poetry or Pipenv to uv with a lockfile, pinned Python, dependency groups, private indexes, Docker and CI caching, keeping resolved versions the same.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, data-engineer, ml-engineer, maintainer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, config, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [uv, lockfile, dependency-management, python-tooling]
pairs_with:
  prompts: [modernize-python-packaging, migrate-python-linting-to-ruff]
args:
  - name: notes
    description: "Current tool (pip with requirements files, pip-tools, Poetry, Pipenv), application or library, private package indexes, Docker, CI system, platforms the team uses."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Mapping, Changes made, Version parity, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
uv replaces several tools at once (installer, resolver, virtual environment manager, Python version manager, lockfile), so a switch touches more files than it seems. What experienced people know: the main risk is an unintended upgrade when the new lock is resolved, so compare installed versions before and after and seed constraints from the old lock when needed. Poetry's caret and tilde constraints (`^1.2`) must be translated to standard specifiers (`>=1.2,<2`), and Poetry dev groups map to standard `[dependency-groups]`; a community migration tool can do the conversion but needs review. pip-tools users can keep requirements files through uv's pip-compatible interface, or move to a project with `uv.lock`; these are different end states. The uv lockfile is universal across platforms, which can surface resolution conflicts that a platform-specific lock hid. CI should install with the lock enforced (`--locked` fails when the lock is stale, `--frozen` skips the check), pin the Python version in `.python-version` and `requires-python`, and cache uv's cache directory. Private indexes are declared in `pyproject.toml` with credentials from environment variables. Libraries should keep loose dependency ranges; the lock is for development. Teams that ship requirements files to others can export them from the lock.
</context>

<task>
Switch this project to uv.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the current setup: `pyproject.toml`, requirements files, lockfiles, tool config, the Python version used locally, in CI and in Docker, private index settings, and scripts or docs that call the old tool.
2. Record the baseline: install from the current lock, save the full list of installed packages and versions, and run the tests.
3. Decide the end state with the user: uv project with `uv.lock`, or uv's pip interface with compiled requirements files.
4. Convert: dependencies and constraints to standard specifiers, dev and optional groups, `requires-python` and `.python-version`, scripts and entry points, private indexes with credentials from the environment, and the build backend if the project is packaged.
5. Lock, sync, and compare installed versions with the baseline. Explain every difference in a direct dependency and pin back where needed.
6. Update CI (install uv, enforce the lock, cache), Dockerfiles (copy uv, install from the lock without dev groups, keep layer caching), Makefiles or task runners, pre-commit hooks, and contributor docs.
7. Run tests and a production-like start from the Docker image. Remove old lockfiles and tool config only after both pass.
</task>

<constraints>
- Do not let the switch upgrade dependencies silently; version changes are listed and approved.
- Never write index credentials into `pyproject.toml`, `uv.toml` or the repo.
- Do not tighten a library's published dependency ranges to match the lock.
- Keep commands contributors use working, or document their replacements in the same change.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current tool, files, Python versions, indexes, CI and Docker.
## Mapping
Table: old setting or command, uv equivalent.
## Changes made
Files added, changed and removed.
## Version parity
Direct dependency differences and reasons.
## Verification
Tests, CI run, Docker build and start.
</output_format>
