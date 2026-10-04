---
schema: 1
id: investigate-code-history
kind: prompt
title: Investigate why code changed
description: Investigates when and why a piece of code changed using blame, log search, pickaxe and linked pull requests, and writes a short evidence-backed history of the decision and who to ask.
category: git
version: 1.0.0
status: incubating
stage: [discover, maintain]
role: [software-engineer, maintainer]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, file]
output: [report]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [git-blame, git-log, pickaxe, code-archaeology, decision-history]
pairs_with:
  prompts: [explain-codebase]
args:
  - name: file_or_symbol
    description: The file, function, constant or line range to investigate, for example "src/billing/proration.ts" or "MAX_RETRIES in worker/queue.go" or "api/auth.py:120-145".
    type: string
    required: true
  - name: question
    description: What you want to know, for example "why do we round proration down instead of to the nearest cent?" or "when did the retry limit change from 5 to 2, and was it on purpose?".
    type: text
    required: true
  - name: repo_access
    description: "local: you can run git commands in the repository. pasted-log: the user will paste blame, log or diff output and you work only from that."
    type: enum
    enum: [local, pasted-log]
    default: local
output_contract:
  format: markdown
  sections: [Answer, Timeline, Evidence, Confidence, Who to ask, Commands used]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`git blame` alone usually points at the wrong commit: a reformat, a file move or a mass rename. The decision you care about is often several commits back, and the reason lives in a commit body, a pull request description, a linked issue or a code review thread. Good code archaeology follows the code through moves, finds the commit that introduced or changed the specific behaviour, reads the surrounding discussion, and separates what the record says from what is inferred.
</context>

<task>
Answer this question about {{file_or_symbol}}: {{question}}

Access mode: {{repo_access}}. In `local` mode, run read-only git commands yourself. In `pasted-log` mode, work only from what the user pasted; if it is not enough, list the exact commands for the user to run and stop.

1. Locate the code today and confirm it exists as described. If it does not, search for it (`git grep`, `git log -S`) and report where it went.
2. Find the change that matters, skipping noise:
   - `git blame -w -C -C -M` on the relevant lines, honouring `.git-blame-ignore-revs` if present (`--ignore-revs-file`), to see past whitespace changes, moves and copies.
   - The pickaxe: `git log -S'<literal>'` for when a string or value appeared or disappeared, and `git log -G'<regex>'` for changes to lines matching a pattern.
   - Line history: `git log -L <start>,<end>:<file>` or `git log -L :<function>:<file>` to see every version of the function.
   - `git log --follow -p -- <file>` across renames.
   - For a change that looks reverted or reintroduced, check for revert commits and cherry-picks.
3. For each relevant commit, read the full message (`git show --stat <sha>`), and look for a pull request or merge request number, an issue or ticket id, a linked design document, or a co-author. If the hosting CLI is available and authenticated, read the pull request description and review comments; otherwise give the link pattern for the user to open.
4. Reconstruct the decision: what the code did before, what changed, who changed it and when, the stated reason, and any later change that modified the original intent.
5. Name who to ask: the authors and reviewers of the key commits who are still active in recent history (`git shortlog -sne --since=<date> -- <path>`), and the current owners if a CODEOWNERS file exists. Use names or handles as they appear in the repository; do not look people up elsewhere.
6. Before answering, check each claim against a commit, diff or pull request you actually read, and label everything else as inference.
</task>

<constraints>
- Read-only: never commit, check out, reset, rebase, stash or modify the working tree or any branch. Do not fetch or push unless the user asks.
- Quote commit messages and pull request text exactly when they are evidence; do not paraphrase them into stronger claims.
- If the record does not explain why, say "the history does not record a reason" instead of inventing one.
- Do not include email addresses in the report; use names or handles.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Answer
Two to four sentences that answer {{question}} directly, with the key commit.

## Timeline
| Date | Commit | Author | Change | Stated reason |

## Evidence
Quoted commit messages, pull request or issue excerpts, and short diffs that support the answer.

## Confidence
High, medium or low, and what would raise it. List every inference explicitly.

## Who to ask
Names or handles, their role in the change, and whether they are still active in this area.

## Commands used
The git commands you ran, or the ones the user should run in pasted-log mode.
</output_format>
