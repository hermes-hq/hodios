---
schema: 1
id: migrate-aws-sdk-js-to-v3
kind: prompt
title: Migrate AWS SDK for JavaScript v2 to v3
description: Moves JavaScript or TypeScript code from AWS SDK v2 to the modular v3 clients, mapping commands, credentials, errors, streams, DynamoDB document client, S3 uploads and presigned URLs.
category: migration
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer, devops-engineer]
stack: [nodejs, aws]
requires: [repo-read, file-write, shell]
inputs: [repo, text]
output: [diff, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
tags: [aws-sdk, codemods, serverless, end-of-support]
pairs_with:
  prompts: [upgrade-major-dependency, inventory-deprecated-api-usage]
args:
  - name: notes
    description: "Services used (S3, DynamoDB, SQS and so on), where the code runs (Lambda, containers, browser), TypeScript or not, test mocking approach."
    type: text
output_contract:
  format: markdown
  sections: [Usage inventory, Behaviour differences, Changes made, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
AWS SDK for JavaScript v2 has reached end of support, and current Lambda Node.js runtimes ship only v3. The official codemod rewrites imports and simple calls, but the bugs come from behaviour it cannot see. What experienced people check: each service is its own package and calls are either `client.send(new XCommand(input))` or the aggregated client style, with no `.promise()`; there is no global `AWS.config`, so region and credentials must be set per client (a missing region is a common production failure); credential providers live in a separate package; errors expose `name` and `$metadata` instead of `code` and `statusCode`, so `err.code === 'NoSuchKey'` checks silently stop matching; S3 `GetObject` returns a stream `Body` that must be consumed (`transformToString`, `transformToByteArray`), and unconsumed bodies leak sockets; the DynamoDB `DocumentClient` moves to the separate lib-dynamodb package with its own marshalling options (empty strings, undefined values, large numbers); managed multipart `s3.upload` moves to lib-storage; `getSignedUrl` moves to the request presigner package; event listeners become middleware; and retry and timeout configuration has different names. Test mocks written for v2 usually need replacing.
</context>

<task>
Migrate this code from AWS SDK v2 to v3.
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Inventory every v2 use: imports, `AWS.config` calls, each service client, each operation, `.promise()` and callback styles, error code checks, stream handling, presigned URLs, uploads, custom endpoints, retries and timeouts, and test mocks.
2. List the behaviour differences that apply to this code (error shape, response bodies as streams, document client marshalling, credentials and region resolution, pagination helpers) and where each occurs.
3. Run the official codemod if the environment allows, on a branch, then review every changed call by hand.
4. Fix what the codemod cannot: error checks to `name`, stream bodies consumed correctly, document client options set to match v2 behaviour, uploads and presigning via their packages, explicit region and credential providers, and equivalent retry and timeout settings.
5. Replace v2 test mocks with v3-compatible mocking and keep assertions on the same behaviour.
6. Remove `aws-sdk` from dependencies, check bundle size for browser or Lambda code, and confirm no transitive import still pulls v2.
7. Run unit tests, then exercise each changed operation against a real or emulated environment the user approves (never production data writes without confirmation).
</task>

<constraints>
- Do not run operations that write, delete or send messages against real AWS accounts without the user's explicit approval.
- Do not hard-code credentials or regions to make calls work; use the environment's existing configuration.
- Do not assume an error name or response shape; check the v3 API reference or the service model.
- Keep behaviour the same; no refactoring of business logic.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Usage inventory
Table: service, operations, files, special handling (streams, errors, presign).
## Behaviour differences
Each difference that applies, where, and how it was handled.
## Changes made
Packages added and removed, client setup, notable rewrites.
## Verification
Tests run, operations exercised and where, results.
## Follow-ups
Remaining manual checks and anything deferred.
</output_format>
