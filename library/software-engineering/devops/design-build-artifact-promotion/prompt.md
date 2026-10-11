---
schema: 1
id: design-build-artifact-promotion
kind: prompt
title: Design build artifact promotion
description: Designs build-once, promote-everywhere for container images and packages, covering immutable tags and digests, version scheme, provenance, signing, environment promotion and registry retention.
category: devops
version: 1.0.0
status: incubating
stage: [design, ship]
role: [devops-engineer, tech-lead]
stack: [docker]
requires: [none]
inputs: [text, config]
output: [plan, config]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [artifacts, container-registry, immutable-tags, image-signing, provenance, retention]
pairs_with:
  personas: [release-manager, devops-engineer]
  prompts: [design-ci-cd-pipeline, write-versioning-policy, design-deployment-strategy]
args:
  - name: current_flow
    description: How artifacts are built and deployed now (for example "each environment's pipeline rebuilds from the branch and pushes :latest"), registries in use, number of services and environments, and any compliance needs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Problems now, Artifact identity, Promotion flow, Trust and provenance, Retention, Migration]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
If staging and production run different builds, testing staging proves little. Rebuilding per environment brings in different base image layers, dependency resolutions and build flags; deploying `:latest` or a mutable branch tag means nobody can say what is running, and a rollback may deploy something new. The fix is to build once per commit, identify the artifact immutably (registry digest, plus a human-readable tag such as the version or commit SHA that is never overwritten), and promote the same digest through environments by changing configuration, not by rebuilding. Environment-specific settings belong in configuration and secrets at deploy time, never baked into the image. Promotion can be modelled as tags added to the same digest, copying between registries or repositories with stricter access, or recording the approved digest in deployment config. Supply-chain controls fit here: build provenance attestations, signatures checked at deploy or admission, and a software bill of materials stored next to the artifact. Registries also need retention rules that delete untagged and old development images while keeping everything deployed to production and its rollback window.
</context>

<task>
<current_flow>
{{current_flow}}
</current_flow>

1. List the problems in the current flow: rebuilds per environment, mutable tags, environment config baked in, untraceable running versions, unsafe rollbacks, and registry sprawl.
2. Define artifact identity: the version or tag scheme (commit SHA, semantic version, build number), immutability settings in the registry, deploying by digest, and labels or annotations linking the artifact to source commit and build.
3. Design the promotion flow from merge to production: where the artifact is built, how it moves between environments (tag promotion, registry copy or config change), gates at each step, and how a hotfix uses the same path.
4. Add trust: provenance attestation, signing, SBOM, and verification at deploy time or by an admission policy. Keep it proportionate to the stated compliance needs and say what can wait.
5. Write retention rules: what to delete (untagged, pull request builds after a number of days) and what to keep (anything deployed to production plus the rollback window, release tags).
6. Give a migration plan service by service, starting with removing `:latest` from deploys.
7. Show example pipeline snippets or registry policy for the stated tools, marked as examples to adapt.
</task>

<constraints>
- Do not recommend rebuilding an artifact for production after it was tested.
- Keep environment-specific values out of artifacts.
- Mark tool-specific commands, flags and registry features as "to verify" where unsure.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Problems now
Bullets with consequences.

## Artifact identity
Tag scheme, immutability, digests and labels.

## Promotion flow
Numbered steps with gates.

## Trust and provenance
Bullets: what now, what later.

## Retention
Table: Artifact kind | Keep | Delete after.

## Migration
Numbered steps, plus example snippets.
</output_format>
