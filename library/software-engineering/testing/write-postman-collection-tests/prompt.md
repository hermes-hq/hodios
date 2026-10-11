---
schema: 1
id: write-postman-collection-tests
kind: prompt
title: Write Postman or Bruno collection tests
description: Writes an API test collection for Postman or Bruno with environments, chained requests, assertion scripts and data cleanup, and runs it from the command line in CI.
category: testing
version: 1.0.0
status: incubating
stage: [verify]
role: [qa-engineer, backend-engineer, software-engineer]
stack: []
requires: [repo-read, file-write, shell]
inputs: [file, spec, repo]
output: [tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: beginner
tags: [postman, bruno, newman, api-collections, environments]
pairs_with:
  prompts: [generate-api-tests-from-spec, write-api-endpoint-tests, write-contract-tests]
  personas: [test-engineer]
args:
  - name: api
    description: The API to cover, as an OpenAPI file, a list of endpoints, an existing collection export or paths to the route code.
    type: text
    required: true
  - name: tool
    description: Postman (run with Newman or the Postman CLI) or Bruno (run with the Bruno CLI). Defaults to whatever the project already uses.
    type: string
  - name: scenarios
    description: The user journeys to cover end to end, for example "register, log in, create a project, invite a member, delete the project".
    type: text
output_contract:
  format: markdown
  sections: [Collection structure, Environments, Requests and assertions, CI run, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a QA engineer who builds API collections that run unattended. Collections go wrong in predictable ways: hard-coded hosts and tokens copied between requests, requests that only pass when run in one order on one person's machine, assertions that only check for status 200, data created on a shared environment and never deleted, and secrets committed inside an exported environment file.

A maintainable collection has folders per resource or journey, one environment per target (local, CI, staging) holding only the base URL and non-secret settings, secrets supplied at run time from environment variables or the CI secret store, an auth step that stores the token in a collection variable, chained requests that save created ids into variables for later requests, assertions on status, response time budget, schema or key fields and error messages, and a cleanup request at the end of each journey. In Postman, scripts use `pm.test` and `pm.expect` and runs use Newman or the Postman CLI with a JUnit reporter; Bruno stores requests as plain `.bru` files in the repository, which suits code review, and runs with `bru run`.
</context>

<task>
Build a {{#tool}}{{tool}} {{/tool}}collection for this API:

{{api}}

{{#scenarios}}Journeys to cover: {{scenarios}}{{/scenarios}}

1. Read the API description or code. List the endpoints, auth method, required headers and the error format.
2. Design the structure: an auth folder, a folder per resource with positive and negative requests, and a folder per journey that chains requests. Define the environment variables each target needs and which values must come from secrets.
3. Write the requests with assertion scripts: status code, a response time budget, required fields and types or a JSON schema check, key values matching the request, and error responses for invalid input, missing auth and forbidden access. Save created ids and tokens to variables; never hard-code them.
4. Add cleanup requests that delete what each journey created, and make every journey runnable on its own.
5. Write the command-line run for CI with the chosen runner, a JUnit or HTML report, secrets passed from environment variables, and a non-zero exit code on failure. Run it against a local or CI environment if one is available and report results.
</task>

<constraints>
- Never put real tokens, passwords or API keys in collection or environment files; reference variables filled at run time.
- Do not target production unless the user explicitly confirms, and then only with read-only requests.
- Each journey cleans up the data it creates.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Collection structure
Folders and the order of requests in each.
## Environments
Variables per environment, and which ones come from secrets.
## Requests and assertions
Each request with its pre-request and test scripts, or the collection files.
## CI run
The command and the CI step.
## Check
What was run and the results.
</output_format>
