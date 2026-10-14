---
schema: 1
id: back-up-git-repositories
kind: prompt
title: Back up an organisation's git repositories
description: Sets up scheduled backups of an organisation's repositories on a code host, including LFS objects, wikis, issues and pull request data, with retention, monitoring and a tested restore.
category: git
version: 1.0.0
status: incubating
stage: [plan, operate]
role: [devops-engineer, sre, engineering-manager]
stack: [git]
requires: [none]
inputs: [text, config]
output: [plan, script, checklist]
risk: read-only
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [repository-backup, mirroring, restore-test, retention, code-hosting]
pairs_with:
  prompts: [plan-disaster-recovery, move-repository-to-new-host, audit-repository-access, set-up-git-lfs]
args:
  - name: setup
    description: The host (GitHub, GitLab, Bitbucket, Azure DevOps, self-managed), number of repositories, whether LFS, wikis, issues and pull requests matter, and where backups may be stored.
    type: text
    required: true
  - name: requirements
    description: Recovery goals (how much data you can lose, how fast you must restore), retention, compliance needs and budget, if known.
    type: text
output_contract:
  format: markdown
  sections: [What to back up, Options and recommendation, Backup job, Retention and monitoring, Restore procedure]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Git is distributed, so every laptop is a backup" fails the day it matters: laptops lack branches nobody checked out, LFS objects, tags pushed by CI, wikis, issues, pull request discussions, releases and settings. Code hosts protect against their own hardware failures, not against an admin deleting the organisation, a compromised token force-pushing or deleting repositories, a suspended account or a billing lapse. A real backup copies all of it to storage the host's credentials cannot delete, on a schedule, with retention and a restore that has actually been tested. Mirror clones (`git clone --mirror`, then `git remote update`) capture every ref; LFS needs `git lfs fetch --all`; wikis are separate git repositories on most hosts; issues, pull requests, releases and comments come from the host's API or its organisation export or migration feature. Hosts and third-party services also offer backup products; whether one fits depends on budget and requirements. The backup credential should be read-only and scoped to exactly what it copies.

<setup>
{{setup}}
</setup>
{{#requirements}}
<requirements>
{{requirements}}
</requirements>
{{/requirements}}
</context>

<task>
1. List what must be backed up for this setup: git refs, LFS objects, wikis, issues, pull requests and review comments, releases and assets, packages, and settings (protection rules, permissions, webhooks, secrets by name only).
2. Compare the realistic options briefly: a script with mirror clones plus API export on a scheduled runner, the host's own export or backup feature, or a third-party backup service. Recommend one with reasons, without quoting prices.
3. Specify the job: schedule, read-only credential with minimal scope (and where it is stored), discovery of new repositories so none are missed, mirror update rather than fresh clone each run, LFS fetch, wiki clone, metadata export, compression and encryption, and upload to storage with object lock or versioning so the backup cannot be deleted with the same credentials.
4. Write the script or job definition for the chosen approach, read-only against the host, with logging and a non-zero exit on any repository failure.
5. Set retention (for example daily for a month, monthly for a year, adjusted to the requirements) and monitoring: alert on failed runs, on repository counts that drop, and on backups older than the schedule allows.
6. Write the restore procedure for one repository and for the whole organisation, and a quarterly restore test that pushes a backup to a scratch repository and checks refs, LFS files and a sample of issues.
</task>

<constraints>
- The backup job must only read from the host; never include commands that push, delete or change settings on the source.
- Never put secret values in scripts or documents; reference a secret store.
- Do not claim a host feature or third-party service includes a specific item unless sure; tell the user what to verify.
- Do not quote prices.
</constraints>

<output_format>
## What to back up
A checklist.
## Options and recommendation
A short comparison and the choice.
## Backup job
Specification and the script or job definition.
## Retention and monitoring
Bullets.
## Restore procedure
Numbered steps, plus the restore test.
</output_format>
