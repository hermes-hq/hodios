---
schema: 1
id: add-ticket-ids-to-commits
kind: prompt
title: Link commits and branches to tickets
description: Links commits, branches and pull requests to Jira, Linear or similar tickets with a branch naming rule, a prepare-commit-msg hook that adds the id, and a CI check with an escape hatch.
category: git
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, tech-lead]
stack: [git, jira]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [code, config, docs]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: optional
level: intermediate
depth: specific
tags: [ticket-ids, prepare-commit-msg, issue-tracker, traceability, linear]
pairs_with:
  prompts: [set-up-git-hooks, write-team-git-guidelines, conventional-commits-rules]
args:
  - name: tracker
    description: The tracker and key format, for example "Jira, keys like PAY-1234" or "Linear, team key ENG".
    type: text
    required: true
  - name: merge_method
    description: How pull requests are merged, which decides where the id must appear.
    type: enum
    enum: [squash, rebase, merge-commit, mixed]
    default: squash
output_contract:
  format: markdown
  sections: [Convention, Hook, CI check, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Tracker integrations pick up ticket keys from branch names, commit messages and pull request titles, so the cheapest reliable link is a branch named after the ticket plus a hook that copies the key into each commit message. The hook must be careful: `prepare-commit-msg` runs for merges, squashes, amends and commits with `-m`, and blindly prefixing breaks merge messages, duplicates the key on amend, and breaks commit-format linters that expect a type first. Hooks live in `.git/hooks`, which is not versioned, so they reach the team only through `core.hooksPath` or the project's hook manager. Local hooks can be skipped, so a CI check is the real gate, and with squash merging the check belongs on the pull request title, not on individual commits. Some work has no ticket (typo fixes, dependency bumps), and a rule without an escape hatch gets fake tickets.

<tracker>
{{tracker}}
</tracker>
Merge method: {{merge_method}}
</context>

<task>
1. Read the repository for an existing hook manager (Husky, lefthook, pre-commit, `core.hooksPath`), commit linting and CI. Follow what is there.
2. Define the convention: branch pattern (for example `<type>/<KEY-123>-short-slug`), where the key goes in the message (subject suffix, prefix after the type, or a trailer) so it does not break any existing commit-format rule, and the escape hatch (for example a `no-ticket` label or `NO-TICKET` token) with who may use it.
3. Write the `prepare-commit-msg` hook in POSIX shell: read the branch name, extract the key with the tracker's pattern, and add it only when the commit source is empty or a plain message, the key is not already present, and the branch is not detached. Do nothing for merge, squash and amend.
4. Install it through the existing hook manager or `core.hooksPath`, and add a one-line setup note to the contributing docs.
5. Write the CI check: for squash, check the pull request title; for rebase or merge commits, check each commit in the range; in all cases allow the escape hatch and skip bot authors such as dependency updaters.
6. Mention the tracker-side setting that links the host to the tracker, which the user must enable in the tracker's admin.
7. Test the hook on a scratch branch with a normal commit, an amend and a merge, and report the resulting messages.
</task>

<constraints>
- Do not rewrite existing commit history to add ids.
- Keep the hook dependency-free and safe when the branch has no key: it must never block a commit, only the CI check enforces.
- Do not invent the tracker's admin menu names; describe the setting generally if you are unsure.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Convention
Branch pattern, message placement and escape hatch, with examples.
## Hook
The hook file in a fenced block with its path and how it is installed.
## CI check
The job or config in a fenced block.
## Rollout
Steps for the team, the tracker setting to enable, and the test results.
</output_format>
