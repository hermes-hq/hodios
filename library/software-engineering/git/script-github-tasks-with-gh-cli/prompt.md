---
schema: 1
id: script-github-tasks-with-gh-cli
kind: prompt
title: Script bulk GitHub tasks with the gh CLI
description: Writes a safe gh CLI or GitHub API script for a bulk job across pull requests, issues or repositories, with a dry run, pagination, rate-limit handling and a log of what changed.
category: git
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, devops-engineer, maintainer, engineering-manager]
stack: [git, bash]
requires: [repo-read, file-write, shell]
inputs: [text]
output: [script, report]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [gh-cli, github-api, bulk-operations, automation, dry-run]
pairs_with:
  prompts: [triage-stale-pull-requests, audit-repository-access, open-same-change-across-repos, automate-pull-request-housekeeping]
args:
  - name: job
    description: What should happen in bulk, for example "close all issues labelled wontfix older than a year in org X with a comment" or "list open PRs across our 40 repos waiting on review for more than 5 days".
    type: text
    required: true
  - name: scope
    description: The organisation, repositories or search filter, and the shell you use (bash, zsh, PowerShell).
    type: text
output_contract:
  format: markdown
  sections: [Job, Prerequisites, Script, Target summary, Run and undo]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Bulk jobs on GitHub are where one small mistake becomes two hundred closed issues. The `gh` CLI covers most jobs with `gh pr list`, `gh issue list`, `gh search` and `--json` plus `--jq` for structured output, and `gh api` (with `--paginate`) reaches anything else in the REST or GraphQL API. Common failures: forgetting pagination so only the first page is processed, parsing human-formatted output instead of JSON, hitting secondary rate limits by firing hundreds of writes without pauses, running a write job across the wrong organisation, token scopes that silently hide private repositories, and scripts with no record of what they changed, so nothing can be undone. A safe bulk script has two phases: a read-only phase that produces the exact list of targets for a human to review, and a write phase that only touches that list, logs each action, and stops on unexpected errors.

<job>
{{job}}
</job>
{{#scope}}
<scope>
{{scope}}
</scope>
{{/scope}}
</context>

<task>
1. Restate the job as: targets (what is selected and by which filter), action (what changes), and side effects (notifications sent to people, webhooks triggered, CI runs started).
2. Check the prerequisites read-only: `gh auth status` for the account and scopes, and whether the scopes cover private repositories and the needed writes. Say which scope is missing if any, without asking for the token itself.
3. Write the read-only phase: select targets with `--json` fields and `--jq` filtering or `gh api --paginate`, handle pagination explicitly, and write the target list to a file with enough fields for review (repository, number, title, author, age, URL).
4. Write the write phase: read only from the reviewed list, perform one action per target, pause between writes, retry on rate-limit responses with back-off, log each result (target, action, success or error) to a file, and stop after a configurable number of errors.
5. Make dry run the default: the script prints what it would do and only performs writes with an explicit flag such as `--apply`.
6. Run the read-only phase if the user has `gh` set up and show a summary of the targets. Do not run the write phase; give the exact command for the user to run after reviewing.
7. Explain how to undo where possible (reopen, remove label) using the log, and what cannot be undone (comments and notifications already sent).
</task>

<constraints>
- Never run write actions yourself; the user runs the `--apply` step after reviewing the target list.
- Never ask for, print or store a token; rely on `gh auth`.
- Use JSON output, never parse the human-formatted table.
- Do not invent `gh` flags or API fields; if unsure, give the command to check (`gh <command> --help`, or the API reference for the endpoint).
</constraints>

<output_format>
## Job
Targets, action, side effects.
## Prerequisites
Auth and scope checks.
## Script
The script with dry run default, in the user's shell.
## Target summary
Results of the read-only phase, or the command to produce it.
## Run and undo
The apply command, log location and undo notes.
</output_format>
