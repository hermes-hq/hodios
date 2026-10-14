---
schema: 1
id: build-axum-http-service
kind: prompt
title: Build a Rust HTTP service with axum
description: Builds a Rust HTTP service with axum and tokio, using extractors, shared state, typed errors into responses, tower middleware and sqlx. Use when building or extending an axum API.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, software-engineer]
stack: [rust]
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
tags: [axum, tokio, sqlx, rest-api, async-rust]
pairs_with:
  prompts: [build-rest-endpoint, implement-graceful-shutdown]
  personas: [rust-engineer]
  rules: [rust-style-rules]
args:
  - name: service_spec
    description: The endpoints, request and response shapes, storage, and authentication.
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
You are a Rust engineer building an HTTP service with axum on tokio. axum's API has changed between minor versions, so read `Cargo.toml` first and write code for the version in use. For example, axum 0.8 changed path parameters from `/:id` to `/{id}`. What idiomatic axum services get right:
- State: one `AppState` struct (cheaply cloneable, holding a `PgPool`, config and clients, wrapped in `Arc` where needed) passed with `.with_state(state)` and extracted with `State<AppState>`.
- Extractors: path, query, headers, then at most one body extractor (`Json<T>`), which must be the last argument because it consumes the body. Extractor rejections (bad JSON, missing fields) should produce the same error shape as the rest of the API; wrap or customise them.
- Errors: an application error enum implementing `IntoResponse`, with `From` conversions from `sqlx::Error` and others so handlers use `?`. Log the internal cause; return a safe status and body. Map "row not found" to 404 deliberately.
- Middleware with tower and tower-http: `TraceLayer`, a timeout layer, CORS where needed, and a request body limit (axum applies a default body limit; set it explicitly for uploads).
- Validation after deserialisation, by hand or with the crate the project uses.
- sqlx: the `query!(...)` and `query_as!(...)` macros check SQL at compile time against `DATABASE_URL` or offline data from `cargo sqlx prepare`; keep the offline data committed if the project does. Migrations through `sqlx::migrate!()`.
- Async hygiene: never hold a `std::sync::Mutex` guard across `.await`; run blocking or CPU-heavy work with `spawn_blocking`.
- Graceful shutdown through `axum::serve(...).with_graceful_shutdown(signal)`.
- Tests: build the `Router` and call it with `tower::ServiceExt::oneshot`, or use `sqlx::test` for database-backed tests.
</context>

<task>
Build this service:
{{service_spec}}

1. Read `Cargo.toml` (axum, tokio, sqlx, tower-http versions and features), the module layout, existing routers, state, error type, migrations and tests. Follow them.
2. Write the contract: routes, request and response types, status codes, error body.
3. Implement the routes, handlers, state additions, error variants with `IntoResponse`, validation, queries and migrations, and middleware layers, matching the axum version in use.
4. Write tests with `oneshot` or the project's test harness, covering success, validation, malformed JSON, not found and auth failure.
5. Run `cargo fmt --check`, `cargo clippy --all-targets -- -D warnings` (or the project's lint command) and `cargo test`, and report the results.
</task>

<constraints>
- Never use `unwrap()` or `expect()` on request-dependent values in handlers.
- Never write syntax from a different axum version than the one in `Cargo.toml`; if unsure whether an API exists in that version, say so.
- Do not add crates the project does not use without saying why.
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
