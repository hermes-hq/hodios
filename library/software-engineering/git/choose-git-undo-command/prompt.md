---
schema: 1
id: choose-git-undo-command
kind: prompt
title: Choose the right git undo
description: Works out exactly what needs undoing and whether it is shared, then gives the one right command among restore, revert, reset, amend and cherry-pick, with its effect and a check. Use mid-mistake.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [software-engineer, student]
stack: [git]
requires: [none]
inputs: [text]
output: [explanation]
risk: read-only
invocation: user
effort: quick
interaction: interactive
model_tier: mid
reasoning: recommended
level: beginner
tags: [undo, revert, reset, amend, wrong-branch]
pairs_with:
  prompts: [recover-lost-git-work, explain-git-error, clean-up-commit-history]
args:
  - name: situation
    description: What you want to undo, in your own words, for example "I committed to main instead of my feature branch" or "I want to throw away my changes to one file". Add `git status` and `git log --oneline -5` output if you can.
    type: text
    required: true
  - name: already_pushed
    description: Whether the commit or change has already been pushed to a shared remote.
    type: boolean
    default: false
output_contract:
  format: markdown
  sections: [Your situation, Command, What it changes, Check, If that is not what you meant]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Someone is in the middle of a git mistake and wants the one right command, not a tutorial. "Undo" in git means at least six different things, and the wrong choice either fails to undo the problem or makes it worse: `reset --hard` on uncommitted work deletes it permanently, and rewriting pushed history breaks everyone who pulled. Two facts decide almost everything: what exactly should be undone (a working-tree change, a staged change, the last commit's message or content, an older commit, a merge, a commit on the wrong branch) and whether it has been shared. Already pushed: {{already_pushed}}.
</context>

<task>
<situation>
{{situation}}
</situation>

1. Classify the situation into one case. If two cases fit and they need different commands, ask one short question (for example "Do you want to keep the changes in your files, or throw them away?") and stop. Ask at most two questions in total.
2. Pick the command from this map:
   - discard uncommitted changes to a file: `git restore <file>` (lost for good; say so);
   - unstage a file but keep the edits: `git restore --staged <file>`;
   - fix the last commit's message or add a forgotten file, not pushed: `git commit --amend`;
   - undo the last commit but keep the changes, not pushed: `git reset --soft HEAD~1`;
   - throw away the last commit and its changes, not pushed: `git reset --hard HEAD~1`, only after a backup branch;
   - undo a commit that is already pushed or shared: `git revert <sha>`; for a merge commit, `git revert -m 1 <merge-sha>` and explain what re-merging later requires;
   - committed to the wrong branch, not pushed, right branch does not exist yet: `git branch <new>` (it keeps the commit), then `git reset --keep HEAD~1` on the wrong branch, then `git switch <new>`; when the right branch already exists, `git switch <right>`, `git cherry-pick <sha>`, then `git switch <wrong>` and `git reset --keep HEAD~1`. Use `--keep`, not `--hard`: it refuses instead of deleting uncommitted edits;
   - committed to the wrong branch and pushed: cherry-pick to the right branch and `git revert` on the wrong one;
   - undo a rebase or reset that just happened: `git reset --hard ORIG_HEAD` or the reflog entry, after checking it with `git reflog`;
   - a lost commit or deleted branch: point to reflog recovery rather than guessing.
3. Treat the change as pushed if {{already_pushed}} is true or the situation text says it was pushed, merged or pulled by others; if it is unclear and the answer would switch between reset and revert, ask. When pushed, never give a history-rewriting command for a shared branch. If the user insists on rewriting a pushed branch that only they use, give `git push --force-with-lease` with a warning to tell anyone who pulled it.
4. Before any command that moves a branch or discards work, have the user run `git status` and give a one-line safety step: `git branch backup-before-undo` for commits, `git stash` for uncommitted edits they may want back.
5. Show what the result will look like and the command that confirms it.
</task>

<constraints>
- One recommended command sequence, not a menu. Mention an alternative only in the last section.
- Use `git restore` and `git switch` (modern commands); mention the older `checkout` equivalent in one parenthesis only if the user used it.
- Replace placeholders such as `<sha>` with real values from the pasted output when available; otherwise tell the user exactly where to find them.
- Never say a discard is recoverable when it is not: uncommitted, unstaged changes removed by restore or reset --hard are gone.
- Keep it under about 200 words.
</constraints>

<output_format>
## Your situation
One sentence restating the case and whether it is shared.
## Command
A code block with the safety step and the command or commands, each commented.
## What it changes
Two or three bullets: what happens to the commit, the files, and the remote.
## Check
One command and what it should show.
## If that is not what you meant
One or two lines naming the nearest other case and its command.
</output_format>
