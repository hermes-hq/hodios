---
schema: 1
id: configure-dependency-update-bot
kind: prompt
title: Configure a dependency update bot
description: Writes a Renovate or Dependabot config that keeps dependencies current without flooding the team, with grouping, schedules, automerge for safe updates, lockfile upkeep and security updates first.
category: devops
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [devops-engineer, maintainer, tech-lead]
stack: [github-actions]
requires: [none]
inputs: [repo, text, config]
output: [config, docs]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: optional
level: intermediate
tags: [renovate, dependabot, dependency-updates, automerge, lockfiles, version-pinning]
pairs_with:
  prompts: [review-dependency-update-pr, audit-dependencies, upgrade-major-dependency]
  personas: [devops-engineer]
args:
  - name: repo_overview
    description: Package managers and manifests in the repo (npm workspaces, pip, Go modules, Docker images, GitHub Actions, Terraform providers), test coverage and CI time, team size, and how many update pull requests the team can review per week.
    type: text
    required: true
  - name: bot
    description: Which bot to configure.
    type: enum
    enum: [renovate, dependabot, undecided]
    default: undecided
output_contract:
  format: markdown
  sections: [Policy, Config, Automerge safety, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Dependency bots fail in two opposite ways: the default config opens dozens of pull requests a week and the team learns to ignore them, or the bot is switched off and the project falls years behind until a security fix requires a painful jump. A good policy decides by risk: security updates immediately; patch and minor updates of dev dependencies and well-tested libraries grouped and automerged when CI passes; major updates one at a time with release notes; and slow-moving areas (base images, CI actions, infrastructure providers) on their own schedule. Details experts set: a minimum release age so freshly published versions (sometimes compromised or quickly yanked) are not taken on day one, pinned GitHub Actions to commit SHAs with the bot updating them, lockfile maintenance to pick up transitive fixes, grouping for packages that must move together (monorepo families, a framework and its plugins), a pull request limit, and labels and reviewers. Automerge is only safe when required checks are meaningful and branch protection enforces them. Renovate is more configurable (presets, grouping, many managers, dependency dashboard); Dependabot is built into GitHub with simpler grouping and fewer managers.
</context>

<task>
Bot: {{bot}}

<repo_overview>
{{repo_overview}}
</repo_overview>

1. If the bot is undecided, recommend one in a few lines based on the managers in use and how much control the team needs.
2. Write the update policy as a table by category (security, patch, minor, major; production versus development dependencies; Docker, CI actions, infrastructure), with grouping, schedule, automerge yes or no, and reviewers.
3. Write the config file for the chosen bot implementing that policy: managers enabled, schedule and time zone, concurrency and pull request limits, groups, minimum release age where supported, labels, commit message style, lockfile maintenance, and pinning of CI actions.
4. State what automerge depends on: required status checks, branch protection, tests covering the dependency's use, and when to turn automerge off.
5. Plan the rollout: start with a dependency dashboard or a low limit, handle the initial backlog of outdated packages, and review the policy after a month using pull request counts and time to merge.
</task>

<constraints>
- Use only configuration options you are confident exist for the chosen bot; mark uncertain options to verify in the bot's documentation.
- Never automerge major updates or updates to packages without test coverage.
- Do not disable security updates to reduce noise.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Policy
Table: Category | Group | Schedule | Automerge | Reviewer.

## Config
One code block with the file path.

## Automerge safety
Bullets.

## Rollout
Numbered steps and the review metrics.
</output_format>
