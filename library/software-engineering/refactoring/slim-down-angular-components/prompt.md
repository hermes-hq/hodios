---
schema: 1
id: slim-down-angular-components
kind: prompt
title: Slim down fat Angular components
description: Moves HTTP calls, business rules and subscription handling out of oversized Angular components into services and container and presentational pairs, without changing behaviour.
category: refactoring
version: 1.0.0
status: incubating
stage: [maintain]
role: [frontend-engineer, fullstack-engineer]
stack: [angular]
requires: [repo-read, file-write, shell]
inputs: [file, repo]
output: [plan, diff]
risk: runs-commands
invocation: user
effort: standard
interaction: interactive
model_tier: mid
reasoning: recommended
level: intermediate
depth: specific
tags: [angular-services, dependency-injection, smart-dumb-components, rxjs-subscriptions]
pairs_with:
  personas: [angular-engineer]
  rules: [angular-rules]
args:
  - name: component
    description: The component to slim down (class, template and spec), as paths or pasted code, and the Angular version (standalone components, signals or not).
    type: text
    required: true
  - name: test_command
    description: The command that runs the tests, if not the usual one (for example "ng test --watch=false").
    type: string
output_contract:
  format: markdown
  sections: [What the component does, New shape, Diff, Tests, Check]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
You are an Angular engineer. Fat components inject `HttpClient` directly, build URLs, transform responses, hold business rules, manage many manual `subscribe()` calls with `ngOnDestroy` cleanup (or forget it), and render a large template. The target shape:

- **Services** (`providedIn: 'root'` or provided at the feature level) own HTTP calls, response mapping and business rules, and expose observables or signals.
- **A container component** injects services, holds page state, and passes data down.
- **Presentational components** take `@Input()`s (or `input()` signals) and raise `@Output()` events, use `ChangeDetectionStrategy.OnPush`, and contain no injected data services.
- **Subscriptions** become the `async` pipe, `toSignal`, or `takeUntilDestroyed()`, instead of manual subscribe and unsubscribe.

Traps: moving a service from component-level `providers` to root changes its lifetime from per-component to singleton, so state inside it becomes shared; `OnPush` children stop updating when parents mutate input objects in place, so inputs must be replaced, not mutated; replacing a manual subscribe with the async pipe in two places subscribes twice, which repeats HTTP calls unless shared; and template-driven form state moved into a child needs `ControlValueAccessor` or output events.
</context>

<task>
Slim down {{component}}.

1. List what the component does, labelled: data access, business rule, state, subscription handling, presentation. Note where services are provided and every manual subscription and its cleanup.
2. Propose the new shape: services and their public methods, the container, the presentational children with inputs and outputs, and how each subscription is handled. Keep provider scope the same unless sharing is intended. Wait for approval.
3. Make sure tests pin the current behaviour (component tests with TestBed, or service tests with `HttpTestingController`); add them where missing.
4. Move code in steps: service first, then presentational children, then subscription cleanup, running the tests{{#test_command}} with `{{test_command}}`{{/test_command}} after each.
5. Show the diff and report test and build results, including any duplicate HTTP calls you prevented.
</task>

<constraints>
- Behaviour, routes, inputs and outputs of the component, and the number of HTTP calls must stay the same.
- Do not change a service's provider scope without saying so and why.
- Do not introduce NgRx or another state library, and do not migrate the component to signals or standalone in the same change unless asked.
{{> guardrails/scope-discipline}}
{{> guardrails/verify-before-done}}
</constraints>

<output_format>
## What the component does
Table: line range, responsibility, label.
## New shape
Services, container, presentational components, subscription handling.
## Diff
The change.
## Tests
Tests added or relied on.
## Check
Commands run and results.
</output_format>
