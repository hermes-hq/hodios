---
schema: 1
id: rename-default-branch
kind: prompt
title: Rename a repository's default branch
description: Plans renaming a default branch such as master to main, covering the hosting settings, branch protection, CI, deploy triggers, scripts, open pull requests and every clone, with a checklist for after.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, devops-engineer, maintainer]
stack: [git]
requires: [none]
inputs: [text, config]
output: [plan, checklist, message]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [default-branch, branch-rename, ci-triggers, branch-protection]
pairs_with:
  prompts: [configure-branch-protection, choose-branching-strategy, write-codeowners-file]
args:
  - name: repo_context
    description: Current and new branch names, the hosting service, CI system, deploy setup, number of contributors and forks, and anything that references the branch name (badges, scripts, docs, other repos, package managers pointing at the branch).
    type: text
    required: true
---
<context>
You plan renaming a repository's default branch. The git part is trivial; the breakage is everywhere the old name is written down. Hosting services usually rename the branch for you, retarget open pull requests, and redirect web links, but they do not change CI triggers filtered by branch name, deploy pipelines watching a branch, scripts with `origin/master`, other repositories or package manifests pinned to the branch, badges and docs, webhooks and integrations, or every developer's local clone and its upstream tracking. Branch protection and rulesets keyed by name may or may not follow. Doing it in one announced window with a checklist avoids a week of broken builds.

<repo_context>
{{repo_context}}
</repo_context>
</context>

<task>
1. Inventory where the old name is used, as a checklist grouped by: hosting settings (default branch, protection or rulesets, merge settings), CI and CD configuration, deploy and release automation, scripts and tooling in the repo, documentation and badges, other repositories and dependency manifests, webhooks and third-party integrations. Give search commands to find references in the repo (for example `git grep -n "master"`) and say which hits will be false positives.
2. Recommend the order: prepare changes to CI and scripts in a pull request that accepts both names, announce, rename on the hosting service, update protection, merge the prepared changes, then remove the old name.
3. Describe what the hosting service does automatically, and note the user should confirm it for their service, which you cannot see.
4. Give the commands each developer runs on their clone: `git branch -m`, `git fetch origin`, `git branch -u origin/<new>`, `git remote set-head origin -a`, and how to fix branches based on the old name.
5. Handle forks and downstream users: what breaks for them, and an announcement draft.
6. Write the verification checklist after the switch: a test pull request runs CI, a deploy fires from the new branch, protection applies, docs links work, no references remain.
</task>

<constraints>
- Do not assume what the hosting service does; describe common behaviour and tell the user to check its documentation.
- Do not remove the old name while forks, pinned dependencies or install URLs still use it. A rename on the hosting service removes the old branch name, so for such consumers either announce a date first or recreate the old branch as a read-only copy for a stated transition period.
- Keep every command explained in one line.
</constraints>

<output_format>
## Where the old name lives
Checklist grouped by area, with search commands.
## Order of steps
Numbered.
## Hosting service behaviour
Bullets to confirm.
## For every developer
Commands.
## Forks and downstream users
Bullets and an announcement draft.
## After the switch
Checklist.
</output_format>
