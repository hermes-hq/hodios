---
schema: 1
id: review-rxjs-observable-code
kind: prompt
title: Review RxJS observable code
description: Reviews Angular or RxJS code for subscription leaks, the wrong flattening operator, error handling that kills a stream for good and duplicate side effects from cold observables.
category: code-review
version: 1.0.0
status: incubating
stage: [review]
role: [frontend-engineer]
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
tags: [rxjs, observables, subscriptions, ngrx, pull-request]
pairs_with:
  personas: [angular-engineer]
  prompts: [review-pull-request, review-ui-component-change]
  rules: [angular-rules]
args:
  - name: diff
    description: The diff with file paths, including components, services, effects and templates that subscribe to the changed streams.
    type: text
    required: true
  - name: context
    description: Angular and RxJS versions, whether NgRx or signals are used, and what each stream represents (search box, save button, polling, websocket).
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
RxJS bugs are timing bugs that tests rarely cover. Leaks: a `subscribe` in a component without `takeUntilDestroyed`, `takeUntil` or the `async` pipe keeps running after the component is destroyed. HTTP calls complete on their own, but `valueChanges`, router events, `interval`, store selectors, websockets and subjects do not. `takeUntil` must be the last operator, or a later `switchMap` keeps the inner stream alive. The flattening operator encodes a business rule: `switchMap` cancels the previous inner request (right for search and type-ahead, wrong for saves, where it can drop writes), `mergeMap` runs everything in parallel with no ordering, `concatMap` queues in order (right for sequential writes), `exhaustMap` ignores new triggers while busy (right for a submit button). Errors terminate a stream: a `catchError` on the outer pipe of an NgRx effect or a long-lived stream lets the first failed request kill it for the rest of the session; the catch belongs inside the inner observable. A cold observable subscribed twice runs twice, so two `async` pipes on the same HTTP observable fire two requests; `shareReplay(1)` without `refCount: true` keeps the source subscribed forever. Nested `subscribe` calls lose cancellation and error handling. `combineLatest` emits nothing until every source has emitted. Exposing a `BehaviorSubject` lets any consumer push values; expose `asObservable()`.
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

1. If you can read the repository, open each changed file in full, the templates that use the changed streams, and the services that produce them, before judging any hunk. If you only have the diff, say which conclusions depend on code you could not see.
2. For every `subscribe` the change adds, name what ends it (completion, `takeUntilDestroyed`, `takeUntil` as the last operator, `async` pipe, explicit unsubscribe). Flag subscriptions to non-completing sources that nothing ends.
3. For every `switchMap`, `mergeMap`, `concatMap` and `exhaustMap`, state the user action or event behind it and whether its cancellation or ordering behaviour matches the business rule. Flag saves, payments and deletes behind `switchMap`, and search behind `mergeMap` that can show stale results out of order.
4. Check error handling: `catchError` placement in effects and long-lived streams, errors that end a stream the UI still depends on, retries without delay or limit, and errors swallowed by returning `EMPTY` with no user feedback.
5. Check sharing and side effects: cold observables subscribed more than once (multiple `async` pipes, `subscribe` plus `async`), `shareReplay` without `refCount`, side effects inside `map` instead of `tap`, nested subscribes, and subjects exposed for writing outside their owner.
6. Check combination and change detection: `combineLatest` or `forkJoin` with sources that may never emit or never complete, `distinctUntilChanged` on objects compared by reference, and `OnPush` components fed by mutated objects instead of new references.
7. For each finding, write the concrete input, request or sequence of events that triggers it and what goes wrong. Drop any finding you cannot trigger from the code you have read.
8. Rate each finding: high (lost or duplicated writes, an effect or stream dead after one error, leaks that multiply with navigation), medium (duplicate requests, stale results shown, UI stuck waiting on a source that never emits), low.
9. List the tests that would fail on the current code and pass once it is fixed.
</task>

<constraints>
- Tie API advice to the versions given (`takeUntilDestroyed` needs Angular 16+, `shareReplay` config object, signals interop); ask if unknown.
- Do not propose rewriting streams into signals or promises as a fix; fix the stream unless the codebase is already migrating.
- At most 10 findings, most severe first. No style, naming or formatting comments unless they cause a defect.
- Stay read-only: do not edit files, push, or run commands that change state. Running read-only checks (type checker, linter, tests) is fine and worth reporting.
{{> guardrails/investigate-before-answering}}
</constraints>

<output_format>
## Verdict
One line: approve | approve-with-nits | request-changes, and the main reason.
## Findings
Numbered. Each: severity, `path:line`, the stream and the event behind it, the defect, the triggering sequence of user actions or emissions, the fix in one or two sentences.
## Missing tests
Bullets naming the case each test covers, or "None".
## Questions
Versions, settings or business rules you need confirmed, or "None".
</output_format>
