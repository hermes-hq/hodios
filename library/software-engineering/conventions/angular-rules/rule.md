---
schema: 1
id: angular-rules
kind: rule
title: Angular rules
description: Standing rules for Angular code covering standalone components, signals, OnPush change detection, typed reactive forms, RxJS without leaks, inject over constructor bloat, and lazy-loaded routes.
category: conventions
version: 1.0.0
status: incubating
stage: [build]
role: [frontend-engineer, fullstack-engineer]
stack: [angular]
requires: [none]
output: [code]
risk: read-only
invocation: user
model_tier: mid
level: intermediate
depth: specific
tags: [signals, rxjs, change-detection, reactive-forms, standalone-components]
applies_to: ["src/**/*.ts", "src/**/*.html", "projects/**/*.ts", "projects/**/*.html"]
pairs_with:
  rules: [typescript-strict-rules, frontend-accessibility-rules]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
When you write or change code in this Angular application:

**Know the project first**
- Check the Angular version in `package.json` and follow what that version supports and what the codebase already does: standalone components or NgModules, signals or RxJS-first state, the new control flow (`@if`, `@for`) or structural directives. Do not mix styles within a feature.
- Use the Angular CLI generators so files, selectors and tests follow the project's naming. Keep `strict` TypeScript and strict templates on.

**Components**
- Prefer standalone components with `ChangeDetectionStrategy.OnPush`. Keep components presentational where possible: inputs in, outputs out, no HTTP calls.
- Use signal inputs and outputs (`input()`, `output()`, `model()`) where the version supports them, and `computed()` for derived state instead of recalculating in templates.
- Do not call methods or build objects in templates on every change detection run; use computed signals or pure pipes.
- Use `track` in `@for` (or `trackBy` with `*ngFor`) with a stable id.

**Services and state**
- Put data access and shared state in injectable services provided in the narrowest sensible scope. Use `inject()` in new code where the project does.
- Choose one state approach per feature (signals in a service, or the store the project uses) and follow it.

**RxJS**
- Every subscription has a clear end: prefer the `async` pipe or `toSignal`, and use `takeUntilDestroyed` for manual subscriptions. Never leave a subscribe in a component without teardown.
- Do not nest subscribes; use `switchMap`, `concatMap` or `exhaustMap` deliberately, choosing by what should happen to in-flight requests.
- Handle errors in streams with `catchError` so one failure does not silently end a long-lived stream.

**Forms, routing and security**
- Use typed reactive forms for anything beyond a trivial input, with validators and accessible error messages tied to fields.
- Lazy-load feature routes, and use functional guards and resolvers.
- Never bypass sanitisation with `bypassSecurityTrust*` on content that comes from users or the network.

**Tests**
- Test components with the TestBed or the project's testing library through the rendered DOM and user actions, and services with HTTP testing utilities. Do not test private methods.
