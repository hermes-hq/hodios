---
schema: 1
id: configure-opentelemetry-collector
kind: prompt
title: Configure an OpenTelemetry Collector
description: Writes an OpenTelemetry Collector config with receivers, ordered processors, sampling, redaction, exporters, queues and self-monitoring, deployed as an agent, a gateway or both.
category: devops
version: 1.0.0
status: incubating
stage: [build, operate]
role: [devops-engineer, sre, backend-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, config, text]
output: [config, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [opentelemetry, otel-collector, tail-sampling, tracing, telemetry-pipeline]
pairs_with:
  prompts: [instrument-service-observability, switch-observability-backend, reduce-observability-costs]
args:
  - name: requirements
    description: What the collector must do, for example "receive OTLP from 20 services, tail-sample traces to keep errors and slow requests, send to two backends".
    type: text
    required: true
  - name: notes
    description: "Platform (Kubernetes, VMs, ECS), signals (traces, metrics, logs), backends and how they authenticate, traffic volume, data that must be removed, existing collector or agents."
    type: text
output_contract:
  format: markdown
  sections: [Topology, Config, Deployment, Verification, Risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Collector config is a set of pipelines, one per signal, each wiring receivers through processors to exporters; a component that is defined but not listed in a pipeline does nothing. Processor order matters: `memory_limiter` goes first so the collector sheds load instead of being killed, enrichment (`k8sattributes`, `resourcedetection`) and filtering, attribute changes and redaction come next, and batching comes last before export. Deployment shapes differ: an agent (DaemonSet or host service) sits next to the apps, adds host and pod metadata and forwards; a gateway (a scaled Deployment behind a load balancer) centralises sampling, credentials and fan-out. Tail sampling only works if every span of a trace reaches the same collector instance, so a scaled gateway needs a first tier using the load-balancing exporter keyed on trace id; head sampling with a probabilistic sampler is simpler but cannot keep "all errors". Many components (tail sampling, k8sattributes, filelog, most vendor exporters) live in the contrib distribution or need a custom build, not the core image. Exporters should use a sending queue with retry, and a persistent queue if data loss on restart matters. Secrets come in through `${env:VAR}`. The collector's own metrics (refused, dropped and failed-to-send counts, queue size) are how you know it is losing data.
</context>

<task>
Configure an OpenTelemetry Collector for these requirements:
<requirements>
{{requirements}}
</requirements>
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the repository: existing collector configs, how services export telemetry (OTLP endpoint, protocol, SDK settings), deployment tooling, and how secrets are provided.
2. Choose the topology (agent, gateway, or both) and the distribution or custom component list, with reasons. If tail sampling is needed with more than one gateway replica, add a load-balancing tier.
3. Write the config: receivers per signal, processors in order (memory limiter first, enrichment, filtering and redaction, sampling, batch last), exporters with auth from environment variables, sending queues and retry, and extensions for health check and, if needed, file storage for persistent queues. List every component in the right pipeline.
4. Write sampling and redaction rules from the requirements: which traces to keep (errors, slow, a percentage of the rest) and which attributes to drop or hash.
5. Write deployment manifests or config with resource requests and limits matched to the memory limiter, replicas, and exposure of OTLP ports only inside the network.
6. Validate the config with the collector's `validate` command if available. After deploy, send test telemetry, confirm it arrives in each backend with the expected attributes, confirm redacted fields are gone, and check the collector's own drop and failure metrics.
</task>

<constraints>
- Do not put backend tokens or keys in the config file; reference environment variables backed by secrets.
- Do not use components that are not in the chosen distribution without saying a custom build is needed.
- Do not expose OTLP receivers to the internet without authentication.
- Do not invent component names or settings; mark any you could not confirm in the component's documentation.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Topology
Agent, gateway or both; replicas; distribution and components; data flow per signal.
## Config
Full config file(s) with paths, with comments on ordering and sampling.
## Deployment
Manifests or service config, resources, ports, secrets.
## Verification
Validate result, test telemetry results, self-metrics to watch, or the steps to run.
## Risks
Data loss points, memory sizing, sampling bias, and how to detect each.
</output_format>
