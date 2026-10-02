---
schema: 1
id: write-pr-description
kind: prompt
title: Write a pull request description
description: Writes a pull request description that tells reviewers why the change exists, what to look at first, how to test it and what could break. Use when opening a PR.
category: git
version: 1.0.0
status: experimental
stage: [ship, review]
role: [software-engineer, tech-lead]
stack: [git]
requires: [repo-read, git]
inputs: [diff, ticket]
output: [summary]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
tags: [pull-request]
pairs_with:
  prompts: [write-commit-message, review-pull-request]
args:
  - name: changes
    description: Diff, branch name or commit range. Leave empty to compare the current branch with the default branch.
    type: text
  - name: why
    description: The ticket, issue or reason for the change, if the diff does not show it.
    type: text
  - name: template
    description: The repo's PR template, if it is not in the repo. Its headings replace the default ones.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Why, Changes, How to test, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A PR description is for the reviewer, who has less context than the author and limited time. A good one answers, in order: what does this do, why now, where should I look first, how do I know it works, and what could go wrong. It is not a changelog of every file and not a sales pitch. Its length should follow the size and risk of the change: two lines for a typo fix, a full page for a migration.
</context>

<task>
Write the description for {{#changes}}{{changes}}{{/changes}}. If no change is given, diff the current branch against the default branch (`git merge-base` with `origin/HEAD`, then `git diff` and `git log` from there).
{{#why}}
Reason given by the author: {{why}}
{{/why}}
{{#template}}
Use the headings of this template instead of the default ones, and fill every section it has:
{{template}}
{{/template}}

1. Read every commit message and the full diff before writing. Check the repo for a PR template (`.github/pull_request_template.md`, `.github/PULL_REQUEST_TEMPLATE/`, `docs/`) and use it if one exists.
2. State the purpose in one or two sentences a reviewer could repeat.
3. Group the changes by intent, not by file. Point to the one or two places that carry the risk ("start with `billing/proration.ts`; the rest is wiring").
4. Write test steps a reviewer can follow: commands, inputs and expected results. Include only tests and checks you can see in the diff or the input.
5. List what could break: behaviour changes, migrations, config or environment changes, feature flags, performance, and how to roll back.
</task>

<constraints>
- Never claim that tests pass, that something was tested manually, or that metrics improved unless the input says so. Write `TODO(author): ...` for anything only the author can confirm.
- Link issues only when the id appears in the branch name, commits or input. Never invent one.
- Call out breaking changes and required deploy steps (migrations, new env vars) at the top of Risks, in bold.
- No filler ("This PR aims to..."), no restating the title, no emoji unless the template uses them.
- Do not create or edit the PR yourself; output the text.
</constraints>

<output_format>
First line: a proposed PR title in the repo's commit style, under 72 characters.
Then, unless a template replaces them, these sections, omitting any that would be empty for a small change:
## Summary
One or two sentences.
## Why
The problem or ticket, with the link if known.
## Changes
Bullets grouped by intent. Name the files to review first.
## How to test
Numbered steps with expected results.
## Risks
Breaking changes, migrations, rollout and rollback, or "Low: ..." with the reason.
</output_format>
