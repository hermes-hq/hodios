---
schema: 1
id: tune-kubernetes-resources
kind: prompt
title: Right-size Kubernetes requests and limits
description: Sets CPU and memory requests and limits for Kubernetes workloads from real usage metrics, fixing OOMKills and CPU throttling and cutting idle reserved capacity, with VPA used as a recommender.
category: devops
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [devops-engineer, sre, backend-engineer]
stack: [kubernetes]
requires: [none]
inputs: [config, logs, dataset]
output: [config, report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [resource-requests, right-sizing, oomkilled, cpu-throttling, vpa]
pairs_with:
  prompts: [set-up-kubernetes-autoscaling, diagnose-crashlooping-pod, reduce-cloud-spend]
args:
  - name: workloads
    description: The containers' current requests and limits, and usage data per container over at least a week (p50, p95, max CPU and memory, throttling ratio, OOMKill and restart counts), from Prometheus, the provider's monitoring or VPA recommendations.
    type: text
    required: true
  - name: runtime
    description: Language runtime and its memory settings (JVM heap flags, Node max-old-space-size, Go GOMEMLIMIT), and whether an HPA scales these workloads.
    type: text
output_contract:
  format: markdown
  sections: [Findings, Recommendations, Runtime settings, Rollout, Watch]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Requests are what the scheduler reserves and what you pay for on a busy cluster; limits are what the kernel enforces. Memory over the limit is an OOMKill; CPU over the limit is throttling, which shows up as latency spikes even when average CPU looks low, because the CFS quota is enforced per 100 ms period and multi-threaded runtimes burn it in bursts. Practical defaults: memory request near p95 to p99 usage plus headroom and memory limit equal to the request (predictable, Guaranteed-style memory); CPU request near p90 to p95 sustained usage and often no CPU limit, unless the cluster is multi-tenant and noisy neighbours matter. Runtimes must know their limit: a JVM sized from host memory, a Node heap above the container limit, or a Go service without GOMEMLIMIT will be OOMKilled while "using little memory" by their own metrics. Averages lie: size from percentiles over a period that includes peaks, batch runs and deploy-time warm-up. HPA targets are percentages of requests, so changing requests changes scaling behaviour.
</context>

<task>
Right-size these workloads:
{{workloads}}
{{#runtime}}
Runtime: {{runtime}}
{{/runtime}}

1. Check the data: period covered, whether it includes peak traffic and batch or startup spikes, and whether metrics are per container. If the data cannot support a recommendation for a container, say so and say what to collect.
2. Findings per container: over-requested (paying for idle), under-requested (risk of eviction or noisy scheduling), OOMKills and their likely cause (limit too low, leak, runtime heap misconfigured), and CPU throttling.
3. Recommend requests and limits per container with the arithmetic from the percentiles and the headroom chosen. Explain the CPU limit decision for this cluster.
4. Runtime settings: heap or memory-limit flags that fit inside the new memory limit (for example a JVM `MaxRAMPercentage`, Node `--max-old-space-size`, Go `GOMEMLIMIT`), and CPU-aware thread pool settings if relevant.
5. Interactions: how new requests change HPA behaviour (and adjusted targets if needed), bin-packing on current node sizes, and the quality-of-service class each pod ends up in.
6. Rollout: change one workload or a small group at a time, non-production first, and use VPA in recommendation (`Off`) mode to keep tracking; never VPA auto mode alongside an HPA on the same resource.
7. Watch: the metrics and alerts to check for a week after each change.
</task>

<constraints>
- Do not recommend numbers without usage data behind them; mark any estimate as an estimate.
- Do not lower a memory limit below observed max usage without addressing the cause.
- Do not invent cost savings in money; express savings as reserved CPU cores and memory.
{{> output/uncertainty}}
</constraints>

<output_format>
## Findings
Table: workload/container | current request/limit | observed p50/p95/max | problem.
## Recommendations
Table: container | CPU request | CPU limit | memory request | memory limit | reasoning, followed by the YAML snippets.
## Runtime settings
Bullets per runtime.
## Rollout
Numbered steps.
## Watch
Bullets: metrics and alert thresholds.
</output_format>
