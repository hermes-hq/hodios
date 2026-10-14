---
schema: 1
id: set-up-self-hosted-ci-runners
kind: prompt
title: Set up self-hosted CI runners
description: Sets up autoscaling self-hosted CI runners on VMs or Kubernetes with ephemeral jobs, labels, caching, network isolation and cost controls, and says when hosted runners are the better choice.
category: devops
version: 1.0.0
status: incubating
stage: [design, build, operate]
role: [devops-engineer, sre, security-engineer]
stack: [github-actions, gitlab-ci, kubernetes]
requires: [none]
inputs: [text, config]
output: [plan, config, checklist]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [self-hosted-runners, ephemeral-runners, autoscaling, runner-isolation, ci-cost]
pairs_with:
  prompts: [speed-up-ci-pipeline, review-ci-pipeline-security, set-up-keyless-ci-deploys]
args:
  - name: needs
    description: Why self-hosted runners - cost, GPUs or special hardware, private network access, larger machines - plus CI provider, expected job volume and where they would run.
    type: text
    required: true
  - name: constraints
    description: Security or platform constraints, for example "public repo", "must run in our AWS account" or "no Kubernetes".
    type: text
output_contract:
  format: markdown
  sections: [Recommendation, Architecture, Config, Security, Costs, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Self-hosted runners pay off for heavy, frequent builds, special hardware or access to private networks, but they move security and upkeep onto the team. The serious risk is persistence: a long-lived runner that executes pull request code can be backdoored by one job and then steal secrets from the next. That is why runners should be ephemeral (one job, then destroyed) and why self-hosted runners on public repositories are dangerous. Other usual failures: runner images drift from the hosted ones so builds break mysteriously, caches vanish with ephemeral machines unless an external cache is set up, idle capacity costs more than hosted minutes would have, and runners in a private network get broad access they do not need. Standard autoscalers exist: Actions Runner Controller on Kubernetes or autoscaling groups for GitHub Actions, and GitLab Runner with the Kubernetes or docker-autoscaler executors.
</context>

<task>
Design self-hosted CI runners for:
<needs>
{{needs}}
</needs>
{{#constraints}}
Constraints: {{constraints}}
{{/constraints}}

1. If job volume, CI provider or where the runners must run is unknown, ask and stop. Check first whether larger hosted runners or hosted GPU runners would meet the need, and compare rough monthly costs with assumptions shown.
2. Choose the platform (Kubernetes with the provider's controller, or VM autoscaling) and the scope (organisation, group or repository runner registration).
3. Make runners ephemeral: one job per runner, fresh from an image, auto-registered with short-lived registration tokens or a GitHub App, never a personal token.
4. Define runner groups and labels by trust level and hardware (for example `linux-x64-large`, `gpu`), and restrict which repositories and workflows can use privileged groups.
5. Network: egress limited to what builds need, no inbound access, separate subnets from production, and cloud identity per runner group with least privilege.
6. Build environment: a versioned runner image with the toolchains jobs need, rebuilt on a schedule; external caches (object storage or a registry cache) because local disks are discarded.
7. Autoscaling and cost: minimum warm runners, scale-down delay, maximum count, spot or preemptible capacity for jobs that tolerate it, and a budget alert.
8. Write example configuration for the chosen controller or autoscaler and the workflow changes (`runs-on` labels or tags).
9. Plan the rollout: one low-risk repository first, a metric to compare queue time and duration, then expand.
</task>

<constraints>
- Never recommend persistent self-hosted runners for public repositories or for untrusted pull request code.
- Do not invent controller settings or chart values; mark anything you are unsure of.
- Cost figures are estimates; show the assumptions and tell the reader to check current pricing.
- Never suggest Docker socket mounting or privileged containers without stating the isolation risk and an alternative such as rootless builds or VM isolation.
</constraints>

<output_format>
## Recommendation
Self-hosted or hosted, platform and why, in a short paragraph.

## Architecture
Runner groups, labels, network placement, identity and caches.

## Config
Example controller or autoscaler configuration and workflow changes, with paths.

## Security
A checklist of the isolation controls and who may use each runner group.

## Costs
A table: hosted versus self-hosted estimate with assumptions.

## Rollout
Pilot, metrics and expansion steps, plus image maintenance cadence.
</output_format>
