---
schema: 1
id: test-angular-components-with-testbed
kind: prompt
title: Test Angular components and services with TestBed
description: Tests Angular components, services and HTTP calls with TestBed, component harnesses and HttpTestingController, including signals, inputs, outputs and async change detection.
category: testing
version: 1.0.0
status: incubating
stage: [build, verify]
role: [frontend-engineer, fullstack-engineer]
stack: [angular]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [tests]
risk: runs-commands
invocation: user
effort: standard
interaction: one-shot
model_tier: mid
reasoning: recommended
level: intermediate
tags: [testbed, component-harness, http-testing-controller, signals, jasmine]
pairs_with:
  prompts: [write-component-tests, write-e2e-test]
  personas: [angular-engineer, test-engineer]
args:
  - name: target
    description: The Angular component, directive, service or pipe to test, as a path or pasted code, with its template.
    type: text
    required: true
  - name: setup
    description: The Angular version and test runner if not obvious, for example "Angular 18 standalone components with Jest" or "Karma and Jasmine".
    type: string
output_contract:
  format: markdown
  sections: [Behaviours, TestBed setup, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an Angular engineer who writes tests that survive refactors. The default generated spec (`should create`) tests nothing. Good Angular tests configure `TestBed` with only what the unit needs: standalone components are imported directly, dependencies are replaced with `{ provide: X, useValue: fake }`, and HTTP goes through `provideHttpClient()` with `provideHttpClientTesting()` so `HttpTestingController` can assert on each request and flush a response (and `verify()` in teardown catches unexpected calls). Angular CDK and Material component harnesses (`TestbedHarnessEnvironment`, `MatButtonHarness`, or a custom `ComponentHarness`) interact with components the way a user would without depending on DOM structure.

The usual traps: forgetting `fixture.detectChanges()` or `await fixture.whenStable()` so the DOM is stale; `fakeAsync` and `tick` mixed with real promises; setting inputs by assigning fields instead of `fixture.componentRef.setInput()`, which skips signal inputs and `OnPush` change detection; testing private methods instead of rendered output; and importing a whole feature module so the test becomes slow and fragile. Zoneless apps change how async waits work; check the app's change detection setup first. Angular Testing Library is a good option if the project uses it.
</context>

<task>
Write tests for {{target}}{{#setup}} ({{setup}}){{/setup}}.

1. Read the code, its template, its dependencies and the project's existing specs and test setup. Note the Angular version, standalone or module-based, signals or decorators, `OnPush`, and zone or zoneless change detection.
2. List behaviours: rendering for each input and data state, user interactions and their visible result, outputs emitted, form validation, HTTP requests made and how responses and errors are shown, and for services the public methods and their observable or signal results.
3. Configure TestBed minimally: import the standalone component, provide fakes for services, use `provideHttpClientTesting` for HTTP, and a router testing setup only if navigation is under test.
4. Write the tests: set inputs with `setInput`, interact through harnesses or accessible queries, assert on rendered text and emitted outputs, expect and flush HTTP requests including an error response, and call `httpTesting.verify()` in teardown. For services, test observables with the project's preferred style and signals by reading them after updates.
5. Run the tests and report results.
</task>

<constraints>
- Do not test private methods or component internals; test through the template, inputs, outputs and public service API.
- Import only what the unit needs into TestBed, not whole feature modules.
- Every HTTP test flushes its requests and verifies none are left.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Behaviours
Table: behaviour, how it is triggered, what is asserted.
## TestBed setup
Imports and providers, with the reason for each fake.
## Tests
The spec file.
## Check
Commands run and results.
</output_format>
