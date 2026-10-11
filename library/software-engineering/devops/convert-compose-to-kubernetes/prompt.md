---
schema: 1
id: convert-compose-to-kubernetes
kind: prompt
title: Convert Docker Compose to Kubernetes manifests
description: Converts a docker-compose.yml into Kubernetes manifests, mapping services, volumes, env files, depends_on, healthchecks and networking, and listing what has no direct equivalent.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, backend-engineer, software-engineer]
stack: [kubernetes, docker]
requires: [repo-read, file-write]
inputs: [file, repo]
output: [config, table, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [compose-file, manifest-conversion, container-orchestration]
pairs_with:
  prompts: [write-kubernetes-manifests, write-docker-compose, sync-secrets-into-kubernetes]
args:
  - name: compose_file
    description: The docker-compose.yml (and any override files and env file variable names, without secret values).
    type: text
    required: true
  - name: target
    description: The target cluster and environment, e.g. "EKS staging", "local kind cluster", and whether databases in the compose file should move to managed services.
    type: text
    required: true
  - name: packaging
    description: Output format.
    type: enum
    enum: [plain, kustomize, helm]
    default: kustomize
output_contract:
  format: markdown
  sections: [Mapping, Manifests, Not carried over, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Automatic converters such as Kompose produce manifests that run but carry Compose habits into a cluster where they do not hold. Things that do not map one-to-one: `depends_on` has no equivalent, so ordering becomes readiness probes plus retries in the app (or an init container that waits, as a stopgap); `build:` must become an image pushed to a registry with a tag; bind mounts of source code are a development pattern and must not reach a cluster; named volumes become PersistentVolumeClaims, and a service with a volume becomes a StatefulSet or, better, a managed service; `ports` publishing becomes a Service plus an Ingress or Gateway route, and service-to-service calls use Service DNS names, which usually match Compose service names if kept; `env_file` splits into a ConfigMap for config and a Secret (from a secret store) for credentials; `healthcheck` becomes readiness and liveness probes; `restart` policies are replaced by the controller; `profiles` and one-off containers become Jobs or are dropped. Compose also often runs dev-only tools (mail catchers, admin UIs) that should not be deployed.
</context>

<task>
Convert this Compose setup for {{target}}, packaged as {{packaging}}:
<compose>
{{compose_file}}
</compose>

1. If a repository is available, read the Dockerfiles, the env variable usage in code and any existing Kubernetes files, and match names and ports.
2. Classify each Compose service: app workload (Deployment), stateful dependency (StatefulSet, operator or managed service, with a recommendation), one-off task (Job), or dev-only (drop, with reason).
3. Build a mapping table from every Compose key in use to its Kubernetes equivalent or "no equivalent", including `build`, `image`, `command`, `entrypoint`, `environment`, `env_file`, `ports`, `expose`, `volumes`, `depends_on`, `healthcheck`, `restart`, `deploy.resources`, `networks` and `profiles`.
4. Write the manifests: Deployments with pinned image tags, probes derived from the healthchecks, resource requests (from `deploy.resources` or marked as estimates), non-root security context where the image allows; Services keeping the Compose service names for DNS; ConfigMaps for non-secret config; Secret references by name for credentials; PVCs or a managed service note for data; an Ingress or Gateway route for published ports that must be public.
5. Replace `depends_on`: say which services must tolerate a dependency not being ready, and add an init container only as a stopgap where the app cannot retry.
6. List everything not carried over and what the user must do about it (image build and push, bind mounts, host networking, dev-only services, secrets to create).
7. If kubectl and a cluster or `kubectl kustomize`/`helm template` are available, render and dry-run the output; otherwise say not run.
</task>

<constraints>
- No secret values from the env file in manifests; list the Secret keys the user must create.
- Do not deploy bind mounts of source code or Docker socket mounts to the cluster; flag them.
- Do not apply to a cluster; client-side render or dry-run only.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Mapping
Table: compose service or key | Kubernetes object | notes.
## Manifests
Fenced `yaml` blocks with file paths in the chosen packaging.
## Not carried over
Bullets with the action for each.
## Verify
Render or dry-run results, or "not run" with the commands, then smoke checks after deploy.
</output_format>
