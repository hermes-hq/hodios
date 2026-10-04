---
schema: 1
id: rebase-stacked-branches
kind: prompt
title: Rebase stacked branches
description: Plans updating a stack of dependent branches after the base moves or a lower PR is squash-merged, using rebase --onto or --update-refs, with commands per branch, conflict expectations and backups.
category: git
version: 1.0.0
status: incubating
stage: [build, review]
role: [software-engineer]
stack: [git]
requires: [none]
inputs: [text]
output: [plan]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: expert
tags: [stacked-prs, rebase-onto, update-refs, squash-merge]
pairs_with:
  prompts: [split-large-pull-request, resolve-merge-conflict, recover-lost-git-work]
args:
  - name: branch_stack
    description: The branches from bottom to top with their PRs, for example "main <- feat/api (PR 101) <- feat/client (PR 102) <- feat/ui (PR 103)". Add `git log --oneline --graph` output for the stack if you can.
    type: text
    required: true
  - name: what_changed
    description: What happened, for example "PR 101 was squash-merged into main", "main moved 40 commits", "I amended a commit in feat/api".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [What happened, Backup, Commands, Conflicts to expect, Push and PR updates]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The user maintains a stack of dependent branches, each with its own pull request. When the base moves, or a lower PR is merged, every branch above must be moved. The classic trap: after a lower PR is squash-merged, its original commits still sit at the bottom of the next branch; a plain `git rebase main` tries to replay them on top of the squashed copy and produces confusing conflicts or duplicate changes. The fix is to cut those commits off with `git rebase --onto`. Git 2.38 and later can move all branches in a stack in one rebase with `--update-refs`.

<branch_stack>
{{branch_stack}}
</branch_stack>

<what_changed>
{{what_changed}}
</what_changed>
</context>

<task>
1. Restate the stack bottom to top and classify the event: base moved (no merges); lower branch squash-merged or rebase-merged (its commits now exist on main under new hashes); lower branch merged with a merge commit (commits are shared, a plain rebase works); a commit in a lower branch was amended or rebased locally.
2. If the commit boundaries are unclear (where each branch starts), give the commands to find them: `git log --oneline --graph main..<top>` and `git merge-base`, and note the old tip of a merged branch can be found in the PR page or `git reflog show <branch>`. If the stack or event cannot be identified, ask and stop.
3. Backup: `git fetch`, then a backup ref for every branch (`git branch backup/<name> <name>`), and a note that reflog also keeps the old positions.
4. Write the commands, branch by branch, using real branch names:
   - **Squash-merged lower branch:** `git rebase --onto origin/main <old-tip-of-merged-branch> <next-branch>`, then for each branch above, `git rebase --onto <next-branch> <old-tip-of-next-branch> <branch-above>` (record each old tip before moving it, for example as the backup ref).
   - **Base moved or amended lower commit, git 2.38 or later:** check out the top branch and run `git rebase --update-refs <new-base>` (or `--onto` with `--update-refs`), which moves every branch in the stack; show the todo list lines `update-ref` so they know what to expect. Mention `rebase.updateRefs true` as an option.
   - **Older git:** rebase each branch in order from the bottom, using `--onto` with the previous old tip.
5. Say where conflicts are likely (files touched by both the new base and a branch) and how to handle them: resolve once at the lowest branch so higher ones inherit the fix; `git rerere` to reuse resolutions; `git rebase --abort` to return to the start.
6. Push and PR updates: `git push --force-with-lease` per branch, bottom first; retarget the next PR's base to main on the hosting service if the merged branch was deleted; check each PR's diff shows only its own commits.
7. Give a verification: `git log --oneline --graph main..<top>` should show each branch's commits once, and `git range-diff` against the backup confirms the content is unchanged.
</task>

<constraints>
- Use the user's real branch names and hashes wherever given; otherwise mark placeholders like `<old-tip-of-feat/api>` and say how to find them.
- Never recommend force-pushing a branch others commit to without saying so; these are assumed to be the user's own branches.
- Do not tell the user to merge main into each branch as the default; mention it only as an alternative when the team forbids force-pushes.
- If a stacking tool is mentioned (for example Graphite, ghstack, git-branchless, spr), give its command only if you are sure of it, and the plain git commands either way.
</constraints>

<output_format>
## What happened
Two or three sentences: the event and why a plain rebase would go wrong (if it would).
## Backup
A code block.
## Commands
Numbered steps, one code block per branch, with a comment on what each command does.
## Conflicts to expect
Bullets.
## Push and PR updates
Commands and the PR base changes, then the verification commands.
</output_format>
