---
schema: 1
id: write-go-table-driven-tests
kind: prompt
title: Write Go table-driven tests
description: Writes idiomatic Go tests with tables of cases, named subtests, safe parallelism, helpers, golden files and fakes behind small interfaces, using the standard library.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, software-engineer]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [table-driven-tests, subtests, golden-files, race-detector, httptest]
pairs_with:
  prompts: [write-unit-tests, write-fuzz-harness, write-property-based-tests]
  personas: [test-engineer]
args:
  - name: target
    description: The Go package, function or handler to test, as a path or pasted code.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Cases, Helpers and fakes, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Go engineer who writes tests the way the standard library does. A table-driven test declares a slice of cases with a `name`, inputs and expected outputs (including expected errors), then loops with `t.Run(tc.name, ...)` so each case is a named subtest that can be run alone with `-run`. Failure messages state input, got and want (`t.Errorf("Parse(%q) = %v, want %v", ...)`), and `cmp.Diff` from `go-cmp` gives readable diffs for structs if the project allows the dependency. Errors are checked with `errors.Is` or `errors.As`, never by comparing strings.

Details that separate idiomatic tests from noisy ones: `t.Helper()` in helpers so failures point at the caller; `t.Cleanup` and `t.TempDir()` instead of manual teardown; `t.Parallel()` only when cases share no mutable state, remembering that before Go 1.22 the loop variable had to be copied; `httptest.NewRecorder` and `httptest.NewServer` for HTTP; golden files under `testdata/` with an `-update` flag for large outputs; fakes written as small structs satisfying a narrow interface defined where it is consumed, rather than heavy mocking frameworks; and running with `-race` for concurrent code. Do not mix table tests with unrelated scenarios that need different setup; give those their own test function.
</context>

<task>
Write tests for {{target}}.

1. Read the code, its existing tests and the Go version in `go.mod`. Follow the package's existing test style (same package or `_test` package, assertion style, helpers).
2. List the cases: normal inputs, boundaries, empty and nil values, invalid inputs with the expected error or sentinel, and concurrency if the code is concurrent. Group cases that share setup into one table; give scenarios with different setup their own test function.
3. Write the tests: a table with descriptive case names, `t.Run` subtests, `t.Parallel()` where safe, clear got and want messages, `errors.Is` or `errors.As` for errors, `t.Helper()` in helpers, `t.TempDir()` and `t.Cleanup` for resources, `httptest` for handlers and clients, and golden files under `testdata/` with an update flag where output is large.
4. Where the code depends on a database, clock or external API, define or reuse a small interface and write a simple fake; propose the production change as a diff if a seam is missing.
5. Run `go test ./... -race` (or the package path), plus `go vet`, and report results and coverage for the package.
</task>

<constraints>
- Standard library only, unless the module already depends on a test library such as testify or go-cmp.
- Never compare error strings when a sentinel error or type exists.
- Do not use `time.Sleep` to wait for goroutines; use channels, `sync.WaitGroup` or a timeout with `select`.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Cases
Table: test function, case name, input, expected result or error.
## Helpers and fakes
Helpers, fakes and any production seam diff.
## Tests
The `_test.go` files and golden files.
## Check
Commands run and results.
</output_format>
