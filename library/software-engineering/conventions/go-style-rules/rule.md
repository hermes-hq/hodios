---
schema: 1
id: go-style-rules
kind: rule
title: Go style rules
description: Standing rules for Go an assistant writes, covering wrapped errors, context propagation, small consumer-side interfaces, table-driven tests and no goroutines without an owner.
category: conventions
version: 1.0.0
status: experimental
stage: [build]
role: [software-engineer, backend-engineer, devops-engineer, sre]
stack: [go]
requires: [none]
risk: read-only
tags: [error-handling, concurrency, interfaces]
applies_to: ["**/*.go"]
pairs_with:
  rules: [test-writing-rules]
authorship: ai-generated
authors: [gabrielanhaia]
last_reviewed: 2026-10-02
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change Go code in this project:

**Tooling**
- Code must be `gofmt`-formatted with imports grouped by `goimports`, and pass `go vet`. Follow the project's linter configuration (such as golangci-lint) if one exists.
- Use the Go version in `go.mod`. Keep `go.mod` tidy, and do not add a dependency for something the standard library does in a few lines.

**Errors**
- Return errors as the last result and handle every one. Never discard an error with `_` unless a comment says why it is safe.
- Add context once per layer with `fmt.Errorf("load config %q: %w", path, err)`. Use `%w` so callers can inspect the cause with `errors.Is` and `errors.As`; never compare error strings.
- Either handle an error or return it. Do not log it and return it too.
- Do not panic for expected failures. Reserve `panic` for programmer errors and impossible states, and do not let it cross a package's public API.
- Error strings start lowercase and have no trailing punctuation.

**Context**
- Any function that does I/O, blocks or may be cancelled takes `ctx context.Context` as its first parameter and passes it on.
- Never store a context in a struct, never pass `nil`, and create `context.Background()` only in `main`, initialisation and tests.
- Respect cancellation in loops and blocking operations, and do not use context values for optional parameters.

**Interfaces and types**
- Define interfaces in the package that uses them, keep them small (one to three methods), and accept interfaces while returning concrete types.
- Do not create an interface for a single implementation unless it is a deliberate seam for testing at a system boundary.
- Make zero values useful where possible, and avoid package-level mutable state and `init()` side effects.

**Concurrency**
- Write sequential code first. Add a goroutine only for a measured need or a real requirement for parallelism.
- Every goroutine has an owner who knows how it stops: it exits on context cancellation, and its errors reach the caller (prefer `errgroup`).
- The sender closes a channel. Protect shared state with a mutex or confine it to one goroutine, and never copy a struct that contains a mutex.
- Run tests with `-race` when concurrency is involved.

**Tests**
- Write table-driven tests with named `t.Run` subtests. Use `t.Helper()` in helpers and `t.Parallel()` where tests are independent.
- Report failures as `got X, want Y`, and use `cmp.Diff` or similar for structs.
- No `time.Sleep` for synchronisation. Wait on channels or conditions with a timeout. Put fixtures under `testdata/`.

**Naming and docs**
- Use MixedCaps, short receiver names that stay consistent, short lowercase package names, and no stutter (`http.Server`, not `http.HTTPServer`).
- Every exported identifier has a doc comment that starts with its name.
- Check the error from `Close` on anything you wrote to.
