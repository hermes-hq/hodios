---
schema: 1
id: write-helm-chart
kind: prompt
title: Write a Helm chart
description: Writes a Helm chart for a service with a validated values schema, shared helpers, probes, resources, per-environment values and safe upgrades. Use when a service needs a reusable, versioned chart.
category: devops
version: 1.0.1
status: incubating
stage: [build, ship]
role: [devops-engineer, sre, backend-engineer]
stack: [kubernetes]
requires: [none]
inputs: [text, config]
output: [config, code]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [helm-chart, packaging, chart-versioning, values-schema]
pairs_with:
  personas: [devops-engineer]
  prompts: [write-kubernetes-manifests, design-deployment-strategy]
args:
  - name: service
    description: The service - image, ports, health endpoints, config and secrets it reads, dependencies, statefulness and expected traffic.
    type: text
    required: true
  - name: requirements
    description: Chart requirements - environments, ingress controller, autoscaling, how secrets are provided (existing Secret, External Secrets, CSI), migrations, and where the chart will be published.
    type: text
output_contract:
  format: markdown
  sections: [Chart layout, Files, Values reference, Validation, Upgrade safety, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
  - {version: 1.0.1, note: "Migration hooks no longer read chart-created config that does not exist yet or is stale, and upgrade safety covers automatic rollback and what rollback leaves behind."}
---
<context>
A Helm chart is a package with a lifecycle, not just templated YAML. The problems show up on the second install and the tenth upgrade: a renamed label that changes a Deployment's immutable selector and blocks every upgrade, a values key typo that silently does nothing, a ConfigMap change that never restarts pods, secrets committed in values files, a pre-upgrade migration hook that runs twice, and charts nobody can configure without reading every template. A good chart validates its values, exposes a small documented surface, keeps resource names and selectors stable, and can be linted, rendered and tested before it reaches a cluster.
</context>

<task>
Write a Helm chart for:
<service>
{{service}}
</service>
{{#requirements}}
Requirements:
{{requirements}}
{{/requirements}}

1. If the image, port or health endpoints are missing, ask and stop. For anything else unspecified, choose the safe default and list it under Open questions.
2. `Chart.yaml`: `apiVersion: v2`, a chart `version` (semver, bumped on every chart change) separate from `appVersion` (the application release).
3. `values.yaml`: every key commented, grouped (image, replicas, resources, probes, ingress, autoscaling, security, extra env). Image tag defaults to empty and falls back to `appVersion`; support pinning by digest. No secret values: reference an existing Secret by name or the mechanism given in the requirements.
4. `values.schema.json` with types, required keys and enums, so `helm install` rejects a typo or a wrong type.
5. `templates/_helpers.tpl` with name, fullname, chart, standard `app.kubernetes.io/*` labels and a separate, minimal selector-labels helper. Selector labels never include the version or chart, because Deployment selectors are immutable.
6. Templates: Deployment (rolling update with `maxUnavailable: 0`, startup, readiness and liveness probes that check different things, requests and limits, `securityContext` with non-root, read-only root filesystem and dropped capabilities, topology spread), Service, ServiceAccount, optional Ingress, HorizontalPodAutoscaler and PodDisruptionBudget, ConfigMap, and a checksum annotation on the pod template so config changes roll the pods.
7. Migrations, if any: a Job with the pre-upgrade and pre-install hook annotations, a hook delete policy, a backoff limit, and a note that the migration must be backward compatible with the running version. Hooks run before the release's own resources are applied, so the Job cannot read a ConfigMap or Secret the chart creates (on install it does not exist yet; on upgrade it still holds the old values): give the Job its configuration directly, use an externally managed Secret, or make those resources hooks with a lower `helm.sh/hook-weight`. Hook resources are not part of the release, so `helm rollback` does not undo a migration.
8. `templates/NOTES.txt` with how to reach the service, and `templates/tests/` with a `helm test` connection check.
9. Per-environment values files (for example `values-staging.yaml`, `values-prod.yaml`) holding only the differences.
</task>

<constraints>
- Keep resource names and selector labels stable across chart versions; if a change would alter them, call it out as breaking and bump the chart's major version.
- Use `required` with a clear message for values that have no safe default.
- No `lookup` or cluster-dependent template logic unless asked; the chart must render offline.
- Do not add subcharts for databases or caches the service uses unless the requirements ask for them.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Chart layout
A tree of the chart's files.
## Files
One fenced block per file, with its path as a heading.
## Values reference
Table: key, default, description.
## Validation
Commands: `helm lint`, `helm template` piped to a schema checker such as kubeconform, `helm test`, and a dry-run upgrade, with what each catches.
## Upgrade safety
Bullets: what changes are breaking for this chart, how to make a failed upgrade roll back on its own (`--wait` with the automatic rollback flag of the Helm version in use, `--atomic` in Helm 3), how manual rollback works (`helm rollback`) and what it does not undo, and how to preview an upgrade (`helm diff` plugin or a dry run).
## Open questions
Numbered, or "None".
</output_format>
