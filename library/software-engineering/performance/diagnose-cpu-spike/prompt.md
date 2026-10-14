---
schema: 1
id: diagnose-cpu-spike
kind: prompt
title: Diagnose a CPU spike in production
description: Finds what a production process is doing when CPU spikes or stays pinned, with safe sampling profilers and thread and throttling metrics, separating hot code from GC, retry storms and throttling.
category: performance
version: 1.0.0
status: incubating
stage: [operate]
role: [sre, backend-engineer, devops-engineer]
stack: []
requires: [shell]
inputs: [logs, text]
output: [report, checklist]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [high-cpu, sampling-profiler, cpu-throttling, production-profiling, redos]
pairs_with:
  prompts: [read-flame-graph, profile-hot-path, investigate-latency-spike, tune-garbage-collector]
  personas: [performance-engineer]
args:
  - name: situation
    description: The process or service, language and runtime, how it runs (VM, container, Kubernetes), when CPU spiked, and what changed around then.
    type: text
    required: true
  - name: evidence
    description: Metrics, top or thread output, profiles or logs you already have.
    type: text
output_contract:
  format: markdown
  sections: [Mitigation now, Evidence to collect, Findings, Cause, Fix and follow-up]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
High CPU in production has a handful of shapes, and the first job is telling them apart before anyone restarts the evidence away. One thread pinned at 100% suggests an infinite loop or a pathological regular expression on some input; all threads busy with garbage collection suggests memory near its limit; CPU tracking request rate with more work per request points at a code or data change; bursts aligned with errors suggest a retry storm; and in containers, CPU throttling against a quota can look like slowness while usage reads moderate. Sampling profilers attach to a live process with low overhead (perf, async-profiler, py-spy, rbspy, pprof endpoints, dotnet-trace and similar), and per-thread CPU plus a thread dump maps the hot thread to code. Capture before restarting, but protect users first.
{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}
</context>

<task>
Situation: {{situation}}

1. Mitigation now: if users are affected, propose the safest action (roll back a recent deploy, scale out, disable a feature flag, rate-limit a client) and say which evidence to grab from one instance first and keep that instance out of rotation if possible.
2. Evidence to collect, with exact steps for this runtime: per-thread CPU, a 30 to 60 second sampling profile, 2 or 3 thread dumps a few seconds apart, GC and memory stats, container throttling counters, request rate and error rate around the spike, recent deploys, config changes and cron or batch schedules.
3. Read the evidence: match the hot threads to stack frames; classify the shape (single hot thread, GC, per-request cost, retry storm, throttling, background job); and name the specific code path, input or event.
4. State the cause with the evidence that supports it, and what would disprove it.
5. Fix and follow-up: the code or config fix, a guard (input length limits or safe regex engine, retry budgets, memory limits and GC settings, CPU requests and limits), and the alert or dashboard that would have caught it earlier.
</task>

<constraints>
- Prefer low-overhead sampling tools in production; warn about tools that pause the process (heap dumps, some debuggers) and their impact.
- Do not recommend restarting before evidence is captured, unless user impact demands it; then say what is lost.
- Do not state a cause the evidence does not support; mark hypotheses.
{{> output/uncertainty}}
</constraints>

<output_format>
## Mitigation now
Bullets.
## Evidence to collect
Numbered commands or steps for this runtime.
## Findings
What the evidence shows, or "Waiting for evidence".
## Cause
One paragraph with supporting and disproving evidence.
## Fix and follow-up
Bullets.
</output_format>
