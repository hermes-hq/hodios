---
schema: 1
id: review-kubernetes-manifest-change
kind: prompt
title: Review a Kubernetes manifest change
description: Reviews Kubernetes manifest changes for missing or harmful probes, resource requests and limits, rollout and shutdown gaps, disruption budgets, and selector or label mismatches.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [devops-engineer, sre, backend-engineer]
stack: [kubernetes]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [probes, resource-limits, rolling-updates, high-availability, pull-request]
pairs_with:
  personas: [devops-engineer]
  prompts: [review-pull-request, write-kubernetes-manifests, review-config-only-change]
  rules: [iac-style-rules]
args:
  - name: diff
    description: The manifest or Helm template diff with file paths, plus rendered output (`helm template`) if templates are involved.
    type: text
    required: true
  - name: context
    description: Cluster type and version, replica counts, how the app behaves at startup and shutdown (startup time, SIGTERM handling), autoscaling, and whether the change is applied by GitOps or by hand.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A manifest can be valid YAML, pass `kubectl apply` and still cause an outage at the next deploy or node drain. Probes are the first place to look. Without a readiness probe, traffic arrives before the app can serve it. A liveness probe that checks dependencies (database, downstream APIs) restarts every pod when that dependency blips, turning a partial outage into a full one; liveness should only detect a stuck process. A slow-starting app with only a liveness probe gets killed in a crash loop; `startupProbe` covers the boot. Resources: a pod with no requests is scheduled as if it needed nothing and is evicted first; a memory limit below real peak use means OOMKilled under load; CPU limits cause throttling, a trade-off rather than a defect. Rollouts: one replica with `maxUnavailable: 1` (or `Recreate`) means downtime on every deploy, and pods are removed from endpoints asynchronously, so an app that exits immediately on SIGTERM drops in-flight requests unless a `preStop` delay and graceful shutdown cover the gap within `terminationGracePeriodSeconds`. A PodDisruptionBudget is what keeps a node drain from taking every replica at once, and a PDB that allows zero disruptions blocks drains entirely. Selectors: a Deployment's `selector` is immutable, a Service whose selector does not match pod labels has no endpoints, and a selector that matches another app's pods sends it traffic. Setting `replicas` in a Deployment that an HPA controls resets the scale on every apply. ConfigMap changes do not restart pods by themselves. Mutable image tags such as `latest` make rollbacks meaningless.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open the full manifests (or rendered Helm output) for every object the change touches and the objects that select or are selected by them (Services, HPAs, PDBs, NetworkPolicies), before judging any hunk. Run read-only checks if available (`kubectl diff`, `kubectl apply --dry-run=server`, a schema validator) and report the results. If you only have the diff, say which conclusions depend on files you could not see.
2. Check probes for each container: readiness present and checking the app's own ability to serve, liveness not checking external dependencies and with thresholds that tolerate pauses, `startupProbe` for slow boots, and ports and paths that match the container.
3. Check resources: requests on every container, memory limits against known usage, requests and limits consistent with the intended QoS class, and init or sidecar containers forgotten.
4. Check rollout and shutdown: strategy and `maxUnavailable` or `maxSurge` against the replica count, `preStop` and `terminationGracePeriodSeconds` against how long requests and connections take to drain, image tags that are immutable, and `replicas` set alongside an HPA.
5. Check availability: PodDisruptionBudget present for multi-replica services and not blocking drains, replicas spread across nodes or zones (`topologySpreadConstraints` or anti-affinity), and single points of failure introduced by the change.
6. Check wiring: Deployment selector changes (immutable), Service and NetworkPolicy selectors matching the right pods, port names and numbers consistent across Service, container and probes, ConfigMap or Secret references that exist in the target namespace, and config changes that need a rollout to take effect.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (outage or dropped traffic on deploy or drain, cascading restarts, Service with no or wrong endpoints, apply that fails on an immutable field), medium (OOM kills under load, eviction risk, drains blocked), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Do not apply, delete, scale or restart anything in a cluster; only read-only commands such as `kubectl diff` or server-side dry runs, and only against a context the user confirms.
- Treat CPU limits and similar trade-offs as questions with the trade-off stated, not as defects.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the object and field, the defect, the triggering event (deploy, node drain, load spike, dependency outage), the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
