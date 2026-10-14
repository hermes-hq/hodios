---
schema: 1
id: extract-service-objects-from-fat-models
kind: prompt
title: Extract service objects from fat models
description: Moves business workflows out of fat Rails, Django or Laravel models into service objects or domain modules, keeping data rules on the model and behaviour unchanged, one small step at a time.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [backend-engineer, fullstack-engineer]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: expert
depth: advanced
tags: [fat-models, service-objects, domain-logic, active-record-pattern, transactions]
pairs_with:
  prompts: [move-logic-out-of-controllers, remove-rails-model-callbacks, move-behaviour-to-its-data, decouple-for-testability]
  personas: [refactoring-specialist]
args:
  - name: model
    description: The fat model, as a path or pasted code, and the framework. Mention which methods hurt most (hard to test, change often, cause bugs).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the project's usual one.
    type: string
output_contract:
  format: markdown
  sections: [Method map, Target shape, Steps, Diff, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
"Fat model, thin controller" moved logic out of controllers and into models until a `User` or `Order` class reached two thousand lines. Not everything in it should leave. Methods that read and validate the model's own fields (`full_name`, `overdue?`, `total_with_tax`, validations, scopes) belong on the model; moving them out creates anemic models and feature envy. What should move are workflows: operations that coordinate several models, call external services (payments, email, search indexing), run in a transaction across tables, or encode a business process (`place_order`, `cancel_subscription`, `import_from_csv`). These become service objects or domain functions with one public entry point, explicit inputs, a clear result (value, result object or exception, following the project's convention), and dependencies passed in so tests do not need the whole framework. Common failures: a `services/` folder of one-method classes that wrap a single `save`; services that take the model and reach into its internals; moving logic out and leaving the old model method behind so two paths drift; and changing transaction boundaries by accident, which changes what is rolled back when something fails. Rails callbacks and Django signals that trigger workflows are part of the same problem and need the same care about order and transactions.
</context>

<task>
Slim down {{model}}.
{{#test_command}}Test command: {{test_command}}{{/test_command}}

1. Read the model, its concerns, mixins or traits, callbacks or signals, and every caller of its public methods (controllers, jobs, other models, console scripts). Run the tests to record the baseline.
2. Build a method map: each public method, what it touches (own fields, other models, external services, transactions), its callers, and its test coverage. Classify each as stays on the model (data rule or query), moves to a service (workflow), or unclear.
3. Propose the target shape: service names by business operation, their inputs and results, where transactions start and end, and how dependencies are passed. Follow any service or interactor pattern the project already has. Wait for confirmation before moving code if the user asked for interactive mode.
4. For each workflow, one at a time: add characterization tests if coverage is thin, create the service with the same logic, point callers at it, delete the old model method (or leave a delegating method marked deprecated if external callers exist), and run the tests.
5. Keep side-effect order and transaction boundaries identical, and note any you had to change.
6. Run the full test suite and linters and report results with the model's size before and after.
</task>

<constraints>
- Do not move data rules, validations or scopes off the model.
- Do not change behaviour, side-effect order or transaction scope; if a change is unavoidable, stop and ask.
- Do not create services that only wrap a single save or that take a model and mutate its internals.
- Move one workflow per step with tests passing between steps.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## Method map
Table: method, touches, callers, coverage, decision (stay, move, unclear).
## Target shape
Services with inputs, results and transaction boundaries.
## Steps
Numbered, one workflow per step.
## Diff
The changes per step.
## Check
Test results per step and at the end, with line counts before and after.
</output_format>
