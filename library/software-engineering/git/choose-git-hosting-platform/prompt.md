---
schema: 1
id: choose-git-hosting-platform
kind: prompt
title: Choose a git hosting platform
description: Compares GitHub, GitLab, Bitbucket, Azure DevOps and self-hosted options against a team's needs for CI, compliance, data location, integrations, cost and migration effort, and recommends one.
category: git
version: 1.0.0
status: incubating
stage: [plan, design]
role: [engineering-manager, tech-lead, devops-engineer, founder]
stack: [git]
requires: [none]
inputs: [text]
output: [report, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [code-hosting, vendor-selection, self-hosting, regulatory-requirements, migration-cost]
pairs_with:
  prompts: [move-repository-to-new-host, back-up-git-repositories, migrate-ci-provider]
args:
  - name: situation
    description: Team size, current tools (tracker, identity provider, cloud, CI), where code lives now, and any constraints such as data residency, air-gapped networks, open-source community or budget.
    type: text
    required: true
  - name: options
    description: Platforms already on the shortlist, if any.
    type: string
output_contract:
  format: markdown
  sections: [What matters most, Comparison, Recommendation, Migration effort, Check before deciding]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
All the main hosts do pull requests, reviews and branch protection well, so the choice is decided elsewhere: how well it fits the tools the team already pays for (identity provider and SSO, issue tracker, cloud, chat), whether the built-in CI is good enough to avoid a separate system, whether code must stay on your own infrastructure or in a specific region, which security and compliance features are included at the plan you would actually buy, where the open-source community and hiring pool expect you to be, and how much moving costs (CI rewrites, integrations, permissions, links in tickets and docs). Self-hosting buys control and data location but adds upgrades, backups, security patching and on-call for a system everyone depends on. Prices and plan contents change often, so a recommendation must name what to verify rather than quote figures.

<situation>
{{situation}}
</situation>
{{#options}}
Shortlist: {{options}}
{{/options}}
</context>

<task>
1. Extract the deciding requirements from the situation and rank them. If a hard constraint is unclear (self-hosting required, regulated data, air-gapped network), ask about it and stop.
2. Pick the realistic options (the shortlist if given, otherwise the two to four that fit) and compare them on: fit with existing tools and identity, CI and runners, security and compliance features, hosting model and data location, package and container registries, community and ecosystem, admin effort, and cost model (per-user, add-ons, CI minutes, storage), without quoting prices.
3. Recommend one option and the runner-up, with the two or three reasons that decided it and what would change the answer.
4. Estimate the migration effort from where the code lives now: repositories and history (easy), issues and pull requests (importer-dependent), CI pipelines (usually the biggest part), integrations, permissions and secrets (cannot be exported), and team retraining.
5. List what to verify with the vendor or in a trial before deciding.
</task>

<constraints>
- Do not state prices, user limits or which plan includes a feature as fact; say "check current plans" and name the item to check.
- Do not favour a platform by reputation; tie every point to the user's stated needs.
- If the team is happy where it is and nothing in the input forces a move, say that staying is an option.
</constraints>

<output_format>
## What matters most
Ranked requirements, one line each.
## Comparison
A table with options as columns and the criteria above as rows.
## Recommendation
Choice, runner-up and what would change the answer.
## Migration effort
Bullets by area with a rough size (small, medium, large).
## Check before deciding
Checklist.
</output_format>
