---
schema: 1
id: release-track
kind: workflow
title: Release track
description: Takes a release from change review to changelog, checklist, staged rollout, verification and announcement, pausing for approval between steps. Use for any release users will notice.
category: devops
version: 1.0.0
status: incubating
stage: [review, ship, operate]
role: [devops-engineer, tech-lead, maintainer, sre]
stack: []
requires: [repo-read, git]
inputs: [diff, text, ticket]
output: [report, checklist, plan, message]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [release-management, staged-rollout, changelog, go-no-go, rollback]
pairs_with:
  personas: [devops-engineer, site-reliability-engineer, open-source-maintainer]
  prompts: [write-changelog, write-release-notes, design-deployment-strategy, review-api-breaking-changes, write-incident-update]
args:
  - name: release_scope
    description: What is being released, such as a version number, the range of commits or merged pull requests since the last release, and any planned highlights or known risks.
    type: text
    required: true
  - name: deployment_method
    description: How the release reaches users, for example "Kubernetes with Argo Rollouts canary", "app store phased release", "npm publish", "blue-green on VMs" or "feature flags over a weekly deploy".
    type: string
steps:
  - {id: change-review, file: steps/01-change-review.md, stage: review, gate: approve}
  - {id: changelog, file: steps/02-changelog.md, stage: ship, gate: approve}
  - {id: release-checklist, file: steps/03-release-checklist.md, stage: ship, gate: approve}
  - {id: staged-rollout, file: steps/04-staged-rollout.md, stage: ship, gate: approve}
  - {id: verification, file: steps/05-verification.md, stage: operate, gate: approve}
  - {id: announcement, file: steps/06-announcement.md, stage: ship, gate: none}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes this release from review to announcement, one approved step at a time:

<release_scope>
{{release_scope}}
</release_scope>

{{#deployment_method}}
Deployment method: {{deployment_method}}
{{/deployment_method}}

Releases go wrong when nobody looks at the whole set of changes together, when the rollback path is assumed rather than checked, and when "deployed" is mistaken for "working". Each step produces one artifact and stops for the release owner's approval; later steps build on the approved versions. You prepare, check and write; the release owner runs deploys and other actions that affect users, and you never claim a step happened unless they confirm it. Never invent commits, metrics, dates or approvals: when something is unknown, ask or mark it.
