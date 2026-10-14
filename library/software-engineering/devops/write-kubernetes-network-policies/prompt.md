---
schema: 1
id: write-kubernetes-network-policies
kind: prompt
title: Write Kubernetes network policies
description: Writes Kubernetes NetworkPolicies for a namespace or app starting from default deny, allowing only required pod, namespace, DNS and egress flows, with a staged rollout and connectivity tests.
category: devops
version: 1.0.0
status: incubating
stage: [build]
role: [devops-engineer, security-engineer, sre]
stack: [kubernetes]
requires: [repo-read, file-write]
inputs: [config, spec, repo]
output: [config, tests, checklist]
risk: edits-files
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [network-policy, default-deny, zero-trust, cni, egress-control]
pairs_with:
  prompts: [write-kubernetes-manifests, configure-kubernetes-rbac, fix-kubernetes-service-unreachable]
args:
  - name: flows
    description: The workloads in scope (namespaces, labels) and who must talk to whom, including ingress controller, monitoring scrapers, databases, external APIs and DNS.
    type: text
    required: true
  - name: cluster
    description: The CNI plugin (Calico, Cilium, cloud provider's), Kubernetes version and managed service.
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Assumptions, Flow matrix, Policies, Rollout, Tests]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Kubernetes allows all pod traffic by default, so one compromised pod can reach every database in the cluster. NetworkPolicies fix that, with traps: they do nothing unless the CNI enforces them; once any policy selects a pod for a direction, everything not allowed in that direction is denied; a default-deny egress policy breaks DNS unless UDP and TCP 53 to the cluster DNS pods are allowed; `namespaceSelector` and `podSelector` in the same `from` entry mean AND, while separate entries mean OR, which is the most common bug; and plain NetworkPolicy cannot match DNS names or Layer 7, so egress to an external API is either a CIDR (which changes) or needs a CNI-specific policy (Cilium or Calico). Namespaces are selected by labels, so use the automatic `kubernetes.io/metadata.name` label rather than custom labels someone may forget. Ingress controllers, monitoring scrapers and webhooks from the API server are flows people forget until they break.
</context>

<task>
Write NetworkPolicies for:
{{flows}}
CNI and cluster: {{cluster}}

1. If a repository is available, read the workloads' labels, Services and ports, and any existing policies. Confirm the CNI enforces NetworkPolicy; if it may not, say so first.
2. Build a flow matrix: source, destination, port and protocol, and why it is needed. Include DNS, the ingress controller, metrics scraping, health checks from the node or load balancer if applicable, and egress to databases and external services. List unknowns rather than inventing flows.
3. Write a default-deny policy for ingress and egress per namespace, then one allow policy per flow or per workload, using pod labels and the `kubernetes.io/metadata.name` namespace label. Get the AND/OR structure of selectors right and explain it in a comment where it matters.
4. Egress to external services: CIDR-based policy with the caveat that IPs change, or a CNI-specific FQDN policy if the CNI supports it, named as such.
5. Rollout: apply allow policies first, then default deny per namespace starting in non-production; use the CNI's audit or flow-log mode where available to find missed flows before enforcing.
6. Tests: a connectivity test plan with ephemeral test pods (`kubectl run` with a curl or netcat image) that checks each allowed flow succeeds and a sample of denied flows fails, including DNS.
</task>

<constraints>
- Never apply default deny without DNS egress allowed, unless the user says pods need no DNS.
- Use only the `networking.k8s.io/v1` NetworkPolicy fields, or clearly labelled CNI-specific resources.
- Do not apply policies to a cluster yourself; write files and commands for the user.
{{> output/uncertainty}}
</constraints>

<output_format>
## Assumptions
Bullets.
## Flow matrix
Table: from | to | port/protocol | reason.
## Policies
Fenced `yaml` blocks with file paths, default deny first.
## Rollout
Numbered steps.
## Tests
Commands per flow with expected outcome.
</output_format>
