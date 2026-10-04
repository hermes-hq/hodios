---
schema: 1
id: modernize-python-packaging
kind: prompt
title: Modernise Python packaging
description: Moves a Python project from setup.py, requirements files or ad hoc scripts to pyproject.toml with a build backend, locked dependencies, entry points and CI, keeping existing install commands working.
category: migration
version: 1.0.0
status: incubating
stage: [maintain, build]
role: [maintainer, software-engineer, researcher]
stack: [python]
requires: [none]
inputs: [config, file]
output: [config, plan, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [pyproject-toml, build-backend, lockfile, entry-points, src-layout, reproducibility]
pairs_with:
  prompts: [upgrade-major-dependency]
  workflows: [dependency-update-sweep-track]
args:
  - name: current_files
    description: The current packaging files as they are (setup.py, setup.cfg, requirements*.txt, MANIFEST.in, tox.ini, Makefile, CI config) plus the folder layout. Say if it is a library published to an index, an application, or research code.
    type: text
    required: true
  - name: tooling_preference
    description: Build backend or tool preference (for example "setuptools", "hatchling", "uv", "Poetry", "pip-tools"), or "simplest standard option".
    type: string
    default: simplest standard option
output_contract:
  format: markdown
  sections: [What this project is, pyproject.toml, Dependencies and locking, Commands before and after, CI changes, Verification, Follow-ups]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Python maintainer or researcher has an older project and wants standard packaging in `pyproject.toml`. The standards are settled (project metadata in `[project]`, a declared `[build-system]`), but migrations still break things: package data files silently missing from the wheel, console scripts lost, dynamic version logic dropped, optional extras renamed, the difference between a library's loose dependency ranges and an application's locked versions ignored, and contributors' muscle memory (`pip install -e .`, `python setup.py test`) broken without notice. A good migration produces an equivalent wheel and sdist, locks only what should be locked, and keeps old commands working or explains the replacement.

Tooling preference: {{tooling_preference}}
</context>

<task>
<current_files>
{{current_files}}
</current_files>

1. Decide what the project is: a library (published, consumed by others), an application or service (deployed), or research or analysis code (run by people, needs reproducibility). This sets the dependency rules.
2. Write `pyproject.toml`: `[build-system]` for the chosen backend (setuptools stays a valid choice when the project has C extensions or complex build steps); `[project]` with name, version (static or dynamic from the existing source of truth), description, readme, `requires-python` from what CI actually tests, license, authors, classifiers, dependencies, `optional-dependencies` mapped from extras, and `scripts` mapped from `entry_points` console scripts. Move tool configs (pytest, coverage, linters, type checker) into `[tool.*]` where they support it.
3. Package discovery and data: keep or propose a `src/` layout and say why; carry over package data and `MANIFEST.in` rules so non-Python files reach the wheel.
4. Dependencies: libraries keep compatible ranges (lower bounds you test, upper bounds only for known breakage) and never ship a lockfile as their install requirement; applications and research code get a lockfile with hashes from the chosen tool, and requirements files are generated from it if deployment still needs them. Development dependencies go in a dependency group or extra.
5. Commands before and after: map each old command (`python setup.py install`, `develop`, `sdist`, `test`, `pip install -r requirements.txt`) to the new one.
6. CI: build the sdist and wheel, install the wheel in a clean environment and run the tests against it, cache by lockfile, and keep the Python version matrix.
7. Verification: compare the old and new wheel contents (file list and metadata), check console scripts run, and check `pip install -e .` works.
</task>

<constraints>
- Do not invent dependencies, versions or metadata; carry over what is in the files and mark unknowns as [X].
- Do not change the import package name or public API.
- Do not state tool flags you are unsure of as fact; mark them to verify in the tool's docs.
- Keep `setup.py` only if it still does something `pyproject.toml` cannot (for example a compiled extension), and say why.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## What this project is
One or two lines, and the dependency rule that follows.

## pyproject.toml
The complete file in one code block.

## Dependencies and locking
Bullets: ranges or lock, the lock command, development dependencies.

## Commands before and after
Table: old command | new command | note.

## CI changes
The changed CI steps in a code block.

## Verification
Checklist with commands.

## Follow-ups
Files to delete, docs to update, things to confirm.
</output_format>
