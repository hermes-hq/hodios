---
schema: 1
id: configure-kubernetes-rbac
kind: prompt
title: Configure Kubernetes RBAC
description: Writes Kubernetes Roles, ClusterRoles and bindings for teams, CI pipelines and service accounts with least privilege, mapped to cloud identities, and checks access with kubectl auth can-i.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, security-engineer, sre]
stack: [kubernetes]
requires: [repo-read, file-write]
inputs: [spec, config, repo]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [rbac, least-privilege, service-accounts, access-control]
pairs_with:
  prompts: [write-kubernetes-network-policies, review-cloud-iam-policy, write-policy-as-code]
args:
  - name: subjects
    description: Who needs access and to do what, e.g. "team A deploys to namespace a-prod via CI, developers read logs in all app namespaces, on-call can restart pods, an operator watches CRDs cluster-wide".
    type: text
    required: true
  - name: cluster
    description: Managed service (EKS, GKE, AKS, other), Kubernetes version, and how people and CI authenticate (IAM, OIDC groups, cloud groups).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Access matrix, Manifests, Identity mapping, Risky permissions, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Kubernetes RBAC is additive only (there are no deny rules), so every binding widens access and the only way to restrict is to grant less. Several permissions are effectively cluster-admin in disguise: `create` on pods (or anything that creates pods, like Deployments and Jobs) in a namespace lets the holder mount any Secret and service account token in that namespace; `get`/`list` on Secrets reveals every credential; `escalate`, `bind` and `impersonate` allow granting oneself more; `nodes/proxy` and `pods/exec` give code execution; and wildcard verbs or resources pick up future resource types automatically. ClusterRoles bound with a RoleBinding apply only in that namespace, which is the clean way to reuse a role. Human access should come from groups in the identity provider, mapped through EKS access entries, GKE IAM plus Google Groups for RBAC, or AKS Entra ID integration, not per-user bindings or shared kubeconfigs. CI should use a dedicated identity per pipeline and namespace, and pods should use dedicated service accounts with `automountServiceAccountToken: false` when they never call the API.
</context>

<task>
Write RBAC for these subjects:
{{subjects}}
Cluster: {{cluster}}

1. If a repository is available, read existing Roles, ClusterRoles, bindings, service accounts and the cluster's auth configuration, and note bindings to `cluster-admin` or wildcard rules already present.
2. Build an access matrix: subject (group, CI identity, service account), namespaces, resources, verbs, and the reason. Where a request implies a dangerous permission, say what it really grants.
3. Prefer built-in ClusterRoles (`view`, `edit`, `admin`) bound per namespace when they fit; write custom Roles only where they do not. Never grant Secrets read to humans by default; separate log access (`pods/log`) from exec.
4. Write manifests: Roles or ClusterRoles with explicit resources and verbs, RoleBindings per namespace, ClusterRoleBindings only for truly cluster-wide needs, service accounts for workloads and CI with token automount off where unused.
5. Identity mapping: how groups and CI identities map into Kubernetes subjects on this managed service (access entries, IAM bindings or Entra groups), with short-lived credentials for CI (OIDC federation) rather than long-lived tokens.
6. Break-glass: how cluster-admin is obtained in an emergency, audited and removed.
</task>

<constraints>
- No wildcard verbs or resources, and no `cluster-admin` bindings except the documented break-glass path.
- Flag every grant of pods create, secrets read, exec, escalate, bind, impersonate or nodes/proxy with what it allows.
- Do not apply manifests to a cluster; write files and commands.
- Only use API groups, resources and managed-service features that exist; mark any you are unsure of.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Access matrix
Table: subject | namespaces | resources | verbs | reason.
## Manifests
Fenced `yaml` blocks with file paths.
## Identity mapping
Steps or config for the managed service.
## Risky permissions
Bullets: each sensitive grant left in place and why.
## Verify
`kubectl auth can-i` commands (with `--as` or `--as-group`) for allowed and denied actions per subject, with expected yes or no.
</output_format>
