---
schema: 1
id: build-old-release-from-history
kind: prompt
title: Build an old release from history
description: Rebuilds an old tagged release so it matches what shipped, recovering its toolchain, locked dependencies and submodules for a patch, a bisect or an investigation.
category: git
version: 1.0.0
status: incubating
stage: [maintain, operate]
role: [software-engineer, maintainer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [old-release, reproducible-build, toolchain-pinning, legacy-build]
pairs_with:
  prompts: [cut-hotfix-from-release-tag, bisect-regression, set-up-git-worktrees, fix-git-submodule-problems]
args:
  - name: release
    description: The tag or version to rebuild, why (patch, reproduce a customer bug, bisect), and how old it is, for example "v3.2.0 from 2022, a customer still runs it".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Release, Environment, Build, Differences, Make it easier next time]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Checking out an old tag gives the old source but not the old build. Builds of a two-year-old release usually fail for reasons outside the code: the language runtime and build tool have moved on, dependency ranges now resolve to newer incompatible versions when no lockfile was committed, registries have removed or yanked packages, base images have changed under the same tag, submodules point at commits that were force-pushed away, and CI configuration describes an environment that no longer exists. The fastest reliable approach reads the environment from the tag itself (version files such as `.nvmrc`, `.tool-versions`, `rust-toolchain.toml`, `go.mod`, the CI file and Dockerfile at that tag), builds in an isolated worktree or container with those exact versions, installs dependencies strictly from the lockfile, and compares the output with the shipped artifact where one exists. Doing this in a separate worktree keeps the current checkout untouched.
</context>

<task>
<release>
{{release}}
</release>

1. Create an isolated checkout: `git worktree add ../build-<tag> <tag>` (or a fresh clone), then `git submodule update --init --recursive` inside it. Report any submodule commit that no longer exists on its remote.
2. Read the environment from the tag: runtime and tool version files, the manifest's engine or toolchain fields, the CI config and Dockerfile at that tag, and the README build instructions. List the exact versions it expects.
3. Choose the isolation: a container image of the matching runtime version pinned by digest if possible, or a version manager on the host. Explain the choice.
4. Install dependencies strictly from the lockfile (`npm ci`, `pip install` with hashes or a lock, `cargo build --locked`, `go mod download` with the existing sums). If there is no lockfile, say that dependency versions cannot be recovered exactly, and constrain them to the latest versions published before the tag date where the ecosystem allows it.
5. Build with the release's own command. For each failure, find whether the cause is the environment, a vanished dependency or the code, and fix the environment first; never change the release's code to make it build unless the user agrees.
6. If a shipped artifact or checksum exists, compare it with the rebuild and explain differences (timestamps, paths, compiler version).
7. Suggest what to commit so the next rebuild is easier, such as a pinned toolchain file or a build container definition, on the release branch only if the user wants it.
</task>

<constraints>
- Do not modify the current working tree or rewrite the tag; work in the worktree or clone.
- Record every version and substitution used, so the rebuild can be repeated.
- If a dependency is gone from every registry, stop and report it rather than substituting a different package silently.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Release
Tag, commit, date and submodule state.
## Environment
Table: tool, version expected, version used, source of the version.
## Build
Commands run, failures and how each was fixed.
## Differences
Comparison with the shipped artifact, if available.
## Make it easier next time
One or two concrete suggestions.
</output_format>
