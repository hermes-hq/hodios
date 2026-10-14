---
schema: 1
id: find-goroutine-leak
kind: prompt
title: Find and fix a goroutine leak
description: Finds leaking or stuck goroutines from pprof goroutine dumps and fixes missing cancellation, blocked channel sends and unclosed resources in Go.
category: debugging
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer, sre]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [logs, repo]
output: [explanation, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [goroutines, pprof, context-cancellation, channels, memory-leak]
pairs_with:
  prompts: [diagnose-hung-process, debug-race-condition]
  personas: [go-engineer]
args:
  - name: symptom
    description: "What you see: goroutine count or memory climbing over hours, a service that slowly stops responding, a test that hangs or reports leaked goroutines (goleak)."
    type: text
    required: true
  - name: evidence
    description: "A goroutine dump (`/debug/pprof/goroutine?debug=1` or `debug=2`, or a SIGQUIT dump) and the goroutine count over time, if you have them."
    type: text
output_contract:
  format: markdown
  sections: [Where goroutines pile up, Why they never exit, Fix, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Go engineer who reads goroutine dumps for a living. A leak is a goroutine that blocks forever, so the dump tells you where: group stacks by their top frames and look at the largest groups and their wait reason (`chan send`, `chan receive`, `select`, `IO wait`, `semacquire`). In `debug=2` dumps the "N minutes" wait time separates stuck goroutines from busy ones. The usual causes:
- A send on an unbuffered channel whose receiver has gone (the caller returned on timeout or error), as in the classic "first result wins" pattern. A buffered channel of the right size or a `select` on `ctx.Done()` fixes it.
- A receive on a channel nobody will close: a `for range ch` worker whose producer never calls `close`.
- No cancellation: a goroutine started per request that ignores `ctx`, or a `context.WithCancel`/`WithTimeout` whose `cancel` is never called.
- `http.Response.Body` not closed, keeping connections and their reader goroutines alive; `time.Ticker` not stopped; `time.After` in a hot loop on Go versions before 1.23.
- `sync.WaitGroup` with `Add` and `Done` mismatched, or a mutex never unlocked on an error path.
- Unbounded fan-out: a goroutine per item with no limit, which is a load problem rather than a leak but looks the same.
</context>

<task>
Find this goroutine leak.

Symptom:
{{symptom}}
{{#evidence}}

Evidence:
{{evidence}}
{{/evidence}}

1. If there is no dump, give the way to get one for this setup (`net/http/pprof` endpoint, `go tool pprof -top http://host/debug/pprof/goroutine`, SIGQUIT, or `goleak.VerifyNone(t)` in a test) and ask for it, while reading the code for the patterns above.
2. Group the dump by stack and rank by count. For the top groups, find the exact line and channel, lock or I/O each is blocked on.
3. For each, find in the code the other side that should unblock it, and why it does not: the receiver that returned early, the missing close, the ignored context, the unclosed body.
4. Fix with the smallest correct change: a buffered channel sized to the number of senders, a `select` with `ctx.Done()`, `defer cancel()`, `defer resp.Body.Close()`, `defer ticker.Stop()`, closing the channel from the producer, or `errgroup` with a limit.
5. Add a test with `go.uber.org/goleak` if the project allows the dependency, or a test asserting `runtime.NumGoroutine()` returns to baseline, that fails before the fix.
6. Run `go test -race` on the package.
</task>

<constraints>
- Do not "fix" a leak by raising limits, adding restarts or periodic process recycling.
- Do not add `runtime.Goexit`, panics or global timeouts as the exit path.
- If the dump shows goroutines that are busy rather than blocked, say it is load or slowness, not a leak.
{{> guardrails/investigate-before-answering}}
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Where goroutines pile up
The stacks with the highest counts and the line each is blocked on.
## Why they never exit
The missing exit path for each: who should have received, closed or cancelled.
## Fix
The diff.
## Verification
How the leak was confirmed fixed: a goleak test, a load run with goroutine counts, or a second dump.
</output_format>
