---
schema: 1
id: improve-go-error-handling
kind: prompt
title: Improve Go error handling
description: Refactors Go error handling to wrapped errors with context, sentinel and typed errors checked with errors.Is and errors.As, one place that logs, and no ignored errors, without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, software-engineer]
stack: [go]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, report]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [error-handling, error-wrapping, sentinel-errors, logging, idiomatic-go]
pairs_with:
  prompts: [unify-error-handling, refactor-go-package-interfaces, build-go-http-service]
  personas: [go-engineer]
  rules: [go-style-rules]
args:
  - name: scope
    description: The packages or files to fix and the problem seen, for example "errors logged three times", "can't tell which file failed", "404 vs 500 decided by string matching".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Problems found, Error design, Changes, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Go error handling degrades in recognisable ways. Errors returned bare (`return err`) through five layers arrive as "no such file or directory" with no hint of which operation failed; wrapping with `fmt.Errorf("load config %s: %w", path, err)` adds context while keeping the original for inspection. Using `%v` instead of `%w` breaks `errors.Is` and `errors.As` up the chain. Comparing with `==` or matching `err.Error()` strings breaks as soon as anyone wraps. Sentinel errors (`var ErrNotFound = errors.New("not found")`) suit conditions callers branch on; typed errors (a struct implementing `Error()`) suit cases needing data, like a validation field; both become part of the package API and should be few. The "log and return" habit logs the same error at every layer; the rule is handle it once: either return it (with context) or log it and stop. Errors from `Close`, `Flush`, `Rows.Err` and deferred calls are often dropped, which loses write failures. `panic` is for programmer bugs, not for errors. Wrapping messages should be lowercase, without "failed to" repeated at each layer, so the chain reads cleanly. `errors.Join` (Go 1.20+) combines several errors. At the HTTP or RPC boundary, one function maps known errors to status codes with `errors.Is` and `errors.As`, and everything else becomes a 500 with the detail logged, not sent to the client.
</context>

<task>
Improve error handling in {{scope}}.

1. Read the packages, the Go version, the logging setup and how errors reach the transport layer (HTTP handlers, gRPC, CLI). Run `go vet` and, if available, `errcheck` or the project's linter to find ignored errors.
2. List the problems with locations: bare returns that lose context, `%v` wrapping, `==` or string comparisons on errors, duplicate logging, ignored errors (especially from `Close` on writers and `Rows.Err`), panics used for errors, and status codes decided by message text.
3. Define the error design: which sentinel and typed errors each package exports (keep it small), wrapping style for messages, and where errors are logged (the boundary only).
4. Refactor: wrap with `%w` and context at each layer that adds information, replace comparisons with `errors.Is` and `errors.As`, remove log-and-return pairs, handle deferred `Close` errors on writes, and add one boundary function that maps errors to responses.
5. Keep observable behaviour: the same status codes and messages to clients unless they were leaking internals, which you list.
6. Run `go build`, `go vet`, the linter and `go test ./...` (with `-race` if the project uses it) and report results.
</task>

<constraints>
- Do not change responses, exit codes or logged fields that other systems depend on without listing them.
- Do not export a new sentinel or typed error unless a caller branches on it.
- Do not wrap errors from other packages in ways that expose internal details across a public API boundary without saying so.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Problems found
Table: location, problem, fix.
## Error design
Exported errors per package, wrapping style, and where logging happens.
## Changes
One line per file: `path`, what changed.
## Check
Commands run with real results, and any behaviour change listed.
</output_format>
