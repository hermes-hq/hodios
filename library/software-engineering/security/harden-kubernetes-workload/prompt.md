---
schema: 1
id: harden-kubernetes-workload
kind: prompt
title: Harden a Kubernetes workload
description: Hardens existing Kubernetes workloads with restricted security contexts, non-root and read-only filesystems, network policies, minimal RBAC and service account tokens, and safer secret handling.
category: security
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [devops-engineer, sre, security-engineer]
stack: [kubernetes]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [diff, report, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [pod-security-standards, security-context, network-policy, rbac, least-privilege]
pairs_with:
  prompts: [write-kubernetes-manifests, review-kubernetes-manifest-change, scan-container-images-in-ci, plan-secrets-management]
  personas: [security-auditor]
args:
  - name: workload
    description: The manifests, Helm chart or Kustomize path to harden, what the app does, and what it needs (ports, writable paths, calls to other services or the Kubernetes API).
    type: text
    required: true
  - name: cluster
    description: Cluster type and add-ons, e.g. "EKS with Cilium", "GKE Autopilot", "k3s". Leave empty if unknown.
    type: string
output_contract:
  format: markdown
  sections: [Current posture, Changes, Network policy, RBAC, Rollout, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A default pod runs as whatever user the image chose (often root), with a writable root filesystem, the default Linux capabilities, a mounted service account token that can call the Kubernetes API, and unrestricted network access to every other pod in the cluster. Container escape bugs and lateral movement both start from those defaults. The Pod Security Standards "restricted" profile is the target most workloads can meet: `runAsNonRoot`, `allowPrivilegeEscalation: false`, `capabilities.drop: [ALL]`, `seccompProfile: RuntimeDefault`, plus `readOnlyRootFilesystem` with `emptyDir` mounts for the paths the app really writes to. Network policies only work if the CNI enforces them (some managed defaults do not), and a namespace has no isolation until a default-deny policy exists. RBAC drift is common: `cluster-admin` bound to a service account "to make it work", or `get secrets` across all namespaces. Kubernetes Secrets are only base64 encoded and readable by anyone with `get secrets` in the namespace.
</context>

<task>
Harden {{workload}}.
{{#cluster}}Cluster: {{cluster}}{{/cluster}}

1. Read the manifests or rendered chart (`helm template` or `kubectl kustomize`) and record the current posture per container: user, privilege escalation, capabilities, root filesystem, seccomp, host namespaces or paths, resource limits, image tag versus digest.
2. Read the Dockerfile if present to find the user and the paths the app writes to; if the image only works as root, say what to change in the image.
3. Add security contexts to meet the restricted profile, with `emptyDir` volumes for temp, cache or socket paths, and resource requests and limits.
4. Set `automountServiceAccountToken: false` unless the app calls the Kubernetes API; if it does, give it its own service account with a namespaced Role limited to the verbs and resources it uses.
5. Write NetworkPolicies: default deny ingress and egress for the namespace, then allow only the traffic the app needs, including DNS egress. Check that the CNI enforces them.
6. Secrets: mount as files rather than env vars where the app supports it, limit who can `get secrets`, and recommend an external secret store or encryption at rest if not already used.
7. Add the namespace label for Pod Security Admission, starting in `warn` and `audit` mode before `enforce`.
8. Validate with `kubectl apply --dry-run=server` or `kubeconform`, and a policy scanner if the repo has one (kube-score, Kubescape, Polaris). Test in a non-production namespace and confirm the app starts and serves traffic.
</task>

<constraints>
- Do not apply changes to a production cluster; provide the commands for review.
- Never delete existing RBAC bindings or policies without listing what depends on them.
- When a setting would break the app (for example a read-only filesystem with no writable mount for a cache), add the needed mount instead of dropping the setting, and say so.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Current posture
Table: container, setting, current value, target value.
## Changes
The changed manifests or values in code blocks, or one line per file if edited in place.
## Network policy
The policies and the traffic each allows.
## RBAC
Service accounts, roles and the reason for each permission.
## Rollout
Order of steps, from warn mode to enforce, and how to roll back.
## Verification
Commands run and actual results.
</output_format>
