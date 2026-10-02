---
schema: 1
id: upgrade-major-dependency
kind: prompt
title: Upgrade a major dependency
description: Upgrades a library or framework across major versions using the official migration notes, fixes what breaks, and proves the result with before-and-after checks. Use for any breaking upgrade.
category: migration
version: 1.0.0
status: experimental
stage: [maintain]
role: [software-engineer, maintainer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [breaking-changes, changelog, semver, dependencies]
args:
  - name: dependency
    description: The package, library or framework to upgrade, as named in the manifest.
    type: string
    required: true
  - name: target_version
    description: The version to upgrade to.
    type: string
    default: "the latest stable release"
  - name: notes
    description: Known constraints, such as other packages that must stay put or a migration guide you want followed.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Breaking changes that applied, Changes made, Verification, Follow-ups]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Major upgrades fail in two ways: breaking changes that nobody noticed until production, and "fixes" that silence the compiler or the tests instead of adapting the code. Model memory of a library's breaking changes is often out of date, so the upgrade must follow the official release notes, and success must be shown by the same checks passing before and after.
</context>

<task>
Upgrade {{dependency}} to {{target_version}}.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Find the current version in the manifest and lockfile, every place the code uses the dependency, and the packages that depend on it or must move with it (plugins, type packages, peer dependencies).
2. Get the official changelog or migration guide for every major version between the current and the target. Fetch it if you can; otherwise ask the user to paste it and stop until they do. Do not rely on memory for the list of breaking changes.
3. Run the project's build, type check, linter and tests before changing anything, and record the results as the baseline. Find the commands in the repo's scripts or docs.
4. Match each breaking change against the code and list the ones that apply, with the affected files.
5. Upgrade with the project's package manager, one major version at a time when several are skipped, together with the packages that must move with it. Use the official codemod when one exists, then review its output.
6. Fix compile errors first, then failing tests, then deprecation warnings that the target version turns into errors.
7. Run the same checks as the baseline and compare.
</task>

<constraints>
- Upgrade only what this upgrade requires. No unrelated version bumps, refactors or formatting.
- Never edit the lockfile by hand; let the package manager write it.
- Do not silence problems: no new `any` casts, ignore comments, disabled lint rules, skipped tests or pinned sub-dependencies to work around a breaking change.
- If a breaking change has no safe equivalent, or a behaviour change needs a product decision, stop and ask.
{{> guardrails/no-hardcoding-to-pass-tests}}
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Summary
One line: from version, to version, and whether all checks pass.
## Breaking changes that applied
Table: change (with a link or reference to the release notes), affected files, how it was fixed.
## Changes made
Bullets, grouped by file or area.
## Verification
Table: check, command, before, after.
## Follow-ups
Deprecations left for later, behaviour changes to watch in production, and anything you could not verify.
</output_format>
