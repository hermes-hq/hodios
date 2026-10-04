---
schema: 1
id: tune-garbage-collector
kind: prompt
title: Tune a garbage collector
description: Diagnoses GC pauses and memory churn on the JVM, .NET or Go from GC logs and metrics, fixes allocation hotspots first, then chooses collector and heap settings. Use for latency spikes.
category: performance
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [backend-engineer, sre]
stack: [java, dotnet, go]
requires: [none]
inputs: [logs, config, text]
output: [report, config]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [garbage-collection, gc-pauses, heap-sizing, allocation-rate, tail-latency, jvm]
pairs_with:
  prompts: [find-memory-leak, profile-hot-path]
  personas: [performance-engineer]
args:
  - name: gc_logs
    description: GC logs or a summary (JVM unified logging -Xlog:gc*, .NET GC events or dotnet-counters, Go GODEBUG=gctrace=1), plus heap and container memory limits, current flags or settings, and p99 latency or pause metrics.
    type: text
    required: true
  - name: runtime
    description: The managed runtime.
    type: enum
    enum: [jvm, dotnet, go]
    required: true
  - name: latency_goal
    description: The target, for example "p99 under 150 ms" or "no pause over 50 ms", and whether throughput or memory cost matters more.
    type: string
    default: "not stated; propose one tied to the service's latency SLO"
output_contract:
  format: markdown
  sections: [Diagnosis, Allocation fixes, Settings, Experiment plan, Watch after]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-04
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A {{runtime}} service shows latency spikes, high CPU in the collector, or out-of-memory kills, and the user suspects garbage collection. Latency goal: {{latency_goal}}.

What an expert knows: first confirm GC is actually the cause by lining up pause timestamps with latency spikes; then reduce the allocation rate, because the cheapest collection is the one that does not happen; only then tune. Flag-tuning without evidence (copying a list of JVM flags from a blog) usually makes things worse. Container limits matter: a heap sized near the container limit leaves no room for metaspace, thread stacks, direct buffers or the Go runtime overhead, and the kernel kills the process instead of the runtime collecting.
</context>

<task>
<gc_logs>
{{gc_logs}}
</gc_logs>

1. Diagnose from the evidence: collector in use, heap size versus live data after collection, allocation rate (MB/s), promotion rate, pause count, duration distribution (p50, p99, max) and type (young, mixed, full; gen0, gen1, gen2 and background; Go stop-the-world phases and assist time), GC CPU share, and correlation with latency spikes. State whether GC explains the latency problem, partly or not at all.
2. Name the pattern: high allocation churn (short-lived objects), premature promotion, a heap too small for the live set, humongous or large-object allocations, full or compacting collections from fragmentation, a leak (live set growing after each collection, hand over to leak investigation), or container limits causing out-of-memory kills.
3. Allocation fixes first: find the hotspots with an allocation profiler (JFR allocation events or async-profiler alloc mode; dotnet-trace or PerfView allocation tick; Go pprof `-sample_index=alloc_space`) and name typical fixes: reuse buffers, avoid boxing and autoboxing, stream instead of materialising large collections, pre-size collections, pool large buffers (ArrayPool, sync.Pool), avoid string building in hot logs, and reduce large object heap allocations in .NET.
4. Then settings, only those the evidence supports:
   - JVM: choose the collector by goal (G1 as default, ZGC or Shenandoah for low pause at larger heaps, Parallel for throughput batch jobs); set -Xms equal to -Xmx for steady services or use -XX:MaxRAMPercentage in containers; G1 pause target only with evidence; avoid many tuning flags at once.
   - .NET: Server versus Workstation GC, concurrent or background GC, `GCHeapHardLimit` or percentage in containers, `GCConserveMemory`, DATAS where available; region or LOH settings only with evidence.
   - Go: `GOGC` for the CPU versus memory trade-off and `GOMEMLIMIT` set below the container limit with headroom; check `GOMAXPROCS` matches the CPU quota.
5. Experiment plan: change one setting at a time, test under representative load (replayed traffic or a load test at production rate), compare pause percentiles, GC CPU share, memory footprint and service p99, and roll out to one instance before all.
6. List what to watch after the change and the rollback trigger.

If the logs lack timestamps or heap sizes, say which logging flags to enable and stop.
</task>

<constraints>
- No settings change without a diagnosis that justifies it; no blanket flag lists.
- Respect container memory limits and leave headroom for non-heap memory.
- Do not state runtime defaults or flag behaviour you are unsure of for the user's version; ask for the version or mark [CHECK FOR YOUR VERSION].
{{> output/uncertainty}}
</constraints>

<output_format>
## Diagnosis
Table: metric | value | what it means. Then one paragraph: is GC the cause, and which pattern.
## Allocation fixes
Ranked bullets: hotspot or likely hotspot, fix, how to confirm with a profiler.
## Settings
Table: setting | current | proposed | why | risk.
## Experiment plan
Numbered steps.
## Watch after
Metrics, thresholds and the rollback trigger.
</output_format>
