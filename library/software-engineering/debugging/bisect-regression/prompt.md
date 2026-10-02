---
schema: 1
id: bisect-regression
kind: prompt
title: Bisect a regression
description: Finds the commit or input that introduced a regression by writing an automated good/bad check first, then bisecting. Use when something that used to work is broken and the cause is unclear.
category: debugging
version: 1.0.0
status: incubating
stage: [verify]
role: [software-engineer, qa-engineer, maintainer]
stack: [git]
requires: [repo-read, shell, git]
inputs: [text, logs, repo]
output: [code, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [git-bisect, regression, delta-debugging]
pairs_with:
  personas: [debugger]
args:
  - name: regression
    description: What used to work and now fails, with the exact command, request or input that shows it and the wrong output.
    type: text
    required: true
  - name: good_ref
    description: A commit, tag or release where it last worked, if known.
    type: string
  - name: bad_ref
    description: A commit, tag or branch where it fails.
    type: string
    default: HEAD
output_contract:
  format: markdown
  sections: [Check, Good and bad endpoints, Bisect, Result, Culprit analysis]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bisection finds the first bad commit in log2(n) steps, but only if every step is judged correctly. Most failed bisects come from a manual or flaky check, an untestable commit marked bad, or a "good" endpoint that was never verified. So the check comes first: one script that builds what it needs, reproduces the symptom, and exits with an unambiguous code. The same idea applies when the regression is triggered by data rather than code: halve the input until the smallest failing input remains.
</context>

<task>
Find what introduced this regression:
{{regression}}

Bad: {{bad_ref}}. {{#good_ref}}Last known good: {{good_ref}}.{{/good_ref}}

1. **Write the check.** A script that exits 0 when the behaviour is good, 1 when it shows this specific regression, and 125 when the commit cannot be tested (build fails for an unrelated reason, missing migration). It must test the regression itself, not "any failure", and must map crashes and signals to 1 or 125 explicitly, because `git bisect run` aborts on any exit code above 127. Make it deterministic: fixed seeds, clean build output, isolated temp data. If the symptom is intermittent, run it N times and call it bad if any run fails; say what N gives enough confidence for the failure rate you observed.
2. **Confirm the endpoints.** Run the check on the bad ref and the good ref and show the results. If no good ref is known, find one by testing older release tags or stepping back exponentially (bad~10, ~20, ~40…), and stop to ask if nothing older is good. If the check disagrees with the user's report on either endpoint, stop and fix the check.
3. **Decide what to bisect.** If the regression appears with the same code and different data or configuration, bisect the input instead: split the input in halves (records, config keys, files), keep the half that still fails, and repeat until removing any single part makes it pass.
4. **Run the bisect:** `git bisect start <bad> <good>`, then `git bisect run <check>`. Use `--first-parent` when the history has merges and the team wants the merge that introduced it. Note any skipped commits.
5. **Confirm the culprit.** Show the commit, read its diff, and explain the mechanism that breaks the behaviour. Where practical, revert just that commit on top of the bad ref and show the check passes.
6. End with `git bisect reset` and say which branch is checked out.
</task>

<constraints>
- Never mark a commit bad because it fails to build or fails for a different reason; that is a skip (exit 125).
- Do not modify tracked files during the bisect; keep the check script outside the repository or untracked so checkouts do not change it.
- If you cannot run commands, give the user the check script and the exact commands, and ask for the output at each decision point instead of guessing results.
{{> guardrails/verify-before-done}}
{{> output/uncertainty}}
</constraints>

<output_format>
## Check
The script in a code block, and what each exit code means for this regression.
## Good and bad endpoints
The refs and the check result on each.
## Bisect
The exact commands, and the bisect log if you ran it.
## Result
The first bad commit (hash, title, author date), or the minimal failing input, with how many steps it took and any skipped commits.
## Culprit analysis
What in that change causes the regression, the revert check, and a suggested next step (fix forward or revert).
</output_format>
