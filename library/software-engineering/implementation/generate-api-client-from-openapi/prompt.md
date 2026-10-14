---
schema: 1
id: generate-api-client-from-openapi
kind: prompt
title: Generate an API client from an OpenAPI spec
description: Generates a typed API client from an OpenAPI spec with a pinned codegen tool, wraps auth, errors and timeouts, and adds a CI check that regenerates it when the spec changes.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, backend-engineer, fullstack-engineer, mobile-engineer]
stack: [openapi]
requires: [repo-read, file-write, shell]
inputs: [schema, repo]
output: [code, config, tests]
risk: runs-commands
invocation: user
effort: standard
interaction: autonomous
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [code-generator, api-client, type-safety, contract-drift, sdk]
pairs_with:
  prompts: [integrate-third-party-api, implement-token-refresh-interceptor, share-types-across-client-and-server]
args:
  - name: spec_location
    description: Where the OpenAPI document comes from, for example "openapi.yaml in the backend repo", "served at /openapi.json by our API", or "vendor's published spec file".
    type: string
    required: true
  - name: target
    description: The client language and how it is used, for example "TypeScript React app using TanStack Query", "Go service", "Python CLI".
    type: string
    required: true
output_contract:
  format: markdown
  sections: [Tool choice, Spec issues, Changes, Regeneration, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an engineer replacing hand-written API calls with a client generated from an OpenAPI spec. Generation is quick; keeping it correct and pleasant to use takes decisions:
- Tool choice follows the target and the project. Common options: for TypeScript, `openapi-typescript` with `openapi-fetch` (types only, tiny runtime), Orval or Hey API (clients plus TanStack Query hooks); OpenAPI Generator for many languages (heavier, needs Java); `oapi-codegen` for Go; Kiota or NSwag for .NET; `openapi-python-client` for Python. Use a tool already in the repo before adding one.
- The output is only as good as the spec. Missing `operationId`s give generated names like `getApiV1UsersId`; `{}` response schemas become `unknown`; missing error responses mean errors are untyped; `oneOf` without a discriminator produces awkward unions. List these and fix the spec if the team owns it, or document them if it is a vendor's.
- Pin the generator version and the spec version or commit. An unpinned generator changes output on its own.
- Never hand-edit generated files; the next run erases the edit. Put auth, base URL, timeouts, retries and error handling in a thin wrapper or the tool's interceptor/mutator hook, and exclude generated files from lint and formatting.
- Decide whether generated code is committed (reviewable diffs, no build step) or generated at build time (no drift in the repo, but every build needs the spec). Committed plus a CI drift check is the common choice.
- Dates in JSON are strings. Only type them as `Date` if the generator converts them at runtime.
- Retry only idempotent methods, and normalise errors into one typed shape the app handles.
</context>

<task>
Generate a client from {{spec_location}} for {{target}}.

1. Read the existing API calls, HTTP utilities, auth handling and build scripts. Find every place the app calls this API.
2. Load the spec and validate it with a linter if one is available. List the spec issues that would hurt the generated client.
3. Choose the generator and settings, pin the version, and add a script that regenerates the client into a dedicated folder.
4. Write the wrapper: base URL from config, auth header or token refresh hook, timeouts, error normalisation, and retry for idempotent calls only.
5. Migrate the call sites in scope to the generated client, removing hand-written types that duplicate it.
6. Add a CI step that regenerates the client and fails if the output differs from what is committed.
7. Run the type checker, the tests and the regeneration check. Fix what fails.
</task>

<constraints>
- Never edit generated files by hand.
- Do not change the spec of a third-party API; document workarounds instead.
- Do not migrate call sites outside the stated scope without listing them first.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Tool choice
The generator, version, settings and why, in three lines or fewer.
## Spec issues
A table: Location in spec | Problem | Effect on client | Fix or workaround.
## Changes
One line per file: `path`, what changed.
## Regeneration
The script and the CI check, and how a developer regenerates after a spec change.
## Verification
Commands run and their actual results.
</output_format>
