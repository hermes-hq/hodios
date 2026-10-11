---
schema: 1
id: deploy-to-kubernetes-from-ci
kind: prompt
title: Deploy to Kubernetes from CI
description: Writes a push-based CI deploy to Kubernetes with helm upgrade or kubectl apply, rollout status waits, automatic rollback on failure, image pinning by digest and narrowly scoped cluster credentials.
category: devops
version: 1.0.0
status: incubating
stage: [ship]
role: [devops-engineer, backend-engineer, sre]
stack: [kubernetes, github-actions, gitlab-ci]
requires: [repo-read, file-write]
inputs: [repo, config]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [push-based-deploy, kubectl, continuous-deployment, rollout, cluster-credentials]
pairs_with:
  prompts: [set-up-gitops-delivery, write-helm-chart, set-up-keyless-ci-deploys]
args:
  - name: target
    description: What to deploy (Helm chart, Kustomize or plain manifests), which cluster and namespaces per environment, the CI system and how the image is built.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Flow, Config, Cluster access, Rollback, Verify, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A CI job that runs `kubectl apply` and exits green tells you nothing: the apply succeeds the moment the API server accepts the object, while the pods may be crash-looping. A useful deploy waits for the rollout (`helm upgrade --install --wait --timeout` or `kubectl rollout status`), fails the job when the rollout fails, and rolls back automatically (`--atomic` for Helm, `rollout undo` for plain manifests). The second common problem is credentials: a cluster-admin kubeconfig stored as a CI secret means anyone who can edit a workflow owns the cluster. Cloud OIDC federation to a role that maps to a namespace-scoped Kubernetes service account removes the stored kubeconfig. Images should be referenced by digest or immutable tag so the deploy is reproducible and a rollback restores exactly the previous version. Push-based deploys suit small teams; GitOps controllers suit many clusters and drift correction.
</context>

<task>
Write the CI deploy to Kubernetes for:
<target>
{{target}}
</target>

1. Read the repository: chart or manifests, values per environment, the image build job, and existing CI files. Note whether readiness probes are defined, because rollout waits are only meaningful with them; flag missing probes.
2. Write a deploy job per environment that depends on the image build and receives the image digest or immutable tag as input.
3. Deploy with `helm upgrade --install --atomic --wait --timeout` (or `kubectl apply` followed by `kubectl rollout status --timeout` and `rollout undo` on failure). Run `helm diff` or `kubectl diff` first if the plugin or command is available, and print it to the log.
4. Cluster access: OIDC federation from CI to the cloud (EKS, GKE, AKS) and a Kubernetes role bound to a service account or group limited to the target namespace and the resource kinds the chart creates. Avoid stored kubeconfigs; if unavoidable, scope them the same way.
5. Protect production with a protected environment and approval, and serialise deploys per environment with a concurrency group.
6. After the rollout, run a smoke check against the service (a health endpoint through the ingress or a port-forward) and fail the job if it does not pass.
7. Write the files and run the CI linter plus `helm lint` or `helm template` and `kubectl --dry-run=client` if available.
</task>

<constraints>
- Never use a cluster-admin credential for deploys.
- Never deploy `latest` or a mutable tag.
- Do not run commands against a real cluster while writing this; changes are to files only.
- Do not invent chart values or cluster names; use placeholders and list them.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Flow
Build, diff, deploy, wait, smoke check and rollback, as a numbered list.

## Config
CI files with paths and full contents.

## Cluster access
The cloud role, Kubernetes Role and RoleBinding, and what they allow.

## Rollback
What rolls back automatically and the manual command to roll back further.

## Verify
Lint and render results or "not run", and what to watch on the first deploy.

## Follow-ups
Missing probes, placeholders to fill, and when to consider GitOps instead. "None" if empty.
</output_format>
