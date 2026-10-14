---
schema: 1
id: review-angular-code-change
kind: prompt
title: Review an Angular code change
description: Reviews an Angular diff for OnPush and change detection mistakes, signal misuse, provider scope errors, unsafe sanitiser bypasses, lifecycle timing bugs and leaked subscriptions.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer, fullstack-engineer]
stack: [angular]
requires: [repo-read]
inputs: [diff, file]
output: [report]
risk: read-only
invocation: user
effort: standard
interaction: one-shot
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [change-detection, signals, dependency-injection, onpush, pull-request]
pairs_with:
  personas: [angular-engineer]
  prompts: [review-pull-request, review-rxjs-observable-code, fix-angular-change-detection-error]
  rules: [angular-rules]
args:
  - name: diff
    description: The Angular diff with file paths, including templates, the component's providers and any service it injects if they are not in the diff.
    type: text
    required: true
  - name: context
    description: Angular version, standalone or NgModule-based, zone.js or zoneless, whether signals and the new control flow are in use, and whether the app is server-rendered.
    type: text
output_contract:
  format: markdown
  sections: [Verdict, Findings, Missing tests, Questions]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
Angular bugs in review cluster around four mechanisms. Change detection: an `OnPush` component only re-renders when an input reference changes, an event fires inside it, an `async` pipe emits or a signal it reads changes, so code that mutates an input array or object in place, or sets a field from a `setTimeout` or a third-party callback, leaves the view stale; `ExpressionChangedAfterItHasBeenCheckedError` means a value was changed during the check, usually from `ngAfterViewInit` or a getter with side effects, and wrapping it in `setTimeout` hides the bug. Signals: `effect` used to copy one signal into another where `computed` belongs, writes to signals inside `computed`, and signals read in a way that does not track them. Dependency injection: a service listed in a component's `providers` gets a new instance per component, so state the author thinks is shared is not; under server rendering each request gets its own root injector, but module-level variables and static caches outside DI are shared across every request and user. Templates: functions called in bindings run on every check, `@for` without a meaningful `track` recreates DOM, and `bypassSecurityTrustHtml` on user content removes Angular's XSS protection. Route guards hide screens; they do not authorise anything.
</context>

<task>
<diff>
{{diff}}
</diff>

{{#context}}
<context_given>
{{context}}
</context_given>
{{/context}}

1. If you can read the repository, open each changed component, template and service in full, check the Angular version in `package.json`, and note whether the app is standalone, zoneless or server-rendered. Run the type check (`ng build` or `tsc`), the linter and the related tests if you can, and report the results. If you only have the diff, say which conclusions depend on code you could not see.
2. Change detection: for each `OnPush` component, check that every state change reaches the view (new input references, signals, `async` pipe, or an explicit `markForCheck`). Flag in-place mutation of inputs, fields set from callbacks outside Angular, and fixes that hide `ExpressionChangedAfterItHasBeenCheckedError` with `setTimeout` or `detectChanges`.
3. Signals: `effect` used for derivation, signal writes inside `computed`, `untracked` used to dodge a real dependency, an `effect` that resets local state when an input changes where `linkedSignal` fits (on versions that have it), signal inputs read in the constructor before they are set, and mixed signal and observable state for the same value without a clear owner (`toSignal` and `toObservable` at the edge).
4. Dependency injection: where each changed service is provided and whether that matches the intended lifetime and sharing; per-user state kept in module-level variables or static fields that leak between requests under server rendering; `inject()` called outside an injection context.
5. Subscriptions and async: subscriptions without `takeUntilDestroyed`, `async` pipe or another teardown; nested subscribes. Note RxJS operator issues briefly and leave a deep stream review to a dedicated RxJS review.
6. Lifecycle and templates: logic in the constructor that needs inputs, `@ViewChild` read before `ngAfterViewInit`, inputs handled in `ngOnChanges` without checking which input changed, function calls and heavy pipes in bindings, `@for` or `*ngFor` without a stable `track` or `trackBy`.
7. Security and forms: `bypassSecurityTrust*` on anything user-controlled, `innerHTML` with unsanitised data, guards treated as authorisation, untyped forms where the codebase uses typed reactive forms, and validators missing on required fields.
8. For each finding, write the user action, input change or timing that triggers it and what goes wrong. Drop any finding you cannot trigger.
</task>

<constraints>
- State the Angular version you assumed. Do not suggest signal inputs, the new control flow or zoneless APIs if the version does not have them, and do not ask to migrate NgModules or decorators as part of a review.
- Fix with Angular and the libraries already in the project before adding dependencies.
- At most 10 findings, most severe first: security, then wrong or stale data, then leaks and lifetime errors, then render cost. No formatting or naming comments.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (build, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity (high, medium, low), `path:line`, the component, service or template, the defect, the triggering action or timing, and the fix in one or two sentences.
## Missing tests
Bullets naming the behaviour each test covers (for example "OnPush list updates after an item is added"), or "None".
## Questions
Versions, provider intent or rendering mode you need confirmed, or "None".
</output_format>
