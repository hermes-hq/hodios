---
schema: 1
id: find-breaking-commit
kind: prompt
title: Find the commit that broke it
description: Finds the first commit that introduced a regression with an automated git bisect and a reliable pass/fail check, then explains why that commit causes it. Use when something used to work.
category: git
version: 1.0.0
status: experimental
stage: [verify, maintain]
role: [software-engineer, qa-engineer]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, text, logs]
output: [report]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
tags: [bisect, regression]
pairs_with:
  prompts: [find-root-cause]
args:
  - name: symptom
    description: What is broken now, as concretely as possible (failing test, wrong output, error message).
    type: text
    required: true
  - name: good_ref
    description: A commit, tag or branch where it still worked. Leave empty to find one.
    type: string
  - name: bad_ref
    description: A commit, tag or branch where it is broken.
    type: string
    default: HEAD
  - name: check_command
    description: A command that fails when the bug is present, if you already have one.
    type: text
output_contract:
  format: markdown
  sections: [First bad commit, Why it breaks, How it was found]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
`git bisect` finds the first bad commit in about log2(N) steps, but only if the check is right. A check that fails for an unrelated reason (a broken build, a flaky test, a missing dependency at an old commit) sends the search to the wrong commit with full confidence. Most of the work is building a check that answers only "is this symptom present?".
</context>

<task>
Find the commit that introduced: {{symptom}}
Known bad: {{bad_ref}}.{{#good_ref}} Known good: {{good_ref}}.{{/good_ref}}
{{#check_command}}
Proposed check: {{check_command}}
{{/check_command}}

1. Run `git status`. If there are uncommitted changes, stop and ask the user to commit or stash them; do not stash or discard them yourself.
2. Build the check. It must exit 0 when the symptom is absent, 1 when it is present, and 125 when the commit cannot be tested (it does not build, or the test does not exist yet). Make it as narrow as possible: one test, one request, one output comparison. Put any helper script outside the working tree so checkouts do not touch it.
3. Validate the check before bisecting: it must report bad on {{bad_ref}} and good on the good ref. If no good ref was given, test older release tags or step back by doubling the distance until one passes. If the symptom is intermittent, make the check repeat enough times to be reliable and say how many.
4. Run `git bisect start`, mark the bad and good refs, then `git bisect run` with the check. If the history has merge commits from long-lived branches, consider `git bisect start --first-parent` to find the merge first.
5. When it finishes, save `git bisect log`, then run `git bisect reset` so the repo returns to where it was.
6. Read the first bad commit (`git show`) and explain the mechanism: which change, under which input, produces the symptom. Confirm it by checking the commit's parent is good and the commit itself is bad.
</task>

<constraints>
- Always finish with `git bisect reset`, even when you stop early or something fails.
- Do not commit, push, rewrite history or edit tracked files during the search.
- If many commits are skipped (125) around the result, report the range of candidates instead of one commit.
- Do not fix the bug unless the user asks; report what you found.
{{> guardrails/verify-before-done}}
{{> output/uncertainty}}
</constraints>

<output_format>
## First bad commit
Short sha, subject, author date, and the PR or merge it came in with, if visible.
## Why it breaks
The change and the mechanism, with `path:line` references from that commit.
## How it was found
The check (command or script), how it was validated on the good and bad refs, the number of steps and skips, and the `git bisect log`.
</output_format>
