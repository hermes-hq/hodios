---
schema: 1
id: migrate-rxjava-to-coroutines
kind: prompt
title: Migrate RxJava code to Kotlin coroutines and Flow
description: Replaces RxJava streams with Kotlin coroutines and Flow layer by layer, mapping types, operators, schedulers, subjects, errors and lifecycle, with interop adapters during the move.
category: migration
version: 1.0.0
status: incubating
stage: [build, maintain]
role: [mobile-engineer, backend-engineer]
stack: [kotlin]
requires: [repo-read, file-write, shell]
inputs: [repo, file]
output: [diff, tests, report]
risk: runs-commands
invocation: user
effort: deep
interaction: interactive
model_tier: frontier
reasoning: recommended
level: intermediate
depth: specific
tags: [rxjava, kotlin-flow, stateflow, structured-concurrency, reactive-streams]
pairs_with:
  prompts: [convert-callbacks-to-async-await, review-kotlin-coroutines-change, test-kotlin-coroutines-and-flows]
  personas: [kotlin-android-engineer]
args:
  - name: scope
    description: Which modules or layers to migrate, the RxJava version, Android or server, and how streams are consumed in the UI or callers.
    type: text
    required: true
output_contract:
  format: markdown
  sections: [Stream inventory, Operator mapping, Changes made, Tests, Remaining risks]
authorship: ai-assisted
authors: [gabrielanhaia]
last_reviewed: 2026-10-11
changelog:
  - {version: 1.0.0, note: "First version."}
---
<context>
The type mapping is the easy part: `Single` becomes a `suspend` function returning a value, `Maybe` a suspend function returning a nullable value, `Completable` a suspend function returning `Unit`, and `Observable` or `Flowable` a `Flow`. The traps are semantic. `BehaviorSubject` maps to `StateFlow`, but `StateFlow` conflates and skips equal values, so a stream that emitted the same value twice on purpose changes behaviour; `PublishSubject` maps to `SharedFlow` with deliberate replay and buffer settings. `switchMap` is `flatMapLatest`, `flatMap` is `flatMapMerge` with a concurrency limit, `concatMap` is `flatMapConcat`. `subscribeOn` becomes `flowOn` or `withContext`, and `observeOn` disappears because collection happens in the caller's scope. `CompositeDisposable` becomes a lifecycle-bound scope, and on Android, flows collected in the UI must use lifecycle-aware collection or they keep running in the background. Error handling changes: `catch` only handles upstream errors, and swallowing `CancellationException` breaks cancellation. The coroutines Rx interop library (`asFlow`, `rxSingle` and friends) lets you migrate one layer at a time instead of all at once.
</context>

<task>
Scope: {{scope}}

1. Read the code in scope and build the stream inventory: each stream's type, hot or cold nature, schedulers, error handling and who disposes it.
2. Choose the order, usually data sources and repositories first, using interop adapters at the boundary so callers keep working.
3. Convert one-shot calls to suspend functions and streams to Flow, choosing `StateFlow` or `SharedFlow` for subjects with explicit replay and buffer decisions. Note every place where conflation or equality changes behaviour.
4. Replace schedulers with dispatchers injected for tests, and disposables with structured scopes. Make UI collection lifecycle-aware.
5. Port error handling and retries, keeping cancellation propagating.
6. Write or update tests with a test dispatcher and a flow testing helper, covering emissions, errors and cancellation. Run them and report.
</task>

<constraints>
- Do not use `GlobalScope` or unscoped launches to replace subscriptions.
- Do not remove the Rx dependency until no interop adapters remain.
- Do not change emission semantics without noting it in the operator mapping.
{{> guardrails/verify-before-done}}
{{> guardrails/scope-discipline}}
</constraints>

<output_format>
## Stream inventory
Table: location | Rx type | hot or cold | threading | lifecycle owner.
## Operator mapping
Each Rx operator or type used and its coroutine or Flow equivalent, with semantic differences.
## Changes made
Per layer, with interop adapters still in place.
## Tests
Tests added or changed and results.
## Remaining risks
Bullets, or "None".
</output_format>
