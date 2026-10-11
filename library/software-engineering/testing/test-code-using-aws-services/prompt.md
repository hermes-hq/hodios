---
schema: 1
id: test-code-using-aws-services
kind: prompt
title: Test code that calls AWS services
description: Tests code that calls AWS services such as S3, DynamoDB, SQS, SNS and Lambda by choosing stubbed SDK clients, moto or LocalStack per test level, without touching a real account.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [backend-engineer, devops-engineer, software-engineer]
stack: [aws]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [moto, localstack, sdk-stubbing, s3, dynamodb]
pairs_with:
  prompts: [build-fake-for-external-api, write-integration-tests, write-unit-tests]
  personas: [test-engineer]
args:
  - name: target
    description: The code that calls AWS, as a path or pasted code, including the language and SDK (boto3, AWS SDK for JavaScript v3, AWS SDK for Java v2, AWS SDK for Go v2, .NET).
    type: text
    required: true
  - name: services
    description: The AWS services involved, if not obvious from the code.
    type: string
output_contract:
  format: markdown
  sections: [AWS calls, Tool choice per level, Tests, Check, Gaps]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a cloud engineer who tests AWS code without an AWS bill or a shared dev account. There are three tools, each right at a different level. Stubbed SDK clients (botocore `Stubber`, `aws-sdk-client-mock` for JavaScript v3, interfaces with fakes in Go and Java) are fastest and best for checking error handling: throttling, `ConditionalCheckFailedException`, `NoSuchKey`, access denied, pagination tokens. moto (Python, in-process or server mode) emulates many services' behaviour well enough for unit and integration tests of real logic such as DynamoDB queries and S3 listings. LocalStack runs services in a container for integration tests across services and for SDKs in any language, but its coverage and fidelity vary by service and edition, so check that the features you need are supported.

Common mistakes: tests that silently use the developer's real credentials because the default credential chain found them (always set fake credentials and a fixed region in tests), clients created at import time so the emulator cannot intercept them, pagination that only works for the first page, retries and throttling never exercised, and emulators trusted for IAM policy evaluation, which they mostly do not enforce. Production code should accept a client or an endpoint URL so tests can inject one.
</context>

<task>
Write tests for {{target}}{{#services}} (services: {{services}}){{/services}}.

1. Read the code and list every AWS call: service, operation, parameters that matter, how results are paginated, and which errors the code handles or should handle.
2. Choose the tool per level and explain the choice: stubbed client for error paths and exact request parameters, moto or LocalStack for behaviour, and whether any cross-service flow needs a container. If clients are created at import time or credentials are read directly, propose the smallest change to inject the client or endpoint, as a diff.
3. Set up test isolation: fake credentials and a fixed region set before any client is created, so a test can never reach a real account; create buckets, tables and queues in the test and remove them afterwards.
4. Write tests for: the happy path with assertions on stored data or sent messages, pagination across more than one page, each handled error (throttling, conditional check failure, missing object, access denied) and an unhandled error surfacing clearly, and retries if the code implements them.
5. Run the tests and report results. List what the emulators cannot prove, such as IAM permissions, encryption settings, service quotas and eventual consistency, and how to check those (policy simulator, a deploy to a sandbox account).
</task>

<constraints>
- Tests must never use real AWS credentials or reach a real account; set fake credentials explicitly.
- Do not claim an emulator supports a feature without checking its documentation for that service.
- Keep production changes to the minimum needed to inject clients or endpoints.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## AWS calls
Table: service, operation, errors to handle, pagination.
## Tool choice per level
Stub, moto or LocalStack for each group of tests, and why.
## Tests
Setup and test code, plus any production diff.
## Check
Commands run and results.
## Gaps
What emulators cannot verify and how to check it instead.
</output_format>
