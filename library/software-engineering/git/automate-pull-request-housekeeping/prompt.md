---
schema: 1
id: automate-pull-request-housekeeping
kind: prompt
title: Automate pull request housekeeping
description: Sets up auto-labelling, reviewer assignment, size labels, stale handling and auto-merge for pull requests using the host's built-in features first and minimal, safe CI jobs second.
category: git
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [tech-lead, devops-engineer, maintainer]
stack: [git, github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, config, text]
output: [config, report]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [labelling, reviewer-assignment, stale-pull-requests, auto-merge, pull-request-target]
pairs_with:
  prompts: [write-codeowners-file, configure-branch-protection, configure-dependency-update-bot, triage-stale-pull-requests]
args:
  - name: wants
    description: Which chores to automate and the rules, for example "label by folder, add size labels, request the right team, close PRs idle 30 days, auto-merge once approved and green".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Plan, Changes, Permissions and safety, How to test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most pull request chores already have a built-in answer, and custom jobs add maintenance and risk. Reviewer routing is CODEOWNERS plus the host's team review assignment (round robin or load balance), not a bot. Auto-merge is a host feature that merges once required checks and approvals pass; it is only safe when branch protection actually requires those checks. Labelling by path and size, and closing stale pull requests, usually need a small job. These jobs carry real risks: on GitHub, workflows triggered by `pull_request_target` run with secrets and write access even for pull requests from forks, so they must never check out or run the pull request's code; events created with the built-in token do not trigger other workflows; and aggressive stale bots drive away contributors and close work that was waiting on maintainers.

<wants>
{{wants}}
</wants>
</context>

<task>
1. Read the repository: host, CI system, existing workflows, CODEOWNERS, labels, branch protection hints and contributing docs. Note what is already automated.
2. For each requested chore, choose the mechanism, preferring host settings, then CODEOWNERS, then a small job using a well-known action or template pinned to a version (or to a commit hash if the project pins that way). Say what is a setting the user must change in the UI and what is a file you write.
3. Write the files: label configuration by path, size labels with clear thresholds and generated files excluded, a stale policy with a warning period, exempt labels (for example security, pinned, awaiting-maintainer) and a friendly message, and the auto-merge setup.
4. Give every job the minimum permissions (`permissions:` block or equivalent). For jobs that need write access on fork pull requests, use the trigger that has it and never check out or execute the contributor's code there.
5. Make sure labels referenced in config exist or are created, and that nothing loops (a label event triggering the job that adds labels).
6. Explain how to test each piece on a throwaway branch or pull request.
</task>

<constraints>
- Do not enable auto-merge unless required checks and reviews are enforced; if they are not, say so and point to protection rules.
- Do not close or label existing pull requests in bulk as part of setup; the stale job should start in a dry-run or warning-only mode where the tool supports it.
- Keep each job short; do not write custom scripts where a maintained action or setting does the job.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Plan
A table: chore | mechanism | file or setting.
## Changes
Each file in a fenced block with its path, plus UI settings as steps.
## Permissions and safety
What each job can do and why that is safe for fork pull requests.
## How to test
Steps per chore.
</output_format>
