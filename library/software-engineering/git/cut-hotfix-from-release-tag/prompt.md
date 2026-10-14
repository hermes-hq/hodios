---
schema: 1
id: cut-hotfix-from-release-tag
kind: prompt
title: Cut a hotfix from a release tag
description: Cuts a hotfix branch from the deployed release tag when main has moved on, ships a patch release with only the fix, and brings the fix back to main without losing it.
category: git
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [software-engineer, devops-engineer, tech-lead]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [plan, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [hotfix, patch-release, release-tag, forward-port]
pairs_with:
  prompts: [backport-fix-to-release-branches, review-emergency-hotfix, check-which-releases-contain-fix, write-changelog]
args:
  - name: incident
    description: What is broken in production, the version or tag deployed there, and whether the fix already exists on main (commit or PR) or still has to be written.
    type: text
    required: true
  - name: release_process
    description: How releases are normally made, for example "tag vX.Y.Z on main triggers deploy" or "release branches release/X.Y", and the versioning scheme.
    type: text
output_contract:
  format: markdown
  sections: [Starting point, Hotfix branch, Release, Back to main, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
When production runs v2.4.1 and main already holds weeks of unreleased work, fixing on main and releasing from it ships everything else too, in the middle of an incident. The safe route is to branch from exactly what is deployed, which is the release tag, apply only the fix, release a patch version, and then make sure the fix also lands on main. Teams get this wrong in predictable ways: branching from main or from a release branch that has moved past the tag; confusing what is deployed with what is tagged (verify the deployed commit, not the latest tag); cherry-picking a fix that depends on refactors only on main; forgetting the version bump or changelog; and, most often, never bringing the fix back, so the next regular release reintroduces the bug. Using `cherry-pick -x` records where a commit came from, which later makes "is the fix in this release?" answerable.
</context>

<task>
<incident>
{{incident}}
</incident>
{{#release_process}}
Release process: {{release_process}}
{{/release_process}}

1. Confirm what is deployed: the tag, and if possible the commit the running service reports. If the deployed commit differs from the tag, stop and resolve that first. `git fetch --tags` and `git log -1 <tag>`.
2. Create the hotfix branch from the tag: `git switch -c hotfix/<version> <tag>`.
3. Get the fix onto it. If it exists on main, `git cherry-pick -x <sha>` and check for dependencies on code that only exists on main (compile and read the diff); if it conflicts, adapt it minimally and say what differs. If it does not exist yet, write the smallest fix on the hotfix branch, with a test that fails without it.
4. Bump the patch version where the project keeps it and add a changelog entry following the existing format.
5. Run the build and the full test suite on the hotfix branch.
6. Show the commands to push the branch and create the tag (for example `git tag -a v2.4.2 -m ...`), following the release process, and wait for confirmation. Note which CI job deploys it.
7. Bring the fix back to main: if it was written on the hotfix branch, cherry-pick it with `-x` to main or open a pull request from the hotfix branch to main, whichever matches the team's process; skip version-file conflicts by keeping main's version. If the release process uses release branches, also merge to the current release branch.
8. Verify: `git tag --contains <fix-sha>` or `git log --grep "cherry picked from"` shows the fix in the new tag and on main.
</task>

<constraints>
- Do not branch from main or a moving branch when a tag for the deployed version exists.
- Include nothing in the hotfix besides the fix, its test, the version bump and the changelog.
- Show tag and push commands and wait for confirmation; never move or delete an existing release tag.
- If deploys are not from tags or the deployed version is unknown, ask before acting.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Starting point
Deployed version and commit, and how it was confirmed.
## Hotfix branch
Commands and the fix applied, with any adaptation explained.
## Release
Version, changelog entry, tests run, tag and push commands.
## Back to main
How the fix reaches main and any other branch.
## Check
Evidence the fix is in the new tag and on main.
</output_format>
