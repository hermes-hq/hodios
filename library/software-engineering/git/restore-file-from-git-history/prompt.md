---
schema: 1
id: restore-file-from-git-history
kind: prompt
title: Restore a file from git history
description: Finds when a file, function or block was deleted or changed and brings back the old version, whole or in part, as a new commit on the current branch without moving HEAD.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, student]
stack: [git]
requires: [repo-read, file-write, shell, git]
inputs: [repo, text]
output: [report]
risk: runs-commands
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [restore-file, deleted-file, old-version, pickaxe-search]
pairs_with:
  prompts: [choose-git-undo-command, recover-lost-git-work, investigate-code-history]
args:
  - name: target
    description: What you want back and roughly from when, for example "the deleted file scripts/seed.py, gone some time last month" or "the old version of parse_date() before the timezone change".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Found, Restored, Check, Next]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Getting an old file back is one of the most common git requests, and the usual advice, checking out the old commit, puts the repository in detached HEAD and confuses people. The clean way leaves the branch where it is and copies the old content into the working tree: `git restore --source=<commit> -- <path>` (or `git checkout <commit> -- <path>` on older git). The hard part is finding the right commit. For a deleted file, `git log --diff-filter=D -- <path>` finds the deleting commit, and the content lives in its parent (`<sha>^`). If the path is not known exactly, `git log --diff-filter=D --name-only` lists deleted paths. For a function or block, the pickaxe `git log -S'<code>'` finds commits that added or removed that text, and `-G'<regex>'` finds commits that changed matching lines. Files that were renamed need `--follow`. Restoring part of a file is better done by showing the old version (`git show <sha>:<path>`) and copying the needed part, or with `git restore -p`, rather than overwriting newer work.
</context>

<task>
<target>
{{target}}
</target>

1. Check `git status`; if the target path has uncommitted changes, say that restoring over it would discard them and ask how to proceed.
2. Find the commit:
   - deleted file: `git log --diff-filter=D --oneline -- <path>`, or `git log --diff-filter=D --name-only --oneline` and search the output if the exact path is unknown;
   - old version of a file: `git log --follow --oneline -- <path>` and pick by date or message;
   - function or block: `git log -S'<distinctive text>' --oneline` or `git log -G'<regex>' --oneline -- <path>`.
   Show the candidate commits and the old content (`git show <sha>^:<path>` for a deletion, `git show <sha>:<path>` otherwise) so the user can confirm it is the right version.
3. Restore:
   - whole file: `git restore --source=<commit> -- <path>`;
   - part of a file: show a diff between the current and old version and apply only the needed hunks, with `git restore -p --source=<commit> -- <path>` or a manual edit.
   HEAD and the branch stay where they are.
4. Check the restored content compiles or runs with today's code; old code often references renamed or removed things. Fix the references only if the user asks.
5. Show `git diff` and propose a commit message that names the source commit, then wait for the user to commit.
</task>

<constraints>
- Do not use `git checkout <commit>` alone, `reset` or `revert` for this job; they move HEAD or undo other changes.
- Do not overwrite uncommitted changes without confirmation.
- If no commit matches, say so and list what was searched instead of guessing.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Found
The commit, date, author and why it is the right version.
## Restored
What was brought back and the command used.
## Check
Build or test result and anything that no longer fits current code.
## Next
The suggested commit message and command.
</output_format>
