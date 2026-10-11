---
schema: 1
id: deduplicate-kubernetes-manifests
kind: prompt
title: Deduplicate per-environment Kubernetes YAML
description: Turns copy-pasted per-environment Kubernetes manifests into a Kustomize base with overlays or Helm values, diffing the rendered output to prove each environment is unchanged.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [devops-engineer, sre]
stack: [kubernetes]
requires: [repo-read, file-write, shell]
inputs: [repo, config]
output: [plan, diff, table]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [kustomize, helm-values, manifest-overlays, rendered-diff]
pairs_with:
  prompts: [write-kubernetes-manifests, write-helm-chart]
args:
  - name: manifests
    description: The manifest folders per environment, as paths, how they are deployed today (kubectl apply, Argo CD, Flux, a CI job) and whether Kustomize or Helm is already in use.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Differences per environment, Approach, New layout, Rendered diff, Rollout]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Per-environment copies of the same manifests drift: a probe fixed in production but not staging, an image tag bumped in one place. The fix is a single base plus per-environment differences, and the proof is that the rendered output for each environment is byte-for-byte what is applied today, apart from intended changes. Kustomize (base and overlays with patches, `images`, `replicas`, `configMapGenerator`) suits teams that want plain YAML and few variables; Helm suits many similar services or heavy parameterisation, at the cost of templating logic. Pick what the repo or delivery tool already uses.

Rendering traps that change live objects: `configMapGenerator` and `secretGenerator` append a content hash to names, which renames objects and triggers rollouts unless `disableNameSuffixHash` is set; `namePrefix` and `commonLabels` change names and selectors, and a changed Deployment selector is immutable, so apply fails; `commonLabels` also rewrites selectors, so prefer `labels` with `includeSelectors: false`; strategic merge patches replace lists without merge keys; Helm adds its own labels and may reorder fields. GitOps tools prune objects that disappear from the rendered output, which can delete a production resource if a file is missed.
</context>

<task>
Deduplicate {{manifests}}.

1. Inventory every resource per environment and diff the environments against each other, listing what genuinely differs (replicas, resources, image tags, hostnames, config values, extra resources in one environment) and what is accidental drift.
2. Choose Kustomize or Helm with the reason, and propose the layout: base, overlays or values files, and how each difference is expressed. List drift items separately for the user to decide; do not resolve drift silently. Wait for approval.
3. Before changing files, render the current state of each environment (concatenate the existing files, or `kubectl kustomize` or `helm template` if already used) and save it.
4. Build the base and overlays, render each environment, and diff against the saved output with a semantic YAML diff (for example `dyff` or normalised `diff`). Iterate until the only differences are approved ones.
5. Present the rendered diff summary per environment and a rollout plan: `kubectl diff` or the GitOps tool's diff against the live cluster, lower environments first, pruning disabled or checked until the output is confirmed.
</task>

<constraints>
- Rendered output per environment must match today's, except for differences the user approved; resource names, selectors and namespaces never change unintentionally.
- Never run `kubectl apply`, `delete` or a sync against a cluster; only render and diff. Live-cluster diffs and applies are the user's to run.
- Keep secrets out of plain-text values files; keep the existing secret mechanism.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Differences per environment
Table: resource, field, dev, staging, prod, intended or drift.
## Approach
Kustomize or Helm and why.
## New layout
File tree and the diff.
## Rendered diff
Per environment: identical, or each remaining difference.
## Rollout
Live diff and apply order for the user.
</output_format>
