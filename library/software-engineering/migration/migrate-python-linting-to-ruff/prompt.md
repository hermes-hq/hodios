---
schema: 1
id: migrate-python-linting-to-ruff
kind: prompt
title: Migrate Python linting and formatting to Ruff
description: Replaces Flake8, isort, Black, pyupgrade and parts of pylint with Ruff, mapping rules, plugins and per-file ignores to keep the same checks without a flood of unrelated changes.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, data-engineer, maintainer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [config, diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ruff, flake8, linting, formatting, python-tooling]
pairs_with:
  prompts: [fix-lint-violations-repo-wide, switch-python-project-to-uv]
args:
  - name: notes
    description: "Current tools and their config files, Flake8 plugins, pre-commit hooks, CI steps, editor setup, whether formatting should move too."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Rule mapping, Changes made, Rule parity, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ruff can replace Flake8 and many of its plugins, isort, pyupgrade and Black (through `ruff format`), but a careless switch either loses checks or reformats half the codebase. What experienced people know: Ruff's default rule selection is small (core pyflakes and a subset of pycodestyle), so matching the old setup means selecting rule prefixes explicitly (for example `E`, `W`, `F`, `I` for isort, `B` for bugbear, `UP` for pyupgrade); Flake8 plugin codes mostly keep their names, so existing `# noqa` comments usually still work; some plugins and much of pylint are not implemented, and that loss should be listed, not hidden. isort settings like known first-party packages and profile options map to Ruff's isort settings; getting them wrong reorders imports in every file. The Ruff formatter aims for near-identical output to Black but is not byte-identical, so expect a small diff; magic trailing commas and line length must match. Per-file ignores and excludes need translating (Ruff respects `.gitignore` by default). A big mechanical diff is best landed as a single formatting commit added to `.git-blame-ignore-revs`. Pre-commit hooks, CI steps and editor settings must all switch together, or developers fight the CI.
</context>

<task>
Move this project's Python linting (and formatting, if wanted) to Ruff.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Find every lint and format config: `setup.cfg`, `tox.ini`, `.flake8`, `pyproject.toml` sections, `.isort.cfg`, `.pylintrc`, pre-commit config, CI steps, Makefiles and editor settings. List Flake8 plugins and enabled pylint checks.
2. Record the baseline: run each current tool and save its violations by rule code, and confirm the code is clean under the current formatter.
3. Build the rule mapping: each current tool and plugin to Ruff rule prefixes, settings (line length, target Python version, isort options, max complexity), per-file ignores and excludes. List anything Ruff does not implement and ask whether to keep that tool or accept the loss.
4. Write the Ruff config in `pyproject.toml` (or `ruff.toml` if the project prefers), then run `ruff check` and compare violations by code with the baseline. Explain every difference and adjust the config, not the code, to reach parity.
5. If formatting moves too, run `ruff format`, review the diff size and nature, and land it as its own commit listed in `.git-blame-ignore-revs`.
6. Switch pre-commit hooks, CI steps and editor recommendations together, and remove the old tools and their config.
7. Run the lint, format check and tests in CI.
</task>

<constraints>
- Do not turn on new rule families during the migration; parity first, new rules as a separate change.
- Do not auto-fix violations as part of the switch; the only code change allowed is the formatting commit.
- Do not silently drop checks Ruff lacks; list them for a decision.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Tools, plugins, configs, hooks and CI steps found; baseline counts.
## Rule mapping
Table: old tool or plugin, Ruff rules or setting, not supported.
## Changes made
New config, removed files, hooks and CI updated, formatting commit.
## Rule parity
Violations by code before and after, differences explained.
## Verification
Lint, format check and test results in CI.
</output_format>
