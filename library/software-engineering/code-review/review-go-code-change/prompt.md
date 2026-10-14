---
schema: 1
id: review-go-code-change
kind: prompt
title: Review a Go code change
description: Reviews a Go diff for unchecked or unwrapped errors, goroutine and timer leaks, context not propagated, defer inside loops, shared slice and map bugs and nil-interface traps.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [backend-engineer, software-engineer]
stack: [go]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [goroutines, context, error-wrapping, channels, pull-request]
pairs_with:
  personas: [go-engineer]
  prompts: [review-pull-request, review-diff-for-concurrency-bugs]
  rules: [go-style-rules]
args:
  - name: diff
    description: The diff with file paths, including the callers of changed functions and any interface the changed types implement.
    type: text
    required: true
  - name: context
    description: Go version from `go.mod` (loop variable semantics changed in 1.22, timer behaviour in 1.23), whether the code runs in a request path or a long-lived worker, and the error-handling conventions of the codebase.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Go keeps failure modes visible in the source, but only if the reviewer looks for the shapes. Errors: `_ =` or a missing `if err != nil` drops a failure; `fmt.Errorf` with `%v` instead of `%w` breaks `errors.Is` and `errors.As` for callers; `:=` inside an inner block shadows the outer `err` so the function returns nil. A function that returns a nil `*MyError` as the `error` interface returns a non-nil error, because an interface holding a typed nil pointer is not nil. Goroutines leak when they block forever: a goroutine sending on an unbuffered channel after the receiver returned early on timeout, or a worker with no way to stop. `context.Background()` inside a request path cuts off cancellation and deadlines; `context.WithTimeout` without calling `cancel` leaks a timer (go vet reports it). Before Go 1.22, goroutines in a loop captured the shared loop variable. `defer` runs at function exit, not loop iteration end, so `defer f.Close()` in a loop holds every file open; `defer resp.Body.Close()` before checking `err` panics on nil. Concurrent map writes are a fatal runtime error, not a race you might get away with. `append` can share a backing array, so two slices derived from one can overwrite each other. `http.DefaultClient` has no timeout. `sync.WaitGroup.Add` must happen before `go`, not inside the goroutine.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed file in full, check `go.mod` for the Go version, and read the callers of changed functions and the goroutines they start, before judging any hunk. Run `go vet` and the tests with `-race` if you can, and report the results. If you only have the diff, say which conclusions depend on code you could not see.
2. Check errors: ignored returns, shadowed `err`, `%v` where callers need `%w`, errors compared with `==` instead of `errors.Is`, typed nil pointers returned as `error`, and panics used for ordinary failures.
3. For every goroutine the change starts, name what makes it exit. Flag goroutines blocked on channels whose other side can leave, workers without a stop signal, unbounded goroutine creation per item or request, `WaitGroup.Add` inside the goroutine, and loop variable capture on Go versions below 1.22.
4. Check context: `context.Background()` or `TODO()` in request paths, contexts not passed to I/O calls, `cancel` functions not called, contexts stored in structs, and loops or selects that never check `ctx.Done()`.
5. Check defers and resources: `defer` in loops, `defer` before the error check, response bodies not closed or not drained, `time.After` in long-running loops on Go versions before 1.23, and HTTP clients without timeouts.
6. Check shared data: maps written from more than one goroutine without a lock, slices returned or appended in a way that aliases a caller's backing array, struct copies of types containing a `sync.Mutex`, and value versus pointer receivers that make mutations disappear.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (fatal concurrent map writes, goroutine or connection leaks in long-lived processes, failures silently returned as success, nil-pointer panics), medium (lost cancellation, errors that callers cannot match), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- State the Go version you assumed; do not flag loop variable capture on 1.22 or later.
- Fix with the standard library and the codebase's own helpers (errgroup if already used, existing logger) before adding dependencies.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the function, the defect, the triggering input, timeout or goroutine interleaving, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
