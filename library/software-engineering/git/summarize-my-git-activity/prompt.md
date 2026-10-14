---
schema: 1
id: summarize-my-git-activity
kind: prompt
title: Summarize my git activity for a period
description: Turns your own commits and pull requests across repositories for a period into a short summary of what you shipped, for a standup, timesheet, weekly update or performance review.
category: git
version: 1.0.0
status: incubating
stage: [review]
role: [software-engineer, tech-lead, individual]
stack: [git]
requires: [repo-read, shell, git]
inputs: [repo, text]
output: [summary, table]
risk: runs-commands
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: optional
level: beginner
depth: specific
tags: [git-log, standup-notes, timesheet, self-review, work-summary]
pairs_with:
  prompts: [write-brag-document, write-shipped-this-week-update, write-pr-description]
args:
  - name: period
    description: The time range, for example "yesterday", "last week" or "2026-07-01 to 2026-09-30".
    type: string
    required: true
  - name: purpose
    description: What the summary is for (standup, timesheet with hours per project, weekly update, performance review) and who reads it.
    type: string
    required: true
  - name: repositories
    description: Paths to the repositories to scan, or a parent folder; and your git author emails if you use more than one.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Work items, Not visible in git]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A raw `git log` is a poor answer to "what did you do last week": commit messages are terse, fixups and merges add noise, work happens across several repositories and branches, and the most important work (reviews, unblocking others, investigations) leaves few commits. A useful summary groups commits into pieces of work (usually by pull request, ticket id or branch), says what each achieved in plain words, separates shipped from in progress, and adapts to the reader: one line per item for a standup, project and date buckets for a timesheet, impact and outcomes for a review. People often commit under several emails (work, personal, the host's no-reply address), so author filters must include all of them. Commit counts and line counts measure nothing useful and should not be presented as productivity.

<period>{{period}}</period>
<purpose>{{purpose}}</purpose>
{{#repositories}}
<repositories>
{{repositories}}
</repositories>
{{/repositories}}
</context>

<task>
1. Find the user's author identities: `git config user.email` plus any emails they listed; if unsure, show the distinct author emails in the repositories that match their name and ask which are theirs.
2. For each repository, collect read-only: `git log --all --author=<email> --since=<start> --until=<end> --no-merges --format=...` with dates, branches and messages, and, if `gh` or the host CLI is available, the user's pull requests and reviews in the period. Fetch nothing and change nothing.
3. Group commits into pieces of work by pull request, ticket id or branch, and drop noise (fixups, formatting, merge commits) from the narrative while keeping it in the grouping.
4. For each piece of work, write one plain sentence on what it achieved and its state (merged or released, in review, in progress), reading the diff stat or changed files when the message is unclear instead of guessing.
5. Shape the output for the purpose: standup (yesterday, today if given, blockers), timesheet (project, date, short description; leave hours for the user unless they gave them), weekly update (shipped, in progress, next), or review (outcomes and impact, with links or ids for evidence).
6. List what the git data cannot show (meetings, design work, support, reviews if no host CLI) and invite the user to add it.
</task>

<constraints>
- Read-only: no fetch, no checkout, no writes to the repositories.
- Do not invent impact, metrics or outcomes not in the data; mark where the user should add them.
- Do not report commit or line counts as a measure of productivity.
- Do not include other people's work as the user's; co-authored work is labelled as such.
</constraints>

<output_format>
## Summary
Shaped for the stated purpose.
## Work items
A table: repository | piece of work | state | evidence (PR, ticket or commit ids).
## Not visible in git
What to add by hand.
</output_format>
