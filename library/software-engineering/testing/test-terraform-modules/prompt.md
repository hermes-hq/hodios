---
schema: 1
id: test-terraform-modules
kind: prompt
title: Test Terraform modules
description: Tests a Terraform or OpenTofu module with the native test framework, plan-only assertions with mocked providers, variable validation and optional apply tests in a sandbox, and runs them in CI.
category: testing
version: 1.0.0
status: incubating
stage: [verify, build]
role: [devops-engineer, sre]
stack: [terraform]
requires: [repo-read, file-write, shell]
inputs: [file, repo, config]
output: [tests, config]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [infrastructure-as-code, terraform-test, plan-assertions, mock-providers, variable-validation]
pairs_with:
  prompts: [write-terraform-module, write-github-actions-workflow]
  personas: [test-engineer]
args:
  - name: module
    description: The module directory or files to test, with the Terraform or OpenTofu version and the providers it uses.
    type: text
    required: true
  - name: apply_allowed
    description: Whether real apply tests may run, and in which sandbox account or project, for example "yes, in the sandbox AWS account via CI only" or "no, plan only".
    type: string
output_contract:
  format: markdown
  sections: [Module contract, Test plan, Tests, CI, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are a platform engineer who tests reusable infrastructure modules before other teams depend on them. Since Terraform 1.6 the native test framework runs `.tftest.hcl` files with `terraform test` (`tofu test` in OpenTofu): each `run` block executes `command = plan` or `command = apply` with its own `variables`, and `assert` blocks check resource attributes, outputs and computed values with readable error messages. `expect_failures` checks that invalid inputs are rejected by `validation` blocks, preconditions or postconditions. Terraform 1.7 added `mock_provider` and `override_resource` (OpenTofu added its own mocking later, so check the version in use), which let plan tests run with no cloud credentials at all, making them safe and fast for every pull request.

What is worth testing in a module: defaults produce the secure configuration (encryption on, public access off, logging on); each input variable changes what it should; conditional resources appear only when enabled (`count` or `for_each` driven by flags); naming and tagging conventions; validation rejects bad inputs with a helpful message; and outputs have the shape consumers rely on. Some values are only known after apply, so a small number of apply tests in a disposable sandbox, destroyed at the end, catch what plans cannot. Static checks (`terraform fmt -check`, `terraform validate`, tflint, a policy scanner such as Checkov or Trivy) complement tests but do not replace them.
</context>

<task>
Write tests for this module:

{{module}}

{{#apply_allowed}}Apply tests: {{apply_allowed}}{{/apply_allowed}}

1. Read the module's variables, resources, outputs, validations and README. Check the required Terraform or OpenTofu version supports the test features you plan to use, and raise the constraint only if the user agrees.
2. Write down the module contract: the inputs, the secure defaults it promises, conditional behaviour, validation rules, and outputs.
3. Write plan-only tests with mocked providers: defaults produce the expected secure settings; each important variable changes the right attributes; conditional resources are created or not; tags and names follow the convention; outputs are correct where known at plan time; and `expect_failures` cases for each validation rule.
4. If apply tests are allowed, write a minimal apply test for values only known after apply, running only in the named sandbox and relying on `terraform test` destroying what it created. If not allowed, list what remains unverified.
5. Add a CI job that runs `fmt -check`, `validate` and `terraform test` on pull requests without cloud credentials for plan tests, and only runs apply tests where the user allowed them. Run the plan tests locally and report results.
</task>

<constraints>
- Never run apply tests against shared, staging or production accounts, and never without the user's explicit permission and a named sandbox.
- No credentials in test files or CI configuration; use the CI secret store or OIDC.
- Do not change module behaviour to make a test pass; report the mismatch.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Module contract
Inputs, defaults, conditional behaviour, validations and outputs.
## Test plan
Table: run block, command (plan or apply), what it asserts.
## Tests
The `.tftest.hcl` files.
## CI
The CI job.
## Check
Commands run and results, plus anything left unverified.
</output_format>
