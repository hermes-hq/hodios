---
schema: 1
id: revert-merged-pull-request
kind: prompt
title: Revert a merged pull request
description: Reverts a merged pull request whether it was merge-commit, squash or rebase merged, then plans how to re-land the fixed version later without the revert-the-revert trap.
category: git
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [software-engineer, tech-lead]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [report, plan]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [revert, merge-commit, squash-merge, re-land, pull-request]
pairs_with:
  prompts: [choose-git-undo-command, revert-feature-across-many-commits, write-pr-description]
args:
  - name: pull_request
    description: The pull request to revert (number, title or merge commit sha), how it was merged if known, and why it must come out.
    type: text
    required: true
  - name: later_changes
    description: Anything merged after it that may depend on it.
    type: text
output_contract:
  format: markdown
  sections: [What landed, Dependents, Revert, Check, Re-landing later]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reverting a merged pull request depends on how it was merged. A squash merge is one commit and reverts with `git revert <sha>`. A rebase merge spread the PR over several commits on main, which must all be reverted, newest first, ideally in one revert commit with `git revert --no-commit`. A merge commit needs `git revert -m 1 <merge-sha>`, where parent 1 is main; picking the wrong parent reverts main into the branch instead. The trap people hit later: after reverting a merge commit, git still considers the branch's commits merged, so merging the fixed branch again brings in only the new commits and the original changes stay missing. The fix is to revert the revert first, then merge the follow-up, or to re-land from a fresh branch with new commits. Hosting services offer a "Revert" button that opens a revert PR; it handles the parent choice but not the re-land plan or dependent changes merged since.
</context>

<task>
Revert this pull request: {{pull_request}}
{{#later_changes}}
Merged after it: {{later_changes}}
{{/later_changes}}

1. Find exactly what landed: `git log --oneline --first-parent main` around the PR, and determine the merge style (one squash commit, several rebased commits, or a merge commit with two parents shown by `git show --no-patch --format=%P <sha>`).
2. Check for dependents: commits after the PR that touch the same files or call code it added (`git log --oneline <sha>..main -- <files>` and a search for the PR's new symbols). If something depends on it, stop and list the options: revert both, or revert only part.
3. Create a branch for the revert from up-to-date main.
4. Revert with the right command for the merge style: `git revert <sha>`, `git revert --no-commit <oldest>^..<newest>` then one commit, or `git revert -m 1 <merge-sha>` after confirming parent 1 is main.
5. Write the revert commit message: what is reverted, why, a link to the incident or issue, and how to re-land.
6. Run the build and tests; resolve any conflicts by restoring the pre-PR behaviour, not by improvising new code.
7. Write the re-land plan: if a merge commit was reverted, the fixed work lands by reverting the revert and then adding the fix, or by a fresh branch with new commits; never simply re-merge the old branch. For squash and rebase merges, a new PR with the fix on top of a revert-of-the-revert is clearest.
8. Show the push command and PR description for the revert and wait for confirmation before pushing.
</task>

<constraints>
- Revert on main through a pull request; never reset or force-push main.
- Confirm the merge parent before `-m 1`; state which parent is main.
- Do not fix the bug inside the revert; the revert only removes the change.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What landed
Merge style, commits and files.
## Dependents
Later changes that rely on it, or "None found".
## Revert
Commands run and the commit message.
## Check
Build and test results.
## Re-landing later
Numbered steps for this merge style.
</output_format>
