---
schema: 1
id: review-dependency-update-pr
kind: prompt
title: Review a dependency update PR
description: Reviews a bot dependency bump PR by reading the changelog range, flagging breaking and silent behaviour changes, lockfile churn and transitive jumps, and recommends merge, merge with checks or hold.
category: code-review
version: 1.0.0
status: incubating
stage: [review, maintain]
role: [maintainer, software-engineer]
stack: []
requires: [none]
inputs: [text, diff]
output: [report, checklist]
risk: read-only
invocation: user
effort: quick
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [dependency-updates, semver, changelog, lockfile, renovate, dependabot]
pairs_with:
  prompts: [audit-dependencies, review-pull-request]
args:
  - name: pr_summary
    description: The bot PR title and body (package, from and to versions), the lockfile or manifest diff summary, and CI results. Mention how the package is used if you know.
    type: text
    required: true
  - name: changelog
    description: Release notes or changelog entries for every version in the range, pasted from the project. Leave empty if you do not have them.
    type: text
    default: ""
output_contract:
  format: markdown
  sections: [Recommendation, Changes in range, Lockfile and transitive changes, Checks before merge]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A maintainer is facing a queue of bot dependency PRs and needs to decide each one quickly without merging a silent behaviour change. Green CI is weak evidence: tests rarely cover a library's default timeout, its date parsing, a changed retry policy or a new peer dependency. Semver is a promise, not a guarantee, and pre-1.0 packages can break on any minor. Lockfile churn can hide much bigger jumps in transitive packages than the PR title suggests.
</context>

<task>
<pr_summary>
{{pr_summary}}
</pr_summary>

<changelog>
{{changelog}}
</changelog>

1. Identify the package, the from and to versions, the version distance (patch, minor, major, or several majors), whether it is a runtime or dev-only dependency, and whether the package is pre-1.0.
2. If no changelog was given, say so, list the exact versions whose release notes the maintainer should read, and base the recommendation on the risk class only. Never invent changelog content.
3. Read every entry in the range, not only the latest. Sort the changes into:
   - **breaking:** removed or renamed APIs, dropped runtime or platform versions, changed config formats;
   - **behaviour changes tests may miss:** new defaults (timeouts, retries, encoding, strictness), changed error types, ordering, rounding, time zone or locale handling, logging volume, telemetry;
   - **security fixes:** with the advisory id if the notes give one;
   - **irrelevant:** changes to features the project does not use (say so only when the PR or the user tells you how the package is used).
4. Check the lockfile and manifest summary for: transitive packages jumping a major version, new transitive dependencies (more supply-chain surface), duplicated versions of the same package, changed peer dependency or engine requirements, and integrity or registry source changes.
5. Recommend one:
   - **merge:** patch or minor with no relevant behaviour change and passing CI;
   - **merge with checks:** list the specific manual checks or tests to run first;
   - **hold:** breaking or risky changes needing code changes, a coordinated upgrade, or more information. Say what would unblock it.
6. If several PRs are pasted, give one recommendation each and suggest which to group or merge first.
</task>

<constraints>
- Base every claim on the pasted notes and diff. Where you rely on general knowledge of the package, say so and recommend checking the notes.
- Do not recommend disabling the bot or pinning forever; suggest grouping, schedules or ignore rules with a reason if the queue is the real problem.
- Keep it short: a maintainer should read it in under a minute.
{{> output/uncertainty}}
</constraints>

<output_format>
## Recommendation
One line: merge | merge with checks | hold, with the reason.
## Changes in range
Table: Version | Change | Type (breaking, behaviour, security, irrelevant) | Affects us?
## Lockfile and transitive changes
Bullets, or "Nothing notable".
## Checks before merge
Checkboxes: specific tests, code paths or manual checks, or "None".
</output_format>
