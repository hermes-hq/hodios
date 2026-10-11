---
schema: 1
id: design-client-sdk
kind: prompt
title: Design a client SDK for an API
description: Designs a client SDK's public surface for an API, with auth, retries, pagination helpers, typed errors, versioning, and generated versus hand-written code.
category: architecture
version: 1.0.0
status: incubating
stage: [design]
role: [backend-engineer, developer-advocate, architect, tech-lead]
requires: [none]
inputs: [spec, schema, text, repo]
output: [docs, code, plan]
risk: read-only
invocation: user
effort: deep
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: expert
tags: [sdk-design, client-library, generated-code, developer-experience, semver]
pairs_with:
  personas: [api-designer]
  prompts: [design-api-contract, write-code-samples, add-retries-and-timeouts, migrate-api-version]
args:
  - name: api
    description: The API the SDK wraps (spec file or summary), its auth method, pagination style, error format and how often it changes.
    type: text
    required: true
  - name: languages
    description: Target languages and runtimes, for example "TypeScript for Node and browsers, Python 3.9+", and who the users are.
    type: text
    required: true
  - name: team
    description: Who will maintain the SDKs, their language skills, and any existing SDK or code generator in use.
    type: text
output_contract:
  format: markdown
  sections: [Build approach, Public surface, Cross-cutting behaviour, Errors, Versioning and releases, Example usage, Open questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
An SDK is a second API: once developers write code against its method names and error classes, changing them is a breaking change with its own semver, independent of the HTTP API's version. Good SDKs feel native to each language (async patterns, naming, packaging) while sharing one behaviour model: a client object configured once with credentials, base URL, timeouts and retry policy; resource-grouped methods; automatic retries with backoff only for idempotent requests or requests with an idempotency key; auto-paginating iterators; typed errors that carry the HTTP status, error code and request id for support. Generating SDKs from an OpenAPI or Protobuf spec keeps many languages in sync but produces awkward code unless the spec is clean and the generator is customised; hand-written SDKs feel better but drift. Most teams generate the low-level layer and hand-write a thin ergonomic layer, and run the same contract tests against every language.
</context>

<task>
<api>
{{api}}
</api>

<languages>
{{languages}}
</languages>

{{#team}}
<team>
{{team}}
</team>
{{/team}}

1. If a repository or spec file is available, read it first and note spec problems that would make generated code poor (missing operation ids, inline anonymous schemas, inconsistent naming). Say what you read.
2. Choose the build approach (generated, hand-written or generated core plus hand-written layer) from the number of languages, API change rate and team capacity, with the trade-offs.
3. Design the public surface: client construction and configuration, resource namespaces and method naming per language idiom, request and response types, optional parameters, and what is deliberately not exposed.
4. Specify cross-cutting behaviour: authentication and token refresh, timeouts, retries with backoff and jitter limited to safe requests, idempotency key handling, pagination iterators, file uploads and downloads, logging hooks with secrets redacted, user-agent with SDK version, and proxy or custom HTTP client support.
5. Specify errors: an error class hierarchy (authentication, permission, not found, validation, rate limit with retry-after, server, network), the fields every error carries, and how validation details are exposed.
6. Specify versioning and releases: SDK semver independent of the API version, how new API fields and endpoints reach the SDK, deprecation warnings, supported runtime versions, changelog, and contract tests shared across languages.
7. Show example usage in each target language for one common flow, including error handling and pagination.
</task>

<constraints>
- Do not retry non-idempotent requests automatically unless they carry an idempotency key.
- Do not swallow errors or return null for failures; errors must be typed and carry a request id when the API provides one.
- Example code must use only methods the design defines; mark it as illustrative.
- Do not invent the API's endpoints or error codes; work from the given API and list gaps.
{{> output/uncertainty}}
</constraints>

<output_format>
## Build approach
Recommendation and trade-offs in at most 8 lines.
## Public surface
Bullets and a short type or method listing per language.
## Cross-cutting behaviour
Table: concern, behaviour, configurable (yes or no), default.
## Errors
Error hierarchy as a list, with the fields each carries.
## Versioning and releases
## Example usage
One code block per language.
## Open questions
Numbered.
</output_format>
