---
schema: 1
id: support-old-mobile-app-versions
kind: prompt
title: Support old mobile app versions
description: Designs how a backend keeps serving old mobile app versions, with version reporting, minimum version checks, soft and forced upgrades, compatibility windows and kill switches.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, mobile-engineer, architect, tech-lead]
requires: [none]
inputs: [spec, text, repo]
output: [plan, docs, table]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [mobile-backend, forced-upgrade, backward-compatibility, app-versions, kill-switch]
pairs_with:
  personas: [software-architect]
  prompts: [migrate-api-version, review-api-breaking-changes, design-backend-for-frontend, design-api-contract]
args:
  - name: app
    description: The mobile apps (platforms, release cadence) and the backend APIs they call.
    type: text
    required: true
  - name: version_data
    description: What you know about the versions in use, for example "15% of active users are on versions older than 6 months", and whether the app reports its version today.
    type: text
  - name: pressure
    description: The change that is forcing this, such as a breaking API change, a security fix or a retired feature.
    type: text
output_contract:
  format: markdown
  sections: [Policy, Version signalling, Upgrade prompts, Compatibility on the backend, Emergency controls, Rollout, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Web clients update on reload; mobile apps do not. Every released app version keeps calling the backend for months or years, store review delays hotfixes, and some users never update because of old devices or disabled auto-update. Backends that treat mobile clients like web clients break real users with every incompatible change. The standard toolkit: every request carries the app version and platform; the backend keeps a supported-version policy (for example the last N releases or the last 12 months); a configuration endpoint fetched at startup returns the minimum supported version, a recommended version and a message, so the app can show a soft prompt or a blocking forced-upgrade screen; and the forced-upgrade check itself must be in the very first versions shipped, because an old app without it can only be broken, not upgraded. Additive API changes are the norm, breaking changes go to new endpoints or are adapted per version server-side, and remote kill switches can turn off a broken feature in old versions without a release.
</context>

<task>
<app>
{{app}}
</app>

{{#version_data}}
<version_data>
{{version_data}}
</version_data>
{{/version_data}}

{{#pressure}}
<pressure>
{{pressure}}
</pressure>
{{/pressure}}

1. If a repository is available, read how the apps call the backend (headers, API client, config fetch) and how the backend routes versions, and say what you read.
2. Propose a support policy: which versions are supported, for how long, how the window is measured (releases, months, share of active users), and who decides exceptions.
3. Design version signalling: app version, build number and platform on every request, and backend logging and dashboards of active users per version.
4. Design upgrade prompts: a startup configuration response with minimum and recommended versions per platform, soft prompt versus blocking screen rules, store deep links, and how the forced-upgrade screen keeps working even when other endpoints change. If old versions lack the check, say what options remain.
5. Design backend compatibility: additive changes by default, version-aware response adaptation or separate endpoints for breaking changes, contract tests run against the payloads of every supported version, and when to retire code paths.
6. Design emergency controls: remote feature flags or kill switches per version, a server-side block for a version with a security flaw, and how users on blocked versions are told what to do.
7. Plan the rollout for the stated pressure: steps, what users see, and how to measure that old versions have drained.
</task>

<constraints>
- Do not force upgrades for non-critical changes without stating the user cost (support load, lost users on devices that cannot update).
- Do not plan a breaking API change that silently breaks supported app versions.
- Do not invent store review times or policies; describe them as variable and say how to check.
{{> output/uncertainty}}
</constraints>

<output_format>
## Policy
Numbered rules.
## Version signalling
## Upgrade prompts
Include an example configuration response as JSON.
## Compatibility on the backend
## Emergency controls
## Rollout
Numbered steps with the measure for each.
## Open questions
Numbered.
</output_format>
