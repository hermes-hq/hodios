---
schema: 1
id: write-commit-message
kind: prompt
title: Write a commit message
description: Writes a commit message that states what changed and why, in the repo's own convention, and flags staged changes that should be split. Use before committing.
category: git
version: 1.0.1
status: experimental
aliases: [git-commit-msg]
stage: [build, ship]
role: [software-engineer]
stack: [git]
requires: [git]
inputs: [diff, text]
output: [commit-message]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: small
reasoning: optional
level: beginner
tags: [commit-message, conventional-commits]
pairs_with:
  rules: [conventional-commits-rules]
  prompts: [write-pr-description]
args:
  - name: changes
    description: The diff or a description of the change. Leave empty to use the staged changes.
    type: text
  - name: convention
    description: Message convention to follow.
    type: enum
    enum: [match-repo, conventional, plain]
    default: match-repo
  - name: why
    description: The reason for the change, a ticket id or anything the diff cannot show.
    type: text
output_contract:
  format: text
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Answers to the former Hermes IDE built-in id git-commit-msg."}
---
<context>
A commit message is read months later by someone running `git log`, `git blame` or `git bisect` who needs to know why a line exists. The subject says what changed in words a reader can scan; the body says why, because the diff already shows how. A message that narrates the diff, or one that bundles unrelated changes behind "and", fails that reader.
</context>

<task>
Write a commit message for this change:
{{#changes}}
{{changes}}
{{/changes}}
If no change is given above, read the staged changes (`git diff --staged`). If nothing is staged, say so in one line and stop.
{{#why}}
Reason given by the author: {{why}}
{{/why}}

1. Read the whole diff and name its single purpose in one sentence. If the diff mixes unrelated purposes (a fix plus a refactor, two features), do not write one message. Propose a split instead: list each commit with its files or hunks and its subject line.
2. Pick the convention: {{convention}}.
   - `match-repo`: read the last 20 subjects (`git log --format=%s -20`) and copy their pattern: type prefixes, scopes, capitalisation, ticket references. If there is no history or no clear pattern, use `plain`.
   - `conventional`: Conventional Commits 1.0.0. `type(scope): description`, with type one of feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert. Use the scope only if the repo has clear modules. Mark a breaking change with an exclamation mark before the colon (`feat(api)!: ...`) and a `BREAKING CHANGE:` footer that says what users must do.
   - `plain`: a capitalised imperative subject with no prefix.
3. Subject: imperative mood ("Fix", not "Fixed" or "Fixes"), names the thing that changed, no trailing period, at most 72 characters and ideally under 50.
4. Body, after one blank line, wrapped at 72 characters: the problem, why this approach, and any side effect or follow-up a reviewer must know. Skip the body when the subject says everything (typo fixes, version bumps).
5. Footers only for facts you have: issue references from the input, `BREAKING CHANGE:`, or trailers the repo already uses.
</task>

<constraints>
- Never invent a reason, ticket number, issue link, benchmark or test result. If the motivation is not in the diff or the input, write a body with only what the diff proves and add one line after the message asking for the reason.
- Do not add tool or assistant attribution trailers (such as `Co-authored-by`) unless the author asks.
- Do not run `git commit` or change the index. Output the message only.
- Describe behaviour, not files: "Reject expired tokens at login" beats "Update auth.ts".
</constraints>

<output_format>
The message inside one fenced `text` block, exactly as it should be committed.
After the block, at most two lines starting with `Note:` for a proposed split or missing information. Nothing else.
For a split, output one fenced block per proposed commit, each preceded by the files or hunks it contains.
</output_format>

<examples>
Input: a diff that changes `retry.ts` so that `fetchWithRetry` stops retrying on HTTP 4xx responses, with a new test.

```text
Stop retrying client errors in fetchWithRetry

A 4xx response means the request itself is wrong, so retrying it only
adds latency and load: a bad token was retried 5 times per call before
failing. Retry only network errors and 5xx responses, and add a test
that a 401 fails on the first attempt.
```
</examples>
