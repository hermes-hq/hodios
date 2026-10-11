---
schema: 1
id: configure-kubernetes-ingress
kind: prompt
title: Configure Kubernetes ingress and TLS
description: Configures Kubernetes Ingress or Gateway API routes with an ingress controller, cert-manager TLS, host and path rules, timeouts, body size limits and redirects for one or more services.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, sre, backend-engineer]
stack: [kubernetes]
requires: [repo-read, file-write]
inputs: [spec, config, repo]
output: [config, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [ingress, gateway-api, cert-manager, tls-certificates, routing]
pairs_with:
  prompts: [write-kubernetes-manifests, set-up-domain-and-https, fix-kubernetes-service-unreachable]
args:
  - name: routes
    description: Hostnames, paths and the Services and ports behind them, plus needs such as websockets, large uploads, gRPC, long requests or IP allow-lists.
    type: text
    required: true
  - name: cluster
    description: Managed service or distribution, Kubernetes version, the ingress controller or Gateway implementation in use (or none yet), and whether cert-manager is installed.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Controller choice, Manifests, DNS and certificates, Verify]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Ingress resources are portable only in their basic fields; everything that matters in practice (timeouts, body size, websockets, rewrites, rate limits) lives in controller-specific annotations, so an annotation for one controller silently does nothing on another. The community ingress-nginx controller was retired by the Kubernetes project in March 2026 and gets no further releases or security fixes, so new setups should pick a maintained controller or move to the Gateway API, which puts these settings into typed resources (`Gateway`, `HTTPRoute`, policies) and separates the platform team's listener from each app team's routes. cert-manager issues certificates from an `Issuer` or `ClusterIssuer`; HTTP-01 challenges need the host to resolve to the load balancer first, and wildcard certificates need DNS-01. Let's Encrypt staging should be used until the setup works, because production rate limits are easy to hit while debugging. `ingressClassName` must be set explicitly when more than one controller exists, and `pathType: Prefix` matches by path segment, not string prefix.
</context>

<task>
Configure ingress for:
{{routes}}
Cluster: {{cluster}}

1. If a repository is available, read existing Ingress, Gateway, HTTPRoute, Service and cert-manager resources and the controller's installed values, and follow their conventions.
2. Controller choice: if one is installed and maintained, use it; otherwise recommend Gateway API with a named maintained implementation, or a maintained Ingress controller, and say why. Do not install anything; describe the install step.
3. Write the routing resources: hosts, paths with the right `pathType`, backend Services and ports, `ingressClassName` or `parentRefs`, HTTP to HTTPS redirect, and per-route settings the user needs (timeouts, body size, websockets, gRPC) using the chosen controller's real annotation names or policy resources.
4. TLS: a `ClusterIssuer` for the staging and production ACME endpoints with the right solver (HTTP-01, or DNS-01 for wildcards and private clusters), certificates per host or wildcard, and the secret names referenced from the routes.
5. Hardening: limit exposed hosts to those listed, add security headers if the controller supports them, IP allow-lists where asked, and no default backend that exposes internal services.
6. Explain DNS records to create and the order: load balancer address, DNS, staging certificate, then switch to production issuer.
</task>

<constraints>
- Only use annotations and fields that exist for the chosen controller and Kubernetes version; mark any you are unsure of. Never mix annotation prefixes from different controllers.
- No real email addresses or credentials in manifests; use placeholders and Secret references.
- Do not apply manifests to a cluster; write files and the commands for the user.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Controller choice
One short paragraph.
## Manifests
Fenced `yaml` blocks with file paths.
## DNS and certificates
Numbered steps in order.
## Verify
Commands and expected results: `kubectl describe` on the route and certificate, `curl -v` for redirect and certificate issuer, and checks for each special need (websocket upgrade, large upload).
</output_format>
