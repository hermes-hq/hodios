---
schema: 1
id: provision-kubernetes-cluster-with-terraform
kind: prompt
title: Provision a Kubernetes cluster with Terraform
description: Provisions an EKS, GKE or AKS cluster with Terraform, covering network and IP planning, node pools, private API access, workload identity, managed add-ons and settings that keep upgrades easy.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre]
stack: [terraform, kubernetes, aws, gcp, azure]
requires: [repo-read, file-write]
inputs: [repo, spec, text]
output: [config, report]
risk: edits-files
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [eks, gke, aks, node-pools, workload-identity]
pairs_with:
  prompts: [upgrade-kubernetes-cluster, design-vpc-network, set-up-gitops-delivery]
args:
  - name: cluster
    description: The cluster to create, for example "a production EKS cluster for 20 services in eu-west-1, private API, autoscaling nodes".
    type: text
    required: true
  - name: notes
    description: "Cloud and region, existing network (VPC or VNet ids, CIDRs), Terraform layout and state backend, module policy (public modules allowed or not), expected workload size, compliance needs, how workloads will be deployed (Helm, GitOps)."
    type: text
output_contract:
  format: markdown
  sections: [Design, Code, Plan review, After apply, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most cluster regrets come from decisions that cannot be changed later without rebuilding. IP planning is the big one: on EKS the default VPC CNI gives every pod a VPC address, so small subnets run out (prefix delegation helps); on GKE, VPC-native clusters need secondary ranges for pods and services sized up front; on AKS, Azure CNI Overlay avoids consuming VNet addresses, and kubenet is being retired. The API endpoint should be private or restricted to known CIDRs. Cluster access and pod identity have current, recommended mechanisms: EKS access entries instead of editing the `aws-auth` ConfigMap, and EKS Pod Identity or IRSA for pods; GKE Workload Identity Federation; AKS Microsoft Entra ID integration and workload identity. A separate system node pool, tainted for critical add-ons, keeps them away from noisy workloads. Managed add-ons (CoreDNS, kube-proxy, CNI, CSI drivers) should be pinned and upgraded with the cluster. Upgrade-friendly settings: a release channel or pinned version with maintenance windows, node pool surge settings, and `ignore_changes` on desired node counts when an autoscaler (Cluster Autoscaler, Karpenter, or the cloud's own) owns them. Managing in-cluster resources (Helm releases, manifests) in the same Terraform state as the cluster creates provider chicken-and-egg problems and fragile applies; keep them in a separate stack or hand them to GitOps. Control plane logs and secrets encryption with a managed key should be on from day one.
</context>

<task>
Provision this cluster with Terraform:
<cluster>
{{cluster}}
</cluster>
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the Terraform layout: providers and versions, state backend, environment structure, existing network code, module conventions and tagging. Follow them.
2. Write the design: cloud and region, Kubernetes version and upgrade channel, network and IP ranges with headroom calculated from expected pods and nodes, API endpoint access, node pools (system and workload, instance types, min and max, spot or not), autoscaler choice, identity for humans and pods, add-ons, logging and encryption. Flag decisions that cannot be changed after creation.
3. Write the code using a well-maintained module if the policy allows (pinned to an exact version) or provider resources otherwise: cluster, node pools, network pieces that do not exist yet, IAM or role bindings for access, pod identity setup, managed add-ons pinned, control plane logging, secrets encryption key.
4. Keep in-cluster workloads out of this state: no Helm releases or manifests beyond what the cluster needs to exist; describe the handoff to the separate stack or GitOps tool.
5. Add outputs needed by other stacks (cluster name, endpoint, OIDC issuer or identity details) without secrets, and `ignore_changes` where an autoscaler manages sizes.
6. Run `terraform fmt`, `terraform validate` and a plan if credentials are available; list what to review in the plan.
7. List post-apply checks: get credentials through the intended access path, nodes ready in each pool, a test pod scheduled on the workload pool, a test pod using workload identity to reach a cloud API, DNS and image pulls working.
</task>

<constraints>
- Do not run `terraform apply`; produce code and a plan for review.
- Do not make the API endpoint public without restriction unless the user confirms it.
- Do not grant cluster admin to broad groups or use long-lived static credentials for access.
- Do not invent module inputs or resource arguments; check the module or provider documentation and mark anything unconfirmed.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Design
Decisions table with the "cannot change later" items marked, and the IP sizing calculation.
## Code
Files with paths and contents.
## Plan review
fmt, validate and plan results or "not run", and what to check in the plan.
## After apply
Checklist of post-apply checks with commands.
## Follow-ups
Add-ons and workloads for the separate stack, cost items (such as NAT), upgrade schedule.
</output_format>
