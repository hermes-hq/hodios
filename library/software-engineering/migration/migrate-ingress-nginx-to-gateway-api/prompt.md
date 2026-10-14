---
schema: 1
id: migrate-ingress-nginx-to-gateway-api
kind: prompt
title: Migrate from ingress-nginx to Gateway API
description: Moves ingress-nginx Ingress resources to Gateway API or another maintained controller, mapping annotations, TLS, rewrites and canaries, with a side-by-side cutover.
category: migration
version: 1.0.0
status: incubating
stage: [plan, build, operate]
role: [devops-engineer, sre]
stack: [kubernetes]
requires: [repo-read, file-write, shell]
inputs: [config, repo]
output: [config, plan, checklist]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [ingress-nginx, gateway-api, httproute, annotations, traffic-cutover]
pairs_with:
  prompts: [configure-kubernetes-ingress, upgrade-kubernetes-cluster, plan-incremental-migration]
  personas: [migration-engineer]
args:
  - name: setup
    description: The current Ingress manifests or Helm values, ingress-nginx annotations and ConfigMap settings in use, cert-manager or other TLS setup, and the target if already chosen.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Inventory, Target design, Converted resources, Cutover plan, Behaviour differences, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The community ingress-nginx controller was retired by the Kubernetes project in March 2026 and gets no further releases or security fixes, so clusters need to move to Gateway API or a maintained controller. The Ingress objects themselves are easy; the behaviour lives in `nginx.ingress.kubernetes.io/*` annotations and the controller ConfigMap, and none of it carries over automatically. Some annotations map to core Gateway API features: `rewrite-target` to a `URLRewrite` filter, `ssl-redirect` to a `RequestRedirect` filter on an HTTP listener, canary weights to weighted `backendRefs`, gRPC backends to `GRPCRoute`. Others become implementation-specific policies (timeouts in some cases, body size, rate limits, external auth, CORS on older implementations). `configuration-snippet` and `server-snippet` have no equivalent and must be understood and rebuilt. Regex paths (`use-regex`) are implementation-specific. Silent differences cause outages: ingress-nginx defaults such as a 1 MB request body limit, 60 second proxy timeouts, forwarded headers and path normalization may not match the new implementation. Gateway API separates the platform-owned `Gateway` from app-owned routes, so ownership must be decided. A conversion tool (ingress2gateway) gives a starting point, not a finished result.
</context>

<task>
Setup: {{setup}}

1. Read every Ingress, the controller ConfigMap and Helm values. Build the inventory of hosts, paths, TLS secrets and annotations, including global settings.
2. Choose the target implementation with the user if not chosen, and design Gateways, listeners, TLS (cert-manager integration) and route ownership.
3. Convert each Ingress to routes. For each annotation, use the core feature if one exists, an implementation policy if not, and list the rest as gaps with options. Never drop an annotation silently.
4. Write down every default that differs and set it explicitly where the app depends on it (body size, timeouts, headers, path matching).
5. Plan the cutover: run the new implementation alongside with its own load balancer address, test each host by resolving it to the new address, then switch DNS with a lowered TTL, keeping the old controller until traffic drains.
6. Give verification commands for route status, certificates and a per-host smoke test. Do not apply anything to a cluster; leave applying to the user.
</task>

<constraints>
- Do not apply, delete or modify cluster resources; produce manifests and commands for the user to run.
- Do not claim an annotation maps exactly when semantics differ; say how.
- Do not invent policy resource names for an implementation; check its documentation or mark "to verify".
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Inventory
Table: Ingress | hosts | annotations used | Gateway API equivalent | gap.
## Target design
Controller or Gateway implementation, Gateway and listener layout, who owns which resources, TLS.
## Converted resources
The new manifests, with notes per annotation that changed meaning.
## Cutover plan
Side-by-side run, test method, DNS switch, rollback.
## Behaviour differences
Defaults that change (timeouts, body size, headers, path matching) and how each is handled.
## Remaining risks
Bullets, or "None".
</output_format>
