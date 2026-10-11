---
schema: 1
id: truncate-repository-history
kind: prompt
title: Start a repository with fresh history
description: Replaces a repository's long or messy history with a single new root commit while keeping the old history archived and reachable, with a coordinated cutover for every clone.
category: git
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [software-engineer, tech-lead, maintainer]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, text]
output: [plan, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [history-rewrite, orphan-branch, git-replace, archive-repository, fresh-start]
pairs_with:
  prompts: [purge-file-from-git-history, speed-up-large-repo, prepare-code-for-open-sourcing, extract-folder-into-new-repo]
args:
  - name: reason
    description: Why you want fresh history (open-sourcing an internal project, huge clone size, history full of secrets or customer data, a new major version) and what must stay findable.
    type: text
    required: true
  - name: context
    description: Who has clones or forks, open pull requests, CI and deploy references to commit hashes, and whether the repository is public.
    type: text
output_contract:
  format: markdown
  sections: [Is this the right tool, Archive plan, New history, Reconnecting history, Cutover runbook, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Cutting history is a one-way door for everyone who has a clone. Every commit hash changes, so open pull requests, forks, tags, release notes, issue links to commits, deploy pins and `git blame` all stop matching. Done well, the new repository starts from one root commit of the current tree, and the old history lives in an archived repository or under a clearly named ref, so investigators can still reach it; `git replace --graft` can even stitch the old history back onto the new root in a local clone when someone needs blame across the cut. Two cases need extra care. If the reason is leaked secrets or personal data, a fresh start does not remove anything already cloned, forked or cached by the host: the secrets must be rotated, and the archived old history must be private and access-controlled, or deleted after a retention decision. If the reason is only size, a shallow or partial clone setup, or purging a few large files, may solve it with far less disruption, and should be checked first.

<reason>
{{reason}}
</reason>
{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}
</context>

<task>
1. Check the alternatives against the stated reason before cutting: partial or shallow clones and LFS for size, a targeted history purge for a few files, a new repository that keeps history for a fresh major version. If one of them fits, say so and stop unless the user still wants a fresh start.
2. Inspect read-only: size, branch and tag list, open pull requests, references to commit hashes in CI, deploys, submodules and docs.
3. Plan where the old history lives: an archived (read-only, private if sensitive) repository, or a namespaced ref such as `refs/archive/pre-reset`, with a tag at the last old commit. If the reason is secrets or personal data, list the rotations and the retention decision first.
4. Create the new history in a fresh clone, not the user's working copy: an orphan branch from the current tree, one root commit with a message naming the archive location and the last old commit hash, and recreated tags only for releases that should continue.
5. Show how to reconnect history locally with `git replace --graft <new-root> <old-tip>` for people who need blame across the cut, and that replace refs are not pushed by default.
6. Write the cutover runbook: freeze merges, land or close open pull requests, push the new main after confirmation, update protection rules, CI and deploy pins, and have every developer re-clone (or reset with care after saving local work). Include the announcement text.
7. Verify: the new tree matches the old tip exactly (`git diff <old-tip> <new-root>` is empty), the archive is reachable, CI passes on the new history.
</task>

<constraints>
- Never force-push, delete branches or delete the old repository without explicit confirmation; propose those steps as commands for the user to approve.
- Never present a fresh start as removing leaked secrets; rotation comes first.
- Work in a fresh clone so the user's local work is never touched.
</constraints>

<output_format>
## Is this the right tool
Alternatives checked and the verdict.
## Archive plan
Where the old history lives.
## New history
Commands, in order, marked where confirmation is needed.
## Reconnecting history
The graft method.
## Cutover runbook
Numbered steps and the announcement.
## Verification
Checks and results.
</output_format>
