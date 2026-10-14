---
schema: 1
id: extract-api-client-from-fetch-calls
kind: prompt
title: Extract an API client from scattered fetch calls
description: Gathers fetch or axios calls scattered across a frontend or service into one typed API client with a shared base URL, auth, error handling and timeouts, keeping every request identical on the wire.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer, backend-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [http-client, api-client, error-handling, fetch]
pairs_with:
  prompts: [share-types-across-client-and-server, reduce-duplication, extract-module]
  personas: [typescript-engineer]
args:
  - name: scope
    description: Where the HTTP calls live (folders or files) and which API they talk to, plus the language and any HTTP library already in use.
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one.
    type: string
output_contract:
  format: markdown
  sections: [Calls found, Inconsistencies, Client design, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer consolidating HTTP access. When every component or module calls `fetch` directly, the same concerns are re-solved inconsistently: base URLs concatenated by hand, auth headers added in some places and forgotten in others, `fetch` treated as if it throws on 404 or 500 (it does not; only network failures reject, so `res.ok` must be checked), JSON parsed without checking content type, no timeouts (`fetch` waits indefinitely unless given an `AbortSignal`), and errors shown to users in five different shapes.

A good client is thin: one function that applies base URL, headers, auth, timeout and JSON handling, turns non-2xx responses into one typed error (status, code, message, body), and one function per endpoint with typed inputs and outputs on top. It is not a framework. Retries belong only on idempotent requests (GET, PUT, DELETE with care) and only for retryable failures (network errors, 502, 503, 504, 429 with backoff and `Retry-After`); retrying a POST can charge a card twice. Token refresh on 401 must be single-flight, or ten parallel requests trigger ten refreshes.

The refactor must not change what goes on the wire: same URLs, methods, headers, bodies, credentials mode and query encoding. Small differences (trailing slashes, `credentials: 'include'`, header case on some servers, URLSearchParams versus manual encoding) break things.
</context>

<task>
Extract an API client for {{scope}}.

1. Find every HTTP call and list it: method, URL, headers, auth, body, credentials, how errors and non-2xx responses are handled, and whether it retries or times out.
2. List the inconsistencies (unchecked `res.ok`, missing auth, no timeout, different error shapes) and which of them are bugs. Ask which bugs to fix in this change and which to keep identical for now.
3. Design the client: the core request function, the error type, timeout default, auth hook, retry policy limited to idempotent requests, and one typed function per endpoint, placed where the project keeps such code. If a library is already in use (axios, ky, ofetch), build on it rather than adding another. Wait for approval.
4. Add tests for the client core (non-2xx to error, timeout, auth header) with a mocked transport. Migrate call sites module by module, keeping requests identical on the wire except for the agreed fixes.
5. Run the tests{{#test_command}} with `{{test_command}}`{{/test_command}} and the type check, and report results and any call sites left.
</task>

<constraints>
- Requests stay identical on the wire unless a fix was agreed; each agreed fix is listed.
- No automatic retries for non-idempotent requests.
- Do not add a data-fetching or caching library in this change.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Calls found
Table: location, method, URL, auth, error handling, timeout.
## Inconsistencies
Each one, whether it is a bug, and the agreed action.
## Client design
Core function, error type, policies and endpoint functions.
## Diff
The change.
## Check
Tests, type check and remaining call sites.
</output_format>
