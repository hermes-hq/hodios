---
schema: 1
id: write-release-process-doc
kind: prompt
title: Write the release process doc
description: Writes RELEASING.md from a repository's real release setup, with preconditions, versioning, exact commands, what CI does, checks after publishing, rollback, hotfixes and who can release.
category: docs
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [maintainer, devops-engineer, tech-lead]
stack: []
requires: [repo-read, file-write]
inputs: [repo, notes]
output: [docs, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [releasing-guide, release-checklist, versioning, rollback, bus-factor]
pairs_with:
  prompts: [automate-release-versioning, write-changelog, write-release-notes]
args:
  - name: notes
    description: Steps done by hand that the repo does not show, such as who approves, manual checks, announcement channels or registry accounts.
    type: text
output_contract:
  format: markdown
  sections: [Steps found, Manual steps, TODOs, Risks noticed]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Release knowledge usually lives in one maintainer's head and a few CI files. RELEASING.md exists so the second person can cut a release, and so the first person stops forgetting a step. It has to say what must be true before starting (green main branch, permissions, registry login and two-factor setup), how the version number is chosen, the exact commands in order, which steps CI does after a tag or release and which are manual, how to check the published result, and how to undo a bad release. Undoing differs by registry. Version numbers usually cannot be reused once published. npm allows unpublish only within a short window and otherwise relies on deprecate. PyPI and crates.io support yanking, and container tags can be moved but are cached. A doc that skips rollback leaves people improvising during the worst moment.
</context>

<task>
Write RELEASING.md for this repository.
{{#notes}}
Notes from the maintainers: {{notes}}
{{/notes}}

1. Read the CI workflows triggered by tags, releases or manual dispatch, the version source (manifest files, version constants, git tags), release scripts and Makefile targets, changelog tooling, publish configuration for each registry, protected environments and CODEOWNERS.
2. Reconstruct the release from start to end. For each step record whether it is manual or automated, the exact command or button, and the file it comes from.
3. Write the doc: who can release (from protected environments, CODEOWNERS or the notes), preconditions, choosing the version (the scheme the repo uses), step-by-step commands, what CI then does, verification after publishing (install the published package from the registry in a clean environment, check the release page and docs), rollback per registry, the hotfix path from an older version, and announcing.
4. Add a short checklist version at the top for people who have done it before.
5. If an existing release doc disagrees with CI, follow CI and report the conflict.
</task>

<constraints>
- Never run release, tag, publish or push commands, even to test the steps.
- Commands come from the repo or the notes. Use `TODO(maintainer): ...` for anything you cannot confirm.
- Name secrets and tokens by their variable name only; never include values.
- Describe rollback as what the registry allows; do not promise that a published version can be deleted.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
Write RELEASING.md (or update the existing release doc). Then reply with:
## Steps found
Numbered list of the release steps with their source file.
## Manual steps
The steps a person must do by hand.
## TODOs
Every `TODO(maintainer)` left, as a checklist.
## Risks noticed
Single points of failure, missing checks or steps with no rollback. Or "None".
</output_format>
