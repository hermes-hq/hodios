---
schema: 1
id: build-go-http-service
kind: prompt
title: Build a Go HTTP service
description: Builds an idiomatic Go HTTP service with the standard library router, middleware, server timeouts, context propagation, JSON handling, error mapping and graceful shutdown. Use for a Go API.
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
model_tier: mid
reasoning: recommended
level: intermediate
tags: [net-http, rest-api, middleware, context, http-server]
pairs_with:
  prompts: [build-rest-endpoint, implement-graceful-shutdown, implement-go-worker-pool]
  personas: [go-engineer]
  rules: [go-style-rules]
args:
  - name: service_spec
    description: The endpoints, their request and response shapes, the storage or downstream services, and authentication.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Contract, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a Go engineer building an HTTP service. Since Go 1.22 the standard `http.ServeMux` matches methods and path wildcards (`mux.HandleFunc("GET /items/{id}", h)` with `r.PathValue("id")`), so many services need no router framework. If the repo already uses chi, echo or gin, follow it. The details that separate production Go services from examples:
- `http.Server` timeouts: the zero values mean no timeout, which leaves the server open to slow clients. Set `ReadHeaderTimeout`, `ReadTimeout`, `WriteTimeout` and `IdleTimeout` (long-lived streaming endpoints need their own handling).
- Middleware is `func(http.Handler) http.Handler`: request id, structured logging with `log/slog`, panic recovery, auth, and per-request timeouts with `context.WithTimeout`.
- Pass `r.Context()` to every database and downstream call so cancelled requests stop work.
- JSON input: limit the body with `http.MaxBytesReader`, decode with `json.NewDecoder` (optionally `DisallowUnknownFields`), reject trailing data, and validate after decoding. Set `Content-Type` and the status code before writing the body; headers written after `WriteHeader` are ignored.
- Errors: handlers can return `error` through a small adapter; map domain errors with `errors.Is` and `errors.As` to status codes in one place, log the internal error, and return a safe JSON body.
- Dependencies live in a struct passed to handlers (no package-level globals), which makes tests simple.
- Graceful shutdown: `signal.NotifyContext` for SIGINT and SIGTERM, then `srv.Shutdown(ctx)` with a deadline.
- Database: `database/sql` or `pgx`; always close rows and check `rows.Err()`.
- Tests: `httptest.NewRecorder` for handlers and `httptest.NewServer` end to end; run with `-race`.
</context>

<task>
Build this service:
{{service_spec}}

1. Read `go.mod` (Go version, dependencies), the existing package layout, handlers, middleware, error types, storage code and tests. Follow them; do not introduce a framework the project does not use.
2. Write the contract: routes, request and response shapes, status codes, error body format.
3. Implement the server setup with timeouts, routing, middleware, handlers with body limits and validation, the error mapping, storage access with context, and graceful shutdown if missing.
4. Write table-driven tests for the handlers, including bad JSON, oversized bodies, validation, not found and auth failures.
5. Run `go vet ./...`, `go test -race ./...` and the project's linter if configured, and report the results.
</task>

<constraints>
- Never leave server timeouts at their zero values.
- Never ignore returned errors, including from `Close` and `Encode` where they matter.
- Do not add dependencies when the standard library covers the need, unless the project already uses them.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Contract
A table: Method and path | Request | Success | Errors.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test: the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and the existing code that justified each.
</output_format>
