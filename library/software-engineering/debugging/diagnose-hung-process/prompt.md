---
schema: 1
id: diagnose-hung-process
kind: prompt
title: Diagnose a hung or frozen process
description: Diagnoses a process that hangs, freezes or stops making progress by reading thread dumps and stack samples, telling deadlock, livelock, infinite loop and blocked I/O apart, then fixing the cause.
category: debugging
version: 1.0.0
status: incubating
stage: [build, operate]
role: [software-engineer, backend-engineer, sre]
stack: []
requires: [none]
inputs: [logs, file, text]
output: [explanation, diff]
risk: read-only
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [deadlock, thread-dump, hang, infinite-loop, stack-sampling]
pairs_with:
  prompts: [debug-race-condition, find-root-cause]
  personas: [debugger]
args:
  - name: symptom
    description: What "hung" looks like, for example "API worker stops answering after a few hours, CPU at 0%" or "CLI spins at 100% CPU and never exits". Include how long it hangs and whether it recovers.
    type: text
    required: true
  - name: runtime
    description: Language, runtime and version, for example "Java 21 with Spring Boot", "Python 3.12 with asyncio", "Go 1.23", ".NET 8", "Node.js 22".
    type: string
    required: true
  - name: evidence
    description: Thread dumps, stack samples, goroutine dumps, logs around the hang, and the relevant code if you have them. Two or three dumps taken seconds apart are far more useful than one.
    type: text
output_contract:
  format: markdown
  sections: [What kind of hang this is, Evidence to collect, Diagnosis, Fix, How to confirm]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer who debugs hangs from evidence of what every thread is doing, not from guesses. The first split is CPU use, because it separates the families of causes:
- Near 0% CPU: threads are waiting. Deadlock (two threads each hold a lock the other wants), a lock never released on an error path, a wait on a condition nobody signals, a full bounded queue or pool with every worker waiting on the pool itself (thread-pool starvation), a blocking call with no timeout (socket read, database connection checkout, DNS), or an async event loop blocked by synchronous work so no callback ever runs.
- Near 100% of one core: a thread is spinning. Infinite loop on unexpected input, a retry loop with no backoff, catastrophic regular expression backtracking, or a livelock where threads keep yielding to each other.
- Rising memory with falling progress: the process is thrashing in garbage collection, which looks like a hang but is a memory problem.

Two or three dumps a few seconds apart tell you more than one: a frame that never changes is the stuck point, frames that move but repeat show a loop. The tools differ per runtime: `jstack` or `jcmd <pid> Thread.print` (Java prints detected deadlocks at the end), `py-spy dump --pid` (Python, including native frames), `kill -QUIT` or `GOTRACEBACK=all` and the `/debug/pprof/goroutine?debug=2` endpoint (Go), `dotnet-stack` or `dotnet-dump` (.NET), `--inspect` with a CPU profile or `kill -USR1` to attach (Node.js), `gdb -p` with `thread apply all bt` (native code).
</context>

<task>
Diagnose this hang.

Symptom:
{{symptom}}

Runtime: {{runtime}}

{{#evidence}}
Evidence:
{{evidence}}
{{/evidence}}

1. Classify the hang by CPU use and memory trend. If you do not know them, ask for them first, with the command to read them for this platform.
2. If there are no thread or stack dumps, give the exact commands to take two or three dumps for {{runtime}} a few seconds apart without killing the process, plus any flag that must be set in advance next time. Stop and wait for them.
3. Read the dumps. For each thread that matters, say what it is waiting on or looping in. Build the wait-for chain: thread A holds X and waits for Y, thread B holds Y and waits for X. Name the exact frames and lock or resource ids from the dump.
4. State the diagnosis and the code path that leads to it, including why it only happens sometimes (load, a slow dependency, a specific input, a timeout that is missing).
5. Propose the fix that removes the cause: consistent lock ordering, narrower lock scope, a timeout on the blocking call, moving blocking work off the event loop, a separate pool for nested work, a loop bound or input validation. Show it as a diff when code was given.
6. Give a way to confirm the fix: a test or script that reproduces the hang reliably before the fix, and what the dumps should look like after it.
</task>

<constraints>
- Do not recommend restarting on a schedule, raising pool sizes or adding a watchdog as the fix; they hide the cause. You may suggest them as a stopgap, labelled as such.
- Quote frames and lock ids from the dumps the user gave. Never invent thread names, frames or line numbers.
- If the dumps do not show a stuck point, say so and ask for more evidence instead of guessing.
- Warn that some dump tools briefly pause the process, and that `kill -QUIT` terminates a Go program by default.
{{> guardrails/investigate-before-answering}}
{{> output/uncertainty}}
</constraints>

<output_format>
## What kind of hang this is
One paragraph: waiting, spinning or thrashing, and why.
## Evidence to collect
The commands for this runtime, or "Already provided".
## Diagnosis
The wait-for chain or loop, with the frames that show it.
## Fix
The change, as a diff where possible, and any stopgap labelled as a stopgap.
## How to confirm
A reproduction and what the dumps should show after the fix.
</output_format>
