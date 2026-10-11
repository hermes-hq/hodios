---
schema: 1
id: set-up-kubernetes-autoscaling
kind: prompt
title: Set up Kubernetes autoscaling
description: Sets up pod and node autoscaling for a Kubernetes workload with HPA or KEDA on the right signal, correct resource requests, scale-down stabilisation, disruption budgets and a load test to prove it.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre, backend-engineer]
stack: [kubernetes]
requires: [none]
inputs: [config, text]
output: [config, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [autoscaling, hpa, keda, cluster-autoscaler, resource-requests, capacity]
pairs_with:
  personas: [devops-engineer, site-reliability-engineer]
  prompts: [write-kubernetes-manifests, write-helm-chart, plan-service-scaling]
args:
  - name: workload
    description: The Deployment or StatefulSet manifest (or its key parts), what it does (HTTP API, queue worker, batch), traffic shape, startup time, and current replica count and resource usage.
    type: text
    required: true
  - name: cluster
    description: Kubernetes version, managed service, node autoscaler in use (Cluster Autoscaler, Karpenter or similar) and metrics available (metrics-server, Prometheus, queue metrics).
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Scaling signal, Manifests, Node capacity, Failure modes, Load test]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Autoscaling fails quietly when its inputs are wrong. The Horizontal Pod Autoscaler computes CPU and memory utilisation as a percentage of requests, so missing or inflated requests make it scale too late or never; memory is a poor scaling signal for most runtimes because memory rarely drops when load does. Queue workers should scale on queue depth or lag (KEDA or external metrics), not CPU; latency-sensitive APIs may scale better on requests per second per pod. Scale-up must account for startup time (image pull, warm-up, readiness), and scale-down needs a stabilisation window so the workload does not flap. Pods only help if nodes exist for them: the node autoscaler adds nodes based on pending pods and requests, takes minutes, and needs disruption budgets and safe-to-evict settings to scale down without breaking things. Vertical Pod Autoscaler in update mode conflicts with an HPA on the same CPU or memory metric. Minimum replicas cover the zone or node failure case, and maximum replicas must fit the database connection budget and downstream limits.
</context>

<task>
Cluster: {{cluster}}

<workload>
{{workload}}
</workload>

1. Choose the scaling signal for this workload and justify it: CPU, a custom or external metric (requests per second, queue depth, consumer lag) or a schedule. Say why other signals are worse here.
2. Check and correct resource requests from the stated usage, explaining how requests drive both HPA maths and node packing; set limits deliberately (often no CPU limit, a memory limit near the request).
3. Write the autoscaler manifest: HPA `autoscaling/v2` or a KEDA `ScaledObject`, with min and max replicas justified, target values, and `behavior` with scale-up and scale-down policies and a stabilisation window based on startup time and traffic shape.
4. Write supporting pieces: readiness probe that reflects real readiness, a PodDisruptionBudget, topology spread across zones, and graceful shutdown (`preStop` and termination grace period) so scale-down does not drop requests or jobs.
5. Check node capacity: will the node autoscaler provision nodes in time, are there instance types and quotas for max replicas, and how long does a scale-up take end to end.
6. List failure modes: metric source down, scaling against a downstream limit (database connections, rate limits), flapping, and cost runaway; add guards for each.
7. Write a load test plan that ramps load, records replicas, latency and pending pods, and confirms scale-down.
</task>

<constraints>
- Use API versions and fields valid for the stated Kubernetes version; mark uncertain ones.
- Do not set max replicas without checking a downstream limit, or say which limit must be checked.
- Do not combine VPA in auto mode with an HPA on the same resource metric.
{{> output/uncertainty}}
</constraints>

<output_format>
## Scaling signal
Choice and reasoning.

## Manifests
YAML code blocks for requests, autoscaler, PDB and related changes.

## Node capacity
Bullets with timings and limits.

## Failure modes
Table: Failure | Effect | Guard.

## Load test
Steps and what to record.
</output_format>
