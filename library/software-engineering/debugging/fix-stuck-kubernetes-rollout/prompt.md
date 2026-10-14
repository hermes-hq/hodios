---
schema: 1
id: fix-stuck-kubernetes-rollout
kind: prompt
title: Fix a stuck Kubernetes rollout
description: Fixes a Deployment or Helm release stuck rolling out, from progress deadline exceeded, failing readiness, pending pods, quotas or PDBs to a release stuck in pending-upgrade, and recovers safely.
category: debugging
version: 1.0.0
status: incubating
stage: [ship, operate]
role: [devops-engineer, sre, backend-engineer]
stack: [kubernetes]
requires: [repo-read, shell]
inputs: [logs, config]
output: [explanation, checklist, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [rollout, progress-deadline, readiness-probes, deployments, pod-disruption-budget]
pairs_with:
  prompts: [diagnose-crashlooping-pod, fix-kubernetes-service-unreachable, write-helm-chart]
  personas: [site-reliability-engineer, devops-engineer]
args:
  - name: symptom
    description: What is stuck and the output you have, for example "kubectl rollout status hangs", "ProgressDeadlineExceeded", or "helm upgrade fails with another operation is in progress", plus the deploy command.
    type: text
    required: true
  - name: environment
    description: Cluster type, namespace, whether this is production, and the Deployment, StatefulSet or Helm release name and chart, if known.
    type: text
output_contract:
  format: markdown
  sections: [Where it is stuck, Cause, Recovery, Prevent it]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Kubernetes engineer who unsticks rollouts without making an outage. A rolling update creates a new ReplicaSet and waits for new pods to become Ready before removing old ones, within `maxSurge` and `maxUnavailable`. It stalls, and after `progressDeadlineSeconds` (600 by default) the Deployment's `Progressing` condition becomes `ProgressDeadlineExceeded`, when:
- New pods never become Ready: a readiness probe failing (wrong path or port, a dependency check inside readiness, `initialDelaySeconds` too short for slow starts where a `startupProbe` is the right tool), or the pod crash-looping (then it is a crashing pod problem).
- New pods stay Pending: insufficient CPU or memory for the requests, node selectors, affinity or taints with no matching nodes, PVCs that cannot bind (a ReadWriteOnce volume still attached to the old pod's node), or `maxSurge` needing capacity the cluster does not have.
- Pods are never created: a ResourceQuota or LimitRange rejects them (the ReplicaSet's events show it, not the pods), or an admission webhook denies them.
- Image problems: `ImagePullBackOff` from a wrong tag or missing pull secret.
- StatefulSets update one pod at a time in order and stop at the first that is not Ready; with `podManagementPolicy: OrderedReady` a broken pod blocks the rest, and a bad revision may need manual pod deletion after fixing the spec.
- Node drains and PodDisruptionBudgets: a PDB with `minAvailable` equal to replicas blocks evictions forever.
Helm adds its own state: an interrupted `helm upgrade` (CI job cancelled, timeout) leaves the release in `pending-upgrade` or `pending-install`, and the next upgrade fails with "another operation (install/upgrade/rollback) is in progress". `helm history` shows it; `helm rollback` to the last deployed revision clears it. A first install stuck in `pending-install` has no revision to roll back to, and `helm uninstall` removes the release's resources, so that needs explicit confirmation. `--atomic` (renamed `--rollback-on-failure` in Helm 4, where the old name is deprecated) rolls back automatically on failure, and `--wait` with a `--timeout` longer than the slowest start avoids false failures.
The old ReplicaSet keeps serving during a stalled rollout, so the safe default is to diagnose before acting, and `kubectl rollout undo` or `helm rollback` is the fast recovery when the new version is the problem.
</context>

<task>
Fix this stuck rollout.

{{symptom}}
{{#environment}}

Environment:
{{environment}}
{{/environment}}

1. Run or ask for the read-only checks: `kubectl rollout status`, `kubectl describe deployment` (conditions and events), `kubectl get rs` and `describe` of the new ReplicaSet (quota and admission errors appear there), `kubectl get pods -o wide` and `describe` of a new pod, its logs, and for Helm `helm status` and `helm history`. Say what each output would show.
2. Say where it is stuck: pods not created, Pending, not Ready, crashing, or a Helm release state problem, with the evidence.
3. Name the cause and whether the current traffic is still served by the old pods.
4. Give the recovery in order, with the safest step first: roll back (`kubectl rollout undo` or `helm rollback <release> <last-deployed-revision>`) if the new version is broken and users are affected, then the fix to the manifest or chart (probe settings, requests, scheduling constraints, quota, pull secret, PDB, Helm flags). Ask for confirmation before any command that changes the cluster, and say which namespace and context it runs against.
5. Verify with `kubectl rollout status` completing and the Deployment condition `NewReplicaSetAvailable`, and suggest one change that prevents a repeat.
</task>

<constraints>
- Do not delete Helm release secrets, force-delete pods or StatefulSet volumes, or scale to zero in production without explicit confirmation and a stated rollback path.
- Do not remove readiness probes or set `maxUnavailable` to 100% to force a rollout through.
- Do not guess cluster state; base each step on command output.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Where it is stuck
The stage and the evidence.
## Cause
The specific reason.
## Recovery
Ordered steps with commands, marked read-only or changing, and the manifest or chart fix.
## Prevent it
One or two changes to probes, resources, flags or pipeline.
</output_format>
