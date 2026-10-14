---
schema: 1
id: write-cloudflare-worker
kind: prompt
title: Write a Cloudflare Worker
description: Writes a Cloudflare Worker with routing, typed bindings to KV, R2 or D1, caching and secrets, respecting edge runtime limits, with local tests. Use when building an edge API or proxy.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, fullstack-engineer, software-engineer]
stack: [cloudflare, typescript]
requires: [repo-read, file-write, shell]
inputs: [spec, repo]
output: [code, tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [edge-functions, serverless, kv, d1, r2]
args:
  - name: worker_job
    description: What the Worker does, its routes, and which storage it needs, for example "short-link redirector with links stored in KV and click counts in D1".
    type: text
    required: true
  - name: constraints
    description: Anything fixed already, for example an existing wrangler config, a framework like Hono, or a custom domain.
    type: text
output_contract:
  format: markdown
  sections: [Design, Changes, Bindings and secrets, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Workers look like Node but are not. Bindings and secrets arrive on the `env` argument (or `import { env } from "cloudflare:workers"`); `process.env` is populated only with `nodejs_compat` on recent compatibility dates, so do not assume it. Node built-ins work only partly, and only with the `nodejs_compat` flag. Module-level variables live per isolate, so they are neither shared across requests reliably nor safe for per-user data. Work started after the response is cancelled unless passed to `ctx.waitUntil`. KV is eventually consistent (writes can take up to about a minute to appear everywhere), so it is wrong for counters or anything read right after write; D1 or Durable Objects fit those. The Cache API caches only GET responses and only on custom domains, and CPU time and subrequest counts are capped per request.
</context>

<task>
Write a Worker that does this:

{{worker_job}}

{{#constraints}}
Already fixed: {{constraints}}
{{/constraints}}

1. Read the repo: `wrangler.toml` or `wrangler.jsonc`, compatibility date and flags, existing Workers, router (plain `fetch`, Hono or itty-router) and test setup. Follow them. For a new project, use the ES module syntax `export default { fetch(request, env, ctx) }`.
2. Pick storage per data need and say why: KV for read-heavy config or lookups that tolerate staleness; D1 for relational data and anything needing consistency; R2 for files and large objects; Durable Objects for per-key coordination, counters or websockets.
3. Declare every binding in the wrangler config and type `Env` to match (generate types with `wrangler types` if the project does).
4. Route requests explicitly, validate methods and inputs, and return proper status codes with JSON error bodies. Handle CORS only if browsers call it, with an explicit allowed-origin list.
5. Use D1 prepared statements with `.bind()`; never build SQL with string concatenation. Stream R2 bodies instead of buffering large files.
6. Cache deliberately: set `Cache-Control` on responses, use `caches.default` for expensive GETs where it fits, and never cache responses that depend on auth or cookies without varying the key.
7. Push non-blocking work (analytics, logging to another service) into `ctx.waitUntil`.
8. Read secrets from `env` and set them with `wrangler secret put`; list the commands for the user, do not run them against their account.
9. Write tests (Vitest with `@cloudflare/vitest-pool-workers`, or the project's setup) for each route, a bad input and a missing record. Run them, and run `wrangler dev` locally if useful.
</task>

<constraints>
- Do not deploy (`wrangler deploy`) or change account resources without the user's confirmation.
- Do not store per-user state in module-level variables.
- Do not use Node-only libraries that need `fs`, `net` or native modules.
- No secrets in the wrangler config or source.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Routes, storage choice per data need, caching, in bullets.

## Changes
One line per file: `path`, what changed.

## Bindings and secrets
Table: Name | Type | Purpose | How to create it.

## Tests
One line per test.

## Verification
Commands run and their real results; say that nothing was deployed.
</output_format>
