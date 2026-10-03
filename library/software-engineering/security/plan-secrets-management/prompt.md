---
schema: 1
id: plan-secrets-management
kind: prompt
title: Plan secrets management
description: Plans secrets management for a stack, covering inventory, storage, runtime injection, rotation, access control and leak detection. Use when secrets live in env files, CI variables and chat.
category: security
version: 1.0.0
status: incubating
stage: [plan, design]
role: [devops-engineer, security-engineer, sre, tech-lead]
stack: []
requires: [none]
inputs: [text, config]
output: [plan, table, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
tags: [secrets, vault, rotation, workload-identity, secret-scanning]
pairs_with:
  personas: [security-auditor, devops-engineer]
  prompts: [respond-to-leaked-secret, review-cloud-iam-policy, harden-web-app-config]
args:
  - name: stack
    description: Where the code runs (cloud, Kubernetes, VMs, serverless), CI/CD system, languages, current secret locations (env files, CI variables, config repos), team size and any compliance needs.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Current state, Target design, Secret inventory, Rotation, Access control, Leak detection, Migration plan, Open questions]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-03
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Most leaked credentials are long-lived keys copied into env files, CI variables, container images, logs and chat, shared by many services and never rotated because nobody knows what would break. The strongest move is to need fewer secrets at all: workload identity and short-lived credentials issued by the platform (cloud IAM roles for workloads, OIDC federation from CI to the cloud) replace static keys. What remains belongs in one managed store, is injected at runtime with least privilege, has an owner and a rotation path, and is scanned for in code and logs.
</context>

<task>
Plan secrets management for:
<stack>
{{stack}}
</stack>

1. **Current state.** Summarise where secrets live today and the main risks (shared keys, no rotation, secrets in git history or images, broad CI access). If the input does not say, list what to find out.
2. **Target design.**
   - Eliminate first: list which secrets can be replaced by workload identity, OIDC federation from CI, managed database IAM authentication or short-lived tokens, using the platform's native mechanism.
   - Store: recommend one secrets store that fits the stack (the cloud provider's secret manager, HashiCorp Vault or OpenBao, or sealed or encrypted files with SOPS for small GitOps setups) and say why; name the trade-off you are accepting.
   - Inject: how secrets reach workloads at runtime (Kubernetes External Secrets or CSI driver, platform-native references, fetching at start-up), never baked into images or committed. Prefer files or in-memory over environment variables where the stack allows, and say why.
   - Local development: how developers get non-production secrets without copying production ones.
3. **Inventory.** A table template plus the rows you can fill from the input: secret, purpose, owner, environments, consumers, store path, rotation method and frequency, blast radius if leaked.
4. **Rotation.** Per secret type (database passwords, API keys for third parties, signing keys, TLS certificates, encryption keys): automated or manual, frequency, a dual-secret or overlap window so rotation causes no downtime, and the emergency rotation runbook outline.
5. **Access control.** Least privilege per workload and per environment, separate production access, break-glass access with logging, audit logs on read, and who can create or read which paths.
6. **Leak detection.** Pre-commit and CI secret scanning, the repository host's push protection, scanning container images and logs, log redaction, and the alert-to-rotation path when something is found.
7. **Migration plan.** Ordered phases starting with the highest blast radius secrets, each with the steps, the verification, and how to roll back.
</task>

<constraints>
- Never ask for or repeat actual secret values. If the input contains any, say they must be treated as leaked and rotated, and refer to them by name only.
- Recommend tools by capability first and product second; do not invent product features. When unsure, say "check the documentation".
- Scale the plan to the team: a three-person startup does not need a self-hosted Vault cluster.
- Do not claim compliance with a standard; say which controls support it.
{{> output/uncertainty}}
</constraints>

<output_format>
## Current state
Bullets of findings and risks.
## Target design
Subsections: Eliminate, Store, Inject, Local development. Include a short config or diagram sketch where it helps.
## Secret inventory
A table.
## Rotation
A table by secret type: method, frequency, overlap approach.
## Access control
Bullets.
## Leak detection
Bullets, with where each check runs.
## Migration plan
Numbered phases with verification and rollback.
## Open questions
Numbered.
</output_format>
