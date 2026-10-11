---
schema: 1
id: sandbox-untrusted-code
kind: prompt
title: Design a sandbox for user-submitted code
description: Designs how a product safely runs user-submitted code, scripts or plugins, choosing an isolation layer and setting resource limits, egress control, secrets separation and escape monitoring.
category: security
version: 1.0.0
status: incubating
stage: [design]
role: [architect, backend-engineer, security-engineer]
stack: []
requires: [repo-read]
inputs: [spec, repo, text]
output: [plan, adr]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
tags: [sandboxing, code-execution, isolation, microvm, webassembly]
pairs_with:
  prompts: [design-plugin-extension-system, threat-model-feature, harden-kubernetes-workload, fix-ssrf-vulnerability]
  personas: [security-auditor]
args:
  - name: feature
    description: What users run (code snippets, notebooks, plugins, formulas, CI jobs, LLM-generated code), in which languages, who the users are (anyone on the internet, paying customers, employees) and the expected volume.
    type: text
    required: true
  - name: platform
    description: Where it would run today (Kubernetes, VMs, serverless, a managed sandbox service) and any constraints such as latency or budget.
    type: text
output_contract:
  format: markdown
  sections: [Threat model, Isolation choice, Limits, Network and secrets, Lifecycle, Monitoring and abuse, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Running code from untrusted users means assuming the code is hostile and will try to escape, read other users' data, reach internal services or the cloud metadata endpoint, and mine cryptocurrency on your bill. Language-level sandboxes (restricted Python `exec`, JavaScript libraries like the deprecated vm2) have a long history of escapes and are not a security boundary. Real boundaries, from weaker to stronger: a plain container shares the host kernel, so one kernel bug escapes it; a container with a strict seccomp profile, no capabilities and a user namespace narrows that; a user-space kernel such as gVisor narrows it further; WebAssembly runtimes give a capability-based sandbox for code compiled to Wasm; and microVMs (Firecracker, Cloud Hypervisor, Kata) give each run its own kernel. Stronger isolation costs start time and operations, so the right choice depends on who the users are and what the code needs (a spreadsheet formula engine and a full Linux shell are very different problems). Isolation alone is not enough: limits on CPU, memory, processes, disk and wall time, default-deny egress, and no credentials inside the sandbox close the rest.
</context>

<task>
Design the sandbox for: {{feature}}
{{#platform}}Platform: {{platform}}{{/platform}}

1. If the repo has an existing execution path, read it and note how code runs today, what it can reach and what credentials are present in its environment.
2. Write the threat model: attacker (anonymous, authenticated, tenant), goals (escape, cross-tenant access, internal network, metadata and credentials, resource abuse, using you to attack others), and the assets at risk.
3. Ask what the code must be able to do (filesystem, network, packages, GPU, run time) if the input does not say, because this decides the isolation layer.
4. Recommend an isolation layer with reasons, and what would make you pick the next stronger one. Run untrusted workloads on separate nodes, accounts or projects from production.
5. Set limits: CPU, memory, process count, open files, disk, output size, wall-clock time, and concurrency per user; give starting values and how to tune them.
6. Network: default deny egress; if internet access is needed, route through a proxy with an allowlist or rate limits; block internal ranges and metadata endpoints at the network layer; no inbound access.
7. Secrets: nothing in the sandbox environment that grants access to anything else; results returned through a narrow channel the host validates.
8. Lifecycle: fresh sandbox per run or per user session, destroyed after, never reused across tenants; image updates and kernel patching cadence.
9. Monitoring and abuse: logs of runs, alerts on limit hits and blocked egress, detection of mining and spam, and a kill switch per user.
</task>

<constraints>
- Do not present a language-level sandbox or code filtering as sufficient isolation.
- Do not claim any layer is escape-proof; state the residual risk of the chosen one.
- Recommend products by category and well-known open-source projects only, and tell the user to check current features and pricing.
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Threat model
Table: attacker, goal, asset, control.
## Isolation choice
The recommended layer, reasons, cost and the trigger to move to a stronger one.
## Limits
Table: resource, starting limit, enforcement point.
## Network and secrets
Egress policy, blocked ranges and how results leave the sandbox.
## Lifecycle
Creation, reuse rules, teardown and patching.
## Monitoring and abuse
Signals, alerts and response.
## Open questions
What the team must decide before building.
</output_format>
