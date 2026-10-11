---
schema: 1
id: upgrade-kubernetes-cluster
kind: prompt
title: Plan a Kubernetes cluster version upgrade
description: Plans an EKS, GKE or AKS minor version upgrade with removed API detection, add-on and controller compatibility, control plane then node pool order, disruption checks and rollback options.
category: devops
version: 1.0.0
status: incubating
stage: [plan, maintain]
role: [devops-engineer, sre]
stack: [kubernetes]
requires: [none]
inputs: [config, text]
output: [plan, checklist]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [cluster-upgrade, deprecated-apis, node-pools, version-skew, maintenance-window]
pairs_with:
  prompts: [set-up-kubernetes-autoscaling, write-kubernetes-manifests, plan-disaster-recovery]
args:
  - name: cluster
    description: Managed service, current and target versions, node pools or node groups (managed, self-managed, Karpenter), and how the cluster is managed (console, Terraform, eksctl).
    type: text
    required: true
  - name: installed
    description: Add-ons and controllers installed with versions (CNI, CoreDNS, kube-proxy, CSI drivers, ingress, cert-manager, service mesh, operators), and output of a deprecated-API scan if available.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Summary, Breaking changes, Compatibility, Pre-flight, Upgrade steps, Rollback, Post-checks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Managed Kubernetes forces upgrades: each minor version has a support window, after which the provider upgrades for you or charges extended support. Control planes upgrade one minor version at a time and generally cannot be downgraded (check whether your provider offers a rollback-safe or two-step upgrade mode), so the real rollback for a bad control plane upgrade is restoring workloads to another cluster, which is why the pre-flight work matters. The usual breakages are: manifests, Helm releases or operators still using API versions removed in the target (found with tools such as kubent or pluto, or the API server's deprecated-API metrics and audit logs); add-ons (CNI, CoreDNS, kube-proxy, CSI drivers) that must be upgraded to versions supported on the target; controllers and operators with their own compatibility matrix; and node drains blocked by PodDisruptionBudgets that allow zero disruptions, or by single-replica workloads with local storage. Kubelets may lag the control plane by a limited number of minor versions (check the version skew policy for the target), so node pools follow the control plane, ideally via blue-green node pools or surge upgrades rather than in-place.
</context>

<task>
Plan this upgrade:
{{cluster}}
Installed: {{installed}}

1. Summary: the version path (one minor version per step if more than one), support dates if known (say if you are unsure), and the expected window.
2. Breaking changes: removed and deprecated APIs between the versions, and notable behaviour changes. Say which you know from the release notes and which the user must confirm from the provider's upgrade insights or the official changelog.
3. Compatibility: a table of every listed add-on and controller, its current version, the minimum version supported on the target (or "check the project's compatibility matrix" when unsure), and whether to upgrade it before or after the control plane.
4. Pre-flight: run a deprecated-API scan on live resources and Helm release manifests, fix PodDisruptionBudgets that block drains, check single-replica and local-storage workloads, confirm backups (Velero or equivalent) and IaC state, upgrade in a non-production cluster first, and freeze deploys for the window.
5. Upgrade steps: add-ons that must move first, control plane, managed add-ons, then node pools via surge or a new pool with cordon and drain of the old one, with the command or IaC change per step and the check that gates the next.
6. Rollback: what can be rolled back (node pools, add-ons) and what cannot (the control plane), and the fallback for a failed control plane upgrade.
7. Post-checks: node versions, system pods healthy, workloads ready, ingress and DNS working, autoscaling working, and the error rates to watch.
</task>

<constraints>
- Never suggest skipping minor versions on the control plane.
- Do not claim specific removed APIs or support dates you are not sure of; list them as "verify" with where to check.
- Do not run upgrade commands; this is a plan with commands for the user.
{{> output/uncertainty}}
</constraints>

<output_format>
## Summary
Short paragraph.
## Breaking changes
Table: change | affects | action | confidence.
## Compatibility
Table: component | current | needed for target | when to upgrade.
## Pre-flight
Checklist.
## Upgrade steps
Numbered steps with commands or IaC changes and gate checks.
## Rollback
Bullets.
## Post-checks
Checklist.
</output_format>
