---
schema: 1
id: publish-python-package-to-pypi
kind: prompt
title: Publish a Python package to PyPI
description: Gets a Python package ready for its first PyPI release with complete pyproject.toml metadata, a build backend, checked wheels and sdist, a TestPyPI dry run and trusted publishing.
category: open-source
version: 1.0.0
status: incubating
stage: [ship]
role: [software-engineer, maintainer, data-scientist]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [pypi, pyproject, wheels, testpypi, trusted-publishing, package-publishing]
pairs_with:
  prompts: [publish-package-from-ci, modernize-python-packaging, write-changelog]
args:
  - name: package
    description: The distribution name you want, the import name, how the code is laid out (src layout or flat), any compiled extensions, supported Python versions, and how you build today if at all.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Name, pyproject.toml changes, Build and check, Clean install test, Publishing steps, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
PyPI does not let a file be replaced once uploaded, and a deleted version number cannot be reused, so first uploads should be rehearsed. Common first-release faults: the distribution name differs from the import name in a way that confuses users, or is too similar to an existing package; `requires-python` is missing so old interpreters install it and fail; dependencies are pinned exactly (fine for apps, harmful for libraries); the README is not declared, so the project page is blank; a flat layout lets tests pass against the source tree while the built wheel is missing modules or data files; and the sdist leaves out files needed to build. A modern setup declares everything in `pyproject.toml` with a build backend (hatchling, setuptools, flit-core, pdm-backend, or maturin for Rust extensions), builds with `python -m build`, checks with `twine check`, uploads to TestPyPI first, and then publishes from CI using trusted publishing so no API token is stored. Packages with compiled extensions need wheels per platform, usually built in CI.

{{> guardrails/investigate-before-answering}}

Package:
<package>
{{package}}
</package>
</context>

<task>
1. Name: check the distribution name on PyPI (say how), and flag names close to popular packages. Note the normalised form and how it relates to the import name.
2. Read the existing packaging files and layout. Write or fix `pyproject.toml`: `[build-system]`, `name`, `version` (static or from the VCS, chosen deliberately), `description`, `readme`, `requires-python`, `license` as an SPDX expression where the backend supports it, `authors`, `classifiers`, `dependencies` with ranges not exact pins, optional extras, `[project.urls]`, and `[project.scripts]` for CLIs. Include package data and typed markers (`py.typed`) if relevant.
3. Build and check: run `python -m build`, `twine check dist/*`, and list the contents of the wheel and sdist; fix missing modules, data files or stray files.
4. Clean install test: install the built wheel into a fresh virtual environment outside the source tree, import it and run a smoke test or the CLI, ideally on the lowest supported Python.
5. Publishing steps: upload to TestPyPI and install from there, then the real upload; set up a trusted publisher for the CI workflow so later releases need no token; mention wheels per platform if there are compiled extensions.
</task>

<constraints>
- Do not run uploads to PyPI or TestPyPI; give the commands for the user to run.
- Do not pin library dependencies to exact versions unless the user insists, and say why ranges are used.
- Never store API tokens in the repository or in pyproject.toml.
- Do not invent classifiers; use only standard trove classifiers and tell the user to check the list.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. pyproject.toml changes as a diff or full file. Build and check as the file listing of each artefact. Publishing steps as exact commands in a fenced block. Verified lists commands run and their results.
</output_format>
