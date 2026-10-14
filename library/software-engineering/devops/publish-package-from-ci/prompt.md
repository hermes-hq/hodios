---
schema: 1
id: publish-package-from-ci
kind: prompt
title: Publish a package from CI
description: Writes a tag-triggered pipeline that builds, tests and publishes a library to npm, PyPI, crates.io or Maven Central, using trusted publishing where possible and a version check first.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [devops-engineer, maintainer, software-engineer]
stack: [github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [package-publishing, trusted-publishing, npm, pypi, release-automation]
pairs_with:
  prompts: [automate-release-versioning, sign-release-artifacts, write-github-actions-workflow]
args:
  - name: package
    description: The package, its ecosystem and registry, and how releases are made today (by hand from a laptop, tags, a release button).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Flow, Config, Registry setup, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Publishing from a laptop leaks in predictable ways: unbuilt or stale files go out, a local `.env` ends up in the tarball, the version in the manifest does not match the tag, and a long-lived registry token sits in a dotfile. Publishing from CI fixes that if the pipeline is careful: it triggers on a version tag or a release, checks that the tag equals the manifest version, builds once in a clean job, inspects what will be published, and uploads with short-lived credentials. npm, PyPI and crates.io support trusted publishing through the CI provider's OIDC identity, which removes stored tokens entirely; npm can also add provenance. Maven Central still needs a signing key and a token. A published version can never be replaced, so the dry run matters.
</context>

<task>
Write the CI pipeline that publishes this package:
<package>
{{package}}
</package>

1. Read the manifest (`package.json`, `pyproject.toml`, `Cargo.toml`, `pom.xml` or `build.gradle`), build scripts, files allow-lists (`files`, `MANIFEST.in`, `include`), and existing CI. Note how the version is set.
2. Trigger on a version tag (`v*`) or a published release, not on every push to main.
3. Job 1, build and test: run the test suite, build the distributable once, check that the tag matches the manifest version and fail clearly if not, and list the files that will be published (`npm pack --dry-run`, `twine check` plus listing the wheel and sdist, `cargo package --list`).
4. Job 2, publish: depends on job 1, uses a protected environment that requires approval if the team wants it, downloads the built artifact (no rebuild), and publishes with trusted publishing where the registry supports it (with npm provenance where available). For Maven Central, sign with a key from secrets and use the publisher's token.
5. Handle pre-releases: publish versions like `1.2.0-rc.1` under a non-default dist-tag or as pre-releases so users do not get them by default.
6. Write the files, and run the linter for the CI provider if available.
</task>

<constraints>
- Never put registry tokens or signing keys in the repository; reference secrets by name and list them.
- Grant `id-token: write` only on the publish job.
- Do not invent registry settings; describe the trusted publisher setup step by the registry's own terms and tell the user to confirm it in the registry's settings.
- Do not change the package's version or contents as part of this change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flow
Trigger, jobs and what each checks, in a short numbered list.

## Config
The workflow path and full contents.

## Registry setup
The one-time steps on the registry (trusted publisher entry or token, environment, signing key).

## Verify
Linter output or "not run", and how to do a first release safely (a pre-release version first).

## Follow-ups
Secrets to create and old tokens to revoke after the first CI publish. "None" if empty.
</output_format>
