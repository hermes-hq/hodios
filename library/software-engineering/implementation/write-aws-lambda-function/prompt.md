---
schema: 1
id: write-aws-lambda-function
kind: prompt
title: Write an AWS Lambda function
description: Writes an AWS Lambda handler with typed event payloads, clients created outside the handler, idempotent retries, structured logs, least-privilege IAM and local tests.
category: implementation
version: 1.0.0
status: incubating
stage: [build]
role: [backend-engineer, devops-engineer, software-engineer]
stack: [aws]
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
tags: [serverless, iam, api-gateway, sqs, idempotency]
args:
  - name: function_job
    description: What the function does and what it reads or writes, for example "resize images uploaded to a bucket and write thumbnails".
    type: text
    required: true
  - name: trigger
    description: The event source.
    type: enum
    enum: [api-gateway-http, api-gateway-rest, function-url, sqs, s3, eventbridge, dynamodb-stream, sns, scheduled, other]
    default: api-gateway-http
  - name: runtime
    description: Language runtime, for example "Node.js 22 with TypeScript" or "Python 3.13". Leave empty to follow the repo.
    type: string
output_contract:
  format: markdown
  sections: [Design, Changes, IAM, Tests, Verification]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
A Lambda handler is small, but the event source decides most of the design. API Gateway HTTP APIs send payload format 2.0 and REST APIs send 1.0, with different field names. SQS, S3 and EventBridge deliver at least once, and async invocations are retried, so a handler that is not idempotent double-charges or double-sends. An SQS handler that throws on one bad message makes the whole batch retry unless it returns partial batch failures. SDK clients created inside the handler add latency to every call. And a generated IAM role with `*` on actions and resources turns a small bug into a breach.
</context>

<task>
Write a Lambda function that does this:

{{function_job}}

Trigger: {{trigger}}.
{{#runtime}}
Runtime: {{runtime}}
{{/runtime}}

1. Read the repo: infrastructure-as-code tool (SAM, CDK, Serverless Framework, Terraform or none), existing functions, shared libraries, logging and config conventions. Follow them; do not introduce a second IaC tool.
2. Use the exact event type for the trigger (for example `APIGatewayProxyEventV2` from `@types/aws-lambda`, or the matching Powertools data class in Python). Validate the parts of the payload you use and reject bad input (400 for HTTP triggers; log and skip or fail the item for queues).
3. Structure the code: create SDK clients, config and connections at module scope (reused across warm invocations); keep the handler thin and call a plain function that holds the logic, so it can be unit-tested without Lambda.
4. Make it safe under retries: derive an idempotency key from the event (message id, object key and version, request id) and use a conditional write or Powertools idempotency where side effects must happen once.
5. For SQS triggers, enable `ReportBatchItemFailures` and return `batchItemFailures` for failed records only. For async triggers, configure a dead-letter queue or on-failure destination.
6. Set timeout and memory deliberately, and keep it below the SQS visibility timeout (AWS recommends a visibility timeout of at least six times the function timeout) or below the API Gateway integration timeout (29 seconds for REST APIs unless a quota increase was granted, 30 seconds for HTTP APIs), as relevant.
7. Log in structured JSON with the request id, never the full event if it can hold personal data or secrets. Read secrets from Secrets Manager or Parameter Store, not plain environment variables in source.
8. Write the IAM policy in the project's IaC with only the actions and resource ARNs the function uses.
9. Write unit tests with fixture events for the trigger, including a malformed event and a duplicate delivery. Run them, and run a local invoke (`sam local invoke` or equivalent) if the tooling exists.
</task>

<constraints>
- Do not deploy, create AWS resources or run commands against a real account unless the user confirms first; build and test locally.
- No wildcard `*` actions or resources in IAM unless the service requires it, and then explain why.
- No credentials or account ids in source.
{{> guardrails/scope-discipline}}
{{> guardrails/investigate-before-answering}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Design
Trigger, payload format, idempotency key, timeout and memory, failure path, in bullets.

## Changes
One line per file: `path`, what changed.

## IAM
Table: Action | Resource | Why needed.

## Tests
One line per test.

## Verification
Commands run and their real results; say clearly that nothing was deployed.
</output_format>
