---
schema: 1
id: set-up-mutual-tls
kind: prompt
title: Set up mutual TLS between services
description: Plans and implements mutual TLS between internal services with a private CA, automated certificate issuance and rotation, identity-based authorization and a staged permissive-to-strict rollout.
category: security
version: 1.0.0
status: incubating
stage: [design, build, ship]
role: [devops-engineer, sre, backend-engineer, security-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo, config, spec]
output: [plan, config, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [mtls, service-identity, certificate-rotation, private-ca, zero-trust]
pairs_with:
  prompts: [design-service-to-service-auth, plan-secrets-management, harden-kubernetes-workload, review-cryptography-usage]
  personas: [security-auditor]
args:
  - name: services
    description: The services that talk to each other, how they run (Kubernetes, VMs, serverless), languages, and any mesh, proxy or PKI already in place.
    type: text
    required: true
  - name: goal
    description: Why mTLS now, e.g. a compliance requirement, a flat network, or replacing shared API keys between services.
    type: text
output_contract:
  format: markdown
  sections: [Approach, Identity and CA, Rotation, Authorization, Rollout, Failure modes, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
mTLS gives each service a cryptographic identity, but most of the work is operational. The two classic outages are expired certificates and a CA rotation that some clients never picked up, so short-lived certificates with automated renewal (hours to days, not years) are safer than long-lived ones that someone has to remember. There are three implementation paths: a service mesh (Istio, Linkerd, Cilium) that does it transparently in sidecars or the node; an identity system such as SPIFFE/SPIRE or cert-manager issuing certificates the apps load themselves; or a reverse proxy in front of each service. A mesh is the least code but the most platform. mTLS alone only proves who is calling; without authorization based on the peer identity (the SPIFFE ID or certificate SAN), any service with a certificate can call any other. Turning on strict mode in one step breaks every client that is not ready, which is why meshes offer a permissive mode that accepts both plain and mutual TLS.
</context>

<task>
Set up mutual TLS for: {{services}}
{{#goal}}Goal: {{goal}}{{/goal}}

1. Read the deployment config and the code that makes service-to-service calls. List each caller, callee, protocol (HTTP, gRPC, database, queue) and current auth between them.
2. Recommend one approach (mesh, identity system with app-loaded certs, or proxy) for this setup, with the reason and the operational cost. Ask before committing if the choice depends on something unknown, such as whether the team can run a mesh.
3. Design identity and the CA: naming scheme for identities (per service, not per instance), where the root and intermediate keys live, and how the root is protected (offline or managed CA service).
4. Design rotation: certificate lifetime, renewal before expiry, how apps reload certificates without restart, and how to roll the CA itself with an overlap period where both CAs are trusted.
5. Add authorization by peer identity: which identities may call which service and route, expressed in the mesh policy or in app middleware.
6. Plan the rollout: permissive mode or dual listeners, metrics on how much traffic is plain versus mutual, then strict per service once all callers use mTLS.
7. Implement the first service pair in the repo (config, policy, any app changes for loading certificates), validate configs, and run what tests exist.
8. List failure modes and their alerts: certificate expiry, clock skew, CA mismatch, and SAN mismatch after a service rename.
</task>

<constraints>
- Never put private keys in the repo, images or logs; keys are generated where they are used or delivered by the issuing system.
- Do not switch any service to strict mode as part of this change; leave that as a later, explicit step.
- Do not invent product features or flags; if unsure whether a mesh or tool supports something, say so and how to check.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Approach
The chosen path, the reason, and the alternatives rejected.
## Identity and CA
Identity naming, CA hierarchy and key protection.
## Rotation
Lifetimes, renewal, reload and CA rollover steps.
## Authorization
Table: callee, allowed caller identities, routes.
## Rollout
Numbered stages with the metric that gates each.
## Failure modes
Table: failure, symptom, alert, fix.
## Verification
Config validation and tests run, with results.
</output_format>
