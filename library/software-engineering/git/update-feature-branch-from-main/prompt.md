---
schema: 1
id: update-feature-branch-from-main
kind: prompt
title: Update a feature branch from main
description: Brings a feature branch up to date with main by rebase or merge, chosen by whether others share the branch, with rerere for far-behind branches and a safe force-with-lease push.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [rebase, merge-main, force-with-lease, rerere, feature-branch]
pairs_with:
  prompts: [resolve-merge-conflict, rebase-stacked-branches, recover-lost-git-work, explain-git-error]
args:
  - name: branch
    description: The feature branch to update and the base it should follow, for example "feature/billing onto main". Leave the base out to use the repository's default branch.
    type: text
    required: true
  - name: sharing
    description: Who else commits to or builds from this branch, whether it has an open pull request, and any team rule such as "we never rebase" or "linear history only".
    type: text
output_contract:
  format: markdown
  sections: [Where the branch stands, Method, Steps run, Conflicts, Check, Next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A feature branch that falls behind main has to absorb main's changes before it can merge cleanly or be tested against current code. Rebase replays the branch's commits on top of main and gives a clean history, but it rewrites every commit, so anyone else who has the branch must reset onto the new one, and review comments tied to old commits can detach. Merging main into the branch is safe for shared branches but adds merge commits that some teams forbid. Experienced people decide by sharing, not taste: rebase a branch only you push to, merge into a branch others push to, and follow the team's rule when there is one. On a branch hundreds of commits behind, a rebase can hit the same conflict in commit after commit; `git rerere` records each resolution and replays it, and squashing the branch's own fixups first cuts the number of replayed commits. Most real damage comes from `push --force` overwriting a teammate's push made in the meantime; `--force-with-lease` refuses in that case.
</context>

<task>
Update this branch: {{branch}}
{{#sharing}}
Sharing and team rules: {{sharing}}
{{/sharing}}

1. Inspect first: `git status` (stop if there is uncommitted work and ask whether to commit or stash it), `git fetch origin`, then how far apart the branches are with `git rev-list --left-right --count origin/<base>...HEAD` and the branch's own commits with `git log --oneline origin/<base>..HEAD`.
2. Check whether the remote branch has commits you do not have (`git log --oneline HEAD..origin/<branch>`). If it does, someone else pushed; integrate those first and treat the branch as shared.
3. Choose the method and say why in one sentence: rebase if only this person pushes to the branch and the team allows rewriting it; merge if others push to it, other branches are built on it, or the team forbids rebasing. If sharing is unknown, ask and stop.
4. Create a backup ref before anything else: `git branch backup/<branch>-<date>`.
5. If the branch is far behind (more than about 50 commits on main, or many of its own commits touch the same files), enable `git config rerere.enabled true` for this repository and suggest squashing the branch's own fixup commits first.
6. Run the update: `git rebase origin/<base>` or `git merge origin/<base>`. On conflicts, read base, ours and theirs before resolving, remembering that during a rebase "ours" is main and "theirs" is the branch's commit. Leave contradictory hunks for the user.
7. After it finishes, run the build and the tests, and compare the result with the backup: `git diff backup/<branch>-<date> HEAD` should show only main's changes plus conflict resolutions.
8. Before pushing, show the push command and wait for confirmation. After a rebase it is `git push --force-with-lease origin <branch>`; after a merge, a plain push.
</task>

<constraints>
- Never use plain `--force`, never rebase a branch others push to without their agreement, and never rebase main itself.
- Do not run `reset --hard`, `rebase --abort` or `merge --abort` without asking, and say that the backup branch restores everything.
- Do not resolve a conflict by taking one side wholesale unless the other side's change is already contained in it.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where the branch stands
Commits ahead and behind, and whether the remote has new commits.
## Method
Rebase or merge, with the reason.
## Steps run
Numbered commands with results, including the backup ref.
## Conflicts
One line per resolved conflict, and any left for the user, or "None".
## Check
Build and test results, and the backup comparison.
## Next
The push command to run, and what teammates must do if history was rewritten.
</output_format>
