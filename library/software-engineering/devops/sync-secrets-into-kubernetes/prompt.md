---
schema: 1
id: sync-secrets-into-kubernetes
kind: prompt
title: Sync secrets into Kubernetes from a secret store
description: Sets up External Secrets Operator, the Secrets Store CSI driver or Sealed Secrets so Kubernetes workloads get secrets from a cloud secret manager with rotation and nothing in plain text in git.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre, security-engineer]
stack: [kubernetes]
requires: [repo-read, file-write]
inputs: [spec, config, repo]
output: [config, plan]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [external-secrets, sealed-secrets, secret-rotation, workload-identity]
pairs_with:
  prompts: [plan-secrets-management, set-up-gitops-delivery, write-least-privilege-iam-policy]
args:
  - name: situation
    description: Where secrets live today (env files, CI variables, plain Secrets in git, a vault), which secret manager to use, how apps consume them (env vars or files), and whether GitOps (Argo CD, Flux) is in use.
    type: text
    required: true
  - name: cluster
    description: Managed service and Kubernetes version, and what is already installed.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Approach, Manifests, Identity and access, Rotation, Migration, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Kubernetes Secrets are only base64-encoded, so committing them to git publishes them, and GitOps makes the temptation stronger. Three patterns solve it with different trade-offs. External Secrets Operator reads from a cloud secret manager or Vault and writes ordinary Kubernetes Secrets on a refresh interval: apps need no changes, but the values do exist as Secrets in etcd, so etcd encryption and RBAC on Secrets matter. The Secrets Store CSI driver mounts secrets as files straight from the store, with optional sync to Secrets; it needs a volume in every pod. Sealed Secrets encrypts values with a cluster key so the ciphertext can live in git; there is no central store, rotation is manual, and losing the controller's private key loses every secret. Rotation only reaches the app if it re-reads: environment variables are fixed at pod start, so a changed secret needs a rollout (a reloader controller or a checksum annotation) unless the app reads mounted files. The operator should authenticate with workload identity, not a static cloud key stored as a Secret.
</context>

<task>
Set up secret delivery for:
{{situation}}
Cluster: {{cluster}}

1. If a repository is available, read existing Secret manifests, Helm values, GitOps config and how each app reads configuration; list every secret found in git as a finding.
2. Choose External Secrets Operator, the CSI driver or Sealed Secrets for this situation and justify the choice in a few sentences against the other two.
3. Write the manifests: for ESO a `SecretStore` or `ClusterSecretStore` and one `ExternalSecret` per app with `refreshInterval`, target name and key mapping; for CSI a `SecretProviderClass` and the pod volume; for Sealed Secrets the `kubeseal` workflow and a `SealedSecret` example with placeholders.
4. Identity and access: workload identity for the operator or driver (IRSA or Pod Identity, GKE Workload Identity, AKS workload identity), with read access limited to the secret paths for that cluster and environment; RBAC so only the right namespaces can use a store.
5. Rotation: how a changed value reaches running pods (refresh interval plus a reloader or checksum annotation, or file re-read), and the order for rotating a database password without downtime (dual credentials or overlap).
6. Migration: move each secret into the store, switch the app, verify, delete the plain Secret from git, and rotate every value that was ever committed, since git history still holds it.
7. Mention etcd encryption at rest and RBAC on Secrets as remaining controls.
</task>

<constraints>
- No secret values anywhere in the output; use placeholders.
- Do not install controllers or apply manifests; write files and commands.
- Use the current API versions of the chosen tool; mark any field you are unsure of.
- Any secret found in git must be reported as needing rotation, not just removal.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Approach
The choice and reasons.
## Manifests
Fenced `yaml` blocks with file paths.
## Identity and access
The identity binding and cloud permissions, as config.
## Rotation
Numbered steps.
## Migration
Numbered steps per app or group.
## Verify
Commands to confirm the Secret is synced or mounted, that the pod sees the value (without printing it), and that git contains no secret values.
</output_format>
