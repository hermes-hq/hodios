---
schema: 1
id: resolve-merge-conflict
kind: prompt
title: Resolve a merge conflict
description: Resolves merge, rebase or cherry-pick conflicts by reading both sides and their common base, keeps the intent of each, and asks when the intents contradict. Use when git stops on a conflict.
category: git
version: 1.0.0
status: experimental
stage: [build]
role: [software-engineer]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, diff]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [merge-conflict, rebase]
args:
  - name: context
    description: What you were doing and what each side changed, if you know (for example "rebasing my feature branch onto main after the auth refactor").
    type: text
  - name: files
    description: Limit the work to these conflicted files. Leave empty for all of them.
    type: text
output_contract:
  format: markdown
  sections: [Resolutions, Verification, Needs your decision]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A conflict means two changes touched the same lines. Picking one side wholesale silently deletes the other person's work, and keeping both blindly often produces code that compiles but is wrong. A correct resolution keeps the intent of both changes, which you can only know by comparing each side with their common ancestor. Conflicts can also be semantic and outside the markers: one side renames a function while the other adds a new call to the old name.
</context>

<task>
Resolve the conflicts in the current repository{{#files}}, limited to: {{files}}{{/files}}.
{{#context}}
What the user told you: {{context}}
{{/context}}

1. Run `git status` to see the operation (merge, rebase, cherry-pick, revert or stash pop) and the conflicted files. Remember that during a rebase "ours" is the branch being rebased onto and "theirs" is the commit being replayed, the reverse of a merge.
2. For each conflicted file, read the three versions: base (`git show :1:path`), ours (`:2:path`) and theirs (`:3:path`). Read the commits that touched the file on each side (`git log --oneline --left-right --merge -- path`) to learn the intent of each change.
3. Classify every conflicting hunk:
   - independent: both changes can coexist; combine them.
   - same intent: both made an equivalent change; keep one, preferring the more complete one.
   - contradictory: the changes want different behaviour; do not guess. Leave the markers in that hunk and put it under "Needs your decision".
4. Remove every conflict marker you resolved. Search the whole file for leftover `<<<<<<<`, `=======` and `>>>>>>>`.
5. Look for semantic conflicts beyond the markers: renamed or removed symbols, changed signatures, moved files. Search for usages of anything either side renamed or deleted.
6. For lockfiles and generated files, do not hand-merge. Take one side, then regenerate with the project's own command (for example the package manager's install) and say which command you ran.
7. Run the project's build and the tests nearest to the touched code. Stage the files you resolved with `git add`.
</task>

<constraints>
- Do not run `git commit`, `git merge --continue`, `git rebase --continue`, `git push`, or any command that discards work (`reset --hard`, `checkout -- .`, `merge --abort`, `rebase --abort`, `clean`). Stop after staging and let the user continue.
- Never resolve a whole file with `--ours` or `--theirs` unless your hunk analysis shows that one side's changes are fully contained in the other's, and say so.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Resolutions
A table with one row per hunk: `path:line` | ours intended | theirs intended | resolution | confidence (high, medium, low).
## Verification
The build and test commands you ran and their real results, plus any semantic conflicts you found outside the markers.
## Needs your decision
Each contradictory hunk: the two behaviours in one sentence each, and the question to answer. Write "None" if there are none.
End with the command the user should run next (for example `git rebase --continue`).
</output_format>
