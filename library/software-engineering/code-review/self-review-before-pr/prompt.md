---
schema: 1
id: self-review-before-pr
kind: prompt
title: Self-review a branch before opening a PR
description: Reviews your own branch the way a strict reviewer would, catches debug leftovers, unrelated changes, missing tests and leaked secrets, and runs the checks. Use before requesting review.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer]
stack: []
requires: [repo-read, git, shell]
inputs: [diff, repo]
output: [report, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pull-request, pre-merge]
pairs_with:
  prompts: [review-pull-request]
  personas: [code-reviewer]
args:
  - name: base
    description: Branch or commit the work will merge into.
    type: string
    default: main
  - name: checks
    description: Commands that must pass, for example "npm test && npm run lint". If empty, use what the project's README, CI config or task runner defines.
    type: text
output_contract:
  format: markdown
  sections: [Ready, Blockers, Cleanups, Checks, Notes for the reviewer]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Reviewers spend most of their time on problems the author could have caught alone: a forgotten debug print, a file changed by accident, a test that was never run. A self-review pass before asking for review shortens the review and keeps the reviewer's attention on design and correctness.
</context>

<task>
Review the changes on the current branch compared with {{base}}.
1. Get the diff with `git diff {{base}}...HEAD` and the commit list with `git log {{base}}..HEAD`. Also check `git status` for uncommitted or untracked files that look like they belong in the change.
2. Read the whole diff and write one sentence describing what the change does. Every hunk should serve that sentence.
3. Look for:
   - Leftovers: debug prints, commented-out code, `TODO` or `FIXME` added in this branch, temporary files, focused or skipped tests (`.only`, `xit`, `@Ignore`, `t.Skip`).
   - Unrelated changes: reformatting, renames or edits outside the purpose of the change.
   - Secrets and personal data: keys, tokens, passwords, internal hostnames, real customer data in fixtures.
   - Missing tests: changed behaviour with no test that would fail without the change.
   - Defects you can see: unhandled errors, wrong conditions, null or empty inputs, resource leaks.
   - Generated or lock files changed without the source change that explains them.
4. Run the checks and report the real result of each. {{#checks}}Run exactly these: {{checks}}{{/checks}} If no commands are listed in this step, run the test, lint and type-check commands the project defines (look in the README, CI config, package scripts, Makefile or equivalent).
</task>

<constraints>
- Report, do not edit. The author decides what to change.
- Cite `path:line` for every finding.
- Separate blockers (would fail review or break something) from cleanups (worth fixing, not blocking).
- If you find what looks like a real secret, say which file and line, and tell the author to rotate it. Do not repeat the secret value.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Ready
`yes` or `no`, then one sentence.
## Blockers
Numbered: `path:line`, the problem, the fix. Or "None".
## Cleanups
Bullets: `path:line` and what to clean. Or "None".
## Checks
Each command, `pass` or `fail`, and the first relevant error line for failures. Say plainly if a check could not run.
## Notes for the reviewer
Two or three bullets: what the change does, where to look first, anything deliberately left out.
</output_format>
