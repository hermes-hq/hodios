---
schema: 1
id: move-files-keeping-history
kind: prompt
title: Move files keeping git history
description: Moves, renames or splits files so git log --follow and blame keep working, with rename-only commits, similarity checks and a copy-based trick for splitting one file into several.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
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
depth: specific
tags: [rename-detection, git-blame, file-split, log-follow]
pairs_with:
  prompts: [reorganize-project-structure, investigate-code-history, land-repo-wide-reformat]
args:
  - name: moves
    description: What to move, rename or split, for example "split utils.py into strings.py, dates.py and io.py" or "move src/components/* to packages/ui/src".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Plan, Commits, Check, Notes]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Git does not record renames; it detects them by comparing content when you ask for history. A moved file whose content also changed a lot in the same commit falls below the similarity threshold (50% by default) and looks like a delete plus an add, so `git log --follow` and `blame` stop at the move. The fix is to move in a commit that changes nothing else, then edit in later commits. Squash merging defeats this if the move and the edits are squashed together, so the move may need its own pull request or a merge method that keeps commits. Splitting one file into several is harder: rename detection follows only one destination. The known trick is to make each new file a copy of the original on its own branch (one `git mv` per branch), merge those branches together so each new file has the full history as an ancestor, then delete the unwanted parts from each. `blame -C -C` can also find lines copied between files without any trick, at a cost in speed. `log --follow` works on one file at a time.
</context>

<task>
<moves>
{{moves}}
</moves>

1. Read the files involved, their imports or references, and check the merge method the repository uses if visible (squash merging affects step 4).
2. Plan the commits: commit A contains only `git mv` operations (plus nothing else, not even import fixes); commit B fixes imports, references and build config; later commits change content. Confirm `git status` is clean before starting.
3. For a split of one file into N files, use the copy-merge trick: for each target, a short branch from the same base that does `git mv original target_i`; then merge all of those branches in one octopus or successive merges, resolving the "both renamed" conflicts by keeping every target file in full; then remove the duplicated content from each target in a follow-up commit. Explain the trick before doing it and ask if a simple move-plus-`blame -C` is good enough instead.
4. After the move commit, check detection: `git show --stat -M <sha>` should show renames with a similarity index, and `git log --follow --oneline -- <new path>` should reach commits from before the move.
5. Run the build and tests after commit B.
6. If the host squash merges, say that the move must land as its own pull request or with a merge that keeps commits, or history-following is lost.
</task>

<constraints>
- No content edits in the move commit.
- Do not rewrite already pushed history to restructure old moves unless the user asks and the branch is private.
- If the user only needs blame across copies, offer `git blame -C -C` before the copy-merge trick.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Plan
The commits in order and what each contains.
## Commits
Commands run, with commit hashes.
## Check
`show --stat -M` and `log --follow` evidence, and test results.
## Notes
Merge-method warnings and anything left for the user.
</output_format>
