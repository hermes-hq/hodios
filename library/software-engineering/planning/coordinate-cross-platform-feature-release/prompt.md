---
schema: 1
id: coordinate-cross-platform-feature-release
kind: prompt
title: Coordinate a cross-platform feature release
description: Sequences one feature across backend, web, iOS and Android with API-first order, app review lead times, flags, minimum app versions and a joint launch date.
category: planning
version: 1.0.0
status: incubating
stage: [plan, ship]
role: [tech-lead, mobile-engineer, engineering-manager, project-manager]
stack: [ios, android]
requires: [none]
inputs: [spec, notes, text]
output: [plan, table, checklist]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [mobile-release, app-store-review, feature-flags, api-versioning, launch-coordination, release-train]
pairs_with:
  prompts: [plan-cross-service-change, find-critical-path, plan-project-milestones]
args:
  - name: feature
    description: The feature, what each platform must do (backend, web, iOS, Android), and any launch date or marketing moment.
    type: text
    required: true
  - name: release_setup
    description: How each platform releases (web continuous, mobile release trains and their cadence, phased rollouts), feature flag tooling, and the share of users on old app versions if known.
    type: text
output_contract:
  format: markdown
  sections: [Sequence, Timeline, API and compatibility, Flags and launch switch, Old app versions, Launch day and rollback, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Launching one feature on all platforms at once is mostly a sequencing problem. The backend API has to land first and stay backward compatible, because old app versions live for months. Mobile builds must be submitted days before launch to allow for store review and a phased rollout, so the code has to ship dark behind a remote flag and be switched on together on launch day; a mobile build cannot be "hotfixed" in an hour. Web can usually go last. Teams that miss this either launch on web weeks before mobile, block the launch on a rejected app review, or break old clients with an API change. Store review times vary and are not guaranteed; plan buffer and avoid depending on expedited review.
</context>

<task>
Feature: {{feature}}
{{#release_setup}}Release setup: {{release_setup}}{{/release_setup}}

1. Sequence: backend contract agreed first (schema or API spec shared so clients can build against mocks), backend deployed dark, mobile builds containing the feature behind a remote flag, web behind the same flag, then one coordinated switch-on. Explain the critical path.
2. Timeline: work back from the launch date with the mobile code cutoff for the right release train, submission date with buffer for review and possible rejection, phased rollout to enough users before launch, backend and web deploy dates, a full end-to-end test on production builds, and the go or no-go meeting.
3. API and compatibility: additive changes only, behaviour for old app versions that do not know the feature, and when a deprecated field can be removed.
4. Flags and launch switch: one flag or a set per platform, targeting (internal staff, beta, percentage), who flips it, and a kill switch per platform.
5. Old app versions: what users on versions without the feature see, whether a minimum version or update prompt is needed, and the effect on support.
6. Launch day and rollback: order of switch-on, metrics and crash dashboards per platform, who watches, rollback by flag (not by redeploying apps), and communication.
7. Open questions that could block the date.
</task>

<constraints>
- Do not state store review durations as guaranteed; treat them as variable and plan buffer.
- Do not suggest breaking API changes that old app versions would hit.
- Do not invent dates or tools; use placeholders where the input lacks them.
{{> output/uncertainty}}
</constraints>

<output_format>
## Sequence
## Timeline
Table: Date or days before launch | Platform | Milestone | Owner.
## API and compatibility
## Flags and launch switch
## Old app versions
## Launch day and rollback
## Open questions
</output_format>
