---
schema: 1
id: configure-aws-api-gateway
kind: prompt
title: Configure AWS API Gateway
description: Configures AWS API Gateway as code, choosing HTTP or REST API, with routes, Lambda or HTTP integrations, authorizers, throttling, CORS, access logs and a custom domain.
category: devops
version: 1.0.0
status: incubating
stage: [build, ship]
role: [backend-engineer, devops-engineer]
stack: [aws]
requires: [repo-read, file-write]
inputs: [repo, spec, text]
output: [config, report]
risk: edits-files
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [api-gateway, http-api, authorizers, throttling, cors]
pairs_with:
  prompts: [write-aws-lambda-function, write-least-privilege-iam-policy, set-up-domain-and-https]
args:
  - name: api
    description: The API to expose, for example "REST endpoints for orders backed by three Lambda functions, JWT auth from our identity provider, api.example.com".
    type: text
    required: true
  - name: notes
    description: "IaC tool (SAM, CDK, Terraform, Serverless Framework, CloudFormation), whether clients need API keys or usage plans, WAF, caching or private access, expected traffic, browser clients and their origins."
    type: text
output_contract:
  format: markdown
  sections: [API type, Code, Security, Verification, Follow-ups]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The first decision is HTTP API or REST API, and it is hard to reverse. HTTP APIs are cheaper and simpler, with native JWT authorizers and built-in CORS, but they have no usage plans or API keys, no request validation, no caching, no private endpoint type and no direct WAF association. REST APIs have all of those plus mapping templates and resource policies. Lambda proxy integrations use different event shapes (payload format 1.0 versus 2.0 for HTTP APIs), and handler code written for one breaks on the other. Integration timeouts default to about 30 seconds (regional REST APIs can request more through a quota increase) and payloads are limited to 10 MB, so long or large operations need async patterns or presigned S3 URLs. With proxy integrations, browser CORS headers on actual responses come from the backend, not only from the OPTIONS configuration, which is why "CORS works in curl but not the browser" is common. Throttling has a per-region account limit shared by every API, plus stage and route limits you set. Each Lambda needs a resource-based permission for API Gateway scoped to the API's ARN. Lambda authorizer results are cached by identity source; a cached policy that names only the first resource called will deny the user's next route. Custom domains need an ACM certificate in the same region for regional endpoints, and in us-east-1 for edge-optimized REST APIs. REST API changes take effect only after a new deployment to a stage. Access logs with `$context` variables are the main debugging tool; execution logging is verbose and can capture sensitive data.
</context>

<task>
Configure API Gateway for:
<api>
{{api}}
</api>
{{#notes}}
Notes:
{{notes}}
{{/notes}}

1. Read the repository: the IaC tool and existing stacks, Lambda handlers and the event shape they expect, auth setup, domains and certificates, and existing logging conventions. Follow what is there.
2. Choose HTTP or REST API against the requirements (API keys and usage plans, WAF, caching, request validation, private access, cost) and state the reason. Match the payload format to the handlers or list the handler changes needed.
3. Write the API as code: routes and methods, integrations, Lambda invoke permissions scoped to the API ARN, stages, and automatic or explicit deployments.
4. Add auth: JWT authorizer with issuer and audience, or a Lambda authorizer with a cache key and a policy that covers the routes the identity may call, or IAM auth for service callers. Mark any public route explicitly.
5. Add throttling per stage and per route where needed, CORS with the exact allowed origins, methods and headers (and the matching headers in backend responses for proxy integrations), request validation where the API type supports it, and access logs to a log group with a retention period.
6. Add the custom domain: certificate reference in the right region, API mapping and DNS record.
7. Run the tool's validate, synth or plan command if available, and list test calls: an authorised request, an unauthorised one, a browser preflight from an allowed and a disallowed origin, a throttled burst.
</task>

<constraints>
- Do not use `*` for allowed origins when credentials are sent, and do not leave routes unauthenticated without the user saying so.
- Do not grant Lambda invoke permission to API Gateway without a source ARN condition.
- Do not enable full request and response execution logging in production without warning about sensitive data.
- Do not invent limits or prices; refer to the service quotas page for exact values.

{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## API type
HTTP or REST, with the reasons and the payload format.
## Code
Files with paths and contents.
## Security
Auth per route, public routes, CORS, throttling, logging and what they protect against.
## Verification
Validate or plan result and the test calls with expected responses.
## Follow-ups
WAF, caching, async patterns for long operations, or "None".
</output_format>
