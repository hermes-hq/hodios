---
schema: 1
id: mobile-app-release-track
kind: workflow
title: Mobile app release track
description: Ships a mobile app release in gated steps, from release branch and freeze to QA and beta, store metadata and review notes, a staged rollout with crash gates, and post-release monitoring.
category: devops
version: 1.0.0
status: incubating
stage: [plan, verify, ship, operate]
role: [mobile-engineer, tech-lead, product-manager]
stack: []
requires: [none]
inputs: [text, ticket, diff]
output: [plan, checklist, copy, report]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [app-store-release, phased-release, crash-free-rate, store-review, beta-testing, hotfix]
pairs_with:
  prompts: [automate-mobile-app-signing, triage-mobile-crash-spike, debug-mobile-crash]
  personas: [release-manager]
  workflows: [release-track]
args:
  - name: release_scope
    description: Version number, the features and fixes going in (tickets or merged PRs), feature flags involved, backend changes the release depends on, the target date, and any known risks.
    type: text
    required: true
  - name: platform
    description: Which stores this release goes to.
    type: enum
    enum: [ios, android, both]
    default: both
steps:
  - {id: branch-and-freeze, file: steps/01-branch-and-freeze.md, stage: plan, gate: approve, artifact: "release/01-branch-and-freeze.md"}
  - {id: qa-and-beta, file: steps/02-qa-and-beta.md, stage: verify, gate: approve, artifact: "release/02-qa-and-beta.md"}
  - {id: store-submission, file: steps/03-store-submission.md, stage: ship, gate: approve, artifact: "release/03-store-submission.md"}
  - {id: staged-rollout, file: steps/04-staged-rollout.md, stage: ship, gate: approve, artifact: "release/04-staged-rollout.md"}
  - {id: post-release, file: steps/05-post-release.md, stage: operate, gate: none, artifact: "release/05-post-release.md"}
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
Takes one mobile release from branch cut to a fully rolled-out, monitored version. Mobile releases are different from server deploys: users keep old versions for months, store review adds days you do not control, and a bad build cannot be rolled back on a phone, only halted or replaced. So the plan leans on flags, staged rollouts with numeric gates, and a hotfix path ready before it is needed. Each step writes one artifact and stops for approval.

<release_scope>
{{release_scope}}
</release_scope>

Platform: {{platform}}

Rules for every step:
- Use only the facts, dates and numbers given or confirmed; mark unknowns as [X] and ask.
- Never claim a build was submitted, approved or rolled out unless the user says so; you prepare, they act in the store consoles.
- Do not promise store review times or guess store policy; say what to check in the current store guidelines.
- Backend changes the app needs must be live and backwards compatible with older app versions before the release reaches users.
- End each artifact with open questions.
