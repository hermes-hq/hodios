---
schema: 1
id: implement-trpc-router
kind: prompt
title: Implement a tRPC router
description: Implements a tRPC router with zod-validated procedures, an auth middleware that narrows context, ownership checks, error formatting and typed client hooks with cache invalidation.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [fullstack-engineer, backend-engineer, frontend-engineer]
stack: [typescript]
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
tags: [trpc, zod, end-to-end-types, rpc, middleware]
pairs_with:
  prompts: [choose-api-style, implement-tanstack-query-data-layer]
  personas: [typescript-engineer, fullstack-engineer]
args:
  - name: router_spec
    description: The procedures to build and who may call them, for example "projects router; list mine, get by id, create, rename, archive; members only".
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Procedures, Changes, Tests, Verification, Decisions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a TypeScript engineer building a tRPC API. tRPC gives end-to-end types for free, which makes it easy to forget that the server is still a public HTTP API:
- Every procedure is callable by anyone who can reach the endpoint. Input types are erased at runtime, so validate every input with `.input(zodSchema)`.
- Authentication is a middleware that throws `UNAUTHORIZED` when there is no session and passes a narrowed `ctx` (with a non-null `user`) to `next`. Build `protectedProcedure` from it. Ownership ("may this user rename this project") is checked inside the procedure or a scoped query, not by the middleware.
- Return explicit fields. Returning a whole database row sends every column to the client; `.output()` validation or a `select` keeps it in check.
- Errors: throw `TRPCError` with the right code (`NOT_FOUND`, `FORBIDDEN`, `BAD_REQUEST`, `CONFLICT`). An `errorFormatter` can add flattened zod errors for forms. Unexpected errors should not expose messages or stacks in production.
- Context is created per request from the incoming request (session, database, request id).
- Versions differ: v10 and v11 have different client packages and put the data transformer (such as superjson, needed for `Date` and `Map`) in different places. The transformer must match on both sides. Check the installed version before writing setup code.
- The client imports only `type AppRouter`. Importing server modules into client code pulls server code and secrets into the bundle.
- After mutations, invalidate the affected queries through the tRPC utilities or query keys, or the UI shows stale data.
- Test procedures without HTTP using a server-side caller (`createCaller` or `createCallerFactory`) with a fake context.
</context>

<task>
Build this router:
{{router_spec}}

1. Read the tRPC setup (init, context, existing procedures and middlewares), the client setup, data access and tests. Note the tRPC version and follow the patterns.
2. Write the procedure list: name, query or mutation, input schema, output fields, who may call, error codes.
3. Implement the router with validated inputs, `protectedProcedure` where needed, ownership checks, explicit outputs and errors; merge it into the app router.
4. Implement or update the typed client usage for the screens in scope, with invalidation after mutations.
5. Write tests with a server-side caller: success, invalid input, unauthenticated, another user's resource, not found. Run the tests, `tsc --noEmit` and the linter, and fix what fails.
</task>

<constraints>
- No procedure without input validation when it takes input.
- Never import server code into the client.
- Do not add packages the project does not already use without saying why.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Procedures
A table: Procedure | Type | Input | Output | Access | Errors.
## Changes
One line per file: `path`, what changed.
## Tests
One line per test and the case it covers.
## Verification
Commands run and their actual results.
## Decisions
Choices the spec did not settle, and why.
</output_format>
