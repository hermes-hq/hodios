---
schema: 1
id: upgrade-python-version
kind: prompt
title: Upgrade a project to a newer Python version
description: Moves a Python project to a newer Python release, fixing removed modules and deprecations, checking wheel availability for every dependency, and updating lockfiles, Docker images and CI.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, data-engineer, ml-engineer]
stack: [python]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [deprecations, wheels, requires-python, end-of-life]
pairs_with:
  prompts: [runtime-upgrade-track, modernize-python-packaging, fix-breakage-after-dependency-upgrade]
args:
  - name: target_version
    description: The Python version to move to, for example "3.13".
    type: string
    required: true
  - name: notes
    description: "Current Python version, how dependencies are managed (pip, Poetry, uv, conda), native or scientific packages in use, Docker base images, CI and where it runs in production."
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Blockers, Changes made, Verification, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Python minor releases are not small. Each one removes things deprecated two releases earlier, and the real blocker is usually a dependency, not your code. What experienced people know: 3.10 removed the `collections` ABC aliases (`collections.Mapping`); 3.11 removed `asyncio.coroutine`; 3.12 removed `distutils`, `imp`, `asynchat` and `asyncore`, and new virtual environments no longer include `setuptools`, which breaks builds that relied on it silently; 3.13 removed the "dead batteries" (`cgi`, `crypt`, `telnetlib`, `pipes`, `imghdr`, `audioop` and others) and `lib2to3`; 3.14 changed the default `multiprocessing` start method on Linux from `fork` to `forkserver`, which breaks code that relied on inherited globals. `datetime.utcnow()` and many other calls emit `DeprecationWarning` before removal, and those warnings are hidden by default outside tests. Packages with C extensions need wheels built for the new version (`cp313` tags); when none exist, pip falls back to a source build that fails on machines without compilers, or pulls an old release that happens to build. Lockfiles carry version markers, so they must be regenerated, not edited. Free-threaded builds (`3.13t` and later) are a separate interpreter build whose support status changes between releases; they are not part of a normal upgrade. The "What's New" page of every version you skip lists the removals; read all of them, not just the target's.
</context>

<task>
Upgrade this project to Python {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Find every place the version is set: `requires-python` and classifiers in `pyproject.toml`, `.python-version` (read by pyenv and uv), `runtime.txt`, tox or nox config, Dockerfiles, CI matrices, mypy and ruff `target-version`, and deployment config. List the versions you are skipping.
2. Check dependencies before code: for each direct dependency, find the first release that supports the target (classifiers, release notes, wheels for the target on the package index). List packages that need an upgrade first and any with no support yet; stop and ask for a decision on those.
3. Create an environment on the target version, regenerate the lockfile with the project's tool, and install. Record every source build or failed build.
4. Run the test suite with deprecations turned into errors for your own code (`-W error::DeprecationWarning` scoped with filters so third-party warnings are reported but do not block). Search the code for imports of removed modules and removed APIs from each skipped version's "What's New".
5. Fix findings in small commits: replace removed modules with their documented successors, add explicit build dependencies such as `setuptools` where a build relied on it, and apply syntax upgrades only with the linter's target set to the oldest version you still support.
6. Keep CI running on both the current and the target version until production has moved, then drop the old one.
7. Update Docker base images, CI and docs; raise the `requires-python` lower bound only when the old version is retired. Propose a rollout through staging with error and warning monitoring.
</task>

<constraints>
- Do not silence warnings globally or pin a package to an old, unsupported release just to make the install pass; report it as a blocker.
- Do not raise `requires-python` for a published library without the user's decision; it drops users on older versions.
- Do not edit lockfiles by hand; regenerate them with the project's own tool.
- Name the exact module, API or package behind every fix; do not guess at removals you have not confirmed in the release notes or a failing run.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Starting point
Current version, versions skipped, where the version is pinned.
## Blockers
Table: package or API, problem on the target, fix or decision needed.
## Changes made
Code fixes, dependency upgrades, config and image changes.
## Verification
Test results on both versions, deprecation counts before and after, build warnings.
## Rollout
Order of environments, what to monitor, how to roll back.
</output_format>
