---
schema: 1
id: move-repository-to-new-host
kind: prompt
title: Move repositories to a new git host
description: Plans and checks a move of repositories between GitHub, GitLab, Bitbucket or Azure DevOps, keeping history, tags, LFS objects, issues, pull requests, wikis and every reference to the old URLs.
category: git
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [devops-engineer, tech-lead, engineering-manager]
stack: [git]
requires: [none]
inputs: [text, notes]
output: [plan, checklist, script]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [repository-migration, mirror-clone, issue-import, cutover, code-hosting]
pairs_with:
  prompts: [choose-git-hosting-platform, migrate-ci-provider, set-up-git-lfs, configure-branch-protection]
args:
  - name: move
    description: From which host to which (including self-managed versions if known), how many repositories, whether issues, pull requests, wikis, releases and packages must come along, and the team size.
    type: text
    required: true
  - name: constraints
    description: Deadlines, freeze windows, compliance needs, CI system, identity provider and anything already decided.
    type: text
output_contract:
  format: markdown
  sections: [Inventory, What moves and how, User mapping, References to update, Runbook, Cutover and rollback, Communication]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Copying the git data is the easy part: a mirror clone and mirror push carries every branch, tag and note, though LFS objects need their own fetch and push, and hosts may reject hidden refs such as `refs/pull/*`. What actually breaks a host move is everything around the code: issues, pull requests with review comments, wikis, releases and their assets, package registries, CI pipelines and their secrets, webhooks, deploy keys, branch protection, CODEOWNERS syntax differences, user mapping between accounts, and hundreds of hard-coded old URLs in submodules, package manifests, docs, tickets and developer remotes. Each host offers an importer that keeps some metadata (often mapping authors only when accounts are linked by email), and these importers differ in what they bring across; check the target host's current documentation for the exact list. A good move runs a pilot with one representative repository, freezes writes during cutover, leaves the old repositories read-only (archived, not deleted) for a period, and verifies counts after each step.

<move>
{{move}}
</move>
{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}
</context>

<task>
1. Build an inventory template: for each repository, size, LFS use, submodules, open pull requests, issue count, wiki, releases, packages, CI config, webhooks, deploy keys, apps and integrations, and secrets (names only).
2. Map what moves and how: git data (mirror clone and push, plus LFS fetch and push), issues and pull requests (the target host's importer, or a stated loss with an export kept as an archive), wiki (it is a separate git repository on most hosts), releases and assets, packages, and protection rules and permissions (recreated by hand or by script).
3. Plan user mapping: how accounts on the old host are matched to the new one, what happens to unmatched authors, and that commit authorship itself never changes.
4. List every reference to update: submodule URLs, dependency URLs in manifests, CI templates and includes, docs and READMEs, badges, deploy scripts, infrastructure code, webhooks in other systems, and each developer's `git remote set-url`.
5. Write the runbook with phases: pilot one repository end to end; batch the rest; per batch a write freeze, migrate, verify, switch CI, announce. Include the read-only commands to verify (compare `git for-each-ref` output and commit counts on both sides, LFS object checks, issue and PR counts).
6. Define cutover and rollback: the old repositories are set read-only and archived, not deleted, with a banner pointing to the new location, for an agreed period; rollback means resuming writes on the old host.
7. Give a communication plan: dates, what developers must do on the day, and where to report problems.
</task>

<constraints>
- Do not state that an importer carries a specific item unless you are sure; otherwise say "check the target host's import documentation for X".
- Never recommend deleting source repositories as part of the move; archiving and a later separate decision only.
- Handle secrets by name only and plan to re-create them on the new host; never copy secret values into documents.
- Any command that pushes to a remote must be marked "run after confirmation" and target the new host only.
</constraints>

<output_format>
## Inventory
A table template with the fields to collect.
## What moves and how
A table: item | method | known gaps.
## User mapping
Short section.
## References to update
A checklist.
## Runbook
Numbered phases with verification commands.
## Cutover and rollback
Bullets.
## Communication
Dates and developer actions.
</output_format>
