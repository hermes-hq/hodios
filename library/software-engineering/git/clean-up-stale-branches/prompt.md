---
schema: 1
id: clean-up-stale-branches
kind: prompt
title: Clean up stale branches safely
description: Sorts a repository's remote and local branches into merged, abandoned, active and protected, archives unmerged work as tags before deleting, and sets a policy so branches stop piling up.
category: git
version: 1.0.0
status: incubating
stage: [maintain]
role: [software-engineer, tech-lead, maintainer]
stack: [git]
requires: [repo-read, git, shell]
inputs: [repo, text]
output: [report, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [stale-branches, branch-hygiene, squash-merge, archive-tags]
pairs_with:
  prompts: [choose-branching-strategy, configure-branch-protection, recover-lost-git-work]
  rules: [git-safety-rules]
args:
  - name: repo_notes
    description: The default branch, release or long-lived branches that must never be deleted, how pull requests are merged (merge commit, squash or rebase), and how old a branch must be to count as stale, for example "90 days".
    type: text
    required: true
---
<context>
You help clean up a repository with hundreds of old branches. The hard part is deciding what is safe to delete. `git branch --merged` only detects branches merged with a merge commit or fast-forward; after a squash or rebase merge, the branch's commits never appear in main, so a fully merged branch looks unmerged. `git cherry` on its own misses them too, because it compares commit by commit and a squash commit matches none of the branch's commits. Experts build one temporary squashed commit of the branch (`git commit-tree` of the branch tree on its merge base) and check that with `git cherry` against main, or look up the branch's merged pull request. Release, environment and long-lived branches must be excluded by pattern. Unmerged work may still matter: archiving it as a tag (`archive/<branch>`) keeps it reachable at no cost before the branch is removed. Deleting a remote branch also closes or orphans any open pull request from it.

<repo_notes>
{{repo_notes}}
</repo_notes>
</context>

<task>
1. Run `git fetch --prune` and list remote branches with last commit date and author: `git for-each-ref --sort=committerdate --format='%(committerdate:short) %(authorname) %(refname:short)' refs/remotes/origin`.
2. Exclude protected branches by name or pattern from the notes. Show the exclusion list.
3. Classify the rest: merged (merge commit or fast-forward, via `git branch -r --merged origin/<default>`); likely squash-merged (a temporary squashed commit of the branch, made with `git commit-tree $(git rev-parse <branch>^{tree}) -p $(git merge-base origin/<default> <branch>) -m tmp`, shows as already applied in `git cherry origin/<default> <that commit>`, or the hosting CLI shows a merged pull request); stale and unmerged (older than the threshold with unique commits); active (recent).
4. Present a table per class with counts and ask the user to confirm before any deletion. Do not delete anything yet.
5. After confirmation: for stale unmerged branches, create archive tags and push them; then delete the confirmed branches in small batches with `git push origin --delete`, and write the list of deleted branches with their last commit hash to a file so any can be restored.
6. Clean local branches whose upstream is gone (`git branch -vv` showing gone), using `git branch -d` and only `-D` after confirmation for squash-merged ones.
7. Propose a policy: auto-delete head branches after merge on the hosting service, a stale threshold, and a periodic report.
</task>

<constraints>
- Never delete a branch before the user confirms the list. Never delete protected, release or default branches.
- Always record branch name and tip hash before deleting so it can be restored with `git push origin <hash>:refs/heads/<name>`.
- Warn that deleting a branch with an open pull request closes it; check for open pull requests if the hosting CLI is available, otherwise say the user must check.
- Do not rely on `--merged` alone when the repository uses squash or rebase merges.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Excluded
Branch names and patterns.
## Classification
Tables per class: branch | last commit | author | evidence.
## Awaiting confirmation
What will be archived and deleted, and the question.
## Commands run
After confirmation: archive tags, deletions, and the restore file location.
## Local cleanup
Commands.
## Policy
Bullets.
</output_format>
