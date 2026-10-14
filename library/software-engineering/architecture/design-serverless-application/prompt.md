---
schema: 1
id: design-serverless-application
kind: prompt
title: Design a serverless application
description: Designs an application on functions and managed services, with function boundaries, state, event triggers, platform limits, local testing, cost shape and when serverless stops fitting.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, fullstack-engineer, devops-engineer]
requires: [none]
inputs: [spec, text, document]
output: [docs, diagram, table]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [serverless, functions-as-a-service, managed-services, event-triggers, cold-starts]
pairs_with:
  personas: [software-architect]
  prompts: [write-aws-lambda-function, reduce-serverless-cold-start, estimate-cloud-costs, design-event-driven-system]
args:
  - name: application
    description: What the application does, its main user flows and background work, expected traffic shape (steady, spiky, idle at night) and data.
    type: text
    required: true
  - name: platform
    description: The cloud and services available or preferred (for example AWS Lambda, API Gateway, DynamoDB; Cloudflare Workers; Azure Functions; Google Cloud Run), and team experience.
    type: text
    required: true
  - name: constraints
    description: Latency targets, long-running tasks, compliance, budget, and anything that must run on servers.
    type: text
output_contract:
  format: markdown
  sections: [Fit check, Architecture, Function design, State and data, Limits and failure handling, Development and deployment, Cost shape, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Serverless works best for spiky or low-traffic workloads, event processing and glue between managed services, where paying per invocation and not running servers outweighs the constraints. Those constraints shape the design: functions are stateless and short-lived with execution time, payload and concurrency limits; cold starts add latency for some runtimes and package sizes; connections to relational databases exhaust quickly unless pooled through a proxy or replaced by HTTP-based data services; every trigger has its own retry and batching semantics, so handlers must be idempotent and failures need dead-letter destinations. The common mistakes are one function per tiny endpoint that becomes unmanageable, or a whole framework in one function; chaining functions synchronously; and no way to run and test locally. At steady high throughput, containers are often cheaper, and long-running or stateful work belongs in a workflow service or containers.
</context>

<task>
<application>
{{application}}
</application>

<platform>
{{platform}}
</platform>

{{#constraints}}
<constraints_given>
{{constraints}}
</constraints_given>
{{/constraints}}

1. Check fit: traffic shape, task durations, latency targets, state needs and team experience. Say which parts suit serverless and which should run elsewhere (containers, a workflow service), and why.
2. Draw the architecture: entry points, functions, triggers (HTTP, queue, schedule, storage, stream), managed services and data stores.
3. Design functions: grouping by bounded capability rather than one per endpoint or one for everything, runtime choice, memory and timeout settings as starting points, and how shared code is packaged.
4. Design state and data: data store choice and access patterns, connection handling for relational databases, caching, file storage, and where session or workflow state lives.
5. Cover limits and failure handling: per-trigger retry semantics, idempotency, dead-letter destinations, concurrency limits and reserved capacity to protect downstream systems, payload limits and how large data is passed by reference, and cold start mitigations where the latency target requires them.
6. Cover development and deployment: infrastructure as code, local emulation and integration tests against real cloud resources, environments, observability with structured logs and tracing, and secrets.
7. Describe the cost shape: what drives cost (invocations, duration, memory, data transfer, managed service requests), and the traffic level at which containers would be cheaper, as a method to calculate rather than invented prices.
</task>

<constraints>
- Do not chain functions with synchronous calls when a queue or workflow service fits.
- Every queue- or stream-triggered handler must be idempotent and have a failure destination.
- Do not quote platform limits or prices as facts; give the dimension and say to check current documentation.
- Say plainly if serverless is a poor fit for part or all of the application.
{{> output/uncertainty}}
</constraints>

<output_format>
## Fit check
Table: part of the application, serverless fit (good, poor), reason.
## Architecture
Mermaid flowchart.
## Function design
Table: function, trigger, responsibility, timeout and memory starting point.
## State and data
## Limits and failure handling
## Development and deployment
## Cost shape
## Open questions
Numbered.
</output_format>
