---
schema: 1
id: implement-go-worker-pool
kind: prompt
title: Implement bounded concurrency in Go
description: Implements bounded concurrent processing in Go with errgroup or a worker pool, context cancellation, error collection, ordered results and no goroutine leaks. Use to parallelise a loop safely.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [goroutines, errgroup, worker-pool, context-cancellation, goroutine-leaks]
pairs_with:
  prompts: [build-go-http-service, add-retries-and-timeouts]
  personas: [go-engineer, concurrency-specialist]
  rules: [go-style-rules]
args:
  - name: job
    description: The work to parallelise (for example "fetch 10k URLs" or "process each file in a directory"), what each item does, downstream limits, and whether one failure should stop everything.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Design decisions, Changes, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Go engineer adding bounded concurrency. Starting a goroutine per item is easy; the bugs are in bounding, cancelling and collecting:
- Bound concurrency by the downstream limit (API rate limit, database pool size, file handles), not by CPU count, for I/O-bound work. Unbounded goroutines exhaust connections or memory on large inputs.
- `golang.org/x/sync/errgroup` with `errgroup.WithContext` and `g.SetLimit(n)` covers the common case: bounded concurrency, the first error cancels the shared context, and `g.Wait()` returns that error. If every error must be reported rather than the first, collect them yourself (a slice indexed by item, or a mutex) and combine them with `errors.Join`.
- Goroutine leaks come from blocked channel sends or receives after the other side has gone. Every send and receive in a worker selects on `ctx.Done()` too; the producer closes the work channel; only the sender closes a channel.
- Results in input order: write into a preallocated slice at the item's index. Distinct indices need no lock.
- A panic in any goroutine crashes the whole program; recover inside the task only if the job requires isolation, and turn the panic into an error.
- Rate limits separate from concurrency limits: use `golang.org/x/time/rate` when the downstream limits requests per second.
- Since Go 1.22 each loop iteration has its own variable, so the old capture bug is gone; check the `go` directive in `go.mod` before relying on that.
- Verify with `go test -race`, and with `go.uber.org/goleak` in tests if the project uses it or accepts it.
</context>

<task>
Parallelise this work:
{{job}}

1. Read the current sequential code, `go.mod` (Go version, whether x/sync is present), and how the caller handles errors and cancellation.
2. State the design: concurrency limit and why, errgroup or explicit worker pool, error policy (fail fast or collect all), result ordering, rate limiting, cancellation and shutdown behaviour.
3. Implement it as a function taking a `context.Context`, keep per-item logic in its own function, and preserve the existing function signature or explain the change.
4. Write tests: correctness against the sequential version, cancellation midway, an error in one item under each policy, and a leak check. Run `go vet ./...` and `go test -race ./...`.
</task>

<constraints>
- Never start an unbounded number of goroutines proportional to input size.
- Never close a channel from the receiving side, and never leave a goroutine blocked on a channel after the function returns.
- Do not add dependencies beyond `golang.org/x/sync` and `golang.org/x/time` without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design decisions
A table: Decision | Choice | Why.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results, including the race detector.
</output_format>
