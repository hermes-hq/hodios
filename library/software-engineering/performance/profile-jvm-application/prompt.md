---
schema: 1
id: profile-jvm-application
kind: prompt
title: Profile a slow Java or Kotlin service
description: Profiles a slow Java or Kotlin service with JDK Flight Recorder or async-profiler, reads CPU, allocation and lock profiles correctly, and fixes the top hotspots with before-and-after measurements.
category: performance
version: 1.0.0
status: incubating
stage: [operate, maintain]
role: [backend-engineer, sre, software-engineer]
stack: [java, kotlin]
requires: [repo-read, file-write, shell]
inputs: [repo, logs, file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [jfr, async-profiler, jvm, allocation-profiling, hotspots]
pairs_with:
  prompts: [read-flame-graph, tune-garbage-collector, find-lock-contention, tune-jpa-hibernate-performance, write-microbenchmark]
  personas: [performance-engineer]
args:
  - name: symptom
    description: What is slow (an endpoint, a batch job, throughput under load), the numbers now and the target, the JDK version, and where it runs (container limits, instance size).
    type: text
    required: true
  - name: profile
    description: An existing JFR recording, async-profiler output or flame graph, if one was already captured.
    type: text
output_contract:
  format: markdown
  sections: [Capture plan, Reading, Hotspots, Changes, Results, Next steps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Profiling the JVM goes wrong mostly at capture and reading time. JDK Flight Recorder ships with the JDK (11+), is safe in production at the default settings (`-XX:StartFlightRecording` or `jcmd <pid> JFR.start`), and records CPU samples, allocations, locks, GC, I/O and thread states; JDK Mission Control or `jfr print` reads it. async-profiler avoids safepoint bias and gives CPU, wall-clock, allocation and lock flame graphs, including native and kernel frames. The classic errors: profiling during JIT warm-up (the first minutes or few thousand requests), so interpreter frames dominate; using CPU mode when the problem is waiting (database, HTTP calls, lock waits), which needs wall-clock mode or JFR thread states; reading a hot `HashMap.get` as the bug instead of asking who calls it a million times; ignoring allocation profiles when GC time is high, where the fix is fewer allocations, not GC flags; and drawing conclusions from a laptop run with a different heap, CPU count or container limit. Common real hotspots: logging with string building at disabled levels, regex compiled per call, reflection-heavy serialization, exceptions used for control flow (stack trace capture is expensive), boxing in collections, synchronized blocks around I/O, N+1 queries via the ORM, and thread pools sized for the host rather than the container. JMH is the tool for confirming a micro-level fix.
</context>

<task>
Profile and speed up: {{symptom}}
{{#profile}}Existing profile: {{profile}}{{/profile}}

1. Read the code on the slow path, the JVM flags, container limits and thread pool settings. Confirm the JDK version and which profiler can be used in the environment.
2. Plan the capture: reproduce under realistic load after warm-up, choose the mode (CPU, wall-clock, allocation, lock) from the symptom, and give the exact JFR or async-profiler commands with duration. Use a non-production environment unless the user confirms production profiling with JFR's default settings.
3. Read the profile: top frames by self and total time, the call paths that lead there, allocation rate and top allocation sites, lock contention, GC pauses and thread states. Separate CPU work from waiting.
4. Name the top three hotspots with their share and cause, and check each cause in the code.
5. Fix the biggest one with the smallest change, run the tests, and measure again under the same load (and with JMH for a micro-level change). Keep it only if it helps.
6. Repeat for the next hotspot while it is worth it, then report.
</task>

<constraints>
- Do not draw conclusions from a profile taken during warm-up or on hardware unlike production without saying so.
- Do not change GC or JVM flags to fix a problem the allocation profile shows is in code.
- Do not attach profilers to production or change production settings without the user's confirmation.
- Report only measured improvements.
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Capture plan
Mode, load, warm-up, duration and exact commands.
## Reading
What the profile shows: CPU versus waiting, allocation rate, locks, GC.
## Hotspots
Table: frame or call path, share, cause, evidence in code.
## Changes
Numbered, with file and reason.
## Results
Before and after numbers under the same load, and test status.
## Next steps
Remaining hotspots or capture gaps.
</output_format>
