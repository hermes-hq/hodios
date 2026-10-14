---
schema: 1
id: kubernetes-manifest-rules
kind: rule
title: Kubernetes manifest rules
description: Standing rules for Kubernetes YAML covering requests and limits, probes, non-root securityContext, standard labels, pinned images, config and secrets, disruption budgets and rollouts.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre]
stack: [kubernetes]
requires: [none]
output: [config]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [manifests, probes, resource-limits, pod-security, kustomize]
applies_to: ["**/k8s/**/*.yaml", "**/kubernetes/**/*.yaml", "**/manifests/**/*.yaml", "**/charts/**", "**/kustomization.yaml"]
pairs_with:
  rules: [iac-style-rules]
  prompts: [write-kubernetes-manifests, review-kubernetes-manifest-change, harden-kubernetes-workload]
  personas: [platform-engineer]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Kubernetes manifests in this project:

**Know the setup first**
- Check how manifests are managed (plain YAML, Kustomize overlays, Helm charts, GitOps with Argo CD or Flux) and the cluster version. Change the source of truth (the base, overlay or chart values), not rendered output, and never suggest `kubectl edit` on live resources as the fix.
- Use API versions the cluster supports; do not use removed beta APIs.

**Images**
- Use an explicit image tag or digest, never `latest` or no tag. Leave `imagePullPolicy` at the default for tagged images unless there is a reason.

**Resources**
- Every container has CPU and memory `requests`. Set a memory `limit` (usually equal to the request for predictable behaviour). Be careful with CPU limits; they cause throttling, so follow the project's policy.
- Base numbers on observed usage if available; if not, state that the values are starting estimates to tune.

**Health and lifecycle**
- Add a `readinessProbe` for any container that receives traffic and a `livenessProbe` only if the app can hang without exiting. Liveness must not check dependencies like the database, or one outage restarts every pod. Use a `startupProbe` for slow starters instead of a long liveness delay.
- Make sure the app handles `SIGTERM` and set `terminationGracePeriodSeconds` to cover in-flight work. Add a short `preStop` sleep if the load balancer needs time to remove the pod.
- Run at least two replicas for services that must stay up, add a `PodDisruptionBudget`, and spread pods across nodes or zones with `topologySpreadConstraints` where the cluster has them.
- Set a rollout strategy (`maxUnavailable`, `maxSurge`) that keeps capacity during deploys.

**Security**
- Set a `securityContext`: `runAsNonRoot: true`, `allowPrivilegeEscalation: false`, `readOnlyRootFilesystem: true` where the app allows (with `emptyDir` for writable paths), drop all capabilities, and `seccompProfile: RuntimeDefault`. No `privileged`, `hostNetwork`, `hostPath` or `hostPID` without an explicit, documented reason.
- Give each workload its own `ServiceAccount` with least-privilege RBAC, and `automountServiceAccountToken: false` when it does not call the API.
- Add `NetworkPolicy` rules if the cluster enforces them.

**Config and secrets**
- Put configuration in `ConfigMap`s and sensitive values in `Secret`s (or an external secrets operator), referenced from the pod spec. Never write secret values in plain manifests in the repository; plain `Secret` YAML is only base64-encoded.
- Changing a mounted ConfigMap does not restart pods; use a checksum annotation or Kustomize's generated names so config changes roll out.

**Labels and naming**
- Use the recommended labels (`app.kubernetes.io/name`, `instance`, `version`, `component`, `part-of`, `managed-by`) consistently, and make selectors match only stable labels. Selectors of a Deployment are immutable.
- Set the namespace explicitly in the overlay or chart, not by relying on the current context.

**Before you finish**
- Render the manifests (`kustomize build` or `helm template`), validate them with the project's tools (kubeconform, kube-linter, policy checks), and use `kubectl diff` or a server-side dry run against a non-production cluster if available. Do not apply to production yourself. Say what you ran.
