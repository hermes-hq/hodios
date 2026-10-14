---
schema: 1
id: review-release-diff
kind: prompt
title: Review everything going into a release
description: Reviews all changes between two release tags, groups them by risk, flags commits that skipped review or carry risky changes, and lists what to verify after deploy.
category: code-review
version: 1.0.0
status: incubating
stage: [review, ship]
role: [tech-lead, software-engineer, sre]
requires: [git, repo-read]
inputs: [repo, diff]
output: [report, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [release-review, deploy-verification, migrations, regression]
pairs_with:
  personas: [code-reviewer]
  prompts: [review-diff-for-risks, write-release-notes, check-semver-impact-of-diff]
  workflows: [release-track]
args:
  - name: range
    description: The two refs to compare, for example "v2.13.0..main" or "last production tag to the release candidate".
    type: text
    required: true
  - name: context
    description: How the release is deployed (all at once, canary, per region), whether old and new versions run side by side, and any known hot spots.
    type: text
output_contract:
  format: markdown
  sections: [Summary, Changes by risk, Needs attention, Deploy order, Verify after deploy]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Each pull request in a release was reviewed alone; the release as a whole was not. Problems that only show at release level: a migration in one PR that the code in another PR depends on, deployed in the wrong order; two changes that touch the same config key; commits pushed directly to the main branch or merged without approval; a revert that was itself reverted; a feature flag defaulting to on in one PR and expected off in another; dependency bumps buried in unrelated changes; a long-lived branch merged with conflict resolutions nobody reviewed. During a rolling deploy, old and new code run against the same database and queues, so schema and message changes must be compatible both ways. Release review is also where you decide what to watch after deploy: the dashboards, logs and user flows that would show each risky change failing.
</context>

<task>
<range>
{{range}}
</range>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. List the commits and merged pull requests in the range with author, title and size. Identify commits not associated with a reviewed pull request, merge commits with manual conflict resolution, and reverts.
2. Group changes: database migrations, API and message contract changes, configuration and feature flags, dependency changes, security-sensitive areas (auth, payments, permissions, data deletion), infrastructure and build, ordinary feature and fix work, and docs or tests only.
3. Rate each group's risk for this release and explain why, considering interactions between pull requests (shared tables, keys, flags, files).
4. Check compatibility during deploy: can the old version run against the new schema, read new messages and work with new config, and can the new version roll back without data loss? Flag any change that requires a specific deploy order or a two-step release.
5. List items needing attention before release: unreviewed commits, missing migrations or rollback notes, flags with surprising defaults, changes without tests in risky areas.
6. Write the post-deploy verification list: for each risky change, the signal (metric, log query, endpoint, user flow) that would show it failing, and how long to watch.
</task>

<constraints>
- Read the actual commits and diffs; do not infer content from titles alone. If the range is too large to read fully, say which parts you read in full and which you sampled.
- Do not run deploy, tag, push or migration commands.
- Every item under Needs attention cites a commit hash or pull request.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Summary
Counts (commits, pull requests, migrations, dependency changes) and a one-line go, go-with-conditions or hold recommendation.
## Changes by risk
Table: group, items (commit or PR), risk, reason.
## Needs attention
Numbered: commit or PR, issue, what to do before release.
## Deploy order
Bullets: required ordering or two-step steps, or "no ordering constraints found".
## Verify after deploy
Checklist: change, signal to watch, threshold or expected value, watch time.
</output_format>
