---
schema: 1
id: set-up-local-kubernetes-dev
kind: prompt
title: Set up a local Kubernetes dev loop
description: Sets up a local Kubernetes inner loop with kind or k3d plus Tilt or Skaffold for live updates, a local registry, the team's real manifests and a one-command start and teardown.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [software-engineer, backend-engineer, devops-engineer]
stack: [kubernetes, docker]
requires: [repo-read, file-write]
inputs: [repo, spec]
output: [config, docs]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [local-development, kind, tilt, skaffold, inner-loop]
pairs_with:
  prompts: [write-docker-compose, convert-compose-to-kubernetes, write-devcontainer-config]
args:
  - name: services
    description: The services developers work on and the dependencies they need locally, and how manifests are packaged today (plain, Kustomize, Helm).
    type: text
    required: true
  - name: machines
    description: Developer machines (macOS with Apple silicon, Linux, Windows with WSL), memory available, and the container runtime (Docker Desktop, Colima, Podman, OrbStack).
    type: string
output_contract:
  format: markdown
  sections: [Assumptions, Tool choice, Files, Daily workflow, Troubleshooting]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A local cluster is worth its weight only when the inner loop is fast: edit code, see it running in seconds. Rebuilding an image, pushing it to a remote registry and redeploying on every change takes minutes and teams give up. The fast path is a local cluster (kind or k3d, both run Kubernetes in containers) with a local registry or direct image loading, plus a dev loop tool: Tilt (live update syncs changed files into running containers and restarts the process, with a UI of resource status) or Skaffold (file sync and rebuild-and-redeploy, CLI-first, also reusable in CI). The point of doing this instead of Compose is fidelity: the same Helm chart or Kustomize base as production, with a local overlay that lowers replicas and resources, disables TLS or uses a local issuer, and swaps managed dependencies for in-cluster ones. Apple silicon needs multi-architecture or arm64 images; memory limits on Docker Desktop or Colima are the usual cause of "pods pending".
</context>

<task>
Set up a local Kubernetes development loop for:
{{services}}
{{#machines}}
Machines: {{machines}}
{{/machines}}

1. Read the repository first: Dockerfiles (multi-stage, dev targets), the manifests or charts and their overlays or values, how each service starts, and any existing Compose or Tilt or Skaffold config.
2. Choose kind or k3d and Tilt or Skaffold, with a short reason (team preference, need for a UI, reuse in CI, ingress needs).
3. Cluster config: a config file that creates the cluster with a local registry (or image loading), port mappings for ingress, and a pinned Kubernetes version close to production.
4. Local overlay or values: built on the production manifests, with 1 replica, small resource requests, local secrets from a git-ignored file or generated dev values, in-cluster dependencies (with pinned images) where production uses managed services, and an ingress host such as `*.localhost`.
5. Dev loop config: per service, the image build, the files to sync live and the command to restart, port forwards, resource dependencies so dependencies start first, and labels or groups in the UI.
6. Scripts or make targets: `dev up` (create cluster if missing, start the loop), `dev down` (stop), `dev reset` (delete cluster after confirmation), and how to seed data.
7. If the tools are installed, run the cluster creation and the loop for one service and report what happened; otherwise say not run.
</task>

<constraints>
- Reuse the production manifests through an overlay or values file; do not write a separate parallel set.
- No real secrets in any committed file.
- Pin the cluster's Kubernetes version and dependency images.
- Never delete a cluster or volumes without the user confirming.
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Tool choice
Short paragraph.
## Files
Fenced blocks with paths: cluster config, overlay or values, Tiltfile or skaffold.yaml, scripts.
## Daily workflow
Numbered steps for a new developer and for everyday use.
## Troubleshooting
Bullets: symptom, cause, fix (pending pods from memory limits, arm64 images, port conflicts, slow file sync).
</output_format>
