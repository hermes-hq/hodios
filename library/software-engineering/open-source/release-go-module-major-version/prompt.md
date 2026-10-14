---
schema: 1
id: release-go-module-major-version
kind: prompt
title: Release a Go module's next major version
description: Releases a Go module as v2 or later, choosing the major-subdirectory or major-branch layout, changing the module path and imports, tagging correctly and telling importers how to upgrade.
category: open-source
version: 1.0.0
status: incubating
stage: [ship, maintain]
role: [maintainer, software-engineer]
stack: [go]
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [diff, checklist, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [go-modules, semantic-import-versioning, major-release, module-path, breaking-changes]
pairs_with:
  prompts: [plan-breaking-major-release, write-migration-guide, write-versioning-policy]
args:
  - name: module
    description: The module path, its current latest version, the breaking changes going into the new major, and whether the old major will still get fixes.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Layout choice, Changes made, Tagging, Importer guide, Old major, Verified]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Go treats a new major version as a different module. From v2 on, the module path in go.mod must end in the major suffix (`/v2`), every import inside the module must use that path, and the tag must be `v2.0.0` on a commit whose go.mod declares it. The common mistakes: tagging `v2.0.0` without changing the module path, so the go command reports the version as `+incompatible` or refuses it; forgetting to update internal imports, so v2 code silently imports v1 packages; or changing the path in a way the proxy has already cached. There are two layouts. Major branch: change go.mod on a branch or on main and keep tags on it, which is simpler and most common now. Major subdirectory: copy the code into a `v2/` folder, which keeps v1 and v2 buildable from one branch and works with older tooling, at the cost of duplication. Tags are immutable in the module proxy and checksum database, so a bad tag cannot be fixed by retagging; it must be retracted and replaced with a new version. Modules in subdirectories of a repository use prefixed tags (`sub/v2.0.0`).

{{> guardrails/investigate-before-answering}}

Module:
<module>
{{module}}
</module>
</context>

<task>
1. Read go.mod, the existing tags, directory layout (single module or several), CI config and any tools that embed the module path (code generators, docs, examples).
2. Recommend the major-branch or major-subdirectory layout for this repository with the reason.
3. Make the changes: update the module path in go.mod with the `/vN` suffix, rewrite every import of the module's own packages to the new path, update generated code, examples, docs and badges, and keep the breaking changes themselves in focused commits.
4. Run `go build ./...`, `go vet ./...` and the tests, then check that no file still imports the old path.
5. Tagging: give the exact tag name (with the subdirectory prefix if needed), say to tag a pre-release such as `vN.0.0-rc.1` first and test it from a clean consumer project, and how to fix a mistake with a `retract` directive and a new version rather than moving a tag.
6. Importer guide: the `go get` command, the import path change, how to migrate imports across a codebase, and the main breaking changes.
7. Old major: how v1 fixes are released from a branch, and whether to add a deprecation comment to the v1 go.mod.
</task>

<constraints>
- Do not push tags or branches, and do not delete or move existing tags; give the commands and let the user run them.
- Do not mix unrelated refactors into the module path change.
- If the repository holds several modules, change only the one named and say which others import it.
- Do not claim a version is published or fetchable from the proxy; you can only verify local builds.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
Use the contract's section headings in order. Changes made as a list of files with one line each. Tagging as exact commands in a fenced block. Importer guide in a fenced markdown block ready for the release notes. Verified lists commands run and results.
</output_format>
