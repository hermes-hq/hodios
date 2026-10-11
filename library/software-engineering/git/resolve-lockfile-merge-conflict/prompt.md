---
schema: 1
id: resolve-lockfile-merge-conflict
kind: prompt
title: Resolve a lockfile merge conflict
description: Resolves conflicts in package-lock, yarn.lock, pnpm-lock, poetry.lock, Cargo.lock, Gemfile.lock and similar files by merging the manifests and regenerating the lockfile, then checks resolved versions.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, frontend-engineer, backend-engineer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo]
output: [diff, report]
risk: runs-commands
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [lockfile, merge-conflict, dependency-resolution, package-manager]
pairs_with:
  prompts: [resolve-merge-conflict, update-feature-branch-from-main]
args:
  - name: context
    description: Which operation stopped (merge, rebase, cherry-pick), which lockfile, and what each side changed in dependencies if you know.
    type: text
output_contract:
  format: markdown
  sections: [Conflict, Manifest resolution, Lockfile regenerated, Check, Next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Lockfiles are generated, so hand-merging their conflict markers produces files that look valid but pin inconsistent trees, carry wrong integrity hashes, or silently drop one side's new package. The correct method is: resolve the human-written manifest (package.json, pyproject.toml, Cargo.toml, Gemfile, go.mod) by hand, keeping both sides' dependency changes, then regenerate the lockfile from that manifest with the project's own package manager and version, starting from one side's lockfile so unrelated packages do not all float to new versions. Starting from main's lockfile (or whichever branch is being merged into) and re-running install keeps the most already-reviewed resolution. Which side that is depends on the operation: during a rebase onto main, "ours" is main; when merging a feature into main, "ours" is main; when merging main into a feature branch, main is "theirs". Some tools resolve lockfile conflicts themselves when you just run install on the conflicted file (recent npm, Yarn and pnpm can); others need the file taken from one side first. The package manager version matters: a different major version rewrites the whole file format.
</context>

<task>
Resolve the lockfile conflict in this repository.{{#context}} Context: {{context}}{{/context}}

1. Run `git status` to see the operation and every conflicted file. Identify the package manager from the lockfile name and the version the project expects (packageManager field, `.tool-versions`, CI config, engines). Check that the local tool matches; if not, stop and say which version to use.
2. Resolve the manifest first. Read both sides against the base (`git show :1:<manifest>`, `:2:`, `:3:`) and keep every dependency addition, removal and version change from both sides. If both sides changed the same dependency to different versions, take the higher compatible one only if both ranges allow it; otherwise ask.
3. Take the lockfile from main's side (`git checkout --ours <lockfile>` during a rebase onto main or a merge with main checked out; `git checkout --theirs <lockfile>` when merging main into a feature branch; state which side you took and why), then run the package manager's install that updates the lockfile without upgrading unrelated packages (for example `npm install`, `yarn install`, `pnpm install`, `poetry lock --no-update` on older Poetry or `poetry lock` on Poetry 2, `cargo update -p <changed-crate>` or `cargo generate-lockfile` only if necessary, `bundle install`, `go mod tidy`).
4. Verify: no conflict markers remain; every dependency from both sides appears in the lockfile at a version satisfying the manifest; the diff against the target branch's lockfile contains only the expected packages and their transitive dependencies. List any unexpected version changes.
5. Run the build and the tests. Stage the manifest and lockfile.
6. Report the command used and stop; let the user continue the merge or rebase.
</task>

<constraints>
- Never hand-edit conflict markers in a lockfile.
- Do not delete the lockfile and regenerate from scratch unless the user agrees; that upgrades every unpinned dependency.
- Do not run `git commit`, `merge --continue`, `rebase --continue` or any push.
- Use the project's package manager and version; never switch package managers.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Conflict
Operation, files and package manager with version.
## Manifest resolution
Dependency changes kept from each side.
## Lockfile regenerated
Command run and the starting side.
## Check
Unexpected version changes (or "None"), build and test results.
## Next
The command for the user to continue.
</output_format>
