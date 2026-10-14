---
schema: 1
id: set-up-gitops-delivery
kind: prompt
title: Set up GitOps delivery
description: Sets up GitOps delivery to Kubernetes with Argo CD or Flux, covering repo layout, environment overlays, image promotion, sync and pruning policy, secrets, drift handling and rollback.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [devops-engineer, sre]
stack: [kubernetes]
requires: [none]
inputs: [text, config, repo]
output: [config, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [gitops, argo-cd, flux, continuous-delivery, environment-promotion, drift]
pairs_with:
  personas: [devops-engineer, platform-engineer]
  prompts: [design-ci-cd-pipeline, write-helm-chart, design-deployment-strategy]
args:
  - name: current_setup
    description: How services are deployed today (for example "CI runs kubectl apply"), number of services, clusters and environments, Helm or Kustomize usage, and how secrets are handled.
    type: text
    required: true
  - name: tool
    description: GitOps controller to use.
    type: enum
    enum: [argo-cd, flux, undecided]
    default: undecided
output_contract:
  format: markdown
  sections: [Decisions, Repository layout, Controller config, Promotion flow, Secrets, Rollback and drift]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
GitOps makes a Git repository the desired state of each cluster and lets a controller in the cluster pull and reconcile it, so CI no longer needs cluster credentials and every change has a commit. The design choices that matter: separating application source from deployment configuration (a config repo or a dedicated folder) so image bumps do not trigger application CI loops; one directory per environment with overlays rather than branches per environment, which drift and are painful to merge; how a new image reaches the config (CI commits a tag bump or an image automation controller does it), and how promotion from staging to production is gated (a pull request someone approves); automated sync with or without pruning and self-heal, which decides whether manual `kubectl` edits are reverted; secrets, which cannot go into Git in plain text (sealed or encrypted secrets, or an external secrets operator reading a secret manager); and rollback, which should be a Git revert rather than a controller-only rollback that the next sync undoes. Argo CD offers a UI, ApplicationSets and sync waves; Flux is lighter and composes with Kustomize and Helm controllers.
</context>

<task>
Tool: {{tool}}

<current_setup>
{{current_setup}}
</current_setup>

1. Record decisions: tool choice (if undecided, recommend one in a few lines with reasons), monorepo config folder versus separate config repo, Helm versus Kustomize per service, and pull-request gates per environment.
2. Propose the repository layout with base and environment overlays, cluster bootstrap, and shared platform components, as a directory tree.
3. Write the controller configuration: the application or kustomization objects per environment (or a generator such as ApplicationSet), sync policy with prune and self-heal settings chosen per environment, health checks, ordering of dependent resources, and notifications.
4. Define the promotion flow: how CI publishes an immutable image tag or digest, how it is written to the staging overlay, how promotion to production happens through a reviewed pull request, and how hotfixes take the same path.
5. Choose the secrets approach and show one example manifest.
6. Define rollback (Git revert with the expected time to recover), drift handling (alerts on out-of-sync, policy on manual changes), and the controller's own access scope.
7. Give a migration plan from the current setup, one service first, with how to stop CI applying directly.
</task>

<constraints>
- Do not put secrets in Git unencrypted, and do not give CI cluster-admin credentials in the target design.
- Use resource kinds and fields that exist in the chosen tool; mark version-specific fields to verify.
- Keep environment configuration in folders, not long-lived environment branches, unless the user has a stated reason.
{{> output/uncertainty}}
</constraints>

<output_format>
## Decisions
Bullets with one-line reasons.

## Repository layout
Directory tree.

## Controller config
YAML code blocks.

## Promotion flow
Numbered steps from merge to production.

## Secrets
Approach and an example.

## Rollback and drift
Bullets, then the migration plan.
</output_format>
